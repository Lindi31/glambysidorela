// Bringt alle Inhalte der Website ins Sanity Studio, genau so wie sie gerade angezeigt werden.
// Vorhandene Einträge werden nicht überschrieben, das Skript darf also mehrfach laufen.
//
//   npx sanity login
//   npx sanity exec scripts/seed-content.ts --with-user-token
//
// Probelauf ohne Schreiben: npx sanity exec scripts/seed-content.ts -- --dry
import { createReadStream } from "node:fs"
import { join } from "node:path"
import { getCliClient } from "sanity/cli"
import { BOOKABLES } from "../lib/booking"
import { QUIZ_WHY, SERVICES, SERVICE_DETAILS, TRAININGS, textBlocks } from "../lib/catalog"
import { BRIDE_OPTIONS, GIFT_AMOUNTS, SHOP_EXAMPLES, TREATMENTS } from "../lib/offers"
import { CATEGORY_LABELS, CREDENTIALS, LOCATIONS, SITE } from "../lib/site"
import { DEFAULT_TEXTS } from "../lib/texts"

const dry = process.argv.includes("--dry")
const SETTINGS_ID = "33ce2182-7ac1-45d8-903e-b93695ac8cd5"

let keyCount = 0
const key = () => `k${++keyCount}`

const heading = (text: string) => ({ _type: "block", _key: key(), style: "h2", markDefs: [], children: [{ _type: "span", _key: key(), text, marks: [] }] })
const paragraph = (text: string) => ({ _type: "block", _key: key(), style: "normal", markDefs: [], children: [{ _type: "span", _key: key(), text, marks: [] }] })

const services = SERVICES.map((service, index) => ({
  _id: `service-${service.slug}`,
  _type: "service",
  title: service.title,
  slug: { _type: "slug", current: service.slug },
  category: service.category,
  shortDescription: service.short,
  description: textBlocks(service.body),
  duration: service.duration,
  ...(service.priceFrom ? { priceFrom: service.priceFrom } : {}),
  order: index + 1,
  bookingOrder: BOOKABLES.findIndex((item) => item.id === service.slug) + 1,
  ...(BOOKABLES.find((item) => item.id === service.slug)?.event ? { calcomEventType: BOOKABLES.find((item) => item.id === service.slug)?.event } : {}),
  ...(QUIZ_WHY[service.slug] ? { quizWhy: QUIZ_WHY[service.slug] } : {}),
  ...(SERVICE_DETAILS[service.slug]?.lasts ? { lasts: SERVICE_DETAILS[service.slug].lasts } : {}),
  idealFor: SERVICE_DETAILS[service.slug]?.idealFor ?? [],
  faq: (SERVICE_DETAILS[service.slug]?.faq ?? []).map((item) => ({ _key: key(), ...item })),
  seoTitle: `${service.title} in Bruchsal und Jülich`,
  seoDescription: `${service.short} Bei Sidorela Isa in Bruchsal und Jülich. Jetzt Termin buchen.`,
}))

const trainings = TRAININGS.map((training) => ({
  _id: `training-${training.slug}`,
  _type: "training",
  title: training.title,
  slug: { _type: "slug", current: training.slug },
  level: training.level,
  ...(training.price ? { price: training.price } : {}),
  includes: training.includes,
  description: textBlocks([training.text]),
  seoTitle: `${training.title} in Bruchsal und Jülich`,
  seoDescription: training.seo,
}))

const categories = TREATMENTS.map((treatment, index) => ({
  _id: `category-${treatment.id}`,
  _type: "treatmentCategory",
  key: treatment.id,
  title: treatment.title,
  label: CATEGORY_LABELS[treatment.id],
  line: treatment.line,
  order: index + 1,
}))

const products = SHOP_EXAMPLES.map((product, index) => ({
  _id: `product-${product.id}`,
  _type: "product",
  title: product.title,
  detail: product.detail,
  price: product.price,
  shape: product.shape,
  isExample: true,
  order: index + 1,
}))

