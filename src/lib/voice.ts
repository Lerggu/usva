"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang } from "./progress";
import { MAX_SPEAK_CHARS } from "./speech";

const LOCALES: Record<Lang, string> = { fi: "fi-FI", en: "en-US" };

// Selaimen puheentunnistuksen tyypit puuttuvat TypeScriptin vakiokirjastosta.
type RecognitionResult = { isFinal: boolean; 0: { transcript: string } };
type RecognitionEvent = { resultIndex: number; results: ArrayLike<RecognitionResult> };
type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: RecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error?: string }) => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};
type RecognitionCtor = new () => Recognition;

function recognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

// Puhe tekstiksi selaimen omalla tunnistuksella. onDone saa valmiin tekstin, kun
// käyttäjä lopettaa puhumisen tai napauttaa mikrofonia uudelleen.
export type MicError = "denied" | "nospeech" | "failed";

export function useSpeechInput(lang: Lang, onDone: (text: string) => void) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [error, setError] = useState<MicError | null>(null);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const recRef = useRef<Recognition | null>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    setSupported(recognitionCtor() !== null);
    return () => recRef.current?.abort();
  }, []);

  const start = useCallback(() => {
    const Ctor = recognitionCtor();
    if (!Ctor || recRef.current) return;
    const rec = new Ctor();
    let heard = "";
    let failure: MicError | null = null;
    rec.lang = LOCALES[lang];
    // Yksi puheenvuoro kerrallaan: tunnistus päättyy itsestään tauon jälkeen.
    // Jatkuva tila toimii epäluotettavasti osassa puhelinselaimia.
    rec.continuous = false;
    rec.interimResults = true;
    rec.onresult = (e) => {
      // Koko teksti kootaan joka kerta alusta, koska osa selaimista toistaa
      // aiemmat tulokset uusissa tapahtumissa.
      let all = "";
      for (let i = 0; i < e.results.length; i++) all += e.results[i][0].transcript;
      heard = all.trim();
      setInterim(heard);
    };
    rec.onerror = (e) => {
      if (e.error === "aborted") return;
      failure =
        e.error === "not-allowed" || e.error === "service-not-allowed"
          ? "denied"
          : e.error === "no-speech"
            ? "nospeech"
            : "failed";
    };
    rec.onend = () => {
      recRef.current = null;
      setListening(false);
      setInterim("");
      if (heard) doneRef.current(heard);
      else setError(failure ?? "nospeech");
    };
    recRef.current = rec;
    setInterim("");
    setError(null);
    setListening(true);
    try {
      rec.start();
    } catch {
      recRef.current = null;
      setListening(false);
      setError("failed");
    }
  }, [lang]);

  const stop = useCallback(() => recRef.current?.stop(), []);

  return { supported, listening, interim, error, start, stop };
}

function pickBrowserVoice(lang: Lang): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith(lang));
  return voices.find((v) => v.localService) ?? voices[0];
}

// Teksti puheeksi. Ensisijaisesti palvelimen lämmin neuroääni; jos sitä ei ole
// määritetty tai teksti on liian pitkä, selaimen oma ääni rauhallisella tahdilla.
// Lyhyin mahdollinen äänetön WAV. Sen toistaminen napautuksen aikana avaa
// äänielementin, jotta myöhempi vastaus saa soida myös iPhonessa.
const SILENCE = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";

export function useSpeaker(lang: Lang) {
  const [speaking, setSpeaking] = useState<number | null>(null);
  const [noVoice, setNoVoice] = useState(false);
  const unlockedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(null);
  }, []);

  useEffect(() => stop, [stop]);

  // Kutsutaan napautuksen yhteydessä, jotta selain sallii äänen toiston myöhemmin.
  const prepare = useCallback(() => {
    audioRef.current ??= new Audio();
    if (unlockedRef.current) return;
    unlockedRef.current = true;
    const audio = audioRef.current;
    audio.src = SILENCE;
    void audio.play().catch(() => {});
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      const empty = new SpeechSynthesisUtterance(" ");
      empty.volume = 0;
      window.speechSynthesis.speak(empty);
    }
  }, []);

  const speakInBrowser = useCallback(
    (id: number, text: string) => {
      if (!("speechSynthesis" in window)) {
        setSpeaking(null);
        return;
      }
      const u = new SpeechSynthesisUtterance(text);
      u.lang = LOCALES[lang];
      const voice = pickBrowserVoice(lang);
      if (voice) u.voice = voice;
      // Jos laitteessa on ääniä mutta ei tälle kielelle, kerrotaan se käyttäjälle.
      setNoVoice(!voice && window.speechSynthesis.getVoices().length > 0);
      u.rate = 0.88;
      u.pitch = 0.95;
      u.onend = () => setSpeaking((s) => (s === id ? null : s));
      u.onerror = () => setSpeaking((s) => (s === id ? null : s));
      window.speechSynthesis.speak(u);
    },
    [lang],
  );

  const speak = useCallback(
    async (id: number, text: string) => {
      stop();
      prepare();
      setSpeaking(id);
      if (text.length <= MAX_SPEAK_CHARS) {
        try {
          const res = await fetch("/api/speak", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ text, lang }),
          });
          if (res.ok) {
            const url = URL.createObjectURL(await res.blob());
            urlRef.current = url;
            const audio = audioRef.current!;
            audio.src = url;
            audio.onended = () => setSpeaking((s) => (s === id ? null : s));
            await audio.play();
            setNoVoice(false);
            return;
          }
        } catch {
          // Jatketaan selaimen omalla äänellä.
        }
      }
      speakInBrowser(id, text);
    },
    [lang, prepare, speakInBrowser, stop],
  );

  return { speaking, noVoice, speak, stop, prepare };
}
