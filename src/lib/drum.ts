"use client";

export const DRUM_BEAT_MS = 1200;

// Hiljainen, matala rummun lyönti syntetisoituna: ei äänitiedostoja ladattavaksi.
export class Drum {
  private ctx: AudioContext | null = null;
  private timer: number | null = null;

  // Kutsutaan napautuksesta, jotta selain sallii äänen.
  start() {
    if (this.timer !== null) return;
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    this.ctx ??= new Ctx();
    void this.ctx.resume();
    this.beat();
    this.timer = window.setInterval(() => this.beat(), DRUM_BEAT_MS);
  }

  stop() {
    if (this.timer !== null) window.clearInterval(this.timer);
    this.timer = null;
  }

  dispose() {
    this.stop();
    void this.ctx?.close();
    this.ctx = null;
  }

  private beat() {
    const ctx = this.ctx;
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(92, now);
    osc.frequency.exponentialRampToValueAtTime(46, now + 0.28);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.32, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.65);
  }
}
