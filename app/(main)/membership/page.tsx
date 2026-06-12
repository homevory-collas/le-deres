import Link from 'next/link'
import { PageHero } from '@/components/common'
import { MembershipCard, VipCard } from '@/components/cards'
import { Button } from '@/components/ui/Button'
export const metadata = { title: 'Membership & VIP' }

const TIERS = [
  {
    name: 'Free',    price: 0,     period: 'forever',
    features: ['Basic content library', 'Community access', 'Monthly newsletter', 'Marketplace browsing'],
    cta: 'Get Started',
  },
  {
    name: 'Silver',  price: 19.99, period: 'month',
    features: ['All Free features', 'Exclusive content', '10% marketplace discount', 'Priority support'],
    cta: 'Upgrade to Silver',
  },
  {
    name: 'Gold',    price: 39.99, period: 'month', popular: true,
    features: ['All Silver features', '20% marketplace discount', 'VIP community access', 'Monthly gift', 'Early access'],
    cta: 'Upgrade to Gold',
  },
  {
    name: 'Black VIP', price: 79.99, period: 'month',
    features: ['All Gold features', '30% marketplace discount', 'Private events', 'Personal concierge', 'Exclusive VIP content'],
    cta: 'Upgrade to VIP',
  },
]

export default function MembershipPage() {
  return (
    <>
      <PageHero subtitle="Membership" title="Choose Your Experience" description="Unlock exclusive content, marketplace discounts and VIP community access." />
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIERS.map((tier) => (
              <div key={tier.name} className={`border rounded-sm p-6 relative ${tier.popular ? 'border-foreground' : 'border-border'}`}>
                {tier.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] px-3 py-0.5 bg-foreground text-background tracking-widest uppercase">
                    Most Popular
                  </span>
                )}
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">{tier.name}</p>
                <p className="text-4xl font-serif font-light mb-1">
                  {tier.price === 0 ? '€0' : `€${tier.price}`}
                </p>
                <p className="text-xs text-muted-foreground mb-6">/{tier.period}</p>
                <ul className="space-y-2.5 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-foreground mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`block text-center py-2.5 text-xs tracking-widest uppercase transition-all ${tier.popular ? 'bg-foreground text-background hover:opacity-90' : 'border border-border hover:border-foreground'}`}>
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
