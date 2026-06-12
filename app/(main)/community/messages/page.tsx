import { PageHero } from '@/components/common'
import { MessagingLayout } from '@/components/community'
export const metadata = { title: 'Messages' }
export default function MessagesPage() {
  return (
    <>
      <PageHero subtitle="Society" title="Messages" />
      <section className="section-padding">
        <div className="container-wide max-w-5xl">
          <MessagingLayout />
        </div>
      </section>
    </>
  )
}
