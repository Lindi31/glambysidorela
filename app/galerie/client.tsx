"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { TreatmentLine } from "@/components/home/TreatmentLine"
import { PageIntro, pageShell } from "@/components/ownui/PageIntro"
import { Pill } from "@/components/ownui/Pill"
import type { PageTexts } from "@/lib/texts"
import { urlFor } from "@/sanity/lib/image"

const PAGE_SIZE = 12

const SHORT_LABELS: Record<string, string> = {
  lashes: "Lashes",
  brows: "Brows",
  pmu: "PMU",
  makeup: "Make-up",
  facial: "Gesicht",
}

const TONES: Record<string, { bg: string; line: string }> = {
  lashes: { bg: "bg-charcoal", line: "#C9A96E" },
  brows: { bg: "bg-nude/70", line: "#7A5F18" },
  pmu: { bg: "bg-white", line: "#8F4F57" },
  makeup: { bg: "bg-rose/45", line: "#2C2826" },
  facial: { bg: "bg-[#EFE8DF]", line: "#7A5F18" },
}

type SanityImage = Parameters<typeof urlFor>[0] & { asset?: { _ref?: string } }

export type GalleryItem = {
  _id: string
  title?: string | null
  category?: string | null
  before?: SanityImage | null
  after?: SanityImage | null
}

type Category = { id: string; label: string }

const hasPair = (item: GalleryItem) => Boolean(item.before?.asset?._ref && item.after?.asset?._ref)
const hasAfter = (item: GalleryItem) => Boolean(item.after?.asset?._ref)
const photo = (image: SanityImage, width: number) => urlFor(image).width(width).height(Math.round(width * 1.25)).fit("crop").url()

function Compare({ item }: { item: GalleryItem }) {
  const [split, setSplit] = useState(50)
  const title = item.title ?? "Ergebnis"

  return (
    <div className="relative aspect-[4/5] w-full select-none overflow-hidden rounded-[24px] bg-charcoal">
      <Image src={photo(item.after!, 1000)} alt={`${title}, nachher`} fill sizes="(max-width: 640px) 92vw, 600px" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
        <Image src={photo(item.before!, 1000)} alt={`${title}, vorher`} fill sizes="(max-width: 640px) 92vw, 600px" className="object-cover" />
      </div>
      <span className="absolute left-3 top-3 rounded-full bg-cream/85 px-3 py-1 text-[12px] font-medium text-charcoal backdrop-blur">Vorher</span>
      <span className="absolute right-3 top-3 rounded-full bg-cream/85 px-3 py-1 text-[12px] font-medium text-charcoal backdrop-blur">Nachher</span>
      <input
        type="range"
        min={0}
        max={100}
        value={split}
        onChange={(event) => setSplit(Number(event.target.value))}
        aria-label="Vorher und Nachher vergleichen"
        className="peer absolute inset-0 z-10 m-0 h-full w-full cursor-ew-resize opacity-0"
      />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-cream" style={{ left: `${split}%` }} />
      <div aria-hidden className="pointer-events-none absolute top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-charcoal shadow-lg peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold" style={{ left: `${split}%` }}>
        <ChevronLeft size={15} strokeWidth={1.75} className="-mr-0.5" />
        <ChevronRight size={15} strokeWidth={1.75} className="-ml-0.5" />
      </div>
    </div>
  )
}

