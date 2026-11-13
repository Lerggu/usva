"use client";

import type { Lang } from "./progress";
import { MAX_SPEAK_CHARS } from "./speech";
import { LOCALES, SILENCE, canRecord, pickBrowserVoice, recognitionCtor, toWav, type Recognition } from "./voice";
import { MAX_LISTEN_SECONDS } from "./wav";

export type LiveState = "idle" | "listening" | "thinking" | "speaking";
export type LiveError = "denied" | "failed" | null;

type Callbacks = {
  onState: (s: LiveState) => void;
  onError: (e: LiveError) => void;
  // Saa käyttäjän puheen tekstinä ja palauttaa ääneen sanottavan vastauksen.
  respond: (text: string) => Promise<string | null>;
};

// Kuinka pitkä hiljaisuus puheen jälkeen tulkitaan puheenvuoron päättymiseksi.
const PAUSE_MS = 2000;
const TICK_MS = 50;
// Hiljaista äänitystä ei kerrytetä loputtomiin: se aloitetaan välillä alusta.
const SILENT_RESTART_MS = 20_000;

// Puhekeskustelun moottori: kuuntele, kunnes puheeseen tulee tauko, pyydä vastaus,
// puhu se ääneen ja kuuntele taas. `level` (0–1) seuraa äänen voimakkuutta, ja
// käyttöliittymä liikuttaa usvaa sen mukaan.
export class LiveEngine {
  level = 0;
  private gen = 0;
  private ctx: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private micAnalyser: AnalyserNode | null = null;
  private outAnalyser: AnalyserNode | null = null;
  private audio: HTMLAudioElement | null = null;
  private recorder: MediaRecorder | null = null;
  private recognition: Recognition | null = null;
  private timer: number | null = null;
  private finishSpeaking: (() => void) | null = null;
  private serverListens: boolean | null = null;
  private state: LiveState = "idle";

  constructor(
    private lang: Lang,
    private cb: Callbacks,
  ) {}

  private setState(s: LiveState) {
    this.state = s;
    this.cb.onState(s);
  }

