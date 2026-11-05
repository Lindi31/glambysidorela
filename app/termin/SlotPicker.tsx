"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { whatsappUrl } from "@/lib/site";

const TZ = "Europe/Berlin";
const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const MAX_MONTHS_AHEAD = 6;

type Days = Record<string, string[]>;

const pad = (value: number) => String(value).padStart(2, "0");
const monthKey = (year: number, month: number) => `${year}-${pad(month + 1)}`;
const dayKey = (year: number, month: number, day: number) => `${monthKey(year, month)}-${pad(day)}`;

export const formatTime = (iso: string) =>
  new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit", timeZone: TZ }).format(new Date(iso));

export const formatDay = (iso: string) =>
  new Intl.DateTimeFormat("de-DE", { weekday: "long", day: "numeric", month: "long", timeZone: TZ }).format(new Date(iso));

const hourOf = (iso: string) =>
  Number(
    new Intl.DateTimeFormat("de-DE", { hour: "numeric", hourCycle: "h23", timeZone: TZ })
      .formatToParts(new Date(iso))
      .find((part) => part.type === "hour")?.value,
  );

function TimeGroup({ label, slots, onPick }: { label: string; slots: string[]; onPick: (iso: string) => void }) {
  if (!slots.length) return null;
  return (
    <div>
      <h3 className="mb-2 text-[13px] text-charcoal/75">{label}</h3>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {slots.map((iso) => (
          <button key={iso} type="button" onClick={() => onPick(iso)} className="min-h-12 rounded-xl bg-cream text-[15px] font-medium text-charcoal transition-colors duration-200 hover:bg-charcoal hover:text-cream">
            {formatTime(iso)}
          </button>
        ))}
      </div>
    </div>
  );
}

type Props = { event: string; title: string; onPick: (iso: string) => void; reloadKey?: number; whatsapp?: string };

export function SlotPicker({ event, title, onPick, reloadKey = 0, whatsapp }: Props) {
  const [now] = useState(() => new Date());
  const [offset, setOffset] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [cache, setCache] = useState<Record<string, Days | "error">>({});

  const shown = new Date(now.getFullYear(), now.getMonth() + offset, 1);
  const year = shown.getFullYear();
  const month = shown.getMonth();
  const cacheKey = `${event}|${monthKey(year, month)}|${reloadKey}`;
  const entry = cache[cacheKey];

  useEffect(() => {
    if (cache[cacheKey]) return;
    const controller = new AbortController();
    const last = new Date(year, month + 1, 0).getDate();
    const params = new URLSearchParams({ event, start: dayKey(year, month, 1), end: dayKey(year, month, last) });
    fetch(`/api/termine/slots?${params}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then(({ days }: { days: Days }) => {
        setCache((current) => ({ ...current, [cacheKey]: days }));
        // Ist der Monat ausgebucht, springt der Kalender selbst zum nächsten freien Monat.
        if (!Object.keys(days).length) setOffset((value) => (value < MAX_MONTHS_AHEAD ? value + 1 : value));
      })
      .catch((error: Error) => {
        if (error.name !== "AbortError") setCache((current) => ({ ...current, [cacheKey]: "error" }));
      });
    return () => controller.abort();
  }, [cache, cacheKey, event, month, year]);

  if (entry === "error") {
    return (
      <div role="alert" className="rounded-[24px] bg-white p-7 text-charcoal">
        <p className="text-[17px]">Die freien Zeiten konnten gerade nicht geladen werden.</p>
        <a href={whatsappUrl(`Hallo Sidorela, ich möchte einen Termin für ${title} buchen.`, whatsapp)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center font-medium underline underline-offset-4">Termin per WhatsApp anfragen</a>
      </div>
    );
  }

  const days = entry ?? {};
  const available = Object.keys(days).sort();
  const activeDay = picked && days[picked] ? picked : available[0] ?? null;
  const slots = activeDay ? days[activeDay] : [];
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const dayCount = new Date(year, month + 1, 0).getDate();
  const monthLabel = new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric" }).format(shown);
  const navButton = "flex size-11 items-center justify-center rounded-full bg-charcoal/[0.06] text-charcoal transition-colors hover:bg-charcoal/[0.12] disabled:opacity-30";

  return (
    <div className="grid gap-8 rounded-[24px] bg-white p-5 md:grid-cols-[1.05fr_1fr] md:gap-12 md:rounded-[28px] md:p-10">
      <div>
        <div className="flex items-center justify-between">
          <h2 aria-live="polite" className="font-display text-[30px] leading-none tracking-[-0.012em] text-charcoal">{monthLabel}</h2>
          <div className="flex gap-1.5">
            <button type="button" aria-label="Vorheriger Monat" disabled={offset === 0} onClick={() => setOffset((value) => value - 1)} className={navButton}><ChevronLeft size={20} strokeWidth={1.5} aria-hidden /></button>
            <button type="button" aria-label="Nächster Monat" disabled={offset >= MAX_MONTHS_AHEAD} onClick={() => setOffset((value) => value + 1)} className={navButton}><ChevronRight size={20} strokeWidth={1.5} aria-hidden /></button>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((weekday) => <div key={weekday} className="pb-1 text-[12px] text-charcoal/70">{weekday}</div>)}
          {Array.from({ length: firstWeekday }).map((_, index) => <div key={`leer-${index}`} />)}
          {Array.from({ length: dayCount }).map((_, index) => {
            const day = index + 1;
            const key = dayKey(year, month, day);
            const open = Boolean(days[key]);
            const selected = key === activeDay;
            return (
              <button
                key={key}
                type="button"
                disabled={!open}
                aria-pressed={selected}
                aria-label={open ? `${day}. ${monthLabel}, freie Termine anzeigen` : `${day}. ${monthLabel}, keine freien Termine`}
                onClick={() => setPicked(key)}
                className={`flex aspect-square min-h-11 items-center justify-center rounded-full text-[15px] transition-colors duration-200 ${selected ? "bg-charcoal font-medium text-cream" : open ? "bg-cream font-medium text-charcoal hover:bg-nude/70" : "text-charcoal/30"}`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-w-0">
        {!entry && (
          <div aria-busy="true" aria-label="Freie Zeiten werden geladen" className="grid animate-pulse grid-cols-3 gap-2 pt-12 sm:grid-cols-4">
            {Array.from({ length: 12 }).map((_, index) => <div key={index} className="h-12 rounded-xl bg-cream" />)}
          </div>
        )}
        {entry && !activeDay && (
          <p className="pt-2 text-[17px] leading-snug text-charcoal/75">In diesem Monat ist nichts mehr frei. Schau gern in den nächsten Monat.</p>
        )}
        {activeDay && slots.length > 0 && (
          <div key={activeDay} className="step-in flex flex-col gap-5">
            <h2 className="font-display text-[30px] leading-none tracking-[-0.012em] text-charcoal">{formatDay(slots[0])}</h2>
            <TimeGroup label="Vormittag" slots={slots.filter((iso) => hourOf(iso) < 12)} onPick={onPick} />
            <TimeGroup label="Nachmittag" slots={slots.filter((iso) => hourOf(iso) >= 12)} onPick={onPick} />
          </div>
        )}
      </div>
    </div>
  );
}
