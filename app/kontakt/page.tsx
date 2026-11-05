import { getSite, getTexts } from "@/lib/content"
import { Header } from "@/components/ownui/Header"
import { Footer } from "@/components/ownui/Footer"
import type { Metadata } from "next"
import { KontaktView } from "./client"
import { Locations } from "@/components/home/Locations"

export const metadata: Metadata = {
  title: "Kontakt & Standorte in Bruchsal und Jülich",
  alternates: { canonical: "/kontakt" },
  description:
    "Nimm Kontakt mit Sidorela Isa auf – per E-Mail, WhatsApp oder direkt über das Buchungssystem. Standorte in Bruchsal und Jülich.",
}

export default async function KontaktPage() {
  const [site, texts] = await Promise.all([getSite(), getTexts()])
  return (
    <>
      <Header />
      <main>
        <KontaktView whatsapp={site.whatsapp} email={site.email} instagram={site.instagram} instagramHandle={site.instagramHandle} t={texts.kontakt} />
        <Locations />
      </main>
      <Footer />
    </>
  )
}
