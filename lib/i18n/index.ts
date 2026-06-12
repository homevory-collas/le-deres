// lib/i18n/index.ts
// Core i18n engine — loads translations, interpolates variables, handles fallbacks

import type { LocaleConfig } from './config'
import { DEFAULT_LOCALE_CODE, getLocale } from './config'

export type Namespace =
  | 'common'
  | 'navigation'
  | 'homepage'
  | 'marketplace'
  | 'membership'
  | 'community'
  | 'faq'
  | 'footer'
  | 'auth'

// In-memory translation cache
const cache: Record<string, Record<string, unknown>> = {}

/**
 * Load a namespace for a locale.
 * Falls back to en-US if the locale file is missing or the key is absent.
 */
export async function loadTranslations(
  locale: string,
  namespace: Namespace,
): Promise<Record<string, unknown>> {
  const cacheKey = `${locale}:${namespace}`
  if (cache[cacheKey]) return cache[cacheKey]

  try {
    // Dynamic import — Next.js will code-split per locale
    const mod = await import(`@/locales/${locale}/${namespace}.json`)
    const data = mod.default ?? mod
    // If stub (pending translation) fall back to en-US
    if (data._status === 'pending_translation' || data._fallback === 'en-US') {
      return loadTranslations(DEFAULT_LOCALE_CODE, namespace)
    }
    cache[cacheKey] = data
    return data
  } catch {
    // Locale file missing — fall back
    if (locale !== DEFAULT_LOCALE_CODE) {
      return loadTranslations(DEFAULT_LOCALE_CODE, namespace)
    }
    return {}
  }
}

/**
 * Synchronous translation getter (for client-side use after hydration).
 * Translations must already be loaded into cache via loadTranslations().
 */
export function getTranslation(
  locale: string,
  namespace: Namespace,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const cacheKey = `${locale}:${namespace}`
  const data = cache[cacheKey] ?? cache[`${DEFAULT_LOCALE_CODE}:${namespace}`] ?? {}
  const raw = resolveDotPath(data, key)
  if (!raw) return key
  return interpolate(String(raw), vars)
}

/**
 * Resolve nested key like "hero.title" from a nested object.
 */
function resolveDotPath(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((acc: unknown, part) => {
    if (acc && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[part]
    }
    return undefined
  }, obj)
}

/**
 * Replace {{variable}} placeholders in translation strings.
 * Example: interpolate("Hello {{name}}", { name: "World" }) => "Hello World"
 */
export function interpolate(
  str: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return str
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    vars[key] !== undefined ? String(vars[key]) : `{{${key}}}`,
  )
}

/**
 * Simple pluralization helper.
 * Usage: plural(count, "item", "items")
 */
export function plural(
  count: number,
  singular: string,
  pluralStr?: string,
): string {
  if (count === 1) return `${count} ${singular}`
  return `${count} ${pluralStr ?? singular + 's'}`
}

/**
 * Format currency based on locale.
 */
export function formatCurrency(
  amount: number,
  locale: LocaleConfig,
): string {
  return new Intl.NumberFormat(locale.numberLocale, {
    style:    'currency',
    currency: locale.currency,
  }).format(amount)
}

/**
 * Format date based on locale.
 */
export function formatDate(
  date: Date | string,
  locale: LocaleConfig,
  options?: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat(locale.dateLocale, {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
    ...options,
  }).format(new Date(date))
}

/**
 * Format relative time (e.g. "2 hours ago") based on locale.
 */
export function formatRelativeTime(date: Date | string, locale: LocaleConfig): string {
  const diff  = Date.now() - new Date(date).getTime()
  const secs  = Math.floor(diff / 1000)
  const mins  = Math.floor(secs / 60)
  const hours = Math.floor(mins / 60)
  const days  = Math.floor(hours / 24)

  const rtf = new Intl.RelativeTimeFormat(locale.dateLocale, { numeric: 'auto' })
  if (days  > 0) return rtf.format(-days,  'day')
  if (hours > 0) return rtf.format(-hours, 'hour')
  if (mins  > 0) return rtf.format(-mins,  'minute')
  return rtf.format(-secs, 'second')
}

export { DEFAULT_LOCALE_CODE }
