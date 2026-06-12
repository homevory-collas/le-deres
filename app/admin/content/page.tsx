'use client'
import * as React from 'react'
import Link from 'next/link'
import { Plus, Download } from 'lucide-react'
import { AdminPageHeader, AdminCard, AdminBtn, AdminSearchBar, DataTable, AdminStatusBadge, Pagination, FilterBar } from '@/components/admin/shared'
import { CONTENT_CATEGORIES } from '@/components/admin/cms/ContentEditor'

const ITEMS = Array.from({ length: 40 }, (_, i) => ({
  id: `c-${i}`, title: `Content #${i+1} — ${CONTENT_CATEGORIES[i%14].label}`,
  category: CONTENT_CATEGORIES[i%14].label,
  type: ['video','image','live','ai_video','ai_girlfriend'][i%5],
  status: ['PUBLISHED','DRAFT','REVIEW','PUBLISHED','PUBLISHED'][i%5],
  tier: ['FREE','SILVER','GOLD','BLACK_VIP'][i%4],
  views: `${Math.floor(Math.random()*80000+500).toLocaleString()}`,
  featured: i%7===0, created: `${10-Math.floor(i/5)} Jun 2026`,
}))

export default function AdminContentPage() {
  const [search, setSearch] = React.useState('')
  const [filters, setFilters] = React.useState<Record<string,string>>({})
  const [page, setPage] = React.useState(1)
  const perPage = 15
  const filtered = ITEMS.filter(item => {
    if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false
    if (filters.status && item.status !== filters.status) return false
    if (filters.type && item.type !== filters.type) return false
    return true
  })
  const paged = filtered.slice((page-1)*perPage, page*perPage)
  const columns = [
    { key:'title', label:'Title', render:(r:any)=><div><p className="font-medium text-foreground line-clamp-1">{r.title}</p><p className="text-[10px] text-muted-foreground">{r.category}</p></div> },
    { key:'type', label:'Type', render:(r:any)=><span className="capitalize">{r.type.replace('_',' ')}</span> },
    { key:'status', label:'Status', render:(r:any)=><AdminStatusBadge status={r.status} /> },
    { key:'tier', label:'Access', render:(r:any)=><AdminStatusBadge status={r.tier} /> },
    { key:'views', label:'Views' },
    { key:'featured', label:'Featured', render:(r:any)=>r.featured?<span className="text-yellow-500 text-xs">★</span>:<span className="text-muted-foreground text-xs">—</span> },
    { key:'created', label:'Created' },
  ]
  return (
    <div>
      <AdminPageHeader title="Content Library" description="Manage all adult ecosystem content"
        breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Content'}]}
        actions={<div className="flex gap-2"><AdminBtn variant="outline" size="sm"><Download size={12}/> Export</AdminBtn><Link href="/admin/content/new"><AdminBtn variant="primary" size="sm"><Plus size={12}/> Add</AdminBtn></Link></div>}
      />
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          {label:'Total',value:ITEMS.length,color:''},
          {label:'Published',value:ITEMS.filter(c=>c.status==='PUBLISHED').length,color:'text-green-500'},
          {label:'Draft',value:ITEMS.filter(c=>c.status==='DRAFT').length,color:'text-yellow-500'},
          {label:'Review',value:ITEMS.filter(c=>c.status==='REVIEW').length,color:'text-blue-400'},
        ].map(s=>(
          <div key={s.label} className="border border-border p-3 text-center">
            <p className={`text-2xl font-light ${s.color}`}>{s.value}</p>
            <p className="text-[9px] tracking-widest uppercase text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <AdminCard padding={false}>
        <div className="flex items-center gap-4 p-4 border-b border-border">
          <AdminSearchBar value={search} onChange={setSearch} placeholder="Search content…" className="mb-0 flex-1 max-w-sm" />
          <FilterBar
            filters={[
              {key:'status',label:'All Status',options:[{value:'PUBLISHED',label:'Published'},{value:'DRAFT',label:'Draft'},{value:'REVIEW',label:'Review'}]},
              {key:'type',label:'All Types',options:[{value:'video',label:'Video'},{value:'image',label:'Image'},{value:'live',label:'Live'},{value:'ai_video',label:'AI Video'}]},
            ]}
            values={filters} onChange={(k,v)=>setFilters(f=>({...f,[k]:v}))}
          />
        </div>
        <DataTable columns={columns} data={paged} onEdit={r=>console.log('edit',r.id)} onDelete={r=>console.log('delete',r.id)} onView={r=>console.log('view',r.id)} />
        <Pagination page={page} total={filtered.length} perPage={perPage} onChange={setPage} />
      </AdminCard>
    </div>
  )
}