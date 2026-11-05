import { cache } from "react"
import { defineQuery } from "next-sanity"
import { urlFor } from "@/sanity/lib/image"
import { sanityFetch } from "@/sanity/lib/live"
import { BOOKABLES, type Bookable } from "./booking"
import { LEGACY_TEST_IDS, QUIZ_WHY, fallbackServices, fallbackTrainings, type SanityImageRef } from "./catalog"
import { BRIDE_OPTIONS, GIFT_AMOUNTS, SHOP_EXAMPLES, TREATMENTS } from "./offers"
import { CATEGORY_LABELS, CREDENTIALS, LOCATIONS, SITE, mapsUrl, type SiteLocation } from "./site"
import { DEFAULT_TEXTS, mergeTexts } from "./texts"

const SERVICE_FIELDS = `_id, title, "slug": slug.current, category, shortDescription, description, priceFrom, duration, order, bookingOrder, quizWhy,
  "image": image{ ..., asset }, "gallery": gallery[]{ ..., asset }, calcomEventType, seoTitle, seoDescription`

const SERVICES_QUERY = defineQuery(`*[_type == "service" && defined(slug.current) && !(_id in $hidden)] | order(order asc) { ${SERVICE_FIELDS} }`)

const TRAININGS_QUERY = defineQuery(`*[_type == "training" && defined(slug.current) && !(_id in $hidden)] | order(title asc) {
  _id, title, "slug": slug.current, level, description, durationDays, price, includes,
  "upcomingDates": upcomingDates[]{date, location, spotsLeft}, "image": image{ ..., asset }, seoTitle, seoDescription
}`)

const SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings" && !(_id in path("drafts.**"))][0]`)
const TEXTS_QUERY = defineQuery(`*[_type == "pageTexts"][0]`)
const CATEGORIES_QUERY = defineQuery(`*[_type == "treatmentCategory"] | order(order asc) { key, title, label, line }`)
const PRODUCTS_QUERY = defineQuery(`*[_type == "product"] | order(order asc) { _id, title, detail, price, shape, isExample }`)

export type ServiceItem = ReturnType<typeof fallbackServices>[number]
export type TrainingItem = ReturnType<typeof fallbackTrainings>[number]

export const getServices = cache(async (): Promise<ServiceItem[]> => {
  const { data } = await sanityFetch({ query: SERVICES_QUERY, params: { hidden: LEGACY_TEST_IDS } })
  return Array.isArray(data) && data.length ? (data as ServiceItem[]) : fallbackServices()
})

export const getTrainings = cache(async (): Promise<TrainingItem[]> => {
  const { data } = await sanityFetch({ query: TRAININGS_QUERY, params: { hidden: LEGACY_TEST_IDS } })
  return Array.isArray(data) && data.length ? (data as TrainingItem[]) : fallbackTrainings()
})

export async function getService(slug: string) {
  return (await getServices()).find((service) => service.slug === slug) ?? null
}

export async function getTraining(slug: string) {
  return (await getTrainings()).find((training) => training.slug === slug) ?? null
}

export const getTexts = cache(async () => {
  const { data } = await sanityFetch({ query: TEXTS_QUERY })
  return mergeTexts(DEFAULT_TEXTS, data)
})

type SettingsLocation = Partial<SiteLocation> & { mapsQuery?: string | null }

