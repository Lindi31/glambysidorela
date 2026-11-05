import { client } from "@/sanity/lib/client"
import { BOOKABLE_EVENTS } from "./booking"

export async function getAllowedEvents(): Promise<string[]> {
  const data = await client
    .fetch<{ services?: (string | null)[]; extras?: (string | null)[] }>(`{
      "services": *[_type == "service" && defined(calcomEventType)].calcomEventType,
      "extras": *[_type == "siteSettings"][0].bookingExtras[].event
    }`)
    .catch(() => null)
  const fromCms = [...(data?.services ?? []), ...(data?.extras ?? [])].filter((value): value is string => Boolean(value))
  return [...new Set([...BOOKABLE_EVENTS, ...fromCms])]
}
