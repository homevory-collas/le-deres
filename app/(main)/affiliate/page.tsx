import { PageHero } from '@/components/common'
import Link from 'next/link'
export const metadata = { title: 'Affiliate Program' }
export default function AffiliatePage() {
  const TIERS = [
    {name:'Starter',commission:'10%',min:'0 sales',perks:['Basic dashboard','Standard links','Monthly payout']},
    {name:'Partner',commission:'15%',min:'10 sales',perks:['Priority support','Custom links','Bi-weekly payout']},
    {name:'Elite',  commission:'20%',min:'50 sales',perks:['Dedicated manager','Co-branded content','Weekly payout']},
  ]
  return (
    <>
      <PageHero subtitle="Affiliate" title="Earn With LE DÉSIR" description="Join our affiliate program and earn up to 20% commission on every referral."/>
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {TIERS.map(t=>(
              <div key={t.name} className="border border-border p-6">
                <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">{t.name}</p>
                <p className="text-3xl font-serif font-light mb-1">{t.commission}</p>
                <p className="text-xs text-muted-foreground mb-4">commission · {t.min}</p>
                <ul className="space-y-2 mb-6">
                  {t.perks.map(p=><li key={p} className="text-xs text-muted-foreground flex items-center gap-2"><span>✓</span>{p}</li>)}
                </ul>
                <Link href="/register" className="block text-center py-2 border border-border text-xs tracking-widest uppercase hover:border-foreground transition-colors">
                  Join as {t.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
