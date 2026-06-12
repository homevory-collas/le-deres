// lib/services/notifications/index.ts
// Notification provider abstraction.
// Wire up Resend / SendGrid / OneSignal in Phase 6.

export type NotificationChannel = 'email' | 'in_app' | 'push' | 'sms'
export type NotificationCategory =
  | 'membership'    // tier changes, renewals, expiry
  | 'order'         // placed, shipped, delivered, refunded
  | 'content'       // new from followed creators
  | 'community'     // replies, mentions, group invites
  | 'creator'       // new subscriber, new tip, milestone
  | 'support'       // ticket update, resolved
  | 'security'      // login, password change
  | 'marketing'     // promotions, new features
  | 'vip'           // VIP perks, birthday rewards
  | 'system'        // platform announcements

export interface NotificationPayload {
  userId?:     string             // null for broadcast
  userIds?:    string[]           // multi-user
  category:    NotificationCategory
  title:       string
  body:        string
  href?:       string
  imageUrl?:   string
  metadata?:   Record<string, string>
  channels?:   NotificationChannel[]  // defaults to ['in_app']
  scheduledAt?: Date
}

export interface EmailTemplate {
  subject:     string
  html:        string
  text:        string
  from?:       string
  replyTo?:    string
}

export interface NotificationResult {
  success:     boolean
  channel:     NotificationChannel
  provider:    string
  messageId?:  string
  error?:      string
}

export interface EmailProvider {
  name:        string
  supported:   boolean
  send(to: string, template: EmailTemplate): Promise<NotificationResult>
  sendBulk(recipients: string[], template: EmailTemplate): Promise<NotificationResult[]>
}

export interface PushProvider {
  name:        string
  supported:   boolean
  send(userId: string, title: string, body: string, data?: Record<string, string>): Promise<NotificationResult>
  sendBulk(userIds: string[], title: string, body: string): Promise<NotificationResult[]>
  subscribeUser(userId: string, token: string): Promise<void>
}

// ─── Email providers ──────────────────────────────────────
class MockEmailProvider implements EmailProvider {
  name      = 'mock'
  supported = false
  async send(to: string, template: EmailTemplate): Promise<NotificationResult> {
    console.log(`[MockEmail] → ${to}: ${template.subject}`)
    return { success: true, channel: 'email', provider: this.name, messageId: `mock_${Date.now()}` }
  }
  async sendBulk(recipients: string[], template: EmailTemplate) {
    return recipients.map(to => ({ success: true, channel: 'email' as const, provider: this.name }))
  }
}

export class ResendProvider extends MockEmailProvider {
  name = 'resend'
  // TODO: npm install resend
  // TODO: RESEND_API_KEY in .env
  // TODO: import { Resend } from 'resend'
}

export class SendGridProvider extends MockEmailProvider {
  name = 'sendgrid'
  // TODO: npm install @sendgrid/mail
  // TODO: SENDGRID_API_KEY in .env
}

export class PostmarkProvider extends MockEmailProvider {
  name = 'postmark'
  // TODO: npm install postmark
  // TODO: POSTMARK_API_TOKEN in .env
}

// ─── Push providers ───────────────────────────────────────
class MockPushProvider implements PushProvider {
  name      = 'mock'
  supported = false
  async send(userId: string, title: string, body: string): Promise<NotificationResult> {
    console.log(`[MockPush] → ${userId}: ${title}`)
    return { success: true, channel: 'push', provider: this.name }
  }
  async sendBulk(userIds: string[], title: string, body: string) {
    return userIds.map(() => ({ success: true, channel: 'push' as const, provider: this.name }))
  }
  async subscribeUser() {}
}

export class OneSignalProvider extends MockPushProvider {
  name = 'onesignal'
  // TODO: npm install onesignal-node
  // TODO: ONESIGNAL_APP_ID, ONESIGNAL_API_KEY in .env
}

