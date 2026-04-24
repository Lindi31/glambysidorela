"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Eye, Sparkles, Palette, Brush, Droplet, ArrowUpRight } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"

const categoryIcons: Record<string, React.ElementType> = {
  lashes: Eye,
  brows: Sparkles,
  pmu: Palette,
  makeup: Brush,
  facial: Droplet,
}

const categoryLabels: Record<string, string> = {
  lashes: "Lashes",
  brows: "Brows",
  pmu: "Permanent Make-up",
  makeup: "Make-up",
  facial: "Gesichtsbehandlungen",
}

export function LeistungenGrid({ services }: { services: any[] }) {
  return (
    <section className="relative min-h-screen pt-32 pb-24 bg-cream overflow-hidden">
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,165,165,0.4) 0%, rgba(232,213,196,0.1) 70%)" }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,169,110,0.3) 0%, rgba(250,247,242,0) 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4">— Leistungen</div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal leading-tight">
            Alles für deinen <span className="italic text-rose">Glow.</span>
          </h1>
          <p className="mt-6 text-lg text-charcoal/70 leading-relaxed">
            Von klassischer Wimpernverlängerung bis zum professionellen Permanent Make-up – jede Behandlung wird
            individuell auf dich abgestimmt.
          </p>
        </motion.div>

        {services.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-charcoal/40 text-lg">Noch keine Leistungen eingetragen.</p>
            <p className="text-charcoal/30 text-sm mt-2">Füge Leistungen im Sanity Studio hinzu.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = categoryIcons[service.category] ?? Sparkles
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <Link
                    href={`/leistungen/${service.slug}`}
                    className="group relative flex flex-col h-full rounded-3xl bg-white border border-nude/60 hover:border-rose/60 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {service.image && (
                      <div className="w-full aspect-[3/2] overflow-hidden bg-nude/20 shrink-0">
                        <Image
                          src={urlFor(service.image).width(600).height(400).url()}
                          alt={service.title}
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

                      {!service.image && (
                        <div className="w-14 h-14 rounded-2xl bg-nude/40 flex items-center justify-center mb-6 group-hover:bg-rose transition-colors duration-300">
                          <Icon size={24} className="text-rose group-hover:text-cream transition-colors" />
                        </div>
                      )}

                      <div className="text-xs tracking-wider uppercase text-gold mb-2">
                        {categoryLabels[service.category] ?? service.category}
                      </div>
                      <h2 className="font-display text-2xl text-charcoal mb-3">{service.title}</h2>
                      <p className="text-sm text-charcoal/70 leading-relaxed flex-1 mb-6">
                        {service.shortDescription}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-nude/50">
                        <div className="flex items-center gap-4 text-sm text-charcoal/60">
                          {service.priceFrom && (
                            <span>
                              ab <span className="text-charcoal font-medium">{service.priceFrom} €</span>
                            </span>
                          )}
                          {service.duration && <span>{service.duration} Min.</span>}
                        </div>
                        <div className="w-9 h-9 rounded-full bg-nude/30 flex items-center justify-center group-hover:bg-rose group-hover:rotate-45 transition-all duration-300">
                          <ArrowUpRight size={16} className="text-rose group-hover:text-cream transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
