import { AdminTable } from '@/components/admin/AdminTable'
export const metadata = { title: 'Products — Admin' }
const ROWS = Array.from({ length: 12 }, (_, i) => [
  `LD-P${1000+i}`, `Product Name #${i+1}`,
  ['Lingerie','Fragrances','Wellness','Couples'][i%4],
  `€${(39.99+i*20).toFixed(2)}`, `${50-i*3}`, 'Active',
])
export default function AdminProductsPage() {
  return <AdminTable title="Products" columns={['SKU','Name','Category','Price','Stock','Status']} rows={ROWS} createHref="/admin/products/new" />
}
