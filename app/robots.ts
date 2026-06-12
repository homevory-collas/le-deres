import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://ledesir.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/marketplace', '/about', '/faq', '/contact', '/membership'],
        disallow: [
          '/adult-ecosystem/',  // age-gated — don't index
          '/dashboard/',
          '/admin/',
          '/api/',
          '/login',
          '/register',
          '/community/messages',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
