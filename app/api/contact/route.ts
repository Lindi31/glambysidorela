import { Resend } from "resend"
import { NextResponse } from "next/server"
import { escapeHtml } from "@/lib/mail"

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Alle Felder sind erforderlich." }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: "GlamBySidorela <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL ?? "kontakt@glambysidorela.de",
      replyTo: String(email),
      subject: `Neue Anfrage von ${String(name).slice(0, 80)}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Fehler beim Senden. Bitte versuche es später erneut." }, { status: 500 })
  }
}
