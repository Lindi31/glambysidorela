"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle2, Clock, Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PortableText } from "@portabletext/react"
import { urlFor } from "@/sanity/lib/image"

const levelColors: Record<string, string> = {
  Einsteiger: "bg-nude/60 text-mauve border-nude",
  Fortgeschritten: "bg-rose/20 text-rose border-rose/30",
  Masterclass: "bg-gold/20 text-gold border-gold/30",
}

export function TrainingDetail({ training }: { training: any }) {
  return (
    <article className="relative bg-cream overflow-hidden">
      {/* Hero */}
      <div className="relative pt-20 min-h-[55vh] flex items-end pb-16 overflow-hidden">
        {training.image ? (
          <>
            <div className="absolute inset-0">
              <Image
                src={urlFor(training.image).width(1400).height(800).url()}
                alt={training.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
            </div>
            <div className="relative mx-auto max-w-7xl px-6 lg:px-10 w-full">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <Link
                  href="/schulungen"
                  className="inline-flex items-center gap-2 text-cream/70 hover:text-cream text-sm mb-6 transition-colors"
                >
                  <ArrowLeft size={16} /> Alle Schulungen
                </Link>
                {training.level && (
                  <div className="inline-block text-xs tracking-wider uppercase px-3 py-1 rounded-full bg-rose/30 text-cream border border-rose/40 mb-4">
                    {training.level}
                  </div>
                )}
                <h1 className="font-display text-5xl md:text-7xl text-cream leading-tight mb-6">{training.title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-cream/80 text-sm">
                  {training.durationDays && (
                    <span className="flex items-center gap-2">
                      <Clock size={16} className="text-rose" />
                      {training.durationDays} {training.durationDays === 1 ? "Tag" : "Tage"}
                    </span>
                  )}
                  {training.price && (
                    <span className="flex items-center gap-2">
                      <span className="text-rose font-medium">{training.price} €</span>
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-7xl px-6 lg:px-10 w-full pt-32">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link
                href="/schulungen"
                className="inline-flex items-center gap-2 text-charcoal/50 hover:text-charcoal text-sm mb-6 transition-colors"
              >
                <ArrowLeft size={16} /> Alle Schulungen
              </Link>
              {training.level && (
                <div
                  className={`inline-block text-xs tracking-wider uppercase px-3 py-1 rounded-full border mb-4 ${levelColors[training.level] ?? "bg-nude/40 text-mauve border-nude"}`}
                >
                  {training.level}
                </div>
              )}
              <h1 className="font-display text-5xl md:text-7xl text-charcoal leading-tight mb-6">{training.title}</h1>
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
          {training.description && (
            <div className="prose prose-lg max-w-none text-charcoal/80 prose-headings:font-display prose-headings:text-charcoal prose-strong:text-charcoal">
              <PortableText value={training.description} />
            </div>
          )}

          {training.includes && training.includes.length > 0 && (
            <div>
              <h2 className="font-display text-3xl text-charcoal mb-6">Das ist dabei</h2>
              <ul className="space-y-3">
                {training.includes.map((item: string, i: number) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="flex items-start gap-3 text-charcoal/80"
                  >
                    <CheckCircle2 size={20} className="text-rose shrink-0 mt-0.5" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {training.upcomingDates && training.upcomingDates.length > 0 && (
            <div>
              <h2 className="font-display text-3xl text-charcoal mb-6">Nächste Termine</h2>
              <div className="space-y-4">
                {training.upcomingDates.map((date: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-nude/60"
                  >
                    <div className="flex flex-wrap gap-6 text-sm">
                      <span className="flex items-center gap-2 text-charcoal font-medium">
                        <Calendar size={16} className="text-rose" />
                        {new Date(date.date).toLocaleDateString("de-DE", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      {date.location && (
                        <span className="flex items-center gap-2 text-charcoal/60">
                          <MapPin size={16} className="text-rose" />
                          {date.location}
                        </span>
                      )}
                    </div>
                    {date.spotsLeft != null && (
                      <span
                        className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full ${date.spotsLeft <= 2 ? "bg-rose/20 text-rose" : "bg-nude/40 text-mauve"}`}
                      >
                        <Users size={12} />
                        {date.spotsLeft} {date.spotsLeft === 1 ? "Platz" : "Plätze"} frei
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Right: Info sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="rounded-3xl bg-white border border-nude/60 p-8 sticky top-28">
            <h3 className="font-display text-2xl text-charcoal mb-2">Anmelden</h3>
            <p className="text-sm text-charcoal/60 mb-6">Interesse? Melde dich direkt bei Sidorela.</p>

            {training.price && (
              <div className="flex items-center justify-between py-3 border-b border-nude/50">
                <span className="text-sm text-charcoal/60">Preis</span>
                <span className="font-medium text-charcoal">{training.price} €</span>
              </div>
            )}
            {training.durationDays && (
              <div className="flex items-center justify-between py-3 border-b border-nude/50 mb-6">
                <span className="text-sm text-charcoal/60">Dauer</span>
                <span className="font-medium text-charcoal">
                  {training.durationDays} {training.durationDays === 1 ? "Tag" : "Tage"}
                </span>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://wa.me/4915252609602"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-12 rounded-full bg-rose hover:bg-mauve text-cream transition-colors text-sm font-medium"
              >
                Per WhatsApp anfragen
              </a>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full h-12 border-charcoal/20 text-charcoal hover:border-rose hover:text-rose"
              >
                <a href={`mailto:kontakt@glambysidorela.de?subject=Schulung: ${training.title}`}>
                  Per E-Mail anfragen
                </a>
              </Button>
            </div>
          </div>
        </motion.aside>
      </div>
    </article>
  )
}
