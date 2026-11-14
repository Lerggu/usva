import { NextResponse } from "next/server";
import { billingEnabled, plans } from "@/lib/server/billing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!billingEnabled()) return NextResponse.json({ enabled: false, plans: [] });
  try {
    return NextResponse.json({ enabled: true, plans: await plans() });
  } catch {
    console.error("billing/plans: payment service unavailable");
    return NextResponse.json({ enabled: true, plans: [] }, { status: 503 });
  }
}
