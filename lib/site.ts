// Zentrale Geschäftsdaten: überall gleich = wichtig für lokales SEO (Name, Adresse, Telefon).

// Nach dem Domain-Wechsel in Vercel SITE_URL=https://www.sidorelaisa.de setzen.
export const SITE_URL = (process.env.SITE_URL ?? "https://www.glambysidorela.de").replace(/\/$/, "");

export type SiteLocation = {
  slug: "bruchsal" | "juelich";
  city: string;
  region: string;
  regionName: string;
  street: string;
  postalCode: string;
  hours: string;
  nearby: string[];
  mapsUrl: string;
  reviewUrl: string | null; // Google-Bewertungslink, sobald das Unternehmensprofil steht
};

export const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const SITE = {
  // Exakt wie im Google-Unternehmensprofil, wichtig für lokales SEO.
  name: "Sidorela Isa - Beauty Studio & Academy",
  shortName: "Sidorela Isa",
  owner: "Sidorela Isa",
  url: SITE_URL,
  email: "kontakt@glambysidorela.de",
  phone: "+4915252609602",
  phoneDisplay: "+49 1525 2609602",
  whatsapp: "4915252609602",
  instagram: "https://www.instagram.com/sidorelaisa",
  instagramHandle: "@sidorelaisa",
  description:
    "Sidorela Isa - Beauty Studio & Academy: Lash-Extensions, Brows, Permanent Make-up, Make-up, Gesichtsbehandlungen und Schulungen in Bruchsal und Jülich.",
};

// Aus Sidorelas Instagram-Profil, bitte aktuell halten.
export const CREDENTIALS = [
  { value: "9 Jahre", label: "Bridal Make-up" },
  { value: "6 Jahre", label: "Lash Artist" },
  { value: "Official MUA", label: "KIKO Milano" },
];

export const LOCATIONS: SiteLocation[] = [
  {
    slug: "bruchsal",
    city: "Bruchsal",
    region: "Region Karlsruhe",
    regionName: "Baden-Württemberg",
    street: "Spöckweg 14",
    postalCode: "76646",
    hours: "Mo–Fr: 9:00–18:00, Sa nach Vereinbarung",
    nearby: ["Karlsruhe", "Bretten", "Bad Schönborn", "Forst", "Ubstadt-Weiher", "Kraichtal"],
    mapsUrl: mapsUrl("Sidorela Isa - Beauty Studio & Academy, Spöckweg 14, 76646 Bruchsal"),
    reviewUrl: "https://www.google.com/search?q=Sidorela+Isa+-+Beauty+Studio+%26+Academy",
  },
  {
    slug: "juelich",
    city: "Jülich",
    region: "Großraum Aachen / Düren",
    regionName: "Nordrhein-Westfalen",
    street: "Gartenstraße 1 C",
    postalCode: "52428",
    hours: "Nach Vereinbarung",
    nearby: ["Aachen", "Düren", "Linnich", "Titz", "Aldenhoven", "Inden"],
    mapsUrl: mapsUrl("Gartenstraße 1 C, 52428 Jülich"),
    reviewUrl: null,
  },
];

export const whatsappUrl = (text?: string, number: string = SITE.whatsapp) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const CATEGORY_LABELS: Record<string, string> = {
  lashes: "Lashes",
  brows: "Brows",
  pmu: "Permanent Make-up",
  makeup: "Make-up",
  facial: "Gesichtsbehandlungen",
};
