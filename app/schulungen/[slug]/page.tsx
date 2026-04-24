import { sanityFetch } from "@/sanity/lib/live"
import { client } from "@/sanity/lib/client"
import { defineQuery } from "next-sanity"
import { notFound } from "next/navigation"
import { Header } from "@/components/ownui/Header"
import { Footer } from "@/components/ownui/Footer"
import { CtaBooking } from "@/components/ownui/CtaBooking"
import type { Metadata } from "next"
import { TrainingDetail } from "./client"

const TRAINING_QUERY = defineQuery(`
  *[_type == "training" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, level, description, durationDays, price,
    includes, upcomingDates[]{date, location, spotsLeft}, image, seoTitle, seoDescription
  }
`)

const ALL_TRAINING_SLUGS_QUERY = defineQuery(`*[_type == "training"] { "slug": slug.current }`)

export async function generateStaticParams() {
  const data = await client.fetch(ALL_TRAINING_SLUGS_QUERY)
  return data.filter((item: { slug: string | null }) => item.slug).map((item: { slug: string | null }) => ({ slug: item.slug! }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data: training } = await sanityFetch({ query: TRAINING_QUERY, params: { slug } })
  if (!training) return {}
  return {
    title: training.seoTitle ?? `${training.title} – GlamBySidorela`,
    description: training.seoDescription ?? undefined,
  }
}

export default async function TrainingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: training } = await sanityFetch({ query: TRAINING_QUERY, params: { slug } })
  if (!training) notFound()
  return (
    <>
      <Header />
      <main>
        <TrainingDetail training={training} />
        <CtaBooking />
      </main>
      <Footer />
    </>
  )
}
