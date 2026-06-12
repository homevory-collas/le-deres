export const metadata = { title: 'My Orders' }

const ORDER_STATUSES: Record<string, string> = {
  PENDING:    'Pending',
  CONFIRMED:  'Confirmed',
  PROCESSING: 'Processing',
  SHIPPED:    'Shipped',
  DELIVERED:  'Delivered',
  CANCELLED:  'Cancelled',
}

export default function OrdersPage() {
  // TODO: fetch real orders from DB
  const placeholderOrders = Array.from({ length: 4 }).map((_, i) => ({
    id:     `LD-${2026100 + i}`,
    date:   `${10 - i} Jun 2026`,
    status: Object.keys(ORDER_STATUSES)[i % 6],
    total:  (89.99 + i * 45).toFixed(2),
    items:  i + 1,
  }))

  return (
    <div>
      <h1 className="text-2xl font-serif font-light mb-8">My Orders</h1>

      <div className="space-y-4">
        {placeholderOrders.map((order) => (
          <div key={order.id} className="border border-border rounded-sm p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-medium">{order.id}</p>
                <p className="text-xs text-muted-foreground">{order.date}</p>
              </div>
              <span className="text-[10px] px-2 py-1 border border-border tracking-widest uppercase">
                {ORDER_STATUSES[order.status]}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{order.items} item{order.items > 1 ? 's' : ''}</span>
              <span className="font-medium">€{order.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
