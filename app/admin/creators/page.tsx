'use client'
import * as React from 'react'
import { AdminPageHeader, AdminCard, DataTable, AdminStatusBadge, Pagination, StatCard } from '@/components/admin/shared'

const CREATORS = Array.from({length:30},(_, i)=>({
  id:`creator-${i}`, displayName:`Creator ${i+1}`, email:`creator${i+1}@ledesir.com`,
  region:['European','Asian','American'][i%3],
  followers:Math.floor(Math.random()*100000+5000),
  contentCount:Math.floor(Math.random()*300+20),
  revenue:`€${(200+i*180).toFixed(2)}/mo`,
  status:i<27?'ACTIVE':i<29?'REVIEW':'SUSPENDED',
  verified:i<25,
  joined:`${10-Math.floor(i/4)} Jun 2026`,
}))

export default function AdminCreatorsPage() {
  const [page, setPage] = React.useState(1)
  const perPage = 15
  const paged = CREATORS.slice((page-1)*perPage, page*perPage)
  const cols = [
    {key:'displayName',label:'Creator',render:(r:any)=>(
      <div className="flex items-center gap-2">
        <span className="font-medium text-foreground">{r.displayName}</span>
        {r.verified&&<span className="text-yellow-500 text-xs">✓</span>}
      </div>
    )},
    {key:'email',label:'Email'},
    {key:'region',label:'Region'},
    {key:'followers',label:'Followers',render:(r:any)=>r.followers.toLocaleString()},
    {key:'contentCount',label:'Content'},
    {key:'revenue',label:'Revenue'},
    {key:'status',label:'Status',render:(r:any)=><AdminStatusBadge status={r.status}/>},
  ]
  return (
    <div>
      <AdminPageHeader title="Creators" breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Creators'}]}/>
      <div className="grid grid-cols-4 gap-3 mb-5">
        <StatCard label="Total Creators" value={CREATORS.length.toString()} change={12}/>
        <StatCard label="Verified" value={CREATORS.filter(c=>c.verified).length.toString()} change={8}/>
        <StatCard label="In Review" value={CREATORS.filter(c=>c.status==='REVIEW').length.toString()} change={3}/>
        <StatCard label="Suspended" value={CREATORS.filter(c=>c.status==='SUSPENDED').length.toString()} change={-5}/>
      </div>
      <AdminCard padding={false}>
        <DataTable columns={cols} data={paged} onEdit={r=>console.log(r.id)} onView={r=>console.log(r.id)}/>
        <Pagination page={page} total={CREATORS.length} perPage={perPage} onChange={setPage}/>
      </AdminCard>
    </div>
  )
}
