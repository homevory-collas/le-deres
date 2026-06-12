'use client'
import { useState } from 'react'
import { Input, Checkbox, FormSection } from '@/components/ui/Form'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui'
export const metadata = { title: 'Settings' }

const TABS = [
  { id: 'profile',  label: 'Profile' },
  { id: 'security', label: 'Security' },
  { id: 'notifs',   label: 'Notifications' },
  { id: 'privacy',  label: 'Privacy' },
]

export default function SettingsPage() {
  const [tab, setTab] = useState('profile')
  return (
    <div>
      <h1 className="text-2xl font-serif font-light mb-8">Settings</h1>
      <Tabs tabs={TABS} active={tab} onChange={setTab} className="mb-8" />

      {tab === 'profile' && (
        <div className="max-w-lg space-y-6">
          <FormSection title="Personal Information">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Display Name" defaultValue="User Name" />
              <Input label="Username"     defaultValue="username" />
            </div>
            <Input label="Email" type="email" defaultValue="user@email.com" />
            <Input label="Location" placeholder="City, Country" />
          </FormSection>
          <FormSection title="Social Links">
            <Input label="Telegram"  placeholder="@handle" leftIcon={<span className="text-xs">TG</span>} />
            <Input label="Instagram" placeholder="@handle" leftIcon={<span className="text-xs">IG</span>} />
          </FormSection>
          <Button variant="primary">Save Changes</Button>
        </div>
      )}

      {tab === 'security' && (
        <div className="max-w-lg space-y-6">
          <FormSection title="Change Password">
            <Input label="Current Password" type="password" />
            <Input label="New Password"     type="password" />
            <Input label="Confirm Password" type="password" />
            <Button variant="primary">Update Password</Button>
          </FormSection>
          <FormSection title="Two-Factor Authentication" description="Add an extra layer of security to your account.">
            <div className="flex items-center justify-between py-3 border border-border px-4">
              <div>
                <p className="text-sm font-medium">Authenticator App</p>
                <p className="text-xs text-muted-foreground">Use an authenticator app to generate codes</p>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
          </FormSection>
          <FormSection title="Danger Zone">
            <div className="border border-destructive/30 p-4">
              <p className="text-sm font-medium text-destructive mb-1">Delete Account</p>
              <p className="text-xs text-muted-foreground mb-3">This action is permanent and cannot be undone.</p>
              <Button variant="danger" size="sm">Request Deletion</Button>
            </div>
          </FormSection>
        </div>
      )}

      {tab === 'notifs' && (
        <div className="max-w-lg">
          <FormSection title="Email Notifications">
            <div className="space-y-4">
              {['New content from followed creators', 'Order updates', 'Community replies', 'Membership renewals', 'Promotions & offers'].map((label) => (
                <Checkbox key={label} label={label} defaultChecked />
              ))}
            </div>
          </FormSection>
        </div>
      )}

      {tab === 'privacy' && (
        <div className="max-w-lg">
          <FormSection title="Privacy Settings">
            <div className="space-y-4">
              {[
                { label: 'Show profile in community search', checked: true },
                { label: 'Allow direct messages from all members', checked: false },
                { label: 'Share activity with followed creators', checked: true },
              ].map(({ label, checked }) => (
                <Checkbox key={label} label={label} defaultChecked={checked} />
              ))}
            </div>
          </FormSection>
        </div>
      )}
    </div>
  )
}
