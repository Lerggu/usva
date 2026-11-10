"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { Shell } from "@/components/Shell";
import { CrisisCard } from "@/components/CrisisCard";
import { useUsva } from "@/lib/store";
import { taskFor } from "@/lib/progress";
import { detectCrisis } from "@/lib/safety";

type Moment = "aamu" | "tehtava" | "ilta";

export default function MomentPage() {
  const { moment } = useParams<{ moment: string }>();
  const { ready, state, today, t, updateToday } = useUsva();
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [saved, setSaved] = useState(false);
  const [crisis, setCrisis] = useState(false);

  if (moment !== "aamu" && moment !== "tehtava" && moment !== "ilta") notFound();
  const m = moment as Moment;
  if (!ready) return <Shell>{null}</Shell>;

  const log = state.days[today] ?? {};
  const task = taskFor(state, today);
  const lang = state.lang;

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
          if (canSave) save();
        }}
      >
        {m === "aamu" && (
          <>
            <label htmlFor="f-a" className="block text-xl leading-relaxed">
              {t("morningQ")}
            </label>
            <textarea id="f-a" className="field" rows={3} placeholder={t("morningPh")} value={a} onChange={(e) => setA(e.target.value)} />
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
            <textarea id="f-a" className="field" rows={7} placeholder={t("taskPh")} value={a} onChange={(e) => setA(e.target.value)} />
          </>
        )}

        {m === "ilta" && (
          <>
            <label htmlFor="f-a" className="block text-lg">
              {t("eveHeavy")}
            </label>
            <textarea id="f-a" className="field" rows={2} value={a} onChange={(e) => setA(e.target.value)} />
            <label htmlFor="f-b" className="block text-lg">
              {t("evePart")}
            </label>
            <textarea id="f-b" className="field" rows={2} value={b} onChange={(e) => setB(e.target.value)} />
            <label htmlFor="f-c" className="block text-lg">
              {t("eveGrateful")}
            </label>
            <textarea id="f-c" className="field" rows={2} value={c} onChange={(e) => setC(e.target.value)} />
          </>
        )}

        <button className="btn btn-primary" type="submit" disabled={!canSave} style={{ opacity: canSave ? 1 : 0.5 }}>
          {t("save")}
        </button>
        <Link className="btn btn-quiet" href="/">
          {t("skip")}
        </Link>
      </form>
    </Shell>
  );
}
