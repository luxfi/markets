import { fetchMarkets, fetchGlobal, fetchPriceHistory } from '@/lib/coingecko'
import { StatCard } from '@/components/stat-card'
import { Chart } from '@/components/chart'

export const revalidate = 60

interface Props {
  params: Promise<{ widget: string }>
  searchParams: Promise<{ symbol?: string; theme?: string }>
}

export default async function EmbedWidget({ params, searchParams }: Props) {
  const { widget } = await params
  const sp = await searchParams
  const symbol = sp.symbol ?? 'bitcoin'

  if (widget === 'overview') {
    const stats = await fetchGlobal()
    return (
      <div className="p-4 space-y-2">
        <StatCard label="Total Market Cap" value={`$${(stats.totalMarketCap / 1e12).toFixed(2)}T`} />
        <StatCard label="24h Volume" value={`$${(stats.totalVolume / 1e9).toFixed(0)}B`} />
        <StatCard label="BTC Dominance" value={`${stats.btcDominance.toFixed(1)}%`} />
      </div>
    )
  }

  if (widget === 'chart') {
    const history = await fetchPriceHistory(symbol, 7)
    return (
      <div className="p-4">
        <Chart data={history} height={200} />
      </div>
    )
  }

  if (widget === 'ticker') {
    const tokens = await fetchMarkets(1, 10)
    return (
      <div className="flex gap-6 overflow-x-auto px-4 py-2 text-sm font-mono whitespace-nowrap">
        {tokens.map((t) => (
          <span key={t.id} className="flex gap-2">
            <span className="uppercase text-[var(--muted)]">{t.symbol}</span>
            <span>${t.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className={t.change24h >= 0 ? 'text-[var(--positive)]' : 'text-[var(--negative)]'}>
              {t.change24h >= 0 ? '+' : ''}{t.change24h.toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    )
  }

  return <div className="p-4 text-[var(--muted)]">Unknown widget: {widget}</div>
}
