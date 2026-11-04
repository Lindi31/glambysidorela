import type { Metadata } from "next";
import { Footer } from "@/components/ownui/Footer";
import { Header } from "@/components/ownui/Header";
import { BeautyCheck } from "./client";

export const metadata: Metadata = {
  title: "Beauty-Check: Welche Behandlung passt zu dir?",
  description: "Drei kurze Fragen, eine persönliche Empfehlung für Lashes, Brows, Permanent Make-up oder Make-up in Bruchsal und Jülich.",
  alternates: { canonical: "/beauty-check" },
};

export default function BeautyCheckPage() {
  return (
    <>
      <Header />
      <main>
        <BeautyCheck />
      </main>
      <Footer />
    </>
  );
}
