// services/payments/dto/index.ts
// Data Transfer Objects for all payment flows.
// These define the shapes moving between the app and payment providers.

// ─── Shared primitives ────────────────────────────────────
export type Currency  = 'EUR' | 'USD' | 'GBP' | 'JPY' | 'KRW' | 'THB' | 'VND' | 'BRL' | 'USDT' | 'USDC'
export type PaymentMethodType = 'paypal' | 'stripe_card' | 'stripe_sepa' | 'usdt_trc20' | 'usdt_erc20' | 'usdc_erc20'
export type PaymentIntentStatus = 'created' | 'requires_action' | 'processing' | 'succeeded' | 'failed' | 'cancelled'
export type SubscriptionStatus  = 'trialing' | 'active' | 'past_due' | 'cancelled' | 'unpaid' | 'paused'
export type RefundStatus        = 'pending' | 'succeeded' | 'failed' | 'cancelled'
export type WebhookEvent =
  | 'payment.succeeded'    | 'payment.failed'       | 'payment.refunded'
  | 'subscription.created' | 'subscription.updated' | 'subscription.cancelled'
  | 'subscription.renewed' | 'subscription.failed'
  | 'dispute.created'      | 'dispute.resolved'

// ─── DTOs ─────────────────────────────────────────────────

/** Input: create a one-time payment */
export interface CreatePaymentIntentDTO {
  amount:       number          // in smallest unit (cents for EUR/USD)
  currency:     Currency
  method:       PaymentMethodType
  description?: string
  metadata?:    Record<string, string>
  returnUrl?:   string          // for redirect-based flows (PayPal)
  customerId?:  string          // internal user ID
}

/** Output: from payment provider after intent creation */
export interface PaymentIntentResponseDTO {
  intentId:      string
  clientSecret?: string         // Stripe client_secret for frontend
  approvalUrl?:  string         // PayPal approval redirect URL
  walletAddress?:string         // USDT/USDC receiving wallet
  expiresAt?:    Date
  status:        PaymentIntentStatus
  amount:        number
  currency:      Currency
  method:        PaymentMethodType
}

/** Input: confirm a payment (after user action) */
export interface ConfirmPaymentDTO {
  intentId:    string
  method:      PaymentMethodType
  paymentData: PayPalConfirmData | StripeConfirmData | CryptoConfirmData
}

export interface PayPalConfirmData {
  orderId:   string             // PayPal order ID
  payerId:   string             // PayPal payer ID
}

export interface StripeConfirmData {
  paymentMethodId: string       // Stripe PM ID from frontend
}

export interface CryptoConfirmData {
  txHash:    string             // Blockchain transaction hash
  network:   'tron' | 'ethereum' | 'polygon'
  fromAddress: string
}

/** Output: payment result */
export interface PaymentResultDTO {
  success:      boolean
  intentId:     string
  reference:    string          // provider transaction reference
  status:       PaymentIntentStatus
  amount:       number
  currency:     Currency
  method:       PaymentMethodType
  paidAt?:      Date
  receiptUrl?:  string
  errorCode?:   string
  errorMessage?:string
}

/** Input: create subscription */
export interface CreateSubscriptionDTO {
  customerId:   string          // internal user ID
  planId:       string          // membership tier code
  method:       PaymentMethodType
  trialDays?:   number
  couponCode?:  string
  metadata?:    Record<string, string>
}

/** Output: subscription object */
export interface SubscriptionDTO {
  subscriptionId:     string
  providerId:         string    // provider's subscription ID
  customerId:         string
  planId:             string
  status:             SubscriptionStatus
  amount:             number
  currency:           Currency
  interval:           'monthly' | 'yearly'
  currentPeriodStart: Date
  currentPeriodEnd:   Date
  cancelAtPeriodEnd:  boolean
  trialEnd?:          Date
  createdAt:          Date
}

/** Input: request refund */
export interface RefundRequestDTO {
  reference:    string          // payment reference/transaction ID
  amount?:      number          // partial refund amount; omit for full
  reason?:      'duplicate' | 'fraudulent' | 'requested_by_customer' | 'product_not_received' | 'other'
  notes?:       string
}

/** Output: refund result */
export interface RefundResultDTO {
  success:      boolean
  refundId:     string
  reference:    string
  amount:       number
  currency:     Currency
  status:       RefundStatus
  method:       PaymentMethodType
  processedAt?: Date
  errorCode?:   string
}

/** Webhook event payload from providers */
export interface WebhookPayloadDTO {
  event:       WebhookEvent
  provider:    'paypal' | 'stripe' | 'crypto'
  rawPayload:  unknown          // original provider payload
  signature:   string           // for webhook verification
  receivedAt:  Date
}

/** Payout DTO (creator/affiliate payouts) */
export interface PayoutDTO {
  payoutId:    string
  recipientId: string           // user ID
  amount:      number
  currency:    Currency
  method:      PaymentMethodType
  reference:   string
  status:      'pending' | 'processing' | 'paid' | 'failed'
  scheduledAt: Date
  paidAt?:     Date
}

/** Customer (billing profile) */
export interface CustomerDTO {
  customerId:       string      // internal ID
  providerCustomerId?: string   // Stripe customer ID, PayPal billing agreement
  email:            string
  name?:            string
  defaultMethod?:   PaymentMethodType
  paymentMethods:   SavedPaymentMethodDTO[]
  createdAt:        Date
}

export interface SavedPaymentMethodDTO {
  id:           string
  type:         PaymentMethodType
  last4?:       string          // card last 4 digits
  brand?:       string          // Visa, Mastercard, etc.
  expMonth?:    number
  expYear?:     number
  isDefault:    boolean
  createdAt:    Date
}
