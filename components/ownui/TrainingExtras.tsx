"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { fieldClass, labelClass, useRequest } from "@/components/ownui/useRequest";
import { Pill, pillClass } from "@/components/ownui/Pill";
import { ERSTGESPRAECH_HREF } from "@/lib/offers";

export function TrainingCalculator({ fee: initialFee = 499, title, note }: { fee?: number; title: string; note: string }) {
  const [fee, setFee] = useState(initialFee);
  const maxFee = Math.max(3000, initialFee);
  const [price, setPrice] = useState(89);
  const [perWeek, setPerWeek] = useState(4);
  const clients = Math.ceil(fee / price);
  const weeks = Math.max(1, Math.ceil(clients / perWeek));

  return (
    <section className="rounded-[28px] bg-charcoal p-7 text-cream md:p-12">
      <h2 className="max-w-[14em] text-balance font-display text-[clamp(34px,4.6vw,60px)] leading-[1.02] tracking-[-0.02em]">{title}</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <label className="flex flex-col gap-2 text-[15px]">
          <span className="flex justify-between"><span>Kursgebühr</span><strong className="font-medium">{fee} €</strong></span>
          <input type="range" min={100} max={maxFee} step={1} value={fee} onChange={(e) => setFee(Number(e.target.value))} className="h-11 w-full accent-gold" />
        </label>
        <label className="flex flex-col gap-2 text-[15px]">
          <span className="flex justify-between"><span>Dein Preis pro Kundin</span><strong className="font-medium">{price} €</strong></span>
          <input type="range" min={40} max={200} step={5} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="h-11 w-full accent-gold" />
        </label>
        <label className="flex flex-col gap-2 text-[15px]">
          <span className="flex justify-between"><span>Kundinnen pro Woche</span><strong className="font-medium">{perWeek}</strong></span>
          <input type="range" min={1} max={20} value={perWeek} onChange={(e) => setPerWeek(Number(e.target.value))} className="h-11 w-full accent-gold" />
        </label>
      </div>
      <p aria-live="polite" className="mt-8 text-balance font-display text-[clamp(30px,3.8vw,48px)] leading-[1.06] tracking-[-0.015em] text-gold">
        Nach {clients} Kundinnen wäre die Kursgebühr wieder drin. Das wären etwa {weeks} {weeks === 1 ? "Woche" : "Wochen"}.
      </p>
      <p className="mt-3 text-[13px] leading-snug text-cream/75">Rechenbeispiel mit {fee} € Kursgebühr, {note}</p>
      <div className="mt-7"><Pill href={ERSTGESPRAECH_HREF} variant="light">Kostenloses Erstgespräch</Pill></div>
    </section>
  );
}

export function TrainingWaitlist({ training, title, lead, doneTitle, doneText }: { training: string; title: string; lead: string; doneTitle: string; doneText: string }) {
  const { status, send } = useRequest();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    send({ type: "warteliste", training, name: form.get("name"), email: form.get("email"), website: form.get("website") });
  };

  if (status === "done") {
    return (
      <section aria-live="polite" className="rounded-[28px] bg-white p-7 md:p-10">
        <h2 className="font-display text-[36px] leading-[1.04] tracking-[-0.018em] text-charcoal">{doneTitle}</h2>
        <p className="mt-2 text-[17px] text-charcoal/75">{doneText}</p>
      </section>
    );
  }

  return (
    <section className="rounded-[28px] bg-white p-7 md:p-10">
      <h2 className="font-display text-[clamp(30px,3.6vw,44px)] leading-[1.04] tracking-[-0.018em] text-charcoal">{title}</h2>
      <p className="mt-2 text-[17px] text-charcoal/75">{lead}</p>
      <form onSubmit={submit} className="mt-6 grid items-end gap-4 md:grid-cols-[1fr_1fr_auto]">
        <label className={labelClass}>Dein Name<input className={fieldClass} name="name" required minLength={2} autoComplete="name" /></label>
        <label className={labelClass}>Deine E-Mail<input className={fieldClass} name="email" type="email" required autoComplete="email" /></label>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        <button type="submit" disabled={status === "sending"} className={pillClass("dark", "disabled:opacity-60")}>Eintragen</button>
      </form>
      {status === "error" && <p role="alert" className="mt-3 text-[14px] text-rose-deep">Das hat nicht geklappt. Bitte versuche es später noch einmal.</p>}
    </section>
  );
}

export function RefillReminder({ treatment, title, consent, doneText }: { treatment: string; title: string; consent: string; doneText: string }) {
  const { status, send } = useRequest();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    send({ type: "erinnerung", treatment, consent: form.get("consent") === "on", name: form.get("name"), email: form.get("email"), website: form.get("website") });
  };

  if (status === "done") {
    return <p aria-live="polite" className="rounded-[28px] bg-white p-7 text-[17px] text-charcoal">{doneText}</p>;
  }

  return (
    <details className="group rounded-[24px] bg-white px-5 md:rounded-[28px] md:px-7">
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-[24px] leading-[1.1] tracking-[-0.012em] text-charcoal md:text-[28px] [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown size={20} strokeWidth={1.5} aria-hidden className="flex-none transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <form onSubmit={submit} className="flex flex-col gap-4 pb-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className={labelClass}>Dein Name<input className={fieldClass} name="name" required minLength={2} autoComplete="name" /></label>
          <label className={labelClass}>Deine E-Mail<input className={fieldClass} name="email" type="email" required autoComplete="email" /></label>
        </div>
        <label className="flex items-start gap-3 text-[14px] leading-snug text-charcoal/75">
          <input type="checkbox" name="consent" required className="mt-0.5 size-5 flex-none accent-charcoal" />
          {consent}
        </label>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        <button type="submit" disabled={status === "sending"} className={pillClass("dark", "self-start disabled:opacity-60")}>Erinnerung aktivieren</button>
        {status === "error" && <p role="alert" className="text-[14px] text-rose-deep">Das hat nicht geklappt. Bitte versuche es später noch einmal.</p>}
      </form>
    </details>
  );
}
