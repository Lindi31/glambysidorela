// Startinhalte der Website. Sie erscheinen, solange in Sanity nichts Echtes steht,
// und werden von scripts/seed-content.ts auch nach Sanity geschrieben.
// Preise und Dauer bitte prüfen.
import { BOOKABLES } from "./booking"

export type CatalogTraining = {
  slug: string
  title: string
  level: string
  price?: number
  includes: string[]
  text: string
  seo: string
}

export type CatalogService = {
  slug: string
  title: string
  category: "lashes" | "brows" | "pmu" | "makeup" | "facial"
  short: string
  body: string[]
  duration: number
  priceFrom?: number
}

export const SERVICES: CatalogService[] = [
  {
    slug: "wimpernverlaengerung",
    title: "Wimpernverlängerung",
    category: "lashes",
    short: "Einzeln gesetzte Lashes für einen wachen, natürlichen Blick, ganz ohne Wimperntusche.",
    body: [
      "Jede Wimper wird einzeln gesetzt und auf deine Augenform abgestimmt. So entsteht ein Look, der zu dir passt: von dezent natürlich bis ausdrucksstark.",
      "Vor der Behandlung besprechen wir Länge, Schwung und Dichte. Danach bekommst du Pflegetipps, damit du lange Freude daran hast.",
    ],
    duration: 120,
    priceFrom: 89,
  },
  {
    slug: "volumen-lashes",
    title: "Volumen-Lashes",
    category: "lashes",
    short: "Feine Wimpernfächer für mehr Dichte und einen glamourösen Augenaufschlag.",
    body: [
      "Bei der Volumentechnik werden mehrere hauchfeine Wimpern zu einem Fächer verbunden. Das Ergebnis wirkt voll und bleibt trotzdem leicht.",
      "Ideal, wenn du mehr Ausdruck möchtest oder deine eigenen Wimpern eher fein sind.",
    ],
    duration: 150,
    priceFrom: 89,
  },
  {
    slug: "lash-lifting",
    title: "Lash Lifting",
    category: "lashes",
    short: "Deine eigenen Wimpern, schön geschwungen und optisch länger.",
    body: [
      "Beim Lash Lifting werden deine Naturwimpern vom Ansatz an in Form gebracht. Das öffnet den Blick, ganz ohne künstliche Wimpern.",
      "Perfekt für alle, die es unkompliziert und natürlich mögen.",
    ],
    duration: 90,
    priceFrom: 89,
  },
  {
    slug: "wimpern-auffuellen",
    title: "Wimpern auffüllen",
    category: "lashes",
    short: "Frisch aufgefüllt, damit dein Wimpernkranz wieder voll und gleichmäßig aussieht.",
    body: [
      "Ausgefallene Wimpern werden ersetzt und der Kranz wieder gleichmäßig aufgebaut. So bleibt dein Look durchgehend schön.",
      "Sprich mich gerne an, wenn du dir unsicher bist, wann der richtige Zeitpunkt ist.",
    ],
    duration: 70,
  },
  {
    slug: "brow-lamination",
    title: "Brow Lamination",
    category: "brows",
    short: "Styling und Färben für definierte, voll wirkende Augenbrauen.",
    body: [
      "Die Härchen werden in Form gebracht und fixiert. So wirken deine Brauen dichter und gepflegt, und das Styling am Morgen wird einfacher.",
      "Auf Wunsch kombinieren wir die Lamination mit Zupfen und Färben.",
    ],
    duration: 45,
    priceFrom: 39,
  },
  {
    slug: "microblading",
    title: "Microblading",
    category: "pmu",
    short: "Feine Härchenzeichnung für natürlich volle Augenbrauen, die morgens schon sitzen.",
    body: [
      "Mit einer feinen Klinge werden Härchen für Härchen in die oberste Hautschicht gezeichnet. Form und Farbe stimmen wir vorher gemeinsam ab.",
      "In einem persönlichen Gespräch klären wir, ob die Behandlung zu dir passt und was du davor und danach beachten solltest.",
    ],
    duration: 180,
    priceFrom: 349,
  },
  {
    slug: "powder-brows",
    title: "Powder Brows",
    category: "pmu",
    short: "Weich schattierte Augenbrauen mit einem Finish wie frisch gepudert.",
    body: [
      "Powder Brows wirken wie dezent geschminkt: weich im Verlauf und klar in der Form. Eine schöne Wahl, wenn du gerne definierte Brauen trägst.",
      "Form und Intensität besprechen wir vorab, damit das Ergebnis zu deinem Gesicht passt.",
    ],
    duration: 180,
    priceFrom: 349,
  },
  {
    slug: "lip-blush",
    title: "Lip Blush",
    category: "pmu",
    short: "Ein zarter Hauch Farbe für frisch wirkende, klar definierte Lippen.",
    body: [
      "Lip Blush betont die natürliche Lippenform mit einem sanften Farbschleier. Den Ton wählen wir gemeinsam passend zu deinem Hautton aus.",
      "In der Beratung erfährst du, wie die Behandlung abläuft und was du für die Heilung wissen solltest.",
    ],
    duration: 150,
    priceFrom: 349,
  },
  {
    slug: "braut-make-up",
    title: "Braut-Make-up",
    category: "makeup",
    short: "Dein Hochzeits-Look, der zu dir passt und den ganzen Tag begleitet.",
    body: [
      "An deinem großen Tag soll alles sitzen. Wir entwickeln einen Look, der zu dir, deinem Kleid und deiner Feier passt.",
      "Sprich mich früh an, damit dein Wunschtermin frei ist.",
    ],
    duration: 150,
    priceFrom: 129,
  },
  {
    slug: "event-make-up",
    title: "Event- und Fotoshooting-Make-up",
    category: "makeup",
    short: "Professionelles Make-up für Abende, besondere Anlässe und Kamera.",
    body: [
      "Ob Feier, Gala oder Fotoshooting: Das Make-up wird auf den Anlass, das Licht und deinen Stil abgestimmt.",
      "Bring gerne Bilder mit, die dir gefallen. Daraus entwickeln wir deinen Look.",
    ],
    duration: 60,
    priceFrom: 129,
  },
  {
    slug: "gesichtsbehandlung",
    title: "Gesichtsbehandlung",
    category: "facial",
    short: "Tiefenreinigung, Pflege und Glow-Treatment für ein frisches Hautgefühl.",
    body: [
      "Die Behandlung wird auf deine Haut abgestimmt: von der gründlichen Reinigung bis zur Pflege, die dir einen frischen Glow schenkt.",
      "Eine schöne Auszeit für dich und eine gute Vorbereitung auf besondere Anlässe.",
    ],
    duration: 60,
    priceFrom: 69,
  },
]

