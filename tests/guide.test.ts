import { describe, expect, it } from "vitest";
import { MAX_MESSAGES, buildSystemPrompt, validateGuideRequest } from "@/lib/guide";

const ok = {
  lang: "fi",
  mistName: "Usva",
  stepTitle: "Rehellisyys",
  stepTheme: "Mikä ei toimi?",
  messages: [{ role: "user", content: "Hei" }],
};

describe("validateGuideRequest", () => {
  it("hyväksyy kelvollisen pyynnön", () => {
    expect(validateGuideRequest(ok).ok).toBe(true);
  });

  it("hylkää väärän kielen, tyhjän ja väärin päättyvän keskustelun", () => {
    expect(validateGuideRequest({ ...ok, lang: "sv" }).ok).toBe(false);
    expect(validateGuideRequest({ ...ok, messages: [] }).ok).toBe(false);
    expect(validateGuideRequest({ ...ok, messages: [{ role: "assistant", content: "x" }] }).ok).toBe(false);
    expect(validateGuideRequest({ ...ok, messages: [{ role: "system", content: "x" }] }).ok).toBe(false);
    expect(validateGuideRequest(null).ok).toBe(false);
  });

  it("ilmoittaa liian pitkästä keskustelusta eikä katkaise sitä", () => {
    const messages = Array.from({ length: MAX_MESSAGES + 1 }, (_, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: "x",
    }));
    expect(validateGuideRequest({ ...ok, messages })).toEqual({ ok: false, error: "too_long" });
    expect(validateGuideRequest({ ...ok, messages: [{ role: "user", content: "x".repeat(6001) }] })).toEqual({
      ok: false,
      error: "too_long",
    });
  });
});

describe("buildSystemPrompt", () => {
  it("sisältää nimen, vaiheen, kielen ja kriisiohjeen", () => {
    const p = buildSystemPrompt({ lang: "fi", mistName: "Sumu", stepTitle: "Toivo", stepTheme: "Kantaako jokin?" });
    expect(p).toContain("Sumu");
    expect(p).toContain("Toivo");
    expect(p).toContain("Finnish");
    expect(p).toContain("112");
    expect(p).toContain("09 2525 0111");
    expect(buildSystemPrompt({ lang: "en", mistName: "a", stepTitle: "b", stepTheme: "c" })).toContain("Reply in English");
  });
});
