"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useSectionProgress } from "./useSectionProgress";
import { Pill } from "@/components/ownui/Pill";
import { BERATUNG_HREF } from "@/lib/offers";

const ALT = "Sidorela Isa, Lash- und Make-up-Artist, in ihrem Studio";
const ARCH = "[border-radius:50%_50%_0_0/40%_40%_0_0]";

function Copy() {
  return (
    <div className="mx-auto flex max-w-[900px] flex-col items-center px-5 text-center">
      <h1 className="text-[13px] font-medium tracking-[-0.005em] text-cream/75 md:text-[15px]">
        Lashes, Brows und Permanent Make-up in Bruchsal und Jülich
      </h1>
      <p className="mt-3 text-balance font-display text-[clamp(44px,7.4vw,92px)] font-normal leading-[0.98] tracking-[-0.022em] text-cream">
        Deine Schönheit, perfekt inszeniert.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Pill href="/termin" variant="light">Termin buchen</Pill>
        <Pill href={BERATUNG_HREF} variant="outlineLight">Kostenlose Beratung</Pill>
      </div>
    </div>
  );
}

function Portrait() {
  return (
    <>
      <div className={`absolute inset-0 overflow-hidden ${ARCH}`}>
        <Image src="/hero.png" alt={ALT} fill preload sizes="(max-width: 768px) 82vw, 620px" className="object-cover object-top" />
      </div>
      <svg aria-hidden viewBox="0 0 110 135" className="pointer-events-none absolute -left-[5%] -top-[4%] h-[108%] w-[110%] overflow-visible">
        <path
          className="ring-light"
          pathLength={1}
          d="M1.5 92 V55 A53.5 53.5 0 0 1 108.5 55 V92"
          fill="none"
          stroke="#FFF1D6"
          strokeWidth=".45"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}

export function HeroStage() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const scrollYProgress = useSectionProgress(ref, ["start start", "end end"]);

  const copyOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.3], [0, -48]);
  const photoY = useTransform(scrollYProgress, [0, 0.72], ["0%", "-30%"]);
  const photoScale = useTransform(scrollYProgress, [0, 0.72], [0.86, 1]);
  const darkness = useTransform(scrollYProgress, [0.38, 0.78], [1, 0]);

  if (reduce) {
    return (
      <section id="hero-stage" data-static="true" className="bg-charcoal pb-16 pt-28">
        <Copy />
        <div className="relative mx-auto mt-12 aspect-[4/5] w-[min(78vw,420px)]">
          <Portrait />
        </div>
      </section>
    );
  }

  return (
    <section id="hero-stage" ref={ref} className="relative h-[240svh] bg-cream">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div aria-hidden style={{ opacity: darkness }} className="absolute inset-0 bg-charcoal" />
        <motion.div
          style={{ y: photoY, scale: photoScale }}
          className="absolute bottom-[-10svh] left-1/2 z-10 aspect-[4/5] w-[min(92vw,66svh)] origin-bottom md:bottom-[-33svh] -translate-x-1/2 will-change-transform"
        >
          <Portrait />
        </motion.div>
        <motion.div style={{ opacity: copyOpacity, y: copyY }} className="absolute inset-x-0 top-[calc(3.5rem+4svh)] z-20">
          <Copy />
        </motion.div>
      </div>
    </section>
  );
}
