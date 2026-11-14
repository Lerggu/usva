"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { Shell } from "@/components/Shell";
import { CrisisCard } from "@/components/CrisisCard";
import { VoiceField } from "@/components/VoiceField";
import { useUsva } from "@/lib/store";
import { taskFor } from "@/lib/progress";
import { detectCrisis } from "@/lib/safety";
import { openingFor } from "@/lib/thoughts";

type Moment = "aamu" | "tehtava" | "ilta";

export default function MomentPage() {
  const { moment } = useParams<{ moment: string }>();
  const { ready, state, today, t, updateToday } = useUsva();
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [saved, setSaved] = useState(false);
  const [crisis, setCrisis] = useState(false);
  // Iltakatsaus kulkee yksi kysymys kerrallaan.
  const [eveStep, setEveStep] = useState(0);

  if (moment !== "aamu" && moment !== "tehtava" && moment !== "ilta") notFound();
  const m = moment as Moment;
  if (!ready) return <Shell>{null}</Shell>;

  const log = state.days[today] ?? {};
  const task = taskFor(state, today);
  const lang = state.lang;
  const opening = openingFor(today);

  function save() {
    setCrisis(detectCrisis(`${a} ${b} ${c}`));
    if (m === "aamu") updateToday((d) => ({ ...d, morning: a.trim() }));
    if (m === "tehtava") updateToday((d) => ({ ...d, task: a.trim() }));
    if (m === "ilta") updateToday((d) => ({ ...d, evening: { heavy: a.trim(), part: b.trim(), grateful: c.trim() } }));
    setSaved(true);
  }

  const existing =
    m === "aamu" ? log.morning : m === "tehtava" ? log.task : log.evening ? Object.values(log.evening).filter(Boolean).join("\n\n") : undefined;

  if (saved || existing !== undefined) {
    return (
      <Shell>
        <div className="space-y-5 pt-4">
          <p className="text-center text-xl leading-relaxed text-lilac">
            {t(m === "aamu" ? "savedMorning" : m === "tehtava" ? "savedTask" : "savedEvening")}
          </p>
          {crisis && <CrisisCard />}
          {existing && <p className="card whitespace-pre-wrap text-soft">{existing}</p>}
          {m === "tehtava" && (
            <Link className="btn" href="/opas">
              {t("taskTalk")}
            </Link>
          )}
          <Link className="btn btn-primary" href="/">
            {t("continue")}
          </Link>
        </div>
      </Shell>
    );
  }

  const canSave = m === "ilta" ? !!(a.trim() || b.trim() || c.trim()) : !!a.trim();

  return (
    <Shell>
      <form
        className="space-y-5 pt-2"
        onSubmit={(e) => {
          e.preventDefault();
          // Enter ei tallenna kesken iltakatsauksen, vaan vie seuraavaan kysymykseen.
          if (m === "ilta" && eveStep < 2) setEveStep(eveStep + 1);
          else if (canSave) save();
        }}
      >
        {m === "aamu" && (
          <>
            <section className="card space-y-4" aria-label={t("openingTitle")}>
              <div className="space-y-1">
                <h2 className="text-sm uppercase tracking-widest text-soft">
                  {t("thoughtTitle")} · {opening.thought.theme[lang]}
                </h2>
                <p className="serif text-xl leading-relaxed">{opening.thought.text[lang]}</p>
              </div>
              <div className="space-y-1">
                <h2 className="text-sm uppercase tracking-widest text-soft">{t("practiceTitle")}</h2>
                <p className="leading-relaxed">{opening.practice[lang]}</p>
              </div>
              <figure className="space-y-1">
                <h2 className="text-sm uppercase tracking-widest text-soft">{t("quoteTitle")}</h2>
                <blockquote className="serif italic leading-relaxed">{opening.quote.text[lang]}</blockquote>
                <figcaption className="text-sm text-soft">
                  {opening.quote.author}
                  {opening.quote.work[lang] && `, ${opening.quote.work[lang]}`}
                </figcaption>
              </figure>
              <div className="space-y-1">
                <h2 className="text-sm uppercase tracking-widest text-soft">{t("sentenceTitle")}</h2>
                <p className="serif text-xl text-aurora">{opening.sentence[lang]}</p>
              </div>
            </section>
            <label htmlFor="f-a" className="block text-xl leading-relaxed">
              {t("morningQ")}
            </label>
            <VoiceField id="f-a" rows={3} placeholder={t("morningPh")} value={a} onChange={setA} />
          </>
        )}

        {m === "tehtava" && (
          <>
            {task.kind === "task" ? (
              <>
                <p className="text-sm uppercase tracking-widest text-soft">
                  {t("stepLabel")} {task.step.n} · {task.step.title[lang]}
                </p>
                {task.index % 7 === 0 && <p className="card text-soft">{task.step.intro[lang]}</p>}
                <h1 className="text-2xl">{task.task.title[lang]}</h1>
                <label htmlFor="f-a" className="block text-lg leading-relaxed">
                  {task.task.prompt[lang]}
                </label>
              </>
            ) : (
              <label htmlFor="f-a" className="block text-lg leading-relaxed">
                {t("openTask")}
              </label>
            )}
            <VoiceField id="f-a" rows={7} placeholder={t("taskPh")} value={a} onChange={setA} />
          </>
        )}

        {m === "ilta" && (
          <>
            <ol className="flex justify-center gap-2" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <li
                  key={i}
                  className={`h-2 w-8 rounded-full ${i <= eveStep ? "bg-aurora" : "bg-lilac/25"}`}
                  style={{ opacity: i === eveStep ? 1 : 0.6 }}
                />
              ))}
            </ol>
            <div key={eveStep} className="page-in space-y-4">
              <label htmlFor={`f-${"abc"[eveStep]}`} className="serif block text-2xl leading-relaxed">
                {t(eveStep === 0 ? "eveHeavy" : eveStep === 1 ? "evePart" : "eveGrateful")}
              </label>
              {eveStep === 0 && <VoiceField id="f-a" rows={4} value={a} onChange={setA} />}
              {eveStep === 1 && <VoiceField id="f-b" rows={4} value={b} onChange={setB} />}
              {eveStep === 2 && <VoiceField id="f-c" rows={4} value={c} onChange={setC} />}
            </div>
          </>
        )}

        {m === "ilta" && eveStep < 2 ? (
          <>
            <button className="btn btn-primary" type="button" onClick={() => setEveStep(eveStep + 1)}>
              {t("eveNext")}
            </button>
            {eveStep > 0 && (
              <button className="btn btn-quiet" type="button" onClick={() => setEveStep(eveStep - 1)}>
                {t("back")}
              </button>
            )}
          </>
        ) : (
          <button className="btn btn-primary" type="submit" disabled={!canSave} style={{ opacity: canSave ? 1 : 0.5 }}>
            {t("save")}
          </button>
        )}
        {m === "ilta" && eveStep === 2 && (
          <button className="btn btn-quiet" type="button" onClick={() => setEveStep(1)}>
            {t("back")}
          </button>
        )}
        <Link className="btn btn-quiet" href="/">
          {t("skip")}
        </Link>
      </form>
    </Shell>
  );
}
