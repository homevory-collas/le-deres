'use client'

import * as React from 'react'
import {
  Settings, Globe, CreditCard, ShoppingBag, Users,
  MessageSquare, Star, DollarSign, Cpu, Radio,
  Save, RefreshCw, AlertTriangle, Check,
} from 'lucide-react'
import { AdminPageHeader, AdminCard, AdminBtn, FormField, AdminInput, AdminTextarea, AdminSelect } from '@/components/admin/shared'
import { Tabs } from '@/components/ui'
import { cn } from '@/lib/utils'

const SETTINGS_TABS = [
  { id: 'general',    label: 'General' },
  { id: 'branding',   label: 'Branding' },
  { id: 'languages',  label: 'Languages' },
  { id: 'membership', label: 'Membership' },
  { id: 'marketplace',label: 'Marketplace' },
  { id: 'community',  label: 'Community' },
  { id: 'creator',    label: 'Creator' },
  { id: 'payments',   label: 'Payments' },
  { id: 'ai',         label: 'AI' },
  { id: 'streaming',  label: 'Live Stream' },
]

// ─── Toggle component ─────────────────────────────────────
function Toggle({ label, description, defaultChecked }: { label: string; description?: string; defaultChecked?: boolean }) {
  const [on, setOn] = React.useState(defaultChecked ?? false)
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-0">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => setOn(!on)}
        className={cn('relative w-10 h-5 rounded-full transition-colors flex-shrink-0 mt-0.5', on ? 'bg-foreground' : 'bg-muted border border-border')}
      >
        <span className={cn('absolute top-0.5 w-4 h-4 rounded-full bg-background shadow transition-transform', on ? 'translate-x-5' : 'translate-x-0.5')} />
      </button>
    </div>
  )
}

// ─── Settings sections ────────────────────────────────────
function GeneralSettings() {
  return (
    <div className="space-y-5">
      <AdminCard title="Site Information">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Site Name"><AdminInput defaultValue="LE DÉSIR" /></FormField>
          <FormField label="Site URL"><AdminInput defaultValue="https://ledesir.com" /></FormField>
          <FormField label="Support Email"><AdminInput defaultValue="support@ledesir.com" /></FormField>
          <FormField label="Contact Email"><AdminInput defaultValue="hello@rbmediakod.com" /></FormField>
          <FormField label="Default Currency">
            <AdminSelect options={[{value:'EUR',label:'Euro (€)'},{value:'USD',label:'US Dollar ($)'},{value:'GBP',label:'British Pound (£)'}]} defaultValue="EUR" />
          </FormField>
          <FormField label="Default Language">
            <AdminSelect options={[{value:'en-US',label:'English (US)'},{value:'fr-FR',label:'Français'},{value:'de-DE',label:'Deutsch'}]} defaultValue="en-US" />
          </FormField>
        </div>
        <FormField label="Site Description" className="mt-4">
          <AdminTextarea rows={2} defaultValue="LE DÉSIR — Private. Elegant. Personal. Premium adult content and lifestyle platform." />
        </FormField>
      </AdminCard>

      <AdminCard title="Platform Status">
        <Toggle label="Maintenance Mode" description="Redirect all visitors to a maintenance page" />
        <Toggle label="Registration Open" description="Allow new user registrations" defaultChecked />
        <Toggle label="Age Verification Required" description="Require age verification before accessing adult content" defaultChecked />
        <Toggle label="Two-Factor Auth (2FA)" description="Require 2FA for admin accounts" />
        <Toggle label="API Access" description="Allow external API access" defaultChecked />
      </AdminCard>

      <div className="flex gap-2">
        <AdminBtn variant="primary" size="md"><Save size={13} /> Save General Settings</AdminBtn>
        <AdminBtn variant="outline" size="md"><RefreshCw size={13} /> Reset to Defaults</AdminBtn>
      </div>
    </div>
  )
}

