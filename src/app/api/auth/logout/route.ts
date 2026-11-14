import { NextResponse } from "next/server";
import { clearSession } from "@/lib/server/auth";

export const runtime = "nodejs";

export function POST() {
  const res = NextResponse.json({ ok: true });
  clearSession(res);
  return res;
}
