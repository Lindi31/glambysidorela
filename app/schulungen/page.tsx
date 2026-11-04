import { getTrainings } from "@/lib/content"
import { Header } from "@/components/ownui/Header"
import { Footer } from "@/components/ownui/Footer"
import { CtaBooking } from "@/components/ownui/CtaBooking"
import type { Metadata } from "next"
import { SchulungenGrid } from "./client"

export const metadata: Metadata = {
  title: "Lash- und PMU-Schulungen in Bruchsal und Jülich",
  alternates: { canonical: "/schulungen" },
  description:
    "Professionelle Lash-, Brow- und PMU-Schulungen von Sidorela Isa. Aus- und Weiterbildung für Einsteiger und Fortgeschrittene in Bruchsal und Jülich.",
}

export default async function SchulungenPage() {
  const trainings = await getTrainings()
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