function BrandingSettings() {
  return (
    <div className="space-y-5">
      <AdminCard title="Brand Identity">
        <div className="grid grid-cols-2 gap-5 mb-5">
          {[{ label: 'Logo (Light)', hint: 'SVG or PNG, transparent bg' }, { label: 'Logo (Dark)', hint: 'SVG or PNG, white version' }].map(l => (
            <FormField key={l.label} label={l.label} hint={l.hint}>
              <div className="border border-dashed border-border p-6 text-center hover:border-foreground/40 transition-colors cursor-pointer">
                <p className="text-xs text-muted-foreground">Click to upload</p>
              </div>
            </FormField>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Brand Gold" hint="Primary accent color">
            <AdminInput defaultValue="#D4AF37" />
          </FormField>
          <FormField label="Brand Black" hint="Primary background">
            <AdminInput defaultValue="#080808" />
          </FormField>
          <FormField label="Brand Rose" hint="Secondary accent">
            <AdminInput defaultValue="#B76E79" />
          </FormField>
        </div>
      </AdminCard>
      <AdminCard title="Typography">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Display Font">
            <AdminSelect options={[{value:'cormorant',label:'Cormorant Garamond'},{value:'playfair',label:'Playfair Display'},{value:'georgia',label:'Georgia'}]} defaultValue="cormorant" />
          </FormField>
          <FormField label="Body Font">
            <AdminSelect options={[{value:'montserrat',label:'Montserrat'},{value:'inter',label:'Inter'},{value:'system',label:'System UI'}]} defaultValue="montserrat" />
          </FormField>
        </div>
      </AdminCard>
      <AdminBtn variant="primary" size="md"><Save size={13} /> Save Branding</AdminBtn>
    </div>
  )
}

function MembershipSettings() {
  return (
    <div className="space-y-5">
      <AdminCard title="Plan Pricing">
        <div className="space-y-4">
          {[
            { label: 'Silver', price: '19.99' },
            { label: 'Gold',   price: '39.99' },
            { label: 'Black VIP', price: '79.99' },
          ].map(plan => (
            <div key={plan.label} className="flex items-center gap-4">
              <span className="text-sm font-medium w-24">{plan.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">€</span>
                <AdminInput defaultValue={plan.price} type="number" className="w-28" />
                <span className="text-muted-foreground text-xs">/month</span>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
      <AdminCard title="Membership Controls">
        <Toggle label="Free Tier Enabled" description="Allow free membership registration" defaultChecked />
        <Toggle label="Annual Discount"   description="Offer discounted annual plans (2 months free)" defaultChecked />
        <Toggle label="Trial Period"      description="Allow 7-day trial for new paid members" />
        <Toggle label="Gifting"           description="Allow members to gift memberships" />
        <Toggle label="Family Plans"      description="Enable family plan pricing (Phase 6)" />
      </AdminCard>
      <AdminBtn variant="primary" size="md"><Save size={13} /> Save Membership Settings</AdminBtn>
    </div>
  )
}

function PaymentSettings() {
  return (
    <div className="space-y-5">
      <AdminCard title="Payment Providers">
        {[
          { name: 'PayPal',     key: 'paypal',     configured: false },
          { name: 'Stripe',     key: 'stripe',     configured: false },
          { name: 'USDT',       key: 'usdt',       configured: false },
          { name: 'USDC',       key: 'usdc',       configured: false },
        ].map(provider => (
          <div key={provider.key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
            <div>
              <p className="text-sm font-medium">{provider.name}</p>
              <p className="text-xs text-muted-foreground">{provider.configured ? 'Connected' : 'Not configured'}</p>
            </div>
            <AdminBtn variant={provider.configured ? 'outline' : 'primary'} size="sm">
              {provider.configured ? 'Manage' : 'Connect'}
            </AdminBtn>
          </div>
        ))}
      </AdminCard>
      <AdminCard title="Payment Options">
        <Toggle label="Sandbox Mode"          description="Use test/sandbox payment environments" defaultChecked />
        <Toggle label="Discreet Billing"      description="Use discreet merchant name on statements" defaultChecked />
        <Toggle label="Save Payment Methods"  description="Allow users to save payment methods" defaultChecked />
        <Toggle label="Auto-Retry Failed Payments" description="Retry failed subscription payments up to 3 times" defaultChecked />
      </AdminCard>
      <AdminBtn variant="primary" size="md"><Save size={13} /> Save Payment Settings</AdminBtn>
    </div>
  )
}

function AISettings() {
  return (
    <div className="space-y-5">
      <AdminCard title="AI Provider">
        <FormField label="Active Provider">
          <AdminSelect
            options={[
              { value: 'mock',      label: 'Mock (Development)' },
              { value: 'anthropic', label: 'Anthropic Claude' },
              { value: 'openai',    label: 'OpenAI GPT' },
              { value: 'gemini',    label: 'Google Gemini' },
            ]}
            defaultValue="mock"
          />
        </FormField>
        <FormField label="API Key" hint="Leave blank to use environment variable" className="mt-4">
          <AdminInput type="password" placeholder="sk-..." />
        </FormField>
      </AdminCard>
      <AdminCard title="AI Companion Settings">
        <Toggle label="AI Companion Enabled"     description="Enable AI girlfriend/companion feature" />
        <Toggle label="Voice Support"            description="Enable voice synthesis for AI companions (Phase 6)" />
        <Toggle label="Memory Persistence"       description="Store conversation memory between sessions" />
        <Toggle label="Content Moderation"       description="Auto-moderate AI responses for safety" defaultChecked />
        <Toggle label="Multi-language Support"   description="Enable AI responses in user's preferred language" defaultChecked />
      </AdminCard>
      <AdminBtn variant="primary" size="md"><Save size={13} /> Save AI Settings</AdminBtn>
    </div>
  )
}

function StreamingSettings() {
  return (
    <div className="space-y-5">
      <AdminCard title="Streaming Provider">
        <FormField label="Active Provider">
          <AdminSelect
            options={[
              { value: 'mock',    label: 'Mock (Development)' },
              { value: 'livekit', label: 'LiveKit' },
              { value: 'agora',   label: 'Agora' },
              { value: 'twilio',  label: 'Twilio Video' },
            ]}
            defaultValue="mock"
          />
        </FormField>
      </AdminCard>
      <AdminCard title="Streaming Controls">
        <Toggle label="Live Shows Enabled"     description="Enable live streaming platform-wide" />
        <Toggle label="Public Rooms"           description="Allow public (free) live rooms" defaultChecked />
        <Toggle label="Private Rooms"          description="Allow private ticketed rooms" defaultChecked />
        <Toggle label="VIP Rooms"              description="Enable VIP-only live rooms" defaultChecked />
        <Toggle label="Virtual Gifts"          description="Enable virtual gift-sending during streams" />
        <Toggle label="Tipping"                description="Enable tip system for creators" />
        <Toggle label="Stream Recording"       description="Allow creators to record their streams" />
        <Toggle label="Chat Moderation"        description="Auto-moderate live chat messages" defaultChecked />
      </AdminCard>
      <AdminBtn variant="primary" size="md"><Save size={13} /> Save Streaming Settings</AdminBtn>
    </div>
  )
}

// ─── Main Settings Page ───────────────────────────────────
export function AdminSettingsPage() {
  const [activeTab, setActiveTab] = React.useState('general')

  const tabContent: Record<string, React.ReactNode> = {
    general:     <GeneralSettings />,
    branding:    <BrandingSettings />,
    membership:  <MembershipSettings />,
    payments:    <PaymentSettings />,
    ai:          <AISettings />,
    streaming:   <StreamingSettings />,
    languages:   (
      <AdminCard title="Language Settings">
        <p className="text-sm text-muted-foreground mb-4">Manage available languages and translation settings. The full language system is configured in <code className="bg-muted px-1 text-xs">lib/i18n/config.ts</code>.</p>
        <Toggle label="Auto-detect Browser Language" description="Redirect users to their browser language" defaultChecked />
        <Toggle label="Language Switcher in Header"  description="Show language globe icon in navigation" defaultChecked />
        <Toggle label="RTL Language Support"         description="Enable right-to-left layout for RTL languages" />
      </AdminCard>
    ),
    marketplace: (
      <AdminCard title="Marketplace Settings">
        <Toggle label="Marketplace Enabled"        description="Enable the marketplace module" defaultChecked />
        <Toggle label="Discreet Packaging Default" description="Default all orders to discreet packaging" defaultChecked />
        <Toggle label="Guest Checkout"             description="Allow purchases without account" />
        <Toggle label="Wishlist Feature"           description="Enable product wishlist" defaultChecked />
        <Toggle label="Product Reviews"            description="Allow customers to leave product reviews" defaultChecked />
        <Toggle label="Stock Notifications"        description="Email users when wishlist items restock" defaultChecked />
      </AdminCard>
    ),
    community: (
      <AdminCard title="Community Settings">
        <Toggle label="Community Enabled"          description="Enable the LE DÉSIR Society" defaultChecked />
        <Toggle label="Post Approval Required"     description="Require admin approval for new posts" />
        <Toggle label="AI Content Moderation"      description="Auto-moderate posts with AI" defaultChecked />
        <Toggle label="VIP-Only Groups"            description="Allow creation of VIP-only groups" defaultChecked />
        <Toggle label="Private Messaging"          description="Enable direct messaging between users" defaultChecked />
        <Toggle label="Events Feature"             description="Enable community events" defaultChecked />
      </AdminCard>
    ),
    creator: (
      <AdminCard title="Creator Settings">
        <Toggle label="Creator Program Enabled"    description="Allow creator applications" defaultChecked />
        <Toggle label="Creator Verification"       description="Require manual verification of new creators" defaultChecked />
        <Toggle label="Revenue Sharing"            description="Enable creator revenue sharing" defaultChecked />
        <Toggle label="Creator Messaging"          description="Allow creators to message subscribers" defaultChecked />
        <Toggle label="Exclusive Memberships"      description="Allow creators to create their own tiers" />
      </AdminCard>
    ),
  }

  return (
    <div>
      <AdminPageHeader
        title="Settings Center"
        description="Platform-wide configuration"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Settings' }]}
      />
      <Tabs tabs={SETTINGS_TABS} active={activeTab} onChange={setActiveTab} variant="pill" className="mb-6 flex-wrap" />
      {tabContent[activeTab] ?? <div className="text-muted-foreground text-sm">Settings for this section coming soon.</div>}
    </div>
  )
}
