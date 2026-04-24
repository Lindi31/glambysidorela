import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";

const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    whatsapp, instagram, tiktok,
    locations[]{city, addressLine, hours, phone}
  }
`)

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

const DEFAULT_LOCATIONS = [
  { city: "Bruchsal", addressLine: "Region Karlsruhe", hours: "Mo–Fr: 9:00–18:00 · Sa nach Vereinbarung", phone: null },
  { city: "Jülich", addressLine: "Großraum Aachen / Düren", hours: "Nach Vereinbarung", phone: null },
];

export async function Footer() {
  const settings = await client.fetch(SETTINGS_QUERY).catch(() => null);
  const year = new Date().getFullYear();

  const whatsapp = settings?.whatsapp ?? "4915252609602";
  const instagram = settings?.instagram ?? "https://instagram.com/glambysidorela";
  const tiktok = settings?.tiktok ?? null;
  const locations = settings?.locations?.length ? settings.locations : DEFAULT_LOCATIONS;

  return (
    <footer className="bg-charcoal text-cream/90 pt-20 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-display text-3xl text-cream">
            Glam<span className="text-rose">By</span>Sidorela
          </h3>
          <p className="mt-4 text-cream/70 max-w-sm leading-relaxed">
            Professionelle Beauty-Artistry und Schulungen von Sidorela Isa –
            für Lashes, Brows, Permanent Make-up, Make-up und Gesichtspflege.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-cream/10 hover:bg-rose flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
            {tiktok && (
              <a
                href={tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 hover:bg-rose flex items-center justify-center transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon size={18} />
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold mb-4">Standorte</h4>
          <ul className="space-y-3 text-sm">
            {locations.map((loc: any) => (
              <li key={loc.city} className="flex gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-rose" />
                <div>
                  <div className="text-cream">{loc.city}</div>
                  <div className="text-cream/60 text-xs">{loc.addressLine}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold mb-4">Kontakt</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-rose" />
              <a
                href="mailto:kontakt@glambysidorela.de"
                className="hover:text-rose transition-colors"
              >
                kontakt@glambysidorela.de
              </a>
            </li>
            <li className="flex gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-rose" />
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-rose transition-colors"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-cream/50">
        <div>&copy; {year} GlamBySidorela · Sidorela Isa</div>
        <div className="flex gap-6">
          <Link href="/impressum" className="hover:text-rose">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-rose">
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  );
}
