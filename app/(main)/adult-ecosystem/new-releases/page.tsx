import { EcosystemPageTemplate } from '@/components/ecosystem/EcosystemTemplate'
export const metadata = { title: 'New Releases' }
export default function NewReleasesPage() {
  return <EcosystemPageTemplate config={{
    title: 'New Releases', subtitle: 'Adult Ecosystem',
    description: 'Fresh content added this week — be the first to watch.',
    slug: 'new-releases',
  }} />
}
