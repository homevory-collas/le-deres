import { MembershipCard } from '@/components/cards'
import { Badge } from '@/components/ui'
export const metadata = { title: 'My Membership' }
const TIERS = [
  { tier: 'Silver', price: 19.99, ctaLabel: 'Upgrade', features: ['All Free', 'Exclusive content', '10% off', 'Priority support'] },
  { tier: 'Gold',   price: 39.99, ctaLabel: 'Upgrade', features: ['All Silver', '20% off', 'VIP community', 'Monthly gift'], isPopular: true },
  { tier: 'Black VIP', price: 79.99, ctaLabel: 'Go VIP', features: ['All Gold', '30% off', 'Private events', 'Concierge'] },
]
export default function DashboardMembershipPage() {
  return (
    <div>
      <h1 className="text-2xl font-serif font-light mb-8">My Membership</h1>
      {/* Current status */}
      <div className="border border-[var(--brand-gold)] rounded-sm p-6 mb-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Current Plan</p>
            <p className="text-2xl font-serif font-light mb-1">Gold Member</p>
            <p className="text-xs text-muted-foreground">Renews 1 Aug 2026 · €39.99/month</p>
          </div>
          <Badge variant="gold">Active</Badge>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
          {[
            { label: 'Content Access', value: '100%' },
            { label: 'Marketplace Discount', value: '20%' },
            { label: 'VIP Rooms', value: 'Unlocked' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-medium text-sm">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Upgrade options */}
      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-5">Upgrade Options</p>
      <div className="grid md:grid-cols-3 gap-4">
        {TIERS.map((t) => <MembershipCard key={t.tier} {...t} />)}
      </div>
    </div>
  )
}
