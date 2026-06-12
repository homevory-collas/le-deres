/**
 * PAYMENT SERVICE PLACEHOLDER
 * Integrate PayPal / Stripe / USDT in Phase 2
 */

export type PaymentMethod = 'paypal' | 'visa' | 'mastercard' | 'usdt'

export interface PaymentIntent {
  id:       string
  amount:   number
  currency: string
  method:   PaymentMethod
  status:   'pending' | 'success' | 'failed'
}

export interface PaymentResult {
  success:   boolean
  reference: string
  message:   string
}

export async function createPaymentIntent(
  amount: number,
  currency: string,
  method: PaymentMethod
): Promise<PaymentIntent> {
  // TODO: integrate payment provider
  return {
    id:       `pi_placeholder_${Date.now()}`,
    amount,
    currency,
    method,
    status:   'pending',
  }
}

export async function confirmPayment(
  intentId: string
): Promise<PaymentResult> {
  // TODO: confirm with provider
  return {
    success:   false,
    reference: intentId,
    message:   'Payment not implemented',
  }
}

export async function refundPayment(
  reference: string,
  amount?: number
): Promise<PaymentResult> {
  // TODO: implement refund
  return {
    success:   false,
    reference,
    message:   'Refund not implemented',
  }
}

export const PAYMENT_METHODS: Record<PaymentMethod, { label: string; icon: string }> = {
  paypal:     { label: 'PayPal',     icon: '/icons/paypal.svg' },
  visa:       { label: 'Visa',       icon: '/icons/visa.svg' },
  mastercard: { label: 'Mastercard', icon: '/icons/mastercard.svg' },
  usdt:       { label: 'USDT',       icon: '/icons/usdt.svg' },
}
