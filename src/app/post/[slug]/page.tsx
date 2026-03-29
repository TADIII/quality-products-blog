import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { db } from '@/lib/db'
import { Header } from '@/components/blog/Header'
import { Footer } from '@/components/blog/Footer'
import { MiniArticleCard } from '@/components/blog/MiniArticleCard'
import { Calendar, ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

// Force dynamic rendering - don't query database during build
export const dynamic = 'force-dynamic'

export default async function PostPage({
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

  const post = await db.post.findFirst({
    where: {
      slug,
      siteId: site.id,
      published: true,
    },
    include: {
      author: true,
      category: true,
    },
  })

  if (!post) return notFound()

  // Get related posts
  const relatedPosts = await db.post.findMany({
    where: {
      siteId: site.id,
      published: true,
      categoryId: post.categoryId,
      NOT: { id: post.id },
    },
    include: {
      author: true,
      category: true,
    },
    take: 4,
    orderBy: { publishedAt: 'desc' },
  })

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

        {/* Category Badge */}
        <Link
          href={`/category/${post.category.slug}`}
          className="inline-block px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 transition-colors hover:opacity-80"
          style={{
            backgroundColor: `${post.category.color}20`,
            color: post.category.color,
          }}
        >
          {post.category.name}
        </Link>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-muted-foreground mb-8">
          <span className="font-semibold text-foreground">
            {post.author.name}
          </span>
          {post.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
            </span>
          )}
        </div>

        {/* Featured Image */}
        <div className="aspect-video overflow-hidden rounded-xl mb-12">
          <img
            src={post.imageUrl}
            alt={post.imageAlt || post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none mb-16">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        {/* Affiliate Disclosure */}
        <div className="bg-muted/50 p-6 rounded-xl mb-16">
          <p className="text-xs text-muted-foreground">
            <strong>Affiliate Disclosure:</strong> This post may contain
            affiliate links. If you make a purchase through these links, we may
            earn a commission at no additional cost to you. We only recommend
            products we truly believe in.
          </p>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="pt-12 border-t">
            <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <MiniArticleCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer pages={site.pages} />
    </>
  )
}
