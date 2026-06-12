import { AdminTable } from '@/components/admin/AdminTable'
export const metadata = { title: 'Users — Admin' }
const ROWS = Array.from({ length: 15 }, (_, i) => [
  `user${i+1}@example.com`, `username_${i+1}`,
  ['Free','Silver','Gold','Black VIP'][i%4], i < 13 ? 'Active' : 'Suspended',
  `${10-Math.floor(i/2)} Jun 2026`,
])
export default function AdminUsersPage() {
  return <AdminTable title="Users" columns={['Email','Username','Tier','Status','Joined']} rows={ROWS} />
}
