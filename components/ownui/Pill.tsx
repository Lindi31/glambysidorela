import Link from "next/link";
import { cn } from "@/lib/utils";

const VARIANTS = {
  dark: "bg-charcoal text-cream hover:bg-ink-hover",
  light: "bg-cream text-charcoal hover:bg-white",
  outline: "border border-charcoal/25 text-charcoal hover:border-charcoal",
  outlineLight: "border border-cream/35 text-cream hover:border-cream",
};

export const pillClass = (variant: keyof typeof VARIANTS = "dark", className?: string) =>
  cn(
    "inline-flex min-h-12 items-center justify-center rounded-full px-7 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-300",
    VARIANTS[variant],
    className,
  );

type Props = {
  href: string;
  variant?: keyof typeof VARIANTS;
  className?: string;
  children: React.ReactNode;
};

export function Pill({ href, variant = "dark", className, children }: Props) {
  const external = href.startsWith("http");
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={pillClass(variant, className)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={pillClass(variant, className)}>
      {children}
    </Link>
  );
}
