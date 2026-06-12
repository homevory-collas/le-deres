'use client'

import * as React from 'react'
import { Globe, Check, ChevronDown, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocale } from '@/lib/i18n/context'
import { LOCALES, LOCALES_BY_REGION, type LocaleConfig } from '@/lib/i18n/config'

// ─── Region labels ────────────────────────────────────────
const REGION_LABELS: Record<string, string> = {
  default:          'English',
  europe:           'Europe',
  'latin-america':  'Latin America',
  asia:             'Asia',
}

// ─── Desktop header language switcher ────────────────────
interface LanguageSwitcherProps {
  variant?:   'icon' | 'compact' | 'full'
  align?:     'left' | 'right'
  className?: string
}

export function LanguageSwitcher({
  variant = 'icon',
  align = 'right',
  className,
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale()
  const [open,   setOpen]   = React.useState(false)
  const [search, setSearch] = React.useState('')
  const ref    = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Close on outside click
  React.useEffect(() => {
    function h(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  // Close on Escape, focus input on open
  React.useEffect(() => {
    function h(e: KeyboardEvent) {
      if (e.key === 'Escape') { setOpen(false); setSearch('') }
    }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [])

  React.useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  function select(lang: LocaleConfig) {
    setLocale(lang)
    setOpen(false)
    setSearch('')
  }

  const filtered = search.trim()
    ? LOCALES.filter(
        (l) =>
          l.name.toLowerCase().includes(search.toLowerCase()) ||
          l.nameEn.toLowerCase().includes(search.toLowerCase()) ||
          l.code.toLowerCase().includes(search.toLowerCase()),
      )
    : null

  return (
    <div ref={ref} className={cn('relative', className)}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={`Language: ${locale.nameEn}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          'flex items-center gap-1.5 transition-colors',
          open ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
          variant === 'icon'    && 'p-2',
          variant === 'compact' && 'px-2.5 py-1.5 border border-border hover:border-foreground/50 text-xs',
          variant === 'full'    && 'px-3 py-2 border border-border hover:border-foreground text-xs',
        )}
      >
        <Globe size={15} aria-hidden />
        {variant !== 'icon' && (
          <span className="tracking-wide font-medium">
            {locale.flag} {locale.name}
          </span>
        )}
        {variant === 'full' && (
          <ChevronDown size={11} className={cn('transition-transform ml-0.5', open && 'rotate-180')} />
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="dialog"
          aria-label="Select language"
          className={cn(
            'absolute top-full mt-2 z-[100] bg-background border border-border shadow-2xl',
            'w-72',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground flex items-center gap-1.5">
              <Globe size={11} /> Language
            </p>
            <button onClick={() => { setOpen(false); setSearch('') }} className="text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          </div>

          {/* Search */}
          <div className="px-3 py-2 border-b border-border">
            <div className="flex items-center gap-2 bg-muted px-3 py-2">
              <Search size={12} className="text-muted-foreground flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search language..."
                className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground/50"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-muted-foreground hover:text-foreground">
                  <X size={11} />
                </button>
              )}
            </div>
          </div>

          {/* Language list */}
          <ul role="listbox" className="max-h-72 overflow-y-auto py-1">
            {filtered ? (
              filtered.length > 0 ? (
                filtered.map((lang) => (
                  <LanguageOption key={lang.code} lang={lang} active={locale.code === lang.code} onSelect={select} />
                ))
              ) : (
                <li className="px-4 py-4 text-xs text-muted-foreground text-center">No languages found</li>
              )
            ) : (
              Object.entries(LOCALES_BY_REGION).map(([region, langs]) => (
                <li key={region}>
                  <p className="px-4 py-1.5 text-[9px] tracking-widest uppercase text-muted-foreground/50 bg-muted/30">
                    {REGION_LABELS[region]}
                  </p>
                  {langs.map((lang) => (
                    <LanguageOption key={lang.code} lang={lang} active={locale.code === lang.code} onSelect={select} />
                  ))}
                </li>
              ))
            )}
          </ul>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-border">
            <p className="text-[9px] text-muted-foreground/40 tracking-widest uppercase text-center">
              {LOCALES.length} languages available
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Single language row option ───────────────────────────
function LanguageOption({
  lang, active, onSelect,
}: {
  lang: LocaleConfig
  active: boolean
  onSelect: (l: LocaleConfig) => void
}) {
  return (
    <li role="option" aria-selected={active}>
      <button
        onClick={() => onSelect(lang)}
        className={cn(
          'flex items-center justify-between w-full px-4 py-2.5 text-left transition-colors group',
          active
            ? 'bg-muted/50 text-foreground'
            : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground',
        )}
      >
        <div className="flex items-center gap-3">
          <span className="text-base leading-none w-6 text-center" aria-hidden>{lang.flag}</span>
          <div>
            <p className="text-sm font-medium leading-tight">{lang.name}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{lang.nameEn} · {lang.code}</p>
          </div>
        </div>
        {active && <Check size={13} className="text-foreground flex-shrink-0" />}
      </button>
    </li>
  )
}

// ─── Mobile menu language panel ───────────────────────────
export function MobileLanguagePanel({ onClose }: { onClose?: () => void }) {
  const { locale, setLocale } = useLocale()
  const [open, setOpen] = React.useState(false)

  function select(lang: LocaleConfig) {
    setLocale(lang)
    setOpen(false)
    onClose?.()
  }

  return (
    <div className="border-t border-border pt-4 mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <span className="flex items-center gap-2">
          <Globe size={14} />
          <span>Language</span>
          <span className="font-medium text-foreground">{locale.flag} {locale.name}</span>
        </span>
        <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="mt-2 grid grid-cols-2 gap-1.5 max-h-64 overflow-y-auto pb-2">
          {LOCALES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => select(lang)}
              className={cn(
                'flex items-center gap-2 px-3 py-2.5 border text-left transition-colors',
                locale.code === lang.code
                  ? 'border-foreground bg-muted/30 text-foreground'
                  : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground',
              )}
            >
              <span className="text-base leading-none flex-shrink-0">{lang.flag}</span>
              <div className="min-w-0">
                <p className="text-xs font-medium truncate leading-tight">{lang.name}</p>
                <p className="text-[9px] text-muted-foreground truncate">{lang.code}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Full-page language selector (settings page) ─────────
export function LanguageSelectorFull({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale()
  const [search, setSearch] = React.useState('')

  const filtered = search.trim()
    ? LOCALES.filter(
        (l) =>
          l.name.toLowerCase().includes(search.toLowerCase()) ||
          l.nameEn.toLowerCase().includes(search.toLowerCase()),
      )
    : null

  return (
    <div className={className}>
      {/* Search */}
      <div className="relative mb-6">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search languages..."
          className="w-full border border-border bg-background pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Grouped list */}
      <div className="space-y-6">
        {filtered ? (
          <div className="grid grid-cols-1 gap-1.5">
            {filtered.map((lang) => (
              <FullLanguageRow key={lang.code} lang={lang} active={locale.code === lang.code} onSelect={setLocale} />
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground py-4 text-center">No languages found for "{search}"</p>
            )}
          </div>
        ) : (
          Object.entries(LOCALES_BY_REGION).map(([region, langs]) => (
            <div key={region}>
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-3 border-b border-border pb-2">
                {REGION_LABELS[region]}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {langs.map((lang) => (
                  <FullLanguageRow key={lang.code} lang={lang} active={locale.code === lang.code} onSelect={setLocale} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function FullLanguageRow({
  lang, active, onSelect,
}: {
  lang: LocaleConfig
  active: boolean
  onSelect: (l: LocaleConfig) => void
}) {
  return (
    <button
      onClick={() => onSelect(lang)}
      className={cn(
        'flex items-center justify-between px-4 py-3 border transition-colors text-left',
        active
          ? 'border-foreground bg-muted/30'
          : 'border-border hover:border-foreground/40 hover:bg-muted/20',
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl leading-none">{lang.flag}</span>
        <div>
          <p className="text-sm font-medium">{lang.name}</p>
          <p className="text-xs text-muted-foreground">{lang.nameEn} · {lang.code}</p>
        </div>
      </div>
      {active && <Check size={15} className="text-foreground flex-shrink-0" />}
    </button>
  )
}

// ─── Compact flags row (footer) ───────────────────────────
export function LanguageFlagsRow({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale()
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {LOCALES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang)}
          title={`${lang.nameEn} (${lang.code})`}
          aria-label={`Switch to ${lang.nameEn}`}
          className={cn(
            'text-lg leading-none p-1.5 transition-all border',
            locale.code === lang.code
              ? 'opacity-100 border-border/50'
              : 'opacity-30 border-transparent hover:opacity-80 hover:border-border/30',
          )}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  )
}
