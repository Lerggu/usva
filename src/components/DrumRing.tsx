// Rumpukehä usvan ympärillä. Kehällä on kaksitoista merkkiä, yksi matkan
// jokaiselle vaiheelle, ja kuljettujen vaiheiden merkit hehkuvat.
//
// Merkit on piirretty Usvaa varten pohjoisen luonnon aiheista. Ne eivät ole
// saamelaisten rumpujen kuvioita eivätkä jäljittele niitä: ne ovat pyhää
// perinnettä, joka ei kuulu kaupallisen tuotteen koristeeksi.
export const MARKS: string[] = [
  // aurinko
  "M0 -5 A5 5 0 1 0 0.01 -5 M0 -9 V-7 M0 7 V9 M-9 0 H-7 M7 0 H9 M-6.4 -6.4 L-5 -5 M5 5 L6.4 6.4 M-6.4 6.4 L-5 5 M5 -5 L6.4 -6.4",
  // tunturi
  "M-9 6 Q-3 -8 1 -1 Q4 -7 9 6",
  // joki
  "M-9 -3 Q-4.5 -7 0 -3 T9 -3 M-9 3 Q-4.5 -1 0 3 T9 3",
  // kuusi
  "M0 -9 L5 -1 H2 L6 5 H-6 L-2 -1 H-5 Z M0 5 V9",
  // kuu
  "M3 -8 A8 8 0 1 0 3 8 A6 6 0 1 1 3 -8",
  // tähti
  "M0 -9 L2 -2 L9 0 L2 2 L0 9 L-2 2 L-9 0 L-2 -2 Z",
  // lintu
  "M-9 -2 Q-4 -7 0 0 Q4 -7 9 -2",
  // tuli
  "M0 9 C-7 6 -6 -1 -2 -4 C-2 0 1 0 0 -9 C6 -4 8 4 0 9 Z",
  // jäljet
  "M-5 4 A2 3 0 1 0 -4.99 4 M4 -2 A2 3 0 1 0 4.01 -2",
  // kierre
  "M0 0 C2 -2 5 0 4 3 C3 7 -3 7 -6 3 C-9 -2 -5 -8 1 -8 C6 -8 9 -4 9 0",
  // järvi
  "M-9 0 A9 4 0 1 0 9 0 A9 4 0 1 0 -9 0 M-4 0 H4",
  // revontuli
  "M-9 5 Q-5 -9 -1 3 M-3 6 Q1 -9 5 2 M3 6 Q6 -6 9 0",
];

export function DrumRing({ reached = 0 }: { reached?: number }) {
  return (
    <svg className="drum-ring" viewBox="-110 -110 220 220" aria-hidden="true">
      <circle r="100" className="drum-rim" />
      <circle r="84" className="drum-rim drum-rim-inner" />
      {MARKS.map((d, i) => {
        const angle = (i / MARKS.length) * Math.PI * 2 - Math.PI / 2;
        const x = (92 * Math.cos(angle)).toFixed(2);
        const y = (92 * Math.sin(angle)).toFixed(2);
        return (
          <path
            key={i}
            d={d}
            transform={`translate(${x} ${y}) scale(0.62)`}
            className={i < reached ? "drum-mark drum-mark-lit" : "drum-mark"}
          />
        );
      })}
    </svg>
  );
}

// Yksittäinen vaiheen merkki, esimerkiksi polun varrelle.
export function StepMark({ index, lit }: { index: number; lit?: boolean }) {
  return (
    <svg viewBox="-12 -12 24 24" className="h-7 w-7" aria-hidden="true">
      <path d={MARKS[index % MARKS.length]} className={lit ? "drum-mark drum-mark-lit" : "drum-mark"} />
    </svg>
  );
}
