import { getServices } from "@/lib/content"
import { Header } from "@/components/ownui/Header"
import { Footer } from "@/components/ownui/Footer"
import { CtaBooking } from "@/components/ownui/CtaBooking"
import type { Metadata } from "next"
import { LeistungenGrid } from "./client"

export const metadata: Metadata = {
  title: "Leistungen: Lashes, Brows, PMU & Make-up in Bruchsal und Jülich",
  alternates: { canonical: "/leistungen" },
  description:
    "Alle Beauty-Treatments von Sidorela Isa: Wimpernverlängerung, Brows, Permanent Make-up, Make-up und Gesichtsbehandlungen in Bruchsal und Jülich.",
}

export default async function LeistungenPage() {
  const services = await getServices()
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
