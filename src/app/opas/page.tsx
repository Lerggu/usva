"use client";

import { useEffect, useRef, useState } from "react";
import { Shell } from "@/components/Shell";
import { Mist } from "@/components/Mist";
import { CrisisCard } from "@/components/CrisisCard";
import { useUsva } from "@/lib/store";
import { currentStepNumber, totalLights, type ChatMsg } from "@/lib/progress";
import { STEPS } from "@/lib/program";
import { MAX_MESSAGE_CHARS, MAX_MESSAGES } from "@/lib/guide";
import { detectCrisis } from "@/lib/safety";
import type { Key } from "@/lib/i18n";

export default function GuidePage() {
  const { ready, state, today, t, update } = useUsva();
  const [text, setText] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [notice, setNotice] = useState<Key | null>(null);
  const [crisis, setCrisis] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [state.chat.length, waiting]);

  if (!ready) return <Shell>{null}</Shell>;
  const step = STEPS[currentStepNumber(state, today) - 1];
  const tooLong = state.chat.length >= MAX_MESSAGES - 1;

  async function send() {
    const content = text.trim();
    if (!content || waiting || tooLong) return;
    if (detectCrisis(content)) setCrisis(true);
    const messages: ChatMsg[] = [...state.chat, { role: "user", content }];
    update((s) => ({ ...s, chat: messages }));
    setText("");
    setNotice(null);
    setWaiting(true);
    try {
      const res = await fetch("/api/guide", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          lang: state.lang,
          mistName: state.mistName,
          stepTitle: step.title[state.lang],
          stepTheme: step.theme[state.lang],
          messages,
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as { text: string };
        update((s) => ({ ...s, chat: [...s.chat, { role: "assistant", content: data.text }] }));
      } else {
        setNotice(res.status === 429 ? "guideBusy" : res.status === 413 ? "guideLong" : "guideResting");
      }
    } catch {
      setNotice("guideResting");
    } finally {
      setWaiting(false);
    }
  }

  return (
    <Shell>
      <div className="space-y-4">
        <Mist lights={totalLights(state)} mood={waiting ? "listening" : "calm"} size="8rem" />
        <p className="text-center text-sm text-soft">{t("guideNote")}</p>

        <div className="space-y-3" aria-live="polite">
          <p className="card mr-8">{t("guideHello")}</p>
          {state.chat.map((m, i) => (
            <p
              key={i}
              className={`card whitespace-pre-wrap ${m.role === "user" ? "ml-8 border-lilac/40 bg-mist/20" : "mr-8"}`}
            >
              {m.content}
            </p>
          ))}
          {waiting && <p className="mr-8 px-2 text-soft">…</p>}
          {notice && <p className="card mr-8 text-lilac">{t(notice)}</p>}
          {crisis && <CrisisCard />}
          <div ref={endRef} />
        </div>

        {tooLong ? (
          <div className="space-y-2">
            <p className="text-soft">{t("guideLong")}</p>
            <button className="btn" onClick={() => update((s) => ({ ...s, chat: [] }))}>
              {t("guideNew")}
            </button>
          </div>
        ) : (
          <form
            className="space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <label htmlFor="msg" className="sr-only">
              {t("guidePh")}
            </label>
            <textarea
              id="msg"
              className="field"
              rows={3}
              maxLength={MAX_MESSAGE_CHARS}
              placeholder={t("guidePh")}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="btn btn-primary" type="submit" disabled={waiting || !text.trim()}>
              {t("send")}
            </button>
            {state.chat.length > 0 && (
              <button type="button" className="btn btn-quiet" onClick={() => update((s) => ({ ...s, chat: [] }))}>
                {t("guideNew")}
              </button>
            )}
          </form>
        )}
      </div>
    </Shell>
  );
}
