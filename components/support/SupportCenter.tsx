// Support center components — public + admin

'use client'
import * as React from 'react'
import Link from 'next/link'
import { HelpCircle, MessageSquare, Package, RotateCcw, AlertTriangle, ChevronRight, Clock, CheckCircle, Plus, Send } from 'lucide-react'
import { PageHero } from '@/components/common'
import { AdminPageHeader, AdminCard, AdminBtn, DataTable, AdminStatusBadge, Pagination, StatCard, FilterBar, FormField, AdminInput, AdminTextarea, AdminSelect } from '@/components/admin/shared'
import { cn } from '@/lib/utils'

// ─── Public Support Landing ───────────────────────────────
export function SupportLandingPage() {
  const TOPICS = [
    { icon: Package,       label: 'Marketplace & Orders',  desc: 'Shipping, returns, products',     href: '/support/tickets?topic=marketplace' },
    { icon: RotateCcw,     label: 'Refunds & Returns',     desc: 'Return policy, refund status',    href: '/support/tickets?topic=refunds' },
    { icon: HelpCircle,    label: 'Membership',            desc: 'Plans, billing, upgrades',        href: '/support/tickets?topic=membership' },
    { icon: MessageSquare, label: 'Community',             desc: 'Groups, posts, messages',         href: '/support/tickets?topic=community' },
    { icon: AlertTriangle, label: 'Technical Issues',      desc: 'App problems, bugs, errors',      href: '/support/tickets?topic=technical' },
    { icon: MessageSquare, label: 'Account & Privacy',     desc: 'Login, settings, data',           href: '/support/tickets?topic=account' },
  ]
  return (
    <>
      <PageHero subtitle="Support" title="How can we help?" description="Browse common topics or submit a support ticket. We typically respond within 24 hours." />
      <section className="section-padding border-b border-border">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {TOPICS.map(({ icon: Icon, label, desc, href }) => (
              <Link key={href} href={href} className="group flex items-start gap-4 border border-border p-5 hover:border-foreground/40 transition-colors">
                <Icon size={20} className="text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-foreground transition-colors" />
                <div>
                  <p className="font-medium text-sm mb-1">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <ChevronRight size={14} className="text-muted-foreground ml-auto mt-0.5 group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/support/tickets">
              <AdminBtn variant="primary" size="lg"><Plus size={14} /> Submit a Ticket</AdminBtn>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── Public Ticket Submit ─────────────────────────────────
export function SupportTicketsPage() {
  const [submitted, setSubmitted] = React.useState(false)
  const [form, setForm]           = React.useState({ category: '', subject: '', message: '', email: '' })

  if (submitted) {
    return (
      <div className="container-narrow section-padding text-center">
        <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-serif font-light mb-2">Ticket Submitted</h2>
        <p className="text-muted-foreground mb-6">We'll respond within 24 hours. Check your email for updates.</p>
        <Link href="/" className="text-xs tracking-widest uppercase border border-border px-6 py-2 hover:border-foreground transition-colors">Back to Home</Link>
      </div>
    )
  }

  return (
    <>
      <PageHero subtitle="Support" title="Submit a Ticket" description="Describe your issue and we'll get back to you as soon as possible." />
      <section className="section-padding">
        <div className="container-narrow max-w-lg">
          <div className="space-y-5">
            <FormField label="Email">
              <AdminInput type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="your@email.com" />
            </FormField>
            <FormField label="Category" required>
              <AdminSelect
                value={form.category}
                onChange={e => setForm(f => ({...f, category: e.target.value}))}
                options={[
                  {value:'marketplace',label:'Marketplace & Orders'},
                  {value:'refunds',label:'Refunds & Returns'},
                  {value:'membership',label:'Membership'},
                  {value:'community',label:'Community'},
                  {value:'technical',label:'Technical Issue'},
                  {value:'account',label:'Account & Privacy'},
                ]}
                placeholder="Select a topic…"
              />
            </FormField>
            <FormField label="Subject" required>
              <AdminInput value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))} placeholder="Brief description of your issue" />
            </FormField>
            <FormField label="Message" required>
              <AdminTextarea value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} rows={6} placeholder="Please describe your issue in detail…" />
            </FormField>
            <AdminBtn variant="primary" size="lg" className="w-full" onClick={() => setSubmitted(true)}>
              <Send size={13} /> Submit Ticket
            </AdminBtn>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── Admin Support Dashboard ──────────────────────────────
const TICKETS_DATA = Array.from({ length: 40 }, (_, i) => ({
  id: `TKT-${1800 + i}`,
  email: `user${i + 1}@example.com`,
  subject: ['Order not received', 'Refund request', 'Account locked', 'Content issue', 'Billing problem'][i % 5],
  category: ['marketplace', 'refunds', 'account', 'technical', 'membership'][i % 5],
  priority: i < 8 ? 'HIGH' : i < 20 ? 'MEDIUM' : 'LOW',
  status: i < 12 ? 'OPEN' : i < 22 ? 'IN_PROGRESS' : i < 35 ? 'RESOLVED' : 'CLOSED',
  assignee: i < 25 ? 'support@ledesir.com' : '—',
  created: `${10 - Math.floor(i / 5)} Jun 2026`,
  updated: `${10 - Math.floor(i / 8)} Jun 2026`,
}))

export function AdminSupportPage() {
  const open    = TICKETS_DATA.filter(t => t.status === 'OPEN').length
  const inProg  = TICKETS_DATA.filter(t => t.status === 'IN_PROGRESS').length
  const resolved= TICKETS_DATA.filter(t => t.status === 'RESOLVED').length

  return (
    <div>
      <AdminPageHeader title="Support Center" description="Customer support ticket management"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Support' }]}
      />
      <div className="grid grid-cols-4 gap-3 mb-5">
        <StatCard label="Open"        value={open}     change={-8}  />
        <StatCard label="In Progress" value={inProg}   change={5}   />
        <StatCard label="Resolved"    value={resolved} change={12}  />
        <StatCard label="Avg Response"value="4.2h"     change={-15} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: 'All Tickets',  href: '/admin/support/tickets',    desc: 'View and manage all tickets', count: TICKETS_DATA.length },
          { label: 'Categories',   href: '/admin/support/categories', desc: 'Ticket category management', count: 6 },
          { label: 'High Priority',href: '/admin/support/tickets',    desc: `${TICKETS_DATA.filter(t=>t.priority==='HIGH').length} tickets needing urgent attention`, count: 8 },
        ].map(s => (
          <Link key={s.href+s.label} href={s.href} className="block border border-border p-5 hover:border-foreground/40 transition-colors group">
            <p className="font-medium text-sm mb-1">{s.label}</p>
            <p className="text-xs text-muted-foreground mb-2">{s.desc}</p>
            <p className="text-2xl font-light">{s.count}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function AdminSupportTicketsPage() {
  const [page, setPage]       = React.useState(1)
  const [filters, setFilters] = React.useState<Record<string,string>>({})
  const perPage = 15
  const filtered = TICKETS_DATA.filter(t => {
    if (filters.status   && t.status   !== filters.status)   return false
    if (filters.priority && t.priority !== filters.priority) return false
    if (filters.category && t.category !== filters.category) return false
    return true
  })
  const paged = filtered.slice((page - 1) * perPage, page * perPage)
  const cols = [
    {key:'id',      label:'Ticket',   render:(r:any)=><code className="font-medium text-foreground text-[10px] bg-muted px-1">{r.id}</code>},
    {key:'subject', label:'Subject',  render:(r:any)=><p className="text-xs text-foreground line-clamp-1">{r.subject}</p>},
    {key:'email',   label:'User' },
    {key:'category',label:'Category', render:(r:any)=><span className="capitalize">{r.category}</span>},
    {key:'priority',label:'Priority', render:(r:any)=><AdminStatusBadge status={r.priority}/>},
    {key:'status',  label:'Status',   render:(r:any)=><AdminStatusBadge status={r.status}/>},
    {key:'assignee',label:'Assigned'},
    {key:'updated', label:'Updated'},
  ]
  return (
    <div>
      <AdminPageHeader title="Support Tickets" breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Support',href:'/admin/support'},{label:'Tickets'}]}/>
      <AdminCard padding={false}>
        <div className="p-4 border-b border-border">
          <FilterBar
            filters={[
              {key:'status',label:'All Status',options:[{value:'OPEN',label:'Open'},{value:'IN_PROGRESS',label:'In Progress'},{value:'RESOLVED',label:'Resolved'},{value:'CLOSED',label:'Closed'}]},
              {key:'priority',label:'All Priority',options:[{value:'HIGH',label:'High'},{value:'MEDIUM',label:'Medium'},{value:'LOW',label:'Low'}]},
              {key:'category',label:'All Categories',options:[{value:'marketplace',label:'Marketplace'},{value:'refunds',label:'Refunds'},{value:'membership',label:'Membership'},{value:'technical',label:'Technical'}]},
            ]}
            values={filters} onChange={(k,v)=>setFilters(f=>({...f,[k]:v}))}
          />
        </div>
        <DataTable columns={cols} data={paged} onView={r=>console.log(r.id)}
          actions={r=>(
            <div className="flex gap-1">
              <button className="text-[9px] px-2 py-1 border border-blue-500/30 text-blue-400 hover:bg-blue-500/10">Assign</button>
              <button className="text-[9px] px-2 py-1 border border-green-500/30 text-green-500 hover:bg-green-500/10">Resolve</button>
            </div>
          )}
        />
        <Pagination page={page} total={filtered.length} perPage={perPage} onChange={setPage}/>
      </AdminCard>
    </div>
  )
}
