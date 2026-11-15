import { describe, expect, it } from "vitest";
import { LEGAL_UPDATED, PRIVACY, TERMS } from "@/lib/legal";
import { MemoryStore } from "@/lib/server/store";
import { newAccount } from "@/lib/server/account";
import { INITIAL } from "@/lib/progress";

describe("tietosuojaseloste ja käyttöehdot", () => {
  it("jokainen kohta on molemmilla kielillä eikä sisällä täyttämättömiä paikkoja", () => {
    for (const doc of [PRIVACY, TERMS]) {
      expect(doc.length).toBeGreaterThan(5);
      for (const section of doc) {
        for (const text of [section.title, ...section.body]) {
          for (const value of [text.fi, text.en]) {
            expect(value.trim()).not.toBe("");
            expect(value).not.toMatch(/\[|\]|TODO|xxx/i);
          }
        }
      }
    }
    expect(LEGAL_UPDATED).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("kertoo käyttäjälle olennaiset asiat", () => {
    const privacy = PRIVACY.flatMap((s) => s.body.map((b) => b.fi)).join(" ");
    for (const word of ["Anthropic", "Microsoft Azure", "Stripe", "suostumuksella", "tietosuojavaltuutetun", "18 vuotta"]) {
      expect(privacy).toContain(word);
    }
    const terms = TERMS.flatMap((s) => s.body.map((b) => b.fi)).join(" ");
    for (const word of ["112", "14 päivän", "seitsemän päivän", "ei ole terveydenhuollon", "kuluttajariitalautakuntaan"]) {
      expect(terms).toContain(word);
    }
  });
});

describe("suostumus ja tilin poisto", () => {
  it("suostumuksia ei ole annettu oletuksena", () => {
    expect(INITIAL.consent).toEqual({ guide: null, speech: null });
  });

  it("tilin poisto poistaa tilin tallennuksesta", async () => {
    const store = new MemoryStore();
    await store.putAccount(newAccount("a@b.fi", "fi"));
    await store.deleteAccount("a@b.fi");
    expect(await store.getAccount("a@b.fi")).toBeNull();
    await store.deleteAccount("a@b.fi");
  });
});
