import { fetchMarkets } from '@/lib/coingecko'
import { MarketTable } from '@/components/market-table'

export const revalidate = 60

interface Props {
  searchParams: Promise<{ page?: string; order?: string }>
}

export default async function TokensPage({ searchParams }: Props) {
  const sp = await searchParams
  const page = Math.max(1, Number(sp.page ?? 1))
  const order = sp.order ?? 'market_cap_desc'
  const perPage = 50

  const tokens = await fetchMarkets(page, perPage, order)

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Tokens</h1>
        <div className="flex gap-2 text-sm">
          <span className="text-[var(--muted)]">Sort:</span>
          <a
            href={`/tokens?order=market_cap_desc&page=1`}
            className={order === 'market_cap_desc' ? 'text-white' : 'text-[var(--muted)] hover:text-white'}
          >
            Market Cap
          </a>
          <a
            href={`/tokens?order=volume_desc&page=1`}
            className={order === 'volume_desc' ? 'text-white' : 'text-[var(--muted)] hover:text-white'}
          >
            Volume
          </a>
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden">
        <MarketTable tokens={tokens} offset={(page - 1) * perPage} />
      </div>

      <div className="flex justify-center gap-4 text-sm">
        {page > 1 && (
          <a
            href={`/tokens?page=${page - 1}&order=${order}`}
            className="px-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded hover:bg-white/5 transition-colors"
          >
            &larr; Previous
          </a>
        )}
        <span className="px-4 py-2 text-[var(--muted)]">Page {page}</span>
        {tokens.length === perPage && (
          <a
            href={`/tokens?page=${page + 1}&order=${order}`}
            className="px-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded hover:bg-white/5 transition-colors"
          >
            Next &rarr;
          </a>
        )}
      </div>
    </div>
  )
}
