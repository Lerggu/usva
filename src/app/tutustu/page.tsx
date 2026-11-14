"use client";

import Link from "next/link";
import { useState } from "react";
import { Shell } from "@/components/Shell";
import { Mist } from "@/components/Mist";
import { useUsva } from "@/lib/store";
import { totalLights } from "@/lib/progress";
import type { Key } from "@/lib/i18n";

const STEPS: Key[] = ["tut1", "tut2", "tut3", "tut4"];

// Usva kertoo itse, miten sitä käytetään: neljä lyhyttä ajatusta, yksi kerrallaan.
export default function IntroPage() {
  const { ready, state, t } = useUsva();
  const [i, setI] = useState(0);
  if (!ready) return <Shell nav={false}>{null}</Shell>;
  const last = i === STEPS.length - 1;

  return (
    <Shell nav={false}>
      <div className="flex flex-col items-center gap-6 pt-2 text-center">
        <Mist lights={totalLights(state)} mood="listening" ring={i + 1} size="13rem" />
        <ol className="flex justify-center gap-2" aria-hidden="true">
          {STEPS.map((k, n) => (
            <li key={k} className={`h-2 w-8 rounded-full ${n <= i ? "bg-aurora" : "bg-lilac/25"}`} />
          ))}
        </ol>
        <p key={i} className="serif min-h-40 text-2xl leading-relaxed" aria-live="polite">
          {i === 0 && state.userName ? `${state.userName}, ` : ""}
          {i === 0 && state.userName ? t(STEPS[i]).charAt(0).toLowerCase() + t(STEPS[i]).slice(1) : t(STEPS[i])}
        </p>
        {last ? (
          <Link className="btn btn-primary" href="/">
            {t("tutStart")}
          </Link>
        ) : (
          <button className="btn btn-primary" onClick={() => setI(i + 1)}>
            {t("continue")}
          </button>
        )}
        {i > 0 && (
          <button className="btn btn-quiet" onClick={() => setI(i - 1)}>
            {t("back")}
          </button>
        )}
      </div>
    </Shell>
  );
}
