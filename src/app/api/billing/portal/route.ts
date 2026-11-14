import { NextResponse } from "next/server";
import { authContext, currentAccount } from "@/lib/server/auth";
import { appUrl, stripe } from "@/lib/server/billing";

export const runtime = "nodejs";

// Avaa Stripen hallintasivun, jossa tilauksen voi perua tai maksutavan vaihtaa.
export async function POST(req: Request) {
  const ctx = authContext();
  const s = stripe();
  if (!ctx || !s) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  try {
    const account = await currentAccount(ctx);
    if (!account) return NextResponse.json({ error: "signed_out" }, { status: 401 });
    if (!account.stripeCustomerId) return NextResponse.json({ error: "invalid" }, { status: 400 });
    const session = await s.billingPortal.sessions.create({
      customer: account.stripeCustomerId,
      return_url: `${appUrl(req)}/tilaus`,
    });
    return NextResponse.json({ url: session.url });
  } catch {
    console.error("billing/portal: payment service unavailable");
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
