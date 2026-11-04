import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"
import { escapeHtml } from "@/lib/mail"

const contact = {
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  website: z.string().max(0).optional(), // Honeypot gegen Spam-Bots
}

const schema = z.discriminatedUnion("type", [
  z.object({
    ...contact,
    type: z.literal("gutschein"),
    amount: z.number().int().min(10).max(2000),
    recipient: z.string().trim().max(80).optional(),
    note: z.string().trim().max(120).optional(),
  }),
  z.object({
    ...contact,
    type: z.literal("brautpaket"),
    date: z.string().trim().max(20).optional(),
    location: z.string().trim().max(20),
    options: z.array(z.string().max(60)).min(1).max(10),
    companions: z.number().int().min(0).max(12),
    note: z.string().trim().max(600).optional(),
  }),
  z.object({
    ...contact,
    type: z.literal("termin"),
    treatment: z.string().trim().max(80),
    location: z.string().trim().max(20),
    wish: z.string().trim().max(40),
  }),
  z.object({
    ...contact,
    type: z.literal("warteliste"),
    training: z.string().trim().max(80),
  }),
  z.object({
    ...contact,
    type: z.literal("erinnerung"),
    treatment: z.string().trim().max(80),
    consent: z.literal(true),
  }),
])

const SUBJECT = {
  gutschein: "Gutschein-Bestellung",
  brautpaket: "Brautpaket-Anfrage",
  termin: "Terminanfrage",
  warteliste: "Warteliste Schulung",
  erinnerung: "Nachfüll-Erinnerung",
}

const REMINDER_DAYS = 21

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: "Bitte prüfe deine Eingaben." }, { status: 400 })
  }
  const data = parsed.data

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Der Versand ist gerade nicht verfügbar." }, { status: 503 })
  }

  const rows = Object.entries(data)
    .filter(([key, value]) => !["type", "website", "consent"].includes(key) && value !== undefined && value !== "")
    .map(([key, value]) => `<p><strong>${escapeHtml(key)}:</strong> ${escapeHtml(Array.isArray(value) ? value.join(", ") : value)}</p>`)
    .join("")

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: "GlamBySidorela <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL ?? "kontakt@glambysidorela.de",
      replyTo: data.email,
      subject: `${SUBJECT[data.type]} von ${data.name}`,
      html: `<h2>${SUBJECT[data.type]}</h2>${rows}`,
    })

    // An Kundinnen darf Resend erst nach Verifizierung der eigenen Domain senden.
    if (data.type === "erinnerung" && process.env.RESEND_FROM) {
      await resend.emails.send({
        from: process.env.RESEND_FROM,
        to: data.email,
        subject: `Zeit für dein ${data.treatment}-Update?`,
        scheduledAt: new Date(Date.now() + REMINDER_DAYS * 86_400_000).toISOString(),
        html: `<p>Hallo ${escapeHtml(data.name)},</p><p>du wolltest an deinen nächsten Termin für ${escapeHtml(data.treatment)} erinnert werden.</p><p><a href="https://www.glambysidorela.de/termin">Jetzt Termin buchen</a></p><p>Liebe Grüße<br>Sidorela</p>`,
      })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Das Senden hat nicht geklappt." }, { status: 502 })
  }
}
