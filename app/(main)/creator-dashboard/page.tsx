'use client'
import * as React from 'react'
import Link from 'next/link'
import { Users, DollarSign, Eye, TrendingUp, Upload, MessageSquare } from 'lucide-react'
import { Tabs } from '@/components/ui'
import { AdminCard } from '@/components/admin/shared'
import { SimpleBarChart, MiniMetric } from '@/components/admin/analytics/Charts'

const STATS = [
  {label:'Subscribers',value:'12,840',change:8},
  {label:'Monthly Revenue',value:'€4,280',change:22},
  {label:'Total Views',value:'2.4M',change:15},
  {label:'New Fans',value:'284',change:31},
]
const REVENUE_CHART = [{label:'Jan',value:2800},{label:'Feb',value:3200},{label:'Mar',value:3100},{label:'Apr',value:3600},{label:'May',value:3900},{label:'Jun',value:4280}]

const NAV = [
  {label:'Overview',href:'/creator-dashboard'},
  {label:'Content',href:'/creator-dashboard/content'},
  {label:'Analytics',href:'/creator-dashboard/analytics'},
  {label:'Revenue',href:'/creator-dashboard/revenue'},
  {label:'Subscribers',href:'/creator-dashboard/subscribers'},
]

export default function CreatorDashboardPage() {
  return (
    <div className="container-wide section-padding">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Creator Dashboard</p>
          <h1 className="text-2xl font-serif font-light">Élise Moreau</h1>
        </div>
        <Link href="/adult-ecosystem/influencer" className="inline-flex items-center gap-2 px-6 py-2.5 border border-border text-xs tracking-widest uppercase hover:border-foreground transition-colors">
          <Eye size={12}/> View Profile
        </Link>
      </div>
      <nav className="flex gap-4 border-b border-border mb-8">
        {NAV.map(n=>(
          <Link key={n.href} href={n.href} className="pb-3 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-foreground transition-colors">
            {n.label}
          </Link>
        ))}
      </nav>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {STATS.map(s=>(
          <div key={s.label} className="border border-border p-5">
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-2">{s.label}</p>
            <p className="text-2xl font-light">{s.value}</p>
            <p className="text-xs text-green-500 mt-1">+{s.change}%</p>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-[1fr_280px] gap-4">
        <AdminCard title="Revenue This Year">
          <SimpleBarChart data={REVENUE_CHART} height={120} color="#D4AF37"/>
        </AdminCard>
        <AdminCard title="Quick Actions">
          <div className="space-y-2">
            {[
              {label:'Upload Content',href:'/creator-dashboard/content',icon:Upload},
              {label:'View Analytics',href:'/creator-dashboard/analytics',icon:TrendingUp},
              {label:'Messages',href:'/messages',icon:MessageSquare},
              {label:'Subscribers',href:'/creator-dashboard/subscribers',icon:Users},
            ].map(({label,href,icon:Icon})=>(
              <Link key={href} href={href} className="flex items-center gap-3 px-3 py-2.5 border border-border hover:border-foreground transition-colors text-xs">
                <Icon size={13} className="text-muted-foreground"/> {label}
              </Link>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  )
}
