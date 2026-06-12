// services/payments/gateway.ts
// Unified Payment Gateway — orchestrates PayPal, Stripe, USDT, USDC.
// This is the SINGLE entry point for all payment operations.

import type { CreatePaymentIntentDTO, PaymentIntentResponseDTO, ConfirmPaymentDTO, PaymentResultDTO, CreateSubscriptionDTO, SubscriptionDTO, RefundRequestDTO, RefundResultDTO } from './dto'
import { PayPalAdapter, createPayPalAdapter }       from './providers/paypal'
import { StripeAdapter, createStripeAdapter }        from './providers/stripe'
import { USDTAdapter, USDCAdapter, createUSDTAdapter, createUSDCAdapter, USDTAdapter as CryptoBase } from './providers/crypto'

export type PaymentMethodKey = 'paypal' | 'stripe' | 'usdt' | 'usdc'

export interface PaymentProviderStatus {
  name:        PaymentMethodKey
  label:       string
  icon:        string
  configured:  boolean
  sandbox:     boolean
  currencies:  string[]
  supported:   boolean
}

export const PAYMENT_PROVIDER_META: Record<PaymentMethodKey, Omit<PaymentProviderStatus, 'configured' | 'sandbox' | 'supported'>> = {
  paypal: { name: 'paypal', label: 'PayPal',     icon: '/icons/paypal.svg',     currencies: ['EUR','USD','GBP','AUD','CAD'] },
  stripe: { name: 'stripe', label: 'Stripe',     icon: '/icons/stripe.svg',     currencies: ['EUR','USD','GBP','JPY','KRW','THB','VND','BRL'] },
  usdt:   { name: 'usdt',   label: 'USDT',       icon: '/icons/usdt.svg',       currencies: ['USDT'] },
  usdc:   { name: 'usdc',   label: 'USDC',       icon: '/icons/usdc.svg',       currencies: ['USDC'] },
}

class PaymentGateway {
  private paypal: PayPalAdapter
  private stripe: StripeAdapter
  private usdt:   USDTAdapter
  private usdc:   USDCAdapter

  constructor() {
    this.paypal = createPayPalAdapter()
    this.stripe = createStripeAdapter()
    this.usdt   = createUSDTAdapter()
    this.usdc   = createUSDCAdapter()
  }

  getProviderStatuses(): PaymentProviderStatus[] {
    return [
      { ...PAYMENT_PROVIDER_META.paypal, configured: !!process.env.PAYPAL_CLIENT_ID,      sandbox: process.env.PAYPAL_SANDBOX !== 'false', supported: false },
      { ...PAYMENT_PROVIDER_META.stripe, configured: !!process.env.STRIPE_SECRET_KEY,     sandbox: process.env.STRIPE_SECRET_KEY?.startsWith('sk_test') ?? true, supported: false },
      { ...PAYMENT_PROVIDER_META.usdt,   configured: !!process.env.USDT_HOT_WALLET,       sandbox: false, supported: false },
      { ...PAYMENT_PROVIDER_META.usdc,   configured: !!process.env.USDC_HOT_WALLET,       sandbox: false, supported: false },
    ]
  }

  async createPaymentIntent(method: PaymentMethodKey, dto: CreatePaymentIntentDTO): Promise<PaymentIntentResponseDTO> {
    // Development: return mock responses
    if (process.env.NODE_ENV === 'development' || process.env.PAYMENT_MOCK === 'true') {
      switch (method) {
        case 'paypal': return PayPalAdapter.mockPaymentIntent(dto)
        case 'stripe': return StripeAdapter.mockPaymentIntent(dto)
        case 'usdt':   return { intentId: `usdt-${Date.now()}`, status: 'created', amount: dto.amount, currency: dto.currency, method: 'usdt_trc20', walletAddress: USDTAdapter.mockOrder(dto).walletAddress }
        case 'usdc':   return { intentId: `usdc-${Date.now()}`, status: 'created', amount: dto.amount, currency: dto.currency, method: 'usdc_erc20', walletAddress: USDCAdapter.mockOrder(dto).walletAddress }
      }
    }
    // Production:
    switch (method) {
      case 'paypal': return this.paypal.createPaymentIntent(dto)
      case 'stripe': return this.stripe.createPaymentIntent(dto)
      case 'usdt':   throw new Error('[Gateway] USDT: use createCryptoOrder instead')
      case 'usdc':   throw new Error('[Gateway] USDC: use createCryptoOrder instead')
    }
  }

  async confirmPayment(method: PaymentMethodKey, dto: ConfirmPaymentDTO): Promise<PaymentResultDTO> {
    if (process.env.NODE_ENV === 'development' || process.env.PAYMENT_MOCK === 'true') {
      return PayPalAdapter.mockConfirmResult(dto.intentId, 0)
    }
    switch (method) {
      case 'paypal': return this.paypal.confirmPayment(dto)
      case 'stripe': return this.stripe.confirmPayment?.(dto) ?? Promise.reject(new Error('Not implemented'))
      default: throw new Error(`[Gateway] confirmPayment: unsupported method ${method}`)
    }
  }

  async createSubscription(method: PaymentMethodKey, dto: CreateSubscriptionDTO): Promise<SubscriptionDTO> {
    if (process.env.NODE_ENV === 'development' || process.env.PAYMENT_MOCK === 'true') {
      return method === 'paypal' ? PayPalAdapter.mockSubscription(dto) : StripeAdapter.mockSubscription(dto)
    }
    switch (method) {
      case 'paypal': return this.paypal.createSubscription(dto)
      case 'stripe': return this.stripe.createSubscription(dto, 'stripe_customer_id')  // TODO: resolve customer ID
      default: throw new Error(`[Gateway] Subscriptions not supported for ${method}`)
    }
  }

  async refund(method: PaymentMethodKey, dto: RefundRequestDTO): Promise<RefundResultDTO> {
    switch (method) {
      case 'paypal': return this.paypal.refund(dto)
      case 'stripe': return this.stripe.refund(dto)
      default: throw new Error(`[Gateway] Refunds for ${method} require manual processing`)
    }
  }
}

export const paymentGateway = new PaymentGateway()
