"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
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

type GalleryItem = {
  _id: string
  title?: string | null
  category?: string | null
  before?: any
  after?: any
}

function Lightbox({
  items,
  index,
  onClose,
}: {
  items: GalleryItem[]
  index: number
  onClose: () => void
}) {
  const [current, setCurrent] = useState(index)
  const item = items[current]

  const prev = useCallback(() => setCurrent((i) => (i - 1 + items.length) % items.length), [items.length])
  const next = useCallback(() => setCurrent((i) => (i + 1) % items.length), [items.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    document.addEventListener("keydown", handler)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handler)
      document.body.style.overflow = ""
    }
  }, [onClose, prev, next])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center text-cream transition-colors"
          aria-label="Schließen"
        >
          <X size={20} />
        </button>

        {/* Counter */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 text-cream/60 text-sm">
          {current + 1} / {items.length}
        </div>

        {/* Prev */}
        {items.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center text-cream transition-colors"
            aria-label="Vorheriges Bild"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Content */}
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="max-w-4xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {item.before && item.after ? (
            <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={urlFor(item.before).width(800).height(800).url()}
                  alt={`${item.title ?? ""} – Vorher`}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 text-[10px] tracking-widest uppercase bg-charcoal/60 text-cream px-2 py-0.5 rounded-full">
                  Vorher
                </div>
              </div>
              <div className="relative aspect-square">
                <Image
                  src={urlFor(item.after).width(800).height(800).url()}
                  alt={`${item.title ?? ""} – Nachher`}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 right-3 text-[10px] tracking-widest uppercase bg-rose/80 text-cream px-2 py-0.5 rounded-full">
                  Nachher
                </div>
              </div>
            </div>
          ) : item.after ? (
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={urlFor(item.after).width(1200).height(900).url()}
                alt={item.title ?? ""}
                fill
                className="object-contain"
              />
            </div>
          ) : null}

          {item.title && (
            <p className="text-center text-cream/70 text-sm mt-4">{item.title}</p>
          )}
        </motion.div>

        {/* Next */}
        {items.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center text-cream transition-colors"
            aria-label="Nächstes Bild"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export function GalerieGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState("all")
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = active === "all" ? items : items.filter((item) => item.category === active)
  const shown = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  return (
    <section className="min-h-screen pt-32 pb-24 bg-cream">

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-12"
        >
          <div className="text-xs tracking-[0.2em] uppercase text-gold-accent mb-4">— Galerie</div>
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
            <p className="text-charcoal/40 text-lg">Noch keine Bilder in dieser Kategorie.</p>
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
                  className="rounded-2xl bg-white border border-nude/60 shadow-sm overflow-hidden cursor-pointer group hover:border-rose/40 hover:shadow-lg transition-all duration-300"
                  onClick={() => setLightboxIndex(filtered.indexOf(item))}
                >
                  {item.before && item.after ? (
                    <div className="grid grid-cols-2 gap-0">
                      <div className="relative aspect-square bg-nude/20">
                        <Image
                          src={urlFor(item.before).width(400).height(400).url()}
                          alt={`${item.title ?? ""} – Vorher`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-2 left-2 text-[10px] tracking-widest uppercase bg-charcoal/60 text-cream px-2 py-0.5 rounded-full">
                          Vorher
                        </div>
                      </div>
                      <div className="relative aspect-square bg-nude/20">
                        <Image
                          src={urlFor(item.after).width(400).height(400).url()}
                          alt={`${item.title ?? ""} – Nachher`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                        alt={item.title ?? ""}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
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

      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}
