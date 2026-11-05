import { TreatmentLine } from "./TreatmentLine";

// Jede Behandlung bekommt ihre eigene feine Zeichnung. Neue Leistungen ohne eigene
// Zeichnung nehmen automatisch die Linie ihrer Kategorie.
export const SERVICE_TONE: Record<string, { bg: string; line: string }> = {
  lashes: { bg: "bg-charcoal", line: "#C9A96E" },
  brows: { bg: "bg-nude/70", line: "#7A5F18" },
  pmu: { bg: "bg-[#F3EEE7]", line: "#8F4F57" },
  makeup: { bg: "bg-rose/45", line: "#2C2826" },
  facial: { bg: "bg-[#EFE8DF]", line: "#7A5F18" },
};

export const serviceTone = (category?: string | null) => SERVICE_TONE[category ?? ""] ?? SERVICE_TONE.pmu;

const round = (value: number) => Math.round(value * 10) / 10;
const range = (count: number, from: number, to: number) =>
  Array.from({ length: count }, (_, index) => from + ((to - from) * index) / (count - 1));

const Path = ({ d, opacity }: { d: string; opacity?: number }) => <path d={d} pathLength={1} opacity={opacity} />;

// Oberes Augenlid
const lid = (t: number) => {
  const u = 1 - t;
  return [
    u * u * u * 30 + 3 * u * u * t * 70 + 3 * u * t * t * 150 + t * t * t * 190,
    u * u * u * 118 + 3 * u * u * t * 72 + 3 * u * t * t * 72 + t * t * t * 118,
  ];
};

const LID = "M30 118 C70 72 150 72 190 118";

function lash(t: number, length: number, offset = 0) {
  const [x, y] = lid(t);
  const lean = (t - 0.5) * 1.7 + offset;
  const ex = x + Math.sin(lean) * length;
  const ey = y - Math.cos(lean) * length;
  const cx = x + Math.sin(lean * 0.35) * length * 0.6;
  const cy = y - Math.cos(lean * 0.35) * length * 0.6;
  return `M${round(x)} ${round(y)} Q${round(cx)} ${round(cy)} ${round(ex)} ${round(ey)}`;
}

function liftedLash(t: number, length: number) {
  const [x, y] = lid(t);
  const lean = (t - 0.5) * 1.5;
  const cx = x + Math.sin(lean) * length * 0.95;
  const cy = y - length * 0.3;
  const ex = x + Math.sin(lean) * length * 0.55;
  const ey = y - length;
  return `M${round(x)} ${round(y)} Q${round(cx)} ${round(cy)} ${round(ex)} ${round(ey)}`;
}

const bell = (t: number) => 0.74 + 0.26 * Math.sin(Math.PI * t);

// Augenbraue: t läuft vom inneren Ansatz (0) bis zum Schwanz (1)
const browX = (t: number) => 30 + 166 * t;
const browMid = (t: number) =>
  t < 0.7 ? 112 - 44 * Math.sin(((t / 0.7) * Math.PI) / 2) : 68 + 40 * ((t - 0.7) / 0.3) ** 1.5;
const browHeight = (t: number) => (t < 0.7 ? 24 - 8 * (t / 0.7) : 16 * (1 - (t - 0.7) / 0.3) ** 0.8);
const browAngle = (t: number) => (t < 0.7 ? -1.35 + 0.95 * (t / 0.7) : -0.4 + 1.0 * ((t - 0.7) / 0.3));

function browHair(t: number, position: number, length: number) {
  const x = browX(t);
  const y = browMid(t) + browHeight(t) * position;
  const angle = browAngle(t);
  const ex = x + Math.cos(angle) * length;
  const ey = y + Math.sin(angle) * length;
  const cx = x + Math.cos(angle - 0.28) * length * 0.55;
  const cy = y + Math.sin(angle - 0.28) * length * 0.55;
  return `M${round(x)} ${round(y)} Q${round(cx)} ${round(cy)} ${round(ex)} ${round(ey)}`;
}

function laminatedHair(t: number) {
  const x = browX(t);
  const height = browHeight(t);
  const y = browMid(t) + height * 0.5;
  const tail = t > 0.7 ? (t - 0.7) / 0.3 : 0;
  const ex = x + 9 + tail * 12;
  const ey = browMid(t) - height * 0.75 + tail * 6;
  return `M${round(x)} ${round(y)} Q${round(x + 1)} ${round((y + ey) / 2)} ${round(ex)} ${round(ey)}`;
}

function powderDots() {
  const dots: { x: number; y: number; r: number }[] = [];
  range(62, 0.01, 0.97).forEach((t, column) => {
    const rows = Math.max(2, Math.round(browHeight(t) / 2.6));
    const fade = Math.min(1, 0.12 + t * 1.9);
    for (let row = 0; row < rows; row++) {
      // Fester Zufall: vorne locker, zum Schwanz hin immer dichter
      const noise = Math.abs(Math.sin(column * 12.9898 + row * 78.233) * 43758.5453) % 1;
      if (noise > fade) continue;
      const position = rows === 1 ? 0 : row / (rows - 1) - 0.5;
      dots.push({ x: round(browX(t) + (noise - 0.5) * 2), y: round(browMid(t) + browHeight(t) * position), r: round(0.65 + noise * 0.5) });
    }
  });
  return dots;
}

