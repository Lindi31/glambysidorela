"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, MapPin, ChevronDown } from "lucide-react";

type Props = {
  clientCount?: number | null;
};

export function Hero({ clientCount }: Props) {
  const count = clientCount ? `${clientCount}+` : "500+";

  return (
    <section className="relative min-h-[100svh] pt-20 overflow-hidden bg-cream">
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-60 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,165,165,0.4) 0%, rgba(232,213,196,0.1) 70%)" }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-50 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,169,110,0.3) 0%, rgba(250,247,242,0) 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-16 lg:pt-24 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nude/40 border border-nude text-xs tracking-wider uppercase text-mauve"
          >
            <Sparkles size={14} className="text-gold" />
            Beauty-Artistry & Schulungen
          </motion.div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-charcoal">
            Deine Schönheit,
            <br />
            <span className="italic text-rose">perfekt inszeniert</span>.
          </h1>

          <p className="text-lg md:text-xl text-charcoal/70 leading-relaxed max-w-xl">
            Hi, ich bin Sidorela. Als zertifizierte Lash- und Make-up-Artist
            verzaubere ich seit Jahren Frauen in Bruchsal, Jülich und Umgebung
            mit maßgeschneiderten Beauty-Treatments und gebe mein Wissen in
            professionellen Schulungen weiter.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button asChild size="lg" className="bg-rose hover:bg-mauve text-cream rounded-full px-8 h-12 text-base">
              <Link href="/termin">Jetzt Termin buchen</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-12 text-base border-charcoal/20 text-charcoal hover:bg-nude/30 hover:border-rose hover:text-rose"
            >
              <Link href="/leistungen">Leistungen entdecken</Link>
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-4 text-sm text-charcoal/60">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-rose" />
              Bruchsal
            </div>
            <div className="w-px h-4 bg-charcoal/20" />
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-rose" />
              Jülich
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative aspect-[4/5] max-w-md mx-auto w-full"
        >
          <div className="absolute inset-0 rounded-[40px] overflow-hidden shadow-2xl bg-nude/20">
            <Image
              src="/hero.png"
              alt="Sidorela Isa – Lash & Make-up Artist in Bruchsal und Jülich"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 500px"
              className="object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute -bottom-6 -left-6 bg-cream rounded-2xl p-4 shadow-xl border border-nude/40 max-w-[180px]"
          >
            <div className="flex items-center gap-1 text-gold mb-2">
              {[...Array(5)].map((_, i) => <span key={i} className="text-sm">★</span>)}
            </div>
            <div className="text-xs text-charcoal/70 italic">„Einfach traumhaft, komme immer wieder!"</div>
            <div className="text-xs text-charcoal/50 mt-1">— Elena M.</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute -top-4 -right-4 bg-rose text-cream rounded-2xl px-5 py-3 shadow-xl"
          >
            <div className="font-display text-2xl">{count}</div>
            <div className="text-xs opacity-90">zufriedene Kundinnen</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-charcoal/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        aria-hidden
      >
        <span className="text-xs tracking-widest uppercase">Entdecken</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
