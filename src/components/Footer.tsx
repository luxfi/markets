export function Footer() {
  return (
    <footer className="site">
      <div className="inner">
        <div>© {new Date().getFullYear()} Lux Industries</div>
        <nav>
          <a href="https://lux.network">Lux Network</a>
          <a href="https://docs.lux.network">Docs</a>
          <a href="https://github.com/luxfi">GitHub</a>
        </nav>
      </div>
    </footer>
  )
}
