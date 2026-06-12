import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  HeroSection, TrustBar, EcosystemSection, TrendingSection,
  MarketplaceHighlights, FeaturedCreators, MembershipSection,
  CommunitySection, PartnerBrandsSection,
} from '@/components/homepage'
import { SectionHeading, ContentCard, ProductCard, CategoryCard } from '@/components/common'

// ── PLACEHOLDER DATA — replace with real DB queries ──────
const FEATURED_CATEGORIES = [
  { name: 'European Collection', count: 240, href: '/adult-ecosystem/european' },
  { name: 'Asian Collection',    count: 380, href: '/adult-ecosystem/asian' },
  { name: 'American Collection', count: 210, href: '/adult-ecosystem/american' },
  { name: 'AI Girlfriend',       count: 48,  href: '/adult-ecosystem/ai-girlfriend' },
  { name: 'Live Shows',          count: 92,  href: '/adult-ecosystem/live-shows' },
  { name: 'Influencer',          count: 156, href: '/adult-ecosystem/influencer' },
]

const FEATURED_PRODUCTS = [
  { name: 'Midnight Lace Set',        price: 89.99,  comparePrice: 129.99, category: 'Lingerie' },
  { name: 'Velvet Rose Eau de Parfum', price: 149.00, category: 'Fragrances' },
  { name: 'Silk Touch Collection',    price: 64.99,  comparePrice: 89.99,  category: 'Lifestyle' },
  { name: 'Diamond Couples Set',      price: 199.00, category: 'Couples' },
]

