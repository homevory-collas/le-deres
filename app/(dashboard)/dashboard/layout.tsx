// app/(dashboard)/layout.tsx
import Link from 'next/link'
import { User, ShoppingBag, Heart, Bookmark, MessageSquare, MapPin, CreditCard, Settings, Shield, Bell } from 'lucide-react'

const DASHBOARD_NAV = [
  { label: 'Profile',         href: '/dashboard',                icon: User },
  { label: 'Orders',          href: '/dashboard/orders',         icon: ShoppingBag },
  { label: 'Wishlist',        href: '/dashboard/wishlist',       icon: Heart },
  { label: 'Saved Content',   href: '/dashboard/saved',          icon: Bookmark },
  { label: 'Messages',        href: '/dashboard/messages',       icon: MessageSquare },
  { label: 'Addresses',       href: '/dashboard/addresses',      icon: MapPin },
  { label: 'Payment Methods', href: '/dashboard/payments',       icon: CreditCard },
  { label: 'Settings',        href: '/dashboard/settings',       icon: Settings },
  { label: 'Security',        href: '/dashboard/security',       icon: Shield },
  { label: 'Notifications',   href: '/dashboard/notifications',  icon: Bell },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-wide section-padding">
      <div className="grid lg:grid-cols-[240px_1fr] gap-10">

        {/* Sidebar */}
        <aside>
          {/* User summary */}
          <div className="flex items-center gap-3 mb-8 p-4 border border-border rounded-sm">
            <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">User Name</p>
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground">Gold Member</p>
            </div>
          </div>

          <nav aria-label="Dashboard navigation">
            <ul className="space-y-1">
              {DASHBOARD_NAV.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm transition-colors"
                  >
                    <Icon size={15} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main>{children}</main>
      </div>
    </div>
  )
}
