// ─── EUROPEAN COLLECTION ─────────────────────────────────
import { EcosystemPageTemplate } from '@/components/ecosystem/EcosystemTemplate'
export const metadata = { title: 'European Collection' }
export default function EuropeanPage() {
  return <EcosystemPageTemplate config={{
    title: 'European Collection', subtitle: 'Adult Ecosystem',
    description: 'Curated European content from premium verified creators across France, Italy, Germany and beyond.',
    slug: 'european', showCreators: true,
  }} />
}
