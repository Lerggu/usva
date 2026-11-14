import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import type { Lang } from "../progress";

export const TRIAL_DAYS = 7;
export const CODE_TTL_MS = 10 * 60_000;
export const CODE_RESEND_MS = 60_000;
export const MAX_CODE_ATTEMPTS = 5;
export const SESSION_DAYS = 180;

// Tilille tallennetaan vain se, mitä kirjautuminen ja tilaus tarvitsevat.
// Käyttäjän kirjoitukset eivät kuulu tänne: ne pysyvät hänen laitteellaan.
export type Account = {
  email: string;
  name: string;
  mistName: string;
  lang: Lang;
  createdAt: string;
  trialEndsAt: string;
  paidUntil: string | null;
};

export type AccountStatus = "trial" | "active" | "expired";

export type PublicAccount = Pick<Account, "email" | "name" | "mistName" | "trialEndsAt" | "paidUntil"> & {
  status: AccountStatus;
};

export function accountStatus(a: Pick<Account, "trialEndsAt" | "paidUntil">, now = new Date()): AccountStatus {
  if (a.paidUntil && Date.parse(a.paidUntil) > now.getTime()) return "active";
  if (Date.parse(a.trialEndsAt) > now.getTime()) return "trial";
  return "expired";
}

export function toPublic(a: Account, now = new Date()): PublicAccount {
  return {
    email: a.email,
    name: a.name,
    mistName: a.mistName,
    trialEndsAt: a.trialEndsAt,
    paidUntil: a.paidUntil,
    status: accountStatus(a, now),
  };
}

export function newAccount(email: string, lang: Lang, now = new Date()): Account {
  return {
    email,
    name: "",
    mistName: "Usva",
    lang,
    createdAt: now.toISOString(),
    trialEndsAt: new Date(now.getTime() + TRIAL_DAYS * 86_400_000).toISOString(),
    paidUntil: null,
  };
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const email = raw.trim().toLowerCase();
  return email.length <= 254 && EMAIL.test(email) ? email : null;
}

export function cleanName(raw: unknown, max = 24): string | null {
  if (typeof raw !== "string") return null;
  const name = raw.replace(/[\u0000-\u001f<>]/g, "").trim();
  return name.length <= max ? name : null;
}

export function newCode(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

// Koodia ei tallenneta sellaisenaan, vain sen avaimellinen tiiviste.
export function hashCode(email: string, code: string, secret: string): string {
  return createHmac("sha256", secret).update(`${email}:${code}`).digest("hex");
}

export function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

// Kirjautumiseväste: allekirjoitettu osoite ja vanhenemisaika, ei muuta.
export function signSession(email: string, secret: string, now = Date.now()): string {
  const body = Buffer.from(JSON.stringify({ e: email, x: now + SESSION_DAYS * 86_400_000 })).toString("base64url");
  return `${body}.${createHmac("sha256", secret).update(body).digest("base64url")}`;
}

export function readSession(token: string | undefined, secret: string, now = Date.now()): string | null {
  if (!token) return null;
  const [body, mac] = token.split(".");
  if (!body || !mac) return null;
  if (!safeEqual(mac, createHmac("sha256", secret).update(body).digest("base64url"))) return null;
  try {
    const { e, x } = JSON.parse(Buffer.from(body, "base64url").toString()) as { e?: unknown; x?: unknown };
    return typeof e === "string" && typeof x === "number" && x > now ? e : null;
  } catch {
    return null;
  }
}