// ─── Email templates ──────────────────────────────────────
export const EMAIL_TEMPLATES = {
  welcome: (name: string): EmailTemplate => ({
    subject: `Welcome to LE DÉSIR, ${name}`,
    html: `<h1>Welcome to LE DÉSIR</h1><p>Your exclusive experience begins now.</p>`,
    text: `Welcome to LE DÉSIR. Your exclusive experience begins now.`,
  }),
  membershipUpgrade: (name: string, tier: string): EmailTemplate => ({
    subject: `Your membership has been upgraded to ${tier}`,
    html: `<h1>Membership Upgraded</h1><p>Congratulations ${name}, you are now a ${tier} member.</p>`,
    text: `Congratulations ${name}, you are now a ${tier} member.`,
  }),
  orderConfirmation: (orderId: string): EmailTemplate => ({
    subject: `Order Confirmed — ${orderId}`,
    html: `<h1>Order Confirmed</h1><p>Your order ${orderId} has been confirmed.</p>`,
    text: `Your order ${orderId} has been confirmed.`,
  }),
  orderShipped: (orderId: string, trackingCode: string): EmailTemplate => ({
    subject: `Your order ${orderId} has shipped`,
    html: `<h1>Order Shipped</h1><p>Tracking: ${trackingCode}</p>`,
    text: `Your order has shipped. Tracking: ${trackingCode}`,
  }),
  passwordChanged: (): EmailTemplate => ({
    subject: 'Your LE DÉSIR password was changed',
    html: '<h1>Password Changed</h1><p>Your password was successfully updated.</p>',
    text: 'Your password was successfully updated.',
  }),
  ticketResolved: (ticketId: string): EmailTemplate => ({
    subject: `Support Ticket ${ticketId} Resolved`,
    html: `<h1>Ticket Resolved</h1><p>Your support ticket ${ticketId} has been resolved.</p>`,
    text: `Your support ticket ${ticketId} has been resolved.`,
  }),
  birthdayReward: (name: string, reward: string): EmailTemplate => ({
    subject: `Happy Birthday from LE DÉSIR 🎂`,
    html: `<h1>Happy Birthday, ${name}!</h1><p>Your gift: ${reward}</p>`,
    text: `Happy Birthday ${name}! Your gift: ${reward}`,
  }),
}

// ─── Notification Service ─────────────────────────────────
export class NotificationService {
  private email: EmailProvider
  private push:  PushProvider

  constructor() {
    this.email = this.createEmailProvider()
    this.push  = new MockPushProvider()
  }

  private createEmailProvider(): EmailProvider {
    switch (process.env.EMAIL_PROVIDER) {
      case 'resend':    return new ResendProvider()
      case 'sendgrid':  return new SendGridProvider()
      case 'postmark':  return new PostmarkProvider()
      default:          return new MockEmailProvider()
    }
  }

  async sendEmail(to: string, template: EmailTemplate): Promise<NotificationResult> {
    return this.email.send(to, template)
  }

  async sendPush(userId: string, title: string, body: string): Promise<NotificationResult> {
    return this.push.send(userId, title, body)
  }

  async notify(payload: NotificationPayload): Promise<NotificationResult[]> {
    const channels  = payload.channels ?? ['in_app']
    const results:  NotificationResult[] = []

    for (const channel of channels) {
      if (channel === 'in_app') {
        // TODO: save to DB notifications table via Prisma
        results.push({ success: true, channel, provider: 'database' })
      }
      if (channel === 'email' && payload.userId) {
        // TODO: look up user email, send template
        results.push({ success: false, channel, provider: this.email.name, error: 'Not connected' })
      }
      if (channel === 'push' && payload.userId) {
        const r = await this.push.send(payload.userId, payload.title, payload.body)
        results.push(r)
      }
    }

    return results
  }
}

export const notificationService = new NotificationService()

// ─── User notification preferences ───────────────────────
export interface NotificationPreferences {
  email: Record<NotificationCategory, boolean>
  push:  Record<NotificationCategory, boolean>
}

export const DEFAULT_NOTIFICATION_PREFS: NotificationPreferences = {
  email: {
    membership: true, order: true, content: false, community: false,
    creator: true, support: true, security: true, marketing: false,
    vip: true, system: true,
  },
  push: {
    membership: true, order: true, content: true, community: true,
    creator: true, support: true, security: true, marketing: false,
    vip: true, system: false,
  },
}
