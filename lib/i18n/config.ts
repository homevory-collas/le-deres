// lib/i18n/config.ts
// Master i18n configuration — single source of truth for all language settings

export interface LocaleConfig {
  code:         string        // BCP-47 code
  name:         string        // Native name
  nameEn:       string        // English name
  flag:         string        // Emoji flag
  dir:          'ltr' | 'rtl'
  region:       'default' | 'europe' | 'latin-america' | 'asia'
  dateLocale:   string        // Intl locale string
  numberLocale: string        // Intl number locale
  currency:     string        // Default currency
  isDefault?:   boolean
  isRTL?:       boolean
  hreflang:     string        // hreflang attribute value
  ogLocale:     string        // OG locale
  googleFonts?: string        // Google Fonts param for special scripts
}

export const LOCALES: LocaleConfig[] = [
  // ── DEFAULT ──────────────────────────────────────────────
  {
    code: 'en-US', name: 'English', nameEn: 'English (US)',
    flag: '🇺🇸', dir: 'ltr', region: 'default', isDefault: true,
    dateLocale: 'en-US', numberLocale: 'en-US', currency: 'USD',
    hreflang: 'en-US', ogLocale: 'en_US',
  },

  // ── EUROPE ───────────────────────────────────────────────
  {
    code: 'fr-FR', name: 'Français', nameEn: 'French',
    flag: '🇫🇷', dir: 'ltr', region: 'europe',
    dateLocale: 'fr-FR', numberLocale: 'fr-FR', currency: 'EUR',
    hreflang: 'fr', ogLocale: 'fr_FR',
  },
  {
    code: 'de-DE', name: 'Deutsch', nameEn: 'German',
    flag: '🇩🇪', dir: 'ltr', region: 'europe',
    dateLocale: 'de-DE', numberLocale: 'de-DE', currency: 'EUR',
    hreflang: 'de', ogLocale: 'de_DE',
  },
  {
    code: 'es-ES', name: 'Español', nameEn: 'Spanish',
    flag: '🇪🇸', dir: 'ltr', region: 'europe',
    dateLocale: 'es-ES', numberLocale: 'es-ES', currency: 'EUR',
    hreflang: 'es', ogLocale: 'es_ES',
  },
  {
    code: 'it-IT', name: 'Italiano', nameEn: 'Italian',
    flag: '🇮🇹', dir: 'ltr', region: 'europe',
    dateLocale: 'it-IT', numberLocale: 'it-IT', currency: 'EUR',
    hreflang: 'it', ogLocale: 'it_IT',
  },
  {
    code: 'pt-PT', name: 'Português', nameEn: 'Portuguese',
    flag: '🇵🇹', dir: 'ltr', region: 'europe',
    dateLocale: 'pt-PT', numberLocale: 'pt-PT', currency: 'EUR',
    hreflang: 'pt-PT', ogLocale: 'pt_PT',
  },
  {
    code: 'nl-NL', name: 'Nederlands', nameEn: 'Dutch',
    flag: '🇳🇱', dir: 'ltr', region: 'europe',
    dateLocale: 'nl-NL', numberLocale: 'nl-NL', currency: 'EUR',
    hreflang: 'nl', ogLocale: 'nl_NL',
  },
  {
    code: 'pl-PL', name: 'Polski', nameEn: 'Polish',
    flag: '🇵🇱', dir: 'ltr', region: 'europe',
    dateLocale: 'pl-PL', numberLocale: 'pl-PL', currency: 'PLN',
    hreflang: 'pl', ogLocale: 'pl_PL',
  },
  {
    code: 'ro-RO', name: 'Română', nameEn: 'Romanian',
    flag: '🇷🇴', dir: 'ltr', region: 'europe',
    dateLocale: 'ro-RO', numberLocale: 'ro-RO', currency: 'RON',
    hreflang: 'ro', ogLocale: 'ro_RO',
  },
  {
    code: 'cs-CZ', name: 'Čeština', nameEn: 'Czech',
    flag: '🇨🇿', dir: 'ltr', region: 'europe',
    dateLocale: 'cs-CZ', numberLocale: 'cs-CZ', currency: 'CZK',
    hreflang: 'cs', ogLocale: 'cs_CZ',
  },
  {
    code: 'sv-SE', name: 'Svenska', nameEn: 'Swedish',
    flag: '🇸🇪', dir: 'ltr', region: 'europe',
    dateLocale: 'sv-SE', numberLocale: 'sv-SE', currency: 'SEK',
    hreflang: 'sv', ogLocale: 'sv_SE',
  },
  {
    code: 'nb-NO', name: 'Norsk', nameEn: 'Norwegian',
    flag: '🇳🇴', dir: 'ltr', region: 'europe',
    dateLocale: 'nb-NO', numberLocale: 'nb-NO', currency: 'NOK',
    hreflang: 'nb', ogLocale: 'nb_NO',
  },
  {
    code: 'da-DK', name: 'Dansk', nameEn: 'Danish',
    flag: '🇩🇰', dir: 'ltr', region: 'europe',
    dateLocale: 'da-DK', numberLocale: 'da-DK', currency: 'DKK',
    hreflang: 'da', ogLocale: 'da_DK',
  },
  {
    code: 'fi-FI', name: 'Suomi', nameEn: 'Finnish',
    flag: '🇫🇮', dir: 'ltr', region: 'europe',
    dateLocale: 'fi-FI', numberLocale: 'fi-FI', currency: 'EUR',
    hreflang: 'fi', ogLocale: 'fi_FI',
  },
  {
    code: 'el-GR', name: 'Ελληνικά', nameEn: 'Greek',
    flag: '🇬🇷', dir: 'ltr', region: 'europe',
    dateLocale: 'el-GR', numberLocale: 'el-GR', currency: 'EUR',
    hreflang: 'el', ogLocale: 'el_GR',
  },
  {
    code: 'hu-HU', name: 'Magyar', nameEn: 'Hungarian',
    flag: '🇭🇺', dir: 'ltr', region: 'europe',
    dateLocale: 'hu-HU', numberLocale: 'hu-HU', currency: 'HUF',
    hreflang: 'hu', ogLocale: 'hu_HU',
  },

  // ── LATIN AMERICA ─────────────────────────────────────────
  {
    code: 'pt-BR', name: 'Português (Brasil)', nameEn: 'Portuguese (Brazil)',
    flag: '🇧🇷', dir: 'ltr', region: 'latin-america',
    dateLocale: 'pt-BR', numberLocale: 'pt-BR', currency: 'BRL',
    hreflang: 'pt-BR', ogLocale: 'pt_BR',
  },
  {
    code: 'es-MX', name: 'Español (México)', nameEn: 'Spanish (Mexico)',
    flag: '🇲🇽', dir: 'ltr', region: 'latin-america',
    dateLocale: 'es-MX', numberLocale: 'es-MX', currency: 'MXN',
    hreflang: 'es-MX', ogLocale: 'es_MX',
  },
  {
    code: 'es-AR', name: 'Español (Argentina)', nameEn: 'Spanish (Argentina)',
    flag: '🇦🇷', dir: 'ltr', region: 'latin-america',
    dateLocale: 'es-AR', numberLocale: 'es-AR', currency: 'ARS',
    hreflang: 'es-AR', ogLocale: 'es_AR',
  },
  {
    code: 'es-CL', name: 'Español (Chile)', nameEn: 'Spanish (Chile)',
    flag: '🇨🇱', dir: 'ltr', region: 'latin-america',
    dateLocale: 'es-CL', numberLocale: 'es-CL', currency: 'CLP',
    hreflang: 'es-CL', ogLocale: 'es_CL',
  },
  {
    code: 'es-UY', name: 'Español (Uruguay)', nameEn: 'Spanish (Uruguay)',
    flag: '🇺🇾', dir: 'ltr', region: 'latin-america',
    dateLocale: 'es-UY', numberLocale: 'es-UY', currency: 'UYU',
    hreflang: 'es-UY', ogLocale: 'es_UY',
  },

  // ── ASIA ─────────────────────────────────────────────────
  {
    code: 'zh-CN', name: '中文（简体）', nameEn: 'Chinese Simplified',
    flag: '🇨🇳', dir: 'ltr', region: 'asia',
    dateLocale: 'zh-CN', numberLocale: 'zh-CN', currency: 'CNY',
    hreflang: 'zh-Hans', ogLocale: 'zh_CN',
    googleFonts: 'Noto+Sans+SC',
  },
  {
    code: 'zh-TW', name: '中文（繁體）', nameEn: 'Chinese Traditional',
    flag: '🇹🇼', dir: 'ltr', region: 'asia',
    dateLocale: 'zh-TW', numberLocale: 'zh-TW', currency: 'TWD',
    hreflang: 'zh-Hant', ogLocale: 'zh_TW',
    googleFonts: 'Noto+Sans+TC',
  },
  {
    code: 'ja-JP', name: '日本語', nameEn: 'Japanese',
    flag: '🇯🇵', dir: 'ltr', region: 'asia',
    dateLocale: 'ja-JP', numberLocale: 'ja-JP', currency: 'JPY',
    hreflang: 'ja', ogLocale: 'ja_JP',
    googleFonts: 'Noto+Sans+JP',
  },
  {
    code: 'ko-KR', name: '한국어', nameEn: 'Korean',
    flag: '🇰🇷', dir: 'ltr', region: 'asia',
    dateLocale: 'ko-KR', numberLocale: 'ko-KR', currency: 'KRW',
    hreflang: 'ko', ogLocale: 'ko_KR',
    googleFonts: 'Noto+Sans+KR',
  },
  {
    code: 'vi-VN', name: 'Tiếng Việt', nameEn: 'Vietnamese',
    flag: '🇻🇳', dir: 'ltr', region: 'asia',
    dateLocale: 'vi-VN', numberLocale: 'vi-VN', currency: 'VND',
    hreflang: 'vi', ogLocale: 'vi_VN',
  },
  {
    code: 'th-TH', name: 'ภาษาไทย', nameEn: 'Thai',
    flag: '🇹🇭', dir: 'ltr', region: 'asia',
    dateLocale: 'th-TH', numberLocale: 'th-TH', currency: 'THB',
    hreflang: 'th', ogLocale: 'th_TH',
    googleFonts: 'Noto+Sans+Thai',
  },
]

