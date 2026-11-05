import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Pill } from "@/components/ownui/Pill"
import { PageIntro, cardClass, pageShell, sectionTitle } from "@/components/ownui/PageIntro"
import { getCategories, getTexts } from "@/lib/content"
import { BERATUNG_HREF } from "@/lib/offers"
import { urlFor } from "@/sanity/lib/image"
import { ServiceLine, serviceTone } from "@/components/home/ServiceLine"
import type { ServiceItem } from "@/lib/content"

type Service = Pick<ServiceItem, "_id" | "title" | "slug" | "category" | "shortDescription" | "priceFrom" | "duration"> & {
  image?: Parameters<typeof urlFor>[0] | null
}

function ServiceCard({ service }: { service: Service }) {
  const tone = serviceTone(service.category)
  return (
    <li>
      <Link href={`/leistungen/${service.slug}`} className={`${cardClass} group flex h-full overflow-hidden transition-transform duration-700 ease-out hover:scale-[1.01]`}>
        <div className={`relative flex w-[28%] flex-none items-center justify-center overflow-hidden sm:w-[210px] ${service.image ? "bg-nude/30" : tone.bg}`}>
          {service.image ? (
            <Image src={urlFor(service.image).width(500).height(625).url()} alt="" fill sizes="(max-width: 640px) 28vw, 210px" className="object-cover" />
          ) : (
            <ServiceLine slug={service.slug} category={service.category} color={tone.line} className="w-[86%] transition-transform duration-700 ease-out group-hover:scale-105" />
          )}
        </div>
        <div className="flex min-h-[176px] min-w-0 flex-1 flex-col p-4 sm:min-h-[190px] sm:p-6">
          <h3 className="font-display text-[23px] leading-[1.05] tracking-[-0.015em] text-charcoal hyphens-auto sm:text-[30px]">{service.title}</h3>
          {service.shortDescription && <p className="mt-1.5 flex-1 text-[14px] leading-snug text-charcoal/75 sm:mt-2 sm:text-[15px]">{service.shortDescription}</p>}
          <p className="mt-3 flex items-center justify-between gap-2 text-[14px] font-medium text-charcoal sm:mt-5 sm:text-[15px]">
            <span className="flex flex-wrap gap-x-3">
              <span>{service.priceFrom ? `ab ${service.priceFrom} €` : "Preis auf Anfrage"}</span>
              {service.duration && <span className="font-normal text-charcoal/75">{service.duration} Min.</span>}
            </span>
            <ChevronRight size={20} strokeWidth={1.5} aria-hidden className="flex-none transition-transform duration-500 group-hover:translate-x-1" />
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

      <div className={pageShell}>
        {groups.length > 1 && (
          <nav aria-label="Zu einer Kategorie springen" className="-mx-5 mb-12 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:mb-16 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden">
            {groups.map((group) => (
              <a key={group.id} href={`#${group.id}`} className="flex min-h-11 flex-none items-center rounded-full bg-white px-5 text-[14px] font-medium text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-cream">
                {group.title}
              </a>
            ))}
          </nav>
        )}

        <div className="flex flex-col gap-14 md:gap-20">
          {groups.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-20">
              <h2 className={sectionTitle}>{group.title}</h2>
              <p className="mt-2 text-[17px] leading-snug text-charcoal/75">{group.line}</p>
              <ul className="mt-6 grid gap-3 md:mt-7 md:gap-4 lg:grid-cols-2 lg:[&>li:last-child:nth-child(odd)]:col-span-2">
                {group.items.map((service) => <ServiceCard key={service._id} service={service} />)}
              </ul>
            </section>
          ))}
          {groups.length === 0 && <p className="text-[17px] text-charcoal/75">{texts.leistungen.empty}</p>}
        </div>
      </div>
    </div>
  )
}
