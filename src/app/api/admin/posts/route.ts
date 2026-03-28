import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const siteId = searchParams.get('siteId')

  const where = siteId ? { siteId } : {}

  const posts = await db.post.findMany({
    where,
    include: {
      author: true,
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const post = await db.post.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        imageUrl: body.imageUrl,
        imageAlt: body.imageAlt,
        published: body.published || false,
        featured: body.featured || false,
        publishedAt: body.published ? new Date() : null,
        siteId: body.siteId,
        authorId: body.authorId,
        categoryId: body.categoryId,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
