import { useState } from 'react'
import { Link, useRoute } from 'wouter'
import { fetchToken, fetchPriceHistory } from '../lib/coingecko'
import { Chart } from '../components/chart'
import { ChangeBadge } from '../components/change-badge'
import { StatCard } from '../components/stat-card'
import { useAsync, fmtBig, fmtPrice } from '../lib/useAsync'

const DAYS = [1, 7, 30, 90, 365]

export function TokenDetailPage() {
  const [, params] = useRoute<{ id: string }>('/tokens/:id')
  const id = params?.id ?? ''
  const [days, setDays] = useState(7)

  const tokenQ = useAsync(() => fetchToken(id), [id])
  const historyQ = useAsync(() => fetchPriceHistory(id, days), [id, days])

  if (tokenQ.error) {
    return (
      <main className="page">
        <h1 style={{ fontSize: 28, fontWeight: 500 }}>Token not found</h1>
        <p style={{ marginTop: 12, color: 'var(--muted)' }}>
          <Link href="/tokens">← All Tokens</Link>
        </p>
      </main>
    )
  }

  const t = tokenQ.data

  return (
    <main className="page">
      <p style={{ marginBottom: 16 }}><Link href="/tokens">← All Tokens</Link></p>

      <div className="token-head">
        {t ? <img src={t.image} alt="" /> : <div style={{ width: 44, height: 44 }} />}
        <div>
          <h1>{t?.name ?? '…'}</h1>
          <span className="sym">{t?.symbol ?? ''}</span>
        </div>
        <div className="px">
          <div className="big">{t ? fmtPrice(t.price) : '—'}</div>
          {t ? <ChangeBadge value={t.change24h} /> : null}
        </div>
      </div>

      <div className="chart-wrap">
        <header>
          <h2>Price Chart</h2>
          <div className="sort">
            {DAYS.map((d) => (
              <button
                key={d}
                type="button"
                className={d === days ? 'active' : ''}
                onClick={() => setDays(d)}
              >
                {d === 1 ? '1D' : d === 7 ? '7D' : d === 30 ? '1M' : d === 90 ? '3M' : '1Y'}
              </button>
            ))}
          </div>
        </header>
        {historyQ.data ? (
          <Chart data={historyQ.data} height={360} />
        ) : (
          <div className="empty">{historyQ.loading ? 'Loading chart…' : 'No data'}</div>
        )}
      </div>

      <section className="stats">
        <StatCard label="Market Cap" value={t ? fmtBig(t.marketCap) : '—'} />
        <StatCard label="24h Volume" value={t ? fmtBig(t.volume) : '—'} />
        <StatCard label="24h Change" value={t ? `${t.change24h >= 0 ? '+' : ''}${t.change24h.toFixed(2)}%` : '—'} />
        <StatCard label="7d Change" value={t ? `${t.change7d >= 0 ? '+' : ''}${t.change7d.toFixed(2)}%` : '—'} />
      </section>
    </main>
  )
}
