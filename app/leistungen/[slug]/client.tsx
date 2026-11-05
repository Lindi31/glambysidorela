import Image from "next/image"
import Link from "next/link"
import { PortableText, type PortableTextBlock } from "@portabletext/react"
import { Check, ChevronDown, ChevronRight } from "lucide-react"
import { ServiceLine, serviceTone } from "@/components/home/ServiceLine"
import { DetailHero, cardClass, pageShell, sectionTitle } from "@/components/ownui/PageIntro"
import { Pill } from "@/components/ownui/Pill"
import { RefillReminder } from "@/components/ownui/TrainingExtras"
import { BERATUNG_HREF } from "@/lib/offers"
import { getCategories, getSite, getTexts } from "@/lib/content"
import { whatsappUrl } from "@/lib/site"
import { urlFor } from "@/sanity/lib/image"

type SanityImage = Parameters<typeof urlFor>[0] & { asset?: { _ref?: string } }

type Service = {
  title: string
  slug: string
  category?: string | null
  shortDescription?: string | null
  description?: PortableTextBlock[] | null
  priceFrom?: number | null
  duration?: number | null
  lasts?: string | null
  idealFor?: string[] | null
  faq?: { question?: string | null; answer?: string | null }[] | null
  image?: SanityImage | null
  gallery?: SanityImage[] | null
  calcomEventType?: string | null
}

type Related = { _id: string; title: string; slug: string; category?: string | null; shortDescription?: string | null; priceFrom?: number | null }

const hasAsset = (photo?: SanityImage | null): photo is SanityImage => Boolean(photo?.asset?._ref)

