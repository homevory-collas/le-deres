// Shared legal page layout helper
// Used by: privacy, terms, shipping, returns, refunds, community-guidelines, age-verification, marketplace-policy, content-policy, cookies

import { PageHero } from '@/components/common'

interface LegalPageProps {
  title:    string
  subtitle: string
  sections: { heading: string; body: string }[]
}

export function LegalPageTemplate({ title, subtitle, sections }: LegalPageProps) {
  return (
    <>
      <PageHero subtitle={subtitle} title={title} />
      <section className="section-padding">
        <div className="container-narrow space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-sm font-medium tracking-widest uppercase mb-3">{s.heading}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
          <p className="text-xs text-muted-foreground border-t border-border pt-6">
            Last updated: June 2026. For questions contact privacy@ledesir.com
          </p>
        </div>
      </section>
    </>
  )
}
