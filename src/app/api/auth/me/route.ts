import { NextResponse } from "next/server";
import { toPublic } from "@/lib/server/account";
import { authContext, currentAccount } from "@/lib/server/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Kertoo, ovatko tilit käytössä ja kuka on kirjautunut.
export async function GET() {
  const ctx = authContext();
  if (!ctx) return NextResponse.json({ enabled: false, account: null });
  try {
    const account = await currentAccount(ctx);
    return NextResponse.json({ enabled: true, account: account ? toPublic(account) : null });
  } catch {
    console.error("auth/me: store unavailable");
    return NextResponse.json({ enabled: true, account: null }, { status: 503 });
  }
}
