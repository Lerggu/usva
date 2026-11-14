"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Shell } from "@/components/Shell";
import { Mist } from "@/components/Mist";
import { CrisisCard } from "@/components/CrisisCard";
import { useUsva } from "@/lib/store";
import { currentStepNumber, taskFor, totalLights, type ChatMsg } from "@/lib/progress";
import { STEPS } from "@/lib/program";
import { MAX_MESSAGE_CHARS, MAX_MESSAGES, buildContext } from "@/lib/guide";
import { detectCrisis } from "@/lib/safety";
import type { Key } from "@/lib/i18n";
import { useSpeaker, useSpeechInput } from "@/lib/voice";

export default function GuidePage() {
  const { ready, state, today, t, update } = useUsva();
  const [text, setText] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [notice, setNotice] = useState<Key | null>(null);
  const [crisis, setCrisis] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const speaker = useSpeaker(state.lang);
  const mic = useSpeechInput(state.lang, (spoken) => setText((prev) => (prev ? `${prev} ${spoken}` : spoken)));

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [state.chat.length, waiting]);

  if (!ready) return <Shell>{null}</Shell>;
  const step = STEPS[currentStepNumber(state, today) - 1];
  const tooLong = state.chat.length >= MAX_MESSAGES - 1;
  const task = taskFor(state, today);
  const taskPrompt = task.kind === "task" ? task.task.prompt[state.lang] : "";
  const taskDone = !!state.days[today]?.task;
  // Usva avaa keskustelun itse: se kysyy päivän tehtävän eikä odota aihetta käyttäjältä.
  const opening = !taskPrompt ? t("guideHello") : taskDone ? t("guideLeadDone") : `${t("guideLead")} ${taskPrompt}`;

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
          context: buildContext(state),
          userName: state.userName,
          taskPrompt,
          taskDone,
          messages,
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as { text: string };
        update((s) => ({ ...s, chat: [...s.chat, { role: "assistant", content: data.text }] }));
      } else {
        setNotice(
          res.status === 402 ? "guidePaywall" : res.status === 429 ? "guideBusy" : res.status === 413 ? "guideLong" : "guideResting",
        );
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
        <Mist lights={totalLights(state)} mood={waiting || mic.listening ? "listening" : "calm"} size="8rem" />
        <p className="text-center text-sm text-soft">{t("guideNote")}</p>
        <Link href="/opas/puhe" className="btn btn-primary">
          {t("voiceMode")}
          <span className="block text-sm font-normal">{t("voiceModeSub")}</span>
        </Link>

        <div className="space-y-3" aria-live="polite">
          <p className="card serif mr-8 text-lg">{opening}</p>
          {state.chat.map((m, i) =>
            m.role === "user" ? (
              <p key={i} className="card ml-8 whitespace-pre-wrap border-lilac/40 bg-mist/20">
                {m.content}
              </p>
            ) : (
              <div key={i} className="card mr-8 space-y-2">
                <p className="whitespace-pre-wrap">{m.content}</p>
                <button
                  type="button"
                  className="min-h-11 text-sm text-lilac"
                  onClick={() => (speaker.speaking === i ? speaker.stop() : void speaker.speak(i, m.content))}
                >
                  {speaker.speaking === i ? `◼ ${t("stopListening")}` : `▶ ${t("listen")}`}
                </button>
              </div>
            ),
          )}
          {mic.listening && mic.interim && <p className="card ml-8 text-soft">{mic.interim}</p>}
          {waiting && <p className="mr-8 px-2 text-soft">…</p>}
          {notice && <p className="card mr-8 text-lilac">{t(notice)}</p>}
          {speaker.noVoice && <p className="card mr-8 text-soft">{t("noVoice")}</p>}
          {mic.error && !mic.listening && (
            <p className="card mr-8 text-soft">
              {t(mic.error === "denied" ? "micDenied" : mic.error === "nospeech" ? "micNoSpeech" : "micFailed")}
            </p>
          )}
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
            {mic.supported === false && <p className="card text-soft">{t("micUnsupported")}</p>}
            {mic.supported && (
              <button
                type="button"
                className={`btn ${mic.listening ? "btn-primary" : ""}`}
                aria-pressed={mic.listening}
                disabled={waiting || mic.busy}
                onClick={() => {
                  speaker.stop();
                  speaker.prepare();
                  if (mic.listening) mic.stop();
                  else mic.start();
                }}
              >
                {mic.listening ? t("micStop") : mic.busy ? "…" : `🎙 ${t("micStart")}`}
              </button>
            )}
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
