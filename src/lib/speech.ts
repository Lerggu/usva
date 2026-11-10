import type { Lang } from "./progress";

export const MAX_SPEAK_CHARS = 3000;

// Lämpimät, pehmeät neuroäänet. Voi vaihtaa ympäristömuuttujilla
// AZURE_SPEECH_VOICE_FI ja AZURE_SPEECH_VOICE_EN.
export const DEFAULT_VOICES: Record<Lang, string> = {
  fi: "fi-FI-SelmaNeural",
  en: "en-US-JennyNeural",
};

const LOCALES: Record<Lang, string> = { fi: "fi-FI", en: "en-US" };

export type SpeakRequest = { text: string; lang: Lang };
export type SpeakValidation = { ok: true; value: SpeakRequest } | { ok: false; error: "invalid" | "too_long" };

export function validateSpeakRequest(body: unknown): SpeakValidation {
  if (!body || typeof body !== "object") return { ok: false, error: "invalid" };
  const { text, lang } = body as Record<string, unknown>;
  if (lang !== "fi" && lang !== "en") return { ok: false, error: "invalid" };
  if (typeof text !== "string" || !text.trim()) return { ok: false, error: "invalid" };
  if (text.length > MAX_SPEAK_CHARS) return { ok: false, error: "too_long" };
  return { ok: true, value: { text: text.trim(), lang } };
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const VOICE_NAME = /^[A-Za-z0-9:-]{3,80}$/;

// Hieman hidastettu ja madallettu puhe kuulostaa rauhalliselta ja pehmeältä.
export function buildSsml(text: string, lang: Lang, voice?: string): string {
  const name = voice && VOICE_NAME.test(voice) ? voice : DEFAULT_VOICES[lang];
  return (
    `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${LOCALES[lang]}">` +
    `<voice name="${name}"><prosody rate="-10%" pitch="-3%">${escapeXml(text)}</prosody></voice></speak>`
  );
}
