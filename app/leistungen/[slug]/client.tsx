"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, Euro, ArrowLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PortableText } from "@portabletext/react"
import { urlFor } from "@/sanity/lib/image"

const categoryLabels: Record<string, string> = {
  lashes: "Lashes",
  brows: "Brows",
  pmu: "Permanent Make-up",
  makeup: "Make-up",
  facial: "Gesichtsbehandlungen",
}

export function ServiceDetail({ service }: { service: any }) {
  const bookingHref = service.calcomEventType
    ? `/termin?event=${service.calcomEventType}`
    : "/termin"

  return (
    <article className="relative bg-cream overflow-hidden">
      {/* Hero */}
      <div className="relative pt-20 min-h-[60vh] flex items-end pb-16 overflow-hidden">
        {service.image ? (
          <>
            <div className="absolute inset-0">
              <Image
                src={urlFor(service.image).width(1400).height(800).url()}
                alt={service.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
            </div>
            <div className="relative mx-auto max-w-7xl px-6 lg:px-10 w-full">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-cream/60 text-xs mb-6">
                  <Link href="/" className="hover:text-cream transition-colors">Home</Link>
                  <ChevronRight size={12} />
                  <Link href="/leistungen" className="hover:text-cream transition-colors">Leistungen</Link>
                  <ChevronRight size={12} />
                  <span className="text-cream/90">{service.title}</span>
                </nav>
                <div className="text-xs tracking-[0.2em] uppercase text-rose mb-3">
                  {categoryLabels[service.category] ?? service.category}
                </div>
                <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight mb-6">{service.title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-cream/80 text-sm">
                  {service.priceFrom && (
                    <span className="flex items-center gap-2">
                      <Euro size={16} className="text-rose" />
                      ab {service.priceFrom} €
                    </span>
                  )}
                  {service.duration && (
                    <span className="flex items-center gap-2">
                      <Clock size={16} className="text-rose" />
                      {service.duration} Minuten
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-7xl px-6 lg:px-10 w-full pt-32">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-charcoal/50 text-xs mb-6">
                <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
                <ChevronRight size={12} />
                <Link href="/leistungen" className="hover:text-charcoal transition-colors">Leistungen</Link>
                <ChevronRight size={12} />
                <span className="text-charcoal/80">{service.title}</span>
              </nav>
              <Link
                href="/leistungen"
                className="inline-flex items-center gap-2 text-charcoal/50 hover:text-charcoal text-sm mb-6 transition-colors"
              >
                <ArrowLeft size={16} /> Alle Leistungen
              </Link>
              <div className="text-xs tracking-[0.2em] uppercase text-gold-accent mb-3">
                {categoryLabels[service.category] ?? service.category}
              </div>
              <h1 className="font-display text-5xl md:text-7xl text-charcoal leading-tight mb-6">{service.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-charcoal/60 text-sm">
                {service.priceFrom && (
                  <span className="flex items-center gap-2">
                    <Euro size={16} className="text-rose" />
                    ab {service.priceFrom} €
                  </span>
                )}
                {service.duration && (
                  <span className="flex items-center gap-2">
                    <Clock size={16} className="text-rose" />
                    {service.duration} Minuten
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid lg:grid-cols-[1fr_360px] gap-16 items-start">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {service.description && (
            <div className="prose prose-lg max-w-none text-charcoal/80 prose-headings:font-display prose-headings:text-charcoal prose-strong:text-charcoal">
              <PortableText value={service.description} />
            </div>
          )}

          {service.gallery && service.gallery.length > 0 && (
            <div>
              <h2 className="font-display text-3xl text-charcoal mb-8">Galerie</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {service.gallery.filter((img: any) => img?.asset?._ref).map((img: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="aspect-square rounded-2xl overflow-hidden bg-nude/20"
                  >
                    <Image
                      src={urlFor(img).width(400).height(400).url()}
                      alt={`${service.title} – Bild ${i + 1}`}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Right: Booking sidebar (desktop) */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:block"
        >
          <div className="rounded-3xl bg-white border border-nude/60 p-8 sticky top-28">
            <h3 className="font-display text-2xl text-charcoal mb-2">Jetzt buchen</h3>
            <p className="text-sm text-charcoal/60 mb-6">Wähle direkt deinen Wunschtermin.</p>

            {service.priceFrom && (
              <div className="flex items-center justify-between py-3 border-b border-nude/50">
                <span className="text-sm text-charcoal/60">Preis ab</span>
                <span className="font-medium text-charcoal">{service.priceFrom} €</span>
              </div>
            )}
            {service.duration && (
              <div className="flex items-center justify-between py-3 border-b border-nude/50 mb-6">
                <span className="text-sm text-charcoal/60">Dauer</span>
                <span className="font-medium text-charcoal">{service.duration} Min.</span>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3">
              <Button asChild className="w-full bg-rose hover:bg-mauve text-cream rounded-full h-12 text-base">
                <Link href={bookingHref}>Termin buchen</Link>
              </Button>
              <a
                href="https://wa.me/4915252609602"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-12 rounded-full border border-charcoal/20 text-charcoal/70 hover:border-rose hover:text-rose transition-colors text-sm"
              >
                Fragen per WhatsApp
              </a>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-sm border-t border-nude/40 px-6 py-4 flex gap-3">
        <a
          href="https://wa.me/4915252609602"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center h-12 rounded-full border border-charcoal/20 text-charcoal/70 hover:border-rose hover:text-rose transition-colors text-sm"
        >
          WhatsApp
        </a>
        <Button asChild className="flex-1 bg-rose hover:bg-mauve text-cream rounded-full h-12 text-base">
          <Link href={bookingHref}>Termin buchen</Link>
        </Button>
      </div>
    </article>
  )
}
