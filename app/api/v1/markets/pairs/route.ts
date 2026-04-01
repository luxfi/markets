import { NextResponse } from 'next/server'
import { fetchPairs } from '@/lib/dex'

export async function GET() {
  try {
    const pairs = await fetchPairs()
    return NextResponse.json({
      data: pairs,
      meta: { cached: true, timestamp: Date.now() },
    })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal error' },
      { status: 502 },
    )
  }
}
