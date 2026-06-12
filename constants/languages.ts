// constants/languages.ts

export interface Language {
  code:        string   // BCP-47 locale code
  name:        string   // native name
  nameEn:      string   // english name
  flag:        string   // emoji flag
  dir:         'ltr' | 'rtl'
  dateLocale:  string
  urlPrefix:   string   // path prefix e.g. /fr
}

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    code:       'en-US',
    name:       'English',
    nameEn:     'English (US)',
    flag:       '🇺🇸',
    dir:        'ltr',
    dateLocale: 'en-US',
    urlPrefix:  '',        // default, no prefix
  },
  {
    code:       'fr',
    name:       'Français',
    nameEn:     'French',
    flag:       '🇫🇷',
    dir:        'ltr',
    dateLocale: 'fr-FR',
    urlPrefix:  '/fr',
  },
  {
    code:       'de',
    name:       'Deutsch',
    nameEn:     'German',
    flag:       '🇩🇪',
    dir:        'ltr',
    dateLocale: 'de-DE',
    urlPrefix:  '/de',
  },
  {
    code:       'es',
    name:       'Español',
    nameEn:     'Spanish',
    flag:       '🇪🇸',
    dir:        'ltr',
    dateLocale: 'es-ES',
    urlPrefix:  '/es',
  },
  {
    code:       'pt-BR',
    name:       'Português',
    nameEn:     'Portuguese (Brazil)',
    flag:       '🇧🇷',
    dir:        'ltr',
    dateLocale: 'pt-BR',
    urlPrefix:  '/pt',
  },
  {
    code:       'ja',
    name:       '日本語',
    nameEn:     'Japanese',
    flag:       '🇯🇵',
    dir:        'ltr',
    dateLocale: 'ja-JP',
    urlPrefix:  '/ja',
  },
  {
    code:       'ko',
    name:       '한국어',
    nameEn:     'Korean',
    flag:       '🇰🇷',
    dir:        'ltr',
    dateLocale: 'ko-KR',
    urlPrefix:  '/ko',
  },
  {
    code:       'zh-CN',
    name:       '中文(简体)',
    nameEn:     'Chinese Simplified',
    flag:       '🇨🇳',
    dir:        'ltr',
    dateLocale: 'zh-CN',
    urlPrefix:  '/zh',
  },
  {
    code:       'vi',
    name:       'Tiếng Việt',
    nameEn:     'Vietnamese',
    flag:       '🇻🇳',
    dir:        'ltr',
    dateLocale: 'vi-VN',
    urlPrefix:  '/vi',
  },
  {
    code:       'th',
    name:       'ภาษาไทย',
    nameEn:     'Thai',
    flag:       '🇹🇭',
    dir:        'ltr',
    dateLocale: 'th-TH',
    urlPrefix:  '/th',
  },
  {
    code:       'id',
    name:       'Bahasa Indonesia',
    nameEn:     'Indonesian',
    flag:       '🇮🇩',
    dir:        'ltr',
    dateLocale: 'id-ID',
    urlPrefix:  '/id',
  },
]

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0]  // en-US

export function getLanguageByCode(code: string): Language {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code) ?? DEFAULT_LANGUAGE
}

export function getLanguageByPrefix(prefix: string): Language {
  return SUPPORTED_LANGUAGES.find((l) => l.urlPrefix === prefix) ?? DEFAULT_LANGUAGE
}
