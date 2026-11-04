"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { pageShell } from "@/components/ownui/PageIntro";
import { pillClass } from "@/components/ownui/Pill";
import { fieldClass, labelClass, useRequest } from "@/components/ownui/useRequest";
import { BOOKABLES, type Bookable } from "@/lib/booking";
import { LOCATIONS, SITE, whatsappUrl, type SiteLocation } from "@/lib/site";
import { SlotPicker, formatDay, formatTime } from "./SlotPicker";

const WISHES = ["Vormittags", "Nachmittags", "Am Wochenende"];
const title = "text-balance font-display text-[clamp(40px,6vw,72px)] leading-[1] tracking-[-0.022em] text-charcoal";
const lead = "mt-4 max-w-[34em] text-[17px] leading-snug text-charcoal/75 md:text-[19px]";
const choice = "flex min-h-[72px] w-full items-center justify-between gap-5 rounded-2xl bg-white px-6 py-3 text-left text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-cream";

type Props = { event?: string; initialTreatment?: string; initialPlace?: string };

const priceLabel = (item: Bookable) => (item.from === 0 ? "kostenlos" : item.from ? `ab ${item.from} €` : "Preis auf Anfrage");

function Chip({ label, value, onChange }: { label: string; value: string; onChange: () => void }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white py-1 pl-4 pr-1 text-[14px]">
      <dt className="sr-only">{label}</dt>
      <dd className="font-medium text-charcoal">{value}</dd>
      <button type="button" onClick={onChange} aria-label={`${label} ändern`} className="min-h-9 rounded-full px-3 text-charcoal/75 underline underline-offset-4">Ändern</button>
    </div>
  );
}

