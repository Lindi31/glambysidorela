import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const pageShell = "mx-auto max-w-[1200px] px-5 lg:px-8";
export const sectionTitle = "font-display text-[clamp(34px,4.6vw,56px)] leading-[1.03] tracking-[-0.02em] text-charcoal";
export const cardClass = "rounded-[24px] bg-white md:rounded-[28px]";

export function PageIntro({ title, lead, children }: { title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <header className={`${pageShell} pb-10 pt-24 md:pb-14 md:pt-32`}>
      <h1 className="max-w-[15em] text-balance font-display text-[clamp(42px,7vw,88px)] leading-[0.99] tracking-[-0.022em] text-charcoal">{title}</h1>
      {lead && <p className="mt-5 max-w-[34em] text-[17px] leading-snug text-charcoal/75 md:text-[19px]">{lead}</p>}
      {children}
    </header>
  );
}

type Crumb = { href: string; label: string };

export function DetailHero({ crumbs, current, kicker, title, lead, meta }: {
  crumbs: Crumb[];
  current: string;
  kicker?: string | null;
  title: string;
  lead?: string | null;
  meta?: string[];
}) {
  return (
    <section id="hero-stage" data-static="true" className="bg-charcoal pb-14 pt-24 text-cream md:pb-20 md:pt-28">
      <div className={pageShell}>
        <nav aria-label="Brotkrumen" className="flex flex-wrap items-center gap-1 text-[13px] text-cream/70">
          {crumbs.map((crumb) => (
            <span key={crumb.href} className="inline-flex items-center gap-1">
              <Link href={crumb.href} className="inline-flex min-h-9 items-center hover:text-cream">{crumb.label}</Link>
              <ChevronRight size={13} aria-hidden />
            </span>
          ))}
          <span aria-current="page" className="text-cream">{current}</span>
        </nav>
        {kicker && <p className="mt-8 text-[15px] text-gold">{kicker}</p>}
        <h1 className={`${kicker ? "mt-2" : "mt-8"} max-w-[14em] text-balance font-display text-[clamp(46px,8vw,104px)] leading-[0.98] tracking-[-0.024em]`}>{title}</h1>
        {lead && <p className="mt-5 max-w-[32em] text-[17px] leading-snug text-cream/80 md:text-[20px]">{lead}</p>}
        {meta && meta.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-[15px] font-medium">
            {meta.map((item) => <li key={item}>{item}</li>)}
          </ul>
        )}
      </div>
    </section>
  );
}
