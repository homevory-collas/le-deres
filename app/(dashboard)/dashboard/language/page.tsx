'use client'
import { useLocale } from '@/lib/i18n/context'
import { LanguageSelectorFull } from '@/components/i18n/LanguageSwitcher'
import { Globe } from 'lucide-react'

export default function LanguageSettingsPage() {
  const { locale } = useLocale()
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <Globe size={20} className="text-muted-foreground" />
        <h1 className="text-2xl font-serif font-light">Language</h1>
      </div>
      <p className="text-sm text-muted-foreground mb-8">
        Currently: <strong className="text-foreground">{locale.flag} {locale.name}</strong>
        <span className="text-muted-foreground/50 ml-2">({locale.nameEn} · {locale.code})</span>
      </p>
      <div className="max-w-2xl">
        <LanguageSelectorFull />
      </div>
      <p className="text-xs text-muted-foreground mt-6 max-w-md">
        Preference is saved locally. Some content may remain in English while translations are in progress.
      </p>
    </div>
  )
}
