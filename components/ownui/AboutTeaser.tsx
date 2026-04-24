"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

const highlights = [
  "Zertifizierte Lash- & PMU-Artist",
  "Mehrjährige Erfahrung in hochwertiger Kosmetik",
  "Individuelle Beratung für jede Kundin",
  "Eigene Schulungen mit Starter-Equipment",
];

type Props = { heroImage?: any };

export function AboutTeaser({ heroImage }: Props) {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl bg-gradient-to-tl from-mauve via-rose/40 to-nude">
            {heroImage ? (
              <Image
                src={urlFor(heroImage).width(700).height(875).url()}
                alt="Sidorela Isa – Beauty-Artistin"
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-cream/60 font-display text-xl italic px-8">
                  Portrait von Sidorela
                  <br />
                  (bei der Arbeit)
                </div>
              </div>
            )}
          </div>
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-gold/30 -z-10" aria-hidden />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full border-2 border-rose/40" aria-hidden />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-xs tracking-[0.2em] uppercase text-gold-accent mb-4">— Über mich</div>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal leading-tight mb-6">
            Schönheit ist für mich <span className="italic text-rose">Handwerk</span>,
            Detail und Leidenschaft.
          </h2>
          <div className="space-y-4 text-charcoal/70 text-lg leading-relaxed">
            <p>
              Mein Name ist Sidorela Isa. Seit mehreren Jahren begleite ich
              Kundinnen auf ihrem Weg zum perfekten Look – ob als zarte
              Wimpernverlängerung für den Alltag, präzises Microblading oder
              strahlendes Braut-Make-up.
            </p>
            <p>
              Was mich antreibt: das Gefühl, wenn eine Kundin den Spiegel sieht
              und lächelt. Genau dieses Handwerk gebe ich in meinen Schulungen weiter.
            </p>
          </div>
          <ul className="mt-8 grid sm:grid-cols-2 gap-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-charcoal/80">
                <CheckCircle2 size={18} className="text-rose shrink-0 mt-0.5" />
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-12 text-base border-charcoal/20 text-charcoal hover:bg-nude/30 hover:border-rose hover:text-rose"
            >
              <Link href="/ueber-mich">Mehr über mich</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
