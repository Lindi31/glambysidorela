import { sanityFetch } from "@/sanity/lib/live"
import { defineQuery } from "next-sanity"
import { LEGACY_TEST_IDS } from "@/lib/catalog"
import { getCategories, getSite, getTexts } from "@/lib/content"
import { Header } from "@/components/ownui/Header"
import { Footer } from "@/components/ownui/Footer"
import { CtaBooking } from "@/components/ownui/CtaBooking"
import type { Metadata } from "next"
import { GalerieGrid, type GalleryItem } from "./client"

export const metadata: Metadata = {
  title: "Galerie: Lashes, Brows und PMU, vorher und nachher",
  alternates: { canonical: "/galerie" },
  description:
    "Vorher-Nachher Bilder und Ergebnisse von Sidorela Isa: Lashes, Brows, Permanent Make-up und Make-up in Bruchsal und Jülich.",
}

const GALLERY_QUERY = defineQuery(`
  *[_type == "galleryItem" && consent == true && !(_id in $hidden)] | order(_createdAt desc) {
    _id, title, category,
    "before": before{ ..., asset },
    "after": after{ ..., asset }
  }
`)

export default async function GaleriePage() {
  const [{ data: items }, texts, site, categories] = await Promise.all([sanityFetch({ query: GALLERY_QUERY, params: { hidden: LEGACY_TEST_IDS } }), getTexts(), getSite(), getCategories()])
  return (
    <>
      <Header />
      <main>
        <GalerieGrid items={items as GalleryItem[]} t={texts.galerie} instagram={site.instagram} categories={categories} />
        <CtaBooking />
      </main>
      <Footer />
    </>
  )
}
