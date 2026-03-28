import Link from 'next/link'
import { db } from '@/lib/db'
import { Header } from '@/components/blog/Header'
import { Footer } from '@/components/blog/Footer'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { Search, ArrowLeft } from 'lucide-react'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q || ''

  const site = await db.site.findFirst({
    include: {
      pages: { where: { published: true } },
    },
  })

  let posts: any[] = []

  if (site && query) {
    posts = await db.post.findMany({
      where: {
        siteId: site.id,
        published: true,
        OR: [
          { title: { contains: query } },
          { excerpt: { contains: query } },
        ],
      },
      include: {
        author: true,
        category: true,
      },
      orderBy: { publishedAt: 'desc' },
    })
  }

  return (
    <>
      <Header pages={site?.pages || []} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Search Form */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-8">
            Search Articles
          </h1>
          <form action="/search" method="get" className="flex gap-4 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search for articles..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        {query && (
          <div>
            <p className="text-muted-foreground mb-8">
              {posts.length === 0
                ? `No results found for "${query}"`
                : `Found ${posts.length} result${posts.length === 1 ? '' : 's'} for "${query}"`}
            </p>

            <div className="space-y-16">
              {posts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {!query && (
          <div className="text-center py-12 text-muted-foreground">
            Enter a search term to find articles.
          </div>
        )}
      </main>

      <Footer pages={site?.pages || []} />
    </>
  )
}
