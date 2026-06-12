'use client'

import Link from 'next/link'
import { ArrowRight, Play, Shield, Truck, Gift, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui'
import { HeroCarousel } from '@/components/ui/Carousel'
import { ContentCard, ProductCard, CreatorCard, CategoryCard, MembershipCard } from '@/components/cards'
import { SectionHeading } from '@/components/common'
import { cn } from '@/lib/utils'

// ─── HERO BANNER ─────────────────────────────────────────
const HERO_SLIDES = [
  {
    badge:    'New Collection',
    subtitle: 'Exclusive · Premium · Private',
    title:    'Your Private\nLifestyle Platform',
    cta:      { label: 'Enter the Experience', href: '/register' },
  },
  {
    badge:    'AI Companions',
    subtitle: 'Intelligence meets Intimacy',
    title:    'Meet Your AI\nCompanion',
    cta:      { label: 'Explore Companions', href: '/adult-ecosystem/ai-girlfriend' },
  },
  {
    badge:    'Marketplace',
    subtitle: 'Curated for the discerning',
    title:    'Luxury Lifestyle\nMarketplace',
    cta:      { label: 'Shop Collection', href: '/marketplace' },
  },
]

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden border-b border-border">
      <HeroCarousel slides={HERO_SLIDES} className="h-[85vh]" />
    </section>
  )
}

// ─── TRUST BAR ────────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: Shield, label: 'Discreet Packaging',  desc: '100% private delivery' },
  { icon: Truck,  label: 'Secure Shipping',      desc: 'Europe & Asia wide' },
  { icon: Gift,   label: 'Premium Content',      desc: 'Updated daily' },
  { icon: Star,   label: 'VIP Membership',       desc: 'Exclusive benefits' },
]

