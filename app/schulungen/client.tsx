import Image from "next/image"
import Link from "next/link"
import { PageIntro, cardClass, pageShell } from "@/components/ownui/PageIntro"
import { Pill } from "@/components/ownui/Pill"
import { TrainingCalculator, TrainingWaitlist } from "@/components/ownui/TrainingExtras"
import { BERATUNG_HREF } from "@/lib/offers"
import { urlFor } from "@/sanity/lib/image"

type Training = {
  _id: string
  title: string
  slug: string
  level?: string | null
  durationDays?: number | null
  price?: number | null
  image?: Parameters<typeof urlFor>[0] | null
  upcomingDates?: unknown[] | null
}

export function SchulungenGrid({ trainings }: { trainings: Training[] }) {
  return (
    <div className="bg-cream pb-24 md:pb-32">
      <PageIntro title="Lash- und PMU-Schulungen von der Expertin." lead="Lerne das Handwerk bei Sidorela in Bruchsal oder Jülich, mit Praxis, persönlicher Anleitung und Starterset.">
        <div className="mt-7"><Pill href={BERATUNG_HREF}>Kostenloses Erstgespräch</Pill></div>
      </PageIntro>

      <div className={`${pageShell} flex flex-col gap-4`}>
        {trainings.length > 0 && (
          <ul className="mb-8 grid gap-4 md:grid-cols-2">
            {trainings.map((training) => (
              <li key={training._id}>
                <Link href={`/schulungen/${training.slug}`} className={`${cardClass} flex h-full flex-col overflow-hidden transition-transform duration-700 ease-out hover:scale-[1.008]`}>
                  {training.image && (
                    <div className="relative aspect-[16/10] bg-nude/30">
                      <Image src={urlFor(training.image).width(1000).height(625).url()} alt={training.title} fill sizes="(max-width: 768px) 90vw, 580px" className="object-cover" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6 md:p-9">
                    {training.level && <p className="text-[15px] text-gold-accent">{training.level}</p>}
                    <h2 className="mt-1 font-display text-[clamp(32px,3.6vw,44px)] leading-[1.03] tracking-[-0.018em] text-charcoal">{training.title}</h2>
                    <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[15px] text-charcoal/75">
                      {training.price && <span className="font-medium text-charcoal">ab {training.price} €</span>}
                      {training.durationDays && <span>{training.durationDays} {training.durationDays === 1 ? "Tag" : "Tage"}</span>}
                      {training.upcomingDates?.length ? <span>{training.upcomingDates.length} {training.upcomingDates.length === 1 ? "Termin" : "Termine"}</span> : <span>Termine auf Anfrage</span>}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <TrainingCalculator />
        <TrainingWaitlist training="Schulungen allgemein" />
      </div>
    </div>
  )
}
