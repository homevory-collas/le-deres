'use client'
import * as React from 'react'
import { NotificationsList, type NotificationItem } from '@/components/community/Messaging'
import { PageHero } from '@/components/common'

const NOTIFS: NotificationItem[] = [
  { id:'1', type:'message',    title:'New message from Élise',     body:'Élise Moreau sent you a new message.',      isRead:false, time:'2 min ago',  href:'/messages/c1' },
  { id:'2', type:'content',    title:'New exclusive content',      body:'Viktor Blanc published a new video.',       isRead:false, time:'1 hour ago',  href:'/adult-ecosystem/european' },
  { id:'3', type:'order',      title:'Order delivered',             body:'Order #LD-2026001 has been delivered.',    isRead:true,  time:'3 hours ago', href:'/dashboard/orders' },
  { id:'4', type:'membership', title:'Membership renews in 7 days', body:'Your Gold membership renews 1 Jul 2026.',  isRead:true,  time:'1 day ago',   href:'/dashboard/membership' },
  { id:'5', type:'community',  title:'Group invite received',       body:'You were invited to join "Gold Lounge".',  isRead:true,  time:'2 days ago',  href:'/community/groups' },
  { id:'6', type:'system',     title:'Password changed',            body:'Your password was changed successfully.',  isRead:true,  time:'3 days ago' },
]

export default function NotificationsPage() {
  const [notifs, setNotifs] = React.useState(NOTIFS)
  const unread = notifs.filter(n => !n.isRead).length
  function markRead(id: string) { setNotifs(ns => ns.map(n => n.id === id ? {...n, isRead:true} : n)) }
  function markAll() { setNotifs(ns => ns.map(n => ({...n, isRead:true}))) }
  return (
    <>
      <PageHero subtitle="Account" title={`Notifications${unread > 0 ? ` (${unread})` : ''}`}/>
      <section className="section-padding">
        <div className="container-narrow">
          {unread > 0 && (
            <div className="flex justify-end mb-4">
              <button onClick={markAll} className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground">
                Mark all as read
              </button>
            </div>
          )}
          <NotificationsList notifications={notifs} onMarkRead={markRead}/>
          {notifs.length === 0 && <p className="text-center text-muted-foreground py-12 text-sm">No notifications.</p>}
        </div>
      </section>
    </>
  )
}
