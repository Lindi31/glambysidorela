import { sanityFetch } from "@/sanity/lib/live"
import { defineQuery } from "next-sanity"
import { Header } from "@/components/ownui/Header"
import { Footer } from "@/components/ownui/Footer"
import { CtaBooking } from "@/components/ownui/CtaBooking"
import type { Metadata } from "next"
import { LeistungenGrid } from "./client"

export const metadata: Metadata = {
  title: "Leistungen – GlamBySidorela",
  description:
    "Alle Beauty-Treatments von Sidorela Isa: Wimpernverlängerung, Brows, Permanent Make-up, Make-up und Gesichtsbehandlungen in Bruchsal und Jülich.",
}

const SERVICES_QUERY = defineQuery(`
  *[_type == "service"] | order(order asc) {
    _id, title, "slug": slug.current, category, shortDescription, priceFrom, duration, image
  }
`)

export default async function LeistungenPage() {
  const { data: services } = await sanityFetch({ query: SERVICES_QUERY })
  return (
    <>
      <Header />
      <main>
        <LeistungenGrid services={services} />
        <CtaBooking />
      </main>
      <Footer />
    </>
  )
}
