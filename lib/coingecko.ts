import type { Token, PricePoint, MarketStats } from './types'
import { cached } from './cache'

const BASE = 'https://api.coingecko.com/api/v3'

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 60 } })
  if (!res.ok) {
    throw new Error(`CoinGecko ${res.status}: ${path}`)
  }
  return res.json()
}

export interface CoinGeckoMarket {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  price_change_percentage_7d_in_currency?: number
  market_cap: number
  total_volume: number
  sparkline_in_7d?: { price: number[] }
}

function toToken(m: CoinGeckoMarket): Token {
  return {
    id: m.id,
    symbol: m.symbol,
    name: m.name,
    image: m.image,
    price: m.current_price,
    change24h: m.price_change_percentage_24h ?? 0,
    change7d: m.price_change_percentage_7d_in_currency ?? 0,
    marketCap: m.market_cap,
    volume: m.total_volume,
    sparkline: m.sparkline_in_7d?.price ?? [],
  }
}

export async function fetchMarkets(
  page = 1,
  perPage = 50,
  order = 'market_cap_desc',
): Promise<Token[]> {
  const key = `markets:${page}:${perPage}:${order}`
  return cached(key, 60_000, async () => {
    const data = await fetchJSON<CoinGeckoMarket[]>(
      `/coins/markets?vs_currency=usd&order=${order}&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=7d`,
    )
    return data.map(toToken)
  })
}

export async function fetchToken(id: string): Promise<Token> {
  return cached(`token:${id}`, 60_000, async () => {
    const data = await fetchJSON<CoinGeckoMarket[]>(
      `/coins/markets?vs_currency=usd&ids=${id}&sparkline=true&price_change_percentage=7d`,
    )
    if (data.length === 0) throw new Error(`Token not found: ${id}`)
    return toToken(data[0])
  })
}

export async function fetchPriceHistory(id: string, days = 7): Promise<PricePoint[]> {
  return cached(`history:${id}:${days}`, 300_000, async () => {
    const data = await fetchJSON<{ prices: [number, number][] }>(
      `/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
    )
    const seen = new Set<string>()
    const points: PricePoint[] = []
    for (const [ts, value] of data.prices) {
      const time = new Date(ts).toISOString().split('T')[0]
      if (!seen.has(time)) {
        seen.add(time)
        points.push({ time, value })
      }
    }
    return points
  })
}

export async function fetchGlobal(): Promise<MarketStats> {
  return cached('global', 120_000, async () => {
    const data = await fetchJSON<{
      data: {
        total_market_cap: Record<string, number>
        total_volume: Record<string, number>
        market_cap_percentage: Record<string, number>
        active_cryptocurrencies: number
      }
    }>('/global')
    return {
      totalMarketCap: data.data.total_market_cap.usd ?? 0,
      totalVolume: data.data.total_volume.usd ?? 0,
      btcDominance: data.data.market_cap_percentage.btc ?? 0,
      activePairs: data.data.active_cryptocurrencies ?? 0,
    }
  })
}
