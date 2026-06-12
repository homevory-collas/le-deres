import { ContentCard, PageHero, SectionHeading } from '@/components/common'

interface Props {
  params: { category: string }
}

// Map slugs to display labels
const CATEGORY_META: Record<string, { name: string; description: string }> = {
  european:     { name: 'European Collection',     description: 'Premium European content from verified creators.' },
  asian:        { name: 'Asian Collection',         description: 'JAV, Chinese, Korean and pan-Asian content.' },
  american:     { name: 'American Collection',      description: 'USA, Canada and Latin American creators.' },
  'ai-girlfriend': { name: 'AI Girlfriend',         description: 'Personalized AI companions with evolving memory.' },
  'ai-video':   { name: 'AI Video',                 description: 'AI-generated premium video experiences.' },
  trending:     { name: 'Trending Videos',          description: 'Most watched content this week.' },
  'new-releases': { name: 'New Releases',           description: 'Fresh content added this week.' },
  influencer:   { name: 'Influencer Collections',   description: 'Top influencers and verified creators.' },
  'live-shows': { name: 'Live Shows',               description: 'Real-time streaming from creators.' },
}

export async function generateMetadata({ params }: Props) {
  const meta = CATEGORY_META[params.category]
  return { title: meta?.name ?? 'Collection' }
}

export default function CategoryListingPage({ params }: Props) {
  const meta = CATEGORY_META[params.category] ?? {
    name:        params.category,
    description: '',
  }

  return (
    <>
      <PageHero
        subtitle="Adult Ecosystem"
        title={meta.name}
        description={meta.description}
      />

      {/* Filter bar — placeholder */}
      <div className="border-b border-border">
        <div className="container-wide px-4 md:px-8 py-4 flex items-center gap-4 overflow-x-auto">
          {['All', 'New', 'Popular', 'Premium', 'Free'].map((filter) => (
            <button
              key={filter}
              className="text-xs tracking-widest uppercase whitespace-nowrap px-3 py-1.5 border border-border hover:border-foreground transition-colors first:bg-foreground first:text-background first:border-foreground"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Content grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <ContentCard
                key={i}
                title={`${meta.name} — Content Item #${i + 1}`}
                category={meta.name}
                isPremium={i % 3 !== 0}
                views={Math.floor(Math.random() * 80000) + 500}
                duration={Math.floor(Math.random() * 3600) + 120}
              />
            ))}
          </div>

          {/* Load more — placeholder */}
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
