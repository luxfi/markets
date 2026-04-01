import { fetchToken, fetchPriceHistory } from '@/lib/coingecko'
import { Chart } from '@/components/chart'
import { ChangeBadge } from '@/components/change-badge'
import { StatCard } from '@/components/stat-card'

export const revalidate = 60

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ days?: string }>
}

export default async function TokenDetailPage({ params, searchParams }: Props) {
  const { id } = await params
  const sp = await searchParams
  const days = Number(sp.days ?? 7)

  let token
  let history
  try {
    ;[token, history] = await Promise.all([
      fetchToken(id),
      fetchPriceHistory(id, days),
    ])
  } catch {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold">Token not found</h1>
        <a href="/" className="text-sm text-[var(--muted)] hover:text-white mt-4 inline-block">
          &larr; Back to dashboard
        </a>
      </div>
    )
  }

  const DAY_OPTIONS = [1, 7, 30, 90, 365]

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      <a href="/tokens" className="text-sm text-[var(--muted)] hover:text-white">
        &larr; All Tokens
      </a>

      <div className="flex items-center gap-4">
        <img src={token.image} alt={token.name} className="w-10 h-10 rounded-full" />
        <div>
          <h1 className="text-2xl font-bold">{token.name}</h1>
          <span className="text-[var(--muted)] uppercase text-sm">{token.symbol}</span>
        </div>
        <div className="ml-auto text-right">
          <div className="text-3xl font-bold font-mono">
            ${token.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <ChangeBadge value={token.change24h} className="text-sm" />
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Price Chart</h2>
          <div className="flex gap-2 text-sm">
            {DAY_OPTIONS.map((d) => (
              <a
                key={d}
                href={`/tokens/${id}?days=${d}`}
                className={`px-3 py-1 rounded ${
                  d === days
                    ? 'bg-white/10 text-white'
                    : 'text-[var(--muted)] hover:text-white'
                } transition-colors`}
              >
                {d === 1 ? '1D' : d === 7 ? '7D' : d === 30 ? '1M' : d === 90 ? '3M' : '1Y'}
              </a>
            ))}
          </div>
        </div>
        <Chart data={history} height={400} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Market Cap" value={`$${(token.marketCap / 1e9).toFixed(2)}B`} />
        <StatCard label="24h Volume" value={`$${(token.volume / 1e9).toFixed(2)}B`} />
        <StatCard label="24h Change" value={`${token.change24h >= 0 ? '+' : ''}${token.change24h.toFixed(2)}%`} />
        <StatCard label="7d Change" value={`${token.change7d >= 0 ? '+' : ''}${token.change7d.toFixed(2)}%`} />
      </div>
    </div>
  )
}
