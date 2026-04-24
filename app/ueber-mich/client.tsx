"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle2, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PortableText } from "@portabletext/react"
import { urlFor } from "@/sanity/lib/image"

export function UeberMichView({ about }: { about: any }) {
  const yearsExp = about?.yearsExperience ?? null

  return (
    <div className="relative bg-cream overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(212,165,165,0.4) 0%, rgba(232,213,196,0.1) 70%)" }}
        />
        <div
          className="absolute -bottom-20 -left-40 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(201,169,110,0.3) 0%, rgba(250,247,242,0) 70%)" }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4">— Über mich</div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal leading-tight">
                {about?.headline ? (
                  <>
                    {about.headline.split(",")[0]},
                    <br />
                    <span className="italic text-rose">{about.headline.split(",")[1]?.trim() ?? ""}</span>
                  </>
                ) : (
                  <>
                    Schönheit ist für mich
                    <br />
                    <span className="italic text-rose">Handwerk & Leidenschaft.</span>
                  </>
                )}
              </h1>
            </div>

            {yearsExp && (
              <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-nude/40 border border-nude">
                <span className="font-display text-4xl text-rose">{yearsExp}+</span>
                <span className="text-charcoal/70 text-sm leading-tight">
                  Jahre Erfahrung
                  <br />
                  in Beauty & Schulung
                </span>
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="bg-rose hover:bg-mauve text-cream rounded-full px-8 h-12 text-base">
                <Link href="/termin">Termin buchen</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-12 text-base border-charcoal/20 text-charcoal hover:border-rose hover:text-rose"
              >
                <Link href="/kontakt">Kontakt aufnehmen</Link>
              </Button>
            </div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative aspect-[4/5] max-w-md mx-auto w-full"
          >
            <div className="absolute inset-0 rounded-[40px] overflow-hidden shadow-2xl bg-nude/20">
              {about?.heroImage ? (
                <Image
                  src={urlFor(about.heroImage).width(800).height(1000).url()}
                  alt="Sidorela Isa – Lash & Make-up Artist"
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-nude via-rose/20 to-cream flex items-center justify-center">
                  <span className="font-display text-6xl text-rose/40">S</span>
                </div>
              )}
            </div>
            <div className="absolute -bottom-6 -left-6 bg-cream rounded-2xl p-4 shadow-xl border border-nude/40">
              <div className="flex items-center gap-1 text-gold mb-1">
                {"★★★★★".split("").map((_, i) => (
                  <span key={i} className="text-sm">★</span>
                ))}
              </div>
              <div className="text-xs text-charcoal/70 italic">„Einfach die Beste!"</div>
              <div className="text-xs text-charcoal/50 mt-0.5">— Kundin</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      {about?.story && (
        <section className="py-20 bg-gradient-to-b from-cream to-nude/20">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none text-charcoal/80 prose-headings:font-display prose-headings:text-charcoal prose-strong:text-charcoal"
            >
              <PortableText value={about.story} />
            </motion.div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {about?.certifications && about.certifications.length > 0 && (
        <section className="py-20 bg-nude/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4">— Qualifikationen</div>
              <h2 className="font-display text-4xl md:text-5xl text-charcoal leading-tight">
                Zertifiziert & <span className="italic text-rose">ausgezeichnet.</span>
              </h2>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {about.certifications.map((cert: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-nude/60"
                >
                  <Award size={20} className="text-gold shrink-0 mt-0.5" />
                  <span className="text-charcoal/80 text-sm leading-relaxed">{cert}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
