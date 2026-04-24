import { sanityFetch } from "@/sanity/lib/live"
import { defineQuery } from "next-sanity"
import { Header } from "@/components/ownui/Header"
import { Footer } from "@/components/ownui/Footer"
import { CtaBooking } from "@/components/ownui/CtaBooking"
import type { Metadata } from "next"
import { UeberMichView } from "./client"

export const metadata: Metadata = {
  title: "Über mich – GlamBySidorela",
  description:
    "Lern Sidorela Isa kennen – zertifizierte Lash- und Make-up-Artistin aus Bruchsal. Erfahre mehr über ihre Leidenschaft, Ausbildung und Philosophie.",
}

const ABOUT_QUERY = defineQuery(`
  *[_type == "about"][0] {
    _id, heroImage, headline, story, certifications, yearsExperience
  }
`)

export default async function UeberMichPage() {
  const { data: about } = await sanityFetch({ query: ABOUT_QUERY })
  return (
    <>
      <Header />
      <main>
        <UeberMichView about={about} />
        <CtaBooking />
      </main>
      <Footer />
    </>
  )
}
