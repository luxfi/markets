import { Link } from 'wouter'
import { fetchMarkets, fetchGlobal } from '../lib/coingecko'
import { fetchPairs } from '../lib/dex'
import { MarketTable } from '../components/market-table'
import { PairsTable } from '../components/pairs-table'
import { StatCard } from '../components/stat-card'
import { useAsync, fmtBig } from '../lib/useAsync'

export function DashboardPage() {
  const tokensQ = useAsync(() => fetchMarkets(1, 20), [])
  const statsQ = useAsync(() => fetchGlobal(), [])
  const pairsQ = useAsync(() => fetchPairs(), [])

  return (
    <main className="page hero-wrap">
      <section className="hero">
        <h1>
          Markets,{' '}
          <span className="prismatic">onchain</span>.
        </h1>
        <p className="sub">
          Real-time prices for the global crypto market and Lux DEX pairs. No signup, no API keys.
        </p>
      </section>

      <section className="stats" style={{ marginTop: 48 }}>
        <StatCard label="Total Market Cap" value={statsQ.data ? fmtBig(statsQ.data.totalMarketCap) : '—'} />
        <StatCard label="24h Volume" value={statsQ.data ? fmtBig(statsQ.data.totalVolume) : '—'} />
        <StatCard label="BTC Dominance" value={statsQ.data ? `${statsQ.data.btcDominance.toFixed(1)}%` : '—'} />
        <StatCard label="Active Assets" value={statsQ.data ? statsQ.data.activePairs.toLocaleString() : '—'} />
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Top Tokens</h2>
          <Link href="/tokens">View all →</Link>
        </div>
        {tokensQ.loading ? (
          <div className="empty">Loading…</div>
        ) : tokensQ.error ? (
          <div className="empty">Failed to load markets. {tokensQ.error.message}</div>
        ) : (
          <MarketTable tokens={tokensQ.data ?? []} />
        )}
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Lux DEX Pairs</h2>
          <Link href="/pairs">View all →</Link>
        </div>
        {pairsQ.data ? <PairsTable pairs={pairsQ.data} /> : <div className="empty">Loading…</div>}
      </section>
    </main>
  )
}
