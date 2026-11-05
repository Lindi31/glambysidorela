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

export function quizResult(wish: string, dauer: string, stil: string): string {
  if (wish === "anlass") return dauer === "tag" ? "event-make-up" : "braut-make-up";
  if (wish === "haut") return "gesichtsbehandlung";
  if (wish === "lippen") return dauer === "tag" ? "event-make-up" : "lip-blush";
  if (wish === "brauen") {
    if (dauer !== "lange") return "brow-lamination";
    return stil === "stark" ? "powder-brows" : "microblading";
  }
  if (dauer === "tag") return "event-make-up";
  if (stil === "dezent") return "lash-lifting";
  return stil === "stark" ? "volumen-lashes" : "wimpernverlaengerung";
}
