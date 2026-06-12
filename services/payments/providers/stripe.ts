// services/payments/providers/stripe.ts
// Stripe integration contract and adapter.
// Install: npm install stripe
// Env: STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET

import type {
  CreatePaymentIntentDTO, PaymentIntentResponseDTO,
  ConfirmPaymentDTO, PaymentResultDTO,
  CreateSubscriptionDTO, SubscriptionDTO,
  RefundRequestDTO, RefundResultDTO,
  CustomerDTO, SavedPaymentMethodDTO,
} from '../dto'

// ─── Stripe-specific types ────────────────────────────────
export interface StripeConfig {
  secretKey:      string
  publishableKey: string
  webhookSecret:  string
  apiVersion:     string
}

// Stripe Price ID mapping (create in Stripe dashboard)
export const STRIPE_PRICE_IDS: Record<string, { monthly: string; yearly: string }> = {
  silver:    { monthly: 'price_silver_monthly',    yearly: 'price_silver_yearly' },
  gold:      { monthly: 'price_gold_monthly',      yearly: 'price_gold_yearly' },
  black_vip: { monthly: 'price_blackvip_monthly',  yearly: 'price_blackvip_yearly' },
  vip_1:     { monthly: 'price_vip1_monthly',      yearly: 'price_vip1_yearly' },
  vip_2:     { monthly: 'price_vip2_monthly',      yearly: 'price_vip2_yearly' },
  vip_3:     { monthly: 'price_vip3_monthly',      yearly: 'price_vip3_yearly' },
  vip_4:     { monthly: 'price_vip4_monthly',      yearly: 'price_vip4_yearly' },
  vip_5:     { monthly: 'price_vip5_monthly',      yearly: 'price_vip5_yearly' },
  vip_6:     { monthly: 'price_vip6_monthly',      yearly: 'price_vip6_yearly' },
  vip_7:     { monthly: 'price_vip7_monthly',      yearly: 'price_vip7_yearly' },
  vip_8:     { monthly: 'price_vip8_monthly',      yearly: 'price_vip8_yearly' },
  vip_9:     { monthly: 'price_vip9_monthly',      yearly: 'price_vip9_yearly' },
}

export class StripeAdapter {
  private config: StripeConfig
  // private stripe: Stripe   // TODO: import Stripe from 'stripe'

  constructor(config: StripeConfig) {
    this.config = config
    // TODO: this.stripe = new Stripe(config.secretKey, { apiVersion: config.apiVersion as any })
    console.log('[Stripe] Adapter initialized')
  }

  /**
   * Create a Stripe PaymentIntent.
   * Returns client_secret for Stripe.js frontend confirmation.
   */
  async createPaymentIntent(dto: CreatePaymentIntentDTO): Promise<PaymentIntentResponseDTO> {
    // TODO:
    // const intent = await this.stripe.paymentIntents.create({
    //   amount:   dto.amount,
    //   currency: dto.currency.toLowerCase(),
    //   payment_method_types: ['card'],
    //   metadata: { ...dto.metadata, customerId: dto.customerId ?? '' },
    //   description: dto.description,
    // })
    // return { intentId: intent.id, clientSecret: intent.client_secret!, status: 'created', ... }
    throw new Error('[Stripe] createPaymentIntent: not yet integrated. npm install stripe')
  }

  /**
   * Create a Stripe Customer (billing profile).
   */
  async createCustomer(email: string, name?: string, metadata?: Record<string, string>): Promise<string> {
    // TODO:
    // const customer = await this.stripe.customers.create({ email, name, metadata })
    // return customer.id
    throw new Error('[Stripe] createCustomer: not yet integrated.')
  }

  /**
   * Create a Stripe Subscription for recurring membership billing.
   */
  async createSubscription(dto: CreateSubscriptionDTO, stripeCustomerId: string): Promise<SubscriptionDTO> {
    // TODO:
    // const priceId = STRIPE_PRICE_IDS[dto.planId]?.monthly
    // const sub = await this.stripe.subscriptions.create({
    //   customer: stripeCustomerId,
    //   items: [{ price: priceId }],
    //   trial_period_days: dto.trialDays,
    //   payment_behavior: 'default_incomplete',
    //   expand: ['latest_invoice.payment_intent'],
    //   metadata: dto.metadata,
    //   promotion_code: dto.couponCode,
    // })
    throw new Error('[Stripe] createSubscription: not yet integrated.')
  }

