'use client'

import * as React from 'react'
import Link from 'next/link'
import { Star, Crown, Gift, Percent, Lock, CheckCircle, ChevronRight, Calendar } from 'lucide-react'
import { PageHero } from '@/components/common'
import { AdminPageHeader, AdminCard, AdminBtn, DataTable, AdminStatusBadge, StatCard, FormField, AdminInput, AdminSelect } from '@/components/admin/shared'
import { cn } from '@/lib/utils'

// ─── VIP tier data (single source of truth) ───────────────
export const VIP_TIERS_DATA = [
  { level: 1, name: 'Voyageur',    badge: '🌙', price: 29,   color: '#9CA3AF', discount: 5,  members: 842 },
  { level: 2, name: 'Amoureux',    badge: '💫', price: 49,   color: '#60A5FA', discount: 8,  members: 621 },
  { level: 3, name: 'Passionné',   badge: '🌿', price: 79,   color: '#34D399', discount: 10, members: 488 },
  { level: 4, name: 'Séducteur',   badge: '🔥', price: 99,   color: '#F59E0B', discount: 12, members: 374 },
  { level: 5, name: 'Romantique',  badge: '🌹', price: 149,  color: '#EC4899', discount: 15, members: 263 },
  { level: 6, name: 'Aristocrate', badge: '👑', price: 199,  color: '#8B5CF6', discount: 18, members: 185 },
  { level: 7, name: 'Mystique',    badge: '⚜️', price: 299,  color: '#D4AF37', discount: 22, members: 112 },
  { level: 8, name: 'Élite',       badge: '💎', price: 499,  color: '#EF4444', discount: 27, members: 67  },
  { level: 9, name: 'Divin',       badge: '✨', price: 999,  color: '#D4AF37', discount: 35, members: 28  },
]

const VIP_BENEFITS_BY_LEVEL: Record<number, string[]> = {
  1: ['5% marketplace discount','VIP badge','Private feed access','Priority search'],
  2: ['8% marketplace discount','Exclusive DMs','Priority queue','VIP 1 benefits'],
  3: ['10% discount','Creator access','HD streaming','VIP 2 benefits'],
  4: ['12% discount','Monthly gift box','VIP Discord','VIP 3 benefits'],
  5: ['15% discount','Private shows access','Dedicated support','VIP 4 benefits'],
  6: ['18% discount','Creator chat direct','Annual gift','VIP 5 benefits'],
  7: ['22% discount','Exclusive events','Concierge service','VIP 6 benefits'],
  8: ['27% discount','Bespoke experiences','White-glove support','VIP 7 benefits'],
  9: ['35% discount','Unlimited access','Personal account manager','All benefits'],
}

