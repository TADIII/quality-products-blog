import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  
  const site = await db.site.findFirst()
  if (!site) {
    return NextResponse.json({ error: 'Site not found' }, { status: 404 })
  }

  const post = await db.post.findFirst({
    where: {
      slug,
      siteId: site.id,
      published: true,
    },
    include: {
      author: true,
      category: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  // Get related posts
  const relatedPosts = await db.post.findMany({
    where: {
      siteId: site.id,
      published: true,
      categoryId: post.categoryId,
      NOT: {
        id: post.id,
      },
    },
    include: {
      author: true,
      category: true,
    },
    take: 4,
    orderBy: {
      publishedAt: 'desc',
    },
  })

  return NextResponse.json({ post, relatedPosts })
}
