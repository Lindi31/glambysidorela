import { defineQuery } from "next-sanity"
import { sanityFetch } from "@/sanity/lib/live"
import { LEGACY_TEST_IDS, fallbackServices, fallbackTrainings } from "./catalog"

const SERVICE_FIELDS = `_id, title, "slug": slug.current, category, shortDescription, description, priceFrom, duration, order,
  "image": image{ ..., asset }, "gallery": gallery[]{ ..., asset }, calcomEventType, seoTitle, seoDescription`

const SERVICES_QUERY = defineQuery(`*[_type == "service" && defined(slug.current) && !(_id in $hidden)] | order(order asc) { ${SERVICE_FIELDS} }`)

const TRAININGS_QUERY = defineQuery(`*[_type == "training" && defined(slug.current) && !(_id in $hidden)] | order(title asc) {
  _id, title, "slug": slug.current, level, description, durationDays, price, includes,
  "upcomingDates": upcomingDates[]{date, location, spotsLeft}, "image": image{ ..., asset }, seoTitle, seoDescription
}`)

export type ServiceItem = ReturnType<typeof fallbackServices>[number]
export type TrainingItem = ReturnType<typeof fallbackTrainings>[number]

export async function getServices(): Promise<ServiceItem[]> {
  const { data } = await sanityFetch({ query: SERVICES_QUERY, params: { hidden: LEGACY_TEST_IDS } })
  return data?.length ? (data as ServiceItem[]) : fallbackServices()
}

export async function getTrainings(): Promise<TrainingItem[]> {
  const { data } = await sanityFetch({ query: TRAININGS_QUERY, params: { hidden: LEGACY_TEST_IDS } })
  return data?.length ? (data as TrainingItem[]) : fallbackTrainings()
}

export async function getService(slug: string) {
  return (await getServices()).find((service) => service.slug === slug) ?? null
}

export async function getTraining(slug: string) {
  return (await getTrainings()).find((training) => training.slug === slug) ?? null
}
