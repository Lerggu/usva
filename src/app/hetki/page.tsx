"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Shell } from "@/components/Shell";
import { Mist } from "@/components/Mist";
import { useUsva } from "@/lib/store";
import { currentStepNumber, totalLights } from "@/lib/progress";
import { Drum } from "@/lib/drum";

const IN_MS = 4000;
const OUT_MS = 6000;
const CYCLES = 6;

type Phase = "intro" | "in" | "out" | "end";

export default function PresentMomentPage() {
  const { t, state, today, update, updateToday } = useUsva();
  const drumRef = useRef<Drum | null>(null);
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

  // Rumpu soi vain hengityksen ajan ja vaikenee, kun näkymästä poistutaan.
  useEffect(() => {
    if (!breathing) drumRef.current?.stop();
  }, [breathing]);
  useEffect(() => () => drumRef.current?.dispose(), []);

  return (
    <Shell>
      <div className="flex flex-col items-center gap-8 pt-6 text-center">
        <Mist
          lights={totalLights(state)}
          breath={breathing ? phase : undefined}
          breathMs={phase === "in" ? IN_MS : OUT_MS}
          size="16rem"
          ring={currentStepNumber(state, today)}
          drum={breathing}
        />
        <p className="serif min-h-16 text-3xl leading-relaxed" aria-live="polite">
          {phase === "intro" && t("breatheIntro")}
          {phase === "in" && t("breatheIn")}
          {phase === "out" && t("breatheOut")}
          {phase === "end" && t("breatheEnd")}
        </p>
        {phase === "intro" && (
          <button
            className="btn btn-primary"
            onClick={() => {
              if (state.drum) {
                drumRef.current ??= new Drum();
                drumRef.current.start();
              }
              setCycle(0);
              setPhase("in");
            }}
          >
            {t("breatheStart")}
          </button>
        )}
        {phase === "intro" && (
          <button
            type="button"
            className="btn btn-quiet"
            aria-pressed={state.drum}
            onClick={() => update((prev) => ({ ...prev, drum: !prev.drum }))}
          >
            {t(state.drum ? "drumOn" : "drumOff")}
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
