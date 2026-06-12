// ─── MARKETPLACE ADMIN PAGE FACTORY ─────────────────────
// All marketplace admin pages share the same table pattern.
// Replace placeholder data with real DB queries in Phase 5.

'use client'
import * as React from 'react'
import Link from 'next/link'
import { Plus, Download, Package, Tag, Star, Percent, Truck, RotateCcw } from 'lucide-react'
import { AdminPageHeader, AdminCard, AdminBtn, AdminSearchBar, DataTable, AdminStatusBadge, Pagination, FilterBar, StatCard, FormField, AdminInput, AdminSelect, AdminTextarea } from '@/components/admin/shared'

// ─── Products ─────────────────────────────────────────────
const PRODUCTS_DATA = Array.from({ length: 40 }, (_, i) => ({
  id: `P-${1000+i}`, sku: `LD-SKU-${1000+i}`,
  name: `Premium Product #${i+1}`,
  category: ['Lingerie','Fragrances','Wellness','Couples','Lifestyle','Gifts','Dolls'][i%7],
  brand: ['SVAKOM','LELO','Lovense','Wevibe','Satisfyer'][i%5],
  price: `€${(39.99+i*15).toFixed(2)}`, stock: Math.floor(Math.random()*80+5),
  status: i<35?'ACTIVE':i<38?'DRAFT':'OUT_OF_STOCK',
  created: `${10-Math.floor(i/5)} Jun 2026`,
}))

export function AdminProductsPage() {
  const [search, setSearch] = React.useState('')
  const [page,   setPage]   = React.useState(1)
  const perPage = 15
  const filtered = PRODUCTS_DATA.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))
  const paged    = filtered.slice((page-1)*perPage, page*perPage)
  const columns = [
    { key:'sku',   label:'SKU', render:(r:any)=><code className="text-[10px] bg-muted px-1">{r.sku}</code> },
    { key:'name',  label:'Product', render:(r:any)=><p className="font-medium text-foreground">{r.name}</p> },
    { key:'category', label:'Category' },
    { key:'brand',    label:'Brand' },
    { key:'price',    label:'Price' },
    { key:'stock',    label:'Stock', render:(r:any)=>(
      <span className={r.stock<10?'text-red-400':r.stock<20?'text-yellow-500':'text-muted-foreground'}>{r.stock}</span>
    )},
    { key:'status', label:'Status', render:(r:any)=><AdminStatusBadge status={r.status} /> },
  ]
  return (
    <div>
      <AdminPageHeader title="Products" description="Manage marketplace products"
        breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Marketplace',href:'/admin/marketplace'},{label:'Products'}]}
        actions={<div className="flex gap-2"><AdminBtn variant="outline" size="sm"><Download size={12}/></AdminBtn><AdminBtn variant="primary" size="sm"><Plus size={12}/> Add Product</AdminBtn></div>}
      />
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          {label:'Total Products',value:PRODUCTS_DATA.length,change:8},
          {label:'Active',value:PRODUCTS_DATA.filter(p=>p.status==='ACTIVE').length,change:12},
          {label:'Low Stock',value:PRODUCTS_DATA.filter(p=>p.stock<10).length,change:-3},
          {label:'Out of Stock',value:PRODUCTS_DATA.filter(p=>p.status==='OUT_OF_STOCK').length,change:2},
        ].map(s=><StatCard key={s.label} {...s} />)}
      </div>
      <AdminCard padding={false}>
        <div className="p-4 border-b border-border"><AdminSearchBar value={search} onChange={setSearch} placeholder="Search products…" className="mb-0" /></div>
        <DataTable columns={columns} data={paged} onEdit={r=>console.log('edit',r.id)} onDelete={r=>console.log('delete',r.id)} />
        <Pagination page={page} total={filtered.length} perPage={perPage} onChange={setPage} />
      </AdminCard>
    </div>
  )
}

// ─── Brands ───────────────────────────────────────────────
const BRANDS_DATA = [
  {id:'b1',name:'SVAKOM',  slug:'svakom',   products:24, status:'ACTIVE', partner:true},
  {id:'b2',name:'LELO',    slug:'lelo',     products:18, status:'ACTIVE', partner:true},
  {id:'b3',name:'Lovense', slug:'lovense',  products:32, status:'ACTIVE', partner:true},
  {id:'b4',name:'Wevibe',  slug:'wevibe',   products:15, status:'ACTIVE', partner:false},
  {id:'b5',name:'Satisfyer',slug:'satisfyer',products:28, status:'ACTIVE', partner:false},
  {id:'b6',name:'Wicked',  slug:'wicked',   products:11, status:'ACTIVE', partner:false},
  {id:'b7',name:'Magic Motion',slug:'magic-motion',products:9,status:'ACTIVE',partner:false},
]

