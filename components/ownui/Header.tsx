"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/schulungen", label: "Schulungen" },
  { href: "/galerie", label: "Galerie" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-nude/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-2xl tracking-wide text-charcoal"
        >
          Glam<span className="text-rose">By</span>Sidorela
        </Link>

        <nav className="hidden md:flex items-center gap-10" aria-label="Hauptnavigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-charcoal/80 hover:text-rose transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            asChild
            className="bg-rose hover:bg-mauve text-cream rounded-full px-6"
          >
            <Link href="/termin">Termin buchen</Link>
          </Button>
        </div>

        <button
          ref={toggleRef}
          className="md:hidden text-charcoal p-2 rounded-lg hover:bg-nude/30 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
        >
          {open ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="false"
        aria-label="Mobile Navigation"
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-cream border-t border-nude/40",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="flex flex-col px-6 py-6 gap-5" aria-label="Mobile Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-charcoal/90 hover:text-rose text-lg"
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            className="bg-rose hover:bg-mauve text-cream rounded-full mt-2"
          >
            <Link href="/termin" onClick={() => setOpen(false)}>
              Termin buchen
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
