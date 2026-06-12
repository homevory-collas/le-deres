'use client'

import * as React from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { SUPPORTED_LANGUAGES, type Language } from '@/constants/languages'

interface LanguageSwitcherProps {
  variant?:   'icon' | 'full' | 'compact'
  align?:     'left' | 'right'
  className?: string
}

export function LanguageSwitcher({ variant = 'icon', align = 'right', className }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = React.useState(false)
  const ref  = React.useRef<HTMLDivElement>(null)

  // Close on outside click
  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close on Escape
  React.useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  function handleSelect(lang: Language) {
    setLanguage(lang)
    setOpen(false)
  }

  return (
    <div ref={ref} className={cn('relative', className)}>
      {/* ── Trigger ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={`Language: ${language.nameEn}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          'flex items-center gap-1.5 transition-colors',
          open ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
          variant === 'icon'    && 'p-2',
          variant === 'compact' && 'px-2 py-1.5',
          variant === 'full'    && 'px-3 py-2 border border-border hover:border-foreground',
        )}
      >
        <Globe size={16} />
        {(variant === 'compact' || variant === 'full') && (
          <span className="text-xs tracking-wide">{language.flag} {language.code.toUpperCase()}</span>
        )}
        {variant === 'full' && (
          <ChevronDown size={12} className={cn('transition-transform', open && 'rotate-180')} />
        )}
      </button>

      {/* ── Dropdown panel ── */}
      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          className={cn(
            'absolute top-full mt-2 z-50 bg-background border border-border shadow-xl animate-fade-in',
            'w-64',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          {/* Panel header */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground flex items-center gap-2">
              <Globe size={12} /> Select Language
            </p>
          </div>

          {/* Language list */}
          <ul className="py-1 max-h-80 overflow-y-auto">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isActive = lang.code === language.code
              return (
                <li key={lang.code} role="option" aria-selected={isActive}>
                  <button
                    onClick={() => handleSelect(lang)}
                    className={cn(
                      'flex items-center justify-between w-full px-4 py-3 text-left transition-colors',
                      isActive
                        ? 'bg-muted/50 text-foreground'
                        : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground',
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {/* Flag */}
                      <span className="text-base leading-none w-6 text-center" aria-hidden>
                        {lang.flag}
                      </span>
                      <div>
                        {/* Native name */}
                        <p className="text-sm font-medium leading-tight">{lang.name}</p>
                        {/* English name */}
                        <p className="text-[10px] text-muted-foreground mt-0.5">{lang.nameEn}</p>
                      </div>
                    </div>
                    {/* Active check */}
                    {isActive && <Check size={14} className="text-foreground flex-shrink-0" />}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Panel footer */}
          <div className="px-4 py-2.5 border-t border-border">
            <p className="text-[9px] text-muted-foreground/50 tracking-widest uppercase text-center">
              {SUPPORTED_LANGUAGES.length} languages available
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Inline language selector (for settings page / modal) ─
export function LanguageSelectorInline({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage()

  return (
    <div className={cn('grid grid-cols-1 gap-1', className)}>
      {SUPPORTED_LANGUAGES.map((lang) => {
        const isActive = lang.code === language.code
        return (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang)}
            className={cn(
              'flex items-center justify-between px-4 py-3 border transition-colors text-left rounded-sm',
              isActive
                ? 'border-foreground bg-muted/30'
                : 'border-border hover:border-foreground/40',
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg leading-none">{lang.flag}</span>
              <div>
                <p className="text-sm font-medium">{lang.name}</p>
                <p className="text-xs text-muted-foreground">{lang.nameEn}</p>
              </div>
            </div>
            {isActive && <Check size={14} />}
          </button>
        )
      })}
    </div>
  )
}

// ─── Compact flag-only row (for footer) ───────────────────
export function LanguageFlagRow({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage()
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang)}
          title={lang.nameEn}
          aria-label={`Switch to ${lang.nameEn}`}
          className={cn(
            'text-lg leading-none p-1.5 transition-all',
            language.code === lang.code
              ? 'opacity-100 ring-1 ring-border rounded-sm'
              : 'opacity-40 hover:opacity-100',
          )}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  )
}
