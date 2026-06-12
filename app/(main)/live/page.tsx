'use client'
import * as React from 'react'
import Link from 'next/link'
import { Radio, Users, Lock, Star } from 'lucide-react'
import { PageHero } from '@/components/common'
import { PLACEHOLDER_ROOMS } from '@/services/streaming'
import { Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

export default function LivePage() {
  const live = PLACEHOLDER_ROOMS.filter(r=>r.status==='live')
  const scheduled = PLACEHOLDER_ROOMS.filter(r=>r.status==='scheduled')
  return (
    <>
      <PageHero subtitle="Adult Ecosystem" title="Live Shows" description="Real-time live streaming from verified creators. Interact and connect live."/>
      <section className="section-padding">
        <div className="container-wide">
          <div className="flex items-center gap-2 mb-6">
            <span className="flex items-center gap-1.5 text-xs text-red-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/>
              {live.length} streams live now
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {live.map(room=>(
              <Link key={room.id} href={`/live/${room.id}`} className="group block border border-border hover:border-foreground/40 transition-colors overflow-hidden">
                <div className="relative aspect-video bg-muted flex items-center justify-center">
                  <Radio size={24} className="text-muted-foreground/30"/>
                  <span className="absolute top-2 left-2 text-[9px] px-2 py-1 bg-red-500 text-white tracking-widest uppercase">Live</span>
                  {room.type!=='public'&&<span className="absolute top-2 right-2 p-1 bg-black/60"><Lock size={10} className="text-white"/></span>}
                  <span className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] bg-black/60 text-white px-2 py-0.5">
                    <Users size={9}/>{room.viewerCount.toLocaleString()}
                  </span>
                </div>
                <div className="p-3">
                  <p className="font-medium text-sm mb-1">{room.title}</p>
                  <p className="text-xs text-muted-foreground capitalize">{room.type} · {room.requiredTier}</p>
                </div>
              </Link>
            ))}
          </div>
          {scheduled.length > 0 && (
            <>
              <h2 className="text-xl font-serif font-light mb-4">Coming Up</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {scheduled.map(room=>(
                  <div key={room.id} className="border border-border p-4 opacity-60">
                    <p className="font-medium text-sm mb-1">{room.title}</p>
                    <p className="text-xs text-muted-foreground">Scheduled · {room.requiredTier}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
