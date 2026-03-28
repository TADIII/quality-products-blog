import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const sites = await db.site.findMany({
    include: {
      _count: {
        select: {
          posts: true,
          categories: true,
          authors: true,
        },
      },
    },
  })

  return NextResponse.json(sites)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const site = await db.site.create({
      data: {
        name: body.name,
        description: body.description,
        domain: body.domain,
        primaryColor: body.primaryColor || '#b7004f',
        secondaryColor: body.secondaryColor || '#5f5c6f',
      },
    })

    return NextResponse.json(site)
  } catch (error) {
    console.error('Error creating site:', error)
    return NextResponse.json(
      { error: 'Failed to create site' },
      { status: 500 }
    )
  }
}