// ── Derived helpers ──────────────────────────────────────
export const DEFAULT_LOCALE     = LOCALES.find((l) => l.isDefault)!
export const LOCALE_CODES       = LOCALES.map((l) => l.code)
export const DEFAULT_LOCALE_CODE = DEFAULT_LOCALE.code

export const LOCALES_BY_REGION = {
  default:       LOCALES.filter((l) => l.region === 'default'),
  europe:        LOCALES.filter((l) => l.region === 'europe'),
  'latin-america': LOCALES.filter((l) => l.region === 'latin-america'),
  asia:          LOCALES.filter((l) => l.region === 'asia'),
}

export function getLocale(code: string): LocaleConfig {
  return LOCALES.find((l) => l.code === code) ?? DEFAULT_LOCALE
}

export function getLocaleFromPath(pathname: string): LocaleConfig {
  const segment = pathname.split('/')[1]
  return LOCALES.find((l) => l.code === segment) ?? DEFAULT_LOCALE
}

export function buildLocalePath(path: string, locale: string): string {
  if (locale === DEFAULT_LOCALE_CODE) return path
  const clean = path.startsWith('/') ? path : `/${path}`
  return `/${locale}${clean}`
}

export function stripLocalePath(pathname: string): string {
  const segment = pathname.split('/')[1]
  if (LOCALE_CODES.includes(segment)) {
    return pathname.replace(`/${segment}`, '') || '/'
  }
  return pathname
}

// Auto-detect locale from Accept-Language header
export function detectLocale(acceptLanguage: string): LocaleConfig {
  if (!acceptLanguage) return DEFAULT_LOCALE
  const tags = acceptLanguage.split(',').map((s) => s.split(';')[0].trim())
  for (const tag of tags) {
    const exact = LOCALES.find((l) => l.code.toLowerCase() === tag.toLowerCase())
    if (exact) return exact
    const lang = tag.split('-')[0].toLowerCase()
    const match = LOCALES.find((l) => l.code.toLowerCase().startsWith(lang))
    if (match) return match
  }
  return DEFAULT_LOCALE
}
