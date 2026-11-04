"use client";

import { useState } from "react";
import { CalEmbed } from "@/components/ownui/CalEmbed";
import { pageShell } from "@/components/ownui/PageIntro";
import { pillClass } from "@/components/ownui/Pill";
import { fieldClass, labelClass, useRequest } from "@/components/ownui/useRequest";
import { BERATUNG_EVENT, TREATMENTS } from "@/lib/offers";
import { LOCATIONS, whatsappUrl } from "@/lib/site";

const WISHES = ["Vormittags", "Nachmittags", "Am Wochenende"];
const title = "text-balance font-display text-[clamp(40px,6vw,72px)] leading-[1] tracking-[-0.022em] text-charcoal";
const choice = "flex min-h-20 w-full items-center justify-between gap-5 rounded-2xl bg-white px-6 py-4 text-left text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-cream";

type Props = { event?: string; initialTreatment?: string; initialPlace?: string };

function DirectBooking({ event }: { event: string }) {
  const consultation = event === BERATUNG_EVENT;
  return (
    <div className="mx-auto max-w-[1000px] px-3 md:px-8">
      <div className="mb-8 px-2 text-center md:mb-12">
        <h1 className={title}>{consultation ? "Deine kostenlose Beratung." : "Finde deinen Wohlfühl-Slot."}</h1>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-snug text-charcoal/75 md:text-[19px]">
          {consultation ? "Wir sprechen in Ruhe über deine Wünsche. Unverbindlich und ohne Kosten." : "Wähle einen freien Termin. Du bekommst sofort eine Bestätigung per E-Mail."}
        </p>
      </div>
      <CalEmbed eventType={event} />
    </div>
  );
}

export function BookingFlow({ event, initialTreatment, initialPlace }: Props) {
  const startTreatment = TREATMENTS.find((item) => item.id === initialTreatment)?.title ?? null;
  const startPlace = LOCATIONS.find((item) => item.slug === initialPlace) ?? null;
  const [treatment, setTreatment] = useState<string | null>(startTreatment);
  const [place, setPlace] = useState(startPlace);
  const [editing, setEditing] = useState<"treatment" | "place" | null>(null);
  const { status, send } = useRequest();

  if (event) return <DirectBooking event={event} />;

  const step = editing === "treatment" || !treatment ? 1 : editing === "place" || !place ? 2 : 3;

  const submit = (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    const form = new FormData(formEvent.currentTarget);
    send({
      type: "termin",
      treatment,
      location: place?.city,
      wish: form.get("wish"),
      name: form.get("name"),
      email: form.get("email"),
      website: form.get("website"),
    });
  };

  return (
    <div className={pageShell}>
      <div className="flex gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step} aria-label="Fortschritt">
        {[1, 2, 3].map((number) => (
          <span key={number} className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${number <= step ? "bg-charcoal" : "bg-charcoal/15"}`} />
        ))}
      </div>

      {(treatment || place) && (
        <dl className="mt-5 flex flex-wrap gap-2 text-[14px]">
          {treatment && step !== 1 && (
            <div className="flex items-center gap-3 rounded-full bg-white py-1 pl-4 pr-1">
              <dt className="sr-only">Behandlung</dt>
              <dd className="font-medium text-charcoal">{treatment}</dd>
              <button type="button" onClick={() => setEditing("treatment")} className="min-h-9 rounded-full px-3 text-charcoal/75 underline underline-offset-4">Ändern</button>
            </div>
          )}
          {place && step === 3 && (
            <div className="flex items-center gap-3 rounded-full bg-white py-1 pl-4 pr-1">
              <dt className="sr-only">Standort</dt>
              <dd className="font-medium text-charcoal">{place.city}</dd>
              <button type="button" onClick={() => setEditing("place")} className="min-h-9 rounded-full px-3 text-charcoal/75 underline underline-offset-4">Ändern</button>
            </div>
          )}
        </dl>
      )}

      {step === 1 && (
        <section key="treatment" className="step-in mx-auto mt-10 max-w-[820px] md:mt-14">
          <h1 className={title}>Was darf ich für dich tun?</h1>
          <div className="mt-8 flex flex-col gap-2">
            {TREATMENTS.map((item) => (
              <button key={item.id} type="button" onClick={() => { setTreatment(item.title); setEditing(null); }} className={choice}>
                <span className="font-display text-[28px] leading-none tracking-[-0.012em]">{item.title}</span>
                <span className="flex-none text-[15px] font-medium">ab {item.from} €</span>
              </button>
            ))}
            <button type="button" onClick={() => { setTreatment("Kostenlose Beratung"); setEditing(null); }} className={choice}>
              <span className="font-display text-[28px] leading-none tracking-[-0.012em]">Noch nicht sicher?</span>
              <span className="flex-none text-[15px] font-medium">Kostenlose Beratung</span>
            </button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section key="place" className="step-in mx-auto mt-10 max-w-[820px] md:mt-14">
          <h1 className={title}>Wo passt es dir besser?</h1>
          <div className="mt-8 grid gap-2 md:grid-cols-2">
            {LOCATIONS.map((location) => (
              <button key={location.slug} type="button" onClick={() => { setPlace(location); setEditing(null); }} className="flex min-h-48 flex-col justify-between gap-6 rounded-[24px] bg-white p-7 text-left text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-cream">
                <span className="font-display text-[44px] leading-none tracking-[-0.018em]">{location.city}</span>
                <span className="text-[15px] leading-snug opacity-80">{location.street}, {location.postalCode} {location.city}<br />{location.hours}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 3 && place?.slug === "bruchsal" && (
        <section key="calendar" className="step-in mt-8 md:mt-12">
          <h1 className={`${title} text-center`}>Finde deinen Wohlfühl-Slot.</h1>
          <p className="mx-auto mb-8 mt-4 max-w-xl text-center text-[17px] leading-snug text-charcoal/75">Wähle {treatment} und einen freien Termin. Du bekommst sofort eine Bestätigung per E-Mail.</p>
          <div className="-mx-2 md:mx-0"><CalEmbed eventType={treatment === "Kostenlose Beratung" ? BERATUNG_EVENT : undefined} showAll={treatment !== "Kostenlose Beratung"} /></div>
        </section>
      )}

      {step === 3 && place?.slug === "juelich" && (
        <section key="request" className="step-in mx-auto mt-10 max-w-[720px] md:mt-14">
          {status === "done" ? (
            <div aria-live="polite">
              <h1 className={title}>Deine Anfrage ist da.</h1>
              <p className="mt-4 text-[19px] leading-snug text-charcoal/75">Sidorela meldet sich mit einem festen Termin in Jülich bei dir.</p>
            </div>
          ) : (
            <>
              <h1 className={title}>In Jülich nach Vereinbarung.</h1>
              <p className="mt-4 text-[17px] leading-snug text-charcoal/75 md:text-[19px]">Sag mir, wann es dir am besten passt. Ich melde mich mit einem festen Termin.</p>
              <form onSubmit={submit} className="mt-8 flex flex-col gap-4 rounded-[24px] bg-white p-5 md:p-8">
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
                <button type="submit" disabled={status === "sending"} className={pillClass("dark", "disabled:opacity-60")}>Termin anfragen</button>
                {status === "error" && (
                  <p role="alert" className="text-[14px] text-rose-deep">
                    Das hat nicht geklappt. Schreib bitte per <a className="underline" href={whatsappUrl(`Hallo Sidorela, ich möchte einen Termin in Jülich für ${treatment}.`)}>WhatsApp</a>.
                  </p>
                )}
              </form>
            </>
          )}
        </section>
      )}
    </div>
  );
}
