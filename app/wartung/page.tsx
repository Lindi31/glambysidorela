import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";

export const metadata: Metadata = {
  title: "Wir sind gleich zurück – GlamBySidorela",
  robots: { index: false, follow: false },
};

const MAINTENANCE_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    brandName,
    maintenanceMessage,
    instagram,
    whatsapp
  }
`);

export default async function MaintenancePage() {
  const data = await client.fetch(MAINTENANCE_QUERY);
  const brand = data?.brandName ?? "GlamBySidorela";
  const message =
    data?.maintenanceMessage ??
    "Wir verschönern gerade unsere Website. In Kürze sind wir wieder für dich da.";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center text-charcoal">
      <div className="max-w-xl">
        <p className="mb-4 font-display text-sm uppercase tracking-[0.3em] text-gold-accent">
          {brand}
        </p>
        <h1 className="mb-6 font-display text-4xl font-medium leading-tight sm:text-5xl">
          Wir sind gleich
          <br />
          wieder für dich da
        </h1>
        <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-charcoal/70">
          {message}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {data?.whatsapp && (
            <a
              href={`https://wa.me/${data.whatsapp}`}
              className="rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-cream transition hover:opacity-90"
            >
              Schreib uns auf WhatsApp
            </a>
          )}
          {data?.instagram && (
            <a
              href={data.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-charcoal/20 px-6 py-3 text-sm font-medium transition hover:border-charcoal/40"
            >
              Instagram
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
