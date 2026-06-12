// app/(dashboard)/dashboard/page.tsx — Profile overview
export const metadata = { title: 'My Dashboard' }

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-serif font-light mb-8">My Profile</h1>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Orders',    value: '12' },
          { label: 'Wishlist',  value: '24' },
          { label: 'Points',    value: '2,450' },
        ].map((stat) => (
          <div key={stat.label} className="border border-border rounded-sm p-5 text-center">
            <p className="text-2xl font-serif font-light mb-1">{stat.value}</p>
            <p className="text-xs tracking-widest uppercase text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Membership status */}
      <div className="border border-border rounded-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Current Membership</p>
            <p className="text-xl font-serif font-light">Gold Member</p>
          </div>
          <span className="text-xs px-3 py-1.5 border border-border">Active</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Renews on <strong className="text-foreground">1 August 2026</strong>
        </div>
      </div>

      {/* Profile form */}
      <h2 className="text-sm font-medium tracking-widest uppercase mb-6">Edit Profile</h2>
      <div className="grid grid-cols-2 gap-4 max-w-lg">
        {[
          { label: 'Display Name', name: 'displayName' },
          { label: 'Username',     name: 'username' },
          { label: 'Email',        name: 'email' },
          { label: 'Location',     name: 'location' },
        ].map((field) => (
          <div key={field.name} className="col-span-2 md:col-span-1">
            <label className="block text-xs text-muted-foreground mb-1">{field.label}</label>
            <input
              type="text"
              name={field.name}
              className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
        ))}
        <div className="col-span-2">
          <label className="block text-xs text-muted-foreground mb-1">Bio</label>
          <textarea
            name="bio"
            rows={3}
            className="w-full border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-foreground transition-colors resize-none"
          />
        </div>
        <div className="col-span-2">
          <button className="px-8 py-2.5 bg-foreground text-background text-xs tracking-widest uppercase hover:opacity-90 transition-opacity">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
