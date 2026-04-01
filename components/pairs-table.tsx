import type { DexPair } from '@/lib/types'
import { ChangeBadge } from './change-badge'

export function PairsTable({ pairs }: { pairs: DexPair[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[var(--muted)] border-b border-[var(--border)]">
            <th className="py-3 px-4">Pair</th>
            <th className="py-3 px-4">Exchange</th>
            <th className="py-3 px-4 text-right">Price</th>
            <th className="py-3 px-4 text-right">24h</th>
            <th className="py-3 px-4 text-right">Liquidity</th>
            <th className="py-3 px-4 text-right">Volume 24h</th>
            <th className="py-3 px-4 text-right">Fee</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map((pair) => (
            <tr key={pair.id} className="border-b border-[var(--border)] hover:bg-white/5 transition-colors">
              <td className="py-3 px-4 font-medium">
                {pair.token0}/{pair.token1}
              </td>
              <td className="py-3 px-4 text-[var(--muted)]">{pair.exchange}</td>
              <td className="py-3 px-4 text-right font-mono">
                ${pair.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              </td>
              <td className="py-3 px-4 text-right">
                <ChangeBadge value={pair.change24h} />
              </td>
              <td className="py-3 px-4 text-right font-mono text-[var(--muted)]">
                ${(pair.liquidity / 1e6).toFixed(2)}M
              </td>
              <td className="py-3 px-4 text-right font-mono text-[var(--muted)]">
                ${(pair.volume24h / 1e6).toFixed(2)}M
              </td>
              <td className="py-3 px-4 text-right font-mono text-[var(--muted)]">
                {(pair.fee * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
