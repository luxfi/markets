import type { DexPair, PricePoint } from './types'

// Mock Lux DEX V3 pairs — replaced with real on-chain data when indexer is ready
const MOCK_PAIRS: DexPair[] = [
  { id: 'lux-usdc', token0: 'LUX', token1: 'USDC', liquidity: 2_400_000, volume24h: 890_000, fee: 0.003, exchange: 'Lux DEX', price: 12.84, change24h: 3.2 },
  { id: 'lux-weth', token0: 'LUX', token1: 'WETH', liquidity: 1_800_000, volume24h: 620_000, fee: 0.003, exchange: 'Lux DEX', price: 0.0042, change24h: -1.1 },
  { id: 'weth-usdc', token0: 'WETH', token1: 'USDC', liquidity: 5_200_000, volume24h: 2_100_000, fee: 0.0005, exchange: 'Lux DEX', price: 3054.20, change24h: 0.8 },
  { id: 'wbtc-usdc', token0: 'WBTC', token1: 'USDC', liquidity: 4_100_000, volume24h: 1_500_000, fee: 0.003, exchange: 'Lux DEX', price: 69420.00, change24h: 1.5 },
  { id: 'usdc-usdt', token0: 'USDC', token1: 'USDT', liquidity: 8_000_000, volume24h: 3_200_000, fee: 0.0001, exchange: 'Lux DEX', price: 1.0001, change24h: 0.01 },
]

export async function fetchPairs(): Promise<DexPair[]> {
  return MOCK_PAIRS
}

export async function fetchPairHistory(_pairId: string, days = 7): Promise<PricePoint[]> {
  // Stub: generate synthetic data points
  const now = Date.now()
  const points: PricePoint[] = []
  for (let i = days; i >= 0; i--) {
    const ts = now - i * 86_400_000
    points.push({
      time: new Date(ts).toISOString().split('T')[0],
      value: 10 + Math.random() * 5,
    })
  }
  return points
}
