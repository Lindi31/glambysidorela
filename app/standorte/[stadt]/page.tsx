import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Clock, MapPin, Phone } from "lucide-react"
import { Pill } from "@/components/ownui/Pill"
import { BERATUNG_HREF } from "@/lib/offers"
import { CtaBooking } from "@/components/ownui/CtaBooking"
import { Footer } from "@/components/ownui/Footer"
import { Header } from "@/components/ownui/Header"
import { JsonLd } from "@/components/ownui/JsonLd"
import { breadcrumbs } from "@/lib/schema"
import { CATEGORY_LABELS, LOCATIONS, SITE } from "@/lib/site"
import { getServices } from "@/lib/content"

type Props = { params: Promise<{ stadt: string }> }

const findLocation = (slug: string) => LOCATIONS.find((location) => location.slug === slug)

export function generateStaticParams() {
  return LOCATIONS.map((location) => ({ stadt: location.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stadt } = await params
  const location = findLocation(stadt)
  if (!location) return {}
  return {
    title: `Lashes, Brows & Permanent Make-up in ${location.city}`,
    description: `Lash-Extensions, Brows, Permanent Make-up, Make-up und Gesichtsbehandlungen bei Sidorela Isa: ${location.street}, ${location.postalCode} ${location.city}. Jetzt Termin buchen.`,
    alternates: { canonical: `/standorte/${location.slug}` },
  }
}

export default async function LocationPage({ params }: Props) {
  const { stadt } = await params
  const location = findLocation(stadt)
  if (!location) notFound()

  const services = await getServices()
  const nearby = location.nearby.join(", ")

  return (
    <>
      <JsonLd data={breadcrumbs([{ name: location.city, path: `/standorte/${location.slug}` }])} />
      <Header />
      <main className="bg-cream">
        <section className="pb-14 pt-24 md:pb-20 md:pt-32">
          <div className="mx-auto grid max-w-[1200px] items-start gap-10 px-5 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:px-8">
            <div>
              <h1 className="text-balance font-display text-[clamp(42px,6.4vw,84px)] leading-[1] tracking-[-0.022em] text-charcoal">
                Lashes, Brows und Permanent Make-up in {location.city}
              </h1>
              <p className="mt-5 max-w-[34em] text-[17px] leading-snug text-charcoal/75 md:text-[19px]">
                Bei {SITE.name} in {location.city} ({location.region}) nimmt sich Sidorela Isa persönlich Zeit für
                dich. Das Studio ist auch gut erreichbar aus {nearby}.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Pill href={`/termin?ort=${location.slug}`}>Termin in {location.city} {location.slug === "juelich" ? "anfragen" : "buchen"}</Pill>
                <Pill href={BERATUNG_HREF} variant="outline">Kostenlose Beratung</Pill>
              </div>
            </div>

            <address className="not-italic space-y-5 rounded-[28px] bg-white p-7 text-charcoal">
              <h2 className="font-display text-[34px] leading-none tracking-[-0.015em]">So findest du mich</h2>
              <div className="flex gap-3">
                <MapPin size={20} className="text-rose-deep shrink-0 mt-0.5" aria-hidden />
                <div>
                  <div>{location.street}</div>
                  <div>{location.postalCode} {location.city}</div>
                  <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-11 underline underline-offset-4">
                    Route planen
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock size={20} className="text-rose-deep shrink-0 mt-0.5" aria-hidden />
                <div>{location.hours}</div>
              </div>
              <div className="flex gap-3 items-center">
                <Phone size={20} className="text-rose-deep shrink-0" aria-hidden />
                <a href={`tel:${SITE.phone}`} className="inline-flex items-center min-h-11 underline underline-offset-4">{SITE.phoneDisplay}</a>
              </div>
            </address>
          </div>
        </section>

        {services.length > 0 && (
          <section className="pb-24">
            <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
              <h2 className="mb-8 font-display text-[clamp(34px,4.6vw,56px)] leading-[1.03] tracking-[-0.02em] text-charcoal">Behandlungen in {location.city}</h2>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <li key={service._id}>
                    <Link
                      href={`/leistungen/${service.slug}`}
                      className="flex h-full flex-col rounded-[24px] bg-white p-6 transition-transform duration-700 ease-out hover:scale-[1.01]"
                    >
                      <span className="text-xs text-charcoal/70">{service.category ? CATEGORY_LABELS[service.category] : null}</span>
                      <span className="mt-1 font-display text-[28px] leading-[1.05] text-charcoal">{service.title}</span>
                      {service.shortDescription && <span className="mt-2 text-sm text-charcoal/70 leading-relaxed flex-1">{service.shortDescription}</span>}
                      {service.priceFrom && <span className="mt-4 text-sm font-medium text-charcoal">ab {service.priceFrom} €</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
        <CtaBooking />
      </main>
      <Footer />
    </>
  )
}
