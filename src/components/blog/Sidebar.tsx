'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Category {
  id: string
  name: string
  slug: string
  color: string
  _count?: { posts: number }
}

interface RecentPost {
  id: string
  title: string
  slug: string
}

interface SidebarProps {
  categories: Category[]
  recentPosts: RecentPost[]
}

export function Sidebar({ categories, recentPosts }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <aside className="w-full lg:w-80 flex flex-col gap-8">
      {/* Search Widget */}
      <div className="bg-muted/50 p-6 rounded-xl space-y-4">
        <h3 className="text-lg font-bold">Search</h3>
        <p className="text-sm text-muted-foreground">
          Find your next favorite product
        </p>
        <form action="/search" method="get" className="relative group">
          <Input
            type="search"
            name="q"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2"
          >
            <Search className="h-4 w-4 text-primary" />
          </Button>
        </form>
      </div>

      {/* Recent Posts Widget */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold border-l-4 border-primary pl-4">
          Recent Posts
        </h3>
        <ul className="space-y-3">
          {recentPosts.slice(0, 4).map((post) => (
            <li key={post.id}>
              <Link
                href={`/post/${post.slug}`}
                className="flex gap-3 group cursor-pointer"
              >
                <span className="text-primary mt-1 select-none">•</span>
                <span className="text-sm leading-snug font-medium group-hover:text-primary transition-colors">
                  {post.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories Widget */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold border-l-4 border-primary pl-4">
          Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="px-4 py-2 bg-muted/50 hover:bg-accent text-xs font-bold rounded-full transition-colors"
              style={{ 
                '--hover-bg': `${category.color}20`,
                '--hover-color': category.color 
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${category.color}20`
                e.currentTarget.style.color = category.color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = ''
                e.currentTarget.style.color = ''
              }}
            >
              {category.name.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
