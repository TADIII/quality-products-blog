import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const site = await db.site.findFirst()
  if (!site) {
    return NextResponse.json({ error: 'Site not found' }, { status: 404 })
  }

  const categories = await db.category.findMany({
    where: {
      siteId: site.id,
    },
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
