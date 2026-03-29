import Link from 'next/link'
import { db } from '@/lib/db'
import { Header } from '@/components/blog/Header'
import { Footer } from '@/components/blog/Footer'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { MiniArticleCard } from '@/components/blog/MiniArticleCard'
import { Sidebar } from '@/components/blog/Sidebar'
import { Pagination } from '@/components/blog/Pagination'

// Force dynamic rendering - don't query database during build
export const dynamic = 'force-dynamic'

const POSTS_PER_PAGE = 3

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const currentPage = parseInt(params.page || '1')

  // Fetch site data
  const site = await db.site.findFirst({
    include: {
      pages: {
        where: { published: true },
      },
    },
  })

  if (!site) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Site not found. Please run the seed script first.</p>
      </div>
    )
  }

  // Fetch posts for main content
  const [posts, totalPosts] = await Promise.all([
    db.post.findMany({
      where: {
        siteId: site.id,
        published: true,
      },
      include: {
        author: true,
        category: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
      skip: (currentPage - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
    }),
    db.post.count({
      where: {
        siteId: site.id,
        published: true,
      },
    }),
  ])

  // Fetch categories
  const categories = await db.category.findMany({
    where: {
      siteId: site.id,
    },
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: {
      name: 'asc',
    },
  })

  // Fetch recent posts for sidebar
  const recentPosts = await db.post.findMany({
    where: {
      siteId: site.id,
      published: true,
    },
    select: {
      id: true,
      title: true,
      slug: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: 5,
  })

  // Fetch "You May Have Missed" posts (older featured posts)
  const missedPosts = await db.post.findMany({
    where: {
      siteId: site.id,
      published: true,
    },
    include: {
      author: true,
      category: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
    skip: POSTS_PER_PAGE,
    take: 4,
  })

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  return (
    <>
      <Header pages={site.pages} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content: Left Column */}
          <div className="flex-1 space-y-16">
            {/* Article Cards */}
            {posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
              />
            )}
          </div>

          {/* Sidebar: Right Column */}
          <Sidebar 
            categories={categories} 
            recentPosts={recentPosts} 
          />
        </div>

        {/* 'You May Have Missed' Section */}
        {missedPosts.length > 0 && (
          <section className="mt-24 pt-16 border-t">
            <h3 className="text-2xl font-bold mb-12 flex items-center gap-3">
              <span className="w-12 h-0.5 bg-primary"></span>
              You May Have Missed
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {missedPosts.map((post) => (
                <MiniArticleCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer pages={site.pages} />
    </>
  )
}
