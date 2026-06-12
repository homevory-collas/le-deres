'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, CreditCard, ShoppingBag,
  FileVideo, MessageSquare, Settings, LogOut,
  BarChart3, Shield, Image, ChevronDown,
  Bell, Search, Package, Tag,
  Truck, RotateCcw, Star, Gift, Percent,
  Eye, Flag, HelpCircle, Hash, Globe,
  DollarSign, Activity, HardDrive,
} from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { cn } from '@/lib/utils'

interface NavItem {
  label:     string
  href:      string
  icon:      React.ElementType
  badge?:    string | number
  children?: NavItem[]
}

interface NavGroup { label: string; items: NavItem[] }

const NAV_GROUPS: NavGroup[] = [
  { label: 'Overview', items: [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Analytics', href: '/admin/analytics', icon: BarChart3, children: [
      { label: 'Users',       href: '/admin/analytics/users',       icon: Users },
      { label: 'Traffic',     href: '/admin/analytics/traffic',     icon: Activity },
      { label: 'Revenue',     href: '/admin/analytics/revenue',     icon: DollarSign },
      { label: 'Marketplace', href: '/admin/analytics/marketplace', icon: ShoppingBag },
      { label: 'Membership',  href: '/admin/analytics/membership',  icon: CreditCard },
      { label: 'Content',     href: '/admin/analytics/content',     icon: FileVideo },
      { label: 'Community',   href: '/admin/analytics/community',   icon: MessageSquare },
    ]},
  ]},
  { label: 'Users', items: [
    { label: 'All Users',   href: '/admin/users',       icon: Users, badge: '48K' },
    { label: 'Memberships', href: '/admin/membership',  icon: CreditCard, children: [
      { label: 'VIP Tiers',  href: '/admin/membership/vip',       icon: Star },
      { label: 'Benefits',   href: '/admin/membership/benefits',   icon: Gift },
      { label: 'Discounts',  href: '/admin/membership/discounts',  icon: Percent },
      { label: 'Referrals',  href: '/admin/membership/referrals',  icon: Users },
      { label: 'Birthday',   href: '/admin/membership/birthday',   icon: Gift },
    ]},
    { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
    { label: 'Support',  href: '/admin/support',  icon: HelpCircle, badge: 12 },
  ]},
  { label: 'Content', items: [
    { label: 'Content Library', href: '/admin/content', icon: FileVideo, children: [
      { label: 'All Content',  href: '/admin/content',            icon: FileVideo },
      { label: 'Add New',      href: '/admin/content/new',        icon: FileVideo },
      { label: 'Categories',   href: '/admin/content/categories', icon: Hash },
    ]},
    { label: 'Media Library', href: '/admin/media', icon: Image, children: [
      { label: 'Images',    href: '/admin/media/images',    icon: Image },
      { label: 'Videos',    href: '/admin/media/videos',    icon: FileVideo },
      { label: 'Documents', href: '/admin/media/documents', icon: HardDrive },
    ]},
  ]},
  { label: 'Commerce', items: [
    { label: 'Marketplace', href: '/admin/marketplace', icon: ShoppingBag, children: [
      { label: 'Products',   href: '/admin/marketplace/products',   icon: Package },
      { label: 'Categories', href: '/admin/marketplace/categories', icon: Tag },
      { label: 'Brands',     href: '/admin/marketplace/brands',     icon: Star },
      { label: 'Inventory',  href: '/admin/marketplace/inventory',  icon: Package },
      { label: 'Coupons',    href: '/admin/marketplace/coupons',    icon: Percent },
      { label: 'Shipping',   href: '/admin/marketplace/shipping',   icon: Truck },
    ]},
    { label: 'Orders',  href: '/admin/marketplace/orders',  icon: ShoppingBag, badge: 24 },
    { label: 'Refunds', href: '/admin/marketplace/refunds', icon: RotateCcw,   badge: 5 },
  ]},
  { label: 'Moderation', items: [
    { label: 'Review Queue',  href: '/admin/moderation/queue',   icon: Eye,    badge: 8 },
    { label: 'Reports',       href: '/admin/moderation/reports', icon: Flag,   badge: 14 },
    { label: 'Content Review',href: '/admin/moderation/content', icon: Shield },
    { label: 'Community',     href: '/admin/community',          icon: MessageSquare },
  ]},
  { label: 'System', items: [
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ]},
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname()
  const [open, setOpen] = React.useState<Record<string, boolean>>({})

  function toggle(href: string) { setOpen(o => ({ ...o, [href]: !o[href] })) }
  function active(href: string) { return href === '/admin' ? pathname === href : pathname.startsWith(href) }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-56 border-r border-border flex flex-col fixed inset-y-0 left-0 z-40 bg-background overflow-hidden">
        <div className="px-4 py-4 border-b border-border flex-shrink-0">
          <Link href="/admin"><Logo size="sm" /></Link>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] tracking-widest uppercase text-muted-foreground">Admin Console</span>
            <span className="text-[8px] px-1.5 py-0.5 bg-yellow-500/20 text-yellow-500 border border-yellow-500/20">Dev</span>
          </div>
        </div>
        <nav className="flex-1 py-3 px-2 space-y-4 overflow-y-auto">
          {NAV_GROUPS.map(g => (
            <div key={g.label}>
              <p className="text-[8px] tracking-widest uppercase text-muted-foreground/40 px-2 mb-1">{g.label}</p>
              <ul className="space-y-0.5">
                {g.items.map(item => <NavRow key={item.href} item={item} active={active} open={open} toggle={toggle} depth={0} />)}
              </ul>
            </div>
          ))}
        </nav>
        <div className="flex-shrink-0 border-t border-border px-2 py-3 space-y-0.5">
          <Link href="/" target="_blank" className="flex items-center gap-2.5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <Globe size={13} /> View Site
          </Link>
          <button className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col ml-56 min-h-screen">
        <header className="h-12 border-b border-border px-6 flex items-center justify-between bg-background sticky top-0 z-30 flex-shrink-0">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="search" placeholder="Search…" className="bg-muted border border-border pl-8 pr-4 py-1.5 text-xs w-52 focus:outline-none focus:border-foreground" />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-muted-foreground hover:text-foreground">
              <Bell size={15} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-muted border border-border flex items-center justify-center text-xs">A</div>
              <div>
                <p className="text-xs font-medium leading-none">Admin</p>
                <p className="text-[9px] text-muted-foreground">admin@ledesir.com</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

