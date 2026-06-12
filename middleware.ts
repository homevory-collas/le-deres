// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LOCALE_CODES, DEFAULT_LOCALE_CODE, detectLocale } from '@/lib/i18n/config'

// Paths that should never be rewritten
const PUBLIC_FILE_REGEX = /\.(.*)$/
const SKIP_PATHS = [
  '/api/',
  '/_next/',
  '/favicon',
  '/robots',
  '/sitemap',
  '/manifest',
  '/icons',
  '/images',
  '/fonts',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files and API routes
  if (
    PUBLIC_FILE_REGEX.test(pathname) ||
    SKIP_PATHS.some((p) => pathname.startsWith(p))
  ) {
    return NextResponse.next()
  }

  // Check if pathname already has a locale prefix
  const segments   = pathname.split('/')
  const firstSeg   = segments[1]
  const hasLocale  = LOCALE_CODES.includes(firstSeg)

  if (hasLocale) {
    // Already has locale — set header for downstream use
    const response = NextResponse.next()
    response.headers.set('x-locale', firstSeg)
    return response
  }

  // No locale in URL — detect from Accept-Language or cookie
  const cookieLocale = request.cookies.get('ld-locale')?.value
  const acceptLang   = request.headers.get('accept-language') ?? ''

  let detectedLocale: string

  if (cookieLocale && LOCALE_CODES.includes(cookieLocale)) {
    detectedLocale = cookieLocale
  } else {
    detectedLocale = detectLocale(acceptLang).code
  }

  // Don't redirect default locale to avoid double URLs
  // Default locale (en-US) is served at root: /
  // All others get prefixed: /fr-FR/about, /ja-JP/marketplace etc.
  if (detectedLocale === DEFAULT_LOCALE_CODE) {
    const response = NextResponse.next()
    response.headers.set('x-locale', DEFAULT_LOCALE_CODE)
    return response
  }

  // Redirect non-default locale to prefixed URL
  const url       = request.nextUrl.clone()
  url.pathname    = `/${detectedLocale}${pathname}`
  const response  = NextResponse.redirect(url)

  // Persist detected locale in cookie (1 year)
  response.cookies.set('ld-locale', detectedLocale, {
    maxAge:   60 * 60 * 24 * 365,
    sameSite: 'lax',
    path:     '/',
  })

  return response
}

export const config = {
  matcher: [
    // Match all except: _next/static, _next/image, favicon, api
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
}
