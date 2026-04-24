import { client } from "@/sanity/lib/client"
import { defineQuery } from "next-sanity"
import { Header } from "@/components/ownui/Header"
import { Footer } from "@/components/ownui/Footer"
import { PortableText } from "@portabletext/react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Impressum – GlamBySidorela",
  robots: { index: false },
}

const IMPRESSUM_QUERY = defineQuery(`
  *[_type == "legalPage" && slug.current == "impressum"][0] { title, content }
`)

export default async function ImpressumPage() {
  const page = await client.fetch(IMPRESSUM_QUERY).catch(() => null)

  return (
    <>
      <Header />
      <main className="bg-cream pt-32 pb-24 min-h-screen">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="text-xs tracking-[0.2em] uppercase text-gold mb-4">— Rechtliches</div>
          <h1 className="font-display text-5xl md:text-6xl text-charcoal leading-tight mb-12">
            {page?.title ?? "Impressum"}
          </h1>

          {page?.content ? (
            <div className="prose prose-lg max-w-none text-charcoal/80 prose-headings:font-display prose-headings:text-charcoal prose-strong:text-charcoal">
              <PortableText value={page.content} />
            </div>
          ) : (
            <div className="rounded-2xl bg-nude/30 border border-nude p-8 text-charcoal/70">
              <p className="font-medium text-charcoal mb-2">Inhalt noch nicht eingetragen.</p>
              <p className="text-sm">
                Bitte füge den Impressumstext im{" "}
                <a href="/studio" className="text-rose hover:underline">
                  Sanity Studio
                </a>{" "}
                unter <strong>Rechtliche Seiten → Impressum</strong> ein.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
