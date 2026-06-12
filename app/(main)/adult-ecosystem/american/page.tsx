import { EcosystemPageTemplate } from '@/components/ecosystem/EcosystemTemplate'
export const metadata = { title: 'American Collection' }
export default function AmericanPage() {
  return <EcosystemPageTemplate config={{
    title: 'American Collection', subtitle: 'Adult Ecosystem',
    description: 'USA, Canada and Latin American creators.',
    slug: 'american', showCreators: true,
    subCategories: [
      { label: 'USA', slug: 'american/usa' }, { label: 'Canada', slug: 'american/canada' },
      { label: 'Latin America', slug: 'american/latin' },
    ],
  }} />
}
