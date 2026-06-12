'use client'
import { Radio, Users, Heart, MessageSquare, Lock } from 'lucide-react'
import Link from 'next/link'
import { PLACEHOLDER_ROOMS } from '@/services/streaming'

interface Props { params: { room: string } }

export default function LiveRoomPage({ params }: Props) {
  const room = PLACEHOLDER_ROOMS.find(r => r.id === params.room) ?? PLACEHOLDER_ROOMS[0]
  return (
    <div className="container-wide section-padding">
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div>
          <div className="relative aspect-video bg-muted rounded-sm flex items-center justify-center mb-4">
            <Radio size={48} className="text-muted-foreground/20"/>
            <div className="absolute top-3 left-3 flex items-center gap-2 text-xs bg-black/70 text-white px-2.5 py-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/> LIVE
            </div>
            <div className="absolute top-3 right-3 flex items-center gap-1 text-xs bg-black/70 text-white px-2 py-1.5">
              <Users size={11}/>{room.viewerCount.toLocaleString()}
            </div>
            <p className="absolute bottom-4 text-sm text-muted-foreground">
              {room.type==='public' ? 'Live stream player — Phase 5' : 'VIP/Private stream — membership required'}
            </p>
          </div>
          <h1 className="text-xl font-serif font-light mb-1">{room.title}</h1>
          <p className="text-xs text-muted-foreground capitalize mb-4">{room.type} stream · {room.requiredTier} required</p>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-border text-xs tracking-widest uppercase hover:border-foreground transition-colors">
              <Heart size={12}/> Follow
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs tracking-widest uppercase hover:opacity-90">
              <Heart size={12}/> Send Gift
            </button>
          </div>
        </div>
        <div className="border border-border flex flex-col h-[500px]">
          <div className="px-4 py-3 border-b border-border flex-shrink-0">
            <p className="text-xs font-medium tracking-widest uppercase">Live Chat</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {Array.from({length:8},(_, i)=>(
              <div key={i} className="text-xs">
                <span className="font-medium text-foreground">user{i+1}</span>
                <span className="text-muted-foreground ml-2">Chat message #{i+1} placeholder</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border p-3 flex gap-2 flex-shrink-0">
            <input type="text" placeholder="Type a message…" className="flex-1 bg-muted px-3 py-2 text-xs focus:outline-none"/>
            <button className="px-3 py-2 bg-foreground text-background text-xs"><MessageSquare size={12}/></button>
          </div>
        </div>
      </div>
    </div>
  )
}
