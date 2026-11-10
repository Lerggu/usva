"use client";

import Link from "next/link";
import { useState } from "react";
import { Mist } from "./Mist";
import { CrisisCard } from "./CrisisCard";
import { useUsva } from "@/lib/store";
import { detectCrisis } from "@/lib/safety";
import type { Key } from "@/lib/i18n";

type Stage = "reason" | "doing" | "year" | "ask" | "offer" | "name" | "later" | "crisis";

const QUESTIONS: Record<"reason" | "doing" | "year", { q: Key; options: Key[]; next: Stage }> = {
  reason: { q: "obHello", options: ["obR1", "obR2", "obR3", "obR4"], next: "doing" },
  doing: { q: "obDone", options: ["obD1", "obD2", "obD3"], next: "year" },
  year: { q: "obYear", options: ["obY1", "obY2", "obY3"], next: "ask" },
};

// Alkukeskustelu ennen tilausta. Mitään ei käsketä: jokainen kohta tarjoaa
// vaihtoehtoja, ja "palaan myöhemmin" on aina yhtä arvokas valinta.
export function Onboarding() {
  const { t, update, today, state } = useUsva();
  const [stage, setStage] = useState<Stage>("reason");
  const [text, setText] = useState("");
  const [name, setName] = useState(state.mistName);

  function answer(stageNow: "reason" | "doing" | "year", value: string, free: boolean) {
    if (free && detectCrisis(value)) {
      setStage("crisis");
      return;
    }
    if (stageNow === "reason") update((s) => ({ ...s, reason: value }));
    setText("");
    setStage(QUESTIONS[stageNow].next);
  }

  function begin() {
    update((s) => ({
      ...s,
      onboarded: true,
      startDate: today,
      lastVisit: today,
      mistName: name.trim() || "Usva",
    }));
  }

  return (
    <div className="space-y-6">
      <Mist mood={stage === "crisis" ? "soft" : "listening"} />

      {(stage === "reason" || stage === "doing" || stage === "year") && (
        <section className="space-y-4" key={stage}>
          <p className="text-center text-xl leading-relaxed">{t(QUESTIONS[stage].q)}</p>
          <div className="space-y-2">
            {QUESTIONS[stage].options.map((o) => (
              <button key={o} className="btn" onClick={() => answer(stage, t(o), false)}>
                {t(o)}
              </button>
            ))}
          </div>
          <form
            className="space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (text.trim()) answer(stage, text.trim(), true);
            }}
          >
            <label className="block text-sm text-soft" htmlFor="own">
              {t("orWrite")}
            </label>
            <textarea id="own" className="field" rows={2} value={text} onChange={(e) => setText(e.target.value)} />
            {text.trim() && (
              <button className="btn" type="submit">
                {t("continue")}
              </button>
            )}
          </form>
        </section>
      )}

      {stage === "ask" && (
        <section className="space-y-4">
          <p className="text-center text-xl leading-relaxed">{t("obAsk")}</p>
          <button className="btn btn-primary" onClick={() => setStage("offer")}>
            {t("obAskYes")}
          </button>
          <Link className="btn" href="/hetki">
            {t("obAskLater")}
          </Link>
        </section>
      )}

      {stage === "offer" && (
        <section className="space-y-4">
          <p className="text-lg leading-relaxed">{t("obOffer")}</p>
          <div className="card space-y-2 text-center">
            <p className="text-2xl font-semibold">{t("obPrice")}</p>
            <p className="text-sm text-soft">{t("obTerms")}</p>
            <p className="text-sm text-lilac">{t("obPayNote")}</p>
          </div>
          <p className="text-center text-lg">{t("obInvite")}</p>
          <button className="btn btn-primary" onClick={() => setStage("name")}>
            {t("obStart")}
          </button>
          <button className="btn btn-quiet" onClick={() => setStage("later")}>
            {t("obNotNow")}
          </button>
        </section>
      )}

      {stage === "name" && (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            begin();
          }}
        >
          <label className="block text-center text-xl" htmlFor="mist-name">
            {t("obName")}
          </label>
          <input
            id="mist-name"
            className="field text-center"
            value={name}
            maxLength={24}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            {t("continue")}
          </button>
        </form>
      )}

      {stage === "later" && (
        <section className="space-y-4">
          <p className="text-center text-xl leading-relaxed">{t("obLaterMsg")}</p>
          <Link className="btn" href="/hetki">
            {t("presentBtn")}
          </Link>
          <button className="btn btn-quiet" onClick={() => setStage("offer")}>
            {t("back")}
          </button>
        </section>
      )}

      {stage === "crisis" && (
        <section className="space-y-4">
          <p className="text-center text-xl leading-relaxed">{t("obCrisis")}</p>
          <CrisisCard />
          <Link className="btn" href="/hetki">
            {t("presentBtn")}
          </Link>
        </section>
      )}
    </div>
  );
}
