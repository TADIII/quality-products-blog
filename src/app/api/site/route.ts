import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const site = await db.site.findFirst({
    include: {
      authors: true,
      pages: {
        where: { published: true },
      },
    },
  })

  if (!site) {
    return NextResponse.json({ error: 'Site not found' }, { status: 404 })
  }

  return NextResponse.json(site)
}
