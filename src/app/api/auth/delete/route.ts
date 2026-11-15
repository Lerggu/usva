import { NextResponse } from "next/server";
import { authContext, clearSession, currentAccount } from "@/lib/server/auth";
import { stripe } from "@/lib/server/billing";

export const runtime = "nodejs";

// Poistaa kirjautuneen käyttäjän tilin. Mahdollinen tilaus päätetään ensin, jotta
// laskutus ei jatku tilin poistamisen jälkeen; jos se ei onnistu, tiliä ei poisteta.
export async function POST() {
  const ctx = authContext();
  if (!ctx) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  try {
    const account = await currentAccount(ctx);
    if (!account) return NextResponse.json({ error: "signed_out" }, { status: 401 });
    const s = stripe();
    if (s && account.stripeCustomerId) {
      const subs = await s.subscriptions.list({ customer: account.stripeCustomerId, status: "all", limit: 20 });
      for (const sub of subs.data) {
        if (sub.status !== "canceled" && sub.status !== "incomplete_expired") await s.subscriptions.cancel(sub.id);
      }
    }
    await ctx.store.deleteCode(account.email);
    await ctx.store.deleteAccount(account.email);
    const res = NextResponse.json({ ok: true });
    clearSession(res);
    return res;
  } catch {
    console.error("auth/delete: could not delete the account");
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
