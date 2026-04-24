import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Alle Felder sind erforderlich." }, { status: 400 })
    }

    await resend.emails.send({
      from: "GlamBySidorela <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL ?? "kontakt@glambysidorela.de",
      replyTo: email,
      subject: `Neue Anfrage von ${name}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Fehler beim Senden. Bitte versuche es später erneut." }, { status: 500 })
  }
}