export const getSite = cache(async () => {
  const { data } = await sanityFetch({ query: SETTINGS_QUERY })
  const settings = (data ?? {}) as Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  const fromCms: SettingsLocation[] = (settings.locations ?? []).filter((location: SettingsLocation) => location?.street)
  const locations: SiteLocation[] = fromCms.length
    ? fromCms.map((location) => {
        const base = LOCATIONS.find((item) => item.city === location.city)
        const merged = { ...base, ...location } as SiteLocation
        return {
          ...merged,
          slug: (location.slug ?? base?.slug ?? String(location.city).toLowerCase()) as SiteLocation["slug"],
          nearby: location.nearby ?? base?.nearby ?? [],
          reviewUrl: location.reviewUrl ?? base?.reviewUrl ?? null,
          mapsUrl: location.mapsQuery ? mapsUrl(location.mapsQuery) : base?.mapsUrl ?? mapsUrl(`${merged.street}, ${merged.postalCode} ${merged.city}`),
        }
      })
    : LOCATIONS
  const heroImage: SanityImageRef | null = settings.heroImage?.asset ? settings.heroImage : null

  return {
    name: SITE.name,
    owner: SITE.owner,
    email: settings.email ?? SITE.email,
    phone: settings.phone ?? SITE.phone,
    phoneDisplay: settings.phoneDisplay ?? SITE.phoneDisplay,
    whatsapp: settings.whatsapp ?? SITE.whatsapp,
    instagram: settings.instagram ?? SITE.instagram,
    instagramHandle: settings.instagramHandle ?? SITE.instagramHandle,
    tiktok: (settings.tiktok ?? null) as string | null,
    locations,
    credentials: (settings.credentials?.length ? settings.credentials : CREDENTIALS) as typeof CREDENTIALS,
    giftAmounts: (settings.giftAmounts?.length ? settings.giftAmounts : GIFT_AMOUNTS) as number[],
    trainingFee: (settings.trainingFee ?? 499) as number,
    brideOptions: (settings.brideOptions?.length ? settings.brideOptions : BRIDE_OPTIONS) as { id: string; title: string; detail: string; price: number | null }[],
    bookingExtras: (settings.bookingExtras?.length ? settings.bookingExtras : BOOKABLES.filter((item) => item.from === 0)) as Pick<Bookable, "id" | "title" | "minutes" | "event">[],
    heroImageUrl: heroImage ? urlFor(heroImage).width(1400).url() : "/hero.png",
  }
})

export const getCategories = cache(async () => {
  const [{ data }, services] = await Promise.all([sanityFetch({ query: CATEGORIES_QUERY }), getServices()])
  const rows = (Array.isArray(data) && data.length ? data : TREATMENTS.map((item) => ({ key: item.id, title: item.title, label: CATEGORY_LABELS[item.id], line: item.line }))) as { key: string; title: string; label: string; line: string }[]
  return rows.map((row) => {
    const prices = services.filter((service) => service.category === row.key).flatMap((service) => (service.priceFrom ? [service.priceFrom] : []))
    return { id: row.key, title: row.title, label: row.label, line: row.line, from: prices.length ? Math.min(...prices) : (TREATMENTS.find((item) => item.id === row.key)?.from ?? 0) }
  })
})

export const getBookables = cache(async (): Promise<Bookable[]> => {
  const [services, site] = await Promise.all([getServices(), getSite()])
  const treatments = [...services]
    .sort((a, b) => (a.bookingOrder ?? 99) - (b.bookingOrder ?? 99))
    .map((service) => ({ id: service.slug, title: service.title, minutes: service.duration ?? 60, from: service.priceFrom ?? null, event: service.calcomEventType ?? null }))
  return [...treatments, ...site.bookingExtras.map((extra) => ({ ...extra, from: 0, event: extra.event ?? null }))]
})

export const getProducts = cache(async () => {
  const { data } = await sanityFetch({ query: PRODUCTS_QUERY })
  return ((Array.isArray(data) && data.length ? data : SHOP_EXAMPLES.map((item) => ({ _id: item.id, title: item.title, detail: item.detail, price: item.price, shape: item.shape, isExample: true }))) as { _id: string; title: string; detail: string; price: number; shape: "pump" | "serum" | "tube" | "wand"; isExample?: boolean }[])
})

export const getQuizServices = cache(async () => {
  const services = await getServices()
  return Object.fromEntries(services.map((service) => [service.slug, { title: service.slug === "event-make-up" ? "Event-Make-up" : service.title, from: service.priceFrom ?? 0, why: service.quizWhy ?? QUIZ_WHY[service.slug] ?? service.shortDescription ?? "" }]))
})
