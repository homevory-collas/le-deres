import Link from 'next/link'
import { PageHero } from '@/components/common'
import { AI_CHARACTERS } from '@/services/ai'
import { Badge } from '@/components/ui'
export const metadata = { title: 'AI Companions' }
export default function AICompanionPage() {
  return (
    <>
      <PageHero subtitle="Adult Ecosystem · AI" title="AI Companions" description="Personalized AI companions with memory, voice and evolving personalities."/>
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AI_CHARACTERS.map(char=>(
              <Link key={char.id} href={`/ai-companion/${char.id}`} className="group block border border-border hover:border-foreground/40 transition-colors p-5">
                <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center text-2xl">
                  {char.name[0]}
                </div>
                <p className="font-serif font-light text-xl text-center mb-1">{char.name}</p>
                <p className="text-xs text-muted-foreground text-center mb-3">{char.description}</p>
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {char.traits.map(t=><span key={t} className="text-[9px] px-2 py-0.5 border border-border">{t}</span>)}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                  <span className="capitalize">{char.category}</span>
                  <span>{char.requiredTier === 'FREE' ? 'Free' : char.requiredTier}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
