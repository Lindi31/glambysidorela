"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { TREATMENTS, type TreatmentId } from "@/lib/offers";
import { cn } from "@/lib/utils";
import { TreatmentLine } from "./TreatmentLine";

const TONES: Record<TreatmentId, { card: string; ink: string; soft: string; line: string }> = {
  lashes: { card: "bg-charcoal", ink: "text-cream", soft: "text-cream/75", line: "#C9A96E" },
  brows: { card: "bg-nude/70", ink: "text-charcoal", soft: "text-charcoal/75", line: "#7A5F18" },
  pmu: { card: "bg-white", ink: "text-charcoal", soft: "text-charcoal/75", line: "#8F4F57" },
  makeup: { card: "bg-rose/45", ink: "text-charcoal", soft: "text-charcoal/80", line: "#2C2826" },
  facial: { card: "bg-[#EFE8DF]", ink: "text-charcoal", soft: "text-charcoal/75", line: "#7A5F18" },
};

export function TreatmentRail() {
  const rail = useRef<HTMLUListElement>(null);
  const move = (dir: number) => {
    const el = rail.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * Math.min(420, el.clientWidth * 0.8), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="overflow-hidden bg-cream pb-24 md:pb-36">
      <div className="mx-auto flex max-w-[1200px] items-end justify-between gap-6 px-5 lg:px-8">
        <h2 className="font-display text-[clamp(38px,5vw,64px)] leading-[1.02] tracking-[-0.02em] text-charcoal">
          Finde deinen Glow.
        </h2>
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => move(-1)} aria-label="Zurück" className="flex size-11 items-center justify-center rounded-full bg-charcoal/[0.07] text-charcoal transition-colors hover:bg-charcoal/[0.14]">
            <ChevronLeft size={20} strokeWidth={1.5} aria-hidden />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Weiter" className="flex size-11 items-center justify-center rounded-full bg-charcoal/[0.07] text-charcoal transition-colors hover:bg-charcoal/[0.14]">
            <ChevronRight size={20} strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      </div>

      <ul
        ref={rail}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 [scrollbar-width:none] lg:px-[max(2rem,calc((100vw-1200px)/2+2rem))] [&::-webkit-scrollbar]:hidden"
      >
        {TREATMENTS.map((treatment) => {
          const tone = TONES[treatment.id];
          return (
            <li key={treatment.id} className="w-[78vw] max-w-[360px] flex-none snap-start scroll-ml-5 lg:scroll-ml-[max(2rem,calc((100vw-1200px)/2+2rem))]">
              <Link
                href={`/leistungen#${treatment.id}`}
                className={cn(
                  "group relative flex aspect-[4/5.2] flex-col justify-between overflow-hidden rounded-[28px] p-7 transition-transform duration-700 ease-out hover:scale-[1.012]",
                  tone.card,
                  tone.ink,
                )}
              >
                <div>
                  <h3 className="font-display text-[34px] leading-none tracking-[-0.015em]">{treatment.title}</h3>
                  <p className={cn("mt-3 max-w-[26ch] text-[15px] leading-snug", tone.soft)}>{treatment.line}</p>
                </div>
                <TreatmentLine id={treatment.id} color={tone.line} className="mx-auto w-[74%] transition-transform duration-700 ease-out group-hover:scale-105" />
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-medium">ab {treatment.from} €</span>
                  <span aria-hidden className="flex size-9 items-center justify-center rounded-full bg-current/10">
                    <Plus size={18} strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
