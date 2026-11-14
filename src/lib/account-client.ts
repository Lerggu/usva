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

export async function fetchMe(): Promise<{ enabled: boolean; account: ServerAccount | null }> {
  try {
    const res = await fetch("/api/auth/me");
    return (await res.json()) as { enabled: boolean; account: ServerAccount | null };
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
