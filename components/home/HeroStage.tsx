import Image from "next/image";
import { Pill } from "@/components/ownui/Pill";
import { BERATUNG_HREF } from "@/lib/offers";

type Props = { kicker: string; headline: string };

const ALT = "Sidorela Isa, Lash- und Make-up-Artist, in ihrem Studio";
const ARCH = "[border-radius:50%_50%_0_0/40%_40%_0_0]";

function Copy({ kicker, headline }: Props) {
  return (
    <div className="mx-auto flex max-w-[900px] flex-col items-center px-5 text-center">
      <h1 className="text-[13px] font-medium tracking-[-0.005em] text-cream/75 md:text-[15px]">
        {kicker}
      </h1>
      <p className="mt-3 text-balance font-display text-[clamp(44px,7.4vw,92px)] font-normal leading-[0.98] tracking-[-0.022em] text-cream">
        {headline}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Pill href="/termin" variant="light">Termin buchen</Pill>
        <Pill href={BERATUNG_HREF} variant="outlineLight">Kostenlose Beratung</Pill>
      </div>
    </div>
  );
}

// Die Bewegung läuft komplett in CSS (globals.css, "Hero"): Der Browser führt sie direkt
// beim Scrollen aus, ohne JavaScript. Alte Browser zeigen stattdessen eine ruhige Fassung.
export function HeroStage({ kicker, headline, image }: Props & { image: string }) {
  return (
    <section id="hero-stage" className="hero-stage">
      <div className="hero-pin">
        <div aria-hidden className="hero-dark" />
        <div className="hero-photo">
          <div className={`absolute inset-0 overflow-hidden ${ARCH}`}>
            <Image src={image} alt={ALT} fill preload sizes="(max-width: 768px) 92vw, 620px" className="object-cover object-top" />
          </div>
          <svg aria-hidden viewBox="0 0 110 135" className="pointer-events-none absolute -left-[5%] -top-[4%] h-[108%] w-[110%] overflow-visible">
            <path
              className="ring-light"
              pathLength={1}
              d="M1.5 92 V55 A53.5 53.5 0 0 1 108.5 55 V92"
              fill="none"
              stroke="#FFF1D6"
              strokeWidth=".45"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="hero-copy">
          <Copy kicker={kicker} headline={headline} />
        </div>
      </div>
    </section>
  );
}
