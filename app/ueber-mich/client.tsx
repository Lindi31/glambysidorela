import Image from "next/image"
import { PortableText, type PortableTextBlock } from "@portabletext/react"
import { pageShell, sectionTitle } from "@/components/ownui/PageIntro"
import { Pill } from "@/components/ownui/Pill"
import { BERATUNG_HREF } from "@/lib/offers"
import { urlFor } from "@/sanity/lib/image"

const FALLBACK_STORY = "Mein Name ist Sidorela Isa. Seit mehreren Jahren begleite ich Kundinnen auf ihrem Weg zum perfekten Look: ob als zarte Wimpernverlängerung für den Alltag, präzises Microblading oder strahlendes Braut-Make-up."
const ALT = "Sidorela Isa, Lash- und Make-up-Artist, in ihrem Studio"

type About = {
  headline?: string | null
  heroImage?: (Parameters<typeof urlFor>[0] & { asset?: { _ref?: string } }) | null
  story?: PortableTextBlock[] | null
  certifications?: string[] | null
  yearsExperience?: number | null
} | null

export function UeberMichView({ about }: { about: About }) {
  const photo = about?.heroImage?.asset?._ref ? urlFor(about.heroImage).width(900).height(1125).url() : "/hero.png"

  return (
    <div className="bg-cream pb-24 md:pb-32">
      <section className={`${pageShell} grid items-center gap-10 pb-16 pt-24 md:pt-32 lg:grid-cols-[1.1fr_1fr] lg:gap-16`}>
        <div>
          <h1 className="text-balance font-display text-[clamp(42px,6.4vw,84px)] leading-[1] tracking-[-0.022em] text-charcoal">
            {about?.headline ?? "Schönheit ist für mich Handwerk, Detail und Leidenschaft"}
          </h1>
          {about?.yearsExperience ? <p className="mt-5 text-[19px] text-charcoal/75">{about.yearsExperience}+ Jahre Erfahrung in Beauty und Schulung</p> : null}
          <div className="mt-7 flex flex-wrap gap-3">
            <Pill href="/termin">Termin buchen</Pill>
            <Pill href={BERATUNG_HREF} variant="outline">Kostenlose Beratung</Pill>
          </div>
        </div>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden [border-radius:50%_50%_0_0/40%_40%_0_0]">
          <Image src={photo} alt={ALT} fill preload sizes="(max-width: 1024px) 90vw, 460px" className="object-cover object-top" />
        </div>
      </section>

      <section className={`${pageShell} max-w-[820px]`}>
        <div className="rich-text">
          {about?.story ? <PortableText value={about.story} /> : <p>{FALLBACK_STORY}</p>}
        </div>
      </section>

      {about?.certifications && about.certifications.length > 0 && (
        <section className={`${pageShell} mt-16 md:mt-24`}>
          <h2 className={sectionTitle}>Zertifiziert und ausgebildet.</h2>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {about.certifications.map((certificate) => (
              <li key={certificate} className="rounded-2xl bg-white px-5 py-4 text-[16px] leading-snug text-charcoal">{certificate}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
