'use client'

import * as React from 'react'
import { Package, AlertTriangle, TrendingDown, RefreshCw, Truck, Plus, Edit } from 'lucide-react'
import {
  AdminPageHeader, AdminCard, AdminBtn, DataTable,
  AdminStatusBadge, StatCard, FilterBar, FormField,
  AdminInput, AdminSelect, Pagination,
} from '@/components/admin/shared'
import { SimpleBarChart } from '@/components/admin/analytics/Charts'

// ─── Inventory data ───────────────────────────────────────
const INVENTORY = Array.from({ length: 50 }, (_, i) => ({
  id:       `INV-${1000 + i}`,
  sku:      `LD-SKU-${1000 + i}`,
  name:     `Product ${i + 1}`,
  category: ['Lingerie','Fragrances','Wellness','Couples','Lifestyle'][i % 5],
  current:  Math.floor(Math.random() * 100),
  reserved: Math.floor(Math.random() * 20),
  reorder:  10,
  supplier: [`Supplier A`, `Supplier B`, `Supplier C`][i % 3],
  lastRestock: `${10 - Math.floor(i / 7)} Jun 2026`,
  status:   (i: number) => {
    const stock = Math.floor(Math.random() * 100)
    if (stock === 0)  return 'OUT_OF_STOCK'
    if (stock < 10)   return 'LOW_STOCK'
    return 'IN_STOCK'
  },
})).map(p => ({ ...p, status: p.current === 0 ? 'OUT_OF_STOCK' : p.current < 10 ? 'LOW_STOCK' : 'IN_STOCK' }))

const SUPPLIERS = [
  { id:'s1', name:'Supplier A', contact:'supplier-a@example.com', products:24, leadTime:'7-10 days', status:'ACTIVE' },
  { id:'s2', name:'Supplier B', contact:'supplier-b@example.com', products:18, leadTime:'14-21 days',status:'ACTIVE' },
  { id:'s3', name:'Supplier C', contact:'supplier-c@example.com', products:12, leadTime:'5-7 days',  status:'ACTIVE' },
  { id:'s4', name:'Luxury EU',  contact:'luxury@example.com',     products:8,  leadTime:'3-5 days',  status:'PREFERRED' },
]

