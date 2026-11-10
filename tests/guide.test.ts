import { describe, expect, it } from "vitest";
import { MAX_CONTEXT_CHARS, MAX_MESSAGES, buildContext, buildSystemPrompt, validateGuideRequest } from "@/lib/guide";

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

describe("buildContext", () => {
  it("kokoaa syyn ja viimeisimmät kirjoitukset vanhimmasta uusimpaan", () => {
    const c = buildContext({
      reason: "Menneisyys painaa",
      days: { "2026-11-02": { task: "toinen" }, "2026-11-01": { morning: "ensimmäinen" }, "2026-11-03": { moments: 2 } },
    });
    expect(c).toContain("Menneisyys painaa");
    expect(c.indexOf("ensimmäinen")).toBeLessThan(c.indexOf("toinen"));
    expect(c).not.toContain("2026-11-03");
  });

  it("jättää vanhemmat päivät pois eikä katkaise merkintää, kun tilaa ei ole", () => {
    const long = "x".repeat(5000);
    const c = buildContext({ reason: "", days: { "2026-11-01": { task: `vanha${long}` }, "2026-11-02": { task: `uusi${long}` } } });
    expect(c.length).toBeLessThanOrEqual(MAX_CONTEXT_CHARS);
    expect(c).toContain("uusi");
    expect(c).not.toContain("vanha");
  });

  it("on tyhjä uudelle käyttäjälle, ja kehote kertoo ensikohtaamisesta", () => {
    expect(buildContext({ reason: "", days: {} })).toBe("");
    const p = buildSystemPrompt({ lang: "fi", mistName: "a", stepTitle: "b", stepTheme: "c", context: "" });
    expect(p).toContain("meeting them for the first time");
    expect(p).toContain("not committed to any religious");
  });

  it("kulkee kehotteeseen asti", () => {
    const p = buildSystemPrompt({ lang: "fi", mistName: "a", stepTitle: "b", stepTheme: "c", context: "Task writing: kauna isää kohtaan" });
    expect(p).toContain("kauna isää kohtaan");
  });
});

import { DEFAULT_VOICES, MAX_SPEAK_CHARS, buildSsml, validateSpeakRequest } from "@/lib/speech";

describe("oppaan ääni", () => {
  it("rakentaa SSML:n oikealla äänellä ja pehmeällä tahdilla", () => {
    const ssml = buildSsml("Olen tässä.", "fi");
    expect(ssml).toContain(DEFAULT_VOICES.fi);
    expect(ssml).toContain('xml:lang="fi-FI"');
    expect(ssml).toContain('rate="-10%"');
    expect(buildSsml("I am here.", "en", "en-GB-SoniaNeural")).toContain("en-GB-SoniaNeural");
  });

  it("ei päästä tekstiä tai äänen nimeä rikkomaan SSML:ää", () => {
    const ssml = buildSsml(`<break/> & "lainaus" 'x'`, "fi", 'x"><evil/>');
    expect(ssml).toContain("&lt;break/&gt; &amp; &quot;lainaus&quot; &apos;x&apos;");
    expect(ssml).not.toContain("<evil");
    expect(ssml).toContain(DEFAULT_VOICES.fi);
  });

  it("tarkistaa pyynnön eikä katkaise liian pitkää tekstiä", () => {
    expect(validateSpeakRequest({ text: " hei ", lang: "fi" })).toEqual({ ok: true, value: { text: "hei", lang: "fi" } });
    expect(validateSpeakRequest({ text: "", lang: "fi" }).ok).toBe(false);
    expect(validateSpeakRequest({ text: "hei", lang: "sv" }).ok).toBe(false);
    expect(validateSpeakRequest({ text: "x".repeat(MAX_SPEAK_CHARS + 1), lang: "en" })).toEqual({ ok: false, error: "too_long" });
  });
});
