import { PageHero } from '@/components/common'
export const metadata = { title: 'RB Media Ecosystem' }
export default function RBMediaPage() {
  const PROJECTS = [
    {name:'LE DÉSIR',desc:'Premium adult content and lifestyle platform',status:'Live'},
    {name:'RB Connect',desc:'Creator-fan direct connection platform',status:'In Development'},
    {name:'RB Market',desc:'Digital goods marketplace',status:'Planned'},
    {name:'RB Studio',desc:'AI-assisted content creation tools',status:'Planned'},
  ]
  return (
    <>
      <PageHero subtitle="RB Media Ecosystem" title="The Ecosystem" description="A network of digital platforms and communities powered by technology and creativity."/>
      <section className="section-padding">
        <div className="container-wide grid md:grid-cols-2 gap-6">
          {PROJECTS.map(p=>(
            <div key={p.name} className="border border-border p-6">
              <div className="flex items-start justify-between mb-2">
                <p className="font-medium">{p.name}</p>
                <span className={`text-[9px] px-2 py-0.5 border tracking-widest uppercase ${p.status==='Live'?'text-green-500 border-green-500/20':'text-muted-foreground border-border'}`}>{p.status}</span>
              </div>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
