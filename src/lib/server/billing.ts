import Stripe from "stripe";
import { isEntitled } from "./account";
import { authContext, currentAccount } from "./auth";

export type PlanId = "yearly" | "monthly";
export type Plan = { id: PlanId; amount: number; currency: string; interval: "year" | "month" };

let client: Stripe | null = null;

// Maksaminen on käytössä, kun Stripen avaimet ja vähintään yksi hinta on määritetty.
export function stripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  client ??= new Stripe(key);
  return client;
}

export function priceId(plan: PlanId): string | null {
  return (plan === "yearly" ? process.env.STRIPE_PRICE_YEARLY : process.env.STRIPE_PRICE_MONTHLY) || null;
}

export function billingEnabled(): boolean {
  return !!stripe() && !!process.env.STRIPE_WEBHOOK_SECRET && !!(priceId("yearly") || priceId("monthly"));
}

let cached: { at: number; plans: Plan[] } | null = null;

// Hinnat luetaan Stripestä, jotta sovelluksessa näkyvä summa on aina se, joka veloitetaan.
export async function plans(): Promise<Plan[]> {
  const s = stripe();
  if (!s || !billingEnabled()) return [];
  if (cached && Date.now() - cached.at < 10 * 60_000) return cached.plans;
  const out: Plan[] = [];
  for (const id of ["yearly", "monthly"] as PlanId[]) {
    const pid = priceId(id);
    if (!pid) continue;
    const price = await s.prices.retrieve(pid);
    const raw = price.recurring?.interval;
    const interval = raw === "year" ? "year" : raw === "month" ? "month" : null;
    if (price.unit_amount === null || !interval) continue;
    out.push({ id, amount: price.unit_amount, currency: price.currency, interval });
  }
  cached = { at: Date.now(), plans: out };
  return out;
}

// Osoite, johon Stripe palauttaa käyttäjän. APP_URL on varmin; muuten pyynnön oma osoite.
export function appUrl(req: Request): string {
  const configured = process.env.APP_URL?.replace(/\/+$/, "");
  if (configured) return configured;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  return host ? `${proto}://${host}` : new URL(req.url).origin;
}

// Tarkistaa palvelimella, saako pyynnön tekijä käyttää maksullisia osia (opas ja ääni).
export async function requestEntitled(): Promise<boolean> {
  const ctx = authContext();
  const billing = billingEnabled();
  if (!ctx || !billing) return true;
  try {
    return isEntitled(await currentAccount(ctx), { accounts: true, billing });
  } catch {
    // Tallennuksen häiriö ei saa sulkea ketään ulos kesken matkan.
    return true;
  }
}
