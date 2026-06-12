'use client'

import * as React from 'react'
import Link from 'next/link'
import { Shield, AlertTriangle, FileText, Eye, CheckCircle, XCircle, Clock, Flag } from 'lucide-react'
import {
  AdminPageHeader, AdminCard, AdminBtn, DataTable,
  AdminStatusBadge, StatCard, FormField, AdminInput,
  AdminTextarea, AdminSelect, Pagination,
} from '@/components/admin/shared'

// ─── Compliance Hub ───────────────────────────────────────
export function ComplianceHub() {
  const SECTIONS = [
    { label: 'Age Verification',   href: '/admin/compliance/age-verification', icon: Shield,      count: 24,  desc: 'Pending age verification requests' },
    { label: 'DMCA Requests',      href: '/admin/compliance/dmca',             icon: FileText,    count: 3,   desc: 'Content takedown notices' },
    { label: 'Privacy Requests',   href: '/admin/compliance/privacy',          icon: Eye,         count: 8,   desc: 'Data access and deletion requests' },
    { label: 'Content Reports',    href: '/admin/community/reports',            icon: Flag,        count: 14,  desc: 'User-submitted content reports' },
    { label: 'Terms Management',   href: '/admin/compliance',                   icon: FileText,    count: 0,   desc: 'Manage terms and policies' },
    { label: 'Compliance Audit',   href: '/admin/compliance',                   icon: CheckCircle, count: 0,   desc: 'Platform compliance status' },
  ]
  const stats = [
    { label: 'Pending Verifications', value: '24',  change: -8  },
    { label: 'DMCA Active',           value: '3',   change: -33 },
    { label: 'Privacy Requests',      value: '8',   change: 0   },
    { label: 'Compliance Score',      value: '94%', change: 2   },
  ]
  return (
    <div>
      <AdminPageHeader
        title="Legal & Compliance"
        description="Platform legal compliance management"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Compliance' }]}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTIONS.map(({ label, href, icon: Icon, count, desc }) => (
          <Link key={href + label} href={href} className="block border border-border p-5 hover:border-foreground/40 transition-colors group">
            <div className="flex items-start justify-between mb-3">
              <Icon size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              {count > 0 && (
                <span className="text-[9px] px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20">{count} pending</span>
              )}
            </div>
            <p className="font-medium text-sm mb-1">{label}</p>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ─── Age Verification Queue ───────────────────────────────
const AGE_VERIF_DATA = Array.from({ length: 24 }, (_, i) => ({
  id:       `AV-${500 + i}`,
  userId:   `user${i + 100}@example.com`,
  method:   ['ID Upload', 'Passport', 'Driver License', 'Credit Card'][i % 4],
  submitted:`${10 - Math.floor(i / 4)} Jun 2026`,
  status:   i < 8 ? 'PENDING' : i < 16 ? 'APPROVED' : 'REJECTED',
  country:  ['France', 'Germany', 'UK', 'Spain', 'Italy', 'Japan', 'Korea', 'Vietnam'][i % 8],
}))

export function AgeVerificationQueuePage() {
  const [page, setPage] = React.useState(1)
  const perPage = 15
  const paged = AGE_VERIF_DATA.slice((page - 1) * perPage, page * perPage)
  const cols = [
    { key: 'id',        label: 'Request',   render: (r: any) => <code className="text-[10px] bg-muted px-1">{r.id}</code> },
    { key: 'userId',    label: 'User',      render: (r: any) => <span className="text-foreground">{r.userId}</span> },
    { key: 'method',    label: 'Doc Type' },
    { key: 'country',   label: 'Country' },
    { key: 'submitted', label: 'Submitted' },
    { key: 'status',    label: 'Status',    render: (r: any) => <AdminStatusBadge status={r.status} /> },
  ]
  return (
    <div>
      <AdminPageHeader
        title="Age Verification Queue"
        description="Review and approve user age verification submissions"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Compliance', href: '/admin/compliance' }, { label: 'Age Verification' }]}
      />
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Pending',  value: AGE_VERIF_DATA.filter(a => a.status === 'PENDING').length,  color: 'text-yellow-500' },
          { label: 'Approved', value: AGE_VERIF_DATA.filter(a => a.status === 'APPROVED').length, color: 'text-green-500' },
          { label: 'Rejected', value: AGE_VERIF_DATA.filter(a => a.status === 'REJECTED').length, color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="border border-border p-4 text-center">
            <p className={`text-2xl font-light ${s.color}`}>{s.value}</p>
            <p className="text-[9px] tracking-widest uppercase text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <AdminCard padding={false}>
        <DataTable
          columns={cols}
          data={paged}
          actions={r => (
            <div className="flex gap-1">
              <button className="text-[9px] px-2 py-1 border border-green-500/30 text-green-500 hover:bg-green-500/10">Approve</button>
              <button className="text-[9px] px-2 py-1 border border-red-500/30 text-red-400 hover:bg-red-500/10">Reject</button>
            </div>
          )}
        />
        <Pagination page={page} total={AGE_VERIF_DATA.length} perPage={perPage} onChange={setPage} />
      </AdminCard>
    </div>
  )
}

// ─── DMCA Management ──────────────────────────────────────
const DMCA_DATA = [
  { id:'DMCA-001', claimant:'Rights Holder Inc.', contentId:'content-284', contentType:'video', reason:'Copyright infringement', received:'8 Jun 2026', deadline:'18 Jun 2026', status:'PENDING' },
  { id:'DMCA-002', claimant:'Studio XYZ',          contentId:'content-191', contentType:'image', reason:'Unauthorized use',       received:'5 Jun 2026', deadline:'15 Jun 2026', status:'UNDER_REVIEW' },
  { id:'DMCA-003', claimant:'Creator Agency',      contentId:'content-841', contentType:'video', reason:'Exclusive content theft', received:'2 Jun 2026', deadline:'12 Jun 2026', status:'RESOLVED' },
]

export function DMCAManagementPage() {
  const cols = [
    { key: 'id',          label: 'Claim ID',    render: (r: any) => <code className="text-[10px] bg-muted px-1">{r.id}</code> },
    { key: 'claimant',    label: 'Claimant',    render: (r: any) => <span className="text-foreground">{r.claimant}</span> },
    { key: 'contentId',   label: 'Content' },
    { key: 'contentType', label: 'Type' },
    { key: 'reason',      label: 'Reason' },
    { key: 'received',    label: 'Received' },
    { key: 'deadline',    label: 'Deadline', render: (r: any) => <span className="text-yellow-500">{r.deadline}</span> },
    { key: 'status',      label: 'Status',   render: (r: any) => <AdminStatusBadge status={r.status} /> },
  ]
  return (
    <div>
      <AdminPageHeader
        title="DMCA Management"
        description="Handle copyright takedown notices within legal deadlines"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Compliance', href: '/admin/compliance' }, { label: 'DMCA' }]}
      />
      <AdminCard className="mb-5">
        <div className="flex items-center gap-3 text-sm">
          <AlertTriangle size={16} className="text-yellow-500 flex-shrink-0" />
          <p className="text-muted-foreground">DMCA takedowns must be processed within <strong className="text-foreground">10 business days</strong> of receipt. Counter-notices must be filed within <strong className="text-foreground">14 days</strong>.</p>
        </div>
      </AdminCard>
      <AdminCard padding={false}>
        <DataTable
          columns={cols}
          data={DMCA_DATA}
          actions={r => (
            <div className="flex gap-1">
              <button className="text-[9px] px-2 py-1 border border-yellow-500/30 text-yellow-500">Take Down</button>
              <button className="text-[9px] px-2 py-1 border border-border text-muted-foreground">Counter</button>
            </div>
          )}
        />
      </AdminCard>
    </div>
  )
}

// ─── Privacy Requests ─────────────────────────────────────
const PRIVACY_DATA = Array.from({ length: 12 }, (_, i) => ({
  id:       `PRIV-${200 + i}`,
  userId:   `user${i + 200}@example.com`,
  type:     ['DATA_ACCESS', 'DATA_DELETION', 'DATA_EXPORT', 'CONSENT_WITHDRAWAL'][i % 4],
  received: `${10 - i} Jun 2026`,
  deadline: `${40 - i} Jun 2026`,
  status:   i < 5 ? 'PENDING' : i < 9 ? 'IN_PROGRESS' : 'COMPLETED',
  region:   ['GDPR (EU)', 'CCPA (US)', 'LGPD (BR)', 'PDPA (TH)'][i % 4],
}))

export function PrivacyRequestsPage() {
  const cols = [
    { key: 'id',       label: 'Request',   render: (r: any) => <code className="text-[10px] bg-muted px-1">{r.id}</code> },
    { key: 'userId',   label: 'User',      render: (r: any) => <span className="text-foreground">{r.userId}</span> },
    { key: 'type',     label: 'Type',      render: (r: any) => <span className="text-xs">{r.type.replace(/_/g,' ')}</span> },
    { key: 'region',   label: 'Regulation' },
    { key: 'received', label: 'Received' },
    { key: 'deadline', label: 'Deadline',  render: (r: any) => <span className="text-yellow-500">{r.deadline}</span> },
    { key: 'status',   label: 'Status',    render: (r: any) => <AdminStatusBadge status={r.status} /> },
  ]
  return (
    <div>
      <AdminPageHeader
        title="Privacy Requests"
        description="GDPR, CCPA and global privacy law compliance"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Compliance', href: '/admin/compliance' }, { label: 'Privacy' }]}
      />
      <AdminCard className="mb-5">
        <div className="grid grid-cols-4 gap-4 text-center">
          {[
            { label: 'GDPR (EU)',  deadline: '30 days' },
            { label: 'CCPA (US)', deadline: '45 days' },
            { label: 'LGPD (BR)', deadline: '15 days' },
            { label: 'PDPA (TH)', deadline: '30 days' },
          ].map(r => (
            <div key={r.label}>
              <p className="text-xs font-medium">{r.label}</p>
              <p className="text-[9px] text-muted-foreground">Response: {r.deadline}</p>
            </div>
          ))}
        </div>
      </AdminCard>
      <AdminCard padding={false}>
        <DataTable columns={cols} data={PRIVACY_DATA}
          actions={r => <button className="text-[9px] px-2 py-1 border border-blue-500/30 text-blue-400 hover:bg-blue-500/10">Process</button>}
        />
      </AdminCard>
    </div>
  )
}
