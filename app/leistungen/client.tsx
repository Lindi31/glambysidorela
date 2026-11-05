import Image from "next/image"
import Link from "next/link"
import { Pill } from "@/components/ownui/Pill"
import { PageIntro, cardClass, pageShell, sectionTitle } from "@/components/ownui/PageIntro"
import { getCategories, getTexts } from "@/lib/content"
import { BERATUNG_HREF } from "@/lib/offers"
import { urlFor } from "@/sanity/lib/image"
import { TreatmentLine } from "@/components/home/TreatmentLine"
import type { ServiceItem } from "@/lib/content"

type Service = Pick<ServiceItem, "_id" | "title" | "slug" | "category" | "shortDescription" | "priceFrom" | "duration"> & {
  image?: Parameters<typeof urlFor>[0] | null
}

const CARD_TONE: Record<string, { bg: string; line: string }> = {
  lashes: { bg: "bg-charcoal", line: "#C9A96E" },
  brows: { bg: "bg-nude/70", line: "#7A5F18" },
  pmu: { bg: "bg-[#F3EEE7]", line: "#8F4F57" },
  makeup: { bg: "bg-rose/45", line: "#2C2826" },
  facial: { bg: "bg-[#EFE8DF]", line: "#7A5F18" },
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <li>
      <Link href={`/leistungen/${service.slug}`} className={`${cardClass} group flex h-full flex-col overflow-hidden transition-transform duration-700 ease-out hover:scale-[1.01]`}>
        {service.image ? (
          <div className="relative aspect-[4/5] overflow-hidden bg-nude/30">
            <Image src={urlFor(service.image).width(700).height(875).url()} alt={service.title} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px" className="object-cover" />
          </div>
        ) : (
          <div className={`flex aspect-[16/10] items-center justify-center ${(CARD_TONE[service.category ?? ""] ?? CARD_TONE.pmu).bg}`}>
            <TreatmentLine id={service.category ?? ""} color={(CARD_TONE[service.category ?? ""] ?? CARD_TONE.pmu).line} className="w-[52%] transition-transform duration-700 ease-out group-hover:scale-105" />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6 md:p-7">
          <h3 className="font-display text-[30px] leading-[1.05] tracking-[-0.015em] text-charcoal">{service.title}</h3>
          {service.shortDescription && <p className="mt-2 flex-1 text-[15px] leading-snug text-charcoal/75">{service.shortDescription}</p>}
          <p className="mt-5 flex flex-wrap gap-x-4 text-[15px] font-medium text-charcoal">
            {service.priceFrom && <span>ab {service.priceFrom} €</span>}
            {service.duration && <span className="font-normal text-charcoal/75">{service.duration} Min.</span>}
          </p>
        </div>
      </Link>
    </li>
  )
}

export async function LeistungenGrid({ services }: { services: Service[] }) {
  const [texts, categories] = await Promise.all([getTexts(), getCategories()])
  const groups = categories.map((category) => ({
    id: category.id,
    title: category.label,
    line: category.line,
    items: services.filter((service) => service.category === category.id),
  })).filter((group) => group.items.length > 0)

  return (
    <div className="bg-cream pb-24 md:pb-32">
      <PageIntro title={texts.leistungen.title} lead={texts.leistungen.lead}>
        <div className="mt-7 flex flex-wrap gap-3">
          <Pill href="/beauty-check">Beauty-Check starten</Pill>
          <Pill href={BERATUNG_HREF} variant="outline">Kostenlose Beratung</Pill>
        </div>
      </PageIntro>

      <div className={`${pageShell} flex flex-col gap-16 md:gap-24`}>
        {groups.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-20">
            <h2 className={sectionTitle}>{group.title}</h2>
            <p className="mt-2 text-[17px] leading-snug text-charcoal/75">{group.line}</p>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((service) => <ServiceCard key={service._id} service={service} />)}
            </ul>
          </section>
        ))}
        {groups.length === 0 && <p className="text-[17px] text-charcoal/75">{texts.leistungen.empty}</p>}
      </div>
    </div>
  )
}
