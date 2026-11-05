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

export type ServiceFaq = { question: string; answer: string }

const LASH_PREPARE = "Komm bitte ohne Wimperntusche und Augen-Make-up. Kontaktlinsen nimmst du am besten vor der Behandlung heraus."
const LASH_AFTER = "In den ersten 24 Stunden bitte kein Wasser, Dampf oder Sauna an die Wimpern lassen. Danach möglichst keine ölhaltigen Produkte an den Augen verwenden."
const PMU_CHECK = "Bei Schwangerschaft, Stillzeit, Hauterkrankungen oder bestimmten Medikamenten sprich mich bitte vorher an. In der kostenlosen Beratung klären wir, ob die Behandlung für dich infrage kommt."
const PMU_PAIN = "Die meisten empfinden es als gut auszuhalten. Viele beschreiben es als leichtes Kratzen. Ich gehe in deinem Tempo vor."

// Inhalte für die Leistungsseiten. Bitte fachlich prüfen, in Sanity sind sie jederzeit änderbar.
export const SERVICE_DETAILS: Record<string, { lasts?: string; idealFor: string[]; faq: ServiceFaq[] }> = {
  wimpernverlaengerung: {
    lasts: "3 bis 4 Wochen",
    idealFor: [
      "du morgens Zeit sparen und auf Wimperntusche verzichten möchtest",
      "du dir einen wachen Blick ohne Schminken wünschst",
      "du von dezent bis ausdrucksstark alles offen hast",
    ],
    faq: [
      { question: "Wie lange hält das Ergebnis?", answer: "Deine Naturwimpern fallen laufend aus und mit ihnen die Extensions. Nach etwa 3 bis 4 Wochen ist Auffüllen sinnvoll, dann bleibt der Kranz gleichmäßig." },
      { question: "Schadet das meinen eigenen Wimpern?", answer: "Richtig gesetzt nicht. Jede Extension kommt auf eine einzelne Naturwimper, und Länge und Gewicht wähle ich passend zu deinen Wimpern." },
      { question: "Wie bereite ich mich vor?", answer: LASH_PREPARE },
      { question: "Was muss ich danach beachten?", answer: LASH_AFTER },
    ],
  },
  "volumen-lashes": {
    lasts: "3 bis 4 Wochen",
    idealFor: [
      "du mehr Dichte und einen glamourösen Look möchtest",
      "deine eigenen Wimpern eher fein oder licht sind",
      "dir die klassische Verlängerung zu dezent ist",
    ],
    faq: [
      { question: "Was ist der Unterschied zur klassischen Wimpernverlängerung?", answer: "Klassisch kommt eine Extension auf eine Naturwimper. Bei Volumen ist es ein Fächer aus mehreren hauchfeinen Wimpern. Das Ergebnis wirkt dichter und glamouröser." },
      { question: "Ist das nicht zu schwer für meine Wimpern?", answer: "Die Fächer bestehen aus besonders leichten Wimpern und werden passend zu deinen Naturwimpern gewählt." },
      { question: "Wie lange hält das Ergebnis?", answer: "Nach etwa 3 bis 4 Wochen ist Auffüllen sinnvoll, weil deine Naturwimpern laufend nachwachsen und ausfallen." },
      { question: "Was muss ich davor und danach beachten?", answer: `${LASH_PREPARE} ${LASH_AFTER}` },
    ],
  },
  "lash-lifting": {
    lasts: "6 bis 8 Wochen",
    idealFor: [
      "du keine künstlichen Wimpern tragen möchtest",
      "deine Wimpern gerade wachsen oder nach unten zeigen",
      "du es unkompliziert und natürlich magst",
    ],
    faq: [
      { question: "Was ist der Unterschied zur Wimpernverlängerung?", answer: "Beim Lifting bleiben es deine eigenen Wimpern, sie bekommen nur einen schönen Schwung. Bei der Verlängerung kommen künstliche Wimpern dazu." },
      { question: "Wie lange hält das Ergebnis?", answer: "Etwa 6 bis 8 Wochen, bis deine Wimpern nachgewachsen sind." },
      { question: "Darf ich danach noch Wimperntusche benutzen?", answer: "Ja, nach den ersten 24 Stunden. Viele brauchen sie dann aber gar nicht mehr." },
      { question: "Was muss ich davor und danach beachten?", answer: "Komm bitte ohne Augen-Make-up. In den ersten 24 Stunden bitte kein Wasser, Dampf oder Sauna an die Wimpern lassen." },
    ],
  },
  "wimpern-auffuellen": {
    lasts: "3 bis 4 Wochen",
    idealFor: [
      "du bereits Extensions trägst",
      "dein letzter Termin etwa 2 bis 4 Wochen her ist",
      "dein Wimpernkranz langsam lückenhaft wird",
    ],
    faq: [
      { question: "Wann sollte ich zum Auffüllen kommen?", answer: "Am besten nach 2 bis 4 Wochen. Ist es deutlich länger her, ist oft ein neues Set sinnvoller. Frag mich einfach, wenn du unsicher bist." },
      { question: "Was kostet das Auffüllen?", answer: "Das hängt davon ab, wie viel aufgefüllt werden muss. Schreib mir kurz, dann nenne ich dir den Preis." },
      { question: "Ich war vorher in einem anderen Studio. Geht das trotzdem?", answer: "Schick mir vorher am besten ein Foto per WhatsApp, dann schaue ich, ob Auffüllen möglich ist." },
      { question: "Wie bereite ich mich vor?", answer: "Komm bitte ohne Wimperntusche und mit sauberen Wimpern. So hält alles besser." },
    ],
  },
  "brow-lamination": {
    lasts: "4 bis 6 Wochen",
    idealFor: [
      "du voller wirkende Brauen ohne Permanent Make-up möchtest",
      "deine Härchen störrisch sind oder in verschiedene Richtungen wachsen",
      "du morgens beim Styling Zeit sparen möchtest",
    ],
    faq: [
      { question: "Was ist der Unterschied zu Microblading?", answer: "Bei der Lamination werden nur deine eigenen Härchen in Form gebracht, in die Haut wird nichts eingearbeitet. Microblading zeichnet dagegen feine Härchen langanhaltend ein." },
      { question: "Lohnt sich das auch bei sehr lichten Brauen?", answer: "Die Lamination braucht eigene Härchen. Bei sehr lichten Brauen zeige ich dir in der Beratung, was besser passt." },
      { question: "Wie lange hält das Ergebnis?", answer: "Etwa 4 bis 6 Wochen, je nach Haartyp und Pflege." },
      { question: "Was muss ich danach beachten?", answer: "In den ersten 24 Stunden bitte kein Wasser, Make-up oder Dampf an die Brauen lassen." },
    ],
  },
  microblading: {
    lasts: "1 bis 2 Jahre",
    idealFor: [
      "du morgens keine Brauen mehr nachziehen möchtest",
      "deine Brauen licht sind oder Lücken haben",
      "du einen natürlichen Härchen-Look möchtest",
    ],
    faq: [
      { question: "Tut das weh?", answer: PMU_PAIN },
      { question: "Wie läuft die Heilung ab?", answer: "In den ersten Tagen wirken die Brauen kräftiger, dann schuppt die Haut ab und die Farbe wird weicher. Nach etwa 4 bis 6 Wochen siehst du das endgültige Ergebnis. Dann ist meist eine Nacharbeit sinnvoll." },
      { question: "Microblading oder Powder Brows?", answer: "Microblading zeichnet einzelne Härchen und wirkt sehr natürlich. Powder Brows sind weich schattiert und wirken wie dezent geschminkt. In der Beratung schauen wir, was zu deiner Haut passt." },
      { question: "Kann das jede machen?", answer: PMU_CHECK },
    ],
  },
  "powder-brows": {
    lasts: "1 bis 3 Jahre",
    idealFor: [
      "du gerne definierte, dezent geschminkte Brauen trägst",
      "du morgens Zeit sparen möchtest",
      "du einen weichen Verlauf statt einzelner Härchen magst",
    ],
    faq: [
      { question: "Tut das weh?", answer: PMU_PAIN },
      { question: "Wie läuft die Heilung ab?", answer: "In den ersten Tagen wirkt die Farbe kräftiger, dann schuppt die Haut ab und alles wird weicher. Nach etwa 4 bis 6 Wochen siehst du das endgültige Ergebnis. Dann ist meist eine Nacharbeit sinnvoll." },
      { question: "Powder Brows oder Microblading?", answer: "Powder Brows sind weich schattiert und wirken wie dezent geschminkt. Microblading zeichnet einzelne Härchen. Bei eher fettiger Haut halten Powder Brows oft besser." },
      { question: "Kann das jede machen?", answer: PMU_CHECK },
    ],
  },
  "lip-blush": {
    lasts: "1 bis 3 Jahre",
    idealFor: [
      "du dir mehr Farbe auf den Lippen wünschst, auch ohne Lippenstift",
      "deine Lippenkontur eher blass ist",
      "du einen frischen, natürlichen Look magst",
    ],
    faq: [
      { question: "Sieht das aus wie Lippenstift?", answer: "Nein, eher wie ein zarter Farbschleier. Den Ton wählen wir passend zu deinem Hautton aus, die Intensität besprechen wir vorher." },
      { question: "Tut das weh?", answer: "Die Lippen sind empfindlicher als die Brauen, die meisten empfinden es aber als gut auszuhalten. Ich gehe in deinem Tempo vor." },
      { question: "Wie läuft die Heilung ab?", answer: "Direkt danach wirkt die Farbe kräftiger und die Lippen können etwas anschwellen. Nach einigen Tagen schuppen sie leicht, nach etwa 4 bis 6 Wochen siehst du das endgültige Ergebnis." },
      { question: "Kann das jede machen?", answer: `${PMU_CHECK} Das gilt auch, wenn du zu Lippenherpes neigst.` },
    ],
  },
  "braut-make-up": {
    lasts: "Den ganzen Tag",
    idealFor: [
      "du an deinem großen Tag strahlen möchtest, ohne an dein Make-up zu denken",
      "dein Look zu dir, deinem Kleid und deiner Feier passen soll",
      "du dir vorher Sicherheit wünschst und den Look ausprobieren möchtest",
    ],
    faq: [
      { question: "Gibt es einen Probe-Termin?", answer: "Ja. Beim Probe-Termin finden wir deinen Look in Ruhe vor dem großen Tag. Du kannst ihn direkt im Brautpaket mit auswählen." },
      { question: "Wie früh sollte ich buchen?", answer: "So früh wie möglich, gerade für die Hochzeitssaison. Schreib mir am besten, sobald euer Datum steht." },
      { question: "Was soll ich mitbringen?", answer: "Bilder von Looks, die dir gefallen, und ein Foto von deinem Kleid. Das hilft uns sehr." },
      { question: "Hält das Make-up wirklich den ganzen Tag?", answer: "Es wird genau dafür aufgebaut und fixiert, damit es von der Trauung bis zum Tanz sitzt und auch auf den Fotos schön aussieht." },
    ],
  },
  "event-make-up": {
    lasts: "Den ganzen Abend",
    idealFor: [
      "du zu einer Feier, Gala oder einem besonderen Abend gehst",
      "du vor der Kamera stehst und auf Fotos perfekt aussehen möchtest",
      "du dich einfach mal professionell schminken lassen möchtest",
    ],
    faq: [
      { question: "Wie soll ich zum Termin kommen?", answer: "Mit frisch gereinigter, gepflegter Haut und am besten ohne Make-up." },
      { question: "Was soll ich mitbringen?", answer: "Bilder von Looks, die dir gefallen, und gern ein Foto von deinem Outfit." },
      { question: "Wirkt das Make-up auf Fotos anders?", answer: "Ja, deshalb stimmen wir Produkte und Intensität auf Kamera, Licht und Anlass ab. Sag mir einfach vorher, wofür du es brauchst." },
      { question: "Wann sollte der Termin sein?", answer: "Plane ihn so, dass du danach noch in Ruhe Zeit zum Anziehen und für die Anfahrt hast." },
    ],
  },
  gesichtsbehandlung: {
    idealFor: [
      "deine Haut müde oder fahl wirkt",
      "du dir eine ruhige Auszeit gönnen möchtest",
      "du vor einem besonderen Anlass frisch aussehen möchtest",
    ],
    faq: [
      { question: "Für welchen Hauttyp ist das geeignet?", answer: "Die Behandlung wird auf deine Haut abgestimmt. Empfindlichkeiten oder Allergien sag mir bitte vorher." },
      { question: "Wie oft ist eine Behandlung sinnvoll?", answer: "Für ein schönes Ergebnis etwa alle 4 bis 6 Wochen. Sie ist aber auch einzeln eine schöne Auszeit." },
      { question: "Wann vor einem besonderen Anlass?", answer: "Am besten ein paar Tage vorher, damit sich deine Haut in Ruhe erholen kann." },
      { question: "Darf ich mich danach schminken?", answer: "Am besten gönnst du deiner Haut für den Rest des Tages eine Pause." },
    ],
  },
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
    lasts: (SERVICE_DETAILS[service.slug]?.lasts ?? null) as string | null,
    idealFor: (SERVICE_DETAILS[service.slug]?.idealFor ?? null) as string[] | null,
    faq: (SERVICE_DETAILS[service.slug]?.faq ?? null) as ServiceFaq[] | null,
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
