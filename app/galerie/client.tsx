"use client"

import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { urlFor } from "@/sanity/lib/image"

const categories = [
  { value: "all", label: "Alle" },
  { value: "lashes", label: "Lashes" },
  { value: "brows", label: "Brows" },
  { value: "pmu", label: "PMU" },
  { value: "makeup", label: "Make-up" },
  { value: "facial", label: "Gesicht" },
]

const PAGE_SIZE = 12

export function GalerieGrid({ items }: { items: any[] }) {
  const [active, setActive] = useState("all")
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = active === "all" ? items : items.filter((item) => item.category === active)
  const shown = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  return (
    <section className="relative min-h-screen pt-32 pb-24 bg-cream overflow-hidden">
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,165,165,0.4) 0%, rgba(232,213,196,0.1) 70%)" }}
      />
      <div
        className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,169,110,0.3) 0%, rgba(250,247,242,0) 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-12"
        >
          <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4">— Galerie</div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal leading-tight">
            Schönheit in <span className="italic text-rose">Bildern.</span>
          </h1>
          <p className="mt-6 text-lg text-charcoal/70 leading-relaxed">
            Echte Ergebnisse, echte Kundinnen. Jedes Bild zeigt das Handwerk und die Liebe zum Detail.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => { setActive(cat.value); setVisible(PAGE_SIZE) }}
              className={`px-5 py-2 rounded-full text-sm transition-all duration-200 ${
                active === cat.value
                  ? "bg-rose text-cream shadow-md"
                  : "bg-white border border-nude/60 text-charcoal/70 hover:border-rose/60 hover:text-charcoal"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-charcoal/40 text-lg">Noch keine Bilder vorhanden.</p>
            <p className="text-charcoal/30 text-sm mt-2">Füge Galeriebilder im Sanity Studio hinzu.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {shown.map((item, i) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="rounded-3xl bg-white border border-nude/60 overflow-hidden"
                >
                  {item.before && item.after ? (
                    <div className="grid grid-cols-2 gap-0">
                      <div className="relative aspect-square bg-nude/20">
                        <Image
                          src={urlFor(item.before).width(400).height(400).url()}
                          alt={`${item.title} – Vorher`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-2 left-2 text-[10px] tracking-widest uppercase bg-charcoal/60 text-cream px-2 py-0.5 rounded-full">
                          Vorher
                        </div>
                      </div>
                      <div className="relative aspect-square bg-nude/20">
                        <Image
                          src={urlFor(item.after).width(400).height(400).url()}
                          alt={`${item.title} – Nachher`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-2 right-2 text-[10px] tracking-widest uppercase bg-rose/80 text-cream px-2 py-0.5 rounded-full">
                          Nachher
                        </div>
                      </div>
                    </div>
                  ) : item.after ? (
                    <div className="relative aspect-[4/3] bg-nude/20">
                      <Image
                        src={urlFor(item.after).width(600).height(450).url()}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : null}

                  {item.title && (
                    <div className="px-6 py-4">
                      <p className="text-sm font-medium text-charcoal">{item.title}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="px-8 py-3 rounded-full border border-charcoal/20 text-charcoal/70 hover:border-rose hover:text-rose transition-colors text-sm"
            >
              Mehr laden ({filtered.length - visible} weitere)
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
