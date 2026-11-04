"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { PageIntro, pageShell } from "@/components/ownui/PageIntro"
import { Pill } from "@/components/ownui/Pill"
import { SITE } from "@/lib/site"
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

type SanityImage = Parameters<typeof urlFor>[0] & { asset?: { _ref?: string } }

type GalleryItem = {
  _id: string
  title?: string | null
  category?: string | null
  before?: SanityImage | null
  after?: SanityImage | null
}

const hasPair = (item: GalleryItem) => Boolean(item.before?.asset?._ref && item.after?.asset?._ref)
const hasAfter = (item: GalleryItem) => Boolean(item.after?.asset?._ref)

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="absolute bottom-3 left-3 rounded-full bg-cream/85 px-3 py-1 text-[12px] font-medium text-charcoal backdrop-blur">{children}</span>
}

function Photos({ item, size, sizes }: { item: GalleryItem; size: number; sizes: string }) {
  if (hasPair(item)) {
    return (
      <div className="grid grid-cols-2 gap-px">
        {([["Vorher", item.before], ["Nachher", item.after]] as const).map(([label, image]) => (
          <div key={label} className="relative aspect-[4/5] bg-nude/30">
            <Image src={urlFor(image!).width(size).height(Math.round(size * 1.25)).url()} alt={`${item.title ?? "Ergebnis"}, ${label}`} fill sizes={sizes} className="object-cover" />
            <Tag>{label}</Tag>
          </div>
        ))}
      </div>
    )
  }
  if (hasAfter(item)) {
    return (
      <div className="relative aspect-[4/5] bg-nude/30">
        <Image src={urlFor(item.after!).width(size * 2).url()} alt={item.title ?? "Ergebnis"} fill sizes={sizes} className="object-cover" />
      </div>
    )
  }
  return null
}

function Lightbox({ items, index, onClose }: { items: GalleryItem[]; index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index)
  const closeRef = useRef<HTMLButtonElement>(null)
  const item = items[current]
  const prev = useCallback(() => setCurrent((i) => (i - 1 + items.length) % items.length), [items.length])
  const next = useCallback(() => setCurrent((i) => (i + 1) % items.length), [items.length])

  useEffect(() => {
    closeRef.current?.focus()
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

  const roundButton = "flex size-11 items-center justify-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-cream/25"

  return (
    <div role="dialog" aria-modal="true" aria-label={item.title ?? "Bild"} onClick={onClose} className="fixed inset-0 z-[60] flex flex-col bg-charcoal/95 p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between text-[14px] text-cream/75">
        <span>{current + 1} von {items.length}</span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Schließen" className={roundButton}><X size={20} strokeWidth={1.5} aria-hidden /></button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div onClick={(e) => e.stopPropagation()} className="max-h-full w-full max-w-[860px] overflow-auto rounded-[24px]">
          <Photos item={item} size={800} sizes="(max-width: 860px) 50vw, 430px" />
        </div>
      </div>
      {items.length > 1 && (
        <div className="flex justify-center gap-3 pt-3" onClick={(e) => e.stopPropagation()}>
          <button type="button" onClick={prev} aria-label="Vorheriges Bild" className={roundButton}><ChevronLeft size={22} strokeWidth={1.5} aria-hidden /></button>
          <button type="button" onClick={next} aria-label="Nächstes Bild" className={roundButton}><ChevronRight size={22} strokeWidth={1.5} aria-hidden /></button>
        </div>
      )}
    </div>
  )
}

export function GalerieGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState("all")
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const close = useCallback(() => setLightboxIndex(null), [])

  const withPhotos = items.filter(hasAfter)
  const filtered = active === "all" ? withPhotos : withPhotos.filter((item) => item.category === active)
  const shown = filtered.slice(0, visible)

  return (
    <div className="bg-cream pb-24 md:pb-32">
      <PageIntro title="Lashes, Brows und PMU in Bildern." lead="Echte Ergebnisse, echte Kundinnen." />

      <div className={pageShell}>
        {withPhotos.length === 0 ? (
          <div className="rounded-[28px] bg-white px-6 py-16 text-center">
            <p className="mx-auto max-w-[18em] text-balance font-display text-[clamp(30px,4vw,44px)] leading-[1.05] tracking-[-0.018em] text-charcoal">Die ersten Ergebnisse folgen bald.</p>
            <div className="mt-6"><Pill href={SITE.instagram}>Auf Instagram ansehen</Pill></div>
          </div>
        ) : (
          <>
            <div role="group" aria-label="Nach Behandlung filtern" className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden">
              {categories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  aria-pressed={active === category.value}
                  onClick={() => { setActive(category.value); setVisible(PAGE_SIZE) }}
                  className={`min-h-11 flex-none rounded-full px-5 text-[14px] font-medium transition-colors duration-300 ${active === category.value ? "bg-charcoal text-cream" : "bg-white text-charcoal"}`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <p className="py-16 text-center text-[17px] text-charcoal/75">In dieser Kategorie gibt es noch keine Bilder.</p>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((item, index) => (
                  <li key={item._id}>
                    <button type="button" onClick={() => setLightboxIndex(index)} aria-label={`${item.title ?? "Bild"} vergrößern`} className="block w-full overflow-hidden rounded-[24px] bg-white text-left transition-transform duration-700 ease-out hover:scale-[1.01]">
                      <Photos item={item} size={420} sizes="(max-width: 640px) 45vw, 190px" />
                      {item.title && <span className="block px-5 py-4 text-[15px] font-medium text-charcoal">{item.title}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {visible < filtered.length && (
              <div className="mt-10 text-center">
                <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className="min-h-12 rounded-full border border-charcoal/25 px-7 text-[15px] font-medium text-charcoal">
                  Weitere {filtered.length - visible} Bilder laden
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {lightboxIndex !== null && <Lightbox items={shown} index={lightboxIndex} onClose={close} />}
    </div>
  )
}
