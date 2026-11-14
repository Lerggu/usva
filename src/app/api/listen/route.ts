import { NextResponse } from "next/server";
import { requestEntitled } from "@/lib/server/billing";
import { MAX_LISTEN_BYTES } from "@/lib/wav";

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
const LOCALES: Record<string, string> = { fi: "fi-FI", en: "en-US" };

function config(): { key: string; region: string } | null {
  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION;
  return key && region && REGION.test(region) ? { key, region } : null;
}

// Kertoo selaimelle, voiko palvelin tunnistaa puhetta. Selain kysyy tätä vain,
// jos sen oma puheentunnistus puuttuu.
export function GET() {
  return NextResponse.json({ available: config() !== null }, { headers: { "Cache-Control": "no-store" } });
}

// Muuttaa lyhyen äänityksen tekstiksi Azure AI Speech -palvelulla. Ääntä ja
// tekstiä ei kirjata lokiin eikä tallenneta.
export async function POST(req: Request) {
  const cfg = config();
  if (!cfg) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  if (!(await requestEntitled())) return NextResponse.json({ error: "subscription" }, { status: 402 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!allow(ip)) return NextResponse.json({ error: "busy" }, { status: 429 });

  const locale = LOCALES[new URL(req.url).searchParams.get("lang") ?? ""];
  if (!locale) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const audio = await req.arrayBuffer();
  if (audio.byteLength <= 44) return NextResponse.json({ error: "invalid" }, { status: 400 });
  if (audio.byteLength > MAX_LISTEN_BYTES) return NextResponse.json({ error: "too_long" }, { status: 413 });

  try {
    const res = await fetch(
      `https://${cfg.region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${locale}&format=simple`,
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": cfg.key,
          "Content-Type": "audio/wav; codecs=audio/pcm; samplerate=16000",
          Accept: "application/json",
        },
        body: audio,
        signal: AbortSignal.timeout(30_000),
      },
    );
    if (!res.ok) {
      console.error(`listen: speech service responded ${res.status}`);
      return NextResponse.json({ error: "unavailable" }, { status: 503 });
    }
    const data = (await res.json()) as { RecognitionStatus?: string; DisplayText?: string };
    const text = data.RecognitionStatus === "Success" ? (data.DisplayText ?? "").trim() : "";
    return NextResponse.json({ text });
  } catch {
    console.error("listen: speech service unreachable");
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
