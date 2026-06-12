import { EcosystemPageTemplate } from '@/components/ecosystem/EcosystemTemplate'
export const metadata = { title: 'Live Shows' }
export default function LiveShowsPage() {
  return <EcosystemPageTemplate config={{
    title: 'Live Shows', subtitle: 'Adult Ecosystem · Live',
    description: 'Real-time live streaming from verified creators. Interact and connect live.',
    slug: 'live-shows', showCreators: true, isLive: true,
  }} />
}
