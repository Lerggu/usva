import type { CSSProperties } from "react";

type Props = {
  lights?: number;
  mood?: "calm" | "listening" | "soft";
  breath?: "in" | "out";
  breathMs?: number;
  size?: string;
  live?: boolean;
};

const MAX_VISIBLE = 72;
const GOLDEN_ANGLE = 2.399963;

// Valopisteet asettuvat auringonkukan siemenkuvioon, jotta jokainen uusi valo
// löytää oman paikkansa eikä mikään aiempi siirry.
function lightPosition(i: number): { left: string; top: string; delay: string } {
  const r = 8 + 34 * Math.sqrt((i + 0.5) / MAX_VISIBLE);
  const a = i * GOLDEN_ANGLE;
  return {
    left: `${(50 + r * Math.cos(a)).toFixed(2)}%`,
    top: `${(50 + r * Math.sin(a)).toFixed(2)}%`,
    delay: `${((i * 0.37) % 5).toFixed(2)}s`,
  };
}

export function Mist({ lights = 0, mood = "calm", breath, breathMs, size, live }: Props) {
  const style = {
    ...(size ? { "--mist-size": size } : {}),
    ...(breathMs ? { "--breath-ms": `${breathMs}ms` } : {}),
  } as CSSProperties;
  const visible = Math.min(lights, MAX_VISIBLE);
  return (
    <div className="mist" data-mood={mood} data-breath={breath} data-live={live ? "true" : undefined} style={style} aria-hidden="true">
      <div className="mist-body">
        <span className="mist-layer" />
        <span className="mist-layer" />
        <span className="mist-layer" />
        {Array.from({ length: visible }, (_, i) => {
          const p = lightPosition(i);
          return (
            <span key={i} className="mist-light" style={{ left: p.left, top: p.top, animationDelay: p.delay }} />
          );
        })}
      </div>
    </div>
  );
}
