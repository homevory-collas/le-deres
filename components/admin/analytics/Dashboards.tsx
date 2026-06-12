'use client'

import * as React from 'react'
import { AdminCard, AdminBtn, StatCard } from '@/components/admin/shared'
import { SimpleBarChart, DonutChart, Sparkline, MiniMetric, ActivityFeed } from '@/components/admin/analytics/Charts'
import { AdminPageHeader } from '@/components/admin/shared'
import { Download, Calendar, TrendingUp, Users, DollarSign, ShoppingBag, Star, MessageSquare } from 'lucide-react'
import Link from 'next/link'

// ─── Shared chart data generators ────────────────────────
function months(n = 6): { label: string; value: number }[] {
  const names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const now   = new Date().getMonth()
  return Array.from({ length: n }, (_, i) => ({
    label: names[(now - n + i + 12) % 12],
    value: Math.floor(Math.random() * 40000 + 20000),
  }))
}
function spark(n = 10, min = 100, max = 1000) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * (max - min) + min))
}

// ─── Revenue Dashboard ────────────────────────────────────
export function RevenueDashboard() {
  const monthly = months(6)
  const revenueBySource = [
    { label: 'Memberships', value: 68420, color: '#D4AF37' },
    { label: 'Marketplace',  value: 18940, color: '#6B7280' },
    { label: 'VIP Add-ons',  value: 8240,  color: '#8B5CF6' },
    { label: 'Referrals',    value: 2820,  color: '#10B981' },
  ]
  return (
    <div>
      <AdminPageHeader
        title="Revenue Analytics"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Analytics', href: '/admin/analytics' }, { label: 'Revenue' }]}
        actions={<AdminBtn variant="outline" size="sm"><Download size={12} /> Export CSV</AdminBtn>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total MRR',       value: '€98,420',   change: 18 },
          { label: 'Annual Run Rate', value: '€1.18M',    change: 22 },
          { label: 'Avg Revenue/User',value: '€2.04',     change: 8  },
          { label: 'Churn Rate',      value: '2.4%',      change: -5 },
        ].map(s => <StatCard key={s.label} {...s} />)}
      </div>
      <div className="grid lg:grid-cols-[1fr_280px] gap-4 mb-4">
        <AdminCard title="Monthly Recurring Revenue — 6 Months">
          <p className="text-3xl font-light mb-1">€98,420 <span className="text-sm text-green-500">+18%</span></p>
          <p className="text-xs text-muted-foreground mb-5">vs €83,407 prev. month · Projected €118K next month</p>
          <SimpleBarChart data={monthly} height={140} color="#D4AF37" />
        </AdminCard>
        <AdminCard title="Revenue by Source">
          <DonutChart segments={revenueBySource} size={110} />
          <div className="mt-4 border-t border-border pt-4 space-y-2">
            {revenueBySource.map(s => (
              <div key={s.label} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-medium">€{s.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'New Subscriptions', value: '284', change: 12, data: spark() },
          { label: 'Renewals',          value: '1,847', change: 8, data: spark() },
          { label: 'Upgrades',          value: '142', change: 31, data: spark() },
          { label: 'Cancellations',     value: '48', change: -15, data: spark() },
        ].map(m => (
          <AdminCard key={m.label}>
            <div className="flex items-start justify-between mb-2">
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground">{m.label}</p>
              <Sparkline data={m.data} width={60} height={24} color={m.change > 0 ? '#10B981' : '#EF4444'} />
            </div>
            <p className="text-2xl font-light">{m.value}</p>
            <p className={`text-xs mt-1 ${m.change > 0 ? 'text-green-500' : 'text-red-400'}`}>{m.change > 0 ? '+' : ''}{m.change}%</p>
          </AdminCard>
        ))}
      </div>
    </div>
  )
}

