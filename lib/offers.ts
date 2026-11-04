// Angebote der Startseite und der interaktiven Seiten.
// "ab"-Preise bitte prüfen. Shop-Artikel sind ausdrücklich nur Beispiele.

export const BERATUNG_HREF = "/termin?behandlung=beratung";
export const ERSTGESPRAECH_HREF = "/termin?behandlung=schulung-beratung";

export type TreatmentId = "lashes" | "brows" | "pmu" | "makeup" | "facial";

export const TREATMENTS: { id: TreatmentId; title: string; line: string; from: number }[] = [
  { id: "lashes", title: "Lashes", line: "Wimpernverlängerung, Volumen und Lifting für einen wachen Blick.", from: 89 },
  { id: "brows", title: "Brows", line: "Lamination, Styling und Färben für definierte, volle Brauen.", from: 39 },
  { id: "pmu", title: "Permanent Make-up", line: "Microblading, Powder Brows und Lip Blush.", from: 349 },
  { id: "makeup", title: "Make-up", line: "Für deine Hochzeit, Events und Fotoshootings.", from: 129 },
  { id: "facial", title: "Gesichtsbehandlung", line: "Tiefenreinigung, Pflege und Glow für deine Haut.", from: 69 },
];

export const GIFT_AMOUNTS = [50, 100, 150, 250];

export const BRIDE_OPTIONS = [
  { id: "probe", title: "Probe-Termin", detail: "Wir finden deinen Look in Ruhe vor dem großen Tag.", price: null },
  { id: "makeup", title: "Braut-Make-up", detail: "Am Hochzeitstag, abgestimmt auf dich und dein Kleid.", price: 129 },
  { id: "lashes", title: "Lashes", detail: "Für einen wachen Blick, auch auf jedem Foto.", price: 89 },
  { id: "brows", title: "Brows", detail: "Definierte Brauen, die den ganzen Tag sitzen.", price: 39 },
  { id: "haut", title: "Gesichtsbehandlung", detail: "Frische Haut in den Tagen vor der Hochzeit.", price: 69 },
];

export const SHOP_EXAMPLES = [
  { id: "shampoo", title: "Lash Shampoo", detail: "Sanfte Reinigung für deine Wimpern.", price: 14, shape: "pump" },
  { id: "serum", title: "Wimpernserum", detail: "Tägliche Pflege für Wimpern und Brauen.", price: 39, shape: "serum" },
  { id: "balm", title: "PMU Aftercare Balm", detail: "Pflege für die Zeit nach dem Termin.", price: 19, shape: "tube" },
  { id: "gel", title: "Brow Gel", detail: "Hält deine Brauen den ganzen Tag in Form.", price: 22, shape: "wand" },
] as const;

export type QuizResult = { title: string; slug: string; from: number; why: string };

export const QUIZ_QUESTIONS = [
  {
    key: "wish",
    question: "Was wünschst du dir am meisten?",
    answers: [
      { value: "augen", label: "Einen wacheren Blick" },
      { value: "brauen", label: "Brauen, die morgens schon sitzen" },
      { value: "lippen", label: "Frische Farbe auf den Lippen" },
      { value: "haut", label: "Haut, die strahlt" },
      { value: "anlass", label: "Einen Look für einen besonderen Tag" },
    ],
  },
  {
    key: "dauer",
    question: "Wie lange soll es halten?",
    answers: [
      { value: "tag", label: "Für einen Tag" },
      { value: "wochen", label: "Einige Wochen" },
      { value: "lange", label: "So lange wie möglich" },
    ],
  },
  {
    key: "stil",
    question: "Wie magst du es?",
    answers: [
      { value: "dezent", label: "Kaum sichtbar, einfach frischer" },
      { value: "natuerlich", label: "Sichtbar, aber natürlich" },
      { value: "stark", label: "Gerne ausdrucksstark" },
    ],
  },
] as const;

const RESULTS = {
  lifting: { title: "Lash Lifting", slug: "lash-lifting", from: 89, why: "Deine eigenen Wimpern, schön geschwungen. Dein Blick wirkt wach, ganz ohne künstliche Wimpern." },
  extensions: { title: "Wimpernverlängerung", slug: "wimpernverlaengerung", from: 89, why: "Einzeln gesetzte Wimpern, abgestimmt auf deine Augenform. Morgens brauchst du keine Tusche mehr." },
  volumen: { title: "Volumen-Lashes", slug: "volumen-lashes", from: 89, why: "Feine Fächer geben dir mehr Dichte und einen glamourösen Augenaufschlag." },
  lamination: { title: "Brow Lamination", slug: "brow-lamination", from: 39, why: "Deine Härchen werden in Form gebracht. So wirken die Brauen voller und das Styling geht schneller." },
  microblading: { title: "Microblading", slug: "microblading", from: 349, why: "Feine Härchenzeichnung für natürlich volle Brauen, die morgens schon sitzen." },
  powder: { title: "Powder Brows", slug: "powder-brows", from: 349, why: "Weich schattierte Brauen mit einem Finish wie frisch gepudert." },
  lip: { title: "Lip Blush", slug: "lip-blush", from: 349, why: "Ein zarter Farbschleier betont deine natürliche Lippenform." },
  facial: { title: "Gesichtsbehandlung", slug: "gesichtsbehandlung", from: 69, why: "Reinigung und Pflege, abgestimmt auf deine Haut, für einen frischen Glow." },
  event: { title: "Event-Make-up", slug: "event-make-up", from: 129, why: "Ein Look, der genau dann sitzt, wenn es darauf ankommt." },
  braut: { title: "Braut-Make-up", slug: "braut-make-up", from: 129, why: "Dein Hochzeits-Look, abgestimmt auf dich, dein Kleid und deine Feier." },
} satisfies Record<string, QuizResult>;

export function quizResult(wish: string, dauer: string, stil: string): QuizResult {
  if (wish === "anlass") return dauer === "tag" ? RESULTS.event : RESULTS.braut;
  if (wish === "haut") return RESULTS.facial;
  if (wish === "lippen") return dauer === "tag" ? RESULTS.event : RESULTS.lip;
  if (wish === "brauen") {
    if (dauer !== "lange") return RESULTS.lamination;
    return stil === "stark" ? RESULTS.powder : RESULTS.microblading;
  }
  if (dauer === "tag") return RESULTS.event;
  if (stil === "dezent") return RESULTS.lifting;
  return stil === "stark" ? RESULTS.volumen : RESULTS.extensions;
}
