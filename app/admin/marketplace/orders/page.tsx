'use client'
import * as React from 'react'
import { Download } from 'lucide-react'
import { AdminPageHeader, AdminCard, AdminBtn, AdminSearchBar, DataTable, AdminStatusBadge, Pagination, FilterBar, StatCard } from '@/components/admin/shared'

const ORDERS = Array.from({ length: 40 }, (_, i) => ({
  id: `LD-20264${i}`, user: `user${i+1}@example.com`,
  total: `€${(49+i*35).toFixed(2)}`, items: (i%4)+1,
  payment: ['PayPal','USDT','Visa','Mastercard'][i%4],
  status: ['DELIVERED','SHIPPED','PROCESSING','PENDING','CONFIRMED'][i%5],
  date: `${10-Math.floor(i/4)} Jun 2026`,
}))

export default function AdminOrdersPage() {
  const [search, setSearch] = React.useState('')
  const [filters, setFilters] = React.useState<Record<string,string>>({})
  const [page, setPage] = React.useState(1)
  const perPage = 15
  const filtered = ORDERS.filter(o=>{
    if (search && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.user.toLowerCase().includes(search.toLowerCase())) return false
    if (filters.status && o.status !== filters.status) return false
    if (filters.payment && o.payment !== filters.payment) return false
    return true
  })
  const paged = filtered.slice((page-1)*perPage, page*perPage)
  const columns = [
    {key:'id',label:'Order ID',render:(r:any)=><span className="font-medium text-foreground">{r.id}</span>},
    {key:'user',label:'Customer'},
    {key:'total',label:'Total',render:(r:any)=><span className="font-medium">{r.total}</span>},
    {key:'items',label:'Items'},
    {key:'payment',label:'Payment'},
    {key:'status',label:'Status',render:(r:any)=><AdminStatusBadge status={r.status}/>},
    {key:'date',label:'Date'},
  ]
  return (
    <div>
      <AdminPageHeader title="Orders" description="All marketplace orders"
        breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Marketplace'},{label:'Orders'}]}
        actions={<AdminBtn variant="outline" size="sm"><Download size={12}/> Export</AdminBtn>}
      />
      <div className="grid grid-cols-5 gap-3 mb-5">
        {[
          {label:'Total',value:ORDERS.length},
          {label:'Pending',value:ORDERS.filter(o=>o.status==='PENDING').length,change:8},
          {label:'Processing',value:ORDERS.filter(o=>o.status==='PROCESSING').length},
          {label:'Shipped',value:ORDERS.filter(o=>o.status==='SHIPPED').length},
          {label:'Delivered',value:ORDERS.filter(o=>o.status==='DELIVERED').length,change:12},
        ].map(s=><StatCard key={s.label} {...s}/>)}
      </div>
      <AdminCard padding={false}>
        <div className="flex items-center gap-4 p-4 border-b border-border">
          <AdminSearchBar value={search} onChange={setSearch} placeholder="Search orders…" className="mb-0 flex-1 max-w-xs"/>
          <FilterBar
            filters={[
              {key:'status',label:'All Status',options:[{value:'PENDING',label:'Pending'},{value:'PROCESSING',label:'Processing'},{value:'SHIPPED',label:'Shipped'},{value:'DELIVERED',label:'Delivered'}]},
              {key:'payment',label:'All Payments',options:[{value:'PayPal',label:'PayPal'},{value:'USDT',label:'USDT'},{value:'Visa',label:'Visa'},{value:'Mastercard',label:'Mastercard'}]},
            ]}
            values={filters} onChange={(k,v)=>setFilters(f=>({...f,[k]:v}))}
          />
        </div>
        <DataTable columns={columns} data={paged} onView={r=>console.log('view',r.id)} onEdit={r=>console.log('edit',r.id)}/>
        <Pagination page={page} total={filtered.length} perPage={perPage} onChange={setPage}/>
      </AdminCard>
    </div>
  )
}
