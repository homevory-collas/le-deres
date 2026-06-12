// services/notifications/providers/email.ts
// Email provider adapters: Resend, SendGrid, Postmark.

export interface EmailMessage {
  to:          string | string[]
  from?:       string               // defaults to platform from address
  replyTo?:    string
  subject:     string
  html:        string
  text?:       string               // plaintext fallback
  cc?:         string[]
  bcc?:        string[]
  headers?:    Record<string, string>
  tags?:       string[]
  metadata?:   Record<string, string>
  attachments?: EmailAttachment[]
}

export interface EmailAttachment {
  filename:    string
  content:     string               // base64 encoded
  contentType: string
}

export interface EmailSendResult {
  success:     boolean
  messageId:   string
  provider:    string
  error?:      string
}

export interface BulkEmailResult {
  sent:        number
  failed:      number
  results:     EmailSendResult[]
}

// ─── Base interface ────────────────────────────────────────
interface EmailAdapter {
  name:        string
  fromAddress: string
  send(msg: EmailMessage): Promise<EmailSendResult>
  sendBulk(messages: EmailMessage[]): Promise<BulkEmailResult>
  sendTemplate(templateId: string, to: string, variables: Record<string, unknown>): Promise<EmailSendResult>
}

// ─── Resend Adapter ───────────────────────────────────────
// Install: npm install resend
// Env: RESEND_API_KEY, EMAIL_FROM_ADDRESS, EMAIL_FROM_NAME

export class ResendAdapter implements EmailAdapter {
  name        = 'resend'
  fromAddress: string
  // private client: Resend

  constructor(private config: { apiKey: string; from: string; fromName: string }) {
    this.fromAddress = config.from
    // TODO:
    // import { Resend } from 'resend'
    // this.client = new Resend(config.apiKey)
    console.log('[Resend] Adapter initialized')
  }

  async send(msg: EmailMessage): Promise<EmailSendResult> {
    // TODO:
    // const { data, error } = await this.client.emails.send({
    //   from:    msg.from ?? `${this.config.fromName} <${this.fromAddress}>`,
    //   to:      Array.isArray(msg.to) ? msg.to : [msg.to],
    //   subject: msg.subject,
    //   html:    msg.html,
    //   text:    msg.text,
    //   reply_to: msg.replyTo,
    //   cc:      msg.cc,
    //   bcc:     msg.bcc,
    //   tags:    msg.tags?.map(t => ({ name: t, value: t })),
    //   attachments: msg.attachments,
    // })
    // if (error) return { success: false, messageId: '', provider: this.name, error: error.message }
    // return { success: true, messageId: data.id, provider: this.name }
    throw new Error('[Resend] send: not yet integrated. npm install resend')
  }

  async sendBulk(messages: EmailMessage[]): Promise<BulkEmailResult> {
    // TODO: this.client.batch.send(messages.map(m => ({ ... })))
    throw new Error('[Resend] sendBulk: not yet integrated.')
  }

  async sendTemplate(templateId: string, to: string, variables: Record<string, unknown>): Promise<EmailSendResult> {
    // Resend supports React email templates natively
    // TODO: use React Email + JSX templates
    throw new Error('[Resend] sendTemplate: not yet integrated.')
  }
}

// ─── SendGrid Adapter ─────────────────────────────────────
// Install: npm install @sendgrid/mail
// Env: SENDGRID_API_KEY, EMAIL_FROM_ADDRESS

export class SendGridAdapter implements EmailAdapter {
  name        = 'sendgrid'
  fromAddress: string
  // private sgMail

  constructor(private config: { apiKey: string; from: string }) {
    this.fromAddress = config.from
    // TODO:
    // import sgMail from '@sendgrid/mail'
    // sgMail.setApiKey(config.apiKey)
    // this.sgMail = sgMail
    console.log('[SendGrid] Adapter initialized')
  }

  async send(msg: EmailMessage): Promise<EmailSendResult> {
    // TODO:
    // await this.sgMail.send({
    //   to: msg.to, from: msg.from ?? this.fromAddress,
    //   subject: msg.subject, html: msg.html, text: msg.text,
    //   customArgs: msg.metadata,
    //   categories: msg.tags,
    // })
    throw new Error('[SendGrid] send: not yet integrated. npm install @sendgrid/mail')
  }

  async sendBulk(messages: EmailMessage[]): Promise<BulkEmailResult> {
    // TODO: this.sgMail.sendMultiple(...)
    throw new Error('[SendGrid] sendBulk: not yet integrated.')
  }

  async sendTemplate(templateId: string, to: string, variables: Record<string, unknown>): Promise<EmailSendResult> {
    // TODO: SendGrid dynamic templates
    // this.sgMail.send({ to, from: this.fromAddress, templateId, dynamicTemplateData: variables })
    throw new Error('[SendGrid] sendTemplate: not yet integrated.')
  }
}

// ─── Postmark Adapter ─────────────────────────────────────
// Install: npm install postmark
// Env: POSTMARK_API_TOKEN, POSTMARK_FROM_ADDRESS

export class PostmarkAdapter implements EmailAdapter {
  name        = 'postmark'
  fromAddress: string
  // private client: postmark.ServerClient

  constructor(private config: { token: string; from: string }) {
    this.fromAddress = config.from
    // TODO:
    // import * as postmark from 'postmark'
    // this.client = new postmark.ServerClient(config.token)
    console.log('[Postmark] Adapter initialized')
  }

  async send(msg: EmailMessage): Promise<EmailSendResult> {
    // TODO:
    // const result = await this.client.sendEmail({
    //   From: msg.from ?? this.fromAddress,
    //   To:   Array.isArray(msg.to) ? msg.to.join(',') : msg.to,
    //   Subject: msg.subject, HtmlBody: msg.html, TextBody: msg.text,
    //   MessageStream: 'outbound',
    // })
    // return { success: result.ErrorCode === 0, messageId: result.MessageID, provider: this.name }
    throw new Error('[Postmark] send: not yet integrated. npm install postmark')
  }

  async sendBulk(messages: EmailMessage[]): Promise<BulkEmailResult> {
    // TODO: this.client.sendEmailBatch(messages.map(...))
    throw new Error('[Postmark] sendBulk: not yet integrated.')
  }

  async sendTemplate(templateId: string, to: string, variables: Record<string, unknown>): Promise<EmailSendResult> {
    // TODO: this.client.sendEmailWithTemplate({ TemplateAlias: templateId, TemplateModel: variables, To: to, From: this.fromAddress })
    throw new Error('[Postmark] sendTemplate: not yet integrated.')
  }
}

// ─── Factory ──────────────────────────────────────────────
export function createEmailAdapter(): EmailAdapter {
  const from = process.env.EMAIL_FROM_ADDRESS ?? 'noreply@ledesir.com'
  switch (process.env.EMAIL_PROVIDER) {
    case 'resend':    return new ResendAdapter({ apiKey: process.env.RESEND_API_KEY ?? '', from, fromName: 'LE DÉSIR' })
    case 'sendgrid':  return new SendGridAdapter({ apiKey: process.env.SENDGRID_API_KEY ?? '', from })
    case 'postmark':  return new PostmarkAdapter({ token: process.env.POSTMARK_API_TOKEN ?? '', from })
    default:          return new ResendAdapter({ apiKey: 'mock', from, fromName: 'LE DÉSIR' })
  }
}
