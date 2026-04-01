import { NextResponse, type NextRequest } from 'next/server'
import { resolveTenant } from '@/lib/tenant'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const res = NextResponse.next()
  const host = req.headers.get('host') ?? 'markets.lux.network'
  const tenant = resolveTenant(host)

  // Tenant header for all requests
  res.headers.set('x-tenant-id', tenant.id)

  // Embed routes: permissive CORS + framing
  if (pathname.startsWith('/embed')) {
    res.headers.set('Access-Control-Allow-Origin', '*')
    res.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.headers.set('X-Frame-Options', 'ALLOWALL')
    res.headers.delete('Content-Security-Policy')
    return res
  }

  // API routes: optional API key check (log for now, enforce in v2)
  if (pathname.startsWith('/api/v1/')) {
    res.headers.set('Access-Control-Allow-Origin', '*')
    res.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.headers.set('Access-Control-Allow-Headers', 'Authorization, Content-Type')

    if (req.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204, headers: res.headers })
    }

    return res
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
