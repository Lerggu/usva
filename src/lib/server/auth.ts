import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import { SESSION_DAYS, readSession, signSession, type Account } from "./account";
import { mailConfigured } from "./mail";
import { MemoryStore, TableStore, type Store } from "./store";

const COOKIE = "usva_session";
const DEV = process.env.USVA_DEV_AUTH === "1";

let store: Store | null | undefined;

function getStore(): Store | null {
  if (store === undefined) {
    const conn = process.env.AZURE_STORAGE_CONNECTION_STRING;
    store = conn ? new TableStore(conn) : DEV ? new MemoryStore() : null;
  }
  return store;
}

function secret(): string | null {
  const s = process.env.SESSION_SECRET;
  if (s && s.length >= 32) return s;
  return DEV ? "usva-development-secret-not-for-production" : null;
}

export type AuthContext = { store: Store; secret: string };

// Tilit ovat käytössä vasta, kun tallennus, sähköposti ja allekirjoitusavain on
// määritetty. Muuten sovellus toimii kuten ennen, ilman kirjautumista.
export function authContext(): AuthContext | null {
  const s = getStore();
  const k = secret();
  if (!s || !k || !(mailConfigured() || DEV)) return null;
  return { store: s, secret: k };
}

export async function currentAccount(ctx: AuthContext): Promise<Account | null> {
  const jar = await cookies();
  const email = readSession(jar.get(COOKIE)?.value, ctx.secret);
  return email ? ctx.store.getAccount(email) : null;
}

export function setSession(res: NextResponse, email: string, ctx: AuthContext) {
  res.cookies.set(COOKIE, signSession(email, ctx.secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86_400,
  });
}

export function clearSession(res: NextResponse) {
  res.cookies.set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

const hits = new Map<string, number[]>();

export function allow(bucket: string, ip: string, max: number, windowMs: number): boolean {
  const id = `${bucket}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(id) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(id, recent);
    return false;
  }
  recent.push(now);
  hits.set(id, recent);
  return true;
}

export function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}
