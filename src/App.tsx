import { Route, Switch, Link } from 'wouter'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { DashboardPage } from './pages/DashboardPage'
import { TokensPage } from './pages/TokensPage'
import { TokenDetailPage } from './pages/TokenDetailPage'
import { PairsPage } from './pages/PairsPage'
import { EmbedPage } from './pages/EmbedPage'

export function App() {
  const isEmbed = window.location.pathname.startsWith('/embed')

  if (isEmbed) {
    return (
      <Switch>
        <Route path="/embed/:widget" component={EmbedPage} />
        <Route>
          <main className="page"><p className="empty">Unknown embed.</p></main>
        </Route>
      </Switch>
    )
  }

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={DashboardPage} />
        <Route path="/tokens" component={TokensPage} />
        <Route path="/tokens/:id" component={TokenDetailPage} />
        <Route path="/pairs" component={PairsPage} />
        <Route>
          <main className="page">
            <h1 style={{ fontSize: 48, fontWeight: 500, letterSpacing: '-0.02em' }}>404</h1>
            <p style={{ marginTop: 16, color: 'var(--muted)' }}>
              Page not found. <Link href="/">Back to markets</Link>.
            </p>
          </main>
        </Route>
      </Switch>
      <Footer />
    </>
  )
}
