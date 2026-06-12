import { EcosystemPageTemplate } from '@/components/ecosystem/EcosystemTemplate'
export const metadata = { title: 'Asian Collection' }
export default function AsianPage() {
  return <EcosystemPageTemplate config={{
    title: 'Asian Collection', subtitle: 'Adult Ecosystem',
    description: 'JAV, Chinese, Korean and pan-Asian content.',
    slug: 'asian', showCreators: true,
    subCategories: [
      { label: 'JAV', slug: 'asian/jav' }, { label: 'Chinese', slug: 'asian/chinese' },
      { label: 'Korean', slug: 'asian/korean' }, { label: 'General Asian', slug: 'asian/general' },
    ],
  }} />
}
