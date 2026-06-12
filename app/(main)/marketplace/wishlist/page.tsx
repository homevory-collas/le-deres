import { PageHero } from '@/components/common'
import { ProductCard } from '@/components/cards'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export const metadata = { title: 'My Wishlist' }

const PLACEHOLDER_WISHLIST = Array.from({ length: 6 }, (_, i) => ({
  id: `wish-${i}`, name: `Wishlist Item #${i + 1}`, slug: `item-${i + 1}`,
  category: 'Lingerie', categorySlug: 'lingerie', price: 59.99 + i * 20,
  comparePrice: i % 2 === 0 ? 89.99 + i * 20 : undefined, isDiscreet: true,
}))

export default function WishlistPage() {
  return (
    <>
      <PageHero subtitle="Dashboard" title="My Wishlist" />
      <section className="section-padding">
        <div className="container-wide">
          {PLACEHOLDER_WISHLIST.length === 0 ? (
            <div className="text-center py-24">
              <Heart size={48} className="mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground mb-6">Your wishlist is empty.</p>
              <Link href="/marketplace" className="inline-flex items-center gap-2 px-8 py-3 bg-foreground text-background text-xs tracking-widest uppercase">
                Browse Marketplace
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
              {PLACEHOLDER_WISHLIST.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
