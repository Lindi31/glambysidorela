import { client } from "@/sanity/lib/client"
import { defineQuery } from "next-sanity"
import { notFound } from "next/navigation"
import { Header } from "@/components/ownui/Header"
import { Footer } from "@/components/ownui/Footer"
import { CtaBooking } from "@/components/ownui/CtaBooking"
import type { Metadata } from "next"
import { ServiceDetail } from "./client"
import { JsonLd } from "@/components/ownui/JsonLd"
import { breadcrumbs, serviceSchema } from "@/lib/schema"
import { urlFor } from "@/sanity/lib/image"
import { getService, getServices } from "@/lib/content"
import { LEGACY_TEST_IDS, SERVICES } from "@/lib/catalog"

const SLUGS_QUERY = defineQuery(`*[_type == "service" && defined(slug.current) && !(_id in $hidden)] { "slug": slug.current }`)

export async function generateStaticParams() {
  const data = await client.fetch(SLUGS_QUERY, { hidden: LEGACY_TEST_IDS })
  const slugs = [...(data ?? []).map((item: { slug: string }) => item.slug), ...SERVICES.map((service) => service.slug)]
  return [...new Set(slugs)].map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return {}
  return {
    title: service.seoTitle ?? `${service.title} in Bruchsal und Jülich`,
    description: service.seoDescription ?? service.shortDescription ?? undefined,
    alternates: { canonical: `/leistungen/${slug}` },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) notFound()
  const all = await getServices()
  const related = [
    ...all.filter((other) => other.slug !== slug && other.category === service.category),
    ...all.filter((other) => other.category !== service.category),
  ].slice(0, 3)
  return (
    <>
      <JsonLd
        data={serviceSchema({
          title: service.title ?? "",
          slug,
          category: service.category,
          shortDescription: service.seoDescription ?? service.shortDescription,
          priceFrom: service.priceFrom,
          image: service.image?.asset ? urlFor(service.image).width(1200).url() : null,
        })}
      />
      <JsonLd data={breadcrumbs([{ name: "Leistungen", path: "/leistungen" }, { name: service.title ?? "", path: `/leistungen/${slug}` }])} />
      <Header />
      <main>
        <ServiceDetail service={service} related={related} />
        <CtaBooking />
      </main>
      <Footer />
    </>
  )
}
