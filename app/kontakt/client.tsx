"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { MapPin, Mail, Phone, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const schema = z.object({
  name: z.string().min(2, "Bitte gib deinen Namen ein."),
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
  message: z.string().min(10, "Bitte schreib mindestens 10 Zeichen."),
})

type FormData = z.infer<typeof schema>

const FALLBACK = {
  whatsapp: "4915252609602",
  email: "kontakt@glambysidorela.de",
  instagram: "https://www.instagram.com/glambysidorela",
  locations: [
    { city: "Bruchsal", addressLine: "Region Karlsruhe", hours: "Mo – Sa nach Vereinbarung", phone: null },
    { city: "Jülich", addressLine: "Großraum Aachen", hours: "Mo – Sa nach Vereinbarung", phone: null },
  ],
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
      reset()
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <CheckCircle2 size={48} className="text-rose mb-4" />
        <h3 className="font-display text-2xl text-charcoal mb-2">Nachricht gesendet!</h3>
        <p className="text-charcoal/60">Ich melde mich so schnell wie möglich bei dir.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-charcoal/50 hover:text-rose transition-colors"
        >
          Weitere Nachricht senden
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Dein Name"
          {...register("name")}
          className="w-full h-12 px-4 rounded-2xl border border-nude/60 bg-white text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-rose transition-colors text-sm"
        />
        {errors.name && (
          <p className="mt-1.5 text-xs text-rose flex items-center gap-1">
            <AlertCircle size={12} /> {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5" htmlFor="email">
          E-Mail
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="deine@email.de"
          {...register("email")}
          className="w-full h-12 px-4 rounded-2xl border border-nude/60 bg-white text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-rose transition-colors text-sm"
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-rose flex items-center gap-1">
            <AlertCircle size={12} /> {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5" htmlFor="message">
          Nachricht
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Wie kann ich dir helfen?"
          {...register("message")}
          className="w-full px-4 py-3 rounded-2xl border border-nude/60 bg-white text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-rose transition-colors text-sm resize-none"
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-rose flex items-center gap-1">
            <AlertCircle size={12} /> {errors.message.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm text-rose flex items-center gap-2">
          <AlertCircle size={16} />
          Etwas ist schiefgelaufen. Bitte versuche es erneut.
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-rose hover:bg-mauve text-cream rounded-full h-12 text-base disabled:opacity-60"
      >
        {status === "loading" ? "Wird gesendet…" : "Nachricht senden"}
      </Button>
    </form>
  )
}

export function KontaktView({ settings }: { settings: any }) {
  const whatsapp = settings?.whatsapp ?? FALLBACK.whatsapp
  const instagram = settings?.instagram ?? FALLBACK.instagram
  const locations = settings?.locations?.length ? settings.locations : FALLBACK.locations

  return (
    <section className="relative min-h-screen pt-32 pb-24 bg-cream overflow-hidden">
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,165,165,0.4) 0%, rgba(232,213,196,0.1) 70%)" }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,169,110,0.3) 0%, rgba(250,247,242,0) 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <div className="text-xs tracking-[0.2em] uppercase text-gold-accent mb-4">— Kontakt</div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal leading-tight">
            Lass uns <span className="italic text-rose">reden.</span>
          </h1>
          <p className="mt-6 text-lg text-charcoal/70 leading-relaxed">
            Du hast Fragen, möchtest einen Termin buchen oder interessierst dich für eine Schulung? Meld dich einfach.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Direct contact + form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="font-display text-2xl text-charcoal mb-6">Direktkontakt</h2>

            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 p-6 rounded-2xl bg-white border border-nude/60 hover:border-rose/60 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-rose/10 flex items-center justify-center shrink-0 group-hover:bg-rose transition-colors duration-300">
                <Phone size={20} className="text-rose group-hover:text-cream transition-colors" />
              </div>
              <div>
                <div className="font-medium text-charcoal">WhatsApp</div>
                <div className="text-sm text-charcoal/60">Schnell & direkt anschreiben</div>
              </div>
            </a>

            <a
              href={`mailto:${FALLBACK.email}`}
              className="group flex items-center gap-5 p-6 rounded-2xl bg-white border border-nude/60 hover:border-rose/60 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-rose/10 flex items-center justify-center shrink-0 group-hover:bg-rose transition-colors duration-300">
                <Mail size={20} className="text-rose group-hover:text-cream transition-colors" />
              </div>
              <div>
                <div className="font-medium text-charcoal">E-Mail</div>
                <div className="text-sm text-charcoal/60">{FALLBACK.email}</div>
              </div>
            </a>

            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-6 rounded-2xl bg-white border border-nude/60 hover:border-rose/60 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-rose/10 flex items-center justify-center shrink-0 group-hover:bg-rose transition-colors duration-300">
                  <span className="text-rose group-hover:text-cream transition-colors text-lg font-bold">IG</span>
                </div>
                <div>
                  <div className="font-medium text-charcoal">Instagram</div>
                  <div className="text-sm text-charcoal/60">@glambysidorela</div>
                </div>
              </a>
            )}

            <div className="pt-4">
              <Button asChild size="lg" className="w-full bg-rose hover:bg-mauve text-cream rounded-full h-12 text-base">
                <Link href="/termin">Direkt Termin buchen</Link>
              </Button>
            </div>

            {/* Inline contact form */}
            <div className="pt-6 border-t border-nude/50">
              <h3 className="font-display text-xl text-charcoal mb-5">Oder schreib mir direkt</h3>
              <ContactForm />
            </div>
          </motion.div>

          {/* Locations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-display text-2xl text-charcoal mb-6">Standorte</h2>
            <div className="space-y-4">
              {locations.map((loc: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-white border border-nude/60"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-rose/10 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-rose" />
                    </div>
                    <div className="space-y-1">
                      <div className="font-display text-xl text-charcoal">{loc.city}</div>
                      {loc.addressLine && (
                        <div className="text-sm text-charcoal/60">{loc.addressLine}</div>
                      )}
                      {loc.hours && (
                        <div className="flex items-center gap-2 text-sm text-charcoal/50 pt-1">
                          <Clock size={13} className="text-rose shrink-0" />
                          {loc.hours}
                        </div>
                      )}
                      {loc.phone && (
                        <a
                          href={`tel:${loc.phone}`}
                          className="flex items-center gap-2 text-sm text-charcoal/50 hover:text-rose transition-colors pt-1"
                        >
                          <Phone size={13} className="text-rose shrink-0" />
                          {loc.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
