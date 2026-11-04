// Schreibt schöne Start-Inhalte nach Sanity. Löscht nichts und ändert den Wartungsmodus nicht.
//
//   npx sanity login
//   npx sanity exec scripts/seed-content.ts --with-user-token
//
// Ohne Token (--dry) zeigt das Skript nur, was es schreiben würde.
import { createReadStream } from "node:fs"
import { join } from "node:path"
import { getCliClient } from "sanity/cli"
import { SERVICES, TRAININGS } from "../lib/catalog"

const dry = process.argv.includes("--dry")

let key = 0
const nextKey = () => `seed${++key}`

const block = (text: string, style = "normal") => ({
  _type: "block",
  _key: nextKey(),
  style,
  markDefs: [],
  children: [{ _type: "span", _key: nextKey(), text, marks: [] }],
})

const services = SERVICES.map((service, index) => ({
  _id: `service-${service.slug}`,
  _type: "service",
  title: service.title,
  slug: { _type: "slug", current: service.slug },
  category: service.category,
  shortDescription: service.short,
  description: service.body.map((text) => block(text)),
  duration: service.duration,
  priceFrom: service.priceFrom,
  order: index + 1,
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
  description: [block(training.text)],
  seoTitle: `${training.title} in Bruchsal und Jülich`,
  seoDescription: training.seo,
}))

const locations = [
  { _key: "fa5db4587872", city: "Bruchsal", addressLine: "Spöckweg 14, 76646 Bruchsal", hours: "Mo–Fr: 9:00–18:00, Sa nach Vereinbarung" },
  { _key: "18eaf55786b6", city: "Jülich", addressLine: "Gartenstraße 1 C, 52428 Jülich", hours: "Nach Vereinbarung" },
]

async function main() {
  console.log(`${services.length} Leistungen, ${trainings.length} Schulungen, Über-mich-Seite und Standorte`)
  if (dry) return

  const client = getCliClient({ apiVersion: "2026-04-22" })

  const photo = await client.assets.upload("image", createReadStream(join(process.cwd(), "public/hero.png")), {
    filename: "sidorela-isa.png",
  })

  const transaction = client.transaction()
  for (const doc of [...services, ...trainings] as Array<{ _id: string; _type: string }>) transaction.createOrReplace(doc)
  transaction.createIfNotExists({ _id: "about", _type: "about" })
  transaction.patch("about", (patch) =>
    patch.set({
      headline: "Schönheit ist für mich Handwerk, Detail und Leidenschaft",
      heroImage: { _type: "image", asset: { _type: "reference", _ref: photo._id } },
      story: [
        block("Mein Name ist Sidorela Isa. Seit mehreren Jahren begleite ich Kundinnen auf ihrem Weg zum perfekten Look: ob als zarte Wimpernverlängerung für den Alltag, präzises Microblading oder strahlendes Braut-Make-up."),
        block("Mir ist wichtig, dass du dich vom ersten Gespräch an wohlfühlst. Darum nehme ich mir Zeit für deine Wünsche und stimme jede Behandlung persönlich auf dich ab."),
        block("Mein Wissen gebe ich in eigenen Schulungen an angehende Lash- und PMU-Artists weiter."),
      ],
      certifications: ["Zertifizierte Lash-Artist", "Zertifizierte PMU-Artist", "Eigene Schulungen mit Starter-Equipment"],
    }),
  )

  const settingsId = await client.fetch<string | null>(`*[_type == "siteSettings" && !(_id in path("drafts.**"))][0]._id`)
  if (settingsId) {
    transaction.patch(settingsId, (patch) =>
      patch.set({
        brandName: "GlamBySidorela",
        tagline: "Deine Schönheit, perfekt inszeniert.",
        instagram: "https://www.instagram.com/sidorelaisa",
        whatsapp: "4915252609602",
        locations,
      }),
    )
  }

  await transaction.commit()
  console.log("Fertig.")
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
