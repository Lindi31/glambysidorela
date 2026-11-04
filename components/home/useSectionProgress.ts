"use client";

import { useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";
import type { RefObject } from "react";

type Offset = NonNullable<NonNullable<Parameters<typeof useScroll>[0]>["offset"]>;

// Eigener Wert statt scrollYProgress direkt: Framer beschleunigt Opacity sonst nativ
// über die ganze Seite und ignoriert dabei die Grenzen des Abschnitts.
export function useSectionProgress(ref: RefObject<HTMLElement | null>, offset: Offset) {
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const progress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => progress.set(value));
  return progress;
}
