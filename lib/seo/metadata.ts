import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://ledesir.com'
const SITE_NAME = 'LE DÉSIR'
const DEFAULT_DESCRIPTION = 'LE DÉSIR — Private. Elegant. Personal. Premium AI companion, creator community and luxury lifestyle marketplace.'

export function buildMetadata(opts: {
  title?:       string
  description?: string
  path?:        string
  image?:       string
  noIndex?:     boolean
  type?:        'website' | 'article' | 'product'
}): Metadata {
  const {
    title,
    description = DEFAULT_DESCRIPTION,
    path = '',
    image = '/og-default.jpg',
    noIndex = false,
    type = 'website',
  } = opts

  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Private. Elegant. Personal.`
  const url = `${BASE_URL}${path}`
  const ogImage = image.startsWith('http') ? image : `${BASE_URL}${image}`

  return {
    title:       fullTitle,
    description,
    metadataBase: new URL(BASE_URL),
    alternates:  { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true,  follow: true },
    openGraph: {
      title:       fullTitle,
      description,
      url,
      siteName:    SITE_NAME,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       fullTitle,
      description,
      images:      [ogImage],
    },
    other: {
      'og:locale': 'en_EU',
    },
  }
}

// ─── Per-page metadata presets ───────────────────────────
export const PAGE_META = {
  home:        buildMetadata({ title: undefined, path: '/' }),
  about:       buildMetadata({ title: 'About',         path: '/about' }),
  ecosystem:   buildMetadata({ title: 'Adult Ecosystem', path: '/adult-ecosystem', noIndex: true }),
  marketplace: buildMetadata({ title: 'Marketplace',   path: '/marketplace' }),
  community:   buildMetadata({ title: 'LE DÉSIR Society', path: '/community' }),
  membership:  buildMetadata({ title: 'Membership',    path: '/membership' }),
  login:       buildMetadata({ title: 'Login',         path: '/login',    noIndex: true }),
  register:    buildMetadata({ title: 'Register',      path: '/register', noIndex: true }),
  dashboard:   buildMetadata({ title: 'Dashboard',     path: '/dashboard',noIndex: true }),
}