export const TRAININGS: CatalogTraining[] = [
  {
    slug: "lash-schulung",
    title: "Lash-Schulung",
    level: "Einsteiger",
    price: 499,
    includes: ["Theorie und Praxis", "Übung am Modell", "Starterset"],
    text: "In der Lash-Schulung lernst du das Handwerk der Wimpernverlängerung Schritt für Schritt: von den Grundlagen bis zur eigenen Arbeit am Modell.",
    seo: "Lash-Schulung bei Sidorela Isa in Bruchsal und Jülich: Theorie, Praxis am Modell und Starterset für deinen Einstieg als Lash-Artist.",
  },
  {
    slug: "pmu-schulung",
    title: "PMU-Schulung",
    level: "Fortgeschritten",
    includes: ["Theorie und Praxis", "Übung unter Anleitung", "Starterset"],
    text: "In der PMU-Schulung vertiefst du Technik, Farbe und Formgebung im Permanent Make-up. Ich zeige dir, worauf es in der täglichen Arbeit ankommt.",
    seo: "PMU-Schulung bei Sidorela Isa in Bruchsal und Jülich: Technik, Farbe und Formgebung im Permanent Make-up mit Praxis und Starterset.",
  },
]


export const QUIZ_WHY: Record<string, string> = {
  "lash-lifting": "Deine eigenen Wimpern, schön geschwungen. Dein Blick wirkt wach, ganz ohne künstliche Wimpern.",
  wimpernverlaengerung: "Einzeln gesetzte Wimpern, abgestimmt auf deine Augenform. Morgens brauchst du keine Tusche mehr.",
  "volumen-lashes": "Feine Fächer geben dir mehr Dichte und einen glamourösen Augenaufschlag.",
  "brow-lamination": "Deine Härchen werden in Form gebracht. So wirken die Brauen voller und das Styling geht schneller.",
  microblading: "Feine Härchenzeichnung für natürlich volle Brauen, die morgens schon sitzen.",
  "powder-brows": "Weich schattierte Brauen mit einem Finish wie frisch gepudert.",
  "lip-blush": "Ein zarter Farbschleier betont deine natürliche Lippenform.",
  gesichtsbehandlung: "Reinigung und Pflege, abgestimmt auf deine Haut, für einen frischen Glow.",
  "event-make-up": "Ein Look, der genau dann sitzt, wenn es darauf ankommt.",
  "braut-make-up": "Dein Hochzeits-Look, abgestimmt auf dich, dein Kleid und deine Feier.",
}

