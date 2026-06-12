// services/notifications/templates/index.ts
// All transactional email templates for LE DÉSIR.
// Templates use simple string interpolation (no JSX required).
// For React Email integration: wrap each in a React component.

const BASE_URL  = process.env.NEXT_PUBLIC_APP_URL ?? 'https://ledesir.com'
const SITE_NAME = 'LE DÉSIR'
const BRAND_GOLD = '#D4AF37'

// ─── Base layout ──────────────────────────────────────────
function baseLayout(content: string, previewText = ''): string {
  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
${previewText ? `<div style="display:none;overflow:hidden;max-height:0">${previewText}</div>` : ''}
<style>body{margin:0;padding:0;background:#0d0d0d;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#e5e7eb}a{color:${BRAND_GOLD}}.btn{display:inline-block;padding:12px 32px;background:${BRAND_GOLD};color:#080808!important;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600}</style>
</head><body>
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 20px">
<table width="560" cellpadding="0" cellspacing="0" style="background:#141414;border:1px solid #2a2a2a">
  <tr><td style="padding:32px 40px;border-bottom:1px solid ${BRAND_GOLD}30;text-align:center">
    <p style="margin:0;font-size:20px;letter-spacing:6px;text-transform:uppercase;color:${BRAND_GOLD};font-weight:600">${SITE_NAME}</p>
  </td></tr>
  <tr><td style="padding:40px">${content}</td></tr>
  <tr><td style="padding:24px 40px;border-top:1px solid #2a2a2a;text-align:center">
    <p style="margin:0;font-size:11px;color:#6b7280">© ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</p>
    <p style="margin:8px 0 0;font-size:10px;color:#4b5563">
      <a href="${BASE_URL}/privacy" style="color:#6b7280">Privacy Policy</a> &nbsp;·&nbsp;
      <a href="${BASE_URL}/terms"   style="color:#6b7280">Terms of Service</a> &nbsp;·&nbsp;
      <a href="%unsubscribe_url%"   style="color:#6b7280">Unsubscribe</a>
    </p>
  </td></tr>
</table></td></tr></table></body></html>`
}

// ─── Template factory ─────────────────────────────────────
export interface EmailTemplate { subject: string; html: string; text: string; preview?: string }

export const EmailTemplates = {

  // ── Account ────────────────────────────────────────────
  welcome(params: { name: string; loginUrl?: string }): EmailTemplate {
    const preview = `Welcome to ${SITE_NAME}, ${params.name}. Your exclusive experience begins now.`
    return {
      subject: `Welcome to ${SITE_NAME} — Private. Elegant. Personal.`,
      preview,
      html: baseLayout(`
        <h1 style="margin:0 0 16px;font-size:28px;font-weight:300;color:#fff">Welcome,<br><em style="color:${BRAND_GOLD}">${params.name}</em></h1>
        <p style="color:#9ca3af;line-height:1.8;margin:0 0 24px">Your exclusive membership has been created. A world of premium content, curated lifestyle products and an elegant community awaits.</p>
        <a href="${params.loginUrl ?? BASE_URL + '/login'}" class="btn">Enter LE DÉSIR</a>
        <p style="color:#4b5563;font-size:12px;margin:24px 0 0">If you didn't create this account, please ignore this email.</p>
      `, preview),
      text: `Welcome to ${SITE_NAME}, ${params.name}.\n\nYour account has been created.\n\nLogin: ${params.loginUrl ?? BASE_URL + '/login'}\n\n${SITE_NAME}`,
    }
  },

  emailVerification(params: { name: string; verifyUrl: string; expiresIn?: string }): EmailTemplate {
    return {
      subject: `Verify your ${SITE_NAME} email address`,
      html: baseLayout(`
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:300;color:#fff">Verify Your Email</h1>
        <p style="color:#9ca3af;line-height:1.8;margin:0 0 24px">Click the button below to verify your email address. This link expires in ${params.expiresIn ?? '24 hours'}.</p>
        <a href="${params.verifyUrl}" class="btn">Verify Email</a>
        <p style="color:#4b5563;font-size:12px;margin:24px 0 0">Or copy this link: ${params.verifyUrl}</p>
      `),
      text: `Verify your email: ${params.verifyUrl}`,
    }
  },

  passwordReset(params: { name: string; resetUrl: string }): EmailTemplate {
    return {
      subject: `Reset your ${SITE_NAME} password`,
      html: baseLayout(`
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:300;color:#fff">Password Reset</h1>
        <p style="color:#9ca3af;line-height:1.8;margin:0 0 24px">We received a request to reset your password. Click below to create a new one. This link expires in 1 hour.</p>
        <a href="${params.resetUrl}" class="btn">Reset Password</a>
        <p style="color:#4b5563;font-size:12px;margin:24px 0 0">If you didn't request this, your account is safe — ignore this email.</p>
      `),
      text: `Reset your password: ${params.resetUrl}`,
    }
  },

  // ── Membership ─────────────────────────────────────────
  membershipUpgraded(params: { name: string; tier: string; benefits: string[]; price: string }): EmailTemplate {
    const preview = `Congratulations! You are now a ${params.tier} member of ${SITE_NAME}.`
    return {
      subject: `Your membership has been upgraded to ${params.tier} ✨`,
      preview,
      html: baseLayout(`
        <h1 style="margin:0 0 4px;font-size:28px;font-weight:300;color:#fff">Congratulations,<br><em style="color:${BRAND_GOLD}">${params.name}</em></h1>
        <p style="color:${BRAND_GOLD};letter-spacing:3px;text-transform:uppercase;font-size:11px;margin:0 0 24px">${params.tier} Member</p>
        <p style="color:#9ca3af;line-height:1.8;margin:0 0 20px">Your exclusive ${params.tier} membership is now active at ${params.price}/month.</p>
        <p style="color:#6b7280;font-size:13px;margin:0 0 8px">Your new benefits:</p>
        <ul style="color:#9ca3af;font-size:13px;line-height:2;padding-left:20px;margin:0 0 24px">
          ${params.benefits.map(b => `<li>${b}</li>`).join('')}
        </ul>
        <a href="${BASE_URL}/dashboard/membership" class="btn">View My Membership</a>
      `, preview),
      text: `Congratulations ${params.name}! You are now a ${params.tier} member.\n\nBenefits:\n${params.benefits.join('\n')}\n\n${BASE_URL}/dashboard/membership`,
    }
  },

  membershipRenewal(params: { name: string; tier: string; renewsOn: string; amount: string }): EmailTemplate {
    return {
      subject: `Your ${SITE_NAME} membership renews in 7 days`,
      html: baseLayout(`
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:300;color:#fff">Membership Renewal</h1>
        <p style="color:#9ca3af;line-height:1.8;margin:0 0 24px">Hi ${params.name}, your <strong style="color:#fff">${params.tier}</strong> membership will automatically renew on <strong style="color:${BRAND_GOLD}">${params.renewsOn}</strong> for ${params.amount}.</p>
        <a href="${BASE_URL}/dashboard/membership" class="btn">Manage Membership</a>
      `),
      text: `Your ${params.tier} membership renews on ${params.renewsOn} for ${params.amount}. Manage: ${BASE_URL}/dashboard/membership`,
    }
  },

  membershipCancelled(params: { name: string; tier: string; expiresOn: string }): EmailTemplate {
    return {
      subject: `Your ${SITE_NAME} membership has been cancelled`,
      html: baseLayout(`
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:300;color:#fff">Membership Cancelled</h1>
        <p style="color:#9ca3af;line-height:1.8;margin:0 0 24px">Hi ${params.name}, your ${params.tier} membership has been cancelled and will remain active until <strong style="color:${BRAND_GOLD}">${params.expiresOn}</strong>.</p>
        <a href="${BASE_URL}/membership" class="btn">Reactivate Membership</a>
      `),
      text: `Your ${params.tier} membership is cancelled. Active until ${params.expiresOn}.`,
    }
  },

  // ── Marketplace ────────────────────────────────────────
  orderConfirmation(params: { name: string; orderId: string; items: { name: string; qty: number; price: string }[]; total: string; estimatedDelivery: string }): EmailTemplate {
    const itemRows = params.items.map(i => `<tr><td style="padding:8px 0;color:#9ca3af">${i.name}</td><td style="padding:8px 0;color:#9ca3af;text-align:right">×${i.qty}</td><td style="padding:8px 0;color:#fff;text-align:right">${i.price}</td></tr>`).join('')
    return {
      subject: `Order Confirmed — ${params.orderId}`,
      html: baseLayout(`
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:300;color:#fff">Order Confirmed</h1>
        <p style="color:#9ca3af;margin:0 0 24px">Hi ${params.name}, your order <strong style="color:${BRAND_GOLD}">${params.orderId}</strong> has been confirmed. Estimated delivery: ${params.estimatedDelivery}.</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #2a2a2a;margin-bottom:16px">
          ${itemRows}
          <tr><td colspan="2" style="padding:12px 0;border-top:1px solid #2a2a2a;color:#6b7280">Total</td><td style="padding:12px 0;border-top:1px solid #2a2a2a;color:${BRAND_GOLD};font-weight:600;text-align:right">${params.total}</td></tr>
        </table>
        <p style="color:#4b5563;font-size:12px;margin:0 0 20px">📦 Your order will be shipped in discreet, unmarked packaging.</p>
        <a href="${BASE_URL}/dashboard/orders" class="btn">View Order</a>
      `),
      text: `Order ${params.orderId} confirmed. Total: ${params.total}. Est. delivery: ${params.estimatedDelivery}.\n\n${BASE_URL}/dashboard/orders`,
    }
  },

  orderShipped(params: { name: string; orderId: string; carrier: string; trackingCode: string; trackingUrl?: string; estimatedDelivery: string }): EmailTemplate {
    return {
      subject: `Your order ${params.orderId} has shipped 📦`,
      html: baseLayout(`
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:300;color:#fff">Your Order Has Shipped</h1>
        <p style="color:#9ca3af;margin:0 0 16px">Hi ${params.name}, your order is on its way!</p>
        <div style="background:#1a1a1a;padding:20px;margin-bottom:24px">
          <p style="margin:0 0 8px;color:#6b7280;font-size:12px;letter-spacing:1px;text-transform:uppercase">Tracking</p>
          <p style="margin:0;color:${BRAND_GOLD};font-size:18px;font-weight:300">${params.carrier}: ${params.trackingCode}</p>
          <p style="margin:8px 0 0;color:#9ca3af;font-size:12px">Est. delivery: ${params.estimatedDelivery}</p>
        </div>
        ${params.trackingUrl ? `<a href="${params.trackingUrl}" class="btn">Track Package</a>` : ''}
      `),
      text: `Order ${params.orderId} shipped. Tracking: ${params.carrier} ${params.trackingCode}. Est. delivery: ${params.estimatedDelivery}.`,
    }
  },

  // ── VIP & Birthday ─────────────────────────────────────
  birthdayReward(params: { name: string; tier: string; gift: string; giftCode?: string; bonusDiscount: string }): EmailTemplate {
    return {
      subject: `Happy Birthday from ${SITE_NAME} 🎂`,
      html: baseLayout(`
        <div style="text-align:center;margin-bottom:32px">
          <p style="font-size:48px;margin:0">🎂</p>
          <h1 style="margin:16px 0 4px;font-size:28px;font-weight:300;color:#fff">Happy Birthday,<br><em style="color:${BRAND_GOLD}">${params.name}!</em></h1>
          <p style="color:#6b7280;margin:0;letter-spacing:2px;font-size:11px;text-transform:uppercase">${params.tier} Member</p>
        </div>
        <p style="color:#9ca3af;line-height:1.8;margin:0 0 24px;text-align:center">As a valued ${params.tier} member, we have a special birthday gift for you:</p>
        <div style="background:#1a1a1a;border:1px solid ${BRAND_GOLD}40;padding:24px;text-align:center;margin-bottom:24px">
          <p style="color:#9ca3af;margin:0 0 8px;font-size:13px">${params.gift}</p>
          <p style="color:#9ca3af;margin:0;font-size:13px">+ <strong style="color:${BRAND_GOLD}">${params.bonusDiscount}</strong> extra discount today only</p>
          ${params.giftCode ? `<p style="margin:16px 0 0;font-size:16px;letter-spacing:4px;color:#fff;font-weight:600">${params.giftCode}</p>` : ''}
        </div>
        <div style="text-align:center"><a href="${BASE_URL}/marketplace" class="btn">Shop Now</a></div>
      `),
      text: `Happy Birthday ${params.name}! Your gift: ${params.gift}. Bonus: ${params.bonusDiscount} discount today.${params.giftCode ? ` Code: ${params.giftCode}` : ''}\n\n${BASE_URL}/marketplace`,
    }
  },

  // ── Support ────────────────────────────────────────────
  supportTicketCreated(params: { name: string; ticketId: string; subject: string }): EmailTemplate {
    return {
      subject: `Support Ticket Created — ${params.ticketId}`,
      html: baseLayout(`
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:300;color:#fff">We've Received Your Request</h1>
        <p style="color:#9ca3af;line-height:1.8;margin:0 0 16px">Hi ${params.name}, your support ticket <strong style="color:${BRAND_GOLD}">${params.ticketId}</strong> has been created. We typically respond within 24 hours.</p>
        <p style="color:#6b7280;font-size:13px;margin:0 0 24px">Subject: ${params.subject}</p>
        <a href="${BASE_URL}/support" class="btn">View Ticket Status</a>
      `),
      text: `Support ticket ${params.ticketId} created. Subject: ${params.subject}. We'll respond within 24 hours.`,
    }
  },

  supportTicketResolved(params: { name: string; ticketId: string; resolution: string }): EmailTemplate {
    return {
      subject: `Your ticket ${params.ticketId} has been resolved`,
      html: baseLayout(`
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:300;color:#fff">Ticket Resolved ✓</h1>
        <p style="color:#9ca3af;line-height:1.8;margin:0 0 16px">Hi ${params.name}, your ticket <strong style="color:${BRAND_GOLD}">${params.ticketId}</strong> has been resolved.</p>
        <div style="background:#1a1a1a;padding:16px;margin-bottom:24px">
          <p style="color:#6b7280;font-size:11px;letter-spacing:1px;text-transform:uppercase;margin:0 0 8px">Resolution</p>
          <p style="color:#9ca3af;margin:0;line-height:1.7">${params.resolution}</p>
        </div>
        <a href="${BASE_URL}/support" class="btn">Rate This Support</a>
      `),
      text: `Ticket ${params.ticketId} resolved. Resolution: ${params.resolution}`,
    }
  },
}

export type TemplateKey = keyof typeof EmailTemplates