// ─── Membership Analytics ─────────────────────────────────
export function MembershipAnalyticsDashboard() {
  const tiers = [
    { label: 'Free',      value: 32000, color: '#6B7280' },
    { label: 'Silver',    value: 8200,  color: '#9CA3AF' },
    { label: 'Gold',      value: 5800,  color: '#D4AF37' },
    { label: 'Black VIP', value: 2291,  color: '#1F1F1F' },
  ]
  const growth = months(6).map(m => ({ ...m, value: Math.floor(m.value / 10) }))
  return (
    <div>
      <AdminPageHeader
        title="Membership Analytics"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Analytics', href: '/admin/analytics' }, { label: 'Membership' }]}
        actions={<AdminBtn variant="outline" size="sm"><Download size={12} /> Export</AdminBtn>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Members',   value: '48,291', change: 12 },
          { label: 'Paid Members',    value: '16,291', change: 18 },
          { label: 'Conversion Rate', value: '33.7%',  change: 5  },
          { label: 'Avg Tenure',      value: '8.4 mo', change: 12 },
        ].map(s => <StatCard key={s.label} {...s} />)}
      </div>
      <div className="grid lg:grid-cols-[1fr_280px] gap-4 mb-4">
        <AdminCard title="Membership Growth — 6 Months">
          <SimpleBarChart data={growth} height={140} color="#8B5CF6" />
        </AdminCard>
        <AdminCard title="Tier Distribution">
          <DonutChart segments={tiers} size={110} />
        </AdminCard>
      </div>
      <AdminCard title="Tier Metrics">
        <div className="grid grid-cols-4 gap-0 border border-border">
          {['Tier','Members','MRR','Avg Retention'].map(h => (
            <div key={h} className="px-4 py-2 border-b border-border bg-muted/30">
              <p className="text-[9px] tracking-widest uppercase text-muted-foreground">{h}</p>
            </div>
          ))}
          {[
            ['Silver',    '8,200',  '€163,980', '9.2 mo'],
            ['Gold',      '5,800',  '€231,620', '11.4 mo'],
            ['Black VIP', '2,291',  '€182,980', '14.8 mo'],
          ].map(row => row.map((cell, i) => (
            <div key={`${row[0]}-${i}`} className="px-4 py-3 border-b border-r border-border last:border-r-0 text-xs">
              <span className={i === 0 ? 'font-medium text-foreground' : 'text-muted-foreground'}>{cell}</span>
            </div>
          )))}
        </div>
      </AdminCard>
    </div>
  )
}

