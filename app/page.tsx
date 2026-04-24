import { AboutTeaser } from "@/components/ownui/AboutTeaser";
import { CtaBooking } from "@/components/ownui/CtaBooking";
import { Footer } from "@/components/ownui/Footer";
import { Header } from "@/components/ownui/Header";
import { Hero } from "@/components/ownui/Hero";
import { ServicesGrid } from "@/components/ownui/ServicesGrid";
import { TestimonialsSlider } from "@/components/ownui/TestimonialsSlider";
import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GlamBySidorela – Lashes, Brows, PMU & Make-up in Bruchsal & Jülich",
  description:
    "Professionelle Lash-Extensions, Brows, Permanent Make-up, Make-up und Schulungen von Sidorela Isa – in Bruchsal (Region Karlsruhe) und Jülich (Großraum Aachen).",
  openGraph: {
    title: "GlamBySidorela – Beauty-Artistry & Schulungen",
    description:
      "Deine Schönheit, perfekt inszeniert. Lashes, Brows, PMU, Make-up und Gesichtsbehandlungen in Bruchsal und Jülich.",
    type: "website",
    locale: "de_DE",
  },
};

const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(_createdAt desc) [0...6] {
    _id, name, text, rating, serviceCategory
  }
`)

export default async function HomePage() {
  const testimonials = await client.fetch(TESTIMONIALS_QUERY).catch(() => []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesGrid />
        <AboutTeaser />
        <TestimonialsSlider testimonials={testimonials} />
        <CtaBooking />
      </main>
      <Footer />
    </>
  );
}