export function TrustBar() {
  return (
    <div className="border-b border-border">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {TRUST_ITEMS.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-3 px-6 py-5">
              <Icon size={18} className="text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-xs font-medium">{label}</p>
                <p className="text-[10px] text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── ECOSYSTEM OVERVIEW ───────────────────────────────────
const ECOSYSTEM_CATS = [
  { name: 'European',     slug: 'european',     count: 240 },
  { name: 'Asian',        slug: 'asian',         count: 380 },
  { name: 'American',     slug: 'american',      count: 210 },
  { name: 'AI Girlfriend',slug: 'ai-girlfriend', count: 48  },
  { name: 'Live Shows',   slug: 'live-shows',    count: 92  },
  { name: 'Influencers',  slug: 'influencer',    count: 156 },
]

export function EcosystemSection() {
  return (
    <section className="section-padding border-b border-border">
      <div className="container-wide">
        <SectionHeading
          subtitle="Adult Ecosystem"
          title="Explore Collections"
          action={
            <Link href="/adult-ecosystem" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 tracking-widest uppercase">
              View All <ArrowRight size={12} />
            </Link>
          }
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ECOSYSTEM_CATS.map((cat) => (
            <CategoryCard
              key={cat.slug}
              name={cat.name}
              count={cat.count}
              href={`/adult-ecosystem/${cat.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── TRENDING CONTENT ─────────────────────────────────────
const PLACEHOLDER_CONTENT = Array.from({ length: 8 }, (_, i) => ({
  id:           `content-${i}`,
  title:        `Premium Content — Edition ${i + 1}`,
  slug:         `premium-content-${i + 1}`,
  category:     i % 2 === 0 ? 'European' : 'Asian',
  categorySlug: i % 2 === 0 ? 'european' : 'asian',
  isPremium:    i < 5,
  isNew:        i < 2,
  views:        Math.floor(Math.random() * 50000) + 1000,
  duration:     Math.floor(Math.random() * 3600) + 300,
}))

export function TrendingSection() {
  return (
    <section className="section-padding border-b border-border">
      <div className="container-wide">
        <SectionHeading
          subtitle="Trending"
          title="Most Watched Tonight"
          action={
            <Link href="/adult-ecosystem/trending" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 tracking-widest uppercase">
              See All <ArrowRight size={12} />
            </Link>
          }
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PLACEHOLDER_CONTENT.map((item) => (
            <ContentCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── MARKETPLACE HIGHLIGHTS ───────────────────────────────
const PLACEHOLDER_PRODUCTS = Array.from({ length: 4 }, (_, i) => ({
  id:           `product-${i}`,
  name:         ['Midnight Lace Set', 'Velvet Rose Parfum', 'Silk Touch Collection', 'Diamond Couples Set'][i],
  slug:         `product-${i + 1}`,
  category:     ['Lingerie', 'Fragrances', 'Lifestyle', 'Couples'][i],
  categorySlug: ['lingerie', 'fragrances', 'lifestyle', 'couples'][i],
  price:        [89.99, 149.00, 64.99, 199.00][i],
  comparePrice: [129.99, null, 89.99, null][i] ?? undefined,
  isDiscreet:   true,
  isNew:        i === 0,
  isSale:       i === 2,
}))

export function MarketplaceHighlights() {
  return (
    <section className="section-padding border-b border-border bg-muted/10">
      <div className="container-wide">
        <SectionHeading
          subtitle="Marketplace"
          title="Curated For You"
          action={
            <Link href="/marketplace" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 tracking-widest uppercase">
              Shop All <ArrowRight size={12} />
            </Link>
          }
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PLACEHOLDER_PRODUCTS.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FEATURED CREATORS ────────────────────────────────────
const PLACEHOLDER_CREATORS = Array.from({ length: 4 }, (_, i) => ({
  id:           `creator-${i}`,
  slug:         `creator-${i + 1}`,
  displayName:  ['Élise Moreau', 'Viktor Blanc', 'Mila Sorel', 'Luna Chen'][i],
  region:       ['European', 'European', 'Asian', 'Asian'][i],
  followerCount:[48000, 32000, 76000, 55000][i],
  contentCount: [124, 89, 203, 167][i],
  isVerified:   true,
  isLive:       i === 0 || i === 2,
  bio:          'Premium verified creator — exclusive content updated weekly.',
}))

export function FeaturedCreators() {
  return (
    <section className="section-padding border-b border-border">
      <div className="container-wide">
        <SectionHeading
          subtitle="Creators"
          title="Featured Tonight"
          action={
            <Link href="/adult-ecosystem/influencer" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 tracking-widest uppercase">
              All Creators <ArrowRight size={12} />
            </Link>
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLACEHOLDER_CREATORS.map((c) => (
            <CreatorCard key={c.id} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── MEMBERSHIP SECTION ───────────────────────────────────
const MEMBERSHIP_TIERS = [
  {
    tier: 'Free',       price: 0,     ctaLabel: 'Get Started',
    features: ['Basic content', 'Community access', 'Newsletter'],
  },
  {
    tier: 'Silver',     price: 19.99, ctaLabel: 'Upgrade',
    features: ['All Free', 'Exclusive content', '10% off marketplace', 'Priority support'],
  },
  {
    tier: 'Gold',       price: 39.99, ctaLabel: 'Upgrade', isPopular: true,
    features: ['All Silver', '20% off', 'VIP community', 'Monthly gift'],
  },
  {
    tier: 'Black VIP',  price: 79.99, ctaLabel: 'Go VIP',
    features: ['All Gold', '30% off', 'Private events', 'Personal concierge'],
  },
]

export function MembershipSection() {
  return (
    <section className="section-padding border-b border-border">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Membership</p>
          <h2 className="text-3xl font-serif font-light mb-4">Choose Your Experience</h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Unlock exclusive content, marketplace discounts and VIP community access.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MEMBERSHIP_TIERS.map((t) => (
            <MembershipCard key={t.tier} {...t} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── COMMUNITY SECTION ────────────────────────────────────
export function CommunitySection() {
  return (
    <section className="section-padding border-b border-border bg-muted/10">
      <div className="container-wide">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">LE DÉSIR Society</p>
            <h2 className="text-3xl font-serif font-light mb-4">Join the Community</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Connect with like-minded individuals. Share experiences, join exclusive groups
              and participate in private events — for members only.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { label: 'Members', value: '48K+' },
                { label: 'Groups',  value: '240+' },
                { label: 'Events',  value: '12/mo' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-serif font-light">{s.value}</p>
                  <p className="text-[10px] tracking-widest uppercase text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
            <Button variant="primary" rightIcon={<ArrowRight size={13} />} asChild>
              <Link href="/community">Enter Society</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={cn('bg-muted aspect-square', i === 0 && 'col-span-2 aspect-video')} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── PARTNER BRANDS ───────────────────────────────────────
const BRANDS = ['SVAKOM', 'LELO', 'Lovense', 'Wevibe', 'Wicked', 'Magic Motion', 'Satisfyer', 'We-Vibe']

export function PartnerBrandsSection() {
  return (
    <section className="section-padding border-b border-border">
      <div className="container-wide">
        <div className="text-center mb-8">
          <p className="text-xs tracking-widest uppercase text-muted-foreground">Partner Brands</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {BRANDS.map((brand) => (
            <span key={brand} className="text-sm font-medium tracking-widest uppercase opacity-30 hover:opacity-70 transition-opacity cursor-pointer">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