  // Kutsutaan napautuksesta: selaimet sallivat mikrofonin ja äänen vain silloin.
  async start() {
    if (this.state === "speaking") {
      this.interrupt();
      return;
    }
    if (this.state !== "idle") return;
    const gen = ++this.gen;
    this.cb.onError(null);
    this.unlockOutput();
    if (this.serverListens === null) {
      try {
        const r = await fetch("/api/listen");
        this.serverListens = canRecord() && ((await r.json()) as { available?: boolean }).available === true;
      } catch {
        this.serverListens = false;
      }
    }
    if (gen !== this.gen) return;
    if (this.serverListens && !this.stream) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true },
        });
        const analyser = this.ctx!.createAnalyser();
        analyser.fftSize = 1024;
        this.ctx!.createMediaStreamSource(this.stream).connect(analyser);
        this.micAnalyser = analyser;
      } catch {
        this.cb.onError("denied");
        return;
      }
    }
    if (gen !== this.gen) return;
    if (!this.serverListens && !recognitionCtor()) {
      this.cb.onError("failed");
      return;
    }
    this.listen();
  }

  private unlockOutput() {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx ??= new Ctx();
    void this.ctx.resume();
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.src = SILENCE;
      void this.audio.play().catch(() => {});
      if ("speechSynthesis" in window) {
        window.speechSynthesis.getVoices();
        const empty = new SpeechSynthesisUtterance(" ");
        empty.volume = 0;
        window.speechSynthesis.speak(empty);
      }
    }
  }

  private clearTimer() {
    if (this.timer !== null) window.clearInterval(this.timer);
    this.timer = null;
  }

  private stopInput() {
    this.clearTimer();
    const rec = this.recorder;
    this.recorder = null;
    if (rec && rec.state === "recording") {
      rec.onstop = null;
      rec.stop();
    }
    this.recognition?.abort();
    this.recognition = null;
  }

  private stopOutput() {
    this.audio?.pause();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    this.finishSpeaking?.();
    this.finishSpeaking = null;
  }

  // Keskeyttää usvan puheen ja alkaa kuunnella.
  interrupt() {
    this.gen++;
    this.stopOutput();
    this.clearTimer();
    this.listen();
  }

  // Pysäyttää keskustelun; mikrofoni jää valmiiksi seuraavaa napautusta varten.
  stop() {
    this.gen++;
    this.stopInput();
    this.stopOutput();
    this.level = 0;
    this.setState("idle");
  }

  dispose() {
    this.stop();
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    void this.ctx?.close();
    this.ctx = null;
  }

  private listen() {
    this.level = 0;
    this.setState("listening");
    if (this.serverListens) this.listenWithServer();
    else this.listenWithBrowser();
  }

  private rms(analyser: AnalyserNode, buf: Float32Array<ArrayBuffer>): number {
    analyser.getFloatTimeDomainData(buf);
    let sum = 0;
    for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
    return Math.sqrt(sum / buf.length);
  }

  // Äänittää puheenvuoron ja tunnistaa tauon äänen voimakkuudesta.
  private listenWithServer() {
    const gen = this.gen;
    const analyser = this.micAnalyser!;
    const buf = new Float32Array(analyser.fftSize);
    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(this.stream!);
    this.recorder = recorder;
    const started = performance.now();
    let spoke = false;
    let voicedFrames = 0;
    let lastVoice = 0;
    let floor = 0.008;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    recorder.onstop = async () => {
      this.clearTimer();
      if (gen !== this.gen) return;
      this.recorder = null;
      if (!spoke) {
        this.listen();
        return;
      }
      this.level = 0;
      this.setState("thinking");
      let text = "";
      try {
        const wav = await toWav(new Blob(chunks, { type: recorder.mimeType }));
        const res = await fetch(`/api/listen?lang=${this.lang}`, {
          method: "POST",
          headers: { "content-type": "audio/wav" },
          body: wav,
        });
        if (!res.ok) throw new Error("listen failed");
        text = (((await res.json()) as { text?: string }).text ?? "").trim();
      } catch {
        if (gen !== this.gen) return;
        this.cb.onError("failed");
        this.setState("idle");
        return;
      }
      if (gen !== this.gen) return;
      if (!text) this.listen();
      else void this.reply(text, gen);
    };

    recorder.start();
    this.timer = window.setInterval(() => {
      if (recorder.state !== "recording") return;
      const now = performance.now();
      const rms = this.rms(analyser, buf);
      // Kynnys mukautuu huoneen taustakohinaan.
      if (rms > Math.max(0.02, floor * 3)) {
        voicedFrames++;
        lastVoice = now;
        if (voicedFrames >= 3) spoke = true;
      } else {
        voicedFrames = 0;
        floor = floor * 0.95 + rms * 0.05;
      }
      this.level = Math.max(Math.min(1, rms * 7), this.level * 0.82);
      const elapsed = now - started;
      if (
        (spoke && now - lastVoice > PAUSE_MS) ||
        elapsed > MAX_LISTEN_SECONDS * 1000 ||
        (!spoke && elapsed > SILENT_RESTART_MS)
      ) {
        recorder.stop();
      }
    }, TICK_MS);
  }

  // Varatie ilman puhepalvelua: selaimen oma tunnistus, yksi puheenvuoro kerrallaan.
  private listenWithBrowser() {
    const gen = this.gen;
    const Ctor = recognitionCtor()!;
    const rec = new Ctor();
    this.recognition = rec;
    let heard = "";
    let denied = false;
    rec.lang = LOCALES[this.lang];
    rec.continuous = false;
    rec.interimResults = true;
    rec.onresult = (e) => {
      let all = "";
      for (let i = 0; i < e.results.length; i++) all += e.results[i][0].transcript;
      heard = all.trim();
      this.level = 0.75;
    };
    rec.onerror = (e) => {
      denied = e.error === "not-allowed" || e.error === "service-not-allowed";
    };
    rec.onend = () => {
      this.clearTimer();
      if (gen !== this.gen) return;
      this.recognition = null;
      this.level = 0;
      if (heard) void this.reply(heard, gen);
      else {
        if (denied) this.cb.onError("denied");
        this.setState("idle");
      }
    };
    // Mikrofonin tasoa ei tässä tilassa saada, joten usva sykähtää tunnistuksen tahdissa.
    this.timer = window.setInterval(() => {
      this.level = Math.max(0.12, this.level * 0.9);
    }, TICK_MS);
    try {
      rec.start();
    } catch {
      this.clearTimer();
      this.recognition = null;
      this.cb.onError("failed");
      this.setState("idle");
    }
  }

  private async reply(text: string, gen: number) {
    this.setState("thinking");
    let answer: string | null = null;
    try {
      answer = await this.cb.respond(text);
    } catch {
      answer = null;
    }
    if (gen !== this.gen) return;
    if (answer) await this.speak(answer, gen);
    if (gen !== this.gen) return;
    this.listen();
  }

  private async speak(text: string, gen: number) {
    this.setState("speaking");
    try {
      if (text.length <= MAX_SPEAK_CHARS && (await this.speakWithServer(text, gen))) return;
      if (gen !== this.gen) return;
      await this.speakWithBrowser(text);
    } finally {
      this.clearTimer();
      this.finishSpeaking = null;
      if (gen === this.gen) this.level = 0;
    }
  }

  // Lämmin neuroääni palvelimelta. Palauttaa false, jos sitä ei ole käytettävissä.
  private async speakWithServer(text: string, gen: number): Promise<boolean> {
    let url: string;
    try {
      const res = await fetch("/api/speak", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text, lang: this.lang }),
      });
      if (!res.ok) return false;
      url = URL.createObjectURL(await res.blob());
    } catch {
      return false;
    }
    if (gen !== this.gen) {
      URL.revokeObjectURL(url);
      return true;
    }
    const audio = this.audio!;
    if (!this.outAnalyser && this.ctx) {
      // Ääni kulkee analysaattorin läpi, jotta usva voi liikkua puheen tahdissa.
      const analyser = this.ctx.createAnalyser();
      analyser.fftSize = 1024;
      this.ctx.createMediaElementSource(audio).connect(analyser);
      analyser.connect(this.ctx.destination);
      this.outAnalyser = analyser;
    }
    const analyser = this.outAnalyser;
    const buf = analyser ? new Float32Array(analyser.fftSize) : null;
    audio.src = url;
    this.timer = window.setInterval(() => {
      if (analyser && buf) this.level = Math.max(Math.min(1, this.rms(analyser, buf) * 5), this.level * 0.85);
    }, TICK_MS);
    let played = true;
    await new Promise<void>((resolve) => {
      this.finishSpeaking = resolve;
      audio.onended = () => resolve();
      audio.onerror = () => {
        played = false;
        resolve();
      };
      audio.play().catch(() => {
        played = false;
        resolve();
      });
    });
    this.clearTimer();
    URL.revokeObjectURL(url);
    return played || gen !== this.gen;
  }

  private speakWithBrowser(text: string): Promise<void> {
    if (!("speechSynthesis" in window)) return Promise.resolve();
    return new Promise<void>((resolve) => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = LOCALES[this.lang];
      const voice = pickBrowserVoice(this.lang);
      if (voice) u.voice = voice;
      u.rate = 0.88;
      u.pitch = 0.95;
      // Selaimen äänestä ei saada voimakkuutta, joten liike on pehmeää aaltoilua.
      this.timer = window.setInterval(() => {
        this.level = 0.4 + 0.3 * Math.sin(performance.now() / 140) * Math.sin(performance.now() / 490);
      }, TICK_MS);
      const safety = window.setTimeout(resolve, text.length * 130 + 6000);
      const done = () => {
        window.clearTimeout(safety);
        resolve();
      };
      this.finishSpeaking = done;
      u.onend = done;
      u.onerror = done;
      window.speechSynthesis.speak(u);
    });
  }
}
