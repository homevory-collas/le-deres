import { PageHero } from '@/components/common'
import Link from 'next/link'
import { Package, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui'

export const metadata = { title: 'Order History' }

const STATUS_BADGE: Record<string, Parameters<typeof Badge>[0]['variant']> = {
  PENDING: 'muted', CONFIRMED: 'muted', PROCESSING: 'gold',
  SHIPPED: 'green', DELIVERED: 'green', CANCELLED: 'outline', REFUNDED: 'rose',
}

const PLACEHOLDER_ORDERS = [
  { id: 'LD-2026001', date: '10 Jun 2026', status: 'DELIVERED', total: '€189.97', items: 2 },
  { id: 'LD-2026002', date: '8 Jun 2026',  status: 'SHIPPED',   total: '€64.99',  items: 1 },
  { id: 'LD-2026003', date: '3 Jun 2026',  status: 'PROCESSING', total: '€349.00', items: 3 },
  { id: 'LD-2026004', date: '28 May 2026', status: 'DELIVERED', total: '€89.99',  items: 1 },
]

export default function OrderHistoryPage() {
  return (
    <>
      <PageHero subtitle="Marketplace" title="Order History" />
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          {PLACEHOLDER_ORDERS.length === 0 ? (
            <div className="text-center py-24">
              <Package size={48} className="mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground mb-6">No orders yet.</p>
              <Link href="/marketplace" className="inline-flex gap-2 items-center px-8 py-3 bg-foreground text-background text-xs tracking-widest uppercase">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {PLACEHOLDER_ORDERS.map((order) => (
                <Link
                  key={order.id}
                  href={`/marketplace/orders/${order.id}`}
                  className="flex items-center gap-5 border border-border p-5 hover:border-foreground/40 transition-colors group"
                >
                  <Package size={20} className="text-muted-foreground flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-sm font-medium">{order.id}</p>
                      <Badge variant={STATUS_BADGE[order.status] ?? 'muted'}>{order.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{order.date} · {order.items} item{order.items > 1 ? 's' : ''}</p>
                  </div>
                  <p className="font-medium text-sm">{order.total}</p>
                  <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
