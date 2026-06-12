import Link from 'next/link'
import { Heart, ShoppingBag, Shield, Truck, RotateCcw } from 'lucide-react'

interface Props { params: { category: string; slug: string } }

export default function ProductDetailPage({ params }: Props) {
  const categoryName = params.category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="container-wide section-padding">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-10">
        <Link href="/marketplace" className="hover:text-foreground">Marketplace</Link>
        <span>/</span>
        <Link href={`/marketplace/${params.category}`} className="hover:text-foreground">{categoryName}</Link>
        <span>/</span>
        <span className="text-foreground capitalize">{params.slug.replace(/-/g, ' ')}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">

        {/* Image gallery */}
        <div>
          <div className="aspect-square bg-muted rounded-sm mb-3 flex items-center justify-center text-muted-foreground text-sm">
            Product Image — Phase 2
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square bg-muted rounded-sm cursor-pointer hover:opacity-80 transition-opacity" />
            ))}
          </div>
        </div>

        {/* Product info */}
        <div>
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">{categoryName}</p>
          <h1 className="text-3xl font-serif font-light mb-4 capitalize">
            {params.slug.replace(/-/g, ' ')}
          </h1>

          {/* Rating placeholder */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-sm">★</span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">128 reviews</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-serif font-light">€89.99</span>
            <span className="text-lg text-muted-foreground line-through">€129.99</span>
            <span className="text-xs px-2 py-0.5 bg-foreground text-background">Save 31%</span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Product description placeholder — full description from database in Phase 2.
            Elegance meets sophistication in this premium collection piece.
          </p>

          {/* Size selector placeholder */}
          <div className="mb-6">
            <p className="text-xs tracking-widest uppercase mb-3">Size</p>
            <div className="flex gap-2">
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <button key={size} className="w-10 h-10 border border-border text-xs hover:border-foreground transition-colors">
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-8">
            <button className="flex-1 py-3 bg-foreground text-background text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <ShoppingBag size={14} /> Add to Cart
            </button>
            <button aria-label="Add to wishlist" className="p-3 border border-border hover:border-foreground transition-colors">
              <Heart size={18} />
            </button>
          </div>

          {/* Trust signals */}
          <div className="border-t border-border pt-6 space-y-3">
            {[
              { icon: Shield, label: 'Discreet packaging — 100% private' },
              { icon: Truck,  label: 'Free shipping over €100' },
              { icon: RotateCcw, label: '30-day return policy' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-xs text-muted-foreground">
                <Icon size={14} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description tabs */}
      <div className="mt-16 border-t border-border pt-12">
        <div className="flex gap-8 border-b border-border mb-8">
          {['Description', 'Details', 'Reviews (128)', 'Shipping'].map((tab, i) => (
            <button
              key={tab}
              className={`pb-3 text-xs tracking-widest uppercase border-b-2 transition-colors ${i === 0 ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="max-w-2xl">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Full product description placeholder. In Phase 2 this will contain rich text content, 
            specifications, sizing guides and care instructions from the CMS.
          </p>
        </div>
      </div>
    </div>
  )
}