function Lightbox({ items, index, onClose }: { items: GalleryItem[]; index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index)
  const dialog = useRef<HTMLDialogElement>(null)
  const item = items[current]
  const move = (step: number) => setCurrent((value) => (value + step + items.length) % items.length)

  useEffect(() => {
    const element = dialog.current
    if (element && !element.open) element.showModal()
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const roundButton = "flex size-11 items-center justify-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-cream/25"

  return (
    <dialog
      ref={dialog}
      aria-label={item.title ?? "Bild"}
      onClose={onClose}
      onClick={(event) => { if (event.target === dialog.current) onClose() }}
      onKeyDown={(event) => {
        if ((event.target as HTMLElement).tagName === "INPUT") return
        if (event.key === "ArrowLeft") move(-1)
        if (event.key === "ArrowRight") move(1)
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-charcoal/95 p-4 text-cream backdrop-blur-xl backdrop:bg-transparent"
    >
      <div className="mx-auto flex h-full w-full max-w-[560px] flex-col gap-3">
        <div className="flex items-center justify-between text-[14px] text-cream/75">
          <span>{current + 1} von {items.length}</span>
          <button type="button" onClick={onClose} aria-label="Schließen" className={roundButton}><X size={20} strokeWidth={1.5} aria-hidden /></button>
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <div key={item._id} className="step-in max-h-full w-full max-w-[min(100%,calc((100dvh-11rem)*0.8))]">
            {hasPair(item) ? (
              <Compare item={item} />
            ) : (
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px]">
                <Image src={photo(item.after!, 1000)} alt={item.title ?? "Ergebnis"} fill sizes="(max-width: 640px) 92vw, 600px" className="object-cover" />
              </div>
            )}
          </div>
        </div>
        <div className="flex min-h-11 items-center justify-between gap-3">
          <p className="min-w-0 truncate font-display text-[24px] leading-none">{item.title}</p>
          {items.length > 1 && (
            <div className="flex flex-none gap-2">
              <button type="button" onClick={() => move(-1)} aria-label="Vorheriges Bild" className={roundButton}><ChevronLeft size={22} strokeWidth={1.5} aria-hidden /></button>
              <button type="button" onClick={() => move(1)} aria-label="Nächstes Bild" className={roundButton}><ChevronRight size={22} strokeWidth={1.5} aria-hidden /></button>
            </div>
          )}
        </div>
      </div>
    </dialog>
  )
}

export function GalerieGrid({ items, t, instagram, categories }: { items: GalleryItem[]; t: PageTexts["galerie"]; instagram: string; categories: Category[] }) {
  const [active, setActive] = useState("all")
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const withPhotos = items.filter(hasAfter)
  const usedCategories = categories.filter((category) => withPhotos.some((item) => item.category === category.id))
  const filtered = active === "all" ? withPhotos : withPhotos.filter((item) => item.category === active)
  const shown = filtered.slice(0, visible)
  const filters = [{ id: "all", label: "Alle" }, ...usedCategories.map((category) => ({ id: category.id, label: SHORT_LABELS[category.id] ?? category.label }))]

  return (
    <div className="bg-cream pb-24 md:pb-32">
      <PageIntro title={t.title} lead={t.lead} />

      <div className={pageShell}>
        {withPhotos.length === 0 ? (
          <>
            <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
              <p className="max-w-[18em] text-balance font-display text-[clamp(30px,4vw,44px)] leading-[1.05] tracking-[-0.018em] text-charcoal">{t.empty}</p>
              <Pill href={instagram} className="flex-none">Auf Instagram ansehen</Pill>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
              {categories.map((category) => {
                const tone = TONES[category.id] ?? TONES.pmu
                const dark = category.id === "lashes"
                return (
                  <li key={category.id}>
                    <Link href={`/leistungen#${category.id}`} className={`group flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[24px] p-5 transition-transform duration-700 ease-out hover:scale-[1.012] ${tone.bg} ${dark ? "text-cream" : "text-charcoal"}`}>
                      <span className="text-[15px] font-medium">{SHORT_LABELS[category.id] ?? category.label}</span>
                      <TreatmentLine id={category.id} color={tone.line} className="w-full transition-transform duration-700 ease-out group-hover:scale-105" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </>
        ) : (
          <>
            {filters.length > 2 && (
              <div role="group" aria-label="Nach Behandlung filtern" className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    aria-pressed={active === filter.id}
                    onClick={() => { setActive(filter.id); setVisible(PAGE_SIZE) }}
                    className={`min-h-11 flex-none rounded-full px-5 text-[14px] font-medium transition-colors duration-300 ${active === filter.id ? "bg-charcoal text-cream" : "bg-white text-charcoal"}`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            )}

            <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
              {shown.map((item, index) => (
                <li key={item._id}>
                  <button type="button" onClick={() => setLightboxIndex(index)} aria-label={`${item.title ?? "Bild"} ansehen`} className="group block w-full text-left">
                    <span className="relative block aspect-[4/5] overflow-hidden rounded-[20px] bg-nude/30 md:rounded-[24px]">
                      <Image src={photo(item.after!, 800)} alt={item.title ?? "Ergebnis"} fill sizes="(max-width: 1024px) 46vw, 370px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                      {hasPair(item) && (
                        <>
                          <Image src={photo(item.before!, 800)} alt="" fill sizes="(max-width: 1024px) 46vw, 370px" className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                          <span className="absolute left-2.5 top-2.5 rounded-full bg-cream/85 px-2.5 py-1 text-[11px] font-medium text-charcoal backdrop-blur md:left-3 md:top-3 md:text-[12px]">Vorher und Nachher</span>
                        </>
                      )}
                    </span>
                    {item.title && <span className="mt-2.5 block font-display text-[22px] leading-[1.1] tracking-[-0.01em] text-charcoal md:text-[26px]">{item.title}</span>}
                  </button>
                </li>
              ))}
            </ul>

            {visible < filtered.length && (
              <div className="mt-10 text-center">
                <button type="button" onClick={() => setVisible((value) => value + PAGE_SIZE)} className="min-h-12 rounded-full border border-charcoal/25 px-7 text-[15px] font-medium text-charcoal">
                  Weitere {filtered.length - visible} Bilder laden
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {lightboxIndex !== null && <Lightbox items={shown} index={lightboxIndex} onClose={() => setLightboxIndex(null)} />}
    </div>
  )
}
