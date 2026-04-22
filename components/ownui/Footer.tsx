import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { locations } from "./services";
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
export function Footer() {
  const year = new Date().getFullYear();

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
              href="https://instagram.com/glambysidorela"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-cream/10 hover:bg-rose flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold mb-4">Standorte</h4>
          <ul className="space-y-3 text-sm">
            {locations.map((loc) => (
              <li key={loc.city} className="flex gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-rose" />
                <div>
                  <div className="text-cream">{loc.city}</div>
                  <div className="text-cream/60 text-xs">{loc.region}</div>
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
                href="https://wa.me/4917700000000"
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