const Sparkle = ({ x, y, size }: { x: number; y: number; size: number }) => (
  <Path d={`M${x} ${y - size} Q${x + size * 0.14} ${y - size * 0.14} ${x + size} ${y} Q${x + size * 0.14} ${y + size * 0.14} ${x} ${y + size} Q${x - size * 0.14} ${y + size * 0.14} ${x - size} ${y} Q${x - size * 0.14} ${y - size * 0.14} ${x} ${y - size} Z`} />
);

const ART: Record<string, () => React.ReactNode> = {
  wimpernverlaengerung: () => (
    <>
      <Path d={LID} />
      {range(15, 0.07, 0.93).map((t) => <Path key={t} d={lash(t, 50 * bell(t))} />)}
    </>
  ),
  "volumen-lashes": () => (
    <>
      <Path d={LID} />
      {range(13, 0.07, 0.93).flatMap((t) =>
        [-0.17, -0.06, 0.06, 0.17].map((offset) => <Path key={`${t}${offset}`} d={lash(t, (offset === -0.06 || offset === 0.06 ? 56 : 46) * bell(t), offset)} />),
      )}
    </>
  ),
  "lash-lifting": () => (
    <>
      <Path d={LID} />
      {range(13, 0.08, 0.92).map((t) => <Path key={t} d={liftedLash(t, 36 * bell(t))} />)}
    </>
  ),
  "wimpern-auffuellen": () => (
    <>
      <Path d={LID} />
      {range(15, 0.07, 0.93).map((t, index) => <Path key={t} d={lash(t, (index % 3 === 1 ? 24 : 50) * bell(t))} opacity={index % 3 === 1 ? 0.5 : 1} />)}
      {range(15, 0.07, 0.93).map((t, index) => {
        if (index % 3 !== 1) return null;
        const lean = (t - 0.5) * 1.7;
        const [x, y] = lid(t);
        return <Path key={`plus-${t}`} d={`M${round(x + Math.sin(lean) * 33)} ${round(y - Math.cos(lean) * 33)} L${round(x + Math.sin(lean) * 50 * bell(t))} ${round(y - Math.cos(lean) * 50 * bell(t))}`} opacity={0.5} />;
      })}
    </>
  ),
  "brow-lamination": () => <>{range(46, 0.01, 0.98).map((t) => <Path key={t} d={laminatedHair(t)} />)}</>,
  microblading: () => (
    <>
      {range(30, 0.01, 0.97).map((t) => <Path key={`a${t}`} d={browHair(t, 0.5, 11 + browHeight(t) * 0.7)} />)}
      {range(26, 0.03, 0.8).map((t) => <Path key={`b${t}`} d={browHair(t, 0.05, 9 + browHeight(t) * 0.5)} opacity={0.75} />)}
    </>
  ),
  "powder-brows": () => <>{powderDots().map((dot) => <circle key={`${dot.x}-${dot.y}`} cx={dot.x} cy={dot.y} r={dot.r} fill="currentColor" stroke="none" />)}</>,
  "lip-blush": () => (
    <>
      <Path d="M26 104 C52 78 80 68 96 78 C104 83 116 83 124 78 C140 68 168 78 194 104 C166 128 138 140 110 140 C82 140 54 128 26 104 Z" />
      <Path d="M26 104 C70 112 150 112 194 104" />
      <Path d="M48 113 C84 122 136 122 172 113" opacity={0.65} />
      <Path d="M62 120 C92 127 128 127 158 120" opacity={0.55} />
      <Path d="M76 127 C98 132 122 132 144 127" opacity={0.45} />
      <Path d="M56 92 C78 84 88 88 100 92" opacity={0.55} />
      <Path d="M120 92 C132 88 142 84 164 92" opacity={0.55} />
    </>
  ),
  "braut-make-up": () => (
    <>
      <circle cx={88} cy={118} r={38} pathLength={1} />
      <circle cx={134} cy={118} r={38} pathLength={1} />
      <Path d="M134 80 L120 64 L127 54 H141 L148 64 Z" />
      <Path d="M120 64 H148" />
      <Path d="M127 54 L134 64 L141 54" />
      <Sparkle x={62} y={56} size={8} />
    </>
  ),
  "event-make-up": () => (
    <>
      <Path d="M70 158 L152 58" />
      <Path d="M152 58 C160 46 178 36 188 34 C188 46 180 64 168 72 C162 76 156 76 148 68" />
      <Path d="M70 158 C66 164 58 168 52 168 C52 162 56 154 62 150" />
      <Sparkle x={72} y={62} size={15} />
      <Sparkle x={106} y={34} size={7} />
      <Sparkle x={172} y={124} size={10} />
    </>
  ),
  gesichtsbehandlung: () => (
    <>
      <Path d="M110 24 C122 46 136 60 136 78 C136 93 124 104 110 104 C96 104 84 93 84 78 C84 60 98 46 110 24 Z" />
      <ellipse cx={110} cy={138} rx={34} ry={7} pathLength={1} />
      <ellipse cx={110} cy={138} rx={62} ry={14} pathLength={1} />
      <ellipse cx={110} cy={138} rx={92} ry={22} pathLength={1} />
    </>
  ),
};

type Props = { slug: string; category?: string | null; color: string; className?: string; strokeWidth?: number; animated?: boolean };

export function ServiceLine({ slug, category, color, className, strokeWidth = 1, animated }: Props) {
  const art = ART[slug];
  if (!art) return <TreatmentLine id={category ?? ""} color={color} className={className} />;
  return (
    <svg aria-hidden viewBox="0 0 220 190" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" color={color} className={`${animated ? "line-draw" : ""} ${className ?? ""}`}>
      {art()}
    </svg>
  );
}
