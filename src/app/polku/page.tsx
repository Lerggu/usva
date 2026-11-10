"use client";

import { Shell } from "@/components/Shell";
import { useUsva } from "@/lib/store";
import { STEP_TITLES, STEPS } from "@/lib/program";
import { badges, currentStepNumber, dayLights, lastSevenDays, presenceDays, totalLights } from "@/lib/progress";
import type { Key } from "@/lib/i18n";

export default function PathPage() {
  const { ready, state, today, t } = useUsva();
  if (!ready) return <Shell>{null}</Shell>;
  const current = currentStepNumber(state, today);
  const week = lastSevenDays(new Date());
  const earned = badges(state);
  const weekday = new Intl.DateTimeFormat(state.lang, { weekday: "short" });

  return (
    <Shell>
      <div className="space-y-6 pt-2">
        <h1 className="text-2xl">{t("pathTitle")}</h1>

        <section className="card space-y-3">
          <h2 className="text-sm uppercase tracking-widest text-soft">{t("week")}</h2>
          <ol className="flex justify-between">
            {week.map((k) => {
              const n = dayLights(state.days[k]);
              return (
                <li key={k} className="flex flex-col items-center gap-1 text-sm text-soft">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-lilac/30"
                    style={{ background: n ? `rgba(155,123,255,${Math.min(0.25 + n * 0.12, 0.9)})` : "transparent" }}
                  >
                    {n || ""}
                  </span>
                  {weekday.format(new Date(`${k}T12:00:00`))}
                </li>
              );
            })}
          </ol>
          <p className="text-soft">
            {presenceDays(state)} {t("presenceDays")} · {totalLights(state)} {t("lights")}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm uppercase tracking-widest text-soft">{t("badgesTitle")}</h2>
          {earned.length === 0 ? (
            <p className="text-soft">{t("noBadges")}</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {earned.map((b) => (
                <li key={b} className="rounded-full border border-lilac/40 px-3 py-1.5 text-lilac">
                  ✦ {t(`b_${b}` as Key)}
                </li>
              ))}
            </ul>
          )}
        </section>

        <ol className="space-y-2">
          {STEP_TITLES.map((title, i) => {
            const n = i + 1;
            const open = n <= STEPS.length;
            const isCurrent = n === current;
            return (
              <li key={n} className="card flex items-center gap-3" style={{ opacity: open ? 1 : 0.55 }}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-lilac/40 text-lilac">
                  {n}
                </span>
                <span>
                  <span className="block text-lg">{title[state.lang]}</span>
                  <span className="block text-sm text-soft">
                    {isCurrent ? t("stepNow") : open ? STEPS[i].theme[state.lang] : t("stepLater")}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </Shell>
  );
}
