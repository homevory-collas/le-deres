import { EcosystemPageTemplate } from '@/components/ecosystem/EcosystemTemplate'
export const metadata = { title: 'AI Girlfriend' }
export default function AIGirlfriendPage() {
  return <EcosystemPageTemplate config={{
    title: 'AI Girlfriend', subtitle: 'Adult Ecosystem · AI',
    description: 'Personalized AI companions with memory, voice and evolving personalities crafted for intimacy.',
    slug: 'ai-girlfriend', isAI: true,
  }} />
}
