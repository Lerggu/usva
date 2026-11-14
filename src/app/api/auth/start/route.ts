import { NextResponse } from "next/server";
import { CODE_RESEND_MS, CODE_TTL_MS, hashCode, newCode, normalizeEmail } from "@/lib/server/account";
import { allow, authContext, clientIp } from "@/lib/server/auth";
import { sendCode } from "@/lib/server/mail";

export const runtime = "nodejs";

// Lähettää kertakäyttöisen kirjautumiskoodin sähköpostiin. Sama reitti palvelee
// sekä uutta että palaavaa käyttäjää, joten vastaus ei paljasta, onko tiliä olemassa.
export async function POST(req: Request) {
  const ctx = authContext();
  if (!ctx) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  if (!allow("start", clientIp(req), 10, 10 * 60_000)) return NextResponse.json({ error: "wait" }, { status: 429 });

  let body: { email?: unknown; lang?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const email = normalizeEmail(body.email);
  if (!email) return NextResponse.json({ error: "email" }, { status: 400 });
  const lang = body.lang === "en" ? "en" : "fi";

  try {
    const now = Date.now();
    const previous = await ctx.store.getCode(email);
    if (previous && now - previous.sentAt < CODE_RESEND_MS) {
      return NextResponse.json({ error: "wait" }, { status: 429 });
    }
    const code = newCode();
    await ctx.store.putCode(email, {
      hash: hashCode(email, code, ctx.secret),
      expiresAt: now + CODE_TTL_MS,
      attempts: 0,
      sentAt: now,
    });
    await sendCode(email, code, lang);
    return NextResponse.json({ ok: true });
  } catch {
    console.error("auth/start: could not send code");
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
