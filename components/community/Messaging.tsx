'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Search, Send, MoreHorizontal, Check, CheckCheck,
  Lock, Star, Bell, BellOff, Trash2, Flag, ArrowLeft,
  MessageSquare, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui'

// ─── Types ────────────────────────────────────────────────
export interface Conversation {
  id:          string
  participant: { name: string; avatar?: string; isVIP?: boolean; isCreator?: boolean; isOnline?: boolean }
  lastMessage: string
  lastTime:    string
  unreadCount: number
  isPrivate?:  boolean
}

export interface Message {
  id:        string
  senderId:  string
  content:   string
  time:      string
  isRead:    boolean
  isOwn:     boolean
}

// ─── Placeholder data ─────────────────────────────────────
export const PLACEHOLDER_CONVERSATIONS: Conversation[] = [
  { id:'c1', participant:{ name:'Élise Moreau', isCreator:true, isOnline:true, isVIP:true }, lastMessage:'Thank you for your support! 💕', lastTime:'2m', unreadCount:2 },
  { id:'c2', participant:{ name:'Viktor Blanc',  isCreator:true, isOnline:false },            lastMessage:'New content dropping tonight', lastTime:'1h', unreadCount:0 },
  { id:'c3', participant:{ name:'Mila Sorel',    isCreator:true, isOnline:true },             lastMessage:'Hope you enjoy the new series', lastTime:'3h', unreadCount:1 },
  { id:'c4', participant:{ name:'Support Team',  isOnline:true },                             lastMessage:'Your ticket has been resolved', lastTime:'1d', unreadCount:0 },
  { id:'c5', participant:{ name:'Luna Chen',     isCreator:true, isOnline:false, isVIP:true },lastMessage:'VIP exclusive content ready', lastTime:'2d', unreadCount:0 },
  { id:'c6', participant:{ name:'LE DÉSIR',       isOnline:true },                            lastMessage:'Welcome to LE DÉSIR Society 🌹', lastTime:'3d', unreadCount:0 },
]

export const PLACEHOLDER_MESSAGES: Message[] = [
  { id:'m1', senderId:'other', content:'Hi! I love your work. Just joined Gold tier ✨', time:'2:14 PM', isRead:true, isOwn:false },
  { id:'m2', senderId:'me',    content:'Thank you so much! Welcome to Gold. You\'ll love the exclusive content I have planned 💕', time:'2:16 PM', isRead:true, isOwn:true },
  { id:'m3', senderId:'other', content:'When is the next live show?', time:'2:18 PM', isRead:true, isOwn:false },
  { id:'m4', senderId:'me',    content:'Saturday night at 9pm CET! I\'m doing something very special for Gold members 🌹', time:'2:19 PM', isRead:true, isOwn:true },
  { id:'m5', senderId:'other', content:'Amazing! Can\'t wait 🔥', time:'2:20 PM', isRead:false, isOwn:false },
]

