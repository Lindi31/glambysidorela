import type { Metadata } from "next";
import { Footer } from "@/components/ownui/Footer";
import { Header } from "@/components/ownui/Header";
import { GiftBuilder } from "./client";
import { getSite, getTexts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Beauty-Gutschein für Lashes, Brows & Make-up",
  description: "Gestalte deinen persönlichen Gutschein für Behandlungen bei Sidorela Isa Beauty Studio & Academy in Bruchsal und Jülich.",
  alternates: { canonical: "/gutschein" },
};

export default async function GutscheinPage() {
  const [site, texts] = await Promise.all([getSite(), getTexts()]);
  return (
    <>
      <Header />
      <main>
        <GiftBuilder amounts={site.giftAmounts} email={site.email} whatsapp={site.whatsapp} t={texts.gutschein} />
      </main>
      <Footer />
    </>
  );
}
