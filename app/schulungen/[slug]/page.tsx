import { client } from "@/sanity/lib/client"
import { defineQuery } from "next-sanity"
import { notFound } from "next/navigation"
import { Header } from "@/components/ownui/Header"
import { Footer } from "@/components/ownui/Footer"
import { CtaBooking } from "@/components/ownui/CtaBooking"
import type { Metadata } from "next"
import { TrainingDetail } from "./client"
import { JsonLd } from "@/components/ownui/JsonLd"
import { breadcrumbs, courseSchema } from "@/lib/schema"
import { getTraining } from "@/lib/content"
import { LEGACY_TEST_IDS, TRAININGS } from "@/lib/catalog"

const SLUGS_QUERY = defineQuery(`*[_type == "training" && defined(slug.current) && !(_id in $hidden)] { "slug": slug.current }`)

export async function generateStaticParams() {
  const data = await client.fetch(SLUGS_QUERY, { hidden: LEGACY_TEST_IDS })
  const slugs = [...(data ?? []).map((item: { slug: string }) => item.slug), ...TRAININGS.map((training) => training.slug)]
  return [...new Set(slugs)].map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const training = await getTraining(slug)
  if (!training) return {}
  return {
    title: training.seoTitle ?? training.title ?? undefined,
    description: training.seoDescription ?? `${training.title} bei Sidorela Isa in Bruchsal und Jülich. Professionelle Ausbildung mit Praxis und Starterset.`,
    alternates: { canonical: `/schulungen/${slug}` },
  }
}

export default async function TrainingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const training = await getTraining(slug)
  if (!training) notFound()
  return (
    <>
      <JsonLd
        data={courseSchema(
          {
            title: training.title ?? "",
            slug,
            price: training.price,
            durationDays: training.durationDays,
            upcomingDates: training.upcomingDates,
          },
          training.seoDescription ?? `${training.title} bei Sidorela Isa in Bruchsal und Jülich.`,
        )}
      />
      <JsonLd data={breadcrumbs([{ name: "Schulungen", path: "/schulungen" }, { name: training.title ?? "", path: `/schulungen/${slug}` }])} />
      <Header />
      <main>
        <TrainingDetail training={training} />
        <CtaBooking />
      </main>
      <Footer />
    </>
  )
}
