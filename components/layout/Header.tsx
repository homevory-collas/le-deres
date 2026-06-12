'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, User, Bell, ShoppingBag } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { Navigation } from './Navigation'
import { MobileMenu } from './MobileMenu'
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher'
import { useTranslation } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useTranslation('navigation')

  // TODO: replace with real auth state from useAuth hook
  const isAuthenticated = false

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wide">
        {/* ── Desktop: three-column layout ── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:h-16">

          {/* LEFT — main navigation */}
          <Navigation />

          {/* CENTER — logo always centered */}
          <div className="flex justify-center">
            <Link href="/" aria-label="LE DÉSIR — Home">
              <Logo />
            </Link>
          </div>

          {/* RIGHT — language switcher + auth */}
          <div className="flex items-center justify-end gap-1">

            {/* 🌐 Language Switcher */}
            <LanguageSwitcher variant="icon" align="right" />

            {/* Divider */}
            <span className="w-px h-4 bg-border mx-1" />

            {isAuthenticated ? (
              <>
                <button
                  aria-label={t('auth.dashboard')}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Bell size={18} />
                </button>
                <Link
                  href="/marketplace/cart"
                  aria-label={t('marketplace.cart')}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ShoppingBag size={18} />
                </Link>
                <Link
                  href="/dashboard"
                  aria-label={t('auth.dashboard')}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <User size={18} />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
                >
                  {t('auth.login')}
                </Link>
                <Link
                  href="/register"
                  className={cn(
                    'text-xs tracking-widest uppercase px-4 py-2',
                    'bg-foreground text-background',
                    'hover:opacity-90 transition-opacity',
                  )}
                >
                  {t('auth.signup')}
                </Link>
              </>
            )}
          </div>
        </div>

        {/* ── Mobile: logo center, lang + hamburger right ── */}
        <div className="flex lg:hidden items-center justify-between h-14 px-4">
          <Link href="/" aria-label="LE DÉSIR — Home">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-1">
            {/* 🌐 Language on mobile */}
            <LanguageSwitcher variant="icon" align="right" />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="p-2 text-muted-foreground hover:text-foreground"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu overlay ── */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
