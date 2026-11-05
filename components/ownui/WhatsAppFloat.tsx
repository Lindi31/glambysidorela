"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/lib/site";

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.121 1.533 5.855L.057 23.077a.75.75 0 0 0 .866.981l5.383-1.408A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.712 9.712 0 0 1-4.953-1.355l-.355-.213-3.685.964.984-3.594-.232-.371A9.712 9.712 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}

export function WhatsAppFloat({ whatsapp }: { whatsapp?: string }) {
  const pathname = usePathname();
  const WHATSAPP = whatsappUrl("Hallo Sidorela, ich würde gerne einen Termin buchen.", whatsapp);

  // Im Studio verdeckt die Leiste sonst den Publish-Button.
  if (pathname.startsWith("/studio")) return null;

  // Auf Leistungsseiten gibt es am Handy eine eigene Leiste, auf /termin wird schon gebucht.
  const hideMobile = pathname.startsWith("/leistungen/") || pathname.startsWith("/termin");

  return (
    <>
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Per WhatsApp schreiben"
        className="site-bar fixed bottom-6 right-6 z-40 hidden size-12 items-center justify-center rounded-full bg-charcoal/85 text-cream shadow-lg backdrop-blur-xl transition-colors hover:bg-charcoal md:flex"
      >
        <WhatsAppIcon />
      </a>
      {!hideMobile && (
        <div className="site-bar fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-2 rounded-full bg-cream/95 p-1.5 shadow-[0_10px_40px_rgba(44,40,38,.22)] md:hidden">
          <Link href="/termin" className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-charcoal text-[15px] font-medium text-cream">
            Termin buchen
          </Link>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="Per WhatsApp schreiben" className="flex size-12 flex-none items-center justify-center rounded-full text-charcoal">
            <WhatsAppIcon />
          </a>
        </div>
      )}
    </>
  );
}
