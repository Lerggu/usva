"use client";

import { useUsva } from "@/lib/store";
import { useSpeechInput } from "@/lib/voice";

type Props = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  maxLength?: number;
  // Yksirivinen kenttä esimerkiksi nimelle.
  single?: boolean;
  center?: boolean;
};

// Tekstikenttä, johon voi myös puhua: mikrofoni lisää sanellun tekstin kentän
// loppuun, ja käyttäjä näkee ja voi korjata sen ennen tallentamista.
export function VoiceField({ id, value, onChange, rows = 3, placeholder, maxLength, single, center }: Props) {
  const { state, t } = useUsva();
  const mic = useSpeechInput(state.lang, (spoken) => {
    const next = value.trim() ? `${value.trim()} ${spoken}` : spoken;
    onChange(maxLength ? next.slice(0, maxLength) : next);
  });
  const fieldClass = `field min-w-0 flex-1 ${center ? "text-center" : ""}`;

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        {single ? (
          <input
            id={id}
            className={fieldClass}
            value={value}
            maxLength={maxLength}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <textarea
            id={id}
            className={fieldClass}
            rows={rows}
            value={value}
            maxLength={maxLength}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        {mic.supported && (
          <button
            type="button"
            aria-label={mic.listening ? t("micStop") : t("micStart")}
            aria-pressed={mic.listening}
            aria-controls={id}
            disabled={mic.busy}
            className={`btn flex h-14 w-14 shrink-0 items-center justify-center !p-0 text-2xl ${
              mic.listening ? "btn-primary" : ""
            }`}
            style={{ width: "3.5rem" }}
            onClick={() => (mic.listening ? mic.stop() : mic.start())}
          >
            <span aria-hidden="true">{mic.listening ? "◼" : mic.busy ? "…" : "🎙"}</span>
          </button>
        )}
      </div>
      {mic.listening && (
        <p className="text-sm text-lilac" aria-live="polite">
          {mic.interim || t("micStop")}
        </p>
      )}
      {mic.error && !mic.listening && (
        <p className="text-sm text-soft">
          {t(mic.error === "denied" ? "micDenied" : mic.error === "nospeech" ? "micNoSpeech" : "micFailed")}
        </p>
      )}
    </div>
  );
}
