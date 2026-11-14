import { NextResponse } from "next/server";
import { MAX_CODE_ATTEMPTS, hashCode, newAccount, normalizeEmail, safeEqual, toPublic } from "@/lib/server/account";
import { allow, authContext, clientIp, setSession } from "@/lib/server/auth";

export const runtime = "nodejs";

// Tarkistaa koodin. Oikea koodi kirjaa sisään ja luo tilin, jos sitä ei vielä ole:
// maksuton kokeilu alkaa tilin luomisesta.
export async function POST(req: Request) {
  const ctx = authContext();
  if (!ctx) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  if (!allow("verify", clientIp(req), 30, 10 * 60_000)) return NextResponse.json({ error: "wait" }, { status: 429 });

  let body: { email?: unknown; code?: unknown; lang?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const email = normalizeEmail(body.email);
  const code = typeof body.code === "string" ? body.code.replace(/\D/g, "") : "";
  if (!email || code.length !== 6) return NextResponse.json({ error: "wrong" }, { status: 400 });

  try {
    const record = await ctx.store.getCode(email);
    if (!record || record.expiresAt < Date.now() || record.attempts >= MAX_CODE_ATTEMPTS) {
      if (record) await ctx.store.deleteCode(email);
      return NextResponse.json({ error: "expired" }, { status: 400 });
    }
    if (!safeEqual(record.hash, hashCode(email, code, ctx.secret))) {
      await ctx.store.putCode(email, { ...record, attempts: record.attempts + 1 });
      return NextResponse.json({ error: "wrong" }, { status: 400 });
    }
    await ctx.store.deleteCode(email);

    let account = await ctx.store.getAccount(email);
    const isNew = !account;
    if (!account) {
      account = newAccount(email, body.lang === "en" ? "en" : "fi");
      await ctx.store.putAccount(account);
    }
    const res = NextResponse.json({ account: toPublic(account), isNew });
    setSession(res, email, ctx);
    return res;
  } catch {
    console.error("auth/verify: store unavailable");
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
