// app/api/products/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const limit    = parseInt(searchParams.get('limit')  ?? '20')
  const offset   = parseInt(searchParams.get('offset') ?? '0')

  try {
    const products = await db.product.findMany({
      where:   category ? { category } : undefined,
      take:    limit,
      skip:    offset,
      orderBy: { createdAt: 'desc' },
    })
    const total = await db.product.count({
      where: category ? { category } : undefined,
    })
    return NextResponse.json({ products, total, limit, offset })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
