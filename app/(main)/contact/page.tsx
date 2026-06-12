import { PageHero } from '@/components/common'
import { Mail, MessageSquare, Briefcase, Users, Camera } from 'lucide-react'

export const metadata = { title: 'Contact' }

const CONTACT_OPTIONS = [
  { icon: MessageSquare, label: 'Support Center',       desc: 'Technical help and account issues', email: 'support@ledesir.com' },
  { icon: Briefcase,     label: 'Business Inquiries',   desc: 'General business and partnership', email: 'hello@rbmediakod.com' },
  { icon: Users,         label: 'Partnership Requests', desc: 'Brand and creator partnerships',   email: 'partnerships@rbmediakod.com' },
  { icon: Camera,        label: 'Media & Press',         desc: 'Press kits and media enquiries',  email: 'media@rbmediakod.com' },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        subtitle="Contact"
        title="Get In Touch"
        description="We are here to help. Choose the right channel below."
      />

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact options */}
            <div className="space-y-4">
              {CONTACT_OPTIONS.map(({ icon: Icon, label, desc, email }) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="flex items-start gap-4 border border-border rounded-sm p-5 hover:border-foreground/40 transition-colors group"
                >
                  <Icon size={18} className="mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium mb-0.5">{label}</p>
                    <p className="text-xs text-muted-foreground mb-1">{desc}</p>
                    <p className="text-xs text-muted-foreground">{email}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Contact form */}
            <div>
              <h2 className="text-xs tracking-widest uppercase text-muted-foreground mb-6">Send a Message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">Name</label>
                    <input type="text" name="name" className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">Email</label>
                    <input type="email" name="email" className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Subject</label>
                  <select name="subject" className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors">
                    <option value="">Select a category</option>
                    <option>Support</option>
                    <option>Business Inquiry</option>
                    <option>Partnership</option>
                    <option>Media</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Message</label>
                  <textarea name="message" rows={5} className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full py-3 bg-foreground text-background text-xs tracking-widest uppercase hover:opacity-90 transition-opacity">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
