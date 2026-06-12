// app/(main)/marketplace/[category]/page.tsx
import { PageHero, ProductCard } from '@/components/common'

interface Props { params: { category: string } }

export async function generateMetadata({ params }: Props) {
  return { title: params.category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) }
}

export default function MarketplaceCategoryPage({ params }: Props) {
  const name = params.category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <>
      <PageHero subtitle="Marketplace" title={name} />

      {/* Sort + filter bar */}
      <div className="border-b border-border">
        <div className="container-wide px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {['All', 'New', 'Bestseller', 'Sale'].map((f) => (
              <button key={f} className="text-xs tracking-widest uppercase px-3 py-1.5 border border-border hover:border-foreground transition-colors first:bg-foreground first:text-background first:border-foreground">
                {f}
              </button>
            ))}
          </div>
          <select className="text-xs border border-border bg-background px-3 py-1.5">
            <option>Sort: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 20 }).map((_, i) => (
              <ProductCard
                key={i}
                name={`${name} — Item #${i + 1}`}
                price={39.99 + i * 15}
                comparePrice={i % 3 === 0 ? 59.99 + i * 15 : undefined}
                category={name}
                isDiscreet
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
