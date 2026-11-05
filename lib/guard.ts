import { NextResponse } from "next/server"

// Einfache Bremse gegen Spam. Pro Server-Instanz, ersetzt keine Firewall, stoppt aber die meisten Bots.
const hits = new Map<string, number[]>()

const clientIp = (req: Request) =>
  req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unbekannt"

export function rateLimited(req: Request, scope: string, limit: number, windowMs: number) {
  const key = `${scope}:${clientIp(req)}`
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs)
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > limit
}

// Formulare dürfen nur von der eigenen Website abgeschickt werden.
export function fromOwnSite(req: Request) {
  const origin = req.headers.get("origin")
  if (!origin) return true
  try {
    return new URL(origin).host === (req.headers.get("x-forwarded-host") ?? req.headers.get("host"))
  } catch {
    return false
  }
}

export function rejectRequest(req: Request, scope: string, limit = 5, windowMs = 10 * 60_000) {
  if (!fromOwnSite(req)) return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 })
  if (Number(req.headers.get("content-length") ?? 0) > 20_000) return NextResponse.json({ error: "Anfrage zu groß." }, { status: 413 })
  if (rateLimited(req, scope, limit, windowMs)) return NextResponse.json({ error: "Zu viele Anfragen. Bitte versuche es später noch einmal." }, { status: 429 })
  return null
}
