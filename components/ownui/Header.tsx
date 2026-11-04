"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BERATUNG_HREF } from "@/lib/offers";
import { Logo } from "@/components/ownui/Logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/galerie", label: "Galerie" },
  { href: "/brautpaket", label: "Brautpaket" },
  { href: "/schulungen", label: "Schulungen" },
  { href: "/gutschein", label: "Gutscheine" },
  { href: "/shop", label: "Pflege" },
  { href: "/ueber-mich", label: "Über mich" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [over, setOver] = useState({ path: "", dark: false });
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Über dunklen Kopfbereichen wird die Navigation hell.
  useEffect(() => {
    const stage = document.getElementById("hero-stage");
    if (!stage) return;
    const update = () => {
      const until = stage.dataset.static
        ? stage.offsetHeight - 56
        : (stage.offsetHeight - window.innerHeight) * 0.55;
      setOver({ path: pathname, dark: window.scrollY < until });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open]);

  const dark = over.path === pathname && over.dark && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 backdrop-blur-xl transition-colors duration-500",
        dark ? "bg-charcoal/60 text-cream" : "bg-cream/75 text-charcoal",
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-6 px-5 lg:px-8">
        <Link href="/" onClick={() => setOpen(false)} aria-label="Sidorela Isa Beauty Studio und Academy, zur Startseite" className="flex min-h-11 items-center">
          <Logo dark={dark} />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Hauptnavigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center text-[13px] tracking-[-0.005em] transition-opacity duration-300 hover:opacity-100",
                pathname.startsWith(link.href) ? "font-medium opacity-100" : "opacity-80",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/termin"
            className={cn(
              "hidden min-h-9 items-center whitespace-nowrap rounded-full px-4 text-[13px] font-medium transition-colors duration-500 sm:inline-flex",
              dark ? "bg-cream text-charcoal" : "bg-charcoal text-cream",
            )}
          >
            Termin buchen
          </Link>
          <button
            ref={toggleRef}
            className="-mr-2.5 flex size-11 items-center justify-center lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
          >
            {open ? <X size={22} strokeWidth={1.5} aria-hidden /> : <Menu size={22} strokeWidth={1.5} aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="step-in flex h-[calc(100dvh-3.5rem)] flex-col justify-between gap-8 overflow-y-auto bg-cream px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile Navigation">
            {[...navLinks, { href: "/beauty-check", label: "Beauty-Check" }, { href: "/kontakt", label: "Kontakt" }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[52px] items-center font-display text-[32px] leading-none tracking-[-0.015em] text-charcoal"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            <Link href="/termin" onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-center rounded-full bg-charcoal text-[15px] font-medium text-cream">Termin buchen</Link>
            <Link href={BERATUNG_HREF} onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-center rounded-full border border-charcoal/25 text-[15px] font-medium text-charcoal">Kostenlose Beratung</Link>
          </div>
        </div>
      )}
    </header>
  );
}
