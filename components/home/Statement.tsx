import type { CSSProperties } from "react";

// Die Wörter werden beim Scrollen nacheinander sichtbar, nativ in CSS (globals.css, "Statement").
export function Statement({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <section className="bg-cream px-5 py-28 md:py-44">
      <p className="statement-text mx-auto max-w-[980px] text-center font-display text-[clamp(34px,5.2vw,68px)] leading-[1.08] tracking-[-0.018em] text-charcoal">
        {words.map((word, index) => (
          <span key={index} style={{ "--from": index / words.length, "--to": (index + 1) / words.length } as CSSProperties}>
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
