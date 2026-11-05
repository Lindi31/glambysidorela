// Was online buchbar ist. event = Termintyp in Cal.com, null = Anfrage per Formular.
export type Bookable = {
  id: string; // entspricht dem Slug der Leistung
  title: string;
  minutes: number;
  from: number | null;
  event: string | null;
};

export const BOOKABLES: Bookable[] = [
  { id: "wimpernverlaengerung", title: "Wimpernverlängerung", minutes: 120, from: 89, event: "wimpern-neu" },
  { id: "wimpern-auffuellen", title: "Wimpern auffüllen", minutes: 70, from: null, event: "wimpern-auffuellen" },
  { id: "lash-lifting", title: "Lash Lifting", minutes: 90, from: 89, event: "lash-lifting" },
  { id: "volumen-lashes", title: "Volumen-Lashes", minutes: 150, from: 89, event: "volumen-lashes" },
  { id: "brow-lamination", title: "Brow Lamination", minutes: 45, from: 39, event: "brow-lamination" },
  { id: "microblading", title: "Microblading", minutes: 180, from: 349, event: "microblading" },
  { id: "powder-brows", title: "Powder Brows", minutes: 180, from: 349, event: "powder-brows" },
  { id: "lip-blush", title: "Lip Blush", minutes: 150, from: 349, event: null },
  { id: "braut-make-up", title: "Braut-Make-up", minutes: 150, from: 129, event: "braut-makeup" },
  { id: "event-make-up", title: "Event- und Fotoshooting-Make-up", minutes: 60, from: 129, event: "event-make-up" },
  { id: "gesichtsbehandlung", title: "Gesichtsbehandlung", minutes: 60, from: 69, event: "gesichtsbehandlung" },
  { id: "beratung", title: "Kostenlose Beratung", minutes: 30, from: 0, event: "30min" },
  { id: "schulung-beratung", title: "Erstgespräch zur Schulung", minutes: 30, from: 0, event: "schulung-beratung" },
];

export const BOOKABLE_EVENTS = BOOKABLES.flatMap((item) => (item.event ? [item.event] : []));

export const CAL_API = "https://api.cal.com/v2";
export const CAL_USERNAME = process.env.CAL_USERNAME ?? "sidorelaisa";
