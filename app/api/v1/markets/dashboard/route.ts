import { NextResponse } from 'next/server'
import { fetchGlobal } from '@/lib/coingecko'
import { fetchPairs } from '@/lib/dex'

export async function GET() {
  try {
    const [stats, pairs] = await Promise.all([fetchGlobal(), fetchPairs()])
    const dexVolume = pairs.reduce((s, p) => s + p.volume24h, 0)
    const dexLiquidity = pairs.reduce((s, p) => s + p.liquidity, 0)

    return NextResponse.json({
      data: {
        ...stats,
        dexVolume,
        dexLiquidity,
        dexPairs: pairs.length,
      },
      meta: { cached: true, timestamp: Date.now() },
    })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal error' },
      { status: 502 },
    )
  }
}
