import Link from 'next/link'
import { Package, Tag, Star, Percent, Truck, RotateCcw, ShoppingBag } from 'lucide-react'
import { AdminPageHeader, AdminCard } from '@/components/admin/shared'

const SECTIONS = [
  {label:'Products',href:'/admin/marketplace/products',icon:Package,desc:'Manage all marketplace products'},
  {label:'Categories',href:'/admin/marketplace/categories',icon:Tag,desc:'Product category management'},
  {label:'Brands',href:'/admin/marketplace/brands',icon:Star,desc:'Brand and partner management'},
  {label:'Inventory',href:'/admin/marketplace/inventory',icon:Package,desc:'Stock levels and reorders'},
  {label:'Coupons',href:'/admin/marketplace/coupons',icon:Percent,desc:'Discount codes and promos'},
  {label:'Orders',href:'/admin/marketplace/orders',icon:ShoppingBag,desc:'All customer orders'},
  {label:'Refunds',href:'/admin/marketplace/refunds',icon:RotateCcw,desc:'Refund and return requests'},
  {label:'Shipping',href:'/admin/marketplace/shipping',icon:Truck,desc:'Zones and shipping rates'},
]

export default function AdminMarketplacePage() {
  return (
    <div>
      <AdminPageHeader title="Marketplace CMS" description="Manage all marketplace operations" breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Marketplace'}]}/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SECTIONS.map(s=>{const Icon=s.icon;return(
          <Link key={s.href} href={s.href} className="block border border-border p-5 hover:border-foreground/40 transition-colors group">
            <Icon size={20} className="text-muted-foreground mb-3 group-hover:text-foreground transition-colors"/>
            <p className="font-medium text-sm mb-1">{s.label}</p>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
          </Link>
        )})}
      </div>
    </div>
  )
}
