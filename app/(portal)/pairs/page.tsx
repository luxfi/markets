import { fetchPairs } from '@/lib/dex'
import { PairsTable } from '@/components/pairs-table'

export const revalidate = 60

export default async function PairsPage() {
  const pairs = await fetchPairs()

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      <h1 className="text-2xl font-bold">DEX Pairs</h1>
      <p className="text-[var(--muted)] text-sm">Lux DEX trading pairs and liquidity pools.</p>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden">
        <PairsTable pairs={pairs} />
      </div>
    </div>
  )
}
