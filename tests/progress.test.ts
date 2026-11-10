import { describe, expect, it } from "vitest";
import {
  INITIAL,
  badges,
  dayKey,
  dayLights,
  lastSevenDays,
  registerVisit,
  taskFor,
  totalLights,
  type State,
} from "@/lib/progress";
import { STEPS, STEP_TITLES, TASKS_PER_STEP } from "@/lib/program";

const base: State = { ...INITIAL, onboarded: true, startDate: "2026-11-01", lastVisit: "2026-11-01" };

describe("valopisteet", () => {
  it("laskee päivän valot ja rajaa hengityshetket kolmeen", () => {
    expect(dayLights(undefined)).toBe(0);
    expect(dayLights({ morning: "a", task: "b", evening: { heavy: "", part: "", grateful: "c" } })).toBe(4);
    expect(dayLights({ moments: 10 })).toBe(3);
  });

  it("valo ei vähene poissaolosta, ja paluu tuo lisää", () => {
    const s: State = { ...base, days: { "2026-11-01": { morning: "a", task: "b" } } };
    expect(totalLights(s)).toBe(3);
    const back = registerVisit(s, "2026-11-20");
    expect(back.returns).toBe(1);
    expect(totalLights(back)).toBe(5);
    expect(badges(back)).toContain("return");
  });

  it("peräkkäiset päivät eivät ole paluu", () => {
    expect(registerVisit(base, "2026-11-02").returns).toBe(0);
    expect(registerVisit(base, "2026-11-01")).toBe(base);
  });
});

describe("päivän tehtävä", () => {
  it("etenee tehtyjen tehtävien mukaan, ei kalenterin", () => {
    const first = taskFor(base, "2026-11-10");
    expect(first.kind === "task" && first.index).toBe(0);
    const s: State = { ...base, days: { "2026-11-01": { task: "x" }, "2026-11-09": { task: "y" } } };
    const third = taskFor(s, "2026-11-10");
    expect(third.kind === "task" && third.index).toBe(2);
  });

  it("pysyy samana saman päivän aikana tallennuksen jälkeen", () => {
    const s: State = { ...base, days: { "2026-11-10": { task: "x" } } };
    const now = taskFor(s, "2026-11-10");
    expect(now.kind === "task" && now.index).toBe(0);
  });

  it("siirtyy vapaaseen kirjoitukseen, kun sisältö loppuu", () => {
    const days: State["days"] = {};
    for (let i = 0; i < STEPS.length * TASKS_PER_STEP; i++) days[`d${i}`] = { task: "x" };
    expect(taskFor({ ...base, days }, "2027-01-01").kind).toBe("open");
  });
});

describe("sisältö", () => {
  it("jokaisella vaiheella on täysi viikko tehtäviä molemmilla kielillä", () => {
    expect(STEP_TITLES).toHaveLength(12);
    for (const step of STEPS) {
      expect(step.tasks).toHaveLength(TASKS_PER_STEP);
      for (const task of step.tasks) {
        for (const text of [task.title, task.prompt]) {
          expect(text.fi.trim()).not.toBe("");
          expect(text.en.trim()).not.toBe("");
        }
      }
    }
  });
});

describe("päivämäärät", () => {
  it("muodostaa paikallisen päiväavaimen ja seitsemän päivän ikkunan", () => {
    const d = new Date(2026, 10, 10, 23, 30);
    expect(dayKey(d)).toBe("2026-11-10");
    const week = lastSevenDays(d);
    expect(week).toHaveLength(7);
    expect(week[0]).toBe("2026-11-04");
    expect(week[6]).toBe("2026-11-10");
  });
});

import { THOUGHTS, thoughtFor } from "@/lib/thoughts";

describe("päivän ajatus", () => {
  it("on sama koko päivän ja vaihtuu seuraavana päivänä", () => {
    expect(thoughtFor("2026-11-10")).toBe(thoughtFor("2026-11-10"));
    expect(thoughtFor("2026-11-11")).not.toBe(thoughtFor("2026-11-10"));
  });

  it("kiertää kaikki ajatukset, ja jokainen on molemmilla kielillä", () => {
    const seen = new Set<unknown>();
    for (let i = 0; i < THOUGHTS.length; i++) {
      seen.add(thoughtFor(new Date(Date.UTC(2026, 0, 1 + i)).toISOString().slice(0, 10)));
    }
    expect(THOUGHTS).toHaveLength(56);
    expect(THOUGHTS.every(Boolean)).toBe(true);
    expect(seen.size).toBe(THOUGHTS.length);
    for (const th of THOUGHTS) {
      for (const text of [th.theme, th.text]) {
        expect(text.fi.trim()).not.toBe("");
        expect(text.en.trim()).not.toBe("");
      }
    }
  });
});
