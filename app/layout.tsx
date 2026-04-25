import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SanityLive } from "@/sanity/lib/live";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GlamBySidorela – Lashes, Brows, PMU & Make-up in Bruchsal",
  description:
    "Professionelle Kosmetikbehandlungen und Schulungen von Sidorela Isa in Bruchsal und Jülich.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://glambysidorela.de",
  name: "GlamBySidorela",
  description:
    "Professionelle Lash-Extensions, Brows, Permanent Make-up, Make-up und Schulungen von Sidorela Isa in Bruchsal und Jülich.",
  url: "https://glambysidorela.de",
  telephone: "+4915252609602",
  email: "kontakt@glambysidorela.de",
  priceRange: "€€",
  image: "https://glambysidorela.de/hero.png",
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Bruchsal",
      addressRegion: "Baden-Württemberg",
      addressCountry: "DE",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Jülich",
      addressRegion: "Nordrhein-Westfalen",
      addressCountry: "DE",
    },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: ["https://www.instagram.com/glambysidorela"],
  areaServed: [
    { "@type": "City", name: "Bruchsal" },
    { "@type": "City", name: "Karlsruhe" },
    { "@type": "City", name: "Jülich" },
    { "@type": "City", name: "Aachen" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
        <SanityLive />
      </body>
    </html>
  );
}