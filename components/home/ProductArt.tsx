// Schlichte Silhouetten, bis echte Produktfotos da sind.
type Shape = "pump" | "serum" | "tube" | "wand";

const BODY = "#FAF7F2";
const CAP = "#2C2826";

const SHAPES: Record<Shape, React.ReactNode> = {
  pump: (
    <>
      <rect x="62" y="14" width="30" height="8" rx="3" fill={CAP} />
      <rect x="74" y="20" width="10" height="20" fill={CAP} />
      <rect x="66" y="38" width="26" height="14" rx="2" fill={CAP} />
      <rect x="50" y="52" width="58" height="124" rx="14" fill={`url(#body)`} />
    </>
  ),
  serum: (
    <>
      <rect x="68" y="14" width="22" height="64" rx="5" fill={CAP} />
      <rect x="58" y="76" width="42" height="100" rx="8" fill={`url(#body)`} />
    </>
  ),
  tube: (
    <>
      <path d="M46 16 H112 L100 142 H58 Z" fill={`url(#body)`} />
      <rect x="58" y="142" width="42" height="34" rx="4" fill={CAP} />
    </>
  ),
  wand: (
    <>
      <rect x="66" y="14" width="26" height="72" rx="6" fill={CAP} />
      <rect x="66" y="84" width="26" height="92" rx="6" fill={`url(#body)`} />
    </>
  ),
};

export function ProductArt({ shape, className }: { shape: Shape; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 158 190" className={className}>
      <defs>
        <linearGradient id="body" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#E9DFD3" />
          <stop offset=".45" stopColor={BODY} />
          <stop offset="1" stopColor="#DDD0C1" />
        </linearGradient>
      </defs>
      {SHAPES[shape]}
    </svg>
  );
}
