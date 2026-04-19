# markets

## Overview

This repo hosts two things:

1. **Morpho Blue contracts** — `src/Markets.sol`, `src/interfaces/`, `src/libraries/`, `src/mocks/`, `test/`, `audits/`, `certora/`. Solidity only, compiled with Foundry.
2. **Lux Markets web app** — a Vite 8 SPA at the repo root that serves public crypto market data and the Lux DEX pairs view. Built to a static `dist/` and served by `ghcr.io/hanzoai/spa`.

The two coexist: Foundry owns `.sol`; Vite/TypeScript own `.ts{,x}`. `tsconfig.json` excludes the Solidity directories.

## Web App

- **Stack**: Vite 8, React 19, wouter, pure CSS (no Tailwind). Charts via `lightweight-charts`.
- **Entrypoint**: `index.html` → `src/main.tsx` → `src/App.tsx`.
- **Routes**: `/`, `/tokens`, `/tokens/:id`, `/pairs`, `/embed/:widget`.
- **Data**: CoinGecko public API (no key) from the browser + mock Lux DEX pairs (`src/lib/dex.ts`) until the on-chain indexer lands.
- **Styling**: Monochrome dark per lux.cloud — `#000` bg, `rgba(255,255,255,0.08)` borders, `#f5f5f5` fg, one prismatic hero gradient.
- **No server**: all former Next.js API routes were either public-API proxies (inlined into client fetches) or stubs (deleted).

## Build & Run

```bash
pnpm install
pnpm dev              # http://localhost:3000
pnpm build            # dist/
forge build           # contracts
forge test            # contract tests
```

## Docker

Single multi-stage image. Node builds the SPA, output copied into `ghcr.io/hanzoai/spa`:

```dockerfile
FROM node:22-alpine AS build
RUN corepack enable
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile || pnpm install
RUN pnpm build

FROM ghcr.io/hanzoai/spa
COPY --from=build /app/dist /public
```

## Layout

```
markets/
├─ index.html              # Vite HTML entry
├─ vite.config.ts
├─ tsconfig.json           # excludes src/{interfaces,libraries,mocks}
├─ Dockerfile              # node build → hanzoai/spa
├─ package.json            # vite/react/wouter + lightweight-charts
├─ src/
│  ├─ main.tsx             # SPA bootstrap
│  ├─ App.tsx              # wouter routes
│  ├─ styles.css           # monochrome dark
│  ├─ components/          # Header, Footer, tables, chart, etc.
│  ├─ pages/               # Dashboard, Tokens, TokenDetail, Pairs, Embed
│  ├─ lib/                 # coingecko.ts, dex.ts, types.ts, useAsync.ts
│  ├─ Markets.sol          # (Solidity, ignored by TS)
│  ├─ interfaces/          # (Solidity)
│  ├─ libraries/           # (Solidity)
│  └─ mocks/               # (Solidity)
├─ public/
│  └─ embed.js             # drop-in embed bootstrap for third parties
├─ audits/, certora/, test/  # Solidity audits/tests (untouched)
└─ lib/                    # Solidity forge-std, halmos-cheatcodes (untouched)
```

## Embeds

Third-party sites drop `<script src="https://markets.lux.network/embed.js"></script>` and mark up elements with `data-lux-widget="overview|chart|ticker"`. The script injects an iframe pointed at `/embed/<widget>`; the SPA renders a chrome-less view at that route (`document.body.classList.add('embed')` in `main.tsx`).

## CI/CD

`.github/workflows/deploy.yml` builds the Docker image on push to `main`, pushes to `ghcr.io/luxfi/markets`, and dispatches to `hanzoai/universe` for progressive rollout (cluster: `lux-k8s`, namespace: `lux`, host: `markets.lux.network`).

## CoinGecko Rate Limits

Free public API allows ~10-30 rpm. The client caches responses in an in-memory `Map` with TTLs (markets: 60s, history: 5m, global: 2m). For heavy traffic we will front with a small Go service; for now, the SPA is the only client.

---

*Last updated: 2026-04-18*