// Damit der Termin mit einem Tipp im eigenen Kalender landet.
function calendarFile(item: Bookable, place: SiteLocation, start: string) {
  const stamp = (date: Date) => date.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const from = new Date(start);
  const to = new Date(from.getTime() + item.minutes * 60_000);
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Sidorela Isa Beauty Studio//DE", "BEGIN:VEVENT",
    `UID:${stamp(from)}@glambysidorela.de`, `DTSTAMP:${stamp(new Date())}`, `DTSTART:${stamp(from)}`, `DTEND:${stamp(to)}`,
    `SUMMARY:${item.title} bei ${SITE.name}`, `LOCATION:${place.street}\\, ${place.postalCode} ${place.city}`,
    "END:VEVENT", "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

export function BookingFlow({ event, initialTreatment, initialPlace }: Props) {
  const start = useMemo(
    () => BOOKABLES.find((item) => item.id === initialTreatment || (event && item.event === event)) ?? null,
    [event, initialTreatment],
  );
  const [treatment, setTreatment] = useState<Bookable | null>(start);
  const [place, setPlace] = useState<SiteLocation | null>(LOCATIONS.find((item) => item.slug === initialPlace) ?? null);
  const [slot, setSlot] = useState<string | null>(null);
  const [editing, setEditing] = useState<"treatment" | "place" | null>(null);
  const [booking, setBooking] = useState<"idle" | "sending" | "done" | "taken" | "error">("idle");
  const [reloadKey, setReloadKey] = useState(0);
  const request = useRequest();

  // In Jülich und bei Behandlungen ohne Termintyp läuft es über eine Anfrage.
  const needsRequest = Boolean(treatment && place && (!treatment.event || place.slug === "juelich"));

  const step = editing === "treatment" || !treatment ? 1 : editing === "place" || !place ? 2 : !slot && !needsRequest ? 3 : 4;
  const steps = needsRequest ? 3 : 4;
  const shownStep = needsRequest && step === 4 ? 3 : step;
  const finished = booking === "done" || request.status === "done";

  // Jeder neue Schritt beginnt oben, wichtig vor allem am Handy.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [step, finished]);

  const chooseTreatment = (item: Bookable) => { setTreatment(item); setSlot(null); setEditing(null); };
  const choosePlace = (item: SiteLocation) => { setPlace(item); setSlot(null); setEditing(null); };

  const submitRequest = (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    const form = new FormData(formEvent.currentTarget);
    request.send({ type: "termin", treatment: treatment?.title, location: place?.city, wish: form.get("wish"), name: form.get("name"), email: form.get("email"), website: form.get("website") });
  };

  const submitBooking = async (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    const form = new FormData(formEvent.currentTarget);
    setBooking("sending");
    try {
      const res = await fetch("/api/termine/buchen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: treatment?.event,
          start: slot,
          location: `${place?.street}, ${place?.postalCode} ${place?.city}`,
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone") || undefined,
          notes: form.get("notes") || undefined,
          website: form.get("website") || undefined,
        }),
      });
      if (res.ok) return setBooking("done");
      const body = (await res.json().catch(() => ({}))) as { taken?: boolean };
      if (body.taken) {
        setBooking("taken");
        setSlot(null);
        setReloadKey((value) => value + 1);
      } else {
        setBooking("error");
      }
    } catch {
      setBooking("error");
    }
  };

  if (finished && treatment && place) {
    return (
      <div className={`${pageShell} step-in flex min-h-[60svh] flex-col items-center justify-center text-center`}>
        <svg aria-hidden viewBox="0 0 220 120" fill="none" className="w-[220px] overflow-visible">
          <path className="ring-light" pathLength={1} d="M6 116 A104 110 0 0 1 214 116" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <h1 className={`${title} mt-4`}>{booking === "done" ? "Dein Termin steht." : "Deine Anfrage ist da."}</h1>
        {booking === "done" && slot ? (
          <>
            <p className="mt-5 text-[19px] leading-snug text-charcoal">{treatment.title}<br />{formatDay(slot)}, {formatTime(slot)} Uhr<br />{place.street}, {place.postalCode} {place.city}</p>
            <p className="mt-4 text-[15px] text-charcoal/75">Die Bestätigung kommt gleich per E-Mail.</p>
            <a href={calendarFile(treatment, place, slot)} download="termin-sidorela-isa.ics" className={pillClass("dark", "mt-7")}>In meinen Kalender</a>
          </>
        ) : (
          <p className={`${lead} mx-auto`}>Sidorela meldet sich mit einem festen Termin für {treatment.title} in {place.city} bei dir.</p>
        )}
        <Link href="/" className="mt-3 inline-flex min-h-11 items-center text-[15px] font-medium text-charcoal underline underline-offset-4">Zur Startseite</Link>
      </div>
    );
  }

  return (
    <div className={pageShell}>
      <div className="flex gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={steps} aria-valuenow={shownStep} aria-label="Fortschritt">
        {Array.from({ length: steps }).map((_, index) => (
          <span key={index} className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${index < shownStep ? "bg-charcoal" : "bg-charcoal/15"}`} />
        ))}
      </div>

      {step > 1 && (
        <dl className="mt-5 flex flex-wrap gap-2">
          {treatment && <Chip label="Behandlung" value={treatment.title} onChange={() => setEditing("treatment")} />}
          {place && step > 2 && <Chip label="Standort" value={place.city} onChange={() => setEditing("place")} />}
          {slot && step === 4 && !needsRequest && <Chip label="Termin" value={`${formatDay(slot)}, ${formatTime(slot)} Uhr`} onChange={() => setSlot(null)} />}
        </dl>
      )}

      {step === 1 && (
        <section key="treatment" className="step-in mx-auto mt-10 max-w-[820px] md:mt-14">
          <h1 className={title}>Was darf ich für dich tun?</h1>
          <div className="mt-8 flex flex-col gap-2">
            {BOOKABLES.map((item) => (
              <button key={item.id} type="button" onClick={() => chooseTreatment(item)} className={choice}>
                <span className="min-w-0 font-display text-[clamp(24px,3vw,28px)] leading-[1.05] tracking-[-0.012em]">{item.title}</span>
                <span className="flex-none text-right text-[14px] font-medium leading-tight md:text-[15px]">{priceLabel(item)}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 2 && (
        <section key="place" className="step-in mx-auto mt-10 max-w-[820px] md:mt-14">
          <h1 className={title}>Wo passt es dir besser?</h1>
          <div className="mt-8 grid gap-2 md:grid-cols-2">
            {LOCATIONS.map((location) => (
              <button key={location.slug} type="button" onClick={() => choosePlace(location)} className="flex min-h-48 flex-col justify-between gap-6 rounded-[24px] bg-white p-7 text-left text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-cream">
                <span className="font-display text-[44px] leading-none tracking-[-0.018em]">{location.city}</span>
                <span className="text-[15px] leading-snug opacity-80">{location.street}, {location.postalCode} {location.city}<br />{location.hours}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 3 && treatment?.event && (
        <section key="time" className="step-in mt-8 md:mt-12">
          <h1 className={`${title} mb-8`}>Wann passt es dir?</h1>
          {booking === "taken" && <p role="alert" className="mb-5 rounded-2xl bg-white px-5 py-4 text-[15px] font-medium text-rose-deep">Diese Zeit wurde gerade vergeben. Bitte wähle eine andere.</p>}
          <SlotPicker event={treatment.event} title={treatment.title} reloadKey={reloadKey} onPick={(iso) => { setSlot(iso); setBooking("idle"); }} />
        </section>
      )}

      {step === 4 && !needsRequest && slot && (
        <section key="details" className="step-in mx-auto mt-10 max-w-[720px] md:mt-14">
          <h1 className={title}>Fast geschafft.</h1>
          <form onSubmit={submitBooking} className="mt-8 flex flex-col gap-4 rounded-[24px] bg-white p-5 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>Dein Name<input className={fieldClass} name="name" required minLength={2} autoComplete="name" /></label>
              <label className={labelClass}>Deine E-Mail<input className={fieldClass} name="email" type="email" required autoComplete="email" /></label>
            </div>
            <label className={labelClass}>Telefon (optional)<input className={fieldClass} name="phone" type="tel" autoComplete="tel" /></label>
            <label className={labelClass}>Möchtest du mir vorab etwas sagen? (optional)<textarea className={`${fieldClass} py-3`} name="notes" rows={3} maxLength={500} /></label>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
            <button type="submit" disabled={booking === "sending"} className={pillClass("dark", "disabled:opacity-60")}>{booking === "sending" ? "Wird gebucht …" : "Termin verbindlich buchen"}</button>
            <p className="text-[13px] leading-snug text-charcoal/75">Es gelten unsere <Link href="/datenschutz" className="underline underline-offset-2">Datenschutzhinweise</Link>.</p>
            {booking === "error" && (
              <p role="alert" className="text-[14px] text-rose-deep">
                Das hat nicht geklappt. Schreib bitte per <a className="underline" href={whatsappUrl(`Hallo Sidorela, ich möchte einen Termin für ${treatment?.title} buchen.`)}>WhatsApp</a>.
              </p>
            )}
          </form>
        </section>
      )}

      {step === 4 && needsRequest && (
        <section key="request" className="step-in mx-auto mt-10 max-w-[720px] md:mt-14">
          <h1 className={title}>{place?.slug === "juelich" ? "In Jülich nach Vereinbarung." : "Dein Wunschtermin."}</h1>
          <p className={lead}>Sag mir, wann es dir am besten passt. Ich melde mich mit einem festen Termin.</p>
          <form onSubmit={submitRequest} className="mt-8 flex flex-col gap-4 rounded-[24px] bg-white p-5 md:p-8">
            <fieldset>
              <legend className="mb-2 text-[14px] font-medium text-charcoal">Wann passt es dir?</legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {WISHES.map((wish, index) => (
                  <label key={wish} className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl border border-charcoal/25 px-3 text-center text-[15px] font-medium text-charcoal has-[:checked]:border-charcoal has-[:checked]:bg-charcoal has-[:checked]:text-cream">
                    <input type="radio" name="wish" value={wish} defaultChecked={index === 0} className="sr-only" />
                    {wish}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>Dein Name<input className={fieldClass} name="name" required minLength={2} autoComplete="name" /></label>
              <label className={labelClass}>Deine E-Mail<input className={fieldClass} name="email" type="email" required autoComplete="email" /></label>
            </div>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
            <button type="submit" disabled={request.status === "sending"} className={pillClass("dark", "disabled:opacity-60")}>Termin anfragen</button>
            {request.status === "error" && (
              <p role="alert" className="text-[14px] text-rose-deep">
                Das hat nicht geklappt. Schreib bitte per <a className="underline" href={whatsappUrl(`Hallo Sidorela, ich möchte einen Termin für ${treatment?.title} in ${place?.city}.`)}>WhatsApp</a>.
              </p>
            )}
          </form>
        </section>
      )}
    </div>
  );
}
