import { NextResponse } from "next/server"
import { z } from "zod"
import { BOOKABLE_EVENTS, CAL_API, CAL_USERNAME } from "@/lib/booking"

const schema = z.object({
  event: z.string().refine((value) => BOOKABLE_EVENTS.includes(value)),
  start: z.string().datetime({ offset: true }),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().max(30).optional(),
  notes: z.string().trim().max(500).optional(),
  location: z.string().trim().max(60),
  website: z.string().max(0).optional(), // Honeypot gegen Spam-Bots
})

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: "Bitte prüfe deine Eingaben." }, { status: 400 })
  }
  const data = parsed.data

  const notes = [`Standort: ${data.location}`, data.phone && `Telefon: ${data.phone}`, data.notes].filter(Boolean).join("\n")

  try {
    const res = await fetch(`${CAL_API}/bookings`, {
      method: "POST",
      headers: { "cal-api-version": "2024-08-13", "Content-Type": "application/json" },
      body: JSON.stringify({
        start: new Date(data.start).toISOString(),
        eventTypeSlug: data.event,
        username: CAL_USERNAME,
        attendee: { name: data.name, email: data.email, timeZone: "Europe/Berlin", language: "de" },
        bookingFieldsResponses: { notes },
      }),
      signal: AbortSignal.timeout(15_000),
    })

    if (!res.ok) {
      // Meist war jemand schneller und die Zeit ist nicht mehr frei.
      const taken = res.status === 400 || res.status === 409
      return NextResponse.json(
        { error: taken ? "Diese Zeit ist leider nicht mehr frei." : "Die Buchung hat nicht geklappt.", taken },
        { status: taken ? 409 : 502 },
      )
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Die Buchung hat nicht geklappt.", taken: false }, { status: 502 })
  }
}
