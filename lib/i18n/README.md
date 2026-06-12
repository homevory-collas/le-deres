# LE DÉSIR — i18n System Documentation

## Overview

Enterprise-level internationalization supporting **27 locales** across 4 regions.

## Architecture

```
lib/i18n/
  config.ts       — Master locale registry (all 27 languages + metadata)
  index.ts        — Core engine: loader, interpolation, pluralization
  context.tsx     — React Context + hooks (useI18n, useTranslation, useLocale)
  seo.ts          — hreflang, localized metadata, i18n sitemap
  exports.ts      — Clean public API barrel

locales/
  en-US/          — Default (English US) — complete translations
  fr-FR/          — French — complete translations
  de-DE/          — German — complete translations
  es-ES/          — Spanish — complete translations
  it-IT/          — Italian — complete translations
  pt-PT/          — Portuguese — complete translations
  pt-BR/          — Portuguese Brazil — complete translations
  zh-CN/          — Chinese Simplified — complete translations
  zh-TW/          — Chinese Traditional — complete translations
  ja-JP/          — Japanese — complete translations
  ko-KR/          — Korean — complete translations
  vi-VN/          — Vietnamese — complete translations
  th-TH/          — Thai — complete translations
  nl-NL/          — Dutch — stub (pending)
  pl-PL/          — Polish — stub (pending)
  ro-RO/          — Romanian — stub (pending)
  cs-CZ/          — Czech — stub (pending)
  sv-SE/          — Swedish — stub (pending)
  nb-NO/          — Norwegian — stub (pending)
  da-DK/          — Danish — stub (pending)
  fi-FI/          — Finnish — stub (pending)
  el-GR/          — Greek — stub (pending)
  hu-HU/          — Hungarian — stub (pending)
  es-MX/          — Spanish Mexico — stub (pending)
  es-AR/          — Spanish Argentina — stub (pending)
  es-CL/          — Spanish Chile — stub (pending)
  es-UY/          — Spanish Uruguay — stub (pending)

middleware.ts      — Locale detection + URL routing
```

## Translation Files (per locale)

Each locale directory contains:
- `common.json`      — Shared UI strings (buttons, labels, etc.)
- `navigation.json`  — Nav items, menu labels
- `homepage.json`    — Homepage sections
- `marketplace.json` — Shop, cart, checkout, orders
- `membership.json`  — Plans, VIP tiers, referral
- `community.json`   — Feed, groups, events, messages
- `faq.json`         — FAQ questions and answers
- `footer.json`      — Footer links, policies, copyright
- `auth.json`        — Login, register, errors

## Usage in Components

```tsx
// Hook scoped to a namespace
import { useTranslation } from '@/lib/i18n/context'

export function MyComponent() {
  const { t, formatPrice, formatDate } = useTranslation('marketplace')

  return (
    <div>
      <p>{t('addToCart')}</p>
      <p>{t('cart.total')}</p>
      <p>{formatPrice(89.99)}</p>
    </div>
  )
}
```

```tsx
// Interpolation with variables
t('freeShippingOver', { amount: '€100' })
// → "Free shipping over €100"
```

```tsx
// Full i18n context
import { useI18n } from '@/lib/i18n/context'

const { locale, setLocale, t, formatPrice, formatRelTime } = useI18n()
```

```tsx
// Just locale switcher
import { useLocale } from '@/lib/i18n/context'

const { locale, setLocale, locales } = useLocale()
```

## URL Routing

```
Default (en-US):    ledesir.com/about
French:             ledesir.com/fr-FR/about
Japanese:           ledesir.com/ja-JP/marketplace
Vietnamese:         ledesir.com/vi-VN/membership
```

The middleware (`middleware.ts`) handles:
1. Detecting locale from URL path
2. Auto-detecting from `Accept-Language` header
3. Reading saved preference from `ld-locale` cookie
4. Redirecting to correct prefixed URL

## SEO

```tsx
// In any page.tsx
import { buildLocalizedMetadata } from '@/lib/i18n/seo'
import { DEFAULT_LOCALE } from '@/lib/i18n/config'

export async function generateMetadata({ params }) {
  const locale = getLocale(params.locale ?? 'en-US')
  return buildLocalizedMetadata({
    title: 'Marketplace',
    path:  '/marketplace',
    locale,
  })
}
```

This automatically generates:
- `canonical` URL
- `hreflang` alternates for all 27 locales
- OpenGraph `locale` + `alternateLocale`
- Twitter card metadata

## Adding a New Language

1. Create directory: `locales/xx-XX/`
2. Copy `locales/en-US/*.json` as templates
3. Translate all values
4. Add locale config to `lib/i18n/config.ts` LOCALES array
5. The middleware and switcher pick it up automatically

## Translation Workflow (Future)

- Admin UI at `/admin/translations` (placeholder — Phase 3)
- AI-assisted translation via Anthropic API
- In-context editor for translators
- Missing key detection and reporting
- Translation progress dashboard
