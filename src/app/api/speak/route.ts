import { NextResponse } from "next/server";
import { requestEntitled } from "@/lib/server/billing";
import { buildSsml, validateSpeakRequest } from "@/lib/speech";

export const runtime = "nodejs";

const WINDOW_MS = 5 * 60_000;
const MAX_PER_WINDOW = 40;
const hits = new Map<string, number[]>();

function allow(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

const REGION = /^[a-z0-9]{3,40}$/;

// Muuttaa oppaan vastauksen puheeksi Azure AI Speech -palvelulla. Jos palvelua ei
// ole määritetty, vastaus on 503 ja selain käyttää omaa puhesynteesiään.
export async function POST(req: Request) {
  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION;
  if (!key || !region || !REGION.test(region)) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
  if (!(await requestEntitled())) return NextResponse.json({ error: "subscription" }, { status: 402 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!allow(ip)) return NextResponse.json({ error: "busy" }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const parsed = validateSpeakRequest(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.error === "too_long" ? 413 : 400 });
  }
  const { text, lang } = parsed.value;
  const voice = lang === "fi" ? process.env.AZURE_SPEECH_VOICE_FI : process.env.AZURE_SPEECH_VOICE_EN;

  try {
    // Tekstiä ei kirjata lokiin eikä tallenneta.
    const res = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
        "User-Agent": "usva",
      },
      body: buildSsml(text, lang, voice),
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok || !res.body) {
      console.error(`speak: speech service responded ${res.status}`);
      return NextResponse.json({ error: "unavailable" }, { status: 503 });
    }
    return new Response(res.body, {
      headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" },
    });
  } catch {
    console.error("speak: speech service unreachable");
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