export function AdminBrandsPage() {
  const columns = [
    {key:'name',label:'Brand',render:(r:any)=><span className="font-medium text-foreground">{r.name}</span>},
    {key:'slug',label:'Slug',render:(r:any)=><code className="text-[10px] bg-muted px-1">{r.slug}</code>},
    {key:'products',label:'Products'},
    {key:'partner',label:'Partner',render:(r:any)=>r.partner?<span className="text-yellow-500 text-xs">★ Partner</span>:<span className="text-muted-foreground text-xs">—</span>},
    {key:'status',label:'Status',render:(r:any)=><AdminStatusBadge status={r.status}/>},
  ]
  return (
    <div>
      <AdminPageHeader title="Brands" breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Marketplace'},{label:'Brands'}]}
        actions={<AdminBtn variant="primary" size="sm"><Plus size={12}/> Add Brand</AdminBtn>}
      />
      <AdminCard padding={false}>
        <DataTable columns={columns} data={BRANDS_DATA} onEdit={r=>console.log(r.id)} onDelete={r=>console.log(r.id)} />
      </AdminCard>
    </div>
  )
}

// ─── Inventory ────────────────────────────────────────────
export function AdminInventoryPage() {
  const lowStock = PRODUCTS_DATA.filter(p=>p.stock<20).sort((a,b)=>a.stock-b.stock)
  const columns = [
    {key:'sku',label:'SKU',render:(r:any)=><code className="text-[10px] bg-muted px-1">{r.sku}</code>},
    {key:'name',label:'Product',render:(r:any)=><p className="font-medium text-foreground">{r.name}</p>},
    {key:'category',label:'Category'},
    {key:'stock',label:'Stock',render:(r:any)=>(
      <span className={r.stock<5?'text-red-400 font-medium':r.stock<10?'text-yellow-500':'text-muted-foreground'}>{r.stock}</span>
    )},
    {key:'status',label:'Status',render:(r:any)=><AdminStatusBadge status={r.status}/>},
  ]
  return (
    <div>
      <AdminPageHeader title="Inventory" description="Stock levels and reorder management"
        breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Marketplace'},{label:'Inventory'}]}
        actions={<AdminBtn variant="outline" size="sm"><Download size={12}/> Export</AdminBtn>}
      />
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          {label:'Total SKUs',value:PRODUCTS_DATA.length},
          {label:'Low Stock (<10)',value:PRODUCTS_DATA.filter(p=>p.stock<10).length,change:-5},
          {label:'Out of Stock',value:PRODUCTS_DATA.filter(p=>p.stock===0).length,change:2},
        ].map(s=><StatCard key={s.label} {...s}/>)}
      </div>
      <AdminCard title="Low & Out of Stock" padding={false}>
        <DataTable columns={columns} data={lowStock} onEdit={r=>console.log(r.id)} />
      </AdminCard>
    </div>
  )
}

// ─── Coupons ──────────────────────────────────────────────
const COUPONS_DATA = [
  {id:'c1',code:'WELCOME20',type:'percent',value:'20%',uses:142,maxUses:500,status:'ACTIVE',expires:'31 Dec 2026'},
  {id:'c2',code:'VIP50',    type:'percent',value:'50%',uses:23, maxUses:100,status:'ACTIVE',expires:'31 Dec 2026'},
  {id:'c3',code:'SUMMER15', type:'percent',value:'15%',uses:890,maxUses:null,status:'ACTIVE',expires:'31 Aug 2026'},
  {id:'c4',code:'FREE10',   type:'fixed',  value:'€10',uses:45, maxUses:200, status:'ACTIVE',expires:'30 Jun 2026'},
  {id:'c5',code:'XMAS2025', type:'percent',value:'25%',uses:1240,maxUses:1000,status:'EXPIRED',expires:'31 Dec 2025'},
]

export function AdminCouponsPage() {
  const columns = [
    {key:'code',label:'Code',render:(r:any)=><code className="font-mono font-medium text-foreground border border-border px-2 py-0.5 text-xs">{r.code}</code>},
    {key:'type',label:'Type',render:(r:any)=><span className="capitalize">{r.type}</span>},
    {key:'value',label:'Discount'},
    {key:'uses',label:'Uses',render:(r:any)=><span>{r.uses}{r.maxUses?` / ${r.maxUses}`:' / ∞'}</span>},
    {key:'status',label:'Status',render:(r:any)=><AdminStatusBadge status={r.status}/>},
    {key:'expires',label:'Expires'},
  ]
  return (
    <div>
      <AdminPageHeader title="Coupons" description="Discount codes and promotional offers"
        breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Marketplace'},{label:'Coupons'}]}
        actions={<AdminBtn variant="primary" size="sm"><Plus size={12}/> Create Coupon</AdminBtn>}
      />
      <AdminCard padding={false}>
        <DataTable columns={columns} data={COUPONS_DATA} onEdit={r=>console.log(r.id)} onDelete={r=>console.log(r.id)} />
      </AdminCard>
    </div>
  )
}

