"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Shell } from "@/components/Shell";
import { Mist } from "@/components/Mist";
import { VoiceField } from "@/components/VoiceField";
import { useUsva } from "@/lib/store";
import { totalLights } from "@/lib/progress";
import { MAX_NOTE_CHARS, QUESTIONS, type Profile } from "@/lib/profile";

// Tutustuminen: yksi kysymys kerrallaan, ja jokaisen voi ohittaa.
// Sama näkymä toimii alussa ja myöhemmin vastausten muuttamiseen asetuksista.
export default function ProfilePage() {
  const { ready, state, t, update } = useUsva();
  const router = useRouter();
  const [i, setI] = useState(-1);
  const [first, setFirst] = useState(false);

  useEffect(() => {
    setFirst(new URLSearchParams(window.location.search).get("alku") === "1");
  }, []);

  if (!ready) return <Shell nav={false}>{null}</Shell>;
  const lang = state.lang;
  const profile = state.profile;
  const set = (patch: Partial<Profile>) => update((s) => ({ ...s, profile: { ...s.profile, ...patch } }));
  const done = () => router.push(first ? "/tutustu" : "/asetukset");
  const next = () => (i + 1 >= QUESTIONS.length ? done() : setI(i + 1));

  if (i < 0) {
    return (
      <Shell nav={false}>
        <div className="space-y-6 pt-2 text-center">
          <Mist lights={totalLights(state)} mood="listening" size="12rem" />
          <p className="serif text-2xl leading-relaxed">{t("profIntro")}</p>
          <button className="btn btn-primary" onClick={() => setI(0)}>
            {t("continue")}
          </button>
          <button className="btn btn-quiet" onClick={done}>
            {t("profSkipAll")}
          </button>
        </div>
      </Shell>
    );
  }

  const q = QUESTIONS[i];
  return (
    <Shell nav={false}>
      <div className="space-y-5 pt-2">
        <ol className="flex justify-center gap-1.5" aria-hidden="true">
          {QUESTIONS.map((x, n) => (
            <li key={x.id} className={`h-1.5 w-5 rounded-full ${n <= i ? "bg-aurora" : "bg-lilac/25"}`} />
          ))}
        </ol>
        <div key={q.id} className="page-in space-y-4">
          <p className="serif text-center text-2xl leading-relaxed" id={`q-${q.id}`}>
            {q.q[lang]}
          </p>

          {q.kind === "one" && (
            <div className="space-y-2" role="group" aria-labelledby={`q-${q.id}`}>
              {q.options.map((opt) => (
                <button
                  key={opt.key}
                  className={`btn ${profile[q.id] === opt.key ? "btn-primary" : ""}`}
                  aria-pressed={profile[q.id] === opt.key}
                  onClick={() => {
                    set({ [q.id]: opt.key });
                    next();
                  }}
                >
                  {opt.label[lang]}
                </button>
              ))}
            </div>
          )}

          {q.kind === "many" && (
            <div className="space-y-2" role="group" aria-labelledby={`q-${q.id}`}>
              {q.options.map((opt) => {
                const chosen = profile[q.id] ?? [];
                const on = chosen.includes(opt.key);
                return (
                  <button
                    key={opt.key}
                    // Valittu vaihtoehto erottuu vihreällä reunalla ja merkillä, jotta
                    // Jatka-painike on ruudun ainoa pääpainike.
                    className={`btn ${on ? "!border-aurora text-aurora" : ""}`}
                    aria-pressed={on}
                    onClick={() => set({ [q.id]: on ? chosen.filter((k) => k !== opt.key) : [...chosen, opt.key] })}
                  >
                    {on && <span aria-hidden="true">✓ </span>}
                    {opt.label[lang]}
                  </button>
                );
              })}
              <button className="btn btn-primary !mt-5" onClick={next}>
                {t("continue")}
              </button>
            </div>
          )}

          {q.kind === "text" && (
            <div className="space-y-3">
              <VoiceField
                id="profile-note"
                rows={5}
                maxLength={MAX_NOTE_CHARS}
                value={profile.note ?? ""}
                onChange={(v) => set({ note: v })}
              />
              <button className="btn btn-primary" onClick={next}>
                {t("profDone")}
              </button>
            </div>
          )}
        </div>

        {q.kind !== "text" && (
          <button className="btn btn-quiet" onClick={next}>
            {t("profSkip")}
          </button>
        )}
        {i > 0 && (
          <button className="btn btn-quiet" onClick={() => setI(i - 1)}>
            {t("back")}
          </button>
        )}
        <p className="text-center text-sm text-soft">{t("profNote")}</p>
      </div>
    </Shell>
  );
}
