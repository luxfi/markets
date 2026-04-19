import { Link, useLocation } from 'wouter'

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [loc] = useLocation()
  const active = loc === href || (href !== '/' && loc.startsWith(href))
  return (
    <Link href={href} className={active ? 'active' : ''}>
      {children}
    </Link>
  )
}

export function Header() {
  return (
    <header className="site">
      <div className="inner">
        <Link href="/" className="logo">
          <span className="logo-mark" aria-hidden="true" />
          <span>Lux Markets</span>
        </Link>
        <nav className="primary">
          <NavLink href="/">Overview</NavLink>
          <NavLink href="/tokens">Tokens</NavLink>
          <NavLink href="/pairs">DEX Pairs</NavLink>
        </nav>
      </div>
    </header>
  )
}
