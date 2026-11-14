import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { applyPayment, applyRefund, normalizeEmail } from "@/lib/server/account";
import { authContext } from "@/lib/server/auth";
import { stripe } from "@/lib/server/billing";

export const runtime = "nodejs";

const idOf = (v: string | { id: string } | null | undefined): string | null =>
  typeof v === "string" ? v : (v?.id ?? null);

// Stripe ilmoittaa tänne maksuista. Viesti hyväksytään vain, jos sen allekirjoitus
// täsmää, joten kukaan muu ei voi merkitä tilausta maksetuksi.
export async function POST(req: Request) {
  const ctx = authContext();
  const s = stripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!ctx || !s || !secret) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  let event: Stripe.Event;
  try {
    event = s.webhooks.constructEvent(await req.text(), req.headers.get("stripe-signature") ?? "", secret);
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  try {
    if (event.type === "invoice.paid") {
      const invoice = event.data.object;
      const email = normalizeEmail(invoice.customer_email);
      const periodEnd = Math.max(0, ...invoice.lines.data.map((l) => l.period.end));
      const account = email ? await ctx.store.getAccount(email) : null;
      if (account && periodEnd > 0) {
        await ctx.store.putAccount(applyPayment(account, periodEnd, idOf(invoice.customer)));
      } else {
        console.error("billing/webhook: paid invoice without a matching account");
      }
    } else if (event.type === "charge.refunded") {
      const charge = event.data.object;
      if (charge.refunded) {
        let email = normalizeEmail(charge.billing_details.email);
        const customerId = idOf(charge.customer);
        if (customerId) {
          const customer = await s.customers.retrieve(customerId);
          if (!customer.deleted) email = normalizeEmail(customer.email) ?? email;
        }
        const account = email ? await ctx.store.getAccount(email) : null;
        if (account) await ctx.store.putAccount(applyRefund(account));
      }
    }
    return NextResponse.json({ received: true });
  } catch {
    // Virhe palautetaan, jotta Stripe yrittää ilmoitusta uudelleen.
    console.error("billing/webhook: could not record the event");
    return NextResponse.json({ error: "unavailable" }, { status: 500 });
  }
}
