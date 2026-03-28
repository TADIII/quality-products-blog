import Link from 'next/link'
import { format } from 'date-fns'

interface MiniArticleCardProps {
  post: {
    id: string
    title: string
    slug: string
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

export function MiniArticleCard({ post }: MiniArticleCardProps) {
  return (
    <div className="flex flex-col gap-4 group">
      {/* Image */}
      <Link 
        href={`/post/${post.slug}`}
        className="aspect-square overflow-hidden rounded-xl bg-muted relative"
      >
        <img
          src={post.imageUrl}
          alt={post.imageAlt || post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Category Badge */}
        <span 
          className="absolute top-3 left-3 px-3 py-1 text-[9px] font-bold rounded-full shadow-lg text-white"
          style={{ backgroundColor: post.category.color }}
        >
          {post.category.name.toUpperCase()}
        </span>
      </Link>

      {/* Title */}
      <Link href={`/post/${post.slug}`}>
        <h4 className="font-bold leading-tight group-hover:text-primary transition-colors">
          {post.title}
        </h4>
      </Link>

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">{post.author.name}</span>
        {post.publishedAt && (
          <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
        )}
      </div>
    </div>
  )
}
