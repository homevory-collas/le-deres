'use client'

import Link from 'next/link'
import { ChevronDown, Globe } from 'lucide-react'
import { useState } from 'react'
import { MAIN_NAV, type NavItem } from '@/constants/navigation'
import { MobileLanguagePanel } from '@/components/i18n/LanguageSwitcher'
import { useTranslation } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  open:    boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { t } = useTranslation('navigation')
  const [langOpen, setLangOpen] = useState(false)

  if (!open) return null

  return (
    <div className="lg:hidden border-t border-border bg-background">
      <nav className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">

        {MAIN_NAV.map((item) => (
          <MobileNavItem key={item.href} item={item} onClose={onClose} />
        ))}

        {/* ── Language Selector ── */}
        <MobileLanguagePanel onClose={onClose} />

        {/* Auth buttons */}
        <div className="pt-4 border-t border-border mt-4 flex flex-col gap-2">
          <Link
            href="/login"
            onClick={onClose}
            className="block text-center py-2.5 text-xs tracking-widest uppercase text-muted-foreground border border-border hover:border-foreground transition-colors"
          >
            {t('login')}
          </Link>
          <Link
            href="/register"
            onClick={onClose}
            className="block text-center py-2.5 text-xs tracking-widest uppercase bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            {t('signup')}
          </Link>
        </div>
      </nav>
    </div>
  )
}

function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false)

  if (!item.children) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="block py-2 text-sm text-muted-foreground hover:text-foreground"
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-2 text-sm text-muted-foreground hover:text-foreground"
      >
        {item.label}
        <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="pl-4 border-l border-border space-y-1 mb-1">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClose}
              className="block py-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
