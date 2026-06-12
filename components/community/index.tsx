'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Heart, MessageSquare, Share2, MoreHorizontal,
  Users, Calendar, Lock, Globe, Search, Send,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui'
import { Input } from '@/components/ui/Form'
import { formatNumber, formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

// ─── POST CARD ────────────────────────────────────────────
interface PostCardProps {
  id:         string
  author:     { name: string; avatar?: string; tier?: string }
  content:    string
  media?:     string[]
  likes:      number
  comments:   number
  timeAgo:    string
  isPrivate?: boolean
}

export function PostCard({ id, author, content, media, likes, comments, timeAgo, isPrivate }: PostCardProps) {
  const [liked, setLiked] = React.useState(false)
  return (
    <article className="border border-border rounded-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-muted overflow-hidden flex-shrink-0">
            {author.avatar
              ? <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-muted" />
            }
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{author.name}</p>
              {author.tier && <Badge variant="gold">{author.tier}</Badge>}
            </div>
            <p className="text-[10px] text-muted-foreground">{timeAgo}</p>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal size={16} /></button>
      </div>

      {/* Content */}
      <p className="text-sm leading-relaxed text-muted-foreground mb-4">{content}</p>

      {/* Media grid */}
      {media && media.length > 0 && (
        <div className={cn('grid gap-1 mb-4', media.length === 1 ? 'grid-cols-1' : 'grid-cols-2')}>
          {media.slice(0, 4).map((_, i) => (
            <div key={i} className={cn('bg-muted aspect-video', media.length === 1 && 'aspect-[16/7]')} />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-5 border-t border-border pt-4 mt-2">
        <button
          onClick={() => setLiked(!liked)}
          className={cn('flex items-center gap-1.5 text-xs transition-colors', liked ? 'text-rose-500' : 'text-muted-foreground hover:text-foreground')}
        >
          <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
          {formatNumber(likes + (liked ? 1 : 0))}
        </button>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <MessageSquare size={14} /> {formatNumber(comments)}
        </button>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground ml-auto">
          <Share2 size={14} /> Share
        </button>
      </div>
    </article>
  )
}

// ─── POST COMPOSER ────────────────────────────────────────
export function PostComposer() {
  const [text, setText] = React.useState('')
  return (
    <div className="border border-border rounded-sm p-4 mb-6">
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full bg-muted flex-shrink-0" />
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share something with the community…"
            rows={text ? 4 : 2}
            className="w-full bg-muted/30 border border-border px-4 py-3 text-sm resize-none focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
          />
          {text && (
            <div className="flex items-center justify-end gap-3 mt-3">
              <Button variant="ghost" size="sm" onClick={() => setText('')}>Cancel</Button>
              <Button variant="primary" size="sm">Post</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── GROUP CARD ───────────────────────────────────────────
interface GroupCardProps {
  id:          string
  name:        string
  slug:        string
  description: string
  memberCount: number
  isPrivate:   boolean
  cover?:      string
  isMember?:   boolean
}

export function GroupCard({ id, name, slug, description, memberCount, isPrivate, isMember }: GroupCardProps) {
  return (
    <div className="border border-border rounded-sm overflow-hidden hover:border-foreground/40 transition-colors group">
      <div className="h-24 bg-muted" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-medium text-sm">{name}</p>
              {isPrivate
                ? <Lock size={11} className="text-muted-foreground" />
                : <Globe size={11} className="text-muted-foreground" />
              }
            </div>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
              <Users size={10} /> {formatNumber(memberCount)} members
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{description}</p>
        <Link href={`/community/groups/${slug}`}>
          <Button variant={isMember ? 'outline' : 'primary'} size="sm" className="w-full">
            {isMember ? 'View Group' : 'Join Group'}
          </Button>
        </Link>
      </div>
    </div>
  )
}

// ─── EVENT CARD ───────────────────────────────────────────
interface EventCardProps {
  id:         string
  title:      string
  description: string
  startDate:  string
  isOnline:   boolean
  location?:  string
  attendeeCount: number
}

export function EventCard({ id, title, description, startDate, isOnline, location, attendeeCount }: EventCardProps) {
  return (
    <div className="border border-border rounded-sm p-5 hover:border-foreground/40 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-muted flex-shrink-0 flex items-center justify-center">
          <Calendar size={20} className="text-muted-foreground" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-sm mb-1">{title}</p>
          <p className="text-xs text-muted-foreground mb-2">{description}</p>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span>{startDate}</span>
            <span>·</span>
            <span>{isOnline ? 'Online' : location}</span>
            <span>·</span>
            <span>{formatNumber(attendeeCount)} attending</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Button variant="primary" size="sm">RSVP</Button>
        <Button variant="outline" size="sm">Learn More</Button>
      </div>
    </div>
  )
}

// ─── MEMBER PROFILE CARD ──────────────────────────────────
interface MemberProfileCardProps {
  userId:      string
  displayName: string
  username:    string
  avatar?:     string
  bio?:        string
  tier:        string
  postCount:   number
  joinDate:    string
  isFollowing?: boolean
}

export function MemberProfileCard({
  userId, displayName, username, avatar, bio, tier, postCount, joinDate, isFollowing
}: MemberProfileCardProps) {
  return (
    <div className="border border-border rounded-sm p-6 text-center">
      <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
        {avatar ? <img src={avatar} alt={displayName} className="w-full h-full object-cover" /> : null}
      </div>
      <p className="font-medium text-base mb-0.5">{displayName}</p>
      <p className="text-xs text-muted-foreground mb-2">@{username}</p>
      <Badge variant="gold" className="mb-3">{tier}</Badge>
      {bio && <p className="text-xs text-muted-foreground leading-relaxed mb-4">{bio}</p>}
      <div className="grid grid-cols-2 gap-3 text-center mb-4 border-y border-border py-3">
        <div>
          <p className="font-medium text-sm">{postCount}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Posts</p>
        </div>
        <div>
          <p className="font-medium text-sm">{joinDate}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Joined</p>
        </div>
      </div>
      <Button variant={isFollowing ? 'outline' : 'primary'} size="sm" className="w-full">
        {isFollowing ? 'Following' : 'Follow'}
      </Button>
    </div>
  )
}

// ─── MESSAGE THREAD ───────────────────────────────────────
interface MessageBubbleProps {
  content:   string
  isOwn:     boolean
  timeAgo:   string
  senderName?: string
}

export function MessageBubble({ content, isOwn, timeAgo, senderName }: MessageBubbleProps) {
  return (
    <div className={cn('flex gap-3 mb-4', isOwn && 'flex-row-reverse')}>
      <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
      <div className={cn('max-w-xs', isOwn && 'items-end flex flex-col')}>
        {!isOwn && senderName && (
          <p className="text-[10px] text-muted-foreground mb-1">{senderName}</p>
        )}
        <div className={cn(
          'px-4 py-3 text-sm rounded-sm',
          isOwn ? 'bg-foreground text-background' : 'bg-muted text-foreground',
        )}>
          {content}
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">{timeAgo}</p>
      </div>
    </div>
  )
}

export function MessagingLayout() {
  const [message, setMessage] = React.useState('')

  const CONVERSATIONS = Array.from({ length: 6 }, (_, i) => ({
    id: `conv-${i}`, name: `Member ${i + 1}`,
    preview: 'Last message preview…', timeAgo: `${i + 1}h ago`, unread: i < 2,
  }))

  const MESSAGES = [
    { id: '1', content: 'Hi! Love your content.',       isOwn: false, timeAgo: '2h ago', senderName: 'Member 1' },
    { id: '2', content: 'Thank you! More coming soon.', isOwn: true,  timeAgo: '2h ago' },
    { id: '3', content: 'Can\'t wait! When is next?',   isOwn: false, timeAgo: '1h ago', senderName: 'Member 1' },
  ]

  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-[600px] border border-border rounded-sm overflow-hidden">
      {/* Conversation list */}
      <div className="border-r border-border flex flex-col">
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Search messages…" className="w-full bg-muted pl-8 pr-3 py-2 text-xs focus:outline-none" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {CONVERSATIONS.map((conv) => (
            <button key={conv.id} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border/50 text-left">
              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-muted" />
                {conv.unread && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-foreground rounded-full border border-background" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn('text-xs font-medium truncate', conv.unread && 'font-semibold')}>{conv.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">{conv.preview}</p>
              </div>
              <p className="text-[10px] text-muted-foreground flex-shrink-0">{conv.timeAgo}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Message area */}
      <div className="flex flex-col">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <div className="w-8 h-8 rounded-full bg-muted" />
          <p className="text-sm font-medium">Member 1</p>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {MESSAGES.map((m) => <MessageBubble key={m.id} {...m} />)}
        </div>
        <div className="border-t border-border p-4 flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message…"
            className="flex-1 bg-muted px-4 py-2.5 text-sm focus:outline-none"
          />
          <Button variant="primary" size="icon" aria-label="Send">
            <Send size={14} />
          </Button>
        </div>
      </div>
    </div>
  )
}
