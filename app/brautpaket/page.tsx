import type { Metadata } from "next";
import { Footer } from "@/components/ownui/Footer";
import { Header } from "@/components/ownui/Header";
import { BridalBuilder } from "./client";

export const metadata: Metadata = {
  title: "Braut-Make-up & Brautpaket in Bruchsal und Jülich",
  description: "Stell dir dein Brautpaket selbst zusammen: Probe-Termin, Braut-Make-up, Lashes, Brows und Begleitung bei Sidorela Isa.",
  alternates: { canonical: "/brautpaket" },
};

export default function BrautpaketPage() {
  return (
    <>
      <Header />
      <main>
        <BridalBuilder />
      </main>
      <Footer />
    </>
  );
}
