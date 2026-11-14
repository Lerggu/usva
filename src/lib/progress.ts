import { STEPS, TASKS_PER_STEP, type Step, type Task } from "./program";

export type Lang = "fi" | "en";

export type Evening = { heavy: string; part: string; grateful: string };

export type DayLog = {
  morning?: string;
  task?: string;
  evening?: Evening;
  moments?: number;
};

export type ChatMsg = { role: "user" | "assistant"; content: string };

export type State = {
  version: 1;
  lang: Lang;
  mistName: string;
  onboarded: boolean;
  startDate: string | null;
  reason: string;
  days: Record<string, DayLog>;
  chat: ChatMsg[];
  lastVisit: string | null;
  returns: number;
};

export const INITIAL: State = {
  version: 1,
  lang: "fi",
  mistName: "Usva",
  onboarded: false,
  startDate: null,
  reason: "",
  days: {},
  chat: [],
  lastVisit: null,
  returns: 0,
};

export const MAX_MOMENT_LIGHTS = 3;

export function dayKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function dayLights(log: DayLog | undefined): number {
  if (!log) return 0;
  return (
    (log.morning ? 1 : 0) +
    (log.task ? 2 : 0) +
    (log.evening ? 1 : 0) +
    Math.min(log.moments ?? 0, MAX_MOMENT_LIGHTS)
  );
}

// Valo ei koskaan vähene: poissaolo ei vie mitään pois, ja paluusta saa valoa.
export function totalLights(s: State): number {
  let n = s.returns * 2;
  for (const log of Object.values(s.days)) n += dayLights(log);
  return n;
}

export function presenceDays(s: State): number {
  return Object.values(s.days).filter((l) => dayLights(l) > 0).length;
}

// Tehtävä etenee tehtyjen tehtävien mukaan, ei kalenterin: väliin jäänyt päivä
// ei jätä ketään jälkeen.
export function tasksDoneBefore(s: State, today: string): number {
  return Object.entries(s.days).filter(([k, l]) => k !== today && !!l.task).length;
}

export type TodayTask =
  | { kind: "task"; step: Step; task: Task; index: number }
  | { kind: "open" };

export function taskFor(s: State, today: string): TodayTask {
  const index = tasksDoneBefore(s, today);
  const step = STEPS[Math.floor(index / TASKS_PER_STEP)];
  if (!step) return { kind: "open" };
  return { kind: "task", step, task: step.tasks[index % TASKS_PER_STEP], index };
}

export function currentStepNumber(s: State, today: string): number {
  return Math.min(Math.floor(tasksDoneBefore(s, today) / TASKS_PER_STEP) + 1, STEPS.length);
}

export function lastSevenDays(today: Date): string[] {
  const out: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    out.push(dayKey(d));
  }
  return out;
}

// Paluu lasketaan, kun edellisestä käynnistä on vähintään kolme päivää.
export function registerVisit(s: State, today: string): State {
  if (s.lastVisit === today) return s;
  let returns = s.returns;
  if (s.onboarded && s.lastVisit) {
    const gap = (Date.parse(today) - Date.parse(s.lastVisit)) / 86_400_000;
    if (gap >= 3) returns += 1;
  }
  return { ...s, lastVisit: today, returns };
}

export type Badge = "firstLight" | "week" | "month" | "return" | "step1" | "step2" | "step3" | "step4";

export function badges(s: State): Badge[] {
  const out: Badge[] = [];
  const days = presenceDays(s);
  if (days >= 1) out.push("firstLight");
  if (days >= 7) out.push("week");
  if (days >= 30) out.push("month");
  if (s.returns >= 1) out.push("return");
  const done = Object.values(s.days).filter((l) => !!l.task).length;
  for (let i = 1; i <= STEPS.length; i++) {
    if (done >= i * TASKS_PER_STEP) out.push(`step${i}` as Badge);
  }
  return out;
}

export type MomentId = "aamu" | "tehtava" | "ilta";

// Mikä päivän hetki on luontevin seuraavaksi. Koti näyttää vain tämän yhden
// kutsun, jotta ruudulla on kerrallaan yksi asia. null = kaikki ajankohtainen on tehty.
export function nextMoment(log: DayLog | undefined, hour: number): MomentId | null {
  if (!log?.morning && hour < 15) return "aamu";
  if (!log?.task) return "tehtava";
  if (!log?.evening && hour >= 17) return "ilta";
  return null;
}
