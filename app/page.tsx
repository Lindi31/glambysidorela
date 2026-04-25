import { AboutTeaser } from "@/components/ownui/AboutTeaser";
import { CtaBooking } from "@/components/ownui/CtaBooking";
import { Footer } from "@/components/ownui/Footer";
import { Header } from "@/components/ownui/Header";
import { Hero } from "@/components/ownui/Hero";
import { ServicesGrid } from "@/components/ownui/ServicesGrid";
import { TestimonialsSlider } from "@/components/ownui/TestimonialsSlider";
import { sanityFetch } from "@/sanity/lib/live";
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

const SERVICES_QUERY = defineQuery(`
  *[_type == "service"] | order(order asc) {
    _id, title, "slug": slug.current, category, shortDescription, priceFrom, image
  }
`)

const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] { clientCount }
`)

const ABOUT_QUERY = defineQuery(`
  *[_type == "aboutPage"][0] { heroImage }
`)

export default async function HomePage() {
  const [
    { data: testimonials },
    { data: services },
    { data: settings },
    { data: about },
  ] = await Promise.all([
    sanityFetch({ query: TESTIMONIALS_QUERY }),
    sanityFetch({ query: SERVICES_QUERY }),
    sanityFetch({ query: SETTINGS_QUERY }),
    sanityFetch({ query: ABOUT_QUERY }),
  ]);

  return (
    <>
      <Header />
      <main>
        <Hero clientCount={settings?.clientCount ?? null} />
        <ServicesGrid services={services} />
        <AboutTeaser heroImage={about?.heroImage ?? null} />
        <TestimonialsSlider testimonials={testimonials} />
        <CtaBooking />
      </main>
      <Footer />
    </>
  );
}
