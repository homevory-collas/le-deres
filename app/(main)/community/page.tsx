// app/(main)/community/page.tsx — Community Hub
import Link from 'next/link'
import { Users, MessageSquare, Calendar, TrendingUp } from 'lucide-react'
import { PageHero } from '@/components/common'

export const metadata = { title: 'LE DÉSIR Society' }

const COMMUNITY_SECTIONS = [
  { label: 'Feed',        href: '/community/feed',        icon: TrendingUp,    desc: 'Latest from the community' },
  { label: 'Groups',      href: '/community/groups',      icon: Users,         desc: 'Join exclusive groups' },
  { label: 'Discussions', href: '/community/discussions', icon: MessageSquare, desc: 'Deep-dive conversations' },
  { label: 'Events',      href: '/community/events',      icon: Calendar,      desc: 'Upcoming experiences' },
]

export default function CommunityPage() {
  return (
    <>
      <PageHero
        subtitle="LE DÉSIR Society"
        title="Community"
        description="Connect, share and grow with a curated community of like-minded individuals."
      />

      {/* Quick links */}
      <section className="section-padding border-b border-border">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {COMMUNITY_SECTIONS.map(({ label, href, icon: Icon, desc }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col items-center text-center border border-border rounded-sm p-6 hover:border-foreground/40 transition-colors"
              >
                <Icon size={24} className="mb-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                <p className="font-medium text-sm mb-1">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Feed preview */}
      <section className="section-padding">
        <div className="container-narrow">
          {/* Post composer placeholder */}
          <div className="border border-border rounded-sm p-4 mb-8">
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-muted flex-shrink-0" />
              <button className="flex-1 text-left px-4 py-2 bg-muted rounded-sm text-sm text-muted-foreground hover:bg-muted/70 transition-colors">
                Share something with the community…
              </button>
            </div>
          </div>

          {/* Sample posts */}
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <article key={i} className="border border-border rounded-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-muted flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Member #{i + 1}</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  {i === 0 && (
                    <span className="ml-auto text-[10px] px-2 py-0.5 border border-border text-muted-foreground">
                      Gold Member
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Community post placeholder #{i + 1} — content will be loaded from database in Phase 2.
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <button className="hover:text-foreground">♥ {12 + i * 7} Likes</button>
                  <button className="hover:text-foreground">💬 {3 + i * 2} Comments</button>
                  <button className="hover:text-foreground">↗ Share</button>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="px-10 py-3 border border-border text-xs tracking-widest uppercase hover:border-foreground transition-colors">
              Load More
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
