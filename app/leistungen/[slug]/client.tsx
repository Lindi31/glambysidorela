import Image from "next/image"
import Link from "next/link"
import { PortableText, type PortableTextBlock } from "@portabletext/react"
import { DetailHero, cardClass, pageShell, sectionTitle } from "@/components/ownui/PageIntro"
import { Pill } from "@/components/ownui/Pill"
import { RefillReminder } from "@/components/ownui/TrainingExtras"
import { BERATUNG_HREF } from "@/lib/offers"
import { CATEGORY_LABELS, whatsappUrl } from "@/lib/site"
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
  image?: SanityImage | null
  gallery?: SanityImage[] | null
  calcomEventType?: string | null
}

const STEPS = [
  { title: "Online buchen", text: "Wunschtermin wählen. Die Bestätigung kommt sofort per E-Mail." },
  { title: "Kurze Beratung", text: "Wir stimmen ab, welcher Look zu dir und deinem Alltag passt." },
  { title: "Behandlung und Pflege", text: "Du lehnst dich zurück. Danach bekommst du Tipps, damit dein Ergebnis lange schön bleibt." },
]

type Related = { _id: string; title: string; slug: string; priceFrom?: number | null }

export function ServiceDetail({ service, related }: { service: Service; related: Related[] }) {
  const bookingHref = service.calcomEventType ? `/termin?event=${service.calcomEventType}` : `/termin?behandlung=${service.slug}`
  const whatsapp = whatsappUrl(`Hallo Sidorela, ich habe eine Frage zu ${service.title}.`)
  const photos = [service.image, ...(service.gallery ?? [])].filter((photo): photo is SanityImage => Boolean(photo?.asset?._ref))
  const meta = [
    ...(service.priceFrom ? [`ab ${service.priceFrom} €`] : []),
    ...(service.duration ? [`${service.duration} Minuten`] : []),
  ]

  return (
    <article className="bg-cream">
      <DetailHero
        crumbs={[{ href: "/leistungen", label: "Leistungen" }]}
        current={service.title}
        kicker={service.category ? CATEGORY_LABELS[service.category] : null}
        title={service.title}
        lead={service.shortDescription}
        meta={meta}
      />

      <div className={`${pageShell} grid items-start gap-10 py-14 md:py-20 lg:grid-cols-[1fr_360px] lg:gap-16`}>
        <div className="flex min-w-0 flex-col gap-14">
          {service.description && (
            <div className="rich-text">
              <PortableText value={service.description} />
            </div>
          )}

          {photos.length > 0 && (
            <section>
              <h2 className={sectionTitle}>Einblicke</h2>
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
            <h2 className={sectionTitle}>So läuft dein Termin ab</h2>
            <ol className="mt-6 flex flex-col gap-2">
              {STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-5 rounded-2xl bg-white p-5 md:p-6">
                  <span aria-hidden className="font-display text-[32px] leading-none text-gold-accent">{index + 1}</span>
                  <span>
                    <span className="block text-[17px] font-medium text-charcoal">{step.title}</span>
                    <span className="mt-1 block text-[15px] leading-snug text-charcoal/75">{step.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {service.category && ["lashes", "brows"].includes(service.category) && <RefillReminder treatment={service.title} />}

          {related.length > 0 && (
            <section>
              <h2 className={sectionTitle}>Passt auch dazu</h2>
              <ul className="mt-6 grid gap-2 sm:grid-cols-3">
                {related.map((item) => (
                  <li key={item._id}>
                    <Link href={`/leistungen/${item.slug}`} className="flex h-full min-h-32 flex-col justify-between gap-4 rounded-2xl bg-white p-5 transition-transform duration-700 ease-out hover:scale-[1.01]">
                      <span className="font-display text-[26px] leading-[1.05] tracking-[-0.012em] text-charcoal">{item.title}</span>
                      {item.priceFrom && <span className="text-[15px] font-medium text-charcoal">ab {item.priceFrom} €</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className={`${cardClass} hidden flex-col gap-3 p-7 lg:sticky lg:top-20 lg:flex`}>
          <h2 className="font-display text-[34px] leading-none tracking-[-0.015em] text-charcoal">Dein Termin</h2>
          {meta.length > 0 && <p className="mb-2 text-[15px] text-charcoal/75">{meta.join(", ")}</p>}
          <Pill href={bookingHref}>Termin buchen</Pill>
          <Pill href={BERATUNG_HREF} variant="outline">Kostenlose Beratung</Pill>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center text-[15px] font-medium text-charcoal underline-offset-4 hover:underline">
            Fragen per WhatsApp
          </a>
        </aside>
      </div>

      <p className={`${pageShell} pb-24 lg:pb-16`}>
        <Link href="/leistungen" className="inline-flex min-h-11 items-center text-[15px] font-medium text-charcoal underline underline-offset-4">Alle Leistungen ansehen</Link>
      </p>

      {/* Am Handy immer erreichbar, führt direkt zur passenden Buchung */}
      <div className="site-bar fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-2 rounded-full bg-cream/80 p-1.5 shadow-[0_10px_40px_rgba(44,40,38,.22)] backdrop-blur-xl lg:hidden">
        <Link href={bookingHref} className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-charcoal px-4 text-[15px] font-medium text-cream">
          Termin buchen
        </Link>
        <Link href={BERATUNG_HREF} className="flex min-h-12 items-center justify-center rounded-full px-4 text-[14px] font-medium text-charcoal">
          Beratung
        </Link>
      </div>
    </article>
  )
}
