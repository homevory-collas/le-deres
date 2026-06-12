// app/(main)/about/page.tsx
import { PageHero } from '@/components/common'
export const metadata = { title: 'About LE DÉSIR' }
export default function AboutPage() {
  return (
    <>
      <PageHero subtitle="About" title="LE DÉSIR" description="Private. Elegant. Personal." />
      <section className="section-padding">
        <div className="container-narrow space-y-16">
          {[
            {
              label: 'Our Story',
              content: 'LE DÉSIR was created for those who demand more than the ordinary. Born from a vision of elegance, privacy and personal expression — we built a platform where premium content, curated lifestyle and real community come together seamlessly.',
            },
            {
              label: 'Mission',
              content: 'To provide the most private, elegant and personal digital lifestyle experience — connecting premium content, exclusive creators and curated products with a discerning audience across Europe and Asia.',
            },
            {
              label: 'Vision',
              content: 'To become the definitive luxury lifestyle and adult content platform — a space where sophistication meets desire, and where every interaction feels personal, private and premium.',
            },
            {
              label: 'RB Media Ecosystem',
              content: 'LE DÉSIR is powered by RB Media Ecosystem — a network of digital platforms, creator communities and technology projects designed to push the boundaries of digital lifestyle experiences.',
            },
          ].map((section) => (
            <div key={section.label} className="grid md:grid-cols-[180px_1fr] gap-8">
              <p className="text-xs tracking-widest uppercase text-muted-foreground pt-1">{section.label}</p>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