// Alte Testeinträge aus Sanity: werden nirgends mehr angezeigt.
export const LEGACY_TEST_IDS = [
  "2fc43fac-0aed-4b98-9e17-8e3657e558e8",
  "60832e86-604c-4433-a89f-0611f4aba93a",
  "7d6293ea-9943-4fed-826e-bcfce77bf91c",
  "d207050d-3990-42b4-8ec1-5ca09ca85ff1",
  "dc03b295-8ab9-4956-95f8-4132a423354f",
  "109c74e2-f208-458e-a927-fc94cd6f096e",
  "f27a0bff-dc00-43e7-96f1-115f72f91098",
  "21b78103-24b1-4511-a6b0-d069662b7e18",
]

export type SanityImageRef = { _type?: string; asset?: { _ref: string; _type?: string } }

export const textBlocks = (paragraphs: string[]) =>
  paragraphs.map((text, index) => ({
    _type: "block" as const,
    _key: `p${index}`,
    style: "normal" as const,
    markDefs: [],
    children: [{ _type: "span" as const, _key: `s${index}`, text, marks: [] }],
  }))

export const fallbackServices = () =>
  SERVICES.map((service, index) => ({
    _id: `service-${service.slug}`,
    title: service.title,
    slug: service.slug,
    category: service.category,
    shortDescription: service.short,
    description: textBlocks(service.body),
    duration: service.duration,
    priceFrom: service.priceFrom,
    order: index + 1,
    bookingOrder: BOOKABLES.findIndex((item) => item.id === service.slug) + 1,
    quizWhy: QUIZ_WHY[service.slug] ?? null,
    seoTitle: `${service.title} in Bruchsal und Jülich`,
    seoDescription: `${service.short} Bei Sidorela Isa in Bruchsal und Jülich. Jetzt Termin buchen.`,
    image: null as SanityImageRef | null,
    gallery: null as SanityImageRef[] | null,
    calcomEventType: (BOOKABLES.find((item) => item.id === service.slug)?.event ?? null) as string | null,
  }))

export const fallbackTrainings = () =>
  TRAININGS.map((training) => ({
    _id: `training-${training.slug}`,
    title: training.title,
    slug: training.slug,
    level: training.level,
    price: training.price ?? null,
    durationDays: null as number | null,
    includes: training.includes,
    description: textBlocks([training.text]),
    upcomingDates: null as { date?: string | null; location?: string | null; spotsLeft?: number | null }[] | null,
    image: null as SanityImageRef | null,
    seoTitle: `${training.title} in Bruchsal und Jülich`,
    seoDescription: training.seo,
  }))
