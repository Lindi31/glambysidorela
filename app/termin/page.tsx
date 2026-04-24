import { CalEmbed } from "@/components/ownui/CalEmbed";
import { Footer } from "@/components/ownui/Footer";
import { Header } from "@/components/ownui/Header";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Termin buchen – GlamBySidorela",
  description:
    "Buche direkt online deinen Termin für Lashes, Brows, Permanent Make-up, Make-up oder eine Gesichtsbehandlung bei Sidorela Isa.",
};

type Props = {
  searchParams: Promise<{ event?: string }>;
};

export default async function TerminPage({ searchParams }: Props) {
  const { event } = await searchParams;

  return (
    <>
      <Header />
      <main className="bg-cream pt-32 pb-24 min-h-screen">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.2em] uppercase text-gold-accent mb-4">
              — Termin buchen
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-charcoal leading-tight">
              Finde deinen <span className="italic text-rose">Wohlfühl-Slot.</span>
            </h1>
            <p className="mt-6 text-lg text-charcoal/70 max-w-xl mx-auto">
              Wähle unten die gewünschte Behandlung und einen freien Termin.
              Du bekommst sofort eine Bestätigung per E-Mail.
            </p>
          </div>

          <CalEmbed eventType={event} showAll={!event} />
        </div>
      </main>
      <Footer />
    </>
  );
}