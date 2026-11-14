import { NextResponse } from "next/server";
import { authContext, currentAccount } from "@/lib/server/auth";
import { appUrl, billingEnabled, priceId, stripe } from "@/lib/server/billing";

export const runtime = "nodejs";

// Avaa Stripen maksusivun kirjautuneelle käyttäjälle. Korttitiedot eivät kulje Usvan kautta.
export async function POST(req: Request) {
  const ctx = authContext();
  const s = stripe();
  if (!ctx || !s || !billingEnabled()) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  let body: { plan?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const plan = body.plan === "monthly" ? "monthly" : body.plan === "yearly" ? "yearly" : null;
  const price = plan && priceId(plan);
  if (!price) return NextResponse.json({ error: "invalid" }, { status: 400 });

  try {
    const account = await currentAccount(ctx);
    if (!account) return NextResponse.json({ error: "signed_out" }, { status: 401 });
    const base = appUrl(req);
    const session = await s.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      // Tunnettu asiakas käyttää samaa Stripe-asiakasta; uusi tunnistetaan sähköpostista.
      ...(account.stripeCustomerId ? { customer: account.stripeCustomerId } : { customer_email: account.email }),
      client_reference_id: account.email,
      subscription_data: { metadata: { email: account.email } },
      locale: account.lang === "en" ? "en" : "fi",
      success_url: `${base}/tilaus?tila=kiitos`,
      cancel_url: `${base}/tilaus`,
    });
    if (!session.url) return NextResponse.json({ error: "unavailable" }, { status: 503 });
    return NextResponse.json({ url: session.url });
  } catch {
    console.error("billing/checkout: payment service unavailable");
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
