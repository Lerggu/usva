"use client";

import type { AccountInfo, Lang } from "./progress";

export type ServerAccount = AccountInfo & { name: string; mistName: string };
export type AuthError = "email" | "wrong" | "expired" | "wait" | "fail";

async function post<T>(url: string, body: unknown): Promise<{ ok: true; data: T } | { ok: false; error: AuthError }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json()) as T & { error?: string };
    if (res.ok) return { ok: true, data };
    const e = data.error;
    return { ok: false, error: e === "email" || e === "wrong" || e === "expired" || e === "wait" ? e : "fail" };
  } catch {
    return { ok: false, error: "fail" };
  }
}

export type Me = { enabled: boolean; billing?: boolean; account: ServerAccount | null };
export type Plan = { id: "yearly" | "monthly"; amount: number; currency: string; interval: "year" | "month" };

export async function fetchMe(): Promise<Me> {
  try {
    const res = await fetch("/api/auth/me");
    return (await res.json()) as Me;
  } catch {
    return { enabled: false, account: null };
  }
}

export const startSignIn = (email: string, lang: Lang) => post<{ ok: true }>("/api/auth/start", { email, lang });

export const verifyCode = (email: string, code: string, lang: Lang) =>
  post<{ account: ServerAccount; isNew: boolean }>("/api/auth/verify", { email, code, lang });

export const saveProfile = (profile: { name?: string; mistName?: string; lang?: Lang }) =>
  post<{ account: ServerAccount }>("/api/auth/profile", profile);

export const signOut = () => post<{ ok: true }>("/api/auth/logout", {});

export function toInfo(a: ServerAccount): AccountInfo {
  return { email: a.email, status: a.status, trialEndsAt: a.trialEndsAt, paidUntil: a.paidUntil };
}

export async function fetchPlans(): Promise<Plan[]> {
  try {
    const res = await fetch("/api/billing/plans");
    return ((await res.json()) as { plans: Plan[] }).plans ?? [];
  } catch {
    return [];
  }
}

// Palauttaa Stripen sivun osoitteen, johon käyttäjä ohjataan.
export async function openCheckout(plan: Plan["id"]): Promise<string | null> {
  const res = await post<{ url: string }>("/api/billing/checkout", { plan });
  return res.ok ? res.data.url : null;
}

export async function openPortal(): Promise<string | null> {
  const res = await post<{ url: string }>("/api/billing/portal", {});
  return res.ok ? res.data.url : null;
}
