// lib/i18n/exports.ts
// Public API for the i18n system — import from here, not individual files.

export { LOCALES, DEFAULT_LOCALE, DEFAULT_LOCALE_CODE, LOCALES_BY_REGION, getLocale, detectLocale, buildLocalePath, stripLocalePath } from './config'
export type { LocaleConfig } from './config'

export { loadTranslations, getTranslation, interpolate, plural, formatCurrency, formatDate, formatRelativeTime } from './index'
export type { Namespace } from './index'

export { I18nProvider, useI18n, useTranslation, useLocale } from './context'

export { buildLocalizedMetadata, buildHreflangAlternates, getLocalizedUrl, generateI18nSitemap } from './seo'