// ─── Public VIP page ──────────────────────────────────────
export function VIPProgramPage() {
  const [hoveredLevel, setHoveredLevel] = React.useState<number | null>(null)
  const totalVip = VIP_TIERS_DATA.reduce((s, t) => s + t.members, 0)

  return (
    <>
      <PageHero
        subtitle="Exclusive"
        title="VIP Collection"
        description="Nine tiers of escalating privilege. Each level unlocks a richer, more personal experience."
      />
      <section className="section-padding border-b border-border">
        <div className="container-wide">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-lg">
            {[
              { label: 'VIP Members', value: totalVip.toLocaleString() },
              { label: 'Max Discount', value: '35%' },
              { label: 'Tiers', value: '9' },
            ].map(s => (
              <div key={s.label} className="text-center border border-border p-4">
                <p className="text-2xl font-serif font-light">{s.value}</p>
                <p className="text-[9px] tracking-widest uppercase text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tier grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VIP_TIERS_DATA.map(tier => (
              <div
                key={tier.level}
                onMouseEnter={() => setHoveredLevel(tier.level)}
                onMouseLeave={() => setHoveredLevel(null)}
                className={cn(
                  'relative border p-5 transition-all overflow-hidden',
                  hoveredLevel === tier.level ? 'border-foreground/50 bg-muted/20' : 'border-border',
                )}
                style={{ borderColor: hoveredLevel === tier.level ? tier.color + '60' : undefined }}
              >
                {/* Background level number */}
                <span className="absolute right-2 -top-2 text-9xl font-bold opacity-[0.04] select-none leading-none" style={{ color: tier.color }}>
                  {tier.level}
                </span>

                <div className="relative z-10">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl">{tier.badge}</span>
                    <div>
                      <p className="text-[9px] tracking-widest uppercase text-muted-foreground">VIP {tier.level}</p>
                      <p className="font-serif font-light text-lg leading-tight">{tier.name}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-lg font-light">€{tier.price}</p>
                      <p className="text-[9px] text-muted-foreground">/month</p>
                    </div>
                  </div>

                  <ul className="space-y-1.5 mb-5">
                    {VIP_BENEFITS_BY_LEVEL[tier.level].map(b => (
                      <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle size={11} style={{ color: tier.color }} className="flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/membership"
                    className="block text-center py-2 border text-xs tracking-widest uppercase transition-all hover:opacity-90"
                    style={{ borderColor: tier.color + '40', color: tier.color, background: tier.color + '10' }}
                  >
                    Join VIP {tier.level}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// ─── VIP Member Dashboard ─────────────────────────────────
export function VIPDashboardPage() {
  const currentTier = VIP_TIERS_DATA[3]  // placeholder — VIP 4
  const nextTier    = VIP_TIERS_DATA[4]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">My VIP Status</p>
          <h1 className="text-2xl font-serif font-light flex items-center gap-2">
            {currentTier.badge} VIP {currentTier.level} — {currentTier.name}
          </h1>
        </div>
      </div>

      {/* Current tier benefits */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-5 mb-6">
        <AdminCard title={`VIP ${currentTier.level} Benefits`}>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: Percent, label: 'Marketplace Discount', value: `${currentTier.discount}% off` },
              { icon: Lock,    label: 'Private Content',       value: 'Unlocked' },
              { icon: Star,    label: 'VIP Community',         value: 'Full Access' },
              { icon: Gift,    label: 'Monthly Gift',          value: 'Active' },
              { icon: Crown,   label: 'Creator Access',        value: 'Direct Chat' },
              { icon: Calendar,label: 'Private Events',        value: 'Invited' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 border border-border p-3">
                <Icon size={16} className="text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium" style={{ color: currentTier.color }}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Upgrade card */}
        <AdminCard title="Upgrade to VIP 5">
          <div className="text-center py-4">
            <span className="text-4xl block mb-2">{nextTier.badge}</span>
            <p className="font-serif font-light text-xl mb-1">{nextTier.name}</p>
            <p className="text-3xl font-light mb-1">€{nextTier.price}</p>
            <p className="text-xs text-muted-foreground mb-5">/month</p>
            <ul className="text-left space-y-2 mb-5">
              {VIP_BENEFITS_BY_LEVEL[nextTier.level].slice(0, 3).map(b => (
                <li key={b} className="text-xs text-muted-foreground flex items-center gap-2">
                  <ChevronRight size={10} style={{ color: nextTier.color }} />{b}
                </li>
              ))}
            </ul>
            <Link
              href="/membership"
              className="block py-2.5 text-xs tracking-widest uppercase text-center transition-all"
              style={{ background: nextTier.color, color: '#080808' }}
            >
              Upgrade Now
            </Link>
          </div>
        </AdminCard>
      </div>
    </div>
  )
}

// ─── Admin VIP Management ─────────────────────────────────
export function AdminVIPPage() {
  const totalVip = VIP_TIERS_DATA.reduce((s, t) => s + t.members, 0)
  const totalMRR = VIP_TIERS_DATA.reduce((s, t) => s + t.members * t.price, 0)

  return (
    <div>
      <AdminPageHeader
        title="VIP Program"
        description="Manage all 9 VIP tiers and member benefits"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'VIP' }]}
        actions={<AdminBtn variant="primary" size="sm">+ Assign VIP</AdminBtn>}
      />
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard label="Total VIP Members" value={totalVip.toLocaleString()} change={15} />
        <StatCard label="VIP MRR"           value={`€${totalMRR.toLocaleString()}`} change={22} />
        <StatCard label="Avg VIP Level"     value="3.8" change={8} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {VIP_TIERS_DATA.map(tier => (
          <div key={tier.level} className="border border-border p-4" style={{ borderLeftColor: tier.color, borderLeftWidth: 3 }}>
            <div className="flex items-center gap-2 mb-2">
              <span>{tier.badge}</span>
              <div>
                <p className="text-xs font-medium">VIP {tier.level} · {tier.name}</p>
                <p className="text-[9px] text-muted-foreground">€{tier.price}/mo · {tier.discount}% discount</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-lg font-light">{tier.members}</p>
                <p className="text-[8px] text-muted-foreground uppercase tracking-widest">members</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-2 border-t border-border">
              <span>MRR: <span className="text-foreground font-medium">€{(tier.members * tier.price).toLocaleString()}</span></span>
              <AdminBtn variant="outline" size="sm">Edit</AdminBtn>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
