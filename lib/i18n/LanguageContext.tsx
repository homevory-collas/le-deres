'use client'

import * as React from 'react'
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, getLanguageByCode, type Language } from '@/constants/languages'
import { t as translate, type TranslationKey } from '@/lib/i18n/translations'

interface LanguageContextValue {
  language:      Language
  setLanguage:   (lang: Language) => void
  t:             (key: TranslationKey) => string
  languages:     Language[]
}

const LanguageContext = React.createContext<LanguageContextValue>({
  language:    DEFAULT_LANGUAGE,
  setLanguage: () => {},
  t:           (key) => key,
  languages:   SUPPORTED_LANGUAGES,
})

const STORAGE_KEY = 'ld-lang'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<Language>(DEFAULT_LANGUAGE)

  // On mount — read saved preference or detect from browser
  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const lang = getLanguageByCode(saved)
      setLanguageState(lang)
      applyLang(lang)
      return
    }
    // Auto-detect from browser
    const browserLang = navigator.language
    const detected = SUPPORTED_LANGUAGES.find(
      (l) => l.code === browserLang || l.code.startsWith(browserLang.split('-')[0])
    )
    if (detected) {
      setLanguageState(detected)
      applyLang(detected)
    }
  }, [])

  function applyLang(lang: Language) {
    document.documentElement.lang = lang.code
    document.documentElement.dir  = lang.dir
  }

  function setLanguage(lang: Language) {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang.code)
    applyLang(lang)
  }

  const tFn = React.useCallback(
    (key: TranslationKey) => translate(key, language.code),
    [language.code],
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: tFn, languages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return React.useContext(LanguageContext)
}
