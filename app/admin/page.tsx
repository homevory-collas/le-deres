import { Users, ShoppingBag, FileVideo, CreditCard, DollarSign, Eye, TrendingUp, AlertTriangle, Clock } from 'lucide-react'
import { StatCard, AdminCard, AdminPageHeader, AdminStatusBadge, AdminBtn } from '@/components/admin/shared'
import { SimpleBarChart, DonutChart, ActivityFeed, MiniMetric } from '@/components/admin/analytics/Charts'
import Link from 'next/link'
export const metadata = { title: 'Dashboard — Admin' }
const STATS = [
  { label: 'Total Users',      value: '48,291', change: 12,  href: '/admin/users' },
  { label: 'Monthly Revenue',  value: '€98,420',change: 18,  href: '/admin/analytics/revenue' },
  { label: 'Active Orders',    value: '1,847',  change: 8,   href: '/admin/marketplace/orders' },
  { label: 'Content Items',    value: '12,430', change: 24,  href: '/admin/content' },
  { label: 'VIP Members',      value: '3,240',  change: 31,  href: '/admin/membership' },
  { label: 'Content Views',    value: '2.4M',   change: 15,  href: '/admin/analytics/content' },
  { label: 'Pending Support',  value: '12',     change: -5,  href: '/admin/support' },
  { label: 'Moderation Queue', value: '8',      change: -12, href: '/admin/moderation/queue' },
]
const REVENUE_CHART = [
  { label: 'Jan', value: 62000 }, { label: 'Feb', value: 71000 }, { label: 'Mar', value: 68000 },
  { label: 'Apr', value: 79000 }, { label: 'May', value: 85000 }, { label: 'Jun', value: 98420 },
]
const MEMBERSHIP_DIST = [
  { label: 'Free',      value: 32000, color: '#6B7280' },
  { label: 'Silver',    value: 8200,  color: '#9CA3AF' },
  { label: 'Gold',      value: 5800,  color: '#D4AF37' },
  { label: 'Black VIP', value: 2291,  color: '#1a1a1a' },
]
const ACTIVITY = [
  { id: '1', text: 'New user: viktor_b@gmail.com',               time: '2m',  type: 'user' as const },
  { id: '2', text: 'Order #LD-2026481 — €189.97',               time: '5m',  type: 'order' as const },
  { id: '3', text: 'Content flagged: Asian Collection #47',      time: '12m', type: 'moderation' as const },
  { id: '4', text: 'New Gold membership: mila@ledesir.com',      time: '18m', type: 'user' as const },
  { id: '5', text: 'Order #LD-2026479 delivered',               time: '24m', type: 'order' as const },
  { id: '6', text: 'Content published: European #218',          time: '31m', type: 'content' as const },
  { id: '7', text: 'Support ticket #1841 resolved',             time: '45m', type: 'system' as const },
]
const RECENT_ORDERS = Array.from({ length: 8 }, (_, i) => ({
  id: `LD-20264${80+i}`, user: `user${i+1}@example.com`,
  total: `€${(49+i*35).toFixed(2)}`,
  status: ['DELIVERED','SHIPPED','PROCESSING','PENDING'][i%4], date: `${12-i} Jun`,
}))
const CONTENT_METRICS = [
  { label: 'Views Today', value: '84,291', change: 12 },
  { label: 'New Uploads', value: '47', change: 8 },
  { label: 'Avg Watch',   value: '18m 32s', change: 3 },
  { label: 'Premium Views',value: '31,204', change: 22 },
]
export default function AdminDashboardPage() {
  return (
    <div>
      <AdminPageHeader
        title="Dashboard" description="Platform overview for LE DÉSIR"
        actions={<AdminBtn variant="outline" size="sm"><TrendingUp size={12} /> Export</AdminBtn>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {STATS.map(s => <StatCard key={s.label} {...s} />)}
      </div>
      <div className="grid lg:grid-cols-[1fr_280px] gap-4 mb-4">
        <AdminCard title="Monthly Revenue" actions={<Link href="/admin/analytics/revenue" className="text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground">View All</Link>}>
          <p className="text-2xl font-light mb-1">€98,420 <span className="text-sm text-green-500">+18%</span></p>
          <p className="text-xs text-muted-foreground mb-4">vs €83,407 last month</p>
          <SimpleBarChart data={REVENUE_CHART} height={120} />
        </AdminCard>
        <AdminCard title="Membership Split">
          <DonutChart segments={MEMBERSHIP_DIST} size={100} />
          <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-2 text-center">
            <div><p className="text-lg font-light">48,291</p><p className="text-[9px] text-muted-foreground uppercase tracking-widest">Total</p></div>
            <div><p className="text-lg font-light">2,291</p><p className="text-[9px] text-muted-foreground uppercase tracking-widest">VIP</p></div>
          </div>
        </AdminCard>
      </div>
      <div className="grid lg:grid-cols-[1fr_1fr_280px] gap-4">
        <AdminCard title="Recent Orders" padding={false} actions={<Link href="/admin/marketplace/orders" className="text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground">All Orders</Link>}>
          <table className="w-full text-xs">
            <tbody>
              {RECENT_ORDERS.map(o => (
                <tr key={o.id} className="border-b border-border/40 last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-2.5 font-medium">{o.id}</td>
                  <td className="px-3 py-2.5 text-muted-foreground truncate max-w-[100px]">{o.user}</td>
                  <td className="px-3 py-2.5 font-medium">{o.total}</td>
                  <td className="px-3 py-2.5"><AdminStatusBadge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminCard>
        <AdminCard title="Content Performance" actions={<Link href="/admin/analytics/content" className="text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground">Details</Link>}>
          {CONTENT_METRICS.map(m => (
            <MiniMetric key={m.label} label={m.label} value={m.value} change={m.change} data={Array.from({length:7},()=>Math.random()*100)} />
          ))}
        </AdminCard>
        <AdminCard title="Live Activity" actions={<span className="flex items-center gap-1 text-[9px] text-green-500"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Live</span>}>
          <ActivityFeed items={ACTIVITY} />
        </AdminCard>
      </div>
    </div>
  )
}
