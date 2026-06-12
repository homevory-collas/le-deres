'use client'
import * as React from 'react'
import { Plus } from 'lucide-react'
import { AdminPageHeader, AdminCard, AdminBtn, DataTable, AdminStatusBadge } from '@/components/admin/shared'

const CATS = [
  {id:'mc1',name:'Content Thumbnails',slug:'thumbnails',count:284,type:'image',status:'ACTIVE'},
  {id:'mc2',name:'Content Videos',    slug:'content',   count:1240,type:'video',status:'ACTIVE'},
  {id:'mc3',name:'Profile Avatars',   slug:'profiles',  count:48291,type:'image',status:'ACTIVE'},
  {id:'mc4',name:'Product Images',    slug:'products',  count:892,type:'image',status:'ACTIVE'},
  {id:'mc5',name:'AI Generated',      slug:'ai',        count:4820,type:'mixed',status:'ACTIVE'},
  {id:'mc6',name:'Live Thumbnails',   slug:'live',      count:142,type:'image',status:'ACTIVE'},
]

export default function AdminMediaCategoriesPage() {
  const cols = [
    {key:'name',label:'Category',render:(r:any)=><span className="font-medium text-foreground">{r.name}</span>},
    {key:'slug',label:'Slug',render:(r:any)=><code className="text-[10px] bg-muted px-1">{r.slug}</code>},
    {key:'count',label:'Files'},
    {key:'type',label:'Type',render:(r:any)=><span className="capitalize">{r.type}</span>},
    {key:'status',label:'Status',render:(r:any)=><AdminStatusBadge status={r.status}/>},
  ]
  return (
    <div>
      <AdminPageHeader title="Media Categories" breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Media',href:'/admin/media'},{label:'Categories'}]}
        actions={<AdminBtn variant="primary" size="sm"><Plus size={12}/> Add Category</AdminBtn>}
      />
      <AdminCard padding={false}>
        <DataTable columns={cols} data={CATS} onEdit={r=>console.log(r.id)} onDelete={r=>console.log(r.id)}/>
      </AdminCard>
    </div>
  )
}
