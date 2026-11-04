import { Footer } from "@/components/ownui/Footer";
import { Header } from "@/components/ownui/Header";
import { Metadata } from "next";
import { BookingFlow } from "./client";


export const metadata: Metadata = {
  title: "Termin online buchen in Bruchsal oder Jülich",
  alternates: { canonical: "/termin" },
  description:
    "Buche direkt online deinen Termin für Lashes, Brows, Permanent Make-up, Make-up oder eine Gesichtsbehandlung bei Sidorela Isa.",
};

type Props = {
  searchParams: Promise<{ event?: string; behandlung?: string; ort?: string }>;
};

export default async function TerminPage({ searchParams }: Props) {
  const { event, behandlung, ort } = await searchParams;

  return (
    <>
      <Header />
      <main className="min-h-svh bg-cream pb-16 pt-24 md:pb-24 md:pt-32">
        <BookingFlow event={event} initialTreatment={behandlung} initialPlace={ort} />
      </main>
      <Footer />
    </>
  );
}
