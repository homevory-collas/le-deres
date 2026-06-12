'use client'
import * as React from 'react'
import Link from 'next/link'
import { Users, MessageSquare, Flag, Shield, Ban, Hash, TrendingUp, Eye, Trash2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import {
  AdminPageHeader, AdminCard, AdminBtn, DataTable,
  AdminStatusBadge, StatCard, AdminSearchBar,
  Pagination, FilterBar, FormField, AdminInput, AdminSelect,
} from '@/components/admin/shared'
import { SimpleBarChart, ActivityFeed } from '@/components/admin/analytics/Charts'
import { cn } from '@/lib/utils'

// ─── Community Dashboard ──────────────────────────────────
export function CommunityDashboard() {
  const STATS = [
    { label: 'Total Posts',     value: '142,891', change: 18, href: '/admin/community/posts' },
    { label: 'Active Groups',   value: '284',     change: 12, href: '/admin/community/groups' },
    { label: 'Reports Queue',   value: '14',      change: -8, href: '/admin/community/reports' },
    { label: 'Banned Users',    value: '47',      change: -3, href: '/admin/community/bans' },
    { label: 'Mod Queue',       value: '8',       change: 5,  href: '/admin/community/moderation' },
    { label: 'VIP Groups',      value: '36',      change: 22, href: '/admin/community/groups' },
  ]
  const ACTIVITY = [
    { id:'1', text:'Post #89241 flagged by 3 users', time:'4m',  type: 'moderation' as const },
    { id:'2', text:'New VIP group created: "Gold Lounge"', time:'12m', type: 'user' as const },
    { id:'3', text:'User ban_001 banned for spam', time:'28m', type: 'system' as const },
    { id:'4', text:'Report #441 resolved — post removed', time:'1h', type: 'moderation' as const },
    { id:'5', text:'Community post milestone: 142,891 posts', time:'2h', type: 'content' as const },
  ]
  const ENGAGEMENT = [
    { label: 'Mon', value: 2840 }, { label: 'Tue', value: 3120 },
    { label: 'Wed', value: 2980 }, { label: 'Thu', value: 3450 },
    { label: 'Fri', value: 4100 }, { label: 'Sat', value: 4820 },
    { label: 'Sun', value: 3940 },
  ]
  return (
    <div>
      <AdminPageHeader title="Community" description="LE DÉSIR Society management"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Community' }]}
      />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
        {STATS.map(s => <StatCard key={s.label} {...s} />)}
      </div>
      <div className="grid lg:grid-cols-[1fr_280px] gap-4 mb-4">
        <AdminCard title="Weekly Engagement">
          <SimpleBarChart data={ENGAGEMENT} height={120} color="#D4AF37" />
        </AdminCard>
        <AdminCard title="Live Activity">
          <ActivityFeed items={ACTIVITY} />
        </AdminCard>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Groups', href: '/admin/community/groups',     icon: Hash,          desc: 'Manage all community groups' },
          { label: 'Posts',  href: '/admin/community/posts',      icon: MessageSquare, desc: 'Review and moderate posts' },
          { label: 'Reports',href: '/admin/community/reports',    icon: Flag,          desc: 'User-submitted reports' },
          { label: 'Queue',  href: '/admin/community/moderation', icon: Eye,           desc: 'Content pending review' },
          { label: 'Bans',   href: '/admin/community/bans',       icon: Ban,           desc: 'Banned user management' },
          { label: 'Access', href: '/admin/community/bans',       icon: Shield,        desc: 'VIP access controls' },
        ].map(s => {
          const Icon = s.icon
          return (
            <Link key={s.href+s.label} href={s.href} className="border border-border p-4 hover:border-foreground/40 transition-colors group">
              <Icon size={18} className="text-muted-foreground mb-2 group-hover:text-foreground transition-colors" />
              <p className="text-sm font-medium">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// ─── Groups Management ────────────────────────────────────
const GROUPS_DATA = Array.from({ length: 30 }, (_, i) => ({
  id: `g-${i}`, name: `Community Group #${i + 1}`,
  slug: `group-${i + 1}`,
  type: i % 4 === 0 ? 'VIP' : i % 3 === 0 ? 'PRIVATE' : 'PUBLIC',
  members: Math.floor(Math.random() * 5000 + 50),
  posts: Math.floor(Math.random() * 2000 + 10),
  minTier: ['FREE', 'SILVER', 'GOLD', 'BLACK_VIP'][i % 4],
  status: i < 27 ? 'ACTIVE' : 'SUSPENDED',
  created: `${10 - Math.floor(i / 4)} Jun 2026`,
}))

export function CommunityGroupsPage() {
  const [search, setSearch] = React.useState('')
  const [page, setPage]     = React.useState(1)
  const perPage = 15
  const filtered = GROUPS_DATA.filter(g => !search || g.name.toLowerCase().includes(search.toLowerCase()))
  const paged    = filtered.slice((page - 1) * perPage, page * perPage)
  const cols = [
    { key: 'name',    label: 'Group',    render: (r: any) => <span className="font-medium text-foreground">{r.name}</span> },
    { key: 'type',    label: 'Type',     render: (r: any) => <AdminStatusBadge status={r.type} /> },
    { key: 'members', label: 'Members' },
    { key: 'posts',   label: 'Posts' },
    { key: 'minTier', label: 'Min Tier', render: (r: any) => <AdminStatusBadge status={r.minTier} /> },
    { key: 'status',  label: 'Status',   render: (r: any) => <AdminStatusBadge status={r.status} /> },
  ]
  return (
    <div>
      <AdminPageHeader title="Groups" breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Community', href: '/admin/community' }, { label: 'Groups' }]}
        actions={<AdminBtn variant="primary" size="sm">+ Create Group</AdminBtn>}
      />
      <AdminCard padding={false}>
        <div className="p-4 border-b border-border">
          <AdminSearchBar value={search} onChange={setSearch} placeholder="Search groups…" className="mb-0" />
        </div>
        <DataTable columns={cols} data={paged} onEdit={r => console.log(r.id)} onDelete={r => console.log(r.id)} />
        <Pagination page={page} total={filtered.length} perPage={perPage} onChange={setPage} />
      </AdminCard>
    </div>
  )
}

// ─── Posts Management ─────────────────────────────────────
const POSTS_DATA = Array.from({ length: 50 }, (_, i) => ({
  id: `p-${i}`, content: `Community post #${i + 1} — placeholder content preview…`,
  author: `user${i + 1}@ledesir.com`,
  group: i % 3 === 0 ? `Group #${(i % 10) + 1}` : 'Public Feed',
  type: ['text', 'image', 'video'][i % 3],
  likes: Math.floor(Math.random() * 500),
  reports: Math.floor(Math.random() * 5),
  status: i < 40 ? 'PUBLISHED' : i < 47 ? 'REVIEW' : 'REMOVED',
  created: `${10 - Math.floor(i / 6)} Jun 2026`,
}))

export function CommunityPostsPage() {
  const [search, setSearch]   = React.useState('')
  const [filters, setFilters] = React.useState<Record<string, string>>({})
  const [page, setPage]       = React.useState(1)
  const perPage = 15
  const filtered = POSTS_DATA.filter(p => {
    if (search && !p.author.includes(search) && !p.content.includes(search)) return false
    if (filters.status && p.status !== filters.status) return false
    return true
  })
  const paged = filtered.slice((page - 1) * perPage, page * perPage)
  const cols = [
    { key: 'content', label: 'Post',   render: (r: any) => <p className="text-xs line-clamp-1 max-w-xs">{r.content}</p> },
    { key: 'author',  label: 'Author', render: (r: any) => <span className="text-foreground">{r.author}</span> },
    { key: 'group',   label: 'Group' },
    { key: 'type',    label: 'Type',    render: (r: any) => <span className="capitalize">{r.type}</span> },
    { key: 'likes',   label: 'Likes' },
    { key: 'reports', label: 'Reports', render: (r: any) => (
      <span className={r.reports > 0 ? 'text-red-400 font-medium' : 'text-muted-foreground'}>{r.reports}</span>
    )},
    { key: 'status',  label: 'Status', render: (r: any) => <AdminStatusBadge status={r.status} /> },
  ]
  return (
    <div>
      <AdminPageHeader title="Posts" breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Community', href: '/admin/community' }, { label: 'Posts' }]} />
      <AdminCard padding={false}>
        <div className="flex items-center gap-4 p-4 border-b border-border">
          <AdminSearchBar value={search} onChange={setSearch} placeholder="Search posts…" className="mb-0 flex-1 max-w-sm" />
          <FilterBar
            filters={[{ key: 'status', label: 'All Status', options: [
              { value: 'PUBLISHED', label: 'Published' }, { value: 'REVIEW', label: 'In Review' }, { value: 'REMOVED', label: 'Removed' },
            ]}]}
            values={filters} onChange={(k, v) => setFilters(f => ({ ...f, [k]: v }))}
          />
        </div>
        <DataTable columns={cols} data={paged} onView={r => console.log(r.id)} onDelete={r => console.log(r.id)}
          actions={r => (
            <div className="flex gap-1">
              <button className="text-[9px] px-2 py-1 border border-green-500/30 text-green-500 hover:bg-green-500/10">Approve</button>
              <button className="text-[9px] px-2 py-1 border border-red-500/30 text-red-400 hover:bg-red-500/10">Remove</button>
            </div>
          )}
        />
        <Pagination page={page} total={filtered.length} perPage={perPage} onChange={setPage} />
      </AdminCard>
    </div>
  )
}

// ─── Reports Queue ────────────────────────────────────────
const REPORTS_DATA = Array.from({ length: 20 }, (_, i) => ({
  id: `rpt-${i}`, targetType: ['post', 'comment', 'user', 'group'][i % 4],
  targetId: `#${1000 + i}`, reporter: `user${i + 10}@ledesir.com`,
  reason: ['Spam', 'Inappropriate', 'Harassment', 'Fake content', 'Off-topic'][i % 5],
  priority: i < 5 ? 'HIGH' : i < 12 ? 'MEDIUM' : 'LOW',
  status: i < 8 ? 'OPEN' : i < 15 ? 'IN_PROGRESS' : 'RESOLVED',
  created: `${10 - Math.floor(i / 3)} Jun 2026`,
}))

export function CommunityReportsPage() {
  const [page, setPage] = React.useState(1)
  const perPage = 15
  const paged = REPORTS_DATA.slice((page - 1) * perPage, page * perPage)
  const cols = [
    { key: 'id',         label: 'Report',     render: (r: any) => <code className="text-[10px] bg-muted px-1">{r.id}</code> },
    { key: 'targetType', label: 'Type',        render: (r: any) => <span className="capitalize">{r.targetType}</span> },
    { key: 'targetId',   label: 'Target ID' },
    { key: 'reporter',   label: 'Reporter' },
    { key: 'reason',     label: 'Reason',     render: (r: any) => <span className="text-foreground">{r.reason}</span> },
    { key: 'priority',   label: 'Priority',   render: (r: any) => <AdminStatusBadge status={r.priority} /> },
    { key: 'status',     label: 'Status',     render: (r: any) => <AdminStatusBadge status={r.status} /> },
  ]
  return (
    <div>
      <AdminPageHeader title="Reports Queue" description={`${REPORTS_DATA.filter(r => r.status === 'OPEN').length} open reports`}
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Community', href: '/admin/community' }, { label: 'Reports' }]}
      />
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Open',        value: REPORTS_DATA.filter(r => r.status === 'OPEN').length,        color: 'text-red-400' },
          { label: 'In Progress', value: REPORTS_DATA.filter(r => r.status === 'IN_PROGRESS').length, color: 'text-yellow-500' },
          { label: 'Resolved',    value: REPORTS_DATA.filter(r => r.status === 'RESOLVED').length,    color: 'text-green-500' },
        ].map(s => (
          <div key={s.label} className="border border-border p-4 text-center">
            <p className={`text-2xl font-light ${s.color}`}>{s.value}</p>
            <p className="text-[9px] tracking-widest uppercase text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <AdminCard padding={false}>
        <DataTable columns={cols} data={paged}
          actions={r => (
            <div className="flex gap-1">
              <button className="text-[9px] px-2 py-1 border border-green-500/30 text-green-500 hover:bg-green-500/10">Resolve</button>
              <button className="text-[9px] px-2 py-1 border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10">Review</button>
            </div>
          )}
        />
        <Pagination page={page} total={REPORTS_DATA.length} perPage={perPage} onChange={setPage} />
      </AdminCard>
    </div>
  )
}

// ─── Moderation Queue ─────────────────────────────────────
const MOD_QUEUE = Array.from({ length: 12 }, (_, i) => ({
  id: `mod-${i}`, type: ['post', 'comment', 'image'][i % 3],
  content: `Content item #${i + 1} flagged by AI moderation system for review`,
  author: `user${i + 5}@ledesir.com`,
  aiScore: Math.floor(Math.random() * 40 + 60),
  flags: ['Nudity', 'Spam', 'Violence', 'Explicit'][i % 4],
  created: `${10 - i} Jun 2026`,
}))

export function CommunityModerationPage() {
  return (
    <div>
      <AdminPageHeader title="Moderation Queue" description="AI-flagged content pending human review"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Community', href: '/admin/community' }, { label: 'Moderation' }]}
      />
      <div className="space-y-3">
        {MOD_QUEUE.map(item => (
          <AdminCard key={item.id} padding={false}>
            <div className="flex items-start gap-4 p-4">
              <div className="w-16 h-16 bg-muted flex-shrink-0 flex items-center justify-center">
                <span className="text-[10px] text-muted-foreground capitalize">{item.type}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <code className="text-[10px] bg-muted px-1">{item.id}</code>
                  <span className="capitalize text-xs text-muted-foreground">{item.type}</span>
                  <span className="text-[9px] px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20">
                    AI: {item.aiScore}% confidence
                  </span>
                  <span className="text-[9px] px-2 py-0.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                    {item.flags}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{item.content}</p>
                <p className="text-[10px] text-muted-foreground/50 mt-1">{item.author} · {item.created}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <AdminBtn variant="success" size="sm"><CheckCircle size={11} /> Approve</AdminBtn>
                <AdminBtn variant="danger"  size="sm"><XCircle size={11} /> Remove</AdminBtn>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  )
}

// ─── Bans Management ─────────────────────────────────────
const BANS_DATA = Array.from({ length: 20 }, (_, i) => ({
  id: `ban-${i}`, user: `banned_user${i + 1}@example.com`,
  type: i % 3 === 0 ? 'PERMANENT' : 'TEMPORARY',
  reason: ['Spam', 'Harassment', 'Fake content', 'TOS violation', 'Underage'][i % 5],
  bannedBy: 'admin@ledesir.com',
  expires: i % 3 === 0 ? 'Never' : `${30 - i} Jul 2026`,
  status: i < 18 ? 'ACTIVE' : 'EXPIRED',
  created: `${10 - Math.floor(i / 3)} Jun 2026`,
}))

export function CommunityBansPage() {
  const [page, setPage] = React.useState(1)
  const perPage = 15
  const paged = BANS_DATA.slice((page - 1) * perPage, page * perPage)
  const cols = [
    { key: 'user',     label: 'User',      render: (r: any) => <span className="text-foreground">{r.user}</span> },
    { key: 'type',     label: 'Ban Type',  render: (r: any) => <AdminStatusBadge status={r.type === 'PERMANENT' ? 'REMOVED' : 'REVIEW'} /> },
    { key: 'reason',   label: 'Reason' },
    { key: 'bannedBy', label: 'By' },
    { key: 'expires',  label: 'Expires' },
    { key: 'status',   label: 'Status',    render: (r: any) => <AdminStatusBadge status={r.status} /> },
    { key: 'created',  label: 'Date' },
  ]
  return (
    <div>
      <AdminPageHeader title="User Bans" description="Manage banned users and restrictions"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Community', href: '/admin/community' }, { label: 'Bans' }]}
        actions={<AdminBtn variant="danger" size="sm">+ Issue Ban</AdminBtn>}
      />
      <AdminCard padding={false}>
        <DataTable columns={cols} data={paged}
          actions={r => (
            <button className="text-[9px] px-2 py-1 border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10">Unban</button>
          )}
        />
        <Pagination page={page} total={BANS_DATA.length} perPage={perPage} onChange={setPage} />
      </AdminCard>
    </div>
  )
}
