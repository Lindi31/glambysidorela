import type { TreatmentId } from "@/lib/offers";

// Feine Linien statt Icons: jede Behandlung bekommt ihre eigene Form.
const LINES: Record<TreatmentId, React.ReactNode> = {
  lashes: (
    <>
      <path d="M30 118 C70 72 150 72 190 118" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const x = 46 + i * 16;
        const lean = (i - 4) * 4;
        const base = 100 - (4 - Math.abs(i - 4)) * 3.4;
        return <path key={i} d={`M${x} ${base} Q${x + lean * 0.3} ${base - 22} ${x + lean} ${base - 36}`} />;
      })}
    </>
  ),
  brows: <path d="M24 122 C62 84 118 64 152 72 C170 76 184 88 196 106 C176 94 158 90 140 90 C104 90 62 104 24 122 Z" />,
  pmu: (
    <>
      <path d="M26 104 C52 78 80 68 96 78 C104 83 116 83 124 78 C140 68 168 78 194 104 C166 128 138 140 110 140 C82 140 54 128 26 104 Z" />
      <path d="M26 104 C70 112 150 112 194 104" />
    </>
  ),
  makeup: (
    <>
      <path d="M70 158 L152 58" />
      <path d="M152 58 C160 46 178 36 188 34 C188 46 180 64 168 72 C162 76 156 76 148 68" />
      <path d="M70 158 C66 164 58 168 52 168 C52 162 56 154 62 150" />
    </>
  ),
  facial: (
    <>
      <circle cx="110" cy="100" r="22" />
      <circle cx="110" cy="100" r="44" />
      <circle cx="110" cy="100" r="66" />
    </>
  ),
};

export function TreatmentLine({ id, color, className }: { id: string; color: string; className?: string }) {
  const art = LINES[id as TreatmentId];
  if (!art) return null;
  return (
    <svg aria-hidden viewBox="0 0 220 190" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" className={className}>
      {art}
    </svg>
  );
}