// ─── Shipping ─────────────────────────────────────────────
const ZONES = [
  {id:'z1',name:'Europe',countries:'All EU',standard:'€8.99',express:'€14.99',free:'€100+',status:'ACTIVE'},
  {id:'z2',name:'UK',countries:'United Kingdom',standard:'€11.99',express:'€19.99',free:'€120+',status:'ACTIVE'},
  {id:'z3',name:'Asia',countries:'JP, KR, TH, VN',standard:'€14.99',express:'€24.99',free:'€150+',status:'ACTIVE'},
  {id:'z4',name:'North America',countries:'US, CA',standard:'€18.99',express:'€29.99',free:'€180+',status:'ACTIVE'},
]

export function AdminShippingPage() {
  const columns = [
    {key:'name',label:'Zone',render:(r:any)=><span className="font-medium text-foreground">{r.name}</span>},
    {key:'countries',label:'Countries'},
    {key:'standard',label:'Standard'},
    {key:'express',label:'Express'},
    {key:'free',label:'Free Threshold'},
    {key:'status',label:'Status',render:(r:any)=><AdminStatusBadge status={r.status}/>},
  ]
  return (
    <div>
      <AdminPageHeader title="Shipping Settings" description="Manage shipping zones and rates"
        breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Marketplace'},{label:'Shipping'}]}
        actions={<AdminBtn variant="primary" size="sm"><Plus size={12}/> Add Zone</AdminBtn>}
      />
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[{label:'Active Zones',value:'4'},{label:'Countries Covered',value:'32+'},{label:'Avg Delivery',value:'4.2 days'}]
          .map(s=><StatCard key={s.label} {...s}/>)}
      </div>
      <AdminCard padding={false}>
        <DataTable columns={columns} data={ZONES} onEdit={r=>console.log(r.id)} />
      </AdminCard>
    </div>
  )
}

// ─── Refunds ──────────────────────────────────────────────
const REFUND_DATA = Array.from({ length: 12 }, (_, i) => ({
  id: `R-${200+i}`, order: `LD-20264${i}`, user: `user${i+1}@example.com`,
  amount: `€${(29+i*20).toFixed(2)}`, reason: ['Wrong size','Damaged','Not as described','Other'][i%4],
  status: i<5?'PENDING':i<9?'APPROVED':'REFUNDED', date: `${10-i} Jun 2026`,
}))

export function AdminRefundsPage() {
  const columns = [
    {key:'id',label:'Ref#',render:(r:any)=><code className="text-[10px] bg-muted px-1">{r.id}</code>},
    {key:'order',label:'Order',render:(r:any)=><span className="font-medium text-foreground">{r.order}</span>},
    {key:'user',label:'Customer'},
    {key:'amount',label:'Amount',render:(r:any)=><span className="font-medium">{r.amount}</span>},
    {key:'reason',label:'Reason'},
    {key:'status',label:'Status',render:(r:any)=><AdminStatusBadge status={r.status}/>},
    {key:'date',label:'Date'},
  ]
  return (
    <div>
      <AdminPageHeader title="Refund Requests" description="Manage customer refund requests"
        breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Marketplace'},{label:'Refunds'}]}
      />
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          {label:'Pending',value:REFUND_DATA.filter(r=>r.status==='PENDING').length,change:5},
          {label:'Approved',value:REFUND_DATA.filter(r=>r.status==='APPROVED').length},
          {label:'Total Refunded',value:`€${REFUND_DATA.filter(r=>r.status==='REFUNDED').reduce((_,r)=>_+parseFloat(r.amount.replace('€','')),0).toFixed(2)}`},
        ].map(s=><StatCard key={s.label} {...s}/>)}
      </div>
      <AdminCard padding={false}>
        <DataTable
          columns={columns} data={REFUND_DATA}
          actions={r=>(
            <div className="flex gap-1">
              <button className="text-[9px] px-2 py-1 border border-green-500/30 text-green-500 hover:bg-green-500/10">Approve</button>
              <button className="text-[9px] px-2 py-1 border border-red-500/30 text-red-400 hover:bg-red-500/10">Deny</button>
            </div>
          )}
        />
      </AdminCard>
    </div>
  )
}
