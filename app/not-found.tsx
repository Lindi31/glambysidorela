import type { Metadata } from "next";
import { Footer } from "@/components/ownui/Footer";
import { Header } from "@/components/ownui/Header";
import { Pill } from "@/components/ownui/Pill";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-svh flex-col items-center justify-center bg-cream px-5 pb-28 pt-24 text-center md:pb-16">
        <h1 className="max-w-[12em] text-balance font-display text-[clamp(44px,7vw,84px)] leading-[0.99] tracking-[-0.022em] text-charcoal">Diese Seite gibt es nicht.</h1>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Pill href="/">Zur Startseite</Pill>
          <Pill href="/leistungen" variant="outline">Leistungen ansehen</Pill>
        </div>
      </main>
      <Footer />
    </>
  );
}
