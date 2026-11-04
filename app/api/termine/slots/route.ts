import { NextResponse } from "next/server"
import { BOOKABLE_EVENTS, CAL_API, CAL_USERNAME } from "@/lib/booking"

const DATE = /^\d{4}-\d{2}-\d{2}$/

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const event = searchParams.get("event") ?? ""
  const start = searchParams.get("start") ?? ""
  const end = searchParams.get("end") ?? ""

  if (!BOOKABLE_EVENTS.includes(event) || !DATE.test(start) || !DATE.test(end)) {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 })
  }

  const query = new URLSearchParams({ username: CAL_USERNAME, eventTypeSlug: event, start, end, timeZone: "Europe/Berlin" })

  try {
    const res = await fetch(`${CAL_API}/slots?${query}`, {
      headers: { "cal-api-version": "2024-09-04" },
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) throw new Error(String(res.status))
    const json = (await res.json()) as { data?: Record<string, { start: string }[]> }
    const days = Object.fromEntries(
      Object.entries(json.data ?? {}).map(([day, slots]) => [day, slots.map((slot) => slot.start)]),
    )
    return NextResponse.json({ days })
  } catch {
    return NextResponse.json({ error: "Die freien Zeiten konnten nicht geladen werden." }, { status: 502 })
  }
}
