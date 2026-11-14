import { NextResponse } from "next/server";
import { cleanName, toPublic } from "@/lib/server/account";
import { authContext, currentAccount } from "@/lib/server/auth";

export const runtime = "nodejs";

// Päivittää nimen, jolla usva kutsuu käyttäjää, ja usvan oman nimen.
export async function POST(req: Request) {
  const ctx = authContext();
  if (!ctx) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  let body: { name?: unknown; mistName?: unknown; lang?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  try {
    const account = await currentAccount(ctx);
    if (!account) return NextResponse.json({ error: "signed_out" }, { status: 401 });
    const name = body.name === undefined ? account.name : cleanName(body.name);
    const mistName = body.mistName === undefined ? account.mistName : cleanName(body.mistName);
    if (name === null || mistName === null) return NextResponse.json({ error: "invalid" }, { status: 400 });
    const next = {
      ...account,
      name,
      mistName: mistName || "Usva",
      lang: body.lang === "en" ? ("en" as const) : body.lang === "fi" ? ("fi" as const) : account.lang,
    };
    await ctx.store.putAccount(next);
    return NextResponse.json({ account: toPublic(next) });
  } catch {
    console.error("auth/profile: store unavailable");
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
