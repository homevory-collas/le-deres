import Link from 'next/link'
import { AdminPageHeader } from '@/components/admin/shared'
import { Star, Gift, Percent, Users, Cake } from 'lucide-react'
const SECTIONS = [
  {label:'VIP Tiers',href:'/admin/membership/vip',icon:Star,desc:'Manage all 9 VIP levels'},
  {label:'Benefits',href:'/admin/membership/benefits',icon:Gift,desc:'Per-tier benefit management'},
  {label:'Discounts',href:'/admin/membership/discounts',icon:Percent,desc:'Discount rules configuration'},
  {label:'Referrals',href:'/admin/membership/referrals',icon:Users,desc:'Referral program settings'},
  {label:'Birthday',href:'/admin/membership/birthday',icon:Cake,desc:'Birthday reward rules'},
]
export default function AdminMembershipOverviewPage() {
  return (
    <div>
      <AdminPageHeader title="Membership CMS" description="Manage all membership tiers and benefits" breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Membership'}]}/>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
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
