import type { Metadata } from "next";
import { Footer } from "@/components/ownui/Footer";
import { Header } from "@/components/ownui/Header";
import { BeautyCheck } from "./client";
import { getQuizServices, getTexts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Beauty-Check: Welche Behandlung passt zu dir?",
  description: "Drei kurze Fragen, eine persönliche Empfehlung für Lashes, Brows, Permanent Make-up oder Make-up in Bruchsal und Jülich.",
  alternates: { canonical: "/beauty-check" },
};

export default async function BeautyCheckPage() {
  const [texts, services] = await Promise.all([getTexts(), getQuizServices()]);
  return (
    <>
      <Header />
      <main>
        <BeautyCheck t={texts.beautyCheck} services={services} />
      </main>
      <Footer />
    </>
  );
}