const main = LOCATIONS[0]
const legal = [
  {
    _id: "legal-impressum",
    _type: "legalPage",
    title: "Impressum",
    slug: { _type: "slug", current: "impressum" },
    content: [
      heading("Angaben gemäß § 5 DDG"),
      paragraph(`${SITE.owner}\n${SITE.name}\n${main.street}\n${main.postalCode} ${main.city}`),
      heading("Kontakt"),
      paragraph(`Telefon: ${SITE.phoneDisplay}\nE-Mail: ${SITE.email}`),
    ],
  },
  {
    _id: "legal-datenschutz",
    _type: "legalPage",
    title: "Datenschutzerklärung",
    slug: { _type: "slug", current: "datenschutz" },
    content: [
      heading("Verantwortlich"),
      paragraph(`${SITE.owner}, ${SITE.name}\n${main.street}, ${main.postalCode} ${main.city}\n${SITE.email}`),
      heading("Hosting"),
      paragraph("Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf verarbeitet der Anbieter technisch notwendige Daten wie IP-Adresse, Datum, Uhrzeit und aufgerufene Seite, um die Website sicher bereitzustellen (Art. 6 Abs. 1 lit. f DSGVO)."),
      heading("Kontaktformular"),
      paragraph("Wenn du das Kontaktformular nutzt, werden Name, E-Mail-Adresse und Nachricht verarbeitet, um deine Anfrage zu beantworten (Art. 6 Abs. 1 lit. b DSGVO). Der Versand erfolgt über den E-Mail-Dienst Resend."),
      heading("Anfragen über die Website"),
      paragraph("Bei Gutschein-Bestellungen, Brautpaket-Anfragen und der Warteliste für Schulungen werden deine Angaben verarbeitet, um deine Anfrage zu bearbeiten (Art. 6 Abs. 1 lit. b DSGVO). Der Versand erfolgt über Resend."),
      heading("Nachfüll-Erinnerung"),
      paragraph("Wenn du eine Erinnerung anforderst, nutzen wir deine E-Mail-Adresse einmalig dafür (Art. 6 Abs. 1 lit. a DSGVO). Du kannst deine Einwilligung jederzeit per E-Mail widerrufen."),
      heading("Terminbuchung"),
      paragraph("Für freie Zeiten und die Terminverwaltung nutzen wir im Hintergrund Cal.com. Wenn du buchst, werden Name, E-Mail-Adresse und deine optionalen Angaben dorthin übertragen, um den Termin durchzuführen und zu bestätigen (Art. 6 Abs. 1 lit. b DSGVO)."),
      heading("WhatsApp und Instagram"),
      paragraph("Links zu WhatsApp und Instagram führen zu Angeboten der Meta-Gruppe. Daten werden erst übertragen, wenn du einen dieser Links aufrufst. Dort gelten die Datenschutzhinweise des jeweiligen Anbieters."),
      heading("Inhalte und Bilder"),
      paragraph("Texte und Bilder dieser Website werden über das Content-System Sanity ausgeliefert. Dabei wird technisch bedingt deine IP-Adresse verarbeitet (Art. 6 Abs. 1 lit. f DSGVO)."),
      heading("Deine Rechte"),
      paragraph("Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde beschweren."),
    ],
  },
]

const locations = LOCATIONS.map((location) => ({
  _key: location.slug,
  city: location.city,
  slug: location.slug,
  street: location.street,
  postalCode: location.postalCode,
  region: location.region,
  regionName: location.regionName,
  hours: location.hours,
  nearby: location.nearby,
  mapsQuery: location.slug === "bruchsal" ? `${SITE.name}, ${location.street}, ${location.postalCode} ${location.city}` : `${location.street}, ${location.postalCode} ${location.city}`,
  ...(location.reviewUrl ? { reviewUrl: location.reviewUrl } : {}),
}))

const settings = {
  brandName: SITE.name,
  tagline: DEFAULT_TEXTS.home.headline,
  email: SITE.email,
  phone: SITE.phone,
  phoneDisplay: SITE.phoneDisplay,
  whatsapp: SITE.whatsapp,
  instagramHandle: SITE.instagramHandle,
  credentials: CREDENTIALS.map((item) => ({ _key: key(), ...item })),
  giftAmounts: GIFT_AMOUNTS,
  trainingFee: 499,
  brideOptions: BRIDE_OPTIONS.map((option) => ({ _key: option.id, id: option.id, title: option.title, detail: option.detail, ...(option.price ? { price: option.price } : {}) })),
  bookingExtras: BOOKABLES.filter((item) => item.from === 0).map((item) => ({ _key: item.id, id: item.id, title: item.title, minutes: item.minutes, event: item.event })),
}

async function main_() {
  const docs = [...services, ...trainings, ...categories, ...products, ...legal]
  console.log(`${services.length} Leistungen, ${trainings.length} Schulungen, ${categories.length} Bereiche, ${products.length} Produkte, ${legal.length} Rechtsseiten, Seitentexte, Über mich und Einstellungen`)
  if (dry) return

  const client = getCliClient({ apiVersion: "2026-04-22" })
  const photo = await client.assets.upload("image", createReadStream(join(process.cwd(), "public/hero.png")), { filename: "sidorela-isa.png" })
  const image = { _type: "image", asset: { _type: "reference", _ref: photo._id } }

  const transaction = client.transaction()
  for (const doc of docs as Array<{ _id: string; _type: string }>) transaction.createIfNotExists(doc)
  transaction.createIfNotExists({ _id: "pageTexts", _type: "pageTexts", ...DEFAULT_TEXTS })
  transaction.createIfNotExists({
    _id: "about",
    _type: "about",
    headline: DEFAULT_TEXTS.ueberMich.fallbackHeadline,
    heroImage: image,
    story: textBlocks([DEFAULT_TEXTS.ueberMich.fallbackStory]),
  })

  const current = await client.fetch<{ locations?: { street?: string }[] } | null>(`*[_id == $id][0]{ locations }`, { id: SETTINGS_ID })
  transaction.patch(SETTINGS_ID, (patch) =>
    patch.setIfMissing({ ...settings, heroImage: image }).set({
      instagram: SITE.instagram,
      ...(current?.locations?.some((location) => location.street) ? {} : { locations }),
    }),
  )

  await transaction.commit()
  console.log("Fertig. Alle Inhalte stehen jetzt im Studio.")
}

main_().catch((error) => {
  console.error(error)
  process.exit(1)
})
