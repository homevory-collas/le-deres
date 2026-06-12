'use client'
import * as React from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { AdminPageHeader, AdminCard, AdminBtn, DataTable, AdminStatusBadge, FormField, AdminInput, AdminSelect } from '@/components/admin/shared'
import { CONTENT_CATEGORIES } from '@/components/admin/cms/ContentEditor'

const CATS = CONTENT_CATEGORIES.map((c, i) => ({
  id: c.value, name: c.label, slug: c.value,
  parent: i > 2 ? CONTENT_CATEGORIES[Math.floor(i/3)].label : '—',
  itemCount: Math.floor(Math.random() * 400 + 20),
  status: 'ACTIVE',
}))

export default function AdminCategoriesPage() {
  const [showForm, setShowForm] = React.useState(false)
  const columns = [
    { key:'name', label:'Category Name', render:(r:any)=><span className="font-medium text-foreground">{r.name}</span> },
    { key:'slug', label:'Slug', render:(r:any)=><code className="text-[10px] bg-muted px-1.5 py-0.5">{r.slug}</code> },
    { key:'parent', label:'Parent' },
    { key:'itemCount', label:'Items' },
    { key:'status', label:'Status', render:(r:any)=><AdminStatusBadge status={r.status} /> },
  ]
  return (
    <div>
      <AdminPageHeader
        title="Content Categories"
        breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Content',href:'/admin/content'},{label:'Categories'}]}
        actions={<AdminBtn variant="primary" size="sm" onClick={()=>setShowForm(!showForm)}><Plus size={12}/> Add Category</AdminBtn>}
      />
      {showForm && (
        <AdminCard title="New Category" className="mb-5">
          <div className="grid grid-cols-3 gap-4">
            <FormField label="Category Name" required><AdminInput placeholder="e.g. Asian — Thai" /></FormField>
            <FormField label="Slug"><AdminInput placeholder="asian-thai" /></FormField>
            <FormField label="Parent Category">
              <AdminSelect options={CONTENT_CATEGORIES} placeholder="None (top-level)" />
            </FormField>
          </div>
          <div className="flex gap-2 mt-4">
            <AdminBtn variant="primary" size="sm">Save Category</AdminBtn>
            <AdminBtn variant="ghost" size="sm" onClick={()=>setShowForm(false)}>Cancel</AdminBtn>
          </div>
        </AdminCard>
      )}
      <AdminCard padding={false}>
        <DataTable columns={columns} data={CATS} onEdit={r=>console.log('edit',r.id)} onDelete={r=>console.log('delete',r.id)} />
      </AdminCard>
    </div>
  )
}
