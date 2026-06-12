import { PageHero } from '@/components/common'

export const metadata = { title: 'FAQ' }

const FAQ_DATA = [
  {
    category: 'Membership',
    items: [
      { q: 'What membership tiers are available?', a: 'We offer Free, Silver (€19.99/mo), Gold (€39.99/mo) and Black VIP (€79.99/mo) tiers. Each tier unlocks additional content, marketplace discounts and community features.' },
      { q: 'Can I cancel my membership?', a: 'Yes. You can cancel anytime from your dashboard. Your membership remains active until the end of the billing period.' },
      { q: 'How do I upgrade my membership?', a: 'Visit your dashboard and select Membership to upgrade at any time. The price difference is prorated.' },
    ],
  },
  {
    category: 'Marketplace',
    items: [
      { q: 'Is packaging discreet?', a: 'Yes. All orders are shipped in plain, unmarked packaging with no indication of the contents or sender name.' },
      { q: 'What is the return policy?', a: 'We accept returns within 30 days for unopened, unused products. See our Return Policy for full details.' },
      { q: 'Do you ship internationally?', a: 'Yes, we ship to most European countries and selected international markets. Shipping costs are calculated at checkout.' },
    ],
  },
  {
    category: 'Payments',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept PayPal, Visa, Mastercard and USDT (cryptocurrency). All transactions are encrypted and secure.' },
      { q: 'Will LE DÉSIR appear on my bank statement?', a: 'Charges appear under a discreet billing name, not LE DÉSIR. This protects your privacy.' },
    ],
  },
  {
    category: 'Account & Privacy',
    items: [
      { q: 'How is my data protected?', a: 'We use industry-standard encryption for all data. We never sell personal data to third parties. See our Privacy Policy.' },
      { q: 'How do I delete my account?', a: 'You can request account deletion from your dashboard under Settings > Security. Data is purged within 30 days.' },
    ],
  },
]

export default function FaqPage() {
  return (
    <>
      <PageHero
        subtitle="FAQ"
        title="Common Questions"
        description="Everything you need to know about LE DÉSIR."
      />

      <section className="section-padding">
        <div className="container-narrow">
          <div className="space-y-12">
            {FAQ_DATA.map((section) => (
              <div key={section.category}>
                <h2 className="text-xs tracking-widest uppercase text-muted-foreground mb-6 border-b border-border pb-3">
                  {section.category}
                </h2>
                <div className="space-y-4">
                  {section.items.map((item, i) => (
                    <details key={i} className="group border border-border rounded-sm">
                      <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium select-none list-none hover:bg-muted/50 transition-colors">
                        {item.q}
                        <span className="text-lg text-muted-foreground group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <div className="px-5 pb-5">
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
