import { Bell, ShoppingBag, Heart, MessageSquare, Star } from 'lucide-react'
export const metadata = { title: 'Notifications' }
const NOTIFS = [
  { icon: ShoppingBag, text: 'Your order LD-2026001 has been delivered.',     time: '2h ago',  read: false },
  { icon: Heart,       text: 'Élise Moreau posted new exclusive content.',    time: '5h ago',  read: false },
  { icon: MessageSquare,text:'You have a new message from Viktor.',            time: '1d ago',  read: true  },
  { icon: Star,        text: 'Your Gold membership renews in 7 days.',        time: '2d ago',  read: true  },
  { icon: ShoppingBag, text: 'Order LD-2025998 shipped — tracking available.',time: '3d ago',  read: true  },
]
export default function NotificationsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-serif font-light">Notifications</h1>
        <button className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground">
          Mark all read
        </button>
      </div>
      <div className="space-y-2">
        {NOTIFS.map(({ icon: Icon, text, time, read }, i) => (
          <div key={i} className={`flex items-start gap-4 p-4 border border-border rounded-sm ${!read ? 'bg-muted/30' : ''}`}>
            <div className="w-9 h-9 border border-border rounded-sm flex items-center justify-center flex-shrink-0">
              <Icon size={16} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm">{text}</p>
              <p className="text-xs text-muted-foreground mt-1">{time}</p>
            </div>
            {!read && <span className="w-2 h-2 rounded-full bg-foreground flex-shrink-0 mt-1.5" />}
          </div>
        ))}
      </div>
    </div>
  )
}
