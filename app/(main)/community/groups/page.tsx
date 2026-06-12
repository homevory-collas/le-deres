// app/(main)/community/groups/page.tsx
import { PageHero } from '@/components/common'
import { GroupCard } from '@/components/community'
export const metadata = { title: 'Groups — LE DÉSIR Society' }

const GROUPS = Array.from({ length: 9 }, (_, i) => ({
  id: `g-${i}`, name: `Group ${i + 1}`, slug: `group-${i + 1}`,
  description: 'An exclusive community group for like-minded members. Join to unlock group content and private discussions.',
  memberCount: Math.floor(Math.random() * 5000) + 100,
  isPrivate: i % 3 === 0, isMember: i < 2,
}))

export default function GroupsPage() {
  return (
    <>
      <PageHero subtitle="LE DÉSIR Society" title="Groups" description="Join exclusive groups and connect with like-minded members." />
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GROUPS.map((g) => <GroupCard key={g.id} {...g} />)}
          </div>
        </div>
      </section>
    </>
  )
}
