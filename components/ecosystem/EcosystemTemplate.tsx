import Link from 'next/link'
import { Filter, Grid, List } from 'lucide-react'
import { ContentCard, CreatorCard } from '@/components/cards'
import { Tabs } from '@/components/ui'
import { PageHero, SectionHeading } from '@/components/common'

export interface EcosystemPageConfig {
  title:        string
  subtitle:     string
  description:  string
  slug:         string
  subCategories?: { label: string; slug: string }[]
  showCreators?:  boolean
  isLive?:        boolean
  isAI?:          boolean
}

export function EcosystemPageTemplate({ config }: { config: EcosystemPageConfig }) {
  const {
    title, subtitle, description, slug,
    subCategories, showCreators = false, isLive = false, isAI = false,
  } = config

  const SAMPLE_CONTENT = Array.from({ length: 16 }, (_, i) => ({
    id:           `${slug}-${i}`,
    title:        `${title} — ${isAI ? 'AI Experience' : 'Content'} #${i + 1}`,
    slug:         `${slug}-content-${i + 1}`,
    category:     title,
    categorySlug: slug,
    isPremium:    i < 10,
    isNew:        i < 3,
    views:        Math.floor(Math.random() * 80000) + 500,
    duration:     isAI ? undefined : Math.floor(Math.random() * 3600) + 120,
  }))

  const SAMPLE_CREATORS = Array.from({ length: 6 }, (_, i) => ({
    id:           `creator-${slug}-${i}`,
    slug:         `${slug}-creator-${i + 1}`,
    displayName:  `Creator ${i + 1}`,
    region:       title,
    followerCount: Math.floor(Math.random() * 80000) + 5000,
    contentCount:  Math.floor(Math.random() * 200) + 20,
    isVerified:   true,
    isLive:       i === 0,
    bio:          'Premium verified creator with exclusive content.',
  }))

  return (
    <>
      <PageHero subtitle={subtitle} title={title} description={description} />

      {/* Sub-category tabs */}
      {subCategories && subCategories.length > 0 && (
        <div className="border-b border-border">
          <div className="container-wide px-4 md:px-8 py-4 flex gap-4 overflow-x-auto">
            <Link
              href={`/adult-ecosystem/${slug}`}
              className="text-xs tracking-widest uppercase whitespace-nowrap border-b-2 border-foreground text-foreground pb-2"
            >
              All
            </Link>
            {subCategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/adult-ecosystem/${sub.slug}`}
                className="text-xs tracking-widest uppercase whitespace-nowrap text-muted-foreground hover:text-foreground pb-2 border-b-2 border-transparent transition-colors"
              >
                {sub.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Live indicator for live shows */}
      {isLive && (
        <div className="bg-red-500/10 border-b border-red-500/20">
          <div className="container-wide px-4 md:px-8 py-3 flex items-center gap-3">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <p className="text-xs tracking-widest uppercase text-red-500 font-medium">Live Now — 12 streams active</p>
          </div>
        </div>
      )}

      {/* Filter + sort bar */}
      <div className="border-b border-border">
        <div className="container-wide px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {['All', 'New', 'Popular', 'Premium', 'Free', ...(isAI ? ['Interactive'] : [])].map((f, i) => (
              <button
                key={f}
                className={`text-xs tracking-widest uppercase whitespace-nowrap px-3 py-1.5 border transition-colors flex-shrink-0 ${
                  i === 0 ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button aria-label="Grid view" className="p-1.5 text-muted-foreground hover:text-foreground">
              <Grid size={15} />
            </button>
            <button aria-label="List view" className="p-1.5 text-muted-foreground hover:text-foreground">
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Creators strip */}
      {showCreators && (
        <section className="section-padding border-b border-border">
          <div className="container-wide">
            <SectionHeading subtitle="Creators" title={`${title} Creators`} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {SAMPLE_CREATORS.map((c) => <CreatorCard key={c.id} {...c} />)}
            </div>
          </div>
        </section>
      )}

      {/* Content grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className={`grid gap-4 ${isAI ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'}`}>
            {SAMPLE_CONTENT.map((item) => (
              <ContentCard
                key={item.id}
                {...item}
                variant={isAI ? 'default' : 'default'}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="px-10 py-3 border border-border text-xs tracking-widest uppercase hover:border-foreground transition-colors">
              Load More
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
