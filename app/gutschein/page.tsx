import type { Metadata } from "next";
import { Footer } from "@/components/ownui/Footer";
import { Header } from "@/components/ownui/Header";
import { GiftBuilder } from "./client";

export const metadata: Metadata = {
  title: "Beauty-Gutschein für Lashes, Brows & Make-up",
  description: "Gestalte deinen persönlichen Gutschein für Behandlungen bei Sidorela Isa Beauty Studio & Academy in Bruchsal und Jülich.",
  alternates: { canonical: "/gutschein" },
};

export default function GutscheinPage() {
  return (
    <>
      <Header />
      <main>
        <GiftBuilder />
      </main>
      <Footer />
    </>
  );
}