// ─── Creator Analytics ────────────────────────────────────
export function CreatorAnalyticsDashboard() {
  const topCreators = Array.from({ length: 8 }, (_, i) => ({
    name:       ['Élise Moreau','Viktor Blanc','Mila Sorel','Luna Chen','Aria Nova','Kenji Tanaka','Sofia Rossi','Carlos Vega'][i],
    views:      Math.floor(Math.random() * 2000000 + 100000),
    revenue:    `€${(Math.random() * 8000 + 500).toFixed(0)}`,
    subscribers:Math.floor(Math.random() * 80000 + 5000),
    growth:     `+${Math.floor(Math.random() * 30 + 5)}%`,
  }))
  return (
    <div>
      <AdminPageHeader
        title="Creator Analytics"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Analytics', href: '/admin/analytics' }, { label: 'Creators' }]}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Active Creators',  value: '342',    change: 12 },
          { label: 'Total Content',    value: '12,430', change: 24 },
          { label: 'Total Views',      value: '24.8M',  change: 31 },
          { label: 'Creator Revenue',  value: '€68,420',change: 18 },
        ].map(s => <StatCard key={s.label} {...s} />)}
      </div>
      <AdminCard title="Top Creators by Revenue" padding={false}>
        <table className="w-full text-xs">
          <thead><tr className="border-b border-border bg-muted/30">
            {['Creator','Views','Revenue','Subscribers','Growth'].map(h => (
              <th key={h} className="text-left px-4 py-3 text-[9px] tracking-widest uppercase text-muted-foreground">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {topCreators.map((c, i) => (
              <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/20">
                <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                <td className="px-4 py-3">{c.views.toLocaleString()}</td>
                <td className="px-4 py-3 text-green-500 font-medium">{c.revenue}</td>
                <td className="px-4 py-3">{c.subscribers.toLocaleString()}</td>
                <td className="px-4 py-3 text-green-500">{c.growth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminCard>
    </div>
  )
}

// ─── Community Analytics ──────────────────────────────────
export function CommunityAnalyticsDashboard() {
  const weekData = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(label => ({
    label, value: Math.floor(Math.random() * 5000 + 1000),
  }))
  return (
    <div>
      <AdminPageHeader
        title="Community Analytics"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Analytics', href: '/admin/analytics' }, { label: 'Community' }]}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Daily Active',   value: '8,241',  change: 12 },
          { label: 'Posts This Week',value: '4,820',  change: 18 },
          { label: 'New Groups',     value: '24',     change: 8  },
          { label: 'Mod Actions',    value: '142',    change: -5 },
        ].map(s => <StatCard key={s.label} {...s} />)}
      </div>
      <AdminCard title="Daily Post Volume — This Week">
        <SimpleBarChart data={weekData} height={140} color="#EC4899" />
      </AdminCard>
    </div>
  )
}

// ─── Referral Analytics ───────────────────────────────────
export function ReferralAnalyticsDashboard() {
  const monthly = months(6).map(m => ({ ...m, value: Math.floor(m.value / 30) }))
  return (
    <div>
      <AdminPageHeader
        title="Referral Analytics"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Analytics', href: '/admin/analytics' }, { label: 'Referrals' }]}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Referrals',    value: '2,841', change: 18 },
          { label: 'This Month',         value: '284',   change: 24 },
          { label: 'Commission Paid',    value: '€42,820', change: 31 },
          { label: 'Avg Commission',     value: '€15.08', change: 8  },
        ].map(s => <StatCard key={s.label} {...s} />)}
      </div>
      <AdminCard title="Monthly Referrals">
        <SimpleBarChart data={monthly} height={140} color="#10B981" />
      </AdminCard>
    </div>
  )
}

// ─── Main Analytics Hub ───────────────────────────────────
export function AnalyticsHub() {
  const sections = [
    { label: 'Revenue',    href: '/admin/analytics/revenue',    icon: DollarSign,  value: '€98,420', change: 18, color: '#D4AF37' },
    { label: 'Users',      href: '/admin/analytics/users',      icon: Users,       value: '48,291',  change: 12, color: '#3B82F6' },
    { label: 'Membership', href: '/admin/analytics/membership', icon: Star,        value: '16,291',  change: 18, color: '#8B5CF6' },
    { label: 'Marketplace',href: '/admin/analytics/marketplace',icon: ShoppingBag, value: '€18,940', change: 8,  color: '#10B981' },
    { label: 'Creators',   href: '/admin/analytics/creators',   icon: TrendingUp,  value: '342',     change: 12, color: '#EC4899' },
    { label: 'Community',  href: '/admin/analytics/community',  icon: MessageSquare,value:'8,241',   change: 15, color: '#F59E0B' },
    { label: 'Referrals',  href: '/admin/analytics/referrals',  icon: Users,       value: '2,841',   change: 18, color: '#06B6D4' },
  ]
  return (
    <div>
      <AdminPageHeader
        title="Analytics & Business Intelligence"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Analytics' }]}
        actions={<AdminBtn variant="outline" size="sm"><Download size={12} /> Export All</AdminBtn>}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sections.map(({ label, href, icon: Icon, value, change, color }) => (
          <Link key={href} href={href} className="block border border-border p-5 hover:border-foreground/40 transition-colors group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 flex items-center justify-center" style={{ background: color + '20' }}>
                <Icon size={16} style={{ color }} />
              </div>
              <Sparkline data={Array.from({ length: 8 }, () => Math.random() * 100)} width={60} height={24} color={color} />
            </div>
            <p className="text-2xl font-light mb-0.5">{value}</p>
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground">{label}</p>
            <p className={`text-xs mt-1 ${change > 0 ? 'text-green-500' : 'text-red-400'}`}>+{change}% this month</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
