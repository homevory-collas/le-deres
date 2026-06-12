'use client'
import * as React from 'react'
import { AdminPageHeader, AdminCard, DataTable, AdminStatusBadge, Pagination } from '@/components/admin/shared'

const COMMENTS = Array.from({ length: 35 }, (_, i) => ({
  id: `cm-${i}`, content: `Comment #${i+1} — placeholder preview text for admin review…`,
  author: `user${i+2}@ledesir.com`, postId: `#${1000+Math.floor(i/3)}`,
  likes: Math.floor(Math.random()*50), reports: Math.floor(Math.random()*3),
  status: i<30?'PUBLISHED':i<33?'REVIEW':'REMOVED', created: `${10-Math.floor(i/5)} Jun 2026`,
}))

export default function AdminCommentsPage() {
  const [page, setPage] = React.useState(1)
  const perPage = 15
  const paged = COMMENTS.slice((page-1)*perPage, page*perPage)
  const cols = [
    {key:'content',label:'Comment',render:(r:any)=><p className="text-xs line-clamp-1 max-w-xs">{r.content}</p>},
    {key:'author',label:'Author',render:(r:any)=><span className="text-foreground">{r.author}</span>},
    {key:'postId',label:'Post'},
    {key:'likes',label:'Likes'},
    {key:'reports',label:'Reports',render:(r:any)=><span className={r.reports>0?'text-red-400 font-medium':'text-muted-foreground'}>{r.reports}</span>},
    {key:'status',label:'Status',render:(r:any)=><AdminStatusBadge status={r.status}/>},
  ]
  return (
    <div>
      <AdminPageHeader title="Comments" breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Community',href:'/admin/community'},{label:'Comments'}]}/>
      <AdminCard padding={false}>
        <DataTable columns={cols} data={paged} onDelete={r=>console.log(r.id)}
          actions={r=>(
            <div className="flex gap-1">
              <button className="text-[9px] px-2 py-1 border border-red-500/30 text-red-400 hover:bg-red-500/10">Remove</button>
            </div>
          )}
        />
        <Pagination page={page} total={COMMENTS.length} perPage={perPage} onChange={setPage}/>
      </AdminCard>
    </div>
  )
}
