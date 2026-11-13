"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Shell } from "@/components/Shell";
import { Mist } from "@/components/Mist";
import { CrisisCard } from "@/components/CrisisCard";
import { useUsva } from "@/lib/store";
import { currentStepNumber, totalLights, type ChatMsg } from "@/lib/progress";
import { STEPS } from "@/lib/program";
import { buildContext } from "@/lib/guide";
import { detectCrisis } from "@/lib/safety";
import { LiveEngine, type LiveError, type LiveState } from "@/lib/live";
import type { Key } from "@/lib/i18n";

const STATUS: Record<LiveState, Key> = {
  idle: "liveStart",
  listening: "liveListening",
  thinking: "liveThinking",
  speaking: "liveSpeaking",
};

// Puhekeskustelu: käyttäjä puhuu, usva vastaa ääneen, eikä puhetta näytetä tekstinä.
export default function LivePage() {
  const { ready, state, today, t, update } = useUsva();
  const [live, setLive] = useState<LiveState>("idle");
  const [error, setError] = useState<LiveError>(null);
  const [crisis, setCrisis] = useState(false);
  const mistRef = useRef<HTMLButtonElement>(null);
  const engineRef = useRef<LiveEngine | null>(null);
  // Moottori elää koko näkymän ajan, joten se lukee tuoreimman tilan viitteestä.
  const latest = useRef({ state, today, t });
  latest.current = { state, today, t };

  async function respond(spoken: string): Promise<string | null> {
    const { state: s, today: day, t: tr } = latest.current;
    if (detectCrisis(spoken)) setCrisis(true);
    const step = STEPS[currentStepNumber(s, day) - 1];
    const messages: ChatMsg[] = [...s.chat, { role: "user", content: spoken }];
    update((prev) => ({ ...prev, chat: messages }));
    try {
      const res = await fetch("/api/guide", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          lang: s.lang,
          mistName: s.mistName,
          stepTitle: step.title[s.lang],
          stepTheme: step.theme[s.lang],
          context: buildContext(s),
          spoken: true,
          messages,
        }),
      });
      if (res.ok) {
        const { text } = (await res.json()) as { text: string };
        update((prev) => ({ ...prev, chat: [...prev.chat, { role: "assistant", content: text }] }));
        return text;
      }
      return tr(res.status === 429 ? "guideBusy" : res.status === 413 ? "guideLong" : "guideResting");
    } catch {
      return tr("guideResting");
    }
  }
  const respondRef = useRef(respond);
  respondRef.current = respond;

  useEffect(() => {
    if (!ready) return;
    const engine = new LiveEngine(latest.current.state.lang, {
      onState: setLive,
      onError: setError,
      respond: (text) => respondRef.current(text),
    });
    engineRef.current = engine;
    let frame = 0;
    const paint = () => {
      mistRef.current?.style.setProperty("--mist-level", engine.level.toFixed(3));
      frame = requestAnimationFrame(paint);
    };
    paint();
    return () => {
      cancelAnimationFrame(frame);
      engine.dispose();
      engineRef.current = null;
    };
  }, [ready, state.lang]);

  if (!ready) return <Shell>{null}</Shell>;
  const moving = live === "listening" || live === "speaking";

  return (
    <Shell>
      <div className="flex flex-col items-center gap-6 pt-4 text-center">
        <button
          ref={mistRef}
          type="button"
          aria-label={t("liveMist")}
          className="rounded-full"
          onClick={() => void engineRef.current?.start()}
        >
          <Mist
            lights={totalLights(state)}
            mood={live === "thinking" ? "listening" : "calm"}
            live={moving}
            size="18rem"
          />
        </button>
        <p className="min-h-8 text-lg text-soft" aria-live="polite">
          {t(STATUS[live])}
        </p>
        {error && <p className="card text-soft">{t(error === "denied" ? "micDenied" : "micFailed")}</p>}
        {crisis && <CrisisCard />}
        <Link className="btn btn-quiet" href="/opas">
          {t("liveEnd")}
        </Link>
        <p className="text-sm text-soft">{t("guideNote")}</p>
      </div>
    </Shell>
  );
}
