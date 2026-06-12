import { PageHero } from '@/components/common'
import Link from 'next/link'
export const metadata = { title: 'Partner Brands' }
const BRANDS = [
  {name:'SVAKOM',slug:'svakom',category:'Wellness',desc:'Premium wellness technology brand.'},
  {name:'LELO',slug:'lelo',category:'Luxury',desc:'Luxury intimate lifestyle brand.'},
  {name:'Lovense',slug:'lovense',category:'Technology',desc:'Smart intimate device brand.'},
  {name:'Wevibe',slug:'wevibe',category:'Couples',desc:'Innovative couples wellness brand.'},
  {name:'Satisfyer',slug:'satisfyer',category:'Wellness',desc:'Award-winning wellness brand.'},
  {name:'Magic Motion',slug:'magic-motion',category:'Smart',desc:'Smart intimate technology.'},
]
export default function PartnerBrandsPage() {
  return (
    <>
      <PageHero subtitle="Partner Brands" title="Our Partners" description="Curated luxury brands selected for quality, innovation and sophistication."/>
      <section className="section-padding">
        <div className="container-wide grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BRANDS.map(b=>(
            <div key={b.slug} className="border border-border p-5 hover:border-foreground/40 transition-colors">
              <div className="h-16 bg-muted flex items-center justify-center mb-4">
                <span className="font-medium tracking-widest uppercase text-sm">{b.name}</span>
              </div>
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">{b.category}</p>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
