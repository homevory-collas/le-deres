'use client'
import { AdminPageHeader, AdminCard, DataTable, AdminStatusBadge } from '@/components/admin/shared'
const CATS = [
  {id:'sc1',slug:'marketplace',label:'Marketplace & Orders',count:142,sla:'24h',status:'ACTIVE'},
  {id:'sc2',slug:'refunds',    label:'Refunds & Returns',   count:38, sla:'48h',status:'ACTIVE'},
  {id:'sc3',slug:'membership', label:'Membership',          count:84, sla:'12h',status:'ACTIVE'},
  {id:'sc4',slug:'community',  label:'Community',           count:56, sla:'24h',status:'ACTIVE'},
  {id:'sc5',slug:'technical',  label:'Technical Issues',    count:91, sla:'4h', status:'ACTIVE'},
  {id:'sc6',slug:'account',    label:'Account & Privacy',   count:47, sla:'6h', status:'ACTIVE'},
]
export default function AdminSupportCategoriesPage() {
  const cols = [
    {key:'label',label:'Category',render:(r:any)=><span className="font-medium text-foreground">{r.label}</span>},
    {key:'slug',label:'Slug',render:(r:any)=><code className="text-[10px] bg-muted px-1">{r.slug}</code>},
    {key:'count',label:'Open Tickets'},
    {key:'sla',label:'SLA Target',render:(r:any)=><span className="text-foreground">{r.sla}</span>},
    {key:'status',label:'Status',render:(r:any)=><AdminStatusBadge status={r.status}/>},
  ]
  return (
    <div>
      <AdminPageHeader title="Support Categories" breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Support',href:'/admin/support'},{label:'Categories'}]}/>
      <AdminCard padding={false}><DataTable columns={cols} data={CATS} onEdit={r=>console.log(r.id)}/></AdminCard>
    </div>
  )
}
