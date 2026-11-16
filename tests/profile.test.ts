import { describe, expect, it } from "vitest";
import { MAX_NOTE_CHARS, QUESTIONS, answered, profileContext } from "@/lib/profile";
import { buildSystemPrompt, validateGuideRequest } from "@/lib/guide";
import { INITIAL } from "@/lib/progress";

describe("tutustuminen", () => {
  it("jokainen kysymys ja vaihtoehto on molemmilla kielillä, ja avaimet ovat yksilöllisiä", () => {
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length);
    for (const q of QUESTIONS) {
      expect(q.q.fi.trim()).not.toBe("");
      expect(q.q.en.trim()).not.toBe("");
      if (q.kind === "text") continue;
      expect(new Set(q.options.map((o) => o.key)).size).toBe(q.options.length);
      for (const o of q.options) {
        for (const text of [o.label.fi, o.label.en, o.prompt]) expect(text.trim()).not.toBe("");
      }
    }
  });

  it("ei kysy sukupuolta eikä seksuaalista suuntautumista valintalistana", () => {
    const all = JSON.stringify(QUESTIONS).toLowerCase();
    for (const word of ["sukupuoli", "gender", "seksuaal", "sexual"]) expect(all).not.toContain(word);
  });

  it("on tyhjä, kun mitään ei ole kerrottu", () => {
    expect(INITIAL.profile).toEqual({});
    expect(profileContext({})).toBe("");
    expect(answered({})).toBe(0);
  });

  it("kokoaa vastaukset oppaalle ja ohittaa tuntemattomat avaimet", () => {
    const text = profileContext({
      focus: ["lovedone", "loneliness", "tuntematon"],
      duration: "over5",
      support: ["none"],
      steps: "new",
      age: "45-59",
      home: "alone",
      day: "unemployed",
      pace: "direct",
      country: "other",
      note: " Olen leski. ",
    });
    expect(text).toContain("someone close to them; loneliness.");
    expect(text).not.toContain("tuntematon");
    expect(text).toContain("more than five years");
    expect(text).toContain("no one yet");
    expect(text).toContain("They live alone.");
    expect(text).toContain("unemployed");
    expect(text).toContain("outside Finland");
    expect(text).toContain("direct guide");
    expect(text).toContain("Olen leski.");
    expect(answered({ focus: [], note: " ", age: "18-29" })).toBe(1);
  });

  it("rajaa avoimen vastauksen pituuden", () => {
    const text = profileContext({ note: "x".repeat(MAX_NOTE_CHARS + 500) });
    expect(text.length).toBeLessThan(MAX_NOTE_CHARS + 100);
  });

  it("kulkee oppaan kehotteeseen, ja liian pitkä hylätään", () => {
    const base = { lang: "fi" as const, mistName: "a", stepTitle: "b", stepTheme: "c" };
    expect(buildSystemPrompt({ ...base, profile: "They live alone." })).toContain("<situation>\nThey live alone.");
    expect(buildSystemPrompt(base)).not.toContain("<situation>");
    const ok = { lang: "fi", mistName: "Usva", stepTitle: "x", stepTheme: "y", messages: [{ role: "user", content: "Hei" }] };
    const parsed = validateGuideRequest({ ...ok, profile: " They live alone. " });
    expect(parsed.ok && parsed.value.profile).toBe("They live alone.");
    expect(validateGuideRequest({ ...ok, profile: "x".repeat(2001) }).ok).toBe(false);
  });
});
