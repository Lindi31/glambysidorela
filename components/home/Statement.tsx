"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { useSectionProgress } from "./useSectionProgress";

const TEXT = "Hi, ich bin Sidorela. Jede Behandlung beginnt bei mir mit dir: deinem Gesicht, deinem Alltag und dem, was dir guttut.";

function Word({ word, index, total, progress }: { word: string; index: number; total: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [index / total, (index + 1) / total], [0.18, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const scrollYProgress = useSectionProgress(ref, ["start 85%", "end 55%"]);
  const words = TEXT.split(" ");

  return (
    <section className="bg-cream px-5 py-28 md:py-44">
      <p
        ref={ref}
        className="mx-auto max-w-[980px] text-center font-display text-[clamp(34px,5.2vw,68px)] leading-[1.08] tracking-[-0.018em] text-charcoal"
      >
        {reduce
          ? TEXT
          : words.map((word, i) => <Word key={i} word={word} index={i} total={words.length} progress={scrollYProgress} />)}
      </p>
    </section>
  );
}
