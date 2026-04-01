export interface Token {
  id: string
  symbol: string
  name: string
  image: string
  price: number
  change24h: number
  change7d: number
  marketCap: number
  volume: number
  sparkline: number[]
}

export interface PricePoint {
  time: string
  value: number
}

export interface DexPair {
  id: string
  token0: string
  token1: string
  liquidity: number
  volume24h: number
  fee: number
  exchange: string
  price: number
  change24h: number
}

export interface MarketStats {
  totalMarketCap: number
  totalVolume: number
  btcDominance: number
  activePairs: number
}

export interface TenantConfig {
  id: string
  name: string
  domain: string
  logo: string | null
  primaryColor: string
  accentColor: string
  tier: 'free' | 'pro' | 'enterprise'
}
