import { type NextRequest, NextResponse } from 'next/server'
import { fetchMarkets } from '@/lib/coingecko'

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const page = Math.max(1, Number(params.get('page') ?? 1))
  const limit = Math.min(100, Math.max(1, Number(params.get('limit') ?? 50)))
  const order = params.get('order') ?? 'market_cap_desc'

  try {
    const tokens = await fetchMarkets(page, limit, order)
    return NextResponse.json({
      data: tokens,
      meta: { page, limit, order, cached: true, timestamp: Date.now() },
    })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal error' },
      { status: 502 },
    )
  }
}