function NavRow({ item, active, open, toggle, depth }: {
  item: NavItem; active: (h: string) => boolean
  open: Record<string, boolean>; toggle: (h: string) => void; depth: number
}) {
  const isActive = active(item.href)
  const hasKids  = !!item.children?.length
  const isOpen   = hasKids && open[item.href]
  const Icon     = item.icon
  return (
    <li>
      <div
        onClick={() => hasKids && toggle(item.href)}
        className={cn(
          'flex items-center gap-2 px-2.5 py-1.5 text-xs transition-colors cursor-pointer',
          depth > 0 && 'pl-5',
          isActive ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        )}
      >
        {hasKids ? (
          <span className="flex items-center gap-2 flex-1 min-w-0">
            <Icon size={12} className="flex-shrink-0" />
            <span className="truncate">{item.label}</span>
          </span>
        ) : (
          <Link href={item.href} className="flex items-center gap-2 flex-1 min-w-0">
            <Icon size={12} className="flex-shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        )}
        {item.badge !== undefined && (
          <span className={cn('text-[8px] px-1 py-0.5 min-w-[16px] text-center', isActive ? 'bg-background/20 text-background' : 'bg-muted text-muted-foreground')}>
            {item.badge}
          </span>
        )}
        {hasKids && <ChevronDown size={10} className={cn('flex-shrink-0 transition-transform', !isOpen && '-rotate-90')} />}
      </div>
      {hasKids && isOpen && (
        <ul className="space-y-0.5 border-l border-border ml-4 pl-1 mt-0.5 mb-1">
          {item.children!.map(c => <NavRow key={c.href} item={c} active={active} open={open} toggle={toggle} depth={depth+1} />)}
        </ul>
      )}
    </li>
  )
}
