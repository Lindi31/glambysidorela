// Strukturierte Daten (schema.org). Bewusst ohne Bewertungen: Die kommen erst, wenn echte da sind.
import { CATEGORY_LABELS, LOCATIONS, SITE, SITE_URL, type SiteLocation } from "./site";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const IMAGE = `${SITE_URL}/hero.png`;

export const salonId = (location: SiteLocation) => `${SITE_URL}/standorte/${location.slug}#salon`;

export function salonNode(location: SiteLocation, site: { email: string; phone: string; instagram: string } = SITE) {
  return {
    "@type": "BeautySalon",
    "@id": salonId(location),
    name: location.slug === "bruchsal" ? SITE.name : `${SITE.name} ${location.city}`,
    url: `${SITE_URL}/standorte/${location.slug}`,
    parentOrganization: { "@id": ORGANIZATION_ID },
    description: `Lashes, Brows, Permanent Make-up, Make-up und Gesichtsbehandlungen in ${location.city}.`,
    image: IMAGE,
    telephone: site.phone,
    email: site.email,
    priceRange: "€€",
    hasMap: location.mapsUrl,
    sameAs: [site.instagram],
    address: {
      "@type": "PostalAddress",
      streetAddress: location.street,
      postalCode: location.postalCode,
      addressLocality: location.city,
      addressRegion: location.regionName,
      addressCountry: "DE",
    },
    areaServed: [location.city, ...location.nearby].map((name) => ({ "@type": "City", name })),
    // Jülich hat nur Termine nach Vereinbarung, darum dort keine festen Zeiten.
    ...(location.slug === "bruchsal"
      ? {
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        }
      : {}),
  };
}

export function siteGraph(locations: SiteLocation[] = LOCATIONS, site: { email: string; phone: string; instagram: string } = SITE) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE.name,
        url: SITE_URL,
        image: IMAGE,
        email: site.email,
        telephone: site.phone,
        founder: { "@type": "Person", name: SITE.owner },
        sameAs: [site.instagram],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE.name,
        url: SITE_URL,
        inLanguage: "de-DE",
        publisher: { "@id": ORGANIZATION_ID },
      },
      ...locations.map((location) => salonNode(location, site)),
    ],
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Start", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

type ServiceInput = {
  title: string;
  slug: string;
  category?: string | null;
  shortDescription?: string | null;
  priceFrom?: number | null;
  image?: string | null;
};

export function serviceSchema(service: ServiceInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    url: `${SITE_URL}/leistungen/${service.slug}`,
    description: service.shortDescription ?? undefined,
    serviceType: service.category ? CATEGORY_LABELS[service.category] : undefined,
    image: service.image ?? undefined,
    provider: LOCATIONS.map((location) => ({ "@id": salonId(location) })),
    areaServed: LOCATIONS.map((location) => ({ "@type": "City", name: location.city })),
    ...(service.priceFrom
      ? {
          offers: {
            "@type": "Offer",
            url: `${SITE_URL}/leistungen/${service.slug}`,
            availability: "https://schema.org/InStock",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: service.priceFrom,
              priceCurrency: "EUR",
            },
          },
        }
      : {}),
  };
}

type TrainingInput = {
  title: string;
  slug: string;
  seoDescription?: string | null;
  price?: number | null;
  durationDays?: number | null;
  upcomingDates?: { date?: string | null; location?: string | null }[] | null;
};

export function courseSchema(training: TrainingInput, description: string) {
  const url = `${SITE_URL}/schulungen/${training.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: training.title,
    description,
    url,
    inLanguage: "de-DE",
    provider: { "@id": ORGANIZATION_ID },
    ...(training.price
      ? {
          offers: {
            "@type": "Offer",
            category: "Paid",
            url,
            price: training.price,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
    hasCourseInstance: (training.upcomingDates ?? [])
      .filter((entry) => entry.date)
      .map((entry) => ({
        "@type": "CourseInstance",
        courseMode: entry.location === "Online" ? "Online" : "Onsite",
        startDate: entry.date,
        ...(training.durationDays ? { courseWorkload: `P${training.durationDays}D` } : {}),
        ...(entry.location && entry.location !== "Online"
          ? { location: { "@type": "Place", name: entry.location } }
          : {}),
      })),
  };
}
