import Link from 'next/link'
import { ArrowRight, Trash2 } from 'lucide-react'

export const metadata = { title: 'Shopping Cart' }

export default function CartPage() {
  // TODO: replace with real cart state from useCart hook + store
  const cartItems: any[] = [] // placeholder — empty state
  const isEmpty = cartItems.length === 0

  return (
    <div className="container-wide section-padding">
      <h1 className="text-3xl font-serif font-light mb-10">Shopping Cart</h1>

      {isEmpty ? (
        <div className="text-center py-24">
          <p className="text-muted-foreground mb-6">Your cart is empty.</p>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-8 py-3 bg-foreground text-background text-xs tracking-widest uppercase"
          >
            Continue Shopping <ArrowRight size={12} />
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_360px] gap-12">
          {/* Cart items */}
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 py-6 border-b border-border">
                <div className="w-24 aspect-square bg-muted rounded-sm flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium mb-1">{item.name}</p>
                  <p className="text-xs text-muted-foreground mb-3">{item.variant}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border">
                      <button className="w-8 h-8 flex items-center justify-center text-sm hover:bg-muted">−</button>
                      <span className="w-10 text-center text-sm">{item.quantity}</span>
                      <button className="w-8 h-8 flex items-center justify-center text-sm hover:bg-muted">+</button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">€{item.price}</span>
                      <button className="text-muted-foreground hover:text-foreground">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="border border-border rounded-sm p-6 h-fit">
            <h2 className="text-sm font-medium tracking-widest uppercase mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>€0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <div className="border-t border-border pt-4 mb-6 flex justify-between font-medium">
              <span>Total</span>
              <span>€0.00</span>
            </div>
            <Link
              href="/marketplace/checkout"
              className="block w-full text-center py-3 bg-foreground text-background text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout
            </Link>
            <p className="text-[10px] text-muted-foreground text-center mt-3">
              Discreet packaging · Secure payment
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
