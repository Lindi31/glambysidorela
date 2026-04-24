"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

type Testimonial = {
  _id: string;
  name: string | null;
  text: string | null;
  rating: number | null;
  serviceCategory: string | null;
};

export function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;

  return (
    <section className="py-24 lg:py-32 bg-nude/30 relative overflow-hidden">
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(212,165,165,0.35), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4">
            — Stimmen meiner Kundinnen
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal leading-tight">
            Echte Erlebnisse, <span className="italic text-rose">echte Liebe.</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-8 bg-cream rounded-3xl shadow-sm hover:shadow-lg transition-shadow border border-nude/50"
            >
              <Quote
                size={32}
                className="absolute top-6 right-6 text-rose/20"
                aria-hidden
              />

              {t.rating && (
                <div className="flex gap-1 mb-4 text-gold" aria-label={`${t.rating} von 5 Sternen`}>
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" aria-hidden />
                  ))}
                </div>
              )}

              <p className="text-charcoal/80 leading-relaxed mb-6 italic">
                „{t.text}"
              </p>

              <div className="pt-4 border-t border-nude/60">
                <div className="font-medium text-charcoal">{t.name}</div>
                {t.serviceCategory && (
                  <div className="text-xs text-charcoal/50">{t.serviceCategory}</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
