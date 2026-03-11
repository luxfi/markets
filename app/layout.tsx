import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lux Markets',
  description: 'Global markets explorer — crypto, stocks, forex',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <header className="border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight">Lux Markets</span>
            <span className="text-xs text-[var(--muted)]">markets.lux.network</span>
          </div>
          <nav className="flex gap-6 text-sm text-[var(--muted)]">
            <a href="/" className="hover:text-white transition-colors">Overview</a>
            <a href="/crypto" className="hover:text-white transition-colors">Crypto</a>
            <a href="/forex" className="hover:text-white transition-colors">Forex</a>
            <a href="/stocks" className="hover:text-white transition-colors">Stocks</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-[var(--border)] px-6 py-4 text-xs text-[var(--muted)] flex justify-between">
          <span>Lux Network</span>
          <div className="flex gap-4">
            <a href="https://lux.network" className="hover:text-white">Network</a>
            <a href="https://docs.lux.network" className="hover:text-white">Docs</a>
            <a href="https://github.com/luxfi" className="hover:text-white">GitHub</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
