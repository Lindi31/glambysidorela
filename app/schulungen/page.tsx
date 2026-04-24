import { sanityFetch } from "@/sanity/lib/live"
import { defineQuery } from "next-sanity"
import { Header } from "@/components/ownui/Header"
import { Footer } from "@/components/ownui/Footer"
import { CtaBooking } from "@/components/ownui/CtaBooking"
import type { Metadata } from "next"
import { SchulungenGrid } from "./client"

export const metadata: Metadata = {
  title: "Schulungen – GlamBySidorela",
  description:
    "Professionelle Lash-, Brow- und PMU-Schulungen von Sidorela Isa. Aus- und Weiterbildung für Einsteiger und Fortgeschrittene in Bruchsal und Jülich.",
}

const TRAININGS_QUERY = defineQuery(`
  *[_type == "training"] | order(title asc) {
    _id, title, "slug": slug.current, level, durationDays, price, image,
    "upcomingDates": upcomingDates[]{date, location, spotsLeft}
  }
`)

export default async function SchulungenPage() {
  const { data: trainings } = await sanityFetch({ query: TRAININGS_QUERY })
  return (
    <>
      <Header />
      <main>
        <SchulungenGrid trainings={trainings} />
        <CtaBooking />
      </main>
      <Footer />
    </>
  )
}
