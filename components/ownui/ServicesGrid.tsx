"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Sparkles, Palette, Brush, Droplet, GraduationCap, ArrowUpRight } from "lucide-react";
import { services, type ServiceCategory } from "./services";

const iconMap = {
  lashes: Eye,
  brows: Sparkles,
  pmu: Palette,
  makeup: Brush,
  facial: Droplet,
} as const;

function ServiceCard({ service, index }: { service: ServiceCategory; index: number }) {
  const Icon = service.slug === "schulungen" ? GraduationCap : iconMap[service.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={`/leistungen/${service.slug}`}
        className="group relative block h-full p-8 rounded-3xl bg-cream border border-nude/60 hover:border-rose/60 hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(212,165,165,0.3), transparent)",
          }}
        />

        <div className="relative flex flex-col h-full">
          <div className="w-14 h-14 rounded-2xl bg-nude/40 flex items-center justify-center mb-6 group-hover:bg-rose group-hover:text-cream transition-colors duration-300">
            <Icon size={24} className="text-rose group-hover:text-cream transition-colors" />
          </div>

          <h3 className="font-display text-2xl text-charcoal mb-3">{service.title}</h3>
          <p className="text-sm text-charcoal/70 leading-relaxed mb-6 flex-1">
            {service.shortDescription}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-nude/50">
            {service.priceFrom ? (
              <span className="text-sm text-charcoal/60">
                ab <span className="text-charcoal font-medium">{service.priceFrom} €</span>
              </span>
            ) : (
              <span />
            )}
            <div className="w-9 h-9 rounded-full bg-nude/30 flex items-center justify-center group-hover:bg-rose group-hover:rotate-45 transition-all duration-300">
              <ArrowUpRight size={16} className="text-rose group-hover:text-cream transition-colors" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ServicesGrid() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-cream to-nude/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4">
            — Leistungen
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight">
            Alles für deinen <span className="italic text-rose">Glow.</span>
          </h2>
          <p className="mt-6 text-lg text-charcoal/70 leading-relaxed">
            Von klassischer Wimpernverlängerung bis zum professionellen Permanent
            Make-up – jede Behandlung wird individuell auf dich abgestimmt.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
