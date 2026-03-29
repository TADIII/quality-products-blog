import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const siteId = searchParams.get('siteId')

  const where = siteId ? { siteId } : {}

  const categories = await db.category.findMany({
    where,
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: {
      name: 'asc',
    },
  })

  return NextResponse.json(categories)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const category = await db.category.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        color: body.color || '#b7004f',
        siteId: body.siteId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
