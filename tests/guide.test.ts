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

import { encodeWav } from "@/lib/wav";

describe("encodeWav", () => {
  it("kirjoittaa kelvollisen 16-bittisen mono-WAV-otsakkeen ja näytteet", () => {
    const wav = new DataView(encodeWav(new Float32Array([0, 1, -1, 2]), 16000));
    const tag = (o: number) => String.fromCharCode(wav.getUint8(o), wav.getUint8(o + 1), wav.getUint8(o + 2), wav.getUint8(o + 3));
    expect(wav.byteLength).toBe(44 + 8);
    expect([tag(0), tag(8), tag(12), tag(36)]).toEqual(["RIFF", "WAVE", "fmt ", "data"]);
    expect(wav.getUint32(4, true)).toBe(36 + 8);
    expect(wav.getUint16(22, true)).toBe(1);
    expect(wav.getUint32(24, true)).toBe(16000);
    expect(wav.getUint16(34, true)).toBe(16);
    expect(wav.getUint32(40, true)).toBe(8);
    expect([44, 46, 48, 50].map((o) => wav.getInt16(o, true))).toEqual([0, 32767, -32768, 32767]);
  });
});

describe("puhuttu keskustelu", () => {
  it("pyytää lyhyttä, puhuttua vastausta vain puhetilassa", () => {
    const base = { lang: "fi" as const, mistName: "a", stepTitle: "b", stepTheme: "c" };
    expect(buildSystemPrompt({ ...base, spoken: true })).toContain("spoken conversation");
    expect(buildSystemPrompt(base)).not.toContain("spoken conversation");
    const parsed = validateGuideRequest({ ...ok, spoken: true });
    expect(parsed.ok && parsed.value.spoken).toBe(true);
    const plain = validateGuideRequest(ok);
    expect(plain.ok && plain.value.spoken).toBe(false);
  });
});

describe("aktiivinen opas", () => {
  const base = { lang: "fi" as const, mistName: "a", stepTitle: "b", stepTheme: "c" };

  it("johtaa keskustelua ja tuntee päivän tehtävän ja nimen", () => {
    const p = buildSystemPrompt({ ...base, userName: "Markku", taskPrompt: "Mikä vie voimasi?", taskDone: false });
    expect(p).toContain("You lead the way");
    expect(p).toContain("Mikä vie voimasi?");
    expect(p).toContain("not answered it yet");
    expect(p).toContain('called "Markku"');
    expect(buildSystemPrompt({ ...base, taskPrompt: "x", taskDone: true })).toContain("already written their answer");
    expect(buildSystemPrompt(base)).toContain("do not invent one");
  });

  it("hyväksyy nimen ja tehtävän pyynnössä ja hylkää liian pitkät", () => {
    const parsed = validateGuideRequest({ ...ok, userName: " Markku ", taskPrompt: "Kysymys", taskDone: true });
    expect(parsed.ok && [parsed.value.userName, parsed.value.taskPrompt, parsed.value.taskDone]).toEqual(["Markku", "Kysymys", true]);
    expect(validateGuideRequest({ ...ok, userName: "x".repeat(41) }).ok).toBe(false);
    expect(validateGuideRequest({ ...ok, taskPrompt: 5 }).ok).toBe(false);
  });
});
