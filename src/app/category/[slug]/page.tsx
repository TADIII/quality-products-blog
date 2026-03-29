import { notFound } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'
import { Header } from '@/components/blog/Header'
import { Footer } from '@/components/blog/Footer'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { Pagination } from '@/components/blog/Pagination'
import { ArrowLeft } from 'lucide-react'

// Force dynamic rendering - don't query database during build
export const dynamic = 'force-dynamic'

const POSTS_PER_PAGE = 3

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const { slug } = await params
  const { page } = await searchParams
  const currentPage = parseInt(page || '1')

  const site = await db.site.findFirst({
    include: {
      pages: { where: { published: true } },
    },
  })

  if (!site) return notFound()

  const category = await db.category.findFirst({
    where: {
      slug,
      siteId: site.id,
    },
  })

  if (!category) return notFound()

  const [posts, totalPosts] = await Promise.all([
    db.post.findMany({
      where: {
        siteId: site.id,
        published: true,
        categoryId: category.id,
      },
      include: {
        author: true,
        category: true,
      },
      orderBy: { publishedAt: 'desc' },
      skip: (currentPage - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
    }),
    db.post.count({
      where: {
        siteId: site.id,
        published: true,
        categoryId: category.id,
      },
    }),
  ])

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  return (
    <>
      <Header pages={site.pages} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Category Header */}
        <div className="mb-12">
          <h1
            className="text-3xl md:text-5xl font-extrabold leading-tight"
            style={{ color: category.color }}
          >
            {category.name}
          </h1>
          {category.description && (
            <p className="text-muted-foreground mt-4">{category.description}</p>
          )}
        </div>

        {/* Posts */}
        <div className="space-y-16">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No posts found in this category.
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/category/${slug}`}
          />
        )}
      </main>

      <Footer pages={site.pages} />
    </>
  )
}
