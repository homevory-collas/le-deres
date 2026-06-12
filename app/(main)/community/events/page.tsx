// app/(main)/community/events/page.tsx
import { PageHero } from '@/components/common'
import { EventCard } from '@/components/community'
export const metadata = { title: 'Events — LE DÉSIR Society' }

const EVENTS = Array.from({ length: 6 }, (_, i) => ({
  id: `e-${i}`, title: `Community Event #${i + 1}`,
  description: 'Exclusive member event — join us for a private live session and Q&A.',
  startDate: `${20 + i} Jun 2026, 8:00 PM`, isOnline: i % 2 === 0,
  location: i % 2 !== 0 ? 'Private Discord' : undefined, attendeeCount: 140 + i * 30,
}))

export default function EventsPage() {
  return (
    <>
      <PageHero subtitle="Society" title="Upcoming Events" />
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <div className="space-y-4">
            {EVENTS.map((e) => <EventCard key={e.id} {...e} />)}
          </div>
        </div>
      </section>
    </>
  )
}
