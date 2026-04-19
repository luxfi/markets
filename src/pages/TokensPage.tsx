import { useState } from 'react'
import { fetchMarkets } from '../lib/coingecko'
import { MarketTable } from '../components/market-table'
import { useAsync } from '../lib/useAsync'

const PER_PAGE = 50

export function TokensPage() {
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState<'market_cap_desc' | 'volume_desc'>('market_cap_desc')

  const tokensQ = useAsync(() => fetchMarkets(page, PER_PAGE, order), [page, order])

  return (
    <main className="page">
      <div className="section">
        <div className="section-head">
          <h2>All Tokens</h2>
          <div className="sort">
            <span>Sort</span>
            <button
              type="button"
              className={order === 'market_cap_desc' ? 'active' : ''}
              onClick={() => { setOrder('market_cap_desc'); setPage(1) }}
            >
              Market Cap
            </button>
            <button
              type="button"
              className={order === 'volume_desc' ? 'active' : ''}
              onClick={() => { setOrder('volume_desc'); setPage(1) }}
            >
              Volume
            </button>
          </div>
        </div>
        {tokensQ.loading ? (
          <div className="empty">Loading…</div>
        ) : tokensQ.error ? (
          <div className="empty">Failed to load tokens. {tokensQ.error.message}</div>
        ) : (
          <MarketTable tokens={tokensQ.data ?? []} offset={(page - 1) * PER_PAGE} />
        )}
      </div>

      <div className="pager">
        {page > 1 ? (
          <button type="button" onClick={() => setPage(page - 1)}>← Previous</button>
        ) : null}
        <span>Page {page}</span>
        {(tokensQ.data?.length ?? 0) === PER_PAGE ? (
          <button type="button" onClick={() => setPage(page + 1)}>Next →</button>
        ) : null}
      </div>
    </main>
  )
}
