export type ServiceCategory = {
  slug: string;
  title: string;
  shortDescription: string;
  icon: "lashes" | "brows" | "pmu" | "makeup" | "facial";
  priceFrom?: number;
};

export const services: ServiceCategory[] = [
  {
    slug: "lashes",
    title: "Lashes",
    shortDescription:
      "Wimpernverlängerung, Volumen-Lashes und Lash Lifting für einen wachen, natürlichen Blick.",
    icon: "lashes",
    priceFrom: 89,
  },
  {
    slug: "brows",
    title: "Brows",
    shortDescription:
      "Brow Lamination, Styling und Färben für perfekt definierte, volle Augenbrauen.",
    icon: "brows",
    priceFrom: 39,
  },
  {
    slug: "pmu",
    title: "Permanent Make-up",
    shortDescription:
      "Microblading, Powder Brows und Lip Blush – langanhaltende Schönheit, individuell angepasst.",
    icon: "pmu",
    priceFrom: 349,
  },
  {
    slug: "makeup",
    title: "Make-up",
    shortDescription:
      "Braut-, Event- und Fotoshooting-Make-up, das den ganzen Tag (und länger) hält.",
    icon: "makeup",
    priceFrom: 129,
  },
  {
    slug: "gesichtsbehandlungen",
    title: "Gesichtsbehandlungen",
    shortDescription:
      "Tiefenreinigung, Pflege und Glow-Treatments für eine strahlende, gepflegte Haut.",
    icon: "facial",
    priceFrom: 69,
  },
  {
    slug: "schulungen",
    title: "Schulungen",
    shortDescription:
      "Professionelle Ausbildungen für angehende Lash- und PMU-Artists – inkl. Starterset.",
    icon: "lashes",
    priceFrom: 499,
  },
];

export const locations = [
  {
    city: "Bruchsal",
    region: "Region Karlsruhe",
    hours: "Mo–Fr: 9:00–18:00 · Sa nach Vereinbarung",
  },
  {
    city: "Jülich",
    region: "Großraum Aachen / Düren",
    hours: "Nach Vereinbarung",
  },
];
