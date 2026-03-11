import type { MarketData } from '@/lib/coingecko';

export function MarketTable({ markets }: { markets: MarketData[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[var(--muted)] border-b border-[var(--border)]">
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4 text-right">Price</th>
            <th className="py-3 px-4 text-right">24h</th>
            <th className="py-3 px-4 text-right">Market Cap</th>
            <th className="py-3 px-4 text-right">Volume</th>
          </tr>
        </thead>
        <tbody>
          {markets.map((coin, i) => (
            <tr key={coin.id} className="border-b border-[var(--border)] hover:bg-white/5 transition-colors">
              <td className="py-3 px-4 text-[var(--muted)]">{i + 1}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                  <span className="font-medium">{coin.name}</span>
                  <span className="text-[var(--muted)] uppercase text-xs">{coin.symbol}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-right font-mono">
                ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className={`py-3 px-4 text-right font-mono ${
                coin.price_change_percentage_24h >= 0 ? 'text-[var(--positive)]' : 'text-[var(--negative)]'
              }`}>
                {coin.price_change_percentage_24h >= 0 ? '+' : ''}
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </td>
              <td className="py-3 px-4 text-right font-mono text-[var(--muted)]">
                ${(coin.market_cap / 1e9).toFixed(1)}B
              </td>
              <td className="py-3 px-4 text-right font-mono text-[var(--muted)]">
                ${(coin.total_volume / 1e9).toFixed(1)}B
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
