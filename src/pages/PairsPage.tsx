import { fetchPairs } from '../lib/dex'
import { PairsTable } from '../components/pairs-table'
import { useAsync } from '../lib/useAsync'

export function PairsPage() {
  const pairsQ = useAsync(() => fetchPairs(), [])

  return (
    <main className="page">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 32, fontWeight: 500, letterSpacing: '-0.02em' }}>DEX Pairs</h1>
        <p style={{ color: 'var(--muted)', marginTop: 8 }}>Lux DEX trading pairs and liquidity pools.</p>
      </div>
      <div className="section">
        {pairsQ.data ? <PairsTable pairs={pairsQ.data} /> : <div className="empty">Loading…</div>}
      </div>
    </main>
  )
}
