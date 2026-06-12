import { AdminPageHeader, AdminCard, AdminBtn, DataTable, AdminStatusBadge } from '@/components/admin/shared'
import { AI_CHARACTERS } from '@/services/ai'
export const metadata = { title: 'AI Management — Admin' }
export default function AdminAIPage() {
  const cols = [
    {key:'name',label:'Character',render:(r:any)=><span className="font-medium text-foreground">{r.name}</span>},
    {key:'category',label:'Type',render:(r:any)=><span className="capitalize">{r.category}</span>},
    {key:'language',label:'Language'},
    {key:'traits',label:'Traits',render:(r:any)=><span className="text-xs">{(r.traits as string[]).join(', ')}</span>},
    {key:'requiredTier',label:'Access',render:(r:any)=><AdminStatusBadge status={r.requiredTier}/>},
    {key:'isPremium',label:'Premium',render:(r:any)=>r.isPremium?<span className="text-yellow-500">★ Premium</span>:<span className="text-muted-foreground">—</span>},
  ]
  return (
    <div>
      <AdminPageHeader title="AI Companions" description="Manage AI character profiles and configurations"
        breadcrumbs={[{label:'Admin',href:'/admin'},{label:'AI'}]}
        actions={<AdminBtn variant="primary" size="sm">+ Add Character</AdminBtn>}
      />
      <AdminCard className="mb-5">
        <p className="text-xs text-muted-foreground">AI Provider: <span className="text-foreground font-medium">Mock (Development)</span> · Connect Anthropic, OpenAI or Gemini in Phase 5.</p>
      </AdminCard>
      <AdminCard padding={false}>
        <DataTable columns={cols} data={AI_CHARACTERS} onEdit={r=>console.log(r.id)}/>
      </AdminCard>
    </div>
  )
}
