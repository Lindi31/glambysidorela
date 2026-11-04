import { LOGO } from "./logoPaths";

type Props = {
  variant?: "nav" | "large";
  dark?: boolean;
  className?: string;
};

// Der offene Bogen ist das Ringlicht aus dem Studio. Für kleine Größen gibt es eine
// eigene Version mit kräftigerer Schrift und größerer Zusatzzeile.
export function Logo({ variant = "nav", dark, className }: Props) {
  const logo = LOGO[variant];
  return (
    <svg
      viewBox={`0 0 ${logo.width} ${logo.height}`}
      fill="currentColor"
      aria-hidden
      className={className}
      style={variant === "nav" ? { width: logo.width, height: logo.height, flex: "none" } : undefined}
    >
      <g transform={`scale(${logo.scale})`}>
        <path d={LOGO.symbol.arch} fill="none" stroke={dark ? "#C9A96E" : "#7A5F18"} strokeWidth={logo.arcWidth} strokeLinecap="round" />
        <path d={LOGO.symbol.s} />
      </g>
      <path d={logo.word} />
      <path d={logo.descriptor} />
    </svg>
  );
}
