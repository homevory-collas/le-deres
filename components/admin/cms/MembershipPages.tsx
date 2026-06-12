'use client'

import * as React from 'react'
import { Plus, Edit, Save, Star, Gift, Percent, Users, Cake } from 'lucide-react'
import {
  AdminPageHeader, AdminCard, AdminBtn, DataTable,
  AdminStatusBadge, FormField, AdminInput, AdminTextarea,
  AdminSelect, StatCard,
} from '@/components/admin/shared'

// ─── VIP Tiers data ──────────────────────────────────────
const VIP_TIERS = [
  { level: 1, name: 'Voyageur',    price: 29,   badge: '🌙', members: 842, discount: '5%',  color: '#9CA3AF' },
  { level: 2, name: 'Amoureux',    price: 49,   badge: '💫', members: 621, discount: '8%',  color: '#60A5FA' },
  { level: 3, name: 'Passionné',   price: 79,   badge: '🌿', members: 488, discount: '10%', color: '#34D399' },
  { level: 4, name: 'Séducteur',   price: 99,   badge: '🔥', members: 374, discount: '12%', color: '#F59E0B' },
  { level: 5, name: 'Romantique',  price: 149,  badge: '🌹', members: 263, discount: '15%', color: '#EC4899' },
  { level: 6, name: 'Aristocrate', price: 199,  badge: '👑', members: 185, discount: '18%', color: '#8B5CF6' },
  { level: 7, name: 'Mystique',    price: 299,  badge: '⚜️', members: 112, discount: '22%', color: '#D4AF37' },
  { level: 8, name: 'Élite',       price: 499,  badge: '💎', members: 67,  discount: '27%', color: '#EF4444' },
  { level: 9, name: 'Divin',       price: 999,  badge: '✨', members: 28,  discount: '35%', color: '#D4AF37' },
]

// ─── VIP Tiers management page ────────────────────────────
export function AdminVIPTiersPage() {
  const [editingTier, setEditingTier] = React.useState<number | null>(null)
  const totalVip = VIP_TIERS.reduce((s, t) => s + t.members, 0)
  const totalMRR = VIP_TIERS.reduce((s, t) => s + t.members * t.price, 0)

  return (
    <div>
      <AdminPageHeader
        title="VIP Tiers"
        description="Manage all 9 VIP membership levels"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Membership', href: '/admin/membership' }, { label: 'VIP Tiers' }]}
      />

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard label="Total VIP Members"  value={totalVip.toLocaleString()} change={15} />
        <StatCard label="VIP MRR"            value={`€${totalMRR.toLocaleString()}`} change={22} />
        <StatCard label="Avg VIP Spend"      value={`€${Math.round(totalMRR / totalVip)}/mo`} change={8} />
      </div>

      {/* VIP tier cards */}
      <div className="grid grid-cols-1 gap-4">
        {VIP_TIERS.map((tier) => (
          <AdminCard key={tier.level} padding={false}>
            <div className="flex items-start gap-5 p-5">
              {/* Level indicator */}
              <div
                className="w-14 h-14 flex-shrink-0 flex flex-col items-center justify-center border border-border text-center"
                style={{ borderColor: tier.color + '40' }}
              >
                <span className="text-xl leading-none">{tier.badge}</span>
                <span className="text-[8px] tracking-widest uppercase text-muted-foreground mt-1">VIP {tier.level}</span>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-medium">{tier.name}</p>
                  <span className="text-xs text-muted-foreground">€{tier.price}/month</span>
                  <AdminStatusBadge status="ACTIVE" />
                </div>
                <div className="grid grid-cols-4 gap-4 text-xs text-muted-foreground">
                  <div><span className="font-medium text-foreground">{tier.members}</span> members</div>
                  <div><span className="font-medium text-foreground">{tier.discount}</span> marketplace discount</div>
                  <div><span className="font-medium text-foreground">€{(tier.members * tier.price).toLocaleString()}</span> MRR</div>
                  <div style={{ color: tier.color }}>● Level {tier.level}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <AdminBtn variant="outline" size="sm" onClick={() => setEditingTier(editingTier === tier.level ? null : tier.level)}>
                  <Edit size={11} /> Edit
                </AdminBtn>
              </div>
            </div>

            {/* Inline edit form */}
            {editingTier === tier.level && (
              <div className="border-t border-border p-5 bg-muted/20">
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <FormField label="Display Name">
                    <AdminInput defaultValue={tier.name} />
                  </FormField>
                  <FormField label="Monthly Price (€)">
                    <AdminInput type="number" defaultValue={tier.price} />
                  </FormField>
                  <FormField label="Marketplace Discount">
                    <AdminInput defaultValue={tier.discount} />
                  </FormField>
                  <FormField label="Badge Emoji">
                    <AdminInput defaultValue={tier.badge} />
                  </FormField>
                </div>
                <div className="flex gap-2">
                  <AdminBtn variant="primary" size="sm"><Save size={11} /> Save VIP {tier.level}</AdminBtn>
                  <AdminBtn variant="ghost" size="sm" onClick={() => setEditingTier(null)}>Cancel</AdminBtn>
                </div>
              </div>
            )}
          </AdminCard>
        ))}
      </div>
    </div>
  )
}

