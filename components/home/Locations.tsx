import Link from "next/link";
import { getSite, getTexts } from "@/lib/content";

export async function Locations() {
  const [{ home }, site] = await Promise.all([getTexts(), getSite()]);
  return (
    <section className="bg-cream px-5 pb-24 md:pb-36 lg:px-8">
      <div className="mx-auto max-w-[1136px]">
        <h2 className="font-display text-[clamp(38px,5vw,64px)] leading-[1.02] tracking-[-0.02em] text-charcoal">{home.locationsTitle}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {site.locations.map((location) => (
            <address key={location.slug} className="rise flex min-h-[280px] flex-col justify-between rounded-[28px] bg-white p-7 not-italic text-charcoal md:p-9">
              <div>
                <h3 className="font-display text-[clamp(38px,4vw,54px)] leading-none tracking-[-0.018em]">{location.city}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-charcoal/75">
                  {location.street}, {location.postalCode} {location.city}
                  <br />
                  {location.hours}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-1 text-[15px] font-medium">
                <Link href={`/standorte/${location.slug}`} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">Mehr zu {location.city}</Link>
                <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">Route planen</a>
              </div>
            </address>
          ))}
        </div>
      </div>
    </section>
  );
}
