import { LOGO } from "./logoPaths";

type Props = {
  variant?: "nav" | "large";
  className?: string;
};

// Schriftzug als Vektor. Für kleine Größen gibt es eine eigene Version
// mit kräftigerer Schrift und größerer Zusatzzeile.
export function Logo({ variant = "nav", className }: Props) {
  const logo = LOGO[variant];
  return (
    <svg
      viewBox={`0 0 ${logo.width} ${logo.height}`}
      fill="currentColor"
      aria-hidden
      className={className}
      style={variant === "nav" ? { width: logo.width, height: logo.height, flex: "none" } : undefined}
    >
      <path d={logo.word} />
      <path d={logo.descriptor} />
    </svg>
  );
}
