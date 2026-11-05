"use client";

import { useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { fieldClass, labelClass, useRequest } from "@/components/ownui/useRequest";
import { pillClass } from "@/components/ownui/Pill";
import { whatsappUrl, type SiteLocation } from "@/lib/site";
import type { PageTexts } from "@/lib/texts";

type BrideOption = { id: string; title: string; detail: string; price: number | null };

export function BridalBuilder({ options, locations, whatsapp, t }: { options: BrideOption[]; locations: SiteLocation[]; whatsapp: string; t: PageTexts["brautpaket"] }) {
  const [picked, setPicked] = useState<string[]>(["probe", "makeup"]);
  const [companions, setCompanions] = useState(0);
  const { status, send } = useRequest();

  const toggle = (id: string) => setPicked((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
  const chosen = options.filter((option) => picked.includes(option.id));
  const total = chosen.reduce((sum, option) => sum + (option.price ?? 0), 0);
  const titles = chosen.map((option) => option.title);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    send({
      type: "brautpaket",
      options: titles,
      companions,
      date: form.get("date") || undefined,
      location: form.get("location"),
      name: form.get("name"),
      email: form.get("email"),
      note: form.get("note") || undefined,
      website: form.get("website"),
    });
  };

  return (
    <section className="bg-cream px-5 pb-28 pt-24 md:pb-24 md:pt-32 lg:px-8">
      <div className="mx-auto max-w-[1136px]">
        <h1 className="max-w-[12em] text-balance font-display text-[clamp(44px,7vw,92px)] leading-[0.98] tracking-[-0.022em] text-charcoal">
          {t.title}
        </h1>
        <p className="mt-5 max-w-[34em] text-[19px] leading-snug text-charcoal/75">{t.lead}</p>

        <div className="mt-10 grid items-start gap-8 md:mt-12 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-2">
            {options.map((option) => {
              const on = picked.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(option.id)}
                  className={`flex min-h-24 items-center justify-between gap-5 rounded-2xl px-6 py-4 text-left transition-colors duration-300 ${on ? "bg-charcoal text-cream" : "bg-white text-charcoal"}`}
                >
                  <span className="min-w-0">
                    <span className="block font-display text-[28px] leading-none tracking-[-0.012em]">{option.title}</span>
                    <span className={`mt-2 block text-[15px] leading-snug ${on ? "text-cream/75" : "text-charcoal/75"}`}>{option.detail}</span>
                    <span className="mt-2 block text-[15px] font-medium md:hidden">{option.price ? `ab ${option.price} €` : "auf Anfrage"}</span>
                  </span>
                  <span className="flex flex-none items-center gap-4 text-[15px] font-medium">
                    <span className="hidden md:inline">{option.price ? `ab ${option.price} €` : "auf Anfrage"}</span>
                    <span aria-hidden className={`flex size-8 items-center justify-center rounded-full ${on ? "bg-cream text-charcoal" : "bg-charcoal/[0.07]"}`}>
                      {on ? <Check size={16} strokeWidth={2} /> : <Plus size={16} strokeWidth={1.5} />}
                    </span>
                  </span>
                </button>
              );
            })}

            <div className="flex min-h-24 items-center justify-between gap-5 rounded-2xl bg-white px-6 py-4 text-charcoal">
              <span className="min-w-0">
                <span className="block font-display text-[28px] leading-none tracking-[-0.012em]">{t.companionTitle}</span>
                <span className="mt-2 block text-[15px] text-charcoal/75">{t.companionText}</span>
              </span>
              <span className="flex flex-none items-center gap-2">
                <button type="button" aria-label="Eine Person weniger" onClick={() => setCompanions((n) => Math.max(0, n - 1))} className="flex size-11 items-center justify-center rounded-full bg-charcoal/[0.07]"><Minus size={16} aria-hidden /></button>
                <span aria-live="polite" className="w-6 text-center text-[17px] font-medium">{companions}</span>
                <button type="button" aria-label="Eine Person mehr" onClick={() => setCompanions((n) => Math.min(12, n + 1))} className="flex size-11 items-center justify-center rounded-full bg-charcoal/[0.07]"><Plus size={16} aria-hidden /></button>
              </span>
            </div>
          </div>

          <div className="min-w-0 rounded-[24px] bg-white p-5 md:rounded-[28px] md:p-7 lg:sticky lg:top-20">
            {status === "done" ? (
              <div aria-live="polite">
                <h2 className="font-display text-[40px] leading-[1.02] tracking-[-0.02em] text-charcoal">{t.doneTitle}</h2>
                <p className="mt-3 text-[17px] leading-snug text-charcoal/75">{t.doneText}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-4">
                <div aria-live="polite">
                  <p className="text-[14px] text-charcoal/75">{titles.length ? titles.join(", ") : "Noch nichts gewählt"}{companions ? `, ${companions} × Begleitung` : ""}</p>
                  <p className="mt-1 font-display text-[44px] leading-none tracking-[-0.018em] text-charcoal">ab {total} €</p>
                  <p className="mt-1 text-[13px] text-charcoal/75">{companions || picked.includes("probe") ? "Probe-Termin und Begleitung kommen nach Absprache dazu." : "Unverbindlicher Richtwert."}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className={labelClass}>Hochzeitsdatum<input className={fieldClass} type="date" name="date" /></label>
                  <label className={labelClass}>
                    Ort
                    <select className={fieldClass} name="location" defaultValue={locations[0]?.city}>
                      {locations.map((location) => <option key={location.slug}>{location.city}</option>)}
                    </select>
                  </label>
                  <label className={labelClass}>Dein Name<input className={fieldClass} name="name" required minLength={2} autoComplete="name" /></label>
                  <label className={labelClass}>Deine E-Mail<input className={fieldClass} name="email" type="email" required autoComplete="email" /></label>
                </div>
                <label className={labelClass}>Wünsche (optional)<textarea className={`${fieldClass} py-3`} name="note" rows={2} maxLength={600} /></label>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                <button type="submit" disabled={status === "sending" || !titles.length} className={pillClass("dark", "w-full disabled:opacity-60")}>
                  {status === "sending" ? "Wird gesendet …" : "Brautpaket anfragen"}
                </button>
                {status === "error" && (
                  <p role="alert" className="text-[14px] text-rose-deep">
                    Das hat nicht geklappt. Schreib Sidorela bitte per <a className="underline" href={whatsappUrl(`Hallo Sidorela, ich interessiere mich für ein Brautpaket: ${titles.join(", ")}.`, whatsapp)}>WhatsApp</a>.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
