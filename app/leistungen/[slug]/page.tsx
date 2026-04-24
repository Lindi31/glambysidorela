import { sanityFetch } from "@/sanity/lib/live"
import { client } from "@/sanity/lib/client"
import { defineQuery } from "next-sanity"
import { notFound } from "next/navigation"
import { Header } from "@/components/ownui/Header"
import { Footer } from "@/components/ownui/Footer"
import { CtaBooking } from "@/components/ownui/CtaBooking"
import type { Metadata } from "next"
import { ServiceDetail } from "./client"

const SERVICE_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, category, shortDescription, description,
    priceFrom, duration, image, gallery, calcomEventType, seoTitle, seoDescription
  }
`)

const ALL_SLUGS_QUERY = defineQuery(`*[_type == "service"] { "slug": slug.current }`)

export async function generateStaticParams() {
  const data = await client.fetch(ALL_SLUGS_QUERY)
  return data.filter((item: { slug: string | null }) => item.slug).map((item: { slug: string | null }) => ({ slug: item.slug! }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data: service } = await sanityFetch({ query: SERVICE_QUERY, params: { slug } })
  if (!service) return {}
  return {
    title: service.seoTitle ?? `${service.title} – GlamBySidorela`,
    description: service.seoDescription ?? service.shortDescription ?? undefined,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: service } = await sanityFetch({ query: SERVICE_QUERY, params: { slug } })
  if (!service) notFound()
  return (
    <>
      <Header />
      <main>
        <ServiceDetail service={service} />
        <CtaBooking />
      </main>
      <Footer />
    </>
  )
}
