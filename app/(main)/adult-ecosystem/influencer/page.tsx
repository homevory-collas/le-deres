import { EcosystemPageTemplate } from '@/components/ecosystem/EcosystemTemplate'
export const metadata = { title: 'Influencer Collections' }
export default function InfluencerPage() {
  return <EcosystemPageTemplate config={{
    title: 'Influencer Collections', subtitle: 'Adult Ecosystem',
    description: 'Exclusive content from top social media creators and verified influencers.',
    slug: 'influencer', showCreators: true,
  }} />
}
