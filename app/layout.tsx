import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SanityLive } from "@/sanity/lib/live";
import { JsonLd } from "@/components/ownui/JsonLd";
import { WhatsAppFloat } from "@/components/ownui/WhatsAppFloat";
import { siteGraph } from "@/lib/schema";
import { SITE, SITE_URL } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name}: Lashes, Brows & Permanent Make-up in Bruchsal & Jülich`,
    template: `%s | ${SITE.shortName} Beauty Studio & Academy`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.owner }],
  creator: SITE.owner,
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: SITE.name,
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#2C2826",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        <JsonLd data={siteGraph()} />
        <Providers>{children}</Providers>
        <WhatsAppFloat />
        <SanityLive />
      </body>
    </html>
  );
}