// ─── Benefits management ──────────────────────────────────
const BENEFITS_DATA = [
  { id: 'b1', name: 'Exclusive Content Access',   tier: 'SILVER',    type: 'content',   status: 'ACTIVE' },
  { id: 'b2', name: '10% Marketplace Discount',   tier: 'SILVER',    type: 'discount',  status: 'ACTIVE' },
  { id: 'b3', name: '20% Marketplace Discount',   tier: 'GOLD',      type: 'discount',  status: 'ACTIVE' },
  { id: 'b4', name: 'VIP Community Rooms',        tier: 'GOLD',      type: 'community', status: 'ACTIVE' },
  { id: 'b5', name: 'Monthly Gift Box',           tier: 'GOLD',      type: 'gift',      status: 'ACTIVE' },
  { id: 'b6', name: 'Private Events Access',      tier: 'BLACK_VIP', type: 'event',     status: 'ACTIVE' },
  { id: 'b7', name: 'Personal Concierge',         tier: 'BLACK_VIP', type: 'service',   status: 'ACTIVE' },
  { id: 'b8', name: '30% Marketplace Discount',   tier: 'BLACK_VIP', type: 'discount',  status: 'ACTIVE' },
  { id: 'b9', name: 'Premium Gift Box',           tier: 'BLACK_VIP', type: 'gift',      status: 'ACTIVE' },
]

export function AdminBenefitsPage() {
  const columns = [
    { key: 'name', label: 'Benefit', render: (r: any) => <span className="font-medium text-foreground">{r.name}</span> },
    { key: 'tier', label: 'Tier',   render: (r: any) => <AdminStatusBadge status={r.tier} /> },
    { key: 'type', label: 'Type',   render: (r: any) => <span className="capitalize">{r.type}</span> },
    { key: 'status', label: 'Status', render: (r: any) => <AdminStatusBadge status={r.status} /> },
  ]
  return (
    <div>
      <AdminPageHeader title="Benefits" description="Manage membership benefits per tier"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Membership' }, { label: 'Benefits' }]}
        actions={<AdminBtn variant="primary" size="sm"><Plus size={12} /> Add Benefit</AdminBtn>}
      />
      <AdminCard padding={false}>
        <DataTable columns={columns} data={BENEFITS_DATA} onEdit={(r) => console.log(r.id)} onDelete={(r) => console.log(r.id)} />
      </AdminCard>
    </div>
  )
}

// ─── Discount rules ───────────────────────────────────────
const DISCOUNT_RULES = [
  { id: 'd1', name: 'Silver Marketplace',    tier: 'SILVER',    category: 'All',        value: '10%', stacks: false, status: 'ACTIVE' },
  { id: 'd2', name: 'Gold Marketplace',      tier: 'GOLD',      category: 'All',        value: '20%', stacks: false, status: 'ACTIVE' },
  { id: 'd3', name: 'Black VIP Marketplace', tier: 'BLACK_VIP', category: 'All',        value: '30%', stacks: false, status: 'ACTIVE' },
  { id: 'd4', name: 'VIP 5 Premium Brands',  tier: 'VIP_5',     category: 'Premium',    value: '25%', stacks: true,  status: 'ACTIVE' },
  { id: 'd5', name: 'VIP 9 Full Access',     tier: 'VIP_9',     category: 'All',        value: '40%', stacks: true,  status: 'ACTIVE' },
]

export function AdminDiscountsPage() {
  const columns = [
    { key: 'name', label: 'Rule',     render: (r: any) => <span className="font-medium text-foreground">{r.name}</span> },
    { key: 'tier', label: 'Tier',     render: (r: any) => <AdminStatusBadge status={r.tier} /> },
    { key: 'category', label: 'Category' },
    { key: 'value', label: 'Discount', render: (r: any) => <span className="font-medium text-green-500">{r.value}</span> },
    { key: 'stacks', label: 'Stackable', render: (r: any) => <span>{r.stacks ? '✓ Yes' : '✗ No'}</span> },
    { key: 'status', label: 'Status', render: (r: any) => <AdminStatusBadge status={r.status} /> },
  ]
  return (
    <div>
      <AdminPageHeader title="Discount Rules" description="Configure membership discount logic"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Membership' }, { label: 'Discounts' }]}
        actions={<AdminBtn variant="primary" size="sm"><Plus size={12} /> Add Rule</AdminBtn>}
      />
      <AdminCard padding={false}>
        <DataTable columns={columns} data={DISCOUNT_RULES} onEdit={(r) => console.log(r.id)} onDelete={(r) => console.log(r.id)} />
      </AdminCard>
    </div>
  )
}

