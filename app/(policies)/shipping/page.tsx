// app/(policies)/shipping/page.tsx
import { LegalPageTemplate } from '@/components/common/LegalPageTemplate'
export const metadata = { title: 'Shipping Policy' }
export default function ShippingPage() {
  return <LegalPageTemplate title="Shipping Policy" subtitle="Marketplace" sections={[
    { heading: 'Discreet Packaging', body: 'All orders are shipped in plain, unmarked packaging. No reference to LE DÉSIR or the contents appears on the outside.' },
    { heading: 'Delivery Times', body: 'Standard: 3-7 business days (Europe). Express: 1-3 business days. International: 7-14 business days. Times may vary by destination.' },
    { heading: 'Shipping Costs', body: 'Free shipping on orders over €100. Standard shipping: €8.99. Express: €14.99. International rates calculated at checkout.' },
    { heading: 'Tracking', body: 'All orders include tracking. You will receive a tracking number by email once your order ships.' },
  ]} />
}