export async function ServiceDetail({ service, related }: { service: Service; related: Related[] }) {
  const [texts, site, categories] = await Promise.all([getTexts(), getSite(), getCategories()])
  const t = texts.leistung
  const direct = Boolean(service.calcomEventType)
  const bookLabel = direct ? "Termin buchen" : "Termin anfragen"
  const steps = [direct ? t.step1 : t.step1Request, t.step2, t.step3]
  const bookingHref = `/termin?behandlung=${service.slug}`
  const whatsapp = whatsappUrl(`Hallo Sidorela, ich habe eine Frage zu ${service.title}.`, site.whatsapp)
  const heroPhoto = hasAsset(service.image) ? service.image : null
  const photos = (service.gallery ?? []).filter(hasAsset)
  const faq = (service.faq ?? []).filter((item) => item.question && item.answer)
  const idealFor = service.idealFor ?? []
  const priceText = service.priceFrom ? `ab ${service.priceFrom} €` : "Preis auf Anfrage"
  const facts = [
    { label: "Preis", value: priceText },
    ...(service.duration ? [{ label: "Dauer", value: `${service.duration} Min.` }] : []),
    ...(service.lasts ? [{ label: "Hält", value: service.lasts }] : []),
  ]

  return (
    <article className="bg-cream">
      <DetailHero
        crumbs={[{ href: "/leistungen", label: "Leistungen" }]}
        current={service.title}
        kicker={categories.find((category) => category.id === service.category)?.label ?? null}
        title={service.title}
        lead={service.shortDescription}
        facts={facts}
        visual={heroPhoto ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-cream/10 md:aspect-[4/5] md:rounded-[28px]">
            <Image src={urlFor(heroPhoto).width(900).height(1125).url()} alt={service.title} fill preload sizes="(max-width: 768px) 92vw, 440px" className="object-cover" />
          </div>
        ) : (
          <ServiceLine slug={service.slug} category={service.category} color="#C9A96E" strokeWidth={0.7} animated className="-mb-5 -mt-3 w-[132px] md:my-0 md:ml-auto md:w-full md:max-w-[420px]" />
        )}
      />

      <div className={`${pageShell} grid items-start gap-10 py-12 md:py-20 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16`}>
        <div className="flex min-w-0 flex-col gap-12 md:gap-16">
          {service.description && (
            <div className="rich-text">
              <PortableText value={service.description} />
            </div>
          )}

          {idealFor.length > 0 && (
            <section>
              <h2 className={sectionTitle}>{t.idealTitle}</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {idealFor.map((item) => (
                  <li key={item} className="flex gap-3 text-[17px] leading-snug text-charcoal md:text-[19px]">
                    <Check size={20} strokeWidth={1.5} aria-hidden className="mt-0.5 flex-none text-gold-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {service.slug === "braut-make-up" && (
            <Link href="/brautpaket" className={`${cardClass} group flex items-center justify-between gap-4 p-6 transition-transform duration-700 ease-out hover:scale-[1.01] md:p-7`}>
              <span>
                <span className="block font-display text-[28px] leading-[1.05] tracking-[-0.012em] text-charcoal">{t.brideLink.title}</span>
                <span className="mt-1 block text-[15px] leading-snug text-charcoal/75">{t.brideLink.text}</span>
              </span>
              <ChevronRight size={22} strokeWidth={1.5} aria-hidden className="flex-none text-charcoal transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          )}

          {photos.length > 0 && (
            <section>
              <h2 className={sectionTitle}>{t.photosTitle}</h2>
              <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                {photos.map((photo, index) => (
                  <li key={index} className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-nude/30">
                    <Image src={urlFor(photo).width(600).height(750).url()} alt={`${service.title}, Bild ${index + 1}`} fill sizes="(max-width: 768px) 45vw, 260px" className="object-cover" />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 className={sectionTitle}>{t.stepsTitle}</h2>
            <ol className={`${cardClass} mt-6 divide-y divide-charcoal/10 px-5 md:px-7`}>
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-5 py-5 md:py-6">
                  <span aria-hidden className="w-5 flex-none font-display text-[32px] leading-none text-gold-accent">{index + 1}</span>
                  <span>
                    <span className="block text-[17px] font-medium text-charcoal">{step.title}</span>
                    <span className="mt-1 block text-[15px] leading-snug text-charcoal/75">{step.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {faq.length > 0 && (
            <section>
              <h2 className={sectionTitle}>{t.faqTitle}</h2>
              <div className={`${cardClass} faq mt-6 divide-y divide-charcoal/10 px-5 md:px-7`}>
                {faq.map((item, index) => (
                  <details key={item.question} name="fragen" open={index === 0} className="group">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-medium leading-snug text-charcoal [&::-webkit-details-marker]:hidden">
                      {item.question}
                      <ChevronDown size={20} strokeWidth={1.5} aria-hidden className="flex-none transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <p className="pb-5 pr-9 text-[16px] leading-relaxed text-charcoal/75">{item.answer}</p>
                  </details>
                ))}
              </div>
              <p className="mt-4 text-[15px] text-charcoal/75">
                {t.faqMore}{" "}
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-medium text-charcoal underline underline-offset-4">Schreib mir per WhatsApp</a>
              </p>
            </section>
          )}

          {service.category && ["lashes", "brows"].includes(service.category) && <RefillReminder treatment={service.title} title={t.reminderTitle} consent={t.reminderConsent} doneText={t.reminderDone} />}

          {related.length > 0 && (
            <section>
              <h2 className={sectionTitle}>{t.relatedTitle}</h2>
              <ul className="mt-6 flex flex-col gap-2">
                {related.map((item) => {
                  const tone = serviceTone(item.category)
                  return (
                    <li key={item._id}>
                      <Link href={`/leistungen/${item.slug}`} className="group flex items-center gap-4 rounded-2xl bg-white p-3 pr-4 transition-transform duration-700 ease-out hover:scale-[1.01] md:gap-5 md:pr-6">
                        <span className={`flex size-20 flex-none items-center justify-center rounded-xl md:size-24 ${tone.bg}`}>
                          <ServiceLine slug={item.slug} category={item.category} color={tone.line} className="w-[78%]" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-[24px] leading-[1.08] tracking-[-0.012em] text-charcoal md:text-[26px]">{item.title}</span>
                          {item.shortDescription && <span className="mt-1 line-clamp-2 text-[14px] leading-snug text-charcoal/75">{item.shortDescription}</span>}
                          <span className="mt-1 block text-[14px] font-medium text-charcoal">{item.priceFrom ? `ab ${item.priceFrom} €` : "Preis auf Anfrage"}</span>
                        </span>
                        <ChevronRight size={20} strokeWidth={1.5} aria-hidden className="flex-none text-charcoal transition-transform duration-500 group-hover:translate-x-1" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <p className="mt-5 pb-14 lg:pb-0">
                <Link href="/leistungen" className="inline-flex min-h-11 items-center text-[15px] font-medium text-charcoal underline underline-offset-4">Alle Leistungen ansehen</Link>
              </p>
            </section>
          )}
        </div>

        <aside className={`${cardClass} hidden flex-col gap-3 p-7 lg:sticky lg:top-20 lg:flex`}>
          <h2 className="font-sans text-[15px] tracking-normal text-charcoal/75">{t.bookingTitle}</h2>
          <p className="font-display text-[38px] leading-none tracking-[-0.015em] text-charcoal">{priceText}</p>
          {service.duration && <p className="mb-2 text-[15px] text-charcoal/75">{service.duration} Minuten, in Bruchsal oder Jülich</p>}
          <Pill href={bookingHref}>{bookLabel}</Pill>
          <Pill href={BERATUNG_HREF} variant="outline">Kostenlose Beratung</Pill>
          <p className="text-center text-[13px] text-charcoal/70">{t.bookingNote}</p>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center text-[15px] font-medium text-charcoal underline-offset-4 hover:underline">
            Fragen per WhatsApp
          </a>
        </aside>
      </div>

      {/* Am Handy immer erreichbar, führt direkt zur passenden Buchung */}
      <div className="site-bar fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-2 rounded-full bg-cream/95 p-1.5 shadow-[0_10px_40px_rgba(44,40,38,.22)] lg:hidden">
        <Link href={bookingHref} className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-charcoal px-4 text-[15px] font-medium text-cream">
          {bookLabel}
        </Link>
        <Link href={BERATUNG_HREF} className="flex min-h-12 items-center justify-center rounded-full px-4 text-[14px] font-medium text-charcoal">
          Beratung
        </Link>
      </div>
    </article>
  )
}
