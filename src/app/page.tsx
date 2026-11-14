"use client";

import Link from "next/link";
import { Shell } from "@/components/Shell";
import { Mist } from "@/components/Mist";
import { Onboarding } from "@/components/Onboarding";
import { useUsva } from "@/lib/store";
import { currentStepNumber, nextMoment, taskFor, totalLights, type MomentId } from "@/lib/progress";
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
  const hour = new Date().getHours();
  const allDone = !!log.morning && !!log.task && !!log.evening;
  const cameBack = state.returns > 0 && Object.keys(log).length === 0;

  const moments: Record<MomentId, { href: string; title: string; sub: string; done: boolean }> = {
    aamu: { href: "/tanaan/aamu", title: t("momentMorning"), sub: t("momentMorningSub"), done: !!log.morning },
    tehtava: {
      href: "/tanaan/tehtava",
      title: t("momentTask"),
      sub: task.kind === "task" ? task.task.title[state.lang] : "",
      done: !!log.task,
    },
    ilta: { href: "/tanaan/ilta", title: t("momentEvening"), sub: t("momentEveningSub"), done: !!log.evening },
  };
  const nextId = nextMoment(log, hour);
  // Kun päivän ajankohtaiset hetket on tehty, kutsuna on hengähdys usvan kanssa.
  const next = nextId ? moments[nextId] : { href: "/hetki", title: t("presentBtn"), sub: t("presentSub") };

  return (
    <Shell>
      <div className="space-y-7">
        <div className="pt-2 text-center">
          <Mist lights={lights} ring={currentStepNumber(state, today)} size="15rem" />
          <h1 className="serif mt-8 text-3xl">
            {t(greetingKey(hour))}
            {state.userName && `, ${state.userName}`}
          </h1>
          <p className="mt-1 text-soft">
            {cameBack ? t("welcomeBack") : `${state.mistName} · ${lights} ${t("lights")}`}
          </p>
        </div>

        <Link href={next.href} className="card card-next block">
          <span className="block text-xs uppercase tracking-[0.2em] text-aurora">{t("nextUp")}</span>
          <span className="serif mt-1 block text-2xl">{next.title}</span>
          {next.sub && <span className="mt-1 block text-soft">{next.sub}</span>}
        </Link>

        <section aria-label={t("today")}>
          <h2 className="mb-2 text-xs uppercase tracking-[0.2em] text-soft">{t("today")}</h2>
          <ul className="grid grid-cols-3 gap-2">
            {(Object.keys(moments) as MomentId[]).map((id) => {
              const m = moments[id];
              return (
                <li key={id}>
                  <Link
                    href={m.href}
                    className="card flex min-h-20 flex-col items-center justify-center gap-1 !p-2 text-center"
                    aria-label={m.done ? `${m.title}, ${t("done")}` : m.title}
                  >
                    <span className={m.done ? "text-aurora" : "text-soft"} aria-hidden="true">
                      {m.done ? "✦" : "○"}
                    </span>
                    <span className="text-sm leading-tight">{m.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          {allDone && <p className="serif pt-4 text-center text-lg text-lilac">{t("enoughToday")}</p>}
        </section>

        {nextId && (
          <Link href="/hetki" className="btn">
            {t("presentBtn")}
            <span className="block text-sm text-soft">{t("presentSub")}</span>
          </Link>
        )}
      </div>
    </Shell>
  );
}
