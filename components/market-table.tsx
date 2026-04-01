import type { Token } from '@/lib/types'
import { ChangeBadge } from './change-badge'
import { Sparkline } from './sparkline'

interface MarketTableProps {
  tokens: Token[]
  offset?: number
  linkPrefix?: string
}

export function MarketTable({ tokens, offset = 0, linkPrefix = '/tokens' }: MarketTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[var(--muted)] border-b border-[var(--border)]">
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4 text-right">Price</th>
            <th className="py-3 px-4 text-right">24h</th>
            <th className="py-3 px-4 text-right">7d</th>
            <th className="py-3 px-4 text-right">Market Cap</th>
            <th className="py-3 px-4 text-right">Volume</th>
            <th className="py-3 px-4 text-right">7d Chart</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, i) => (
            <tr key={token.id} className="border-b border-[var(--border)] hover:bg-white/5 transition-colors">
              <td className="py-3 px-4 text-[var(--muted)]">{offset + i + 1}</td>
              <td className="py-3 px-4">
                <a href={`${linkPrefix}/${token.id}`} className="flex items-center gap-2 hover:underline">
                  <img src={token.image} alt={token.name} className="w-6 h-6 rounded-full" />
                  <span className="font-medium">{token.name}</span>
                  <span className="text-[var(--muted)] uppercase text-xs">{token.symbol}</span>
                </a>
              </td>
              <td className="py-3 px-4 text-right font-mono">
                ${token.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="py-3 px-4 text-right">
                <ChangeBadge value={token.change24h} />
              </td>
              <td className="py-3 px-4 text-right">
                <ChangeBadge value={token.change7d} />
              </td>
              <td className="py-3 px-4 text-right font-mono text-[var(--muted)]">
                ${(token.marketCap / 1e9).toFixed(1)}B
              </td>
              <td className="py-3 px-4 text-right font-mono text-[var(--muted)]">
                ${(token.volume / 1e9).toFixed(1)}B
              </td>
              <td className="py-3 px-4 text-right">
                {token.sparkline.length > 0 && (
                  <Sparkline data={token.sparkline} positive={token.change7d >= 0} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
