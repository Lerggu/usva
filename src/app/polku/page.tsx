"use client";

import { Shell } from "@/components/Shell";
import { StepMark } from "@/components/DrumRing";
import { useUsva } from "@/lib/store";
import { STEP_TITLES, STEPS } from "@/lib/program";
import { badges, currentStepNumber, dayLights, lastSevenDays, presenceDays, totalLights } from "@/lib/progress";
import type { Key } from "@/lib/i18n";

const STATION = 104; // yhden vaiheen korkeus polulla, px

// Polku mutkittelee vasemman ja oikean reunan välillä kuin tunturipolku.
function trailPath(count: number): string {
  let d = "";
  for (let i = 0; i < count; i++) {
    const x = i % 2 === 0 ? 9 : 91;
    const y = i * STATION + STATION / 2;
    if (i === 0) d += `M ${x} ${y}`;
    else {
      const px = (i - 1) % 2 === 0 ? 9 : 91;
      const py = y - STATION;
      d += ` C ${px} ${py + STATION * 0.6}, ${x} ${y - STATION * 0.6}, ${x} ${y}`;
    }
  }
  return d;
}

export default function PathPage() {
  const { ready, state, today, t } = useUsva();
  if (!ready) return <Shell>{null}</Shell>;
  const current = currentStepNumber(state, today);
  const week = lastSevenDays(new Date());
  const earned = badges(state);
  const weekday = new Intl.DateTimeFormat(state.lang, { weekday: "short" });
  const count = STEP_TITLES.length;

  return (
    <Shell>
      <div className="space-y-7 pt-2">
        <h1 className="serif text-3xl">{t("pathTitle")}</h1>

        <section className="card space-y-3">
          <h2 className="text-xs uppercase tracking-[0.2em] text-soft">{t("week")}</h2>
          <ol className="flex justify-between">
            {week.map((k) => {
              const n = dayLights(state.days[k]);
              return (
                <li key={k} className="flex flex-col items-center gap-1 text-sm text-soft">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-lilac/30"
                    style={{ background: n ? `rgba(110,255,214,${Math.min(0.12 + n * 0.1, 0.6)})` : "transparent" }}
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
          <h2 className="text-xs uppercase tracking-[0.2em] text-soft">{t("badgesTitle")}</h2>
          {earned.length === 0 ? (
            <p className="text-soft">{t("noBadges")}</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {earned.map((b) => (
                <li key={b} className="rounded-full border border-aurora/40 px-3 py-1.5 text-aurora">
                  ✦ {t(`b_${b}` as Key)}
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="trail" style={{ height: count * STATION }}>
          <svg
            className="trail-line"
            viewBox={`0 0 100 ${count * STATION}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d={trailPath(count)} className="trail-ahead" />
            <path d={trailPath(current)} className="trail-walked" />
          </svg>
          <ol>
            {STEP_TITLES.map((title, i) => {
              const n = i + 1;
              const open = n <= STEPS.length;
              const walked = n < current;
              const here = n === current;
              return (
                <li
                  key={n}
                  className={`trail-station ${i % 2 === 0 ? "" : "trail-station-right"}`}
                  style={{ top: i * STATION, height: STATION, opacity: n > current ? (open ? 0.75 : 0.5) : 1 }}
                  aria-current={here ? "step" : undefined}
                >
                  <span className={`trail-mark ${here ? "trail-mark-here" : ""} ${walked ? "trail-mark-walked" : ""}`}>
                    <StepMark index={i} lit={walked || here} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-[0.2em] text-soft">
                      {t("stepLabel")} {n}
                    </span>
                    <span className="serif block text-xl leading-tight">{title[state.lang]}</span>
                    <span className={`block text-sm ${here ? "text-aurora" : "text-soft"}`}>
                      {here ? t("stepNow") : open ? STEPS[i].theme[state.lang] : t("stepLater")}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Shell>
  );
}
