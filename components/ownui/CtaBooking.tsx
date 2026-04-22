"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle } from "lucide-react";

export function CtaBooking() {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[48px] bg-gradient-to-br from-rose via-mauve to-charcoal px-8 py-20 lg:p-24 text-center"
        >
          {/* Decorative elements */}
          <div
            className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-gold/20 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-nude/20 blur-3xl"
            aria-hidden
          />

          <div className="relative max-w-2xl mx-auto">
            <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4">
              — Bereit für deinen Glow?
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-tight mb-6">
              Buch dir deinen <span className="italic">Wohlfühl-Moment.</span>
            </h2>

            <p className="text-cream/80 text-lg leading-relaxed mb-10">
              Ob eine schnelle Beratung oder direkt ein Termin – ich freue mich
              auf dich. Wähle einen Slot online oder schreib mir per WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-cream hover:bg-nude text-charcoal rounded-full px-8 h-12 text-base"
              >
                <Link href="/termin">
                  <Calendar className="mr-2" size={18} />
                  Termin online buchen
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-12 text-base bg-transparent border-cream/40 text-cream hover:bg-cream/10 hover:border-cream"
              >
                <a
                  href="https://wa.me/4917700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2" size={18} />
                  WhatsApp schreiben
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
