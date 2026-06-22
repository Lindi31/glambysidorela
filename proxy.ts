import { NextResponse, type NextRequest } from "next/server";
import { projectId, dataset, apiVersion } from "@/sanity/env";

// Geheimer Token, mit dem du selbst die Seite trotz Wartungsmodus ansehen kannst.
// In der .env(.local) als MAINTENANCE_BYPASS_TOKEN setzen.
const BYPASS_TOKEN = process.env.MAINTENANCE_BYPASS_TOKEN;
const BYPASS_COOKIE = "gbs-bypass";

// Kurzlebiger In-Memory-Cache, damit Sanity nicht bei jedem Seitenaufruf
// abgefragt wird (Status ändert sich selten).
let cache: { value: boolean; expires: number } | null = null;

async function isMaintenanceActive(): Promise<boolean> {
  if (cache && cache.expires > Date.now()) return cache.value;

  try {
    const query = encodeURIComponent(
      '*[_type == "siteSettings"][0].maintenanceMode',
    );
    const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
    const json = (await res.json()) as { result?: boolean };
    const value = json?.result === true;
    cache = { value, expires: Date.now() + 20_000 }; // 20 Sekunden cachen
    return value;
  } catch {
    // Fail-open: bei Fehler bleibt die Seite erreichbar, statt fälschlich zu sperren.
    return cache?.value ?? false;
  }
}

export async function proxy(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  // 1. Vorschau-Link: ?bypass=TOKEN setzt ein Cookie und leitet sauber weiter.
  if (BYPASS_TOKEN && searchParams.get("bypass") === BYPASS_TOKEN) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("bypass");
    const res = NextResponse.redirect(url);
    res.cookies.set(BYPASS_COOKIE, BYPASS_TOKEN, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 Tage
    });
    return res;
  }

  // 2. Du hast bereits das Bypass-Cookie -> immer durchlassen.
  if (BYPASS_TOKEN && req.cookies.get(BYPASS_COOKIE)?.value === BYPASS_TOKEN) {
    return NextResponse.next();
  }

  // 3. Wartungsmodus aktiv -> alle Seiten zeigen die Wartungsseite (URL bleibt gleich).
  if (await isMaintenanceActive()) {
    const url = req.nextUrl.clone();
    url.pathname = "/wartung";
    url.search = "";
    return NextResponse.rewrite(url, {
      status: 503,
      headers: { "Retry-After": "3600" },
    });
  }

  return NextResponse.next();
}

export const config = {
  // Ausgenommen: Studio (damit du den Schalter wieder ausschalten kannst),
  // die Wartungsseite selbst, API-Routen, Next-Interna und statische Dateien.
  matcher: ["/((?!studio|wartung|api|_next|.*\\..*).*)"],
};
