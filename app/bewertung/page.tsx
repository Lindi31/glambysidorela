import type { Metadata } from "next";
import { Footer } from "@/components/ownui/Footer";
import { Header } from "@/components/ownui/Header";
import { Pill } from "@/components/ownui/Pill";
import { LOCATIONS } from "@/lib/site";

// Link für Kundinnen nach dem Termin, zum Beispiel per WhatsApp oder QR-Code.
export const metadata: Metadata = {
  title: "Bewertung schreiben",
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-svh flex-col items-center justify-center bg-cream px-5 pb-28 pt-24 text-center md:pb-16">
        <h1 className="max-w-[12em] text-balance font-display text-[clamp(44px,7vw,84px)] leading-[0.98] tracking-[-0.022em] text-charcoal">Wie war dein Termin?</h1>
        <p className="mt-5 max-w-[30em] text-[19px] leading-snug text-charcoal/75">Deine ehrliche Meinung hilft anderen Frauen bei der Entscheidung. Es dauert nur eine Minute.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {LOCATIONS.map((location) => (
            <Pill key={location.slug} href={location.reviewUrl ?? location.mapsUrl}>Bewertung für {location.city}</Pill>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
