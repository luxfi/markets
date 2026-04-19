import type { DexPair } from '../lib/types'
import { ChangeBadge } from './change-badge'
import { fmtBig, fmtPrice } from '../lib/useAsync'

export function PairsTable({ pairs }: { pairs: DexPair[] }) {
  return (
    <table className="mkt">
      <thead>
        <tr>
          <th>Pair</th>
          <th>Exchange</th>
          <th className="num">Price</th>
          <th className="num">24h</th>
          <th className="num">Liquidity</th>
          <th className="num">Volume 24h</th>
          <th className="num">Fee</th>
        </tr>
      </thead>
      <tbody>
        {pairs.map((p) => (
          <tr key={p.id}>
            <td>{p.token0}/{p.token1}</td>
            <td className="muted">{p.exchange}</td>
            <td className="num">{fmtPrice(p.price)}</td>
            <td className="num"><ChangeBadge value={p.change24h} /></td>
            <td className="num muted">{fmtBig(p.liquidity)}</td>
            <td className="num muted">{fmtBig(p.volume24h)}</td>
            <td className="num muted">{(p.fee * 100).toFixed(2)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
