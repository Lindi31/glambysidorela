import { sanityFetch } from "@/sanity/lib/live"
import { defineQuery } from "next-sanity"
import { Header } from "@/components/ownui/Header"
import { Footer } from "@/components/ownui/Footer"
import { CtaBooking } from "@/components/ownui/CtaBooking"
import type { Metadata } from "next"
import { GalerieGrid } from "./client"

export const metadata: Metadata = {
  title: "Galerie – GlamBySidorela",
  description:
    "Vorher-Nachher Bilder und Ergebnisse von Sidorela Isa: Lashes, Brows, Permanent Make-up und Make-up in Bruchsal und Jülich.",
}

const GALLERY_QUERY = defineQuery(`
  *[_type == "galleryItem" && consent == true] | order(_createdAt desc) {
    _id, title, category, before, after
  }
`)

export default async function GaleriePage() {
  const { data: items } = await sanityFetch({ query: GALLERY_QUERY })
  return (
    <>
      <Header />
      <main>
        <GalerieGrid items={items} />
        <CtaBooking />
      </main>
      <Footer />
    </>
  )
}
