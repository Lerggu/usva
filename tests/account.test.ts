import { describe, expect, it } from "vitest";
import {
  accountStatus,
  cleanName,
  hashCode,
  newAccount,
  newCode,
  normalizeEmail,
  readSession,
  safeEqual,
  signSession,
  toPublic,
} from "@/lib/server/account";
import { MemoryStore } from "@/lib/server/store";

const SECRET = "x".repeat(40);

describe("tili", () => {
  it("normalisoi sähköpostin ja hylkää kelvottoman", () => {
    expect(normalizeEmail("  Anna@Example.COM ")).toBe("anna@example.com");
    for (const bad of ["", "anna", "anna@", "a b@c.fi", "a@b", 5, null]) expect(normalizeEmail(bad)).toBeNull();
  });

  it("siistii nimen ja rajaa pituuden", () => {
    expect(cleanName("  Markku ")).toBe("Markku");
    expect(cleanName("<b>x</b>")).toBe("bx/b");
    expect(cleanName("x".repeat(25))).toBeNull();
    expect(cleanName(undefined)).toBeNull();
  });

  it("aloittaa seitsemän päivän kokeilun ja tunnistaa tilat", () => {
    const now = new Date("2026-11-14T10:00:00Z");
    const a = newAccount("a@b.fi", "fi", now);
    expect(a.trialEndsAt).toBe("2026-11-21T10:00:00.000Z");
    expect(accountStatus(a, now)).toBe("trial");
    expect(accountStatus(a, new Date("2026-11-22T00:00:00Z"))).toBe("expired");
    expect(accountStatus({ ...a, paidUntil: "2027-11-14T00:00:00Z" }, new Date("2026-12-01T00:00:00Z"))).toBe("active");
    expect(accountStatus({ ...a, paidUntil: "2026-11-01T00:00:00Z" }, new Date("2026-12-01T00:00:00Z"))).toBe("expired");
    expect(toPublic(a, now)).not.toHaveProperty("createdAt");
  });
});

describe("kirjautumiskoodi", () => {
  it("on kuusi numeroa ja tiiviste on sidottu osoitteeseen ja avaimeen", () => {
    for (let i = 0; i < 50; i++) expect(newCode()).toMatch(/^\d{6}$/);
    const h = hashCode("a@b.fi", "123456", SECRET);
    expect(h).toBe(hashCode("a@b.fi", "123456", SECRET));
    expect(h).not.toBe(hashCode("c@b.fi", "123456", SECRET));
    expect(h).not.toBe(hashCode("a@b.fi", "123456", "y".repeat(40)));
    expect(h).not.toContain("123456");
    expect(safeEqual(h, h)).toBe(true);
    expect(safeEqual(h, "lyhyt")).toBe(false);
  });
});

describe("kirjautumiseväste", () => {
  it("palauttaa osoitteen vain ehjästä ja voimassa olevasta evästeestä", () => {
    const now = Date.UTC(2026, 10, 14);
    const token = signSession("a@b.fi", SECRET, now);
    expect(readSession(token, SECRET, now)).toBe("a@b.fi");
    expect(readSession(token, "y".repeat(40), now)).toBeNull();
    expect(readSession(token, SECRET, now + 181 * 86_400_000)).toBeNull();
    const [body, mac] = token.split(".");
    const forged = Buffer.from(JSON.stringify({ e: "muu@b.fi", x: now + 1e10 })).toString("base64url");
    expect(readSession(`${forged}.${mac}`, SECRET, now)).toBeNull();
    expect(readSession(body, SECRET, now)).toBeNull();
    expect(readSession(undefined, SECRET, now)).toBeNull();
  });
});

describe("muistitallennus", () => {
  it("tallentaa ja poistaa tilin ja koodin", async () => {
    const store = new MemoryStore();
    expect(await store.getAccount("a@b.fi")).toBeNull();
    await store.putAccount(newAccount("a@b.fi", "fi"));
    expect((await store.getAccount("a@b.fi"))?.email).toBe("a@b.fi");
    await store.putCode("a@b.fi", { hash: "h", expiresAt: 1, attempts: 0, sentAt: 0 });
    expect((await store.getCode("a@b.fi"))?.hash).toBe("h");
    await store.deleteCode("a@b.fi");
    expect(await store.getCode("a@b.fi")).toBeNull();
  });
});

import { applyPayment, applyRefund, isEntitled } from "@/lib/server/account";

describe("tilaus", () => {
  const now = new Date("2026-12-01T00:00:00Z");
  const base = newAccount("a@b.fi", "fi", new Date("2026-11-14T10:00:00Z"));

  it("maksu antaa ajan jakson loppuun ja päivän yli, eikä lyhennä pidempää aikaa", () => {
    const end = Date.UTC(2027, 10, 14) / 1000;
    const paid = applyPayment(base, end, "cus_1");
    expect(paid.paidUntil).toBe("2027-11-15T00:00:00.000Z");
    expect(paid.stripeCustomerId).toBe("cus_1");
    expect(accountStatus(paid, now)).toBe("active");
    const earlier = applyPayment(paid, Date.UTC(2027, 0, 1) / 1000, null);
    expect(earlier.paidUntil).toBe("2027-11-15T00:00:00.000Z");
    expect(earlier.stripeCustomerId).toBe("cus_1");
  });

  it("palautus päättää maksetun ajan heti", () => {
    const refunded = applyRefund(applyPayment(base, Date.UTC(2027, 10, 14) / 1000, "cus_1"));
    expect(refunded.paidUntil).toBeNull();
    expect(accountStatus(refunded, now)).toBe("expired");
    expect(refunded.stripeCustomerId).toBe("cus_1");
  });

  it("käyttöoikeus: kaikki on auki, kunnes sekä tilit että maksaminen ovat käytössä", () => {
    const on = { accounts: true, billing: true };
    expect(isEntitled(null, { accounts: false, billing: false })).toBe(true);
    expect(isEntitled(base, { accounts: true, billing: false }, now)).toBe(true);
    expect(isEntitled(null, on, now)).toBe(false);
    expect(isEntitled(base, on, new Date("2026-11-15T00:00:00Z"))).toBe(true);
    expect(isEntitled(base, on, now)).toBe(false);
    expect(isEntitled(applyPayment(base, Date.UTC(2027, 10, 14) / 1000, null), on, now)).toBe(true);
  });
});