// ─── Inventory Management page ────────────────────────────
export function InventoryManagementPage() {
  const [page,    setPage]    = React.useState(1)
  const [filters, setFilters] = React.useState<Record<string, string>>({})
  const perPage = 15

  const filtered = INVENTORY.filter(item => {
    if (filters.status   && item.status   !== filters.status)   return false
    if (filters.category && item.category !== filters.category) return false
    return true
  })
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const outOfStock = INVENTORY.filter(i => i.status === 'OUT_OF_STOCK').length
  const lowStock   = INVENTORY.filter(i => i.status === 'LOW_STOCK').length
  const inStock    = INVENTORY.filter(i => i.status === 'IN_STOCK').length

  const cols = [
    { key: 'sku',      label: 'SKU',      render: (r: any) => <code className="text-[10px] bg-muted px-1">{r.sku}</code> },
    { key: 'name',     label: 'Product',  render: (r: any) => <span className="font-medium text-foreground">{r.name}</span> },
    { key: 'category', label: 'Category' },
    { key: 'current',  label: 'In Stock', render: (r: any) => (
      <span className={r.current === 0 ? 'text-red-400 font-medium' : r.current < 10 ? 'text-yellow-500 font-medium' : 'text-muted-foreground'}>
        {r.current}
      </span>
    )},
    { key: 'reserved', label: 'Reserved', render: (r: any) => <span className="text-muted-foreground">{r.reserved}</span> },
    { key: 'supplier', label: 'Supplier' },
    { key: 'status',   label: 'Status',   render: (r: any) => <AdminStatusBadge status={r.status} /> },
  ]

  return (
    <div>
      <AdminPageHeader
        title="Inventory Management"
        description="Stock levels, reorder points and supplier management"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Inventory' }]}
        actions={
          <div className="flex gap-2">
            <AdminBtn variant="outline" size="sm"><RefreshCw size={12} /> Sync</AdminBtn>
            <AdminBtn variant="primary" size="sm"><Plus size={12} /> Restock Order</AdminBtn>
          </div>
        }
      />

      {/* Alert banner */}
      {(outOfStock > 0 || lowStock > 0) && (
        <div className="mb-5 px-4 py-3 border border-yellow-500/30 bg-yellow-500/5 flex items-center gap-3 text-sm">
          <AlertTriangle size={16} className="text-yellow-500 flex-shrink-0" />
          <span className="text-yellow-600">
            {outOfStock > 0 && <><strong>{outOfStock} products</strong> are out of stock. </>}
            {lowStock   > 0 && <><strong>{lowStock} products</strong> are low on stock.</>}
          </span>
          <AdminBtn variant="outline" size="sm" className="ml-auto">View Alerts</AdminBtn>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="border border-green-500/20 bg-green-500/5 p-4 text-center">
          <p className="text-2xl font-light text-green-500">{inStock}</p>
          <p className="text-[9px] tracking-widest uppercase text-muted-foreground mt-1">In Stock</p>
        </div>
        <div className="border border-yellow-500/20 bg-yellow-500/5 p-4 text-center">
          <p className="text-2xl font-light text-yellow-500">{lowStock}</p>
          <p className="text-[9px] tracking-widest uppercase text-muted-foreground mt-1">Low Stock</p>
        </div>
        <div className="border border-red-500/20 bg-red-500/5 p-4 text-center">
          <p className="text-2xl font-light text-red-400">{outOfStock}</p>
          <p className="text-[9px] tracking-widest uppercase text-muted-foreground mt-1">Out of Stock</p>
        </div>
      </div>

      <AdminCard padding={false}>
        <div className="p-4 border-b border-border">
          <FilterBar
            filters={[
              { key: 'status', label: 'All Status', options: [
                { value: 'IN_STOCK',     label: 'In Stock' },
                { value: 'LOW_STOCK',    label: 'Low Stock' },
                { value: 'OUT_OF_STOCK', label: 'Out of Stock' },
              ]},
              { key: 'category', label: 'All Categories', options: [
                { value: 'Lingerie',    label: 'Lingerie' },
                { value: 'Fragrances', label: 'Fragrances' },
                { value: 'Wellness',   label: 'Wellness' },
                { value: 'Couples',    label: 'Couples' },
              ]},
            ]}
            values={filters}
            onChange={(k, v) => setFilters(f => ({ ...f, [k]: v }))}
          />
        </div>
        <DataTable
          columns={cols}
          data={paged}
          onEdit={r => console.log('edit', r.id)}
          actions={r => (
            <AdminBtn variant="outline" size="sm"><Package size={10} /> Restock</AdminBtn>
          )}
        />
        <Pagination page={page} total={filtered.length} perPage={perPage} onChange={setPage} />
      </AdminCard>

      {/* Suppliers */}
      <AdminCard title="Suppliers" className="mt-5">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SUPPLIERS.map(s => (
            <div key={s.id} className="border border-border p-4">
              <div className="flex items-start justify-between mb-2">
                <p className="font-medium text-sm">{s.name}</p>
                <AdminStatusBadge status={s.status} />
              </div>
              <p className="text-xs text-muted-foreground mb-1">{s.contact}</p>
              <p className="text-xs text-muted-foreground">{s.products} products · {s.leadTime}</p>
              <AdminBtn variant="outline" size="sm" className="mt-3 w-full">Contact</AdminBtn>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  )
}

// ─── Shipping Management ──────────────────────────────────
const SHIPMENTS = Array.from({ length: 30 }, (_, i) => ({
  id:       `SHP-${3000 + i}`,
  orderId:  `LD-20264${i}`,
  customer: `user${i + 1}@example.com`,
  carrier:  ['DHL','FedEx','UPS','Royal Mail'][i % 4],
  tracking: `TRACK${100000 + i}`,
  zone:     ['Europe','UK','Asia','North America'][i % 4],
  status:   ['IN_TRANSIT','DELIVERED','OUT_FOR_DELIVERY','PENDING'][i % 4],
  shipped:  `${10 - Math.floor(i / 4)} Jun 2026`,
  estimated:`${14 - Math.floor(i / 5)} Jun 2026`,
}))

export function ShippingManagementPage() {
  const [page, setPage] = React.useState(1)
  const perPage = 15
  const paged = SHIPMENTS.slice((page - 1) * perPage, page * perPage)

  const cols = [
    { key: 'id',       label: 'Shipment', render: (r: any) => <code className="text-[10px] bg-muted px-1">{r.id}</code> },
    { key: 'orderId',  label: 'Order',    render: (r: any) => <span className="font-medium text-foreground">{r.orderId}</span> },
    { key: 'customer', label: 'Customer' },
    { key: 'carrier',  label: 'Carrier' },
    { key: 'tracking', label: 'Tracking', render: (r: any) => <code className="text-[10px]">{r.tracking}</code> },
    { key: 'zone',     label: 'Zone' },
    { key: 'status',   label: 'Status',   render: (r: any) => <AdminStatusBadge status={r.status} /> },
    { key: 'estimated',label: 'Est. Delivery' },
  ]

  return (
    <div>
      <AdminPageHeader
        title="Shipping Management"
        description="Track all outbound shipments"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Shipping' }]}
        actions={<AdminBtn variant="outline" size="sm"><Truck size={12} /> Bulk Update</AdminBtn>}
      />
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'In Transit',       value: SHIPMENTS.filter(s => s.status === 'IN_TRANSIT').length },
          { label: 'Out for Delivery', value: SHIPMENTS.filter(s => s.status === 'OUT_FOR_DELIVERY').length },
          { label: 'Delivered',        value: SHIPMENTS.filter(s => s.status === 'DELIVERED').length },
          { label: 'Pending',          value: SHIPMENTS.filter(s => s.status === 'PENDING').length },
        ].map(s => <StatCard key={s.label} {...s} />)}
      </div>
      <AdminCard padding={false}>
        <DataTable columns={cols} data={paged} onView={r => console.log(r.id)} />
        <Pagination page={page} total={SHIPMENTS.length} perPage={perPage} onChange={setPage} />
      </AdminCard>
    </div>
  )
}
