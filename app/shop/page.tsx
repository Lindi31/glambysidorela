import type { Metadata } from "next";
import { ProductArt } from "@/components/home/ProductArt";
import { Footer } from "@/components/ownui/Footer";
import { Header } from "@/components/ownui/Header";
import { Pill } from "@/components/ownui/Pill";
import { SHOP_EXAMPLES } from "@/lib/offers";
import { whatsappUrl } from "@/lib/site";

// Beispielprodukte: bleibt für Suchmaschinen gesperrt, bis echte Artikel drin sind.
export const metadata: Metadata = {
  title: "Pflege für zuhause",
  description: "Pflegeprodukte für Wimpern, Brauen und die Zeit nach deinem Termin.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="bg-cream px-5 pb-28 pt-24 md:pb-24 md:pt-32 lg:px-8">
        <div className="mx-auto max-w-[1136px]">
          <h1 className="text-balance font-display text-[clamp(44px,7vw,92px)] leading-[0.98] tracking-[-0.022em] text-charcoal">Pflege für zuhause.</h1>
          <p className="mt-5 max-w-[34em] text-[19px] leading-snug text-charcoal/75">
            Damit dein Ergebnis lange schön bleibt. Das sind noch Beispielprodukte, die echten folgen bald.
          </p>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SHOP_EXAMPLES.map((product) => (
              <li key={product.id} className="group flex flex-col rounded-[28px] bg-white p-6">
                <div className="flex h-64 items-center justify-center rounded-2xl bg-[#F3EEE7]">
                  <ProductArt shape={product.shape} className="h-48 drop-shadow-[0_16px_20px_rgba(44,40,38,.2)] transition-transform duration-700 ease-out group-hover:-translate-y-1.5" />
                </div>
                <p className="mt-5 text-[13px] text-charcoal/75">Beispielprodukt</p>
                <h2 className="mt-1 font-display text-[28px] leading-[1.05] tracking-[-0.012em] text-charcoal">{product.title}</h2>
                <p className="mt-2 flex-1 text-[15px] leading-snug text-charcoal/75">{product.detail}</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-[15px] font-medium text-charcoal">{product.price} €</span>
                  <Pill href={whatsappUrl(`Hallo Sidorela, ich interessiere mich für ${product.title}.`)} variant="outline" className="min-h-11 px-5">Anfragen</Pill>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
