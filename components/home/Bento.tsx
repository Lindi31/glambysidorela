import Link from "next/link";
import { BERATUNG_HREF } from "@/lib/offers";
import { ProductArt } from "./ProductArt";
import { Logo } from "@/components/ownui/Logo";
import { cn } from "@/lib/utils";

type TileProps = {
  href: string;
  title: string;
  text: string;
  action: string;
  className?: string;
  dark?: boolean;
  children?: React.ReactNode;
};

function Tile({ href, title, text, action, className, dark, children }: TileProps) {
  return (
    <Link
      href={href}
      className={cn(
        "rise group relative flex min-h-[260px] flex-col md:min-h-[340px] justify-between overflow-hidden rounded-[28px] p-7 transition-transform duration-700 ease-out hover:scale-[1.008] md:p-9",
        dark ? "bg-charcoal text-cream" : "text-charcoal",
        className,
      )}
    >
      <div className="relative z-10 max-w-[22em]">
        <h3 className="font-display text-[clamp(30px,3.3vw,44px)] leading-[1.02] tracking-[-0.018em]">{title}</h3>
        <p className={cn("mt-3 text-[16px] leading-snug", dark ? "text-cream/75" : "text-charcoal/75")}>{text}</p>
      </div>
      <span className="relative z-10 mt-8 text-[15px] font-medium underline-offset-4 group-hover:underline">{action}</span>
      {children}
    </Link>
  );
}

export function Bento() {
  return (
    <section className="bg-cream px-5 pb-24 md:pb-36 lg:px-8">
      <div className="mx-auto grid max-w-[1136px] gap-4 md:grid-cols-6">
        <Tile
          dark
          href="/beauty-check"
          title="Was passt zu dir?"
          text="Drei kurze Fragen, eine persönliche Empfehlung."
          action="Beauty-Check starten"
          className="md:col-span-4"
        >
          <svg aria-hidden viewBox="0 0 400 300" fill="none" className="absolute -bottom-24 -right-16 w-[440px] md:-right-6">
            <path className="ring-soft" d="M30 300 V190 A170 170 0 0 1 370 190 V300" stroke="#FFF1D6" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </Tile>

        <Tile
          href={BERATUNG_HREF}
          title="Erst reden, dann entscheiden."
          text="Deine Beratung ist kostenlos und unverbindlich."
          action="Beratung buchen"
          className="bg-white md:col-span-2"
        />

        <Tile
          href="/gutschein"
          title="Schenke einen Moment nur für sie."
          text="Gestalte deinen Gutschein in wenigen Sekunden."
          action="Gutschein gestalten"
          className="bg-nude/70 md:col-span-3"
        >
          <div aria-hidden className="pointer-events-none absolute -bottom-10 -right-8 hidden aspect-[8/5] w-[300px] -rotate-6 rounded-2xl bg-charcoal p-5 shadow-[0_30px_60px_rgba(44,40,38,.3)] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:rotate-0 sm:block">
            <Logo className="text-cream" />
            <span className="mt-2 block text-[11px] text-gold">Gutschein</span>
          </div>
        </Tile>

        <Tile
          href="/brautpaket"
          title="Dein schönster Tag beginnt hier."
          text="Stell dir dein Brautpaket selbst zusammen."
          action="Brautpaket zusammenstellen"
          className="bg-rose/40 md:col-span-3"
        />

        <Tile
          href="/shop"
          title="Pflege für zuhause."
          text="Damit dein Ergebnis lange schön bleibt."
          action="Pflege entdecken"
          className="bg-[#EFE8DF] md:col-span-2"
        >
          <div aria-hidden className="pointer-events-none absolute -bottom-4 right-3 flex items-end transition-transform duration-700 ease-out group-hover:-translate-y-1.5">
            <ProductArt shape="serum" className="w-[74px] drop-shadow-[0_12px_18px_rgba(44,40,38,.2)]" />
            <ProductArt shape="pump" className="-ml-5 w-[92px] drop-shadow-[0_12px_18px_rgba(44,40,38,.2)]" />
          </div>
        </Tile>

        <Tile
          dark
          href="/schulungen"
          title="Mach aus deinem Talent einen Beruf."
          text="Lash- und PMU-Schulungen bei Sidorela, inklusive Starterset."
          action="Schulungen ansehen"
          className="md:col-span-4"
        />
      </div>
    </section>
  );
}
