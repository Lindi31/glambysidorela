import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import { Pill } from "@/components/ownui/Pill";
import { SITE } from "@/lib/site";
import { Logo } from "@/components/ownui/Logo";

export const metadata: Metadata = {
  title: { absolute: "Wir sind gleich zurück | Sidorela Isa Beauty Studio & Academy" },
  robots: { index: false, follow: false },
};

const MAINTENANCE_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] { maintenanceMessage, instagram, whatsapp }
`);

export default async function MaintenancePage() {
  const data = await client.fetch(MAINTENANCE_QUERY).catch(() => null);
  const message = data?.maintenanceMessage ?? "Die Website wird gerade noch schöner. In Kürze bin ich wieder für dich da.";

  return (
    <main data-maintenance className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-charcoal px-5 py-24 text-center text-cream">
      <svg aria-hidden viewBox="0 0 1000 300" fill="none" className="absolute left-1/2 top-[8svh] w-[max(1100px,170%)] -translate-x-1/2 md:w-[1240px]">
        <path className="ring-soft" d="M40 300 A460 280 0 0 1 960 300" stroke="#FFF1D6" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <div className="relative">
        <Logo variant="large" className="mx-auto w-[min(72vw,300px)]" />
        <h1 className="mx-auto mt-8 max-w-[12em] text-balance font-display text-[clamp(44px,7vw,84px)] leading-[0.99] tracking-[-0.022em]">Gleich wieder für dich da.</h1>
        <p className="mx-auto mt-5 max-w-[30em] text-[17px] leading-snug text-cream/80 md:text-[19px]">{message}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Pill href={`https://wa.me/${data?.whatsapp ?? SITE.whatsapp}`} variant="light">Per WhatsApp schreiben</Pill>
          <Pill href={data?.instagram ?? SITE.instagram} variant="outlineLight">Instagram</Pill>
        </div>
      </div>
    </main>
  );
}
