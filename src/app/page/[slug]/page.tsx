import { notFound } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'
import { Header } from '@/components/blog/Header'
import { Footer } from '@/components/blog/Footer'
import { ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export async function generateStaticParams() {
  const site = await db.site.findFirst()
  if (!site) return []

  const pages = await db.page.findMany({
    where: { siteId: site.id, published: true },
    select: { slug: true },
  })

  return pages.map((page) => ({ slug: page.slug }))
}

export default async function StaticPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const site = await db.site.findFirst({
    include: {
      pages: { where: { published: true } },
    },
  })

  if (!site) return notFound()

  const page = await db.page.findFirst({
    where: {
      slug,
      siteId: site.id,
      published: true,
    },
  })

  if (!page) return notFound()

  return (
    <>
      <Header pages={site.pages} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-8">
          {page.title}
        </h1>

        {/* Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown>{page.content}</ReactMarkdown>
        </article>
      </main>

      <Footer pages={site.pages} />
    </>
  )
}
