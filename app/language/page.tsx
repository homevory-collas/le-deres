'use client'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { LanguageSelectorInline } from '@/components/ui/LanguageSwitcher'
import { useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import Link from 'next/link'

export default function LanguageSelectionPage() {
  const { language, setLanguage, t } = useLanguage()
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <Link href="/" className="mb-10">
        <Logo size="lg" />
      </Link>

      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Globe size={28} className="mx-auto text-muted-foreground mb-3" />
          <h1 className="text-2xl font-serif font-light mb-2">Choose Your Language</h1>
          <p className="text-sm text-muted-foreground">Select your preferred language to continue.</p>
        </div>

        <LanguageSelectorInline className="mb-6" />

        <button
          onClick={() => router.push('/')}
          className="w-full py-3 bg-foreground text-background text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
        >
          Continue as {language.flag} {language.name}
        </button>

        <Link href="/" className="block text-center mt-4 text-xs text-muted-foreground hover:text-foreground">
          Skip — continue in English
        </Link>
      </div>
    </div>
  )
}
