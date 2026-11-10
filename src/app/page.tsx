"use client";

import Link from "next/link";
import { Shell } from "@/components/Shell";
import { Mist } from "@/components/Mist";
import { Onboarding } from "@/components/Onboarding";
import { useUsva } from "@/lib/store";
import { taskFor, totalLights } from "@/lib/progress";
import type { Key } from "@/lib/i18n";

function greetingKey(hour: number): Key {
  if (hour < 11) return "greetMorning";
  if (hour < 17) return "greetDay";
  return "greetEvening";
}

export default function HomePage() {
  const { ready, state, today, t } = useUsva();
  if (!ready) return <Shell nav={false}>{null}</Shell>;
  if (!state.onboarded) {
    return (
      <Shell nav={false}>
        <Onboarding />
      </Shell>
    );
  }

  const log = state.days[today] ?? {};
  const task = taskFor(state, today);
  const lights = totalLights(state);
  const allDone = !!log.morning && !!log.task && !!log.evening;
  const cameBack = state.returns > 0 && Object.keys(log).length === 0;

  const moments: { href: string; title: string; sub: string; done: boolean }[] = [
    { href: "/tanaan/aamu", title: t("momentMorning"), sub: t("momentMorningSub"), done: !!log.morning },
    {
      href: "/tanaan/tehtava",
      title: t("momentTask"),
      sub: task.kind === "task" ? task.task.title[state.lang] : "",
      done: !!log.task,
    },
    { href: "/tanaan/ilta", title: t("momentEvening"), sub: t("momentEveningSub"), done: !!log.evening },
  ];

  return (
    <Shell>
      <div className="space-y-6">
        <div className="text-center">
          <Mist lights={lights} />
          <p className="mt-2 text-xl">{t(greetingKey(new Date().getHours()))}</p>
          <p className="text-soft">
            {cameBack ? t("welcomeBack") : `${state.mistName} · ${lights} ${t("lights")}`}
          </p>
        </div>

        <Link href="/hetki" className="btn btn-primary">
          {t("presentBtn")}
          <span className="block text-sm font-normal">{t("presentSub")}</span>
        </Link>

        <section className="space-y-2" aria-label={t("today")}>
          <h2 className="text-sm uppercase tracking-widest text-soft">{t("today")}</h2>
          {moments.map((m) => (
            <Link key={m.href} href={m.href} className="card flex min-h-16 items-center justify-between gap-3">
              <span>
                <span className="block text-lg">{m.title}</span>
                {m.sub && <span className="block text-sm text-soft">{m.sub}</span>}
              </span>
              <span className={m.done ? "text-lilac" : "text-soft"} aria-label={m.done ? t("done") : undefined}>
                {m.done ? "✦" : "○"}
              </span>
            </Link>
          ))}
          {allDone && <p className="pt-2 text-center text-lilac">{t("enoughToday")}</p>}
        </section>
      </div>
    </Shell>
  );
}
