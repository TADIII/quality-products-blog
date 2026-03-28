import Link from 'next/link'
import { format } from 'date-fns'
import { Calendar } from 'lucide-react'

interface ArticleCardProps {
  post: {
    id: string
    title: string
    slug: string
    excerpt: string | null
    imageUrl: string
    imageAlt: string | null
    publishedAt: Date | null
    author: {
      name: string
    }
    category: {
      name: string
      slug: string
      color: string
    }
  }
}

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article className="flex flex-col md:flex-row gap-8 items-start group">
      {/* Image */}
      <Link 
        href={`/post/${post.slug}`}
        className="w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-xl bg-muted"
      >
        <img
          src={post.imageUrl}
          alt={post.imageAlt || post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Content */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        {/* Category Badge */}
        <Link 
          href={`/category/${post.category.slug}`}
          className="inline-block px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase w-fit transition-colors hover:opacity-80"
          style={{ 
            backgroundColor: `${post.category.color}20`,
            color: post.category.color 
          }}
        >
          {post.category.name}
        </Link>

        {/* Title */}
        <Link href={`/post/${post.slug}`}>
          <h2 className="text-2xl md:text-3xl font-extrabold leading-tight hover:text-primary transition-colors">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-muted-foreground leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
      </div>
    </article>
  )
}