// ─── ConversationList ─────────────────────────────────────
export function ConversationList({
  conversations, activeId, onSelect, className,
}: {
  conversations: Conversation[]
  activeId?:     string
  onSelect:      (id: string) => void
  className?:    string
}) {
  const [search, setSearch] = React.useState('')
  const filtered = conversations.filter(c =>
    !search || c.participant.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={cn('flex flex-col border-r border-border', className)}>
      {/* Header */}
      <div className="px-4 py-4 border-b border-border">
        <h2 className="text-sm font-medium tracking-widest uppercase mb-3">Messages</h2>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search conversations…"
            className="w-full bg-muted pl-8 pr-3 py-2 text-xs focus:outline-none"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map(conv => (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3.5 border-b border-border/50 text-left hover:bg-muted/30 transition-colors',
              activeId === conv.id && 'bg-muted/50',
            )}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-xs font-medium">
                {conv.participant.name[0]}
              </div>
              {conv.participant.isOnline && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <p className={cn('text-sm font-medium truncate', conv.unreadCount > 0 && 'text-foreground')}>{conv.participant.name}</p>
                  {conv.participant.isCreator && <Star size={10} className="text-yellow-500 flex-shrink-0" />}
                  {conv.participant.isVIP     && <span className="text-[8px] px-1 bg-yellow-500/20 text-yellow-500">VIP</span>}
                </div>
                <span className="text-[10px] text-muted-foreground flex-shrink-0">{conv.lastTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                {conv.unreadCount > 0 && (
                  <span className="flex-shrink-0 ml-2 w-5 h-5 rounded-full bg-foreground text-background text-[9px] flex items-center justify-center">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── MessageThread ────────────────────────────────────────
export function MessageThread({
  conversation, messages, onBack, className,
}: {
  conversation?: Conversation
  messages:      Message[]
  onBack?:       () => void
  className?:    string
}) {
  const [text, setText] = React.useState('')
  const endRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!conversation) {
    return (
      <div className={cn('flex items-center justify-center text-muted-foreground', className)}>
        <div className="text-center">
          <MessageSquare size={40} className="mx-auto mb-3 opacity-20" />
          <p className="text-sm">Select a conversation to start messaging</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border flex-shrink-0">
        {onBack && (
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground lg:hidden">
            <ArrowLeft size={16} />
          </button>
        )}
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center text-xs">
            {conversation.participant.name[0]}
          </div>
          {conversation.participant.isOnline && (
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-background" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-medium">{conversation.participant.name}</p>
            {conversation.participant.isCreator && <Star size={11} className="text-yellow-500" />}
          </div>
          <p className="text-[10px] text-muted-foreground">{conversation.participant.isOnline ? 'Online' : 'Offline'}</p>
        </div>
        <div className="flex items-center gap-1">
          {conversation.isPrivate && <Lock size={13} className="text-muted-foreground" />}
          <button className="p-1.5 text-muted-foreground hover:text-foreground"><MoreHorizontal size={15} /></button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={cn('flex gap-2.5', msg.isOwn && 'flex-row-reverse')}>
            {!msg.isOwn && (
              <div className="w-7 h-7 rounded-full bg-muted flex-shrink-0 flex items-center justify-center text-[10px]">
                {conversation.participant.name[0]}
              </div>
            )}
            <div className={cn('max-w-xs lg:max-w-md', msg.isOwn && 'items-end flex flex-col')}>
              <div className={cn(
                'px-4 py-2.5 text-sm rounded-sm',
                msg.isOwn ? 'bg-foreground text-background' : 'bg-muted text-foreground',
              )}>
                {msg.content}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[9px] text-muted-foreground">{msg.time}</span>
                {msg.isOwn && (msg.isRead ? <CheckCheck size={10} className="text-blue-400" /> : <Check size={10} className="text-muted-foreground" />)}
              </div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* VIP gate example */}
      {conversation.participant.isVIP && conversation.isPrivate && (
        <div className="mx-5 mb-3 px-4 py-2 bg-yellow-500/5 border border-yellow-500/20 text-xs text-yellow-600 flex items-center gap-2">
          <Lock size={11} /> Private VIP conversation — Gold membership required
        </div>
      )}

      {/* Compose */}
      <div className="border-t border-border px-4 py-3 flex items-end gap-3 flex-shrink-0">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); setText('') } }}
          placeholder="Write a message…"
          rows={1}
          className="flex-1 bg-muted px-4 py-2.5 text-sm resize-none focus:outline-none max-h-32"
          style={{ minHeight: '40px' }}
        />
        <button
          onClick={() => setText('')}
          disabled={!text.trim()}
          className="w-9 h-9 flex items-center justify-center bg-foreground text-background disabled:opacity-40 flex-shrink-0"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  )
}

// ─── Notifications Center ─────────────────────────────────
export interface NotificationItem {
  id:       string
  type:     'message' | 'system' | 'content' | 'order' | 'membership' | 'community'
  title:    string
  body:     string
  isRead:   boolean
  time:     string
  href?:    string
}

const TYPE_ICONS: Record<string, React.ElementType> = {
  message:    MessageSquare,
  system:     Bell,
  content:    Star,
  order:      Star,
  membership: Star,
  community:  MessageSquare,
}

export function NotificationsList({ notifications, onMarkRead }: {
  notifications: NotificationItem[]
  onMarkRead:    (id: string) => void
}) {
  return (
    <div className="space-y-2">
      {notifications.map(notif => {
        const Icon = TYPE_ICONS[notif.type] ?? Bell
        return (
          <div
            key={notif.id}
            className={cn(
              'flex items-start gap-3 p-4 border border-border transition-colors',
              !notif.isRead && 'bg-muted/20 border-foreground/10',
            )}
          >
            <div className={cn(
              'w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0',
              notif.isRead ? 'bg-muted text-muted-foreground' : 'bg-foreground text-background',
            )}>
              <Icon size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn('text-sm font-medium mb-0.5', !notif.isRead && 'text-foreground')}>{notif.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{notif.body}</p>
              <p className="text-[10px] text-muted-foreground/50 mt-1">{notif.time}</p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              {!notif.isRead && (
                <button onClick={() => onMarkRead(notif.id)} className="p-1.5 text-muted-foreground hover:text-foreground" title="Mark as read">
                  <CheckCheck size={13} />
                </button>
              )}
              <span className={cn('w-2 h-2 rounded-full mt-1.5 flex-shrink-0', notif.isRead ? 'opacity-0' : 'bg-foreground')} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
