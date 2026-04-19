import { Link } from 'wouter'
import type { Token } from '../lib/types'
import { ChangeBadge } from './change-badge'
import { Sparkline } from './sparkline'
import { fmtBig, fmtPrice } from '../lib/useAsync'

interface Props {
  tokens: Token[]
  offset?: number
  linkPrefix?: string
}

export function MarketTable({ tokens, offset = 0, linkPrefix = '/tokens' }: Props) {
  return (
    <table className="mkt">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th className="num">Price</th>
          <th className="num">24h</th>
          <th className="num">7d</th>
          <th className="num">Market Cap</th>
          <th className="num">Volume</th>
          <th className="num">7d Chart</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map((t, i) => (
          <tr key={t.id}>
            <td className="muted">{offset + i + 1}</td>
            <td>
              <Link href={`${linkPrefix}/${t.id}`} className="tok">
                <img src={t.image} alt="" loading="lazy" />
                <span>{t.name}</span>
                <span className="sym">{t.symbol}</span>
              </Link>
            </td>
            <td className="num">{fmtPrice(t.price)}</td>
            <td className="num"><ChangeBadge value={t.change24h} /></td>
            <td className="num"><ChangeBadge value={t.change7d} /></td>
            <td className="num muted">{fmtBig(t.marketCap)}</td>
            <td className="num muted">{fmtBig(t.volume)}</td>
            <td className="num">
              {t.sparkline.length > 0 ? (
                <Sparkline data={t.sparkline} positive={t.change7d >= 0} />
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
