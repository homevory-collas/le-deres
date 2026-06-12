'use client'

import * as React from 'react'
import {
  LOCALES, DEFAULT_LOCALE, getLocale, detectLocale,
  type LocaleConfig,
} from './config'
import {
  loadTranslations, getTranslation, formatCurrency,
  formatDate, formatRelativeTime, interpolate,
  type Namespace,
} from './index'

// ─── Types ────────────────────────────────────────────────
interface I18nContextValue {
  locale:       LocaleConfig
  setLocale:    (locale: LocaleConfig) => void
  t:            (namespace: Namespace, key: string, vars?: Record<string, string | number>) => string
  formatPrice:  (amount: number) => string
  formatDate:   (date: Date | string, opts?: Intl.DateTimeFormatOptions) => string
  formatRelTime:(date: Date | string) => string
  locales:      LocaleConfig[]
  isLoading:    boolean
}

const I18nContext = React.createContext<I18nContextValue>({
  locale:       DEFAULT_LOCALE,
  setLocale:    () => {},
  t:            (_, key) => key,
  formatPrice:  (n) => String(n),
  formatDate:   (d) => String(d),
  formatRelTime:(d) => String(d),
  locales:      LOCALES,
  isLoading:    false,
})

const STORAGE_KEY = 'ld-locale'
const LOADED_NS   = new Set<string>()

// ─── Provider ─────────────────────────────────────────────
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale,    setLocaleState] = React.useState<LocaleConfig>(DEFAULT_LOCALE)
  const [isLoading, setIsLoading]   = React.useState(true)

  // On mount — detect / restore language preference
  React.useEffect(() => {
    async function init() {
      let chosen = DEFAULT_LOCALE

      // 1. Check saved preference
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        chosen = getLocale(saved)
      } else {
        // 2. Auto-detect from browser
        chosen = detectLocale(navigator.language)
      }

      await applyLocale(chosen)
      setLocaleState(chosen)
      setIsLoading(false)
    }
    init()
  }, [])

  async function applyLocale(lc: LocaleConfig) {
    // Apply dir + lang to document
    document.documentElement.lang = lc.code
    document.documentElement.dir  = lc.dir ?? 'ltr'
    // Pre-load essential namespaces
    const essential: Namespace[] = ['common', 'navigation', 'footer']
    await Promise.all(essential.map((ns) => {
      const key = `${lc.code}:${ns}`
      if (!LOADED_NS.has(key)) {
        LOADED_NS.add(key)
        return loadTranslations(lc.code, ns)
      }
      return Promise.resolve()
    }))
  }

  async function setLocale(lc: LocaleConfig) {
    setIsLoading(true)
    await applyLocale(lc)
    setLocaleState(lc)
    localStorage.setItem(STORAGE_KEY, lc.code)
    setIsLoading(false)
  }

  function t(
    namespace: Namespace,
    key: string,
    vars?: Record<string, string | number>,
  ): string {
    // Ensure namespace is loaded (async on demand)
    const nsKey = `${locale.code}:${namespace}`
    if (!LOADED_NS.has(nsKey)) {
      LOADED_NS.add(nsKey)
      loadTranslations(locale.code, namespace)
    }
    return getTranslation(locale.code, namespace, key, vars)
  }

  const value: I18nContextValue = {
    locale,
    setLocale,
    t,
    formatPrice:   (amount)      => formatCurrency(amount, locale),
    formatDate:    (date, opts)  => formatDate(date, locale, opts),
    formatRelTime: (date)        => formatRelativeTime(date, locale),
    locales:       LOCALES,
    isLoading,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// ─── Hooks ────────────────────────────────────────────────

/** Full i18n context */
export function useI18n() {
  return React.useContext(I18nContext)
}

/** Shorthand translation hook scoped to a namespace */
export function useTranslation(namespace: Namespace) {
  const { t, locale, formatPrice, formatDate, formatRelTime } = useI18n()
  return {
    t:             (key: string, vars?: Record<string, string | number>) => t(namespace, key, vars),
    locale,
    formatPrice,
    formatDate,
    formatRelTime,
  }
}

/** Just the current locale */
export function useLocale() {
  const { locale, setLocale, locales } = useI18n()
  return { locale, setLocale, locales }
}
