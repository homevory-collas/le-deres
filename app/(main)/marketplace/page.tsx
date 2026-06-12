import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero, ProductCard, SectionHeading } from '@/components/common'

const MARKETPLACE_CATEGORIES = [
  { label: 'Luxury Lingerie',       slug: 'lingerie',    count: 84 },
  { label: 'Premium Fragrances',    slug: 'fragrances',  count: 56 },
  { label: 'Adult Wellness',        slug: 'wellness',    count: 120 },
  { label: 'Couples Products',      slug: 'couples',     count: 68 },
  { label: 'Lifestyle Accessories', slug: 'lifestyle',   count: 45 },
  { label: 'Gift Collections',      slug: 'gifts',       count: 32 },
  { label: 'Premium Dolls',         slug: 'dolls',       count: 28 },
]

export const metadata = { title: 'Marketplace' }

export default function MarketplacePage() {
  return (
    <>
      <PageHero
        subtitle="Marketplace"
        title="Le Désir Market"
        description="Curated lifestyle and wellness products selected for sophistication and personal pleasure."
      />

      {/* Category tabs */}
      <nav className="border-b border-border">
        <div className="container-wide px-4 md:px-8">
          <div className="flex gap-6 overflow-x-auto py-4">
            {MARKETPLACE_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/marketplace/${cat.slug}`}
                className="text-xs tracking-widest uppercase whitespace-nowrap text-muted-foreground hover:text-foreground transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <section className="section-padding">
        <div className="container-wide">

          {/* Category grid */}
          <SectionHeading subtitle="Browse" title="All Categories" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-16">
            {MARKETPLACE_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/marketplace/${cat.slug}`}
                className="group block border border-border rounded-sm p-4 text-center hover:border-foreground/40 transition-colors"
              >
                <div className="aspect-square bg-muted rounded-sm mb-3" />
                <p className="text-xs font-medium">{cat.label}</p>
                <p className="text-[10px] text-muted-foreground">{cat.count} items</p>
              </Link>
            ))}
          </div>

          {/* Featured products */}
          <SectionHeading
            subtitle="Featured"
            title="New Arrivals"
            action={
              <Link href="/marketplace/lingerie" className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground flex items-center gap-1">
                View all <ArrowRight size={12} />
              </Link>
            }
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductCard
                key={i}
                name={`Premium Product #${i + 1}`}
                price={49.99 + i * 20}
                comparePrice={i % 2 === 0 ? 79.99 + i * 20 : undefined}
                category={MARKETPLACE_CATEGORIES[i % MARKETPLACE_CATEGORIES.length].label}
                isDiscreet
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
