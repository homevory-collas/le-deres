import { AdminTable } from '@/components/admin/AdminTable'
export const metadata = { title: 'Orders — Admin' }
const ROWS = Array.from({ length: 12 }, (_, i) => [
  `LD-20260${i+1}`, `user${i+1}@example.com`,
  `€${(49+i*35).toFixed(2)}`, ['Delivered','Shipped','Processing','Pending'][i%4],
  ['PayPal','USDT','Visa','Mastercard'][i%4], `${10-i} Jun 2026`,
])
export default function AdminOrdersPage() {
  return <AdminTable title="Orders" columns={['Order ID','Customer','Total','Status','Payment','Date']} rows={ROWS} />
}
