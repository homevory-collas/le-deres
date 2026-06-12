'use client'
import { AdminPageHeader, AdminCard, DataTable, AdminStatusBadge, StatCard } from '@/components/admin/shared'
const DATA = Array.from({length:30},(_, i)=>({
  id:`ref-${i}`, referrer:`user${i+1}@ledesir.com`, referred:`new${i+100}@example.com`,
  tier:['SILVER','GOLD','BLACK_VIP'][i%3], commission:`€${(12+i*8).toFixed(2)}`,
  status:i<25?'PAID':'PENDING', date:`${10-Math.floor(i/4)} Jun 2026`,
}))
export default function AdminReferralsPage() {
  const cols = [
    {key:'id',label:'ID',render:(r:any)=><code className="text-[10px] bg-muted px-1">{r.id}</code>},
    {key:'referrer',label:'Referrer',render:(r:any)=><span className="text-foreground">{r.referrer}</span>},
    {key:'referred',label:'Referred'},{key:'tier',label:'Plan',render:(r:any)=><AdminStatusBadge status={r.tier}/>},
    {key:'commission',label:'Commission',render:(r:any)=><span className="text-green-500 font-medium">{r.commission}</span>},
    {key:'status',label:'Status',render:(r:any)=><AdminStatusBadge status={r.status}/>},{key:'date',label:'Date'},
  ]
  return (
    <div>
      <AdminPageHeader title="Referrals" breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Referrals'}]}/>
      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatCard label="Total Referrals" value="2,841" change={18}/>
        <StatCard label="This Month" value="284" change={24}/>
        <StatCard label="Commission Paid" value="€42,820" change={31}/>
      </div>
      <AdminCard padding={false}><DataTable columns={cols} data={DATA} onView={r=>console.log(r.id)}/></AdminCard>
    </div>
  )
}
