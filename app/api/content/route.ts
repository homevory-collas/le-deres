// app/api/content/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const limit    = parseInt(searchParams.get('limit')  ?? '20')
  const offset   = parseInt(searchParams.get('offset') ?? '0')

  try {
    const items = await db.contentItem.findMany({
      where: {
        status:    'PUBLISHED',
        categoryId: category ?? undefined,
      },
      take:    limit,
      skip:    offset,
      orderBy: { publishedAt: 'desc' },
    })
    const total = await db.contentItem.count({
      where: { status: 'PUBLISHED', categoryId: category ?? undefined },
    })
    return NextResponse.json({ items, total })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}
