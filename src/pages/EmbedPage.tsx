import { useRoute, useSearch } from 'wouter'
import { fetchMarkets, fetchGlobal, fetchPriceHistory } from '../lib/coingecko'
import { StatCard } from '../components/stat-card'
import { Chart } from '../components/chart'
import { useAsync, fmtBig, fmtPrice } from '../lib/useAsync'

export function EmbedPage() {
  const [, params] = useRoute<{ widget: string }>('/embed/:widget')
  const search = useSearch()
  const q = new URLSearchParams(search)
  const symbol = q.get('symbol') ?? 'bitcoin'
  const widget = params?.widget ?? ''

  if (widget === 'overview') return <OverviewEmbed />
  if (widget === 'chart') return <ChartEmbed symbol={symbol} />
  if (widget === 'ticker') return <TickerEmbed />

  return <main className="page"><p className="empty">Unknown widget: {widget}</p></main>
}

function OverviewEmbed() {
  const statsQ = useAsync(() => fetchGlobal(), [])
  if (!statsQ.data) return <main className="page"><p className="empty">Loading…</p></main>
  const s = statsQ.data
  return (
    <main className="page">
      <div className="stats">
        <StatCard label="Market Cap" value={fmtBig(s.totalMarketCap)} />
        <StatCard label="24h Volume" value={fmtBig(s.totalVolume)} />
        <StatCard label="BTC Dom" value={`${s.btcDominance.toFixed(1)}%`} />
      </div>
    </main>
  )
}

function ChartEmbed({ symbol }: { symbol: string }) {
  const historyQ = useAsync(() => fetchPriceHistory(symbol, 7), [symbol])
  return (
    <main className="page">
      {historyQ.data ? <Chart data={historyQ.data} height={200} /> : <p className="empty">Loading…</p>}
    </main>
  )
}

function TickerEmbed() {
  const tokensQ = useAsync(() => fetchMarkets(1, 10), [])
  if (!tokensQ.data) return <main className="page"><p className="empty">Loading…</p></main>
  return (
    <main className="page">
      <div className="ticker">
        {tokensQ.data.map((t) => (
          <span key={t.id}>
            <span className="sym">{t.symbol}</span>
            {fmtPrice(t.price)}{' '}
            <span className={`badge ${t.change24h >= 0 ? 'pos' : 'neg'}`}>
              {t.change24h >= 0 ? '+' : ''}{t.change24h.toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </main>
  )
}
