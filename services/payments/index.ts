// services/payments/index.ts
// Payment provider abstraction layer.
// Wire up real providers in Phase 5.

export type PaymentMethod = 'paypal' | 'stripe' | 'visa' | 'mastercard' | 'usdt' | 'usdc'
export type PaymentStatus = 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded' | 'cancelled'
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired' | 'paused' | 'trial'

export interface PaymentIntent {
  id:         string
  amount:     number
  currency:   string
  status:     PaymentStatus
  method:     PaymentMethod
  clientSecret?: string
  metadata?:  Record<string, string>
  createdAt:  Date
}

export interface PaymentResult {
  success:    boolean
  intentId:   string
  reference:  string
  status:     PaymentStatus
  message?:   string
}

export interface RefundResult {
  success:   boolean
  refundId:  string
  amount:    number
  message?:  string
}

export interface Subscription {
  id:         string
  userId:     string
  planId:     string
  status:     SubscriptionStatus
  amount:     number
  currency:   string
  interval:   'monthly' | 'yearly'
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
}

// ─── Base interface all providers implement ───────────────
export interface PaymentProvider {
  name:          PaymentMethod
  displayName:   string
  icon:          string
  supported:     boolean   // false = placeholder, true = live

  createIntent(amount: number, currency: string, metadata?: Record<string, string>): Promise<PaymentIntent>
  confirmPayment(intentId: string, paymentData: unknown): Promise<PaymentResult>
  refund(reference: string, amount?: number, reason?: string): Promise<RefundResult>
  createSubscription(userId: string, planId: string, paymentData: unknown): Promise<Subscription>
  cancelSubscription(subscriptionId: string): Promise<boolean>
  getSubscription(subscriptionId: string): Promise<Subscription | null>
}

// ─── Mock provider (dev) ──────────────────────────────────
class MockProvider implements PaymentProvider {
  name:        PaymentMethod
  displayName: string
  icon:        string
  supported = false

  constructor(name: PaymentMethod, displayName: string, icon: string) {
    this.name = name
    this.displayName = displayName
    this.icon = icon
  }

  async createIntent(amount: number, currency: string): Promise<PaymentIntent> {
    return {
      id: `mock_pi_${Date.now()}`, amount, currency,
      status: 'pending', method: this.name, createdAt: new Date(),
    }
  }

  async confirmPayment(intentId: string): Promise<PaymentResult> {
    console.log(`[${this.displayName}] confirm payment — MOCK (not implemented)`)
    return { success: false, intentId, reference: intentId, status: 'failed', message: `${this.displayName} not yet integrated` }
  }

  async refund(reference: string, amount?: number): Promise<RefundResult> {
    return { success: false, refundId: '', amount: amount ?? 0, message: 'Refund not implemented' }
  }

  async createSubscription(): Promise<Subscription> {
    throw new Error(`${this.displayName} subscriptions not implemented`)
  }

  async cancelSubscription(): Promise<boolean> { return false }
  async getSubscription():    Promise<null>    { return null }
}

// ─── PayPal provider placeholder ─────────────────────────
export class PayPalProvider extends MockProvider {
  constructor() { super('paypal', 'PayPal', '/icons/paypal.svg') }
  // TODO: npm install @paypal/paypal-js
  // TODO: import { loadScript } from '@paypal/paypal-js'
  // TODO: implement createOrder, captureOrder, createSubscription
}

// ─── Stripe provider placeholder ─────────────────────────
export class StripeProvider extends MockProvider {
  constructor() { super('stripe', 'Stripe', '/icons/stripe.svg') }
  // TODO: npm install stripe @stripe/stripe-js
  // TODO: implement PaymentIntents, Subscriptions, Webhooks
}

// ─── USDT provider placeholder ────────────────────────────
export class USDTProvider extends MockProvider {
  name = 'usdt' as PaymentMethod
  constructor() { super('usdt', 'USDT (Tether)', '/icons/usdt.svg') }
  // TODO: integrate Tether TRC-20 or ERC-20 wallet verification
  // TODO: implement wallet address generation, TX monitoring
}

// ─── USDC provider placeholder ────────────────────────────
export class USDCProvider extends MockProvider {
  constructor() { super('usdc', 'USDC', '/icons/usdc.svg') }
}

// ─── Payment Gateway (orchestrates all providers) ─────────
export class PaymentGateway {
  private providers: Map<PaymentMethod, PaymentProvider> = new Map()

  constructor() {
    this.providers.set('paypal',     new PayPalProvider())
    this.providers.set('stripe',     new StripeProvider())
    this.providers.set('usdt',       new USDTProvider())
    this.providers.set('usdc',       new USDCProvider())
  }

  getProvider(method: PaymentMethod): PaymentProvider {
    const p = this.providers.get(method)
    if (!p) throw new Error(`Payment method not supported: ${method}`)
    return p
  }

  getSupportedMethods(): PaymentProvider[] {
    return Array.from(this.providers.values())
  }

  async createIntent(method: PaymentMethod, amount: number, currency = 'EUR'): Promise<PaymentIntent> {
    return this.getProvider(method).createIntent(amount, currency)
  }

  async confirmPayment(method: PaymentMethod, intentId: string, data: unknown): Promise<PaymentResult> {
    return this.getProvider(method).confirmPayment(intentId, data)
  }

  async refund(method: PaymentMethod, reference: string, amount?: number): Promise<RefundResult> {
    return this.getProvider(method).refund(reference, amount)
  }
}

export const gateway = new PaymentGateway()

// ─── Referral & Affiliate System ─────────────────────────
export interface ReferralConfig {
  commissionRate:  number    // e.g. 0.10 = 10%
  commissionType:  'percent' | 'fixed'
  cookieDays:      number    // attribution window
  minPayout:       number    // minimum payout amount
  payoutSchedule:  'monthly' | 'weekly' | 'instant'
}

export const DEFAULT_REFERRAL_CONFIG: ReferralConfig = {
  commissionRate: 0.10,
  commissionType: 'percent',
  cookieDays:     30,
  minPayout:      25,
  payoutSchedule: 'monthly',
}

export function calculateCommission(amount: number, config = DEFAULT_REFERRAL_CONFIG): number {
  if (config.commissionType === 'percent') return amount * config.commissionRate
  return config.commissionRate
}
