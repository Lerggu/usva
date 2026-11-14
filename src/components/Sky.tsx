// Koko sovelluksen tausta: Lapin yötaivas, revontulet ja tunturit.
// Pelkkää CSS:ää ja SVG:tä, joten se ei hidasta sivua eikä tarvitse kuvia.

// Tähdet sijoitetaan siemenluvulla, jotta taivas on joka latauksella sama.
function stars(count: number, seed: number): string {
  let s = seed;
  const next = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = (next() * 100).toFixed(2);
    // Tähdet pysyvät taivaan yläosassa, jotta ne eivät osu tekstin päälle.
    const y = (next() * 46).toFixed(2);
    const a = (0.2 + next() * 0.5).toFixed(2);
    out.push(`${x}vw ${y}vh 0 0 rgba(255,255,255,${a})`);
  }
  return out.join(",");
}

const SMALL_STARS = stars(70, 7);
const BRIGHT_STARS = stars(14, 23);

export function Sky() {
  return (
    <div className="sky" aria-hidden="true">
      <div className="sky-stars" style={{ boxShadow: SMALL_STARS }} />
      <div className="sky-stars sky-stars-bright" style={{ boxShadow: BRIGHT_STARS }} />
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="aurora aurora-c" />
      <svg className="sky-fells" viewBox="0 0 1200 320" preserveAspectRatio="none">
        <path
          d="M0 210 C120 150 220 120 330 150 C430 178 500 110 640 96 C790 82 880 170 990 160 C1080 152 1140 120 1200 132 L1200 320 L0 320 Z"
          fill="#231a4a"
          opacity="0.75"
        />
        <path
          d="M0 250 C90 222 170 176 300 190 C420 204 470 250 610 232 C760 212 820 150 960 172 C1070 190 1130 228 1200 214 L1200 320 L0 320 Z"
          fill="#1a1338"
        />
        <path
          d="M0 290 C140 262 260 268 400 280 C560 294 700 258 860 270 C1000 280 1100 296 1200 284 L1200 320 L0 320 Z"
          fill="#100b24"
        />
        {/* Harvaa tunturikuusikkoa etualalla. */}
        <g fill="#100b24">
          {[70, 118, 150, 420, 455, 780, 812, 850, 1090, 1130].map((x, i) => {
            const h = 34 + ((i * 13) % 22);
            const y = 286 - ((i * 7) % 10);
            return <path key={x} d={`M${x} ${y} l13 ${-h} l13 ${h} Z`} />;
          })}
        </g>
      </svg>
    </div>
  );
}
