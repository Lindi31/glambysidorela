import { client } from "@/sanity/lib/client"
import { defineQuery } from "next-sanity"
import { Header } from "@/components/ownui/Header"
import { Footer } from "@/components/ownui/Footer"
import { PortableText } from "@portabletext/react"
import type { Metadata } from "next"
import { LOCATIONS, SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
  alternates: { canonical: "/impressum" },
}

const IMPRESSUM_QUERY = defineQuery(`
  *[_type == "legalPage" && slug.current == "impressum"][0] { title, content }
`)

export default async function ImpressumPage() {
  const page = await client.fetch(IMPRESSUM_QUERY).catch(() => null)
  const main = LOCATIONS[0]

  return (
    <>
      <Header />
      <main className="min-h-svh bg-cream pb-16 pt-24 md:pb-24 md:pt-32">
        <div className="mx-auto max-w-[760px] px-5">
          <h1 className="mb-10 font-display text-[clamp(42px,6vw,72px)] leading-[1] tracking-[-0.022em] text-charcoal">
            {page?.title ?? "Impressum"}
          </h1>

          {page?.content ? (
            <div className="rich-text">
              <PortableText value={page.content} />
            </div>
          ) : (
            <div className="space-y-8 text-[17px] leading-relaxed text-charcoal/80">
              <section>
                <h2 className="mb-2 font-display text-[28px] leading-[1.1] text-charcoal">Angaben gemäß § 5 DDG</h2>
                <address className="not-italic">
                  {SITE.owner}
                  <br />
                  {SITE.name}
                  <br />
                  {main.street}
                  <br />
                  {main.postalCode} {main.city}
                </address>
              </section>
              <section>
                <h2 className="mb-2 font-display text-[28px] leading-[1.1] text-charcoal">Kontakt</h2>
                <p>
                  Telefon: <a className="underline underline-offset-4" href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
                  <br />
                  E-Mail: <a className="underline underline-offset-4" href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </p>
              </section>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
