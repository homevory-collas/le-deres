import { PAYMENT_METHODS } from '@/lib/payments'

export const metadata = { title: 'Checkout' }

export default function CheckoutPage() {
  return (
    <div className="container-wide section-padding">
      <h1 className="text-3xl font-serif font-light mb-10">Checkout</h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-12">

        {/* Left — shipping + payment */}
        <div className="space-y-10">

          {/* Shipping */}
          <section>
            <h2 className="text-xs tracking-widest uppercase mb-6">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Full Name',    name: 'fullName',   span: 2 },
                { label: 'Address',      name: 'line1',      span: 2 },
                { label: 'City',         name: 'city',       span: 1 },
                { label: 'Postal Code',  name: 'postalCode', span: 1 },
                { label: 'Country',      name: 'country',    span: 2 },
              ].map((field) => (
                <div key={field.name} className={field.span === 2 ? 'col-span-2' : ''}>
                  <label className="block text-xs text-muted-foreground mb-1">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="text-xs tracking-widest uppercase mb-6">Payment Method</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {Object.entries(PAYMENT_METHODS).map(([key, method]) => (
                <label
                  key={key}
                  className="flex items-center gap-3 border border-border p-4 cursor-pointer hover:border-foreground transition-colors"
                >
                  <input type="radio" name="payment" value={key} className="accent-foreground" />
                  <span className="text-sm">{method.label}</span>
                </label>
              ))}
            </div>
            <div className="border border-border p-4 rounded-sm">
              <p className="text-xs text-muted-foreground">
                Payment processing powered by secure providers. 
                Card details will be collected on the next screen.
                USDT payments: wallet address provided at confirmation.
              </p>
            </div>
          </section>
        </div>

        {/* Right — order summary */}
        <div>
          <div className="border border-border rounded-sm p-6 sticky top-24">
            <h2 className="text-xs tracking-widest uppercase mb-6">Order Summary</h2>
            {/* Items placeholder */}
            <div className="space-y-4 mb-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-14 aspect-square bg-muted rounded-sm flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-medium">Product Name #{i + 1}</p>
                    <p className="text-[10px] text-muted-foreground">Qty: 1</p>
                  </div>
                  <span className="text-xs">€89.99</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2 mb-6">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Subtotal</span><span>€179.98</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Shipping</span><span>€8.99</span>
              </div>
              <div className="flex justify-between text-sm font-medium pt-2 border-t border-border">
                <span>Total</span><span>€188.97</span>
              </div>
            </div>
            <button className="w-full py-3 bg-foreground text-background text-xs tracking-widest uppercase hover:opacity-90 transition-opacity">
              Place Order
            </button>
            <p className="text-[10px] text-muted-foreground text-center mt-3">
              Discreet billing · Secure & encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
