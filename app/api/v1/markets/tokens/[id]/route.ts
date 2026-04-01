import { type NextRequest, NextResponse } from 'next/server'
import { fetchToken, fetchPriceHistory } from '@/lib/coingecko'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const days = Number(_req.nextUrl.searchParams.get('days') ?? 7)

  try {
    const [token, history] = await Promise.all([
      fetchToken(id),
      fetchPriceHistory(id, days),
    ])
    return NextResponse.json({
      data: { ...token, history },
      meta: { days, cached: true, timestamp: Date.now() },
    })
  } catch (err) {
    const status = err instanceof Error && err.message.includes('not found') ? 404 : 502
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal error' },
      { status },
    )
  }
}
