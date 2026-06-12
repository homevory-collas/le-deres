'use client'
import * as React from 'react'
import { Copy, Users, DollarSign, TrendingUp, Gift, Check } from 'lucide-react'
import { PageHero } from '@/components/common'

const MY_STATS = [
  { label: 'Total Referrals',  value: '24',    icon: Users },
  { label: 'This Month',       value: '4',     icon: TrendingUp },
  { label: 'Commission Earned',value: '€284',  icon: DollarSign },
  { label: 'Pending Payout',   value: '€48',   icon: Gift },
]

const MY_REFERRALS = Array.from({ length: 8 }, (_, i) => ({
  user: `user${i+100}@example.com`, plan: ['Silver','Gold','Black VIP'][i%3],
  commission: `€${(12+i*8).toFixed(2)}`, status: i<6?'PAID':'PENDING', date: `${10-i} Jun 2026`,
}))

export default function ReferralsPage() {
  const [copied, setCopied] = React.useState(false)
  const link = 'https://ledesir.com?ref=user_abc123'

  function copy() {
    navigator.clipboard.writeText(link).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <PageHero subtitle="My Account" title="Referral Program" description="Invite friends and earn 10% commission on every subscription." />
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {MY_STATS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="border border-border p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] tracking-widest uppercase text-muted-foreground">{label}</p>
                  <Icon size={14} className="text-muted-foreground" />
                </div>
                <p className="text-2xl font-light">{value}</p>
              </div>
            ))}
          </div>
          <div className="border border-border p-6 mb-8 max-w-lg">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Your Referral Link</p>
            <div className="flex gap-2">
              <code className="flex-1 bg-muted px-3 py-2 text-xs truncate">{link}</code>
              <button onClick={copy} className="px-4 py-2 border border-border hover:border-foreground transition-colors text-xs tracking-widest uppercase flex items-center gap-1.5">
                {copied ? <><Check size={11}/> Copied</> : <><Copy size={11}/> Copy</>}
              </button>
            </div>
          </div>
          <div className="border border-border overflow-hidden">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-border bg-muted/30">
                {['User','Plan','Commission','Status','Date'].map(h=><th key={h} className="text-left px-4 py-3 text-[9px] tracking-widest uppercase text-muted-foreground">{h}</th>)}
              </tr></thead>
              <tbody>
                {MY_REFERRALS.map((r,i)=><tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="px-4 py-3">{r.user}</td>
                  <td className="px-4 py-3">{r.plan}</td>
                  <td className="px-4 py-3 text-green-500 font-medium">{r.commission}</td>
                  <td className="px-4 py-3"><span className={`text-[9px] px-2 py-0.5 border ${r.status==='PAID'?'text-green-500 border-green-500/20 bg-green-500/10':'text-yellow-500 border-yellow-500/20 bg-yellow-500/10'}`}>{r.status}</span></td>
                  <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
