import { sanityFetch } from "@/sanity/lib/live"
import { defineQuery } from "next-sanity"
import { Header } from "@/components/ownui/Header"
import { Footer } from "@/components/ownui/Footer"
import type { Metadata } from "next"
import { KontaktView } from "./client"

export const metadata: Metadata = {
  title: "Kontakt – GlamBySidorela",
  description:
    "Nimm Kontakt mit Sidorela Isa auf – per E-Mail, WhatsApp oder direkt über das Buchungssystem. Standorte in Bruchsal und Jülich.",
}

const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    brandName, tagline, whatsapp, instagram,
    locations[]{city, addressLine, hours, phone}
  }
`)

export default async function KontaktPage() {
  const { data: settings } = await sanityFetch({ query: SETTINGS_QUERY })
  return (
    <>
      <Header />
      <main>
        <KontaktView settings={settings} />
      </main>
      <Footer />
    </>
  )
}
