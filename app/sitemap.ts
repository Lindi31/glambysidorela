import type { MetadataRoute } from "next"
import { client } from "@/sanity/lib/client"
import { defineQuery } from "next-sanity"
import { LOCATIONS, SITE_URL } from "@/lib/site"
import { LEGACY_TEST_IDS, SERVICES, TRAININGS } from "@/lib/catalog"

const SLUGS_QUERY = defineQuery(`{
  "services": *[_type == "service" && defined(slug.current) && !(_id in $hidden)]{ "slug": slug.current, _updatedAt },
  "trainings": *[_type == "training" && defined(slug.current) && !(_id in $hidden)]{ "slug": slug.current, _updatedAt }
}`)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { services, trainings } = await client.fetch(SLUGS_QUERY, { hidden: LEGACY_TEST_IDS })
  const serviceRows = services?.length ? services : SERVICES.map((service) => ({ slug: service.slug, _updatedAt: undefined }))
  const trainingRows = trainings?.length ? trainings : TRAININGS.map((training) => ({ slug: training.slug, _updatedAt: undefined }))

  const staticPaths = ["", "/leistungen", "/schulungen", "/galerie", "/ueber-mich", "/kontakt", "/termin", "/beauty-check", "/brautpaket", "/gutschein"]

  return [
    ...staticPaths.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...LOCATIONS.map((location) => ({ url: `${SITE_URL}/standorte/${location.slug}` })),
    ...serviceRows.map((service: { slug: string | null; _updatedAt?: string }) => ({
      url: `${SITE_URL}/leistungen/${service.slug}`,
      lastModified: service._updatedAt,
    })),
    ...trainingRows.map((training: { slug: string | null; _updatedAt?: string }) => ({
      url: `${SITE_URL}/schulungen/${training.slug}`,
      lastModified: training._updatedAt,
    })),
  ]
}
