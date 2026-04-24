"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight, Calendar, Clock } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"

const levelColors: Record<string, string> = {
  Einsteiger: "bg-nude/60 text-mauve",
  Fortgeschritten: "bg-rose/20 text-rose",
  Masterclass: "bg-gold/20 text-gold",
}

export function SchulungenGrid({ trainings }: { trainings: any[] }) {
  return (
    <section className="relative min-h-screen pt-32 pb-24 bg-cream overflow-hidden">
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,165,165,0.4) 0%, rgba(232,213,196,0.1) 70%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,169,110,0.3) 0%, rgba(250,247,242,0) 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4">— Schulungen</div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal leading-tight">
            Lern von der <span className="italic text-rose">Expertin.</span>
          </h1>
          <p className="mt-6 text-lg text-charcoal/70 leading-relaxed">
            Professionelle Aus- und Weiterbildung in Lashes, Brows und Permanent Make-up – für Einsteiger und
            Fortgeschrittene.
          </p>
        </motion.div>

        {trainings.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-charcoal/40 text-lg">Noch keine Schulungen eingetragen.</p>
            <p className="text-charcoal/30 text-sm mt-2">Füge Schulungen im Sanity Studio hinzu.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {trainings.map((training, i) => (
              <motion.div
                key={training._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={`/schulungen/${training.slug}`}
                  className="group relative flex flex-col h-full rounded-3xl bg-white border border-nude/60 hover:border-rose/60 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {training.image && (
                    <div className="w-full aspect-[3/2] overflow-hidden bg-nude/20 shrink-0">
                      <Image
                        src={urlFor(training.image).width(600).height(400).url()}
                        alt={training.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="flex flex-col flex-1 p-8">
                    <div
                      className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none"
                      style={{ background: "radial-gradient(circle, rgba(212,165,165,0.3), transparent)" }}
                    />

                    {training.level && (
                      <span
                        className={`self-start text-xs tracking-wider uppercase px-3 py-1 rounded-full mb-4 ${levelColors[training.level] ?? "bg-nude/40 text-mauve"}`}
                      >
                        {training.level}
                      </span>
                    )}

                    <h2 className="font-display text-2xl text-charcoal mb-3">{training.title}</h2>

                    <div className="flex flex-wrap gap-4 text-sm text-charcoal/60 mb-6">
                      {training.durationDays && (
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="text-rose" />
                          {training.durationDays} {training.durationDays === 1 ? "Tag" : "Tage"}
                        </span>
                      )}
                      {training.upcomingDates?.length > 0 && (
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-rose" />
                          {training.upcomingDates.length} Termine
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-nude/50 mt-auto">
                      {training.price ? (
                        <span className="text-sm text-charcoal/60">
                          ab <span className="text-charcoal font-medium">{training.price} €</span>
                        </span>
                      ) : (
                        <span />
                      )}
                      <div className="w-9 h-9 rounded-full bg-nude/30 flex items-center justify-center group-hover:bg-rose group-hover:rotate-45 transition-all duration-300">
                        <ArrowUpRight size={16} className="text-rose group-hover:text-cream transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
