import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const featured = searchParams.get('featured')

  const site = await db.site.findFirst()
  if (!site) {
    return NextResponse.json({ error: 'Site not found' }, { status: 404 })
  }

  const where: any = {
    siteId: site.id,
    published: true,
  }

  if (category) {
    where.category = {
      slug: category,
    }
  }

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { excerpt: { contains: search } },
    ]
  }

  if (featured === 'true') {
    where.featured = true
  }

  const [posts, total] = await Promise.all([
    db.post.findMany({
      where,
      include: {
        author: true,
        category: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.post.count({ where }),
  ])

  return NextResponse.json({
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  })
}
