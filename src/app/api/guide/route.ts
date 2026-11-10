import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { buildSystemPrompt, validateGuideRequest } from "@/lib/guide";

export const runtime = "nodejs";

const WINDOW_MS = 5 * 60_000;
const MAX_PER_WINDOW = 30;
const hits = new Map<string, number[]>();

// Yksinkertainen muistinvarainen rajoitin. Riittää yhden palvelinprosessin
// ensimmäiseen versioon; usean instanssin ajossa tarvitaan jaettu tallennus.
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

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!allow(ip)) return NextResponse.json({ error: "busy" }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const parsed = validateGuideRequest(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.error === "too_long" ? 413 : 400 });
  }

  const client = new Anthropic();
  try {
    // Keskustelua ei kirjata lokiin eikä tallenneta palvelimelle.
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "medium" },
      system: buildSystemPrompt(parsed.value),
      messages: parsed.value.messages,
    });
    if (response.stop_reason === "refusal") {
      return NextResponse.json({ error: "unavailable" }, { status: 503 });
    }
    const text = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();
    if (!text) return NextResponse.json({ error: "unavailable" }, { status: 503 });
    return NextResponse.json({ text });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "busy" }, { status: 429 });
    }
    if (error instanceof Anthropic.APIError) {
      console.error(`guide: API error ${error.status}`);
      return NextResponse.json({ error: "unavailable" }, { status: 503 });
    }
    console.error("guide: unexpected error");
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
