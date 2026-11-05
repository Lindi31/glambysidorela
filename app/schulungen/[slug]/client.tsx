import { PortableText, type PortableTextBlock } from "@portabletext/react"
import { DetailHero, cardClass, pageShell, sectionTitle } from "@/components/ownui/PageIntro"
import { Pill } from "@/components/ownui/Pill"
import { TrainingCalculator, TrainingWaitlist } from "@/components/ownui/TrainingExtras"
import { ERSTGESPRAECH_HREF } from "@/lib/offers"
import { getSite, getTexts } from "@/lib/content"
import { whatsappUrl } from "@/lib/site"

type Training = {
  title: string
  level?: string | null
  description?: PortableTextBlock[] | null
  durationDays?: number | null
  price?: number | null
  includes?: string[] | null
  upcomingDates?: { date?: string | null; location?: string | null; spotsLeft?: number | null }[] | null
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })

export async function TrainingDetail({ training }: { training: Training }) {
  const [{ schulungen: t }, site] = await Promise.all([getTexts(), getSite()])
  const meta = [
    ...(training.price ? [`${training.price} €`] : []),
    ...(training.durationDays ? [`${training.durationDays} ${training.durationDays === 1 ? "Tag" : "Tage"}`] : []),
  ]

  return (
    <article className="bg-cream">
      <DetailHero crumbs={[{ href: "/schulungen", label: "Academy" }]} current={training.title} kicker={training.level} title={training.title} meta={meta} />

      <div className={`${pageShell} grid items-start gap-10 py-14 md:py-20 lg:grid-cols-[1fr_360px] lg:gap-16`}>
        <div className="flex min-w-0 flex-col gap-12">
          {training.description && (
            <div className="rich-text">
              <PortableText value={training.description} />
            </div>
          )}

          {training.includes && training.includes.length > 0 && (
            <section>
              <h2 className={sectionTitle}>{t.includesTitle}</h2>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {training.includes.map((item) => (
                  <li key={item} className="rounded-2xl bg-white px-5 py-4 text-[16px] text-charcoal">{item}</li>
                ))}
              </ul>
            </section>
          )}

          {training.upcomingDates && training.upcomingDates.length > 0 && (
            <section>
              <h2 className={sectionTitle}>{t.datesTitle}</h2>
              <ul className="mt-6 flex flex-col gap-2">
                {training.upcomingDates.map((entry, index) => (
                  <li key={index} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 rounded-2xl bg-white px-5 py-4 text-[15px] text-charcoal">
                    <span className="font-medium">{entry.date ? formatDate(entry.date) : "Termin folgt"}</span>
                    <span className="text-charcoal/75">
                      {entry.location}
                      {entry.spotsLeft != null && `, ${entry.spotsLeft} ${entry.spotsLeft === 1 ? "Platz" : "Plätze"} frei`}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {training.price && <TrainingCalculator fee={training.price} title={t.calculatorTitle} note={t.calculatorNote} />}
          <TrainingWaitlist training={training.title} title={t.waitlistTitle} lead={t.waitlistLead} doneTitle={t.waitlistDoneTitle} doneText={t.waitlistDoneText} />
        </div>

        <aside className={`${cardClass} order-first flex flex-col gap-3 p-6 md:p-7 lg:sticky lg:top-20 lg:order-none`}>
          <h2 className="font-display text-[34px] leading-none tracking-[-0.015em] text-charcoal">{t.requestTitle}</h2>
          {meta.length > 0 && <p className="mb-2 text-[15px] text-charcoal/75">{meta.join(", ")}</p>}
          <Pill href={whatsappUrl(`Hallo Sidorela, ich interessiere mich für die ${training.title}.`, site.whatsapp)}>Per WhatsApp anfragen</Pill>
          <Pill href={ERSTGESPRAECH_HREF} variant="outline">Kostenloses Erstgespräch</Pill>
          <a href={`mailto:${site.email}?subject=${encodeURIComponent(`Schulung: ${training.title}`)}`} className="inline-flex min-h-11 items-center justify-center text-[15px] font-medium text-charcoal underline-offset-4 hover:underline">
            Per E-Mail anfragen
          </a>
        </aside>
      </div>
    </article>
  )
}
