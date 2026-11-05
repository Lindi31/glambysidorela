import { Pill } from "@/components/ownui/Pill";
import { getTexts } from "@/lib/content";
import { BERATUNG_HREF } from "@/lib/offers";

export async function CtaBooking() {
  const { cta } = await getTexts();
  return (
    <section className="relative overflow-hidden bg-charcoal px-5 pb-24 pt-36 text-center md:pb-32 md:pt-52">
      <svg aria-hidden viewBox="0 0 1000 300" fill="none" className="absolute left-1/2 top-14 w-[max(1240px,170%)] -translate-x-1/2 md:w-[1240px]">
        <path className="ring-soft" d="M40 300 A460 280 0 0 1 960 300" stroke="#FFF1D6" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <div className="relative">
        <h2 className="text-balance font-display max-w-[12em] mx-auto text-[clamp(42px,5.6vw,72px)] leading-[0.98] tracking-[-0.022em] text-cream">
          {cta.title}
        </h2>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Pill href="/termin" variant="light">Termin buchen</Pill>
          <Pill href={BERATUNG_HREF} variant="outlineLight">Kostenlose Beratung</Pill>
        </div>
      </div>
    </section>
  );
}
