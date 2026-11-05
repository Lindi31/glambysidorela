import { Resend } from "resend"
import { NextResponse } from "next/server"
import { z } from "zod"
import { rejectRequest } from "@/lib/guard"
import { escapeHtml } from "@/lib/mail"

const schema = z.object({
  name: z.string().trim().min(2).max(80).regex(/^[^\r\n]*$/),
  email: z.string().trim().email().max(120),
  message: z.string().trim().min(10).max(5000),
})

export async function POST(req: Request) {
  const blocked = rejectRequest(req, "kontakt")
  if (blocked) return blocked

  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: "Bitte prüfe deine Eingaben." }, { status: 400 })
  }
  const { name, email, message } = parsed.data

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: "Sidorela Isa Beauty Studio <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL ?? "kontakt@glambysidorela.de",
      replyTo: email,
      subject: `Neue Anfrage von ${name}`,
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
