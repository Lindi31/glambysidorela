import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import { LOCATIONS, SITE } from "@/lib/site";
import { Logo } from "@/components/ownui/Logo";

const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] { whatsapp, instagram, tiktok }
`);

const COLUMNS = [
  {
    title: "Entdecken",
    links: [
      { href: "/leistungen", label: "Leistungen" },
      { href: "/beauty-check", label: "Beauty-Check" },
      { href: "/brautpaket", label: "Brautpaket" },
      { href: "/galerie", label: "Galerie" },
    ],
  },
  {
    title: "Mehr",
    links: [
      { href: "/schulungen", label: "Schulungen" },
      { href: "/gutschein", label: "Gutscheine" },
      { href: "/shop", label: "Pflege" },
      { href: "/ueber-mich", label: "Über mich" },
    ],
  },
];

export async function Footer() {
  const settings = await client.fetch(SETTINGS_QUERY).catch(() => null);
  const whatsapp = settings?.whatsapp ?? SITE.whatsapp;
  const instagram = settings?.instagram ?? SITE.instagram;
  const tiktok = settings?.tiktok ?? null;
  const linkClass = "inline-flex min-h-9 items-center transition-colors hover:text-cream";

  return (
    <footer className="bg-charcoal pb-28 text-[13px] text-cream/70 md:pb-10">
      <div className="mx-auto max-w-[1200px] border-t border-cream/15 px-5 pt-12 lg:px-8">
        <Link href="/" aria-label="Zur Startseite" className="mb-10 inline-block text-cream"><Logo variant="large" className="w-[min(72vw,260px)]" /></Link>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="mb-2 font-medium text-cream">{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}><Link href={link.href} className={linkClass}>{link.label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className="mb-2 font-medium text-cream">Standorte</h2>
            <ul className="space-y-3">
              {LOCATIONS.map((location) => (
                <li key={location.slug}>
                  <address className="not-italic leading-relaxed">
                    <Link href={`/standorte/${location.slug}`} className="text-cream/90 hover:text-cream">{location.city}</Link>
                    <br />
                    {location.street}, {location.postalCode} {location.city}
                  </address>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-2 font-medium text-cream">Kontakt</h2>
            <ul>
              <li><Link href="/kontakt" className={linkClass}>Kontakt</Link></li>
              <li><a href={`mailto:${SITE.email}`} className={linkClass}>E-Mail</a></li>
              <li><a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className={linkClass}>WhatsApp</a></li>
              <li><a href={instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>Instagram</a></li>
              {tiktok && <li><a href={tiktok} target="_blank" rel="noopener noreferrer" className={linkClass}>TikTok</a></li>}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-cream/15 pt-5 md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <div className="flex gap-6">
            <Link href="/impressum" className={linkClass}>Impressum</Link>
            <Link href="/datenschutz" className={linkClass}>Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
