import type { MetadataRoute } from 'next'
import { generateI18nSitemap } from '@/lib/i18n/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  return generateI18nSitemap()
}
