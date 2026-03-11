import { getTopMarkets, getCoinPriceHistory } from '@/lib/coingecko';
import { MarketTable } from '@/components/market-table';
import { Chart } from '@/components/chart';

export const revalidate = 60;

export default async function Home() {
  const markets = await getTopMarkets(20);
  const btcHistory = await getCoinPriceHistory('bitcoin', 7);

  const chartData = btcHistory.prices.map(([ts, price]) => ({
    time: new Date(ts).toISOString().split('T')[0],
    value: price,
  }));

  // Deduplicate by date (CoinGecko can return multiple per day)
  const seen = new Set<string>();
  const uniqueChartData = chartData.filter((d) => {
    if (seen.has(d.time)) return false;
    seen.add(d.time);
    return true;
  });

  const btc = markets.find((m) => m.id === 'bitcoin');
  const eth = markets.find((m) => m.id === 'ethereum');

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6">
          <div className="text-sm text-[var(--muted)] mb-1">Bitcoin</div>
          <div className="text-2xl font-bold font-mono">
            ${btc?.current_price.toLocaleString() ?? '--'}
          </div>
          <div className={`text-sm font-mono ${
            (btc?.price_change_percentage_24h ?? 0) >= 0 ? 'text-[var(--positive)]' : 'text-[var(--negative)]'
          }`}>
            {(btc?.price_change_percentage_24h ?? 0) >= 0 ? '+' : ''}
            {btc?.price_change_percentage_24h?.toFixed(2) ?? '0.00'}%
          </div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6">
          <div className="text-sm text-[var(--muted)] mb-1">Ethereum</div>
          <div className="text-2xl font-bold font-mono">
            ${eth?.current_price.toLocaleString() ?? '--'}
          </div>
          <div className={`text-sm font-mono ${
            (eth?.price_change_percentage_24h ?? 0) >= 0 ? 'text-[var(--positive)]' : 'text-[var(--negative)]'
          }`}>
            {(eth?.price_change_percentage_24h ?? 0) >= 0 ? '+' : ''}
            {eth?.price_change_percentage_24h?.toFixed(2) ?? '0.00'}%
          </div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6">
          <div className="text-sm text-[var(--muted)] mb-1">Total Market Cap</div>
          <div className="text-2xl font-bold font-mono">
            ${(markets.reduce((s, m) => s + m.market_cap, 0) / 1e12).toFixed(2)}T
          </div>
          <div className="text-sm text-[var(--muted)]">Top 20 assets</div>
        </div>
      </div>

      {/* BTC Chart */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Bitcoin — 7 Day</h2>
        <Chart data={uniqueChartData} />
      </div>

      {/* Market Table */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)]">
          <h2 className="text-lg font-semibold">Top Markets</h2>
        </div>
        <MarketTable markets={markets} />
      </div>
    </div>
  );
}
