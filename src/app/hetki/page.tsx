"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Shell } from "@/components/Shell";
import { Mist } from "@/components/Mist";
import { useUsva } from "@/lib/store";
import { totalLights } from "@/lib/progress";

const IN_MS = 4000;
const OUT_MS = 6000;
const CYCLES = 6;

type Phase = "intro" | "in" | "out" | "end";

export default function PresentMomentPage() {
  const { t, state, updateToday } = useUsva();
  const [phase, setPhase] = useState<Phase>("intro");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (phase !== "in" && phase !== "out") return;
    const id = window.setTimeout(
      () => {
        if (phase === "in") {
          setPhase("out");
        } else if (cycle + 1 >= CYCLES) {
          setPhase("end");
          if (state.onboarded) updateToday((d) => ({ ...d, moments: (d.moments ?? 0) + 1 }));
        } else {
          setCycle((c) => c + 1);
          setPhase("in");
        }
      },
      phase === "in" ? IN_MS : OUT_MS,
    );
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, cycle]);

  const breathing = phase === "in" || phase === "out";

  return (
    <Shell>
      <div className="flex flex-col items-center gap-8 pt-6 text-center">
        <Mist
          lights={totalLights(state)}
          breath={breathing ? phase : undefined}
          breathMs={phase === "in" ? IN_MS : OUT_MS}
          size="16rem"
        />
        <p className="min-h-16 text-2xl leading-relaxed" aria-live="polite">
          {phase === "intro" && t("breatheIntro")}
          {phase === "in" && t("breatheIn")}
          {phase === "out" && t("breatheOut")}
          {phase === "end" && t("breatheEnd")}
        </p>
        {phase === "intro" && (
          <button
            className="btn btn-primary"
            onClick={() => {
              setCycle(0);
              setPhase("in");
            }}
          >
            {t("breatheStart")}
          </button>
        )}
        {phase === "end" && (
          <Link className="btn" href="/">
            {t("continue")}
          </Link>
        )}
      </div>
    </Shell>
  );
}
