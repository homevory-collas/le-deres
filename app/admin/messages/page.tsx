'use client'
import * as React from 'react'
import { AdminPageHeader, AdminCard, DataTable, AdminStatusBadge, Pagination, StatCard } from '@/components/admin/shared'

const MSGS = Array.from({ length: 30 }, (_, i) => ({
  id:`msg-${i}`, from:`user${i+1}@ledesir.com`, to:`creator${i%5+1}@ledesir.com`,
  preview:`Message preview #${i+1} — placeholder content…`,
  type: i%3===0?'VIP':i%3===1?'CREATOR':'STANDARD',
  flagged: i%8===0, status: i<28?'DELIVERED':'FLAGGED',
  date:`${10-Math.floor(i/4)} Jun 2026`,
}))

export default function AdminMessagesPage() {
  const [page, setPage] = React.useState(1)
  const perPage = 15
  const paged = MSGS.slice((page-1)*perPage, page*perPage)
  const cols = [
    {key:'id',label:'ID',render:(r:any)=><code className="text-[10px] bg-muted px-1">{r.id}</code>},
    {key:'from',label:'From',render:(r:any)=><span className="text-foreground">{r.from}</span>},
    {key:'to',label:'To'},
    {key:'preview',label:'Preview',render:(r:any)=><p className="text-xs line-clamp-1 max-w-[200px]">{r.preview}</p>},
    {key:'type',label:'Type',render:(r:any)=><AdminStatusBadge status={r.type}/>},
    {key:'flagged',label:'Flagged',render:(r:any)=>r.flagged?<span className="text-red-400 text-xs">⚑ Flagged</span>:<span className="text-muted-foreground">—</span>},
    {key:'status',label:'Status',render:(r:any)=><AdminStatusBadge status={r.status}/>},
  ]
  return (
    <div>
      <AdminPageHeader title="Message Moderation" description="Monitor and moderate user messages"
        breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Messages'}]}
      />
      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatCard label="Total Messages" value="284,920" change={12}/>
        <StatCard label="Flagged" value={MSGS.filter(m=>m.flagged).length.toString()} change={3}/>
        <StatCard label="VIP Messages" value={MSGS.filter(m=>m.type==='VIP').length.toString()} change={18}/>
      </div>
      <AdminCard padding={false}>
        <DataTable columns={cols} data={paged} onView={r=>console.log(r.id)}
          actions={r=>(
            <div className="flex gap-1">
              <button className="text-[9px] px-2 py-1 border border-red-500/30 text-red-400">Remove</button>
            </div>
          )}
        />
        <Pagination page={page} total={MSGS.length} perPage={perPage} onChange={setPage}/>
      </AdminCard>
    </div>
  )
}
