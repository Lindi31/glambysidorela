import type { Metadata } from "next";
import { Footer } from "@/components/ownui/Footer";
import { Header } from "@/components/ownui/Header";
import { BridalBuilder } from "./client";
import { getSite, getTexts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Braut-Make-up & Brautpaket in Bruchsal und Jülich",
  description: "Stell dir dein Brautpaket selbst zusammen: Probe-Termin, Braut-Make-up, Lashes, Brows und Begleitung bei Sidorela Isa.",
  alternates: { canonical: "/brautpaket" },
};

export default async function BrautpaketPage() {
  const [site, texts] = await Promise.all([getSite(), getTexts()]);
  return (
    <>
      <Header />
      <main>
        <BridalBuilder options={site.brideOptions} locations={site.locations} whatsapp={site.whatsapp} t={texts.brautpaket} />
      </main>
      <Footer />
    </>
  );
}