const MEMBERSHIP_TIERS = [
  { tier: 'Free',      price: '€0',   features: ['Basic content', 'Community access', 'Newsletter'] },
  { tier: 'Silver',    price: '€19.99', features: ['All Free benefits', 'Exclusive content', '10% off marketplace'] },
  { tier: 'Gold',      price: '€39.99', features: ['All Silver benefits', '20% off', 'VIP community', 'Monthly gift'] },
  { tier: 'Black VIP', price: '€79.99', features: ['All Gold benefits', 'Private events', 'Personal concierge', '30% off'] },
]

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center border-b border-border overflow-hidden">
        {/* Placeholder hero bg — replace with luxury image in Phase 2 */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-muted/20" />

        <div className="relative container-wide section-padding">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">
            Private · Elegant · Personal
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-tight mb-6 max-w-3xl">
            Your Private<br />
            <em className="not-italic opacity-60">Lifestyle</em> Platform
          </h1>
          <p className="text-muted-foreground max-w-lg leading-relaxed mb-10">
            Premium content, exclusive membership and curated lifestyle experiences — 
            designed for the discerning.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3 bg-foreground text-background text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              Join Now <ArrowRight size={14} />
            </Link>
            <Link
              href="/adult-ecosystem"
              className="inline-flex items-center gap-2 px-8 py-3 border border-border text-sm tracking-widest uppercase hover:border-foreground transition-colors"
            >
              Explore
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES BAR ─────────────────────────────── */}
      <section className="border-b border-border">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { label: 'Exclusive Content',    desc: 'Updated daily' },
              { label: 'Discreet Packaging',   desc: '100% private' },
              { label: 'Secure Payments',      desc: 'PayPal · USDT · Card' },
              { label: 'VIP Membership',       desc: 'Premium benefits' },
            ].map((item) => (
              <div
                key={item.label}
                className="py-6 px-6 border-r border-border last:border-r-0 text-center"
              >
                <p className="text-sm font-medium mb-1">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADULT ECOSYSTEM OVERVIEW ─────────────────── */}
      <section className="section-padding border-b border-border">
        <div className="container-wide">
          <SectionHeading
            subtitle="Adult Ecosystem"
            title="Explore Our Collections"
            action={
              <Link href="/adult-ecosystem" className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground flex items-center gap-1">
                View all <ArrowRight size={12} />
              </Link>
            }
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {FEATURED_CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.name}
                name={cat.name}
                count={cat.count}
                href={cat.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── TRENDING CONTENT ─────────────────────────── */}
      <section className="section-padding border-b border-border">
        <div className="container-wide">
          <SectionHeading
            subtitle="Content"
            title="Trending Now"
            action={
              <Link href="/adult-ecosystem/trending" className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground flex items-center gap-1">
                See all <ArrowRight size={12} />
              </Link>
            }
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ContentCard
                key={i}
                title={`Premium Content #${i + 1} — Placeholder title`}
                category={i % 2 === 0 ? 'European' : 'Asian'}
                isPremium={i < 4}
                views={Math.floor(Math.random() * 50000) + 1000}
                duration={Math.floor(Math.random() * 3600) + 300}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKETPLACE HIGHLIGHTS ───────────────────── */}
      <section className="section-padding border-b border-border bg-muted/20">
        <div className="container-wide">
          <SectionHeading
            subtitle="Marketplace"
            title="Curated For You"
            action={
              <Link href="/marketplace" className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground flex items-center gap-1">
                Shop all <ArrowRight size={12} />
              </Link>
            }
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map((p) => (
              <ProductCard
                key={p.name}
                name={p.name}
                price={p.price}
                comparePrice={p.comparePrice}
                category={p.category}
                isDiscreet
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP OVERVIEW ──────────────────────── */}
      <section className="section-padding border-b border-border">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3">Membership</p>
            <h2 className="text-3xl font-serif font-light mb-4">Choose Your Experience</h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm">
              Unlock exclusive content, marketplace discounts and VIP community access.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MEMBERSHIP_TIERS.map((tier) => (
              <div
                key={tier.tier}
                className="border border-border rounded-sm p-6 hover:border-foreground/40 transition-colors"
              >
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">{tier.tier}</p>
                <p className="text-3xl font-serif font-light mb-1">{tier.price}</p>
                <p className="text-xs text-muted-foreground mb-6">/month</p>
                <ul className="space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-foreground">—</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/membership"
                  className="mt-6 block text-center py-2 border border-border text-xs tracking-widest uppercase hover:border-foreground transition-colors"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY HIGHLIGHTS ─────────────────────── */}
      <section className="section-padding border-b border-border bg-muted/20">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4">LE DÉSIR Society</p>
              <h2 className="text-3xl font-serif font-light mb-4">Join the Community</h2>
              <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
                Connect with like-minded individuals. Share experiences, join exclusive groups 
                and participate in private events — only for members.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Members',  value: '48K+' },
                  { label: 'Groups',   value: '240+' },
                  { label: 'Events',   value: '12/mo' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl font-serif font-light">{stat.value}</p>
                    <p className="text-xs text-muted-foreground tracking-widest uppercase">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/community"
                className="inline-flex items-center gap-2 px-8 py-3 bg-foreground text-background text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
              >
                Enter Society <ArrowRight size={12} />
              </Link>
            </div>
            {/* Placeholder community preview */}
            <div className="bg-muted rounded-sm aspect-square flex items-center justify-center text-muted-foreground text-sm">
              Community Preview — Phase 2
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNER BRANDS ───────────────────────────── */}
      <section className="section-padding border-b border-border">
        <div className="container-wide">
          <div className="text-center mb-8">
            <p className="text-xs tracking-widest uppercase text-muted-foreground">Partner Brands</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {['SVAKOM', 'LELO', 'Lovense', 'Wevibe', 'Wicked', 'Magic Motion'].map((brand) => (
              <span key={brand} className="text-sm font-medium tracking-widest uppercase">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ PREVIEW ──────────────────────────────── */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-3">FAQ</p>
          <h2 className="text-3xl font-serif font-light mb-4">Common Questions</h2>
          <p className="text-muted-foreground mb-8 text-sm">
            Everything you need to know about LE DÉSIR.
          </p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-8 py-3 border border-border text-xs tracking-widest uppercase hover:border-foreground transition-colors"
          >
            View All FAQs <ArrowRight size={12} />
          </Link>
        </div>
      </section>
    </>
  )
}
