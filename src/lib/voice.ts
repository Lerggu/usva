"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang } from "./progress";
import { MAX_SPEAK_CHARS } from "./speech";
import { LISTEN_SAMPLE_RATE, MAX_LISTEN_SECONDS, encodeWav } from "./wav";

export const LOCALES: Record<Lang, string> = { fi: "fi-FI", en: "en-US" };

// Selaimen puheentunnistuksen tyypit puuttuvat TypeScriptin vakiokirjastosta.
type RecognitionResult = { isFinal: boolean; 0: { transcript: string } };
type RecognitionEvent = { resultIndex: number; results: ArrayLike<RecognitionResult> };
export type Recognition = {
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

export function recognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function canRecord(): boolean {
  return typeof navigator !== "undefined" && !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== "undefined";
}

// Muuntaa selaimen äänityksen 16 kHz:n mono-WAViksi palvelimen tunnistusta varten.
export async function toWav(recording: Blob): Promise<ArrayBuffer> {
  const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctx();
  try {
    const decoded = await ctx.decodeAudioData(await recording.arrayBuffer());
    const frames = Math.max(1, Math.ceil(decoded.duration * LISTEN_SAMPLE_RATE));
    const offline = new OfflineAudioContext(1, frames, LISTEN_SAMPLE_RATE);
    const source = offline.createBufferSource();
    source.buffer = decoded;
    source.connect(offline.destination);
    source.start();
    const rendered = await offline.startRendering();
    return encodeWav(rendered.getChannelData(0), LISTEN_SAMPLE_RATE);
  } finally {
    void ctx.close();
  }
}

type Recording = { recorder: MediaRecorder; stream: MediaStream; timer: number };

// Puhe tekstiksi. Ensisijaisesti selaimen oma tunnistus; jos sitä ei ole (esim.
// iPhonen Chrome tai Firefox), puhe äänitetään ja tunnistetaan palvelimella.
// onDone saa valmiin tekstin, kun käyttäjä lopettaa puhumisen tai napauttaa
// mikrofonia uudelleen.
export type MicError = "denied" | "nospeech" | "failed";

export function useSpeechInput(lang: Lang, onDone: (text: string) => void) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [error, setError] = useState<MicError | null>(null);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [busy, setBusy] = useState(false);
  const recRef = useRef<Recognition | null>(null);
  const recordingRef = useRef<Recording | null>(null);
  const viaServerRef = useRef(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    let cancelled = false;
    if (recognitionCtor() !== null) {
      setSupported(true);
    } else if (!canRecord()) {
      setSupported(false);
    } else {
      fetch("/api/listen")
        .then((r) => r.json() as Promise<{ available?: boolean }>)
        .then((d) => {
          if (cancelled) return;
          viaServerRef.current = d.available === true;
          setSupported(d.available === true);
        })
        .catch(() => !cancelled && setSupported(false));
    }
    return () => {
      cancelled = true;
      recRef.current?.abort();
      const rec = recordingRef.current;
      if (rec) {
        window.clearTimeout(rec.timer);
        rec.recorder.onstop = null;
        rec.stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const startRecording = useCallback(async () => {
    if (recordingRef.current) return;
    setError(null);
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setError("denied");
      return;
    }
    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    recorder.onstop = async () => {
      window.clearTimeout(recordingRef.current?.timer);
      recordingRef.current = null;
      stream.getTracks().forEach((t) => t.stop());
      setListening(false);
      setBusy(true);
      try {
        const wav = await toWav(new Blob(chunks, { type: recorder.mimeType }));
        const res = await fetch(`/api/listen?lang=${lang}`, {
          method: "POST",
          headers: { "content-type": "audio/wav" },
          body: wav,
        });
        if (!res.ok) throw new Error("listen failed");
        const { text } = (await res.json()) as { text?: string };
        if (text?.trim()) doneRef.current(text.trim());
        else setError("nospeech");
      } catch {
        setError("failed");
      } finally {
        setBusy(false);
      }
    };
    // Palvelin tunnistaa enintään minuutin kerrallaan, joten äänitys päättyy
    // itsestään vähän ennen sitä eikä mitään jää tunnistamatta.
    const timer = window.setTimeout(() => recorder.state === "recording" && recorder.stop(), MAX_LISTEN_SECONDS * 1000);
    recordingRef.current = { recorder, stream, timer };
    setListening(true);
    recorder.start();
  }, [lang]);

  const start = useCallback(() => {
    if (viaServerRef.current) {
      void startRecording();
      return;
    }
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
  }, [lang, startRecording]);

  const stop = useCallback(() => {
    recRef.current?.stop();
    const rec = recordingRef.current;
    if (rec && rec.recorder.state === "recording") rec.recorder.stop();
  }, []);

  return { supported, listening, busy, interim, error, start, stop };
}

export function pickBrowserVoice(lang: Lang): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith(lang));
  return voices.find((v) => v.localService) ?? voices[0];
}

// Teksti puheeksi. Ensisijaisesti palvelimen lämmin neuroääni; jos sitä ei ole
// määritetty tai teksti on liian pitkä, selaimen oma ääni rauhallisella tahdilla.
// Lyhyin mahdollinen äänetön WAV. Sen toistaminen napautuksen aikana avaa
// äänielementin, jotta myöhempi vastaus saa soida myös iPhonessa.
export const SILENCE = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";

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
