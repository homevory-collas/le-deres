// services/notifications/orchestrator.ts
// Unified notification service — routes to email, push, and in-app channels.

import { createEmailAdapter }        from './providers/email'
import { createPushAdapter }          from './providers/push'
import { EmailTemplates, type TemplateKey } from './templates'
import type { NotificationCategory } from '../../lib/services/notifications/index'

export interface SendNotificationParams {
  // Targeting
  userId?:     string
  userEmail?:  string
  userIds?:    string[]
  // Content
  title:       string
  body:        string
  category:    NotificationCategory
  href?:       string
  // Channels
  sendEmail?:  boolean
  sendPush?:   boolean
  sendInApp?:  boolean              // always true unless explicitly false
  // Email-specific
  emailTemplate?:  TemplateKey
  emailParams?:    Record<string, unknown>
  // Push-specific
  imageUrl?:   string
  data?:       Record<string, string>
}

export interface NotificationResult {
  inApp:   boolean
  email?:  { success: boolean; messageId?: string; error?: string }
  push?:   { success: boolean; notificationId?: string; error?: string }
}

class NotificationOrchestrator {
  private email = createEmailAdapter()
  private push  = createPushAdapter()

  async send(params: SendNotificationParams): Promise<NotificationResult> {
    const result: NotificationResult = { inApp: false }

    // ── In-app notification (always, unless disabled) ──
    if (params.sendInApp !== false && params.userId) {
      // TODO: db.notification.create({ data: { userId, type: params.category, title, message: body, href } })
      result.inApp = true
    }

    // ── Email notification ─────────────────────────────
    if (params.sendEmail && params.userEmail) {
      try {
        if (params.emailTemplate && params.emailParams) {
          const templateFn = EmailTemplates[params.emailTemplate] as Function
          const template   = templateFn(params.emailParams)
          const sent = await this.email.send({
            to:      params.userEmail,
            subject: template.subject,
            html:    template.html,
            text:    template.text,
          })
          result.email = { success: sent.success, messageId: sent.messageId, error: sent.error }
        } else {
          const sent = await this.email.send({
            to:      params.userEmail,
            subject: params.title,
            html:    `<p>${params.body}</p>`,
            text:    params.body,
          })
          result.email = { success: sent.success, messageId: sent.messageId }
        }
      } catch (err) {
        result.email = { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
      }
    }

    // ── Push notification ──────────────────────────────
    if (params.sendPush && params.userId) {
      try {
        const sent = await this.push.send(params.userId, {
          title:    params.title,
          body:     params.body,
          data:     { ...params.data, href: params.href ?? '' },
          imageUrl: params.imageUrl,
          priority: 'normal',
        })
        result.push = { success: sent.success, notificationId: sent.notificationId, error: sent.error }
      } catch (err) {
        result.push = { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
      }
    }

    return result
  }

  // ── Convenience methods ────────────────────────────────

  async notifyMembershipUpgrade(params: { userId: string; email: string; name: string; tier: string; benefits: string[]; price: string }) {
    return this.send({
      userId:        params.userId,
      userEmail:     params.email,
      title:         `Membership upgraded to ${params.tier}`,
      body:          `Congratulations! You are now a ${params.tier} member.`,
      category:      'membership',
      href:          '/dashboard/membership',
      sendEmail:     true,
      sendPush:      true,
      sendInApp:     true,
      emailTemplate: 'membershipUpgraded',
      emailParams:   { name: params.name, tier: params.tier, benefits: params.benefits, price: params.price },
    })
  }

  async notifyOrderConfirmed(params: { userId: string; email: string; name: string; orderId: string; items: any[]; total: string; estimatedDelivery: string }) {
    return this.send({
      userId:        params.userId,
      userEmail:     params.email,
      title:         `Order ${params.orderId} confirmed`,
      body:          `Your order has been confirmed. Estimated delivery: ${params.estimatedDelivery}`,
      category:      'order',
      href:          '/dashboard/orders',
      sendEmail:     true,
      sendPush:      true,
      emailTemplate: 'orderConfirmation',
      emailParams:   params,
    })
  }

  async notifyOrderShipped(params: { userId: string; email: string; name: string; orderId: string; carrier: string; trackingCode: string; estimatedDelivery: string }) {
    return this.send({
      userId:        params.userId,
      userEmail:     params.email,
      title:         `Order ${params.orderId} has shipped`,
      body:          `${params.carrier}: ${params.trackingCode}. Est. delivery: ${params.estimatedDelivery}`,
      category:      'order',
      href:          '/dashboard/orders',
      sendEmail:     true,
      sendPush:      true,
      emailTemplate: 'orderShipped',
      emailParams:   params,
    })
  }

  async notifyBirthday(params: { userId: string; email: string; name: string; tier: string; gift: string; giftCode?: string; bonusDiscount: string }) {
    return this.send({
      userId:        params.userId,
      userEmail:     params.email,
      title:         `Happy Birthday from LE DÉSIR! 🎂`,
      body:          `Your birthday gift is ready: ${params.gift}`,
      category:      'vip',
      href:          '/marketplace',
      sendEmail:     true,
      sendPush:      true,
      emailTemplate: 'birthdayReward',
      emailParams:   params,
    })
  }

  async notifyNewContent(params: { userIds: string[]; creatorName: string; contentTitle: string; contentUrl: string }) {
    // Bulk push to all subscribed users
    return this.push.sendBulk?.(params.userIds, {
      title: `New from ${params.creatorName}`,
      body:  params.contentTitle,
      data:  { href: params.contentUrl },
    })
  }

  async notifyTicketResolved(params: { userId: string; email: string; name: string; ticketId: string; resolution: string }) {
    return this.send({
      userId:        params.userId,
      userEmail:     params.email,
      title:         `Ticket ${params.ticketId} resolved`,
      body:          'Your support request has been resolved.',
      category:      'support',
      href:          '/support',
      sendEmail:     true,
      emailTemplate: 'supportTicketResolved',
      emailParams:   params,
    })
  }
}

export const notificationOrchestrator = new NotificationOrchestrator()
