import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero, SectionHeading, ContentCard, CategoryCard } from '@/components/common'

const ECOSYSTEM_CATEGORIES = [
  {
    region:      'European',
    slug:        'european',
    description: 'Curated European content from premium creators',
    count:       240,
  },
  {
    region:      'Asian Collection',
    slug:        'asian',
    description: 'JAV, Chinese, Korean and pan-Asian content',
    count:       380,
    sub: [
      { label: 'JAV',     href: '/adult-ecosystem/asian/jav' },
      { label: 'Chinese', href: '/adult-ecosystem/asian/chinese' },
      { label: 'Korean',  href: '/adult-ecosystem/asian/korean' },
      { label: 'Asian',   href: '/adult-ecosystem/asian/general' },
    ],
  },
  {
    region:      'American Collection',
    slug:        'american',
    description: 'USA, Canada and Latin American creators',
    count:       210,
    sub: [
      { label: 'USA',          href: '/adult-ecosystem/american/usa' },
      { label: 'Canada',       href: '/adult-ecosystem/american/canada' },
      { label: 'Latin America',href: '/adult-ecosystem/american/latin' },
    ],
  },
  {
    region:      'AI Girlfriend',
    slug:        'ai-girlfriend',
    description: 'Personalized AI companions with memory and voice',
    count:       48,
  },
  {
    region:      'AI Video',
    slug:        'ai-video',
    description: 'AI-generated premium video experiences',
    count:       120,
  },
  {
    region:      'Trending Videos',
    slug:        'trending',
    description: 'What members are watching right now',
    count:       500,
  },
  {
    region:      'New Releases',
    slug:        'new-releases',
    description: 'Fresh content added this week',
    count:       85,
  },
  {
    region:      'Influencer Collections',
    slug:        'influencer',
    description: 'From top influencers and verified creators',
    count:       156,
  },
  {
    region:      'Live Shows',
    slug:        'live-shows',
    description: 'Real-time live streaming from creators',
    count:       24,
  },
]

export const metadata = { title: 'Adult Ecosystem' }

export default function AdultEcosystemPage() {
  return (
    <>
      <PageHero
        subtitle="Adult Ecosystem"
        title="Explore Collections"
        description="Premium content across European, Asian and American collections — plus AI companions, live shows and trending videos."
      />

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ECOSYSTEM_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/adult-ecosystem/${cat.slug}`}
                className="group block border border-border rounded-sm p-6 hover:border-foreground/40 transition-colors"
              >
                {/* Placeholder image */}
                <div className="aspect-video bg-muted rounded-sm mb-4 flex items-center justify-center text-muted-foreground text-xs">
                  {cat.region} — image placeholder
                </div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
                  {cat.count} items
                </p>
                <h3 className="font-serif font-light text-xl mb-2">{cat.region}</h3>
                <p className="text-sm text-muted-foreground mb-4">{cat.description}</p>
                {cat.sub && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cat.sub.map((s) => (
                      <span key={s.label} className="text-[10px] px-2 py-1 border border-border tracking-wide">
                        {s.label}
                      </span>
                    ))}
                  </div>
                )}
                <span className="text-xs tracking-widest uppercase flex items-center gap-1 text-muted-foreground group-hover:text-foreground transition-colors">
                  Explore <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
