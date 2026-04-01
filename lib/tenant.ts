import type { TenantConfig } from './types'

const TENANTS: Record<string, TenantConfig> = {
  'markets.lux.network': {
    id: 'lux',
    name: 'Lux Markets',
    domain: 'markets.lux.network',
    logo: null,
    primaryColor: '#ffffff',
    accentColor: '#e5e5e5',
    tier: 'free',
  },
}

const DEFAULT_TENANT: TenantConfig = TENANTS['markets.lux.network']

export function resolveTenant(hostname: string): TenantConfig {
  const bare = hostname.split(':')[0]
  return TENANTS[bare] ?? DEFAULT_TENANT
}
