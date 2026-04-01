import { fetchMarkets, fetchGlobal } from '@/lib/coingecko'
import { fetchPairs } from '@/lib/dex'
import { MarketTable } from '@/components/market-table'
import { PairsTable } from '@/components/pairs-table'
import { StatCard } from '@/components/stat-card'

export const revalidate = 60

function fmt(n: number, unit: string): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`
  return `$${n.toLocaleString()}`
}

export default async function Dashboard() {
  const [tokens, stats, pairs] = await Promise.all([
    fetchMarkets(1, 20),
    fetchGlobal(),
    fetchPairs(),
  ])

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Market Cap" value={fmt(stats.totalMarketCap, '$')} />
        <StatCard label="24h Volume" value={fmt(stats.totalVolume, '$')} />
        <StatCard label="BTC Dominance" value={`${stats.btcDominance.toFixed(1)}%`} />
        <StatCard label="Active Pairs" value={stats.activePairs.toLocaleString()} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
          <h2 className="text-lg font-semibold">Top Tokens</h2>
          <a href="/tokens" className="text-sm text-[var(--muted)] hover:text-white transition-colors">
            View all &rarr;
          </a>
        </div>
        <MarketTable tokens={tokens} />
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
          <h2 className="text-lg font-semibold">DEX Pairs</h2>
          <a href="/pairs" className="text-sm text-[var(--muted)] hover:text-white transition-colors">
            View all &rarr;
          </a>
        </div>
        <PairsTable pairs={pairs} />
      </div>
    </div>
  )
}
