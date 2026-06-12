import { EcosystemPageTemplate } from '@/components/ecosystem/EcosystemTemplate'
export const metadata = { title: 'AI Video' }
export default function AIVideoPage() {
  return <EcosystemPageTemplate config={{
    title: 'AI Video', subtitle: 'Adult Ecosystem · AI',
    description: 'AI-generated premium video experiences. The future of adult content.',
    slug: 'ai-video', isAI: true,
  }} />
}
