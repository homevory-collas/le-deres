// app/(dashboard)/dashboard/wishlist/page.tsx
import { ProductCard } from '@/components/cards'
export const metadata = { title: 'Wishlist' }
const ITEMS = Array.from({ length: 6 }, (_, i) => ({
  id: `w${i}`, name: `Saved Item #${i+1}`, slug: `item-${i+1}`,
  category: 'Lingerie', categorySlug: 'lingerie', price: 69.99+i*15, isDiscreet: true,
}))
export default function DashboardWishlistPage() {
  return (
    <div>
      <h1 className="text-2xl font-serif font-light mb-8">Wishlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {ITEMS.map((p) => <ProductCard key={p.id} {...p} />)}
      </div>
    </div>
  )
}
