"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { PageIntro, cardClass, pageShell, sectionTitle } from "@/components/ownui/PageIntro"
import { pillClass } from "@/components/ownui/Pill"
import { fieldClass, labelClass } from "@/components/ownui/useRequest"
import { SITE } from "@/lib/site"

const schema = z.object({
  name: z.string().min(2, "Bitte gib deinen Namen ein."),
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
  message: z.string().min(10, "Bitte schreib mindestens 10 Zeichen."),
})

type FormData = z.infer<typeof schema>

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

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
      <div aria-live="polite">
        <h2 className={sectionTitle}>Danke, deine Nachricht ist da.</h2>
        <p className="mt-3 text-[17px] text-charcoal/75">Ich melde mich so schnell wie möglich bei dir.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-3 min-h-11 text-[15px] font-medium text-charcoal underline underline-offset-4">
          Weitere Nachricht senden
        </button>
      </div>
    )
  }

  const error = (message?: string) => message && <span role="alert" className="text-[13px] font-normal text-rose-deep">{message}</span>

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <h2 className={sectionTitle}>Schreib mir direkt.</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Name
          <input className={fieldClass} type="text" autoComplete="name" aria-invalid={Boolean(errors.name)} {...register("name")} />
          {error(errors.name?.message)}
        </label>
        <label className={labelClass}>
          E-Mail
          <input className={fieldClass} type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} {...register("email")} />
          {error(errors.email?.message)}
        </label>
      </div>
      <label className={labelClass}>
        Nachricht
        <textarea className={`${fieldClass} py-3`} rows={5} aria-invalid={Boolean(errors.message)} {...register("message")} />
        {error(errors.message?.message)}
      </label>
      {status === "error" && <p role="alert" className="text-[14px] text-rose-deep">Das hat nicht geklappt. Bitte versuche es noch einmal oder schreib mir per WhatsApp.</p>}
      <button type="submit" disabled={status === "loading"} className={pillClass("dark", "self-start disabled:opacity-60")}>
        {status === "loading" ? "Wird gesendet …" : "Nachricht senden"}
      </button>
    </form>
  )
}

export function KontaktView({ settings }: { settings?: { whatsapp?: string | null; instagram?: string | null } | null }) {
  const channels = [
    { href: `https://wa.me/${settings?.whatsapp ?? SITE.whatsapp}`, title: "WhatsApp", text: "Am schnellsten" },
    { href: `mailto:${SITE.email}`, title: "E-Mail", text: SITE.email },
    { href: settings?.instagram ?? SITE.instagram, title: "Instagram", text: SITE.instagramHandle },
  ]

  return (
    <div className="bg-cream pb-24 md:pb-36">
      <PageIntro title="Kontakt und Standorte in Bruchsal und Jülich." lead="Du hast Fragen, möchtest einen Termin oder interessierst dich für eine Schulung? Meld dich einfach." />
      <div className={`${pageShell} flex flex-col gap-4`}>
        <ul className="grid gap-4 md:grid-cols-3">
          {channels.map((channel) => (
            <li key={channel.title}>
              <a
                href={channel.href}
                {...(channel.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`${cardClass} flex h-full min-h-32 flex-col justify-between gap-5 p-6 transition-transform duration-700 ease-out hover:scale-[1.01]`}
              >
                <span className="font-display text-[32px] leading-none tracking-[-0.015em] text-charcoal">{channel.title}</span>
                <span className="break-words text-[15px] text-charcoal/75">{channel.text}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className={`${cardClass} p-6 md:p-10`}>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
