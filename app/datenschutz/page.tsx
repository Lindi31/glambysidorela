import { client } from "@/sanity/lib/client"
import { defineQuery } from "next-sanity"
import { Header } from "@/components/ownui/Header"
import { Footer } from "@/components/ownui/Footer"
import { PortableText } from "@portabletext/react"
import type { Metadata } from "next"
import { LOCATIONS, SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false },
  alternates: { canonical: "/datenschutz" },
}

const DATENSCHUTZ_QUERY = defineQuery(`
  *[_type == "legalPage" && slug.current == "datenschutz"][0] { title, content }
`)

const SECTIONS = [
  {
    title: "Hosting",
    text: "Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf verarbeitet der Anbieter technisch notwendige Daten wie IP-Adresse, Datum, Uhrzeit und aufgerufene Seite, um die Website sicher bereitzustellen (Art. 6 Abs. 1 lit. f DSGVO).",
  },
  {
    title: "Kontaktformular",
    text: "Wenn du das Kontaktformular nutzt, werden Name, E-Mail-Adresse und Nachricht verarbeitet, um deine Anfrage zu beantworten (Art. 6 Abs. 1 lit. b DSGVO). Der Versand erfolgt über den E-Mail-Dienst Resend.",
  },
  {
    title: "Anfragen über die Website",
    text: "Bei Gutschein-Bestellungen, Brautpaket-Anfragen und der Warteliste für Schulungen werden deine Angaben verarbeitet, um deine Anfrage zu bearbeiten (Art. 6 Abs. 1 lit. b DSGVO). Der Versand erfolgt über Resend.",
  },
  {
    title: "Nachfüll-Erinnerung",
    text: "Wenn du eine Erinnerung anforderst, nutzen wir deine E-Mail-Adresse einmalig dafür (Art. 6 Abs. 1 lit. a DSGVO). Du kannst deine Einwilligung jederzeit per E-Mail widerrufen.",
  },
  {
    title: "Terminbuchung",
    text: "Für freie Zeiten und die Terminverwaltung nutzen wir im Hintergrund Cal.com. Wenn du buchst, werden Name, E-Mail-Adresse und deine optionalen Angaben dorthin übertragen, um den Termin durchzuführen und zu bestätigen (Art. 6 Abs. 1 lit. b DSGVO).",
  },
  {
    title: "WhatsApp und Instagram",
    text: "Links zu WhatsApp und Instagram führen zu Angeboten der Meta-Gruppe. Daten werden erst übertragen, wenn du einen dieser Links aufrufst. Dort gelten die Datenschutzhinweise des jeweiligen Anbieters.",
  },
  {
    title: "Inhalte und Bilder",
    text: "Texte und Bilder dieser Website werden über das Content-System Sanity ausgeliefert. Dabei wird technisch bedingt deine IP-Adresse verarbeitet (Art. 6 Abs. 1 lit. f DSGVO).",
  },
  {
    title: "Deine Rechte",
    text: "Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde beschweren.",
  },
]

export default async function DatenschutzPage() {
  const page = await client.fetch(DATENSCHUTZ_QUERY).catch(() => null)
  const main = LOCATIONS[0]

  return (
    <>
      <Header />
      <main className="min-h-svh bg-cream pb-16 pt-24 md:pb-24 md:pt-32">
        <div className="mx-auto max-w-[760px] px-5">
          <h1 className="mb-10 font-display text-[clamp(42px,6vw,72px)] leading-[1] tracking-[-0.022em] text-charcoal">
            {page?.title ?? "Datenschutzerklärung"}
          </h1>

          {page?.content ? (
            <div className="rich-text">
              <PortableText value={page.content} />
            </div>
          ) : (
            <div className="space-y-8 text-[17px] leading-relaxed text-charcoal/80">
              <section>
                <h2 className="mb-2 font-display text-[28px] leading-[1.1] text-charcoal">Verantwortlich</h2>
                <address className="not-italic">
                  {SITE.owner}, {SITE.name}
                  <br />
                  {main.street}, {main.postalCode} {main.city}
                  <br />
                  <a className="underline underline-offset-4" href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </address>
              </section>
              {SECTIONS.map((section) => (
                <section key={section.title}>
                  <h2 className="mb-2 font-display text-[28px] leading-[1.1] text-charcoal">{section.title}</h2>
                  <p>{section.text}</p>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
