import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { resolveTenant } from '@/lib/tenant'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lux Markets',
  description: 'Public crypto markets data — tokens, prices, DEX pairs',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const hdrs = await headers()
  const host = hdrs.get('host') ?? 'markets.lux.network'
  const tenant = resolveTenant(host)

  return (
    <html lang="en">
      <body
        className="antialiased min-h-screen"
        style={{
          '--primary': tenant.primaryColor,
          '--accent': tenant.accentColor,
        } as React.CSSProperties}
      >
        <header className="border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight">{tenant.name}</span>
            <span className="text-xs text-[var(--muted)]">{tenant.domain}</span>
          </div>
          <nav className="flex gap-6 text-sm text-[var(--muted)]">
            <a href="/" className="hover:text-white transition-colors">Overview</a>
            <a href="/tokens" className="hover:text-white transition-colors">Tokens</a>
            <a href="/pairs" className="hover:text-white transition-colors">DEX Pairs</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-[var(--border)] px-6 py-4 text-xs text-[var(--muted)] flex justify-between">
          <span>{tenant.name}</span>
          <div className="flex gap-4">
            <a href="https://lux.network" className="hover:text-white">Network</a>
            <a href="https://docs.lux.network" className="hover:text-white">Docs</a>
            <a href="https://github.com/luxfi" className="hover:text-white">GitHub</a>
          </div>
        </footer>
      </body>
    </html>
  )
}
