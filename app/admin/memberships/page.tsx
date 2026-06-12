import { AdminTable } from '@/components/admin/AdminTable'
export const metadata = { title: 'Memberships — Admin' }
const ROWS = Array.from({ length: 12 }, (_, i) => [
  `user${i+1}@example.com`, ['Free','Silver','Gold','Black VIP'][i%4],
  i < 10 ? 'Active' : 'Cancelled', `€${[0,19.99,39.99,79.99][i%4]}`, '1 Jul 2026',
])
export default function AdminMembershipsPage() {
  return <AdminTable title="Memberships" columns={['User','Tier','Status','Monthly','Renews']} rows={ROWS} />
}
