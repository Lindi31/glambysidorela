import { Bento } from "@/components/home/Bento";
import { HeroStage } from "@/components/home/HeroStage";
import { Locations } from "@/components/home/Locations";
import { Statement } from "@/components/home/Statement";
import { TreatmentRail } from "@/components/home/TreatmentRail";
import { Credentials } from "@/components/ownui/Credentials";
import { CtaBooking } from "@/components/ownui/CtaBooking";
import { Footer } from "@/components/ownui/Footer";
import { Header } from "@/components/ownui/Header";
import { TestimonialsSlider } from "@/components/ownui/TestimonialsSlider";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Sidorela Isa - Beauty Studio & Academy | Lashes, Brows & PMU in Bruchsal & Jülich" },
  description:
    "Lash-Extensions, Brows, Permanent Make-up, Make-up und Schulungen von Sidorela Isa in Bruchsal (Region Karlsruhe) und Jülich (Großraum Aachen). Jetzt online Termin buchen.",
  alternates: { canonical: "/" },
};

const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(_createdAt desc) [0...6] {
    _id, name, text, rating, serviceCategory
  }
`);

export default async function HomePage() {
  const { data: testimonials } = await sanityFetch({ query: TESTIMONIALS_QUERY });

  return (
    <>
      <Header />
      <main>
        <HeroStage />
        <Statement />
        <section className="bg-cream px-5 pb-24 md:pb-36"><Credentials className="mx-auto max-w-[1000px]" /></section>
        <TreatmentRail />
        <Bento />
        <TestimonialsSlider testimonials={testimonials} />
        <Locations />
        <CtaBooking />
      </main>
      <Footer />
    </>
  );
}
