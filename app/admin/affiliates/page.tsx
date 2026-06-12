'use client'
import { AdminPageHeader, AdminCard, DataTable, AdminStatusBadge, StatCard } from '@/components/admin/shared'
const DATA = Array.from({length:20},(_, i)=>({
  id:`aff-${i}`, name:`Affiliate ${i+1}`, email:`affiliate${i+1}@example.com`,
  tier:['STARTER','PARTNER','ELITE'][i%3], referrals:Math.floor(Math.random()*200+5),
  totalEarned:`€${(200+i*180).toFixed(2)}`, status:i<18?'ACTIVE':'SUSPENDED',
}))
export default function AdminAffiliatesPage() {
  const cols = [
    {key:'name',label:'Affiliate',render:(r:any)=><span className="font-medium text-foreground">{r.name}</span>},
    {key:'email',label:'Email'},{key:'tier',label:'Tier',render:(r:any)=><AdminStatusBadge status={r.tier}/>},
    {key:'referrals',label:'Referrals'},{key:'totalEarned',label:'Earned',render:(r:any)=><span className="text-green-500">{r.totalEarned}</span>},
    {key:'status',label:'Status',render:(r:any)=><AdminStatusBadge status={r.status}/>},
  ]
  return (
    <div>
      <AdminPageHeader title="Affiliates" breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Affiliates'}]}/>
      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatCard label="Active Affiliates" value="284" change={12}/>
        <StatCard label="Total Revenue" value="€284,920" change={22}/>
        <StatCard label="Avg Commission" value="€184" change={8}/>
      </div>
      <AdminCard padding={false}><DataTable columns={cols} data={DATA} onEdit={r=>console.log(r.id)}/></AdminCard>
    </div>
  )
}
