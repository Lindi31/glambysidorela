"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Sparkles, Palette, Brush, Droplet, GraduationCap, ArrowUpRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

const iconMap: Record<string, React.ElementType> = {
  lashes: Eye,
  brows: Sparkles,
  pmu: Palette,
  makeup: Brush,
  facial: Droplet,
  schulungen: GraduationCap,
};

type SanityService = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription?: string | null;
  priceFrom?: number | null;
  image?: any;
};

function ServiceCard({ service, index }: { service: SanityService; index: number }) {
  const Icon = iconMap[service.category] ?? Sparkles;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={`/leistungen/${service.slug}`}
        className="group relative flex flex-col h-full rounded-3xl bg-cream border border-nude/60 hover:border-rose/60 hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        {service.image && (
          <div className="w-full aspect-[3/2] overflow-hidden bg-nude/20 shrink-0">
            <Image
              src={urlFor(service.image).width(600).height(400).url()}
              alt={service.title}
              width={600}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="flex flex-col flex-1 p-8">
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(212,165,165,0.3), transparent)" }}
          />
          {!service.image && (
            <div className="w-14 h-14 rounded-2xl bg-nude/40 flex items-center justify-center mb-6 group-hover:bg-rose transition-colors duration-300">
              <Icon size={24} className="text-rose group-hover:text-cream transition-colors" />
            </div>
          )}
          <h3 className="font-display text-2xl text-charcoal mb-3">{service.title}</h3>
          <p className="text-sm text-charcoal/70 leading-relaxed mb-6 flex-1">{service.shortDescription}</p>
          <div className="flex items-center justify-between pt-4 border-t border-nude/50">
            {service.priceFrom ? (
              <span className="text-sm text-charcoal/60">
                ab <span className="text-charcoal font-medium">{service.priceFrom} €</span>
              </span>
            ) : <span />}
            <div className="w-9 h-9 rounded-full bg-nude/30 flex items-center justify-center group-hover:bg-rose group-hover:rotate-45 transition-all duration-300">
              <ArrowUpRight size={16} className="text-rose group-hover:text-cream transition-colors" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ServicesGrid({ services }: { services: SanityService[] }) {
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
          <div className="text-xs tracking-[0.2em] uppercase text-gold-accent mb-4">— Leistungen</div>
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
            <ServiceCard key={service._id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
