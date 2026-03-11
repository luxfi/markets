const CG_BASE = 'https://api.coingecko.com/api/v3';

export interface MarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  sparkline_in_7d?: { price: number[] };
}

export async function getTopMarkets(limit = 20): Promise<MarketData[]> {
  const res = await fetch(
    `${CG_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function getCoinPriceHistory(id: string, days = 7): Promise<{ prices: [number, number][] }> {
  const res = await fetch(
    `${CG_BASE}/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) return { prices: [] };
  return res.json();
}
