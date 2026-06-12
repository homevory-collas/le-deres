import { AdminPageHeader, AdminCard } from '@/components/admin/shared'
import { SimpleBarChart, MiniMetric } from '@/components/admin/analytics/Charts'
export const metadata = { title: 'Content Analytics — Admin' }
const DATA = Array.from({length:7},(_, i)=>({'label':['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i],'value':Math.floor(Math.random()*5000+1000)}))
const METRICS = [
  {label:'Total',value:'42,891',change:12},
  {label:'This Week',value:'8,241',change:18},
  {label:'This Month',value:'28,491',change:8},
  {label:'Growth',value:'+15%',change:15},
]
export default function AdminContentAnalyticsPage() {
  return (
    <div>
      <AdminPageHeader title="Content Analytics" breadcrumbs={[{label:'Admin',href:'/admin'},{label:'Analytics',href:'/admin/analytics'},{label:'Content'}]}/>
      <div className="grid grid-cols-4 gap-3 mb-5">
        {METRICS.map(m=><div key={m.label} className="border border-border p-4 text-center"><p className="text-2xl font-light">{m.value}</p><p className="text-[9px] tracking-widest uppercase text-muted-foreground mt-1">{m.label}</p></div>)}
      </div>
      <AdminCard title="Content — 7 Day Trend">
        <SimpleBarChart data={DATA} height={140} color="#D4AF37"/>
      </AdminCard>
    </div>
  )
}