// ─── Referral rules ───────────────────────────────────────
export function AdminReferralsPage() {
  return (
    <div>
      <AdminPageHeader title="Referral Program" description="Configure referral commissions and rules"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Membership' }, { label: 'Referrals' }]}
      />
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard label="Active Referrers"  value="2,841" change={18} />
        <StatCard label="Referrals This Month" value="847" change={24} />
        <StatCard label="Commission Paid"   value="€12,490" change={31} />
      </div>
      <AdminCard title="Referral Settings">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <FormField label="Base Commission Rate">
            <AdminInput type="number" defaultValue="10" />
          </FormField>
          <FormField label="Commission Type">
            <AdminSelect options={[{ value: 'percent', label: 'Percentage' }, { value: 'fixed', label: 'Fixed Amount' }]} />
          </FormField>
          <FormField label="Minimum Payout (€)">
            <AdminInput type="number" defaultValue="25" />
          </FormField>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <FormField label="Payout Schedule">
            <AdminSelect options={[{ value: 'monthly', label: 'Monthly' }, { value: 'weekly', label: 'Weekly' }, { value: 'instant', label: 'Instant' }]} />
          </FormField>
          <FormField label="Cookie Duration (days)">
            <AdminInput type="number" defaultValue="30" />
          </FormField>
        </div>
        <AdminBtn variant="primary" size="sm"><Save size={12} /> Save Settings</AdminBtn>
      </AdminCard>

      {/* Recent referrals table */}
      <AdminCard title="Recent Referrals" padding={false} className="mt-4">
        <DataTable
          columns={[
            { key: 'referrer',   label: 'Referrer' },
            { key: 'referred',   label: 'Referred' },
            { key: 'tier',       label: 'Plan', render: (r: any) => <AdminStatusBadge status={r.tier} /> },
            { key: 'commission', label: 'Commission', render: (r: any) => <span className="text-green-500">{r.commission}</span> },
            { key: 'status',     label: 'Status', render: (r: any) => <AdminStatusBadge status={r.status} /> },
            { key: 'date',       label: 'Date' },
          ]}
          data={Array.from({ length: 10 }, (_, i) => ({
            id: `r-${i}`, referrer: `user${i+1}@ledesir.com`,
            referred: `newuser${i+100}@example.com`,
            tier: ['SILVER', 'GOLD', 'BLACK_VIP'][i % 3],
            commission: `€${(4 + i * 8).toFixed(2)}`,
            status: i < 8 ? 'ACTIVE' : 'PENDING',
            date: `${10 - i} Jun 2026`,
          }))}
          onView={(r) => console.log(r.id)}
        />
      </AdminCard>
    </div>
  )
}

// ─── Birthday rewards ─────────────────────────────────────
export function AdminBirthdayPage() {
  const BIRTHDAY_RULES = [
    { tier: 'SILVER',    gift: '€10 store credit',   bonus: '5% extra discount', status: 'ACTIVE' },
    { tier: 'GOLD',      gift: '€25 store credit + gift',  bonus: '10% extra discount', status: 'ACTIVE' },
    { tier: 'BLACK_VIP', gift: '€50 store credit + premium gift', bonus: '15% extra discount', status: 'ACTIVE' },
    { tier: 'VIP_5',     gift: 'Custom gift box',    bonus: '20% extra + personal message', status: 'ACTIVE' },
    { tier: 'VIP_9',     gift: 'Luxury gift package',bonus: '30% extra + concierge', status: 'ACTIVE' },
  ]
  const columns = [
    { key: 'tier',   label: 'Tier',   render: (r: any) => <AdminStatusBadge status={r.tier} /> },
    { key: 'gift',   label: 'Birthday Gift', render: (r: any) => <span className="text-foreground">{r.gift}</span> },
    { key: 'bonus',  label: 'Bonus',  render: (r: any) => <span className="text-green-500">{r.bonus}</span> },
    { key: 'status', label: 'Status', render: (r: any) => <AdminStatusBadge status={r.status} /> },
  ]
  return (
    <div>
      <AdminPageHeader title="Birthday Rewards" description="Configure member birthday gifts and bonuses"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Membership' }, { label: 'Birthday' }]}
      />
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard label="Birthdays This Month" value="284" change={0} />
        <StatCard label="Gifts Sent"           value="261" change={0} />
        <StatCard label="Gift Budget Used"     value="€6,420" change={12} />
      </div>
      <AdminCard padding={false}>
        <DataTable columns={columns} data={BIRTHDAY_RULES} onEdit={(r) => console.log(r.id)} />
      </AdminCard>
    </div>
  )
}
