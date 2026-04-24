import type { MetadataRoute } from "next"
import { client } from "@/sanity/lib/client"
import { defineQuery } from "next-sanity"

const SLUGS_QUERY = defineQuery(`{
  "services": *[_type == "service"]{ "slug": slug.current },
  "trainings": *[_type == "training"]{ "slug": slug.current }
}`)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://glambysidorela.de").replace(/\/$/, "")

  const { services, trainings } = await client.fetch(SLUGS_QUERY)

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/leistungen`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/schulungen`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/galerie`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/ueber-mich`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/kontakt`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/termin`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/impressum`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/datenschutz`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = (services ?? []).map((s: { slug: string }) => ({
    url: `${baseUrl}/leistungen/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const trainingRoutes: MetadataRoute.Sitemap = (trainings ?? []).map((t: { slug: string }) => ({
    url: `${baseUrl}/schulungen/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...serviceRoutes, ...trainingRoutes]
}