  /**
   * Cancel a Stripe Subscription (at period end or immediately).
   */
  async cancelSubscription(subscriptionId: string, immediate = false): Promise<boolean> {
    // TODO:
    // if (immediate) await this.stripe.subscriptions.cancel(subscriptionId)
    // else await this.stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true })
    // return true
    throw new Error('[Stripe] cancelSubscription: not yet integrated.')
  }

  /**
   * Issue a Stripe Refund.
   */
  async refund(dto: RefundRequestDTO): Promise<RefundResultDTO> {
    // TODO:
    // const refund = await this.stripe.refunds.create({
    //   payment_intent: dto.reference,
    //   amount: dto.amount,
    //   reason: dto.reason as any,
    //   metadata: dto.notes ? { notes: dto.notes } : undefined,
    // })
    throw new Error('[Stripe] refund: not yet integrated.')
  }

  /**
   * List saved payment methods for a customer.
   */
  async listPaymentMethods(stripeCustomerId: string): Promise<SavedPaymentMethodDTO[]> {
    // TODO:
    // const methods = await this.stripe.paymentMethods.list({ customer: stripeCustomerId, type: 'card' })
    // return methods.data.map(pm => ({ id: pm.id, type: 'stripe_card', last4: pm.card?.last4, ... }))
    throw new Error('[Stripe] listPaymentMethods: not yet integrated.')
  }

  /**
   * Verify Stripe webhook signature.
   */
  verifyWebhookSignature(payload: string | Buffer, signature: string): boolean {
    // TODO:
    // const event = this.stripe.webhooks.constructEvent(payload, signature, this.config.webhookSecret)
    // return true
    throw new Error('[Stripe] verifyWebhookSignature: not yet integrated.')
  }

  /**
   * Create a Stripe Coupon/Promo code.
   */
  async createCoupon(params: {
    percentOff?: number; amountOff?: number; currency?: string;
    duration: 'once' | 'repeating' | 'forever'; durationMonths?: number
  }): Promise<string> {
    // TODO: const coupon = await this.stripe.coupons.create(params); return coupon.id
    throw new Error('[Stripe] createCoupon: not yet integrated.')
  }

  // ─── Mock responses ───────────────────────────────────────
  static mockPaymentIntent(dto: CreatePaymentIntentDTO): PaymentIntentResponseDTO {
    return {
      intentId:     `pi_mock_${Date.now()}`,
      clientSecret: `pi_mock_${Date.now()}_secret_mock`,
      status:       'created',
      amount:       dto.amount,
      currency:     dto.currency,
      method:       'stripe_card',
    }
  }

  static mockSubscription(dto: CreateSubscriptionDTO): SubscriptionDTO {
    const now = new Date()
    return {
      subscriptionId:     `sub-stripe-${Date.now()}`,
      providerId:         `sub_mock_${Date.now()}`,
      customerId:         dto.customerId,
      planId:             dto.planId,
      status:             dto.trialDays ? 'trialing' : 'active',
      amount:             3999,
      currency:           'EUR',
      interval:           'monthly',
      currentPeriodStart: now,
      currentPeriodEnd:   new Date(now.getTime() + 30 * 86400000),
      cancelAtPeriodEnd:  false,
      trialEnd:           dto.trialDays ? new Date(now.getTime() + dto.trialDays * 86400000) : undefined,
      createdAt:          now,
    }
  }
}

export function createStripeAdapter(): StripeAdapter {
  return new StripeAdapter({
    secretKey:      process.env.STRIPE_SECRET_KEY      ?? 'sk_test_mock',
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY ?? 'pk_test_mock',
    webhookSecret:  process.env.STRIPE_WEBHOOK_SECRET  ?? 'whsec_mock',
    apiVersion:     '2024-12-18.acacia',
  })
}
