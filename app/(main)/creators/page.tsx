'use client'
import * as React from 'react'
import Link from 'next/link'
import { PageHero, SectionHeading } from '@/components/common'
import { CreatorCard } from '@/components/cards'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui'

const CREATORS = Array.from({length:18},(_, i)=>({
  id:`cr-${i}`, slug:`creator-${i+1}`, displayName:['Élise Moreau','Viktor Blanc','Mila Sorel','Luna Chen','Aria Nova','Kenji Tanaka','Sofia Rossi','Carlos Vega','Yuki Hana','Emma Blake'][i%10],
  region:['European','European','Asian','Asian','American','Asian','European','American','Asian','American'][i%10],
  followerCount:[48000,32000,76000,55000,28000,41000,63000,19000,88000,34000][i%10],
  contentCount:[124,89,203,167,94,148,211,76,284,112][i%10],
  isVerified:true, isLive:i<3,
  bio:'Premium verified creator with exclusive content updated weekly.',
}))

const TABS = [{id:'all',label:'All'},{id:'european',label:'European'},{id:'asian',label:'Asian'},{id:'american',label:'American'},{id:'live',label:'Live Now',count:3}]

export default function CreatorsPage() {
  const [tab, setTab] = React.useState('all')
  const filtered = tab==='live' ? CREATORS.filter(c=>c.isLive) : tab==='all' ? CREATORS : CREATORS.filter(c=>c.region.toLowerCase().includes(tab))
  return (
    <>
      <PageHero subtitle="Adult Ecosystem" title="Creators" description="Follow verified premium creators and access exclusive content."/>
      <section className="section-padding">
        <div className="container-wide">
          <Tabs tabs={TABS} active={tab} onChange={setTab} variant="pill" className="mb-8"/>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(c=><CreatorCard key={c.id} {...c}/>)}
          </div>
        </div>
      </section>
    </>
  )
}
