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
    
    // Validate required fields
    const requiredFields = ['title', 'slug', 'content', 'imageUrl', 'siteId', 'authorId', 'categoryId']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }
    
    // Check if slug already exists for this site
    const existingPost = await db.post.findFirst({
      where: {
        siteId: body.siteId,
        slug: body.slug,
      },
    })
    
    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this slug already exists. Please use a different slug.' },
        { status: 400 }
      )
    }
    
    // Verify category exists and belongs to the site
    const category = await db.category.findFirst({
      where: {
        id: body.categoryId,
        siteId: body.siteId,
      },
    })
    
    if (!category) {
      return NextResponse.json(
        { error: 'Invalid category. Please select a valid category.' },
        { status: 400 }
      )
    }
    
    // Verify author exists and belongs to the site
    const author = await db.author.findFirst({
      where: {
        id: body.authorId,
        siteId: body.siteId,
      },
    })
    
    if (!author) {
      return NextResponse.json(
        { error: 'Invalid author. Please select a valid author.' },
        { status: 400 }
      )
    }
    
    const post = await db.post.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt || '',
        content: body.content,
        imageUrl: body.imageUrl,
        imageAlt: body.imageAlt || '',
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
      { error: 'Failed to create post: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}
