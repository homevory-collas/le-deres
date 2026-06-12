// lib/i18n/seo.ts
// SEO helpers: hreflang tags, localized metadata, language sitemaps

import type { Metadata } from 'next'
import { LOCALES, DEFAULT_LOCALE, DEFAULT_LOCALE_CODE, type LocaleConfig } from './config'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://ledesir.com'

// ─── Build full localized URL ─────────────────────────────
export function getLocalizedUrl(path: string, locale: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (locale === DEFAULT_LOCALE_CODE) return `${BASE_URL}${clean}`
  return `${BASE_URL}/${locale}${clean}`
}

// ─── Build hreflang alternates for a given path ───────────
export function buildHreflangAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {}

  for (const locale of LOCALES) {
    alternates[locale.hreflang] = getLocalizedUrl(path, locale.code)
  }

  // Always include x-default pointing to default locale
  alternates['x-default'] = getLocalizedUrl(path, DEFAULT_LOCALE_CODE)

  return alternates
}

// ─── Build full SEO metadata with i18n ───────────────────
export interface LocalizedMetadataOptions {
  title?:       string
  description?: string
  path:         string
  locale:       LocaleConfig
  image?:       string
  noIndex?:     boolean
  type?:        'website' | 'article' | 'product'
}

export function buildLocalizedMetadata(opts: LocalizedMetadataOptions): Metadata {
  const {
    title,
    description = 'LE DÉSIR — Private. Elegant. Personal.',
    path,
    locale,
    image = '/og-default.jpg',
    noIndex = false,
    type = 'website',
  } = opts

  const siteName  = 'LE DÉSIR'
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Private. Elegant. Personal.`
  const canonical = getLocalizedUrl(path, locale.code)
  const ogImage   = image.startsWith('http') ? image : `${BASE_URL}${image}`
  const alternates = buildHreflangAlternates(path)

  return {
    title:       fullTitle,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical,
      languages: alternates,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
    openGraph: {
      title:       fullTitle,
      description,
      url:         canonical,
      siteName,
      type,
      locale:      locale.ogLocale,
      alternateLocale: LOCALES
        .filter((l) => l.code !== locale.code)
        .map((l) => l.ogLocale),
      images: [{
        url:    ogImage,
        width:  1200,
        height: 630,
        alt:    fullTitle,
      }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       fullTitle,
      description,
      images:      [ogImage],
    },
    other: {
      'og:locale':        locale.ogLocale,
      'og:locale:alternate': LOCALES
        .filter((l) => l.code !== locale.code)
        .map((l) => l.ogLocale)
        .join(','),
    },
  }
}

// ─── Localized sitemap entries for a path ────────────────
export interface SitemapEntry {
  url:              string
  lastModified?:    Date
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?:        number
}

export function buildLocalizedSitemapEntries(
  path: string,
  opts: Omit<SitemapEntry, 'url'> = {},
): SitemapEntry[] {
  return LOCALES.map((locale) => ({
    url: getLocalizedUrl(path, locale.code),
    ...opts,
  }))
}

// ─── Generate full i18n-aware sitemap ────────────────────
export function generateI18nSitemap(): SitemapEntry[] {
  const staticPaths = [
    { path: '/',             opts: { changeFrequency: 'daily'   as const, priority: 1.0 } },
    { path: '/about',        opts: { changeFrequency: 'monthly' as const, priority: 0.8 } },
    { path: '/marketplace',  opts: { changeFrequency: 'daily'   as const, priority: 0.9 } },
    { path: '/membership',   opts: { changeFrequency: 'weekly'  as const, priority: 0.9 } },
    { path: '/community',    opts: { changeFrequency: 'daily'   as const, priority: 0.8 } },
    { path: '/partner-brands',opts: { changeFrequency: 'monthly'as const, priority: 0.7 } },
    { path: '/faq',          opts: { changeFrequency: 'monthly' as const, priority: 0.6 } },
    { path: '/contact',      opts: { changeFrequency: 'monthly' as const, priority: 0.6 } },
    // Marketplace categories
    ...['lingerie','fragrances','wellness','couples','lifestyle','gifts','dolls'].map((cat) => ({
      path: `/marketplace/${cat}`,
      opts: { changeFrequency: 'daily' as const, priority: 0.8 },
    })),
  ]

  return staticPaths.flatMap(({ path, opts }) =>
    buildLocalizedSitemapEntries(path, { lastModified: new Date(), ...opts })
  )
}
