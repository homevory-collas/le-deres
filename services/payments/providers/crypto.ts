// services/payments/providers/crypto.ts
// Crypto payment adapters for USDT (TRC-20/ERC-20) and USDC (ERC-20).
// Integration approach: generate wallet address per order, monitor blockchain.
// Install: npm install ethers (ERC-20) OR tronweb (TRC-20)
// Env: CRYPTO_HOT_WALLET_PRIVATE_KEY, INFURA_PROJECT_ID, TRON_API_KEY

import type {
  CreatePaymentIntentDTO, PaymentIntentResponseDTO,
  ConfirmPaymentDTO, PaymentResultDTO,
  RefundRequestDTO, RefundResultDTO,
} from '../dto'

// ─── Contract addresses ───────────────────────────────────
export const USDT_CONTRACTS = {
  trc20:   'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',  // TRON Mainnet USDT
  erc20:   '0xdAC17F958D2ee523a2206206994597C13D831ec7', // Ethereum Mainnet USDT
  polygon: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', // Polygon USDT
}

export const USDC_CONTRACTS = {
  erc20:   '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // Ethereum Mainnet USDC
  polygon: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // Polygon USDC
  solana:  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // Solana USDC
}

export type CryptoNetwork = 'tron' | 'ethereum' | 'polygon' | 'solana'
export type CryptoToken   = 'USDT' | 'USDC'

export interface CryptoPaymentConfig {
  hotWalletAddress: string      // receiving wallet address
  minConfirmations: number      // blocks required for confirmation
  expiryMinutes:    number      // order expiry window
  acceptedNetworks: CryptoNetwork[]
}

export interface CryptoOrderDTO {
  orderId:        string
  token:          CryptoToken
  network:        CryptoNetwork
  amount:         number        // in token units (e.g. 89.99 USDT)
  walletAddress:  string        // receiving address
  expiresAt:      Date
  qrCodeData:     string        // URI for QR code (EIP-681 / TIP-681)
  contractAddress:string
}

export interface CryptoTxStatus {
  txHash:        string
  confirmed:     boolean
  confirmations: number
  required:      number
  amount:        number
  token:         CryptoToken
  network:       CryptoNetwork
  from:          string
  to:            string
  timestamp?:    Date
}

// ─── USDT Adapter ─────────────────────────────────────────
export class USDTAdapter {
  constructor(private config: CryptoPaymentConfig) {
    console.log('[USDT] Adapter initialized — accepted networks:', config.acceptedNetworks)
  }

  /**
   * Create a crypto payment order.
   * In production: generate unique sub-address per order (HD wallet derivation).
   */
  async createOrder(dto: CreatePaymentIntentDTO): Promise<CryptoOrderDTO> {
    // TODO for TRC-20 (TRON):
    // const TronWeb = require('tronweb')
    // const tronWeb = new TronWeb({ fullHost: 'https://api.trongrid.io', privateKey: process.env.TRON_PRIVATE_KEY })
    // const address = tronWeb.address.fromPrivateKey(derivedPrivateKey)  // HD wallet path
    //
    // TODO for ERC-20 (Ethereum):
    // const { ethers } = require('ethers')
    // const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic).deriveChild(orderIndex)
    // const address = wallet.address

    const network: CryptoNetwork = 'tron'   // default to TRC-20 (lowest fees)
    const contractAddress = network === 'tron' ? USDT_CONTRACTS.trc20 : USDT_CONTRACTS.erc20

    throw new Error('[USDT] createOrder: not yet integrated. Install tronweb or ethers.')
  }

  /**
   * Poll/webhook: check if payment TX is confirmed.
   */
  async checkTransaction(txHash: string, network: CryptoNetwork): Promise<CryptoTxStatus> {
    // TODO for TRON:
    // GET https://api.trongrid.io/v1/transactions/{txHash}
    //
    // TODO for Ethereum:
    // const provider = new ethers.InfuraProvider('mainnet', process.env.INFURA_PROJECT_ID)
    // const tx = await provider.getTransaction(txHash)
    // const receipt = await provider.getTransactionReceipt(txHash)
    // const confirmed = receipt.confirmations >= this.config.minConfirmations
    throw new Error('[USDT] checkTransaction: not yet integrated.')
  }

  /**
   * NOTE: Crypto refunds are manual (send from hot wallet).
   * This creates a refund record; actual on-chain TX is processed manually or via automated payout.
   */
  async refund(dto: RefundRequestDTO): Promise<RefundResultDTO> {
    // In production: transfer from hot wallet back to payer address
    // Requires payer to provide their wallet address
    throw new Error('[USDT] refund: requires manual on-chain TX. Not automated.')
  }

  // ─── Mock ──────────────────────────────────────────────
  static mockOrder(dto: CreatePaymentIntentDTO): CryptoOrderDTO {
    const amount = dto.amount / 100  // convert cents → USDT
    return {
      orderId:         `crypto-order-${Date.now()}`,
      token:           'USDT',
      network:         'tron',
      amount,
      walletAddress:   'TVdE5VGzBnBCMQJFtKVgB8uFvVXmM3fMVB',  // mock address
      expiresAt:       new Date(Date.now() + 30 * 60000),
      qrCodeData:      `tron:TVdE5VGzBnBCMQJFtKVgB8uFvVXmM3fMVB?amount=${amount}&token=USDT`,
      contractAddress: USDT_CONTRACTS.trc20,
    }
  }
}

// ─── USDC Adapter ─────────────────────────────────────────
export class USDCAdapter extends USDTAdapter {
  // USDC uses same interface, different contracts
  // Primarily ERC-20 on Ethereum/Polygon

  static mockOrder(dto: CreatePaymentIntentDTO): CryptoOrderDTO {
    const amount = dto.amount / 100
    return {
      orderId:         `usdc-order-${Date.now()}`,
      token:           'USDC',
      network:         'polygon',  // Polygon for lower gas fees
      amount,
      walletAddress:   '0x742d35Cc6634C0532925a3b8D4C9B3E1f69A8e65',  // mock
      expiresAt:       new Date(Date.now() + 30 * 60000),
      qrCodeData:      `ethereum:0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174@137/transfer?address=0x742d35Cc6634C0532925a3b8D4C9B3E1f69A8e65&uint256=${amount * 1e6}`,
      contractAddress: USDC_CONTRACTS.polygon,
    }
  }
}

// ─── Exchange rate service ────────────────────────────────
export async function getCryptoExchangeRate(fromCurrency: string, toToken: 'USDT' | 'USDC'): Promise<number> {
  // TODO: fetch from CoinGecko or similar
  // GET https://api.coingecko.com/api/v3/simple/price?ids=tether,usd-coin&vs_currencies=eur,gbp,jpy
  const mockRates: Record<string, number> = {
    'EUR/USDT': 1.08, 'USD/USDT': 1.00, 'GBP/USDT': 1.27,
    'EUR/USDC': 1.08, 'USD/USDC': 1.00, 'GBP/USDC': 1.27,
  }
  return mockRates[`${fromCurrency}/${toToken}`] ?? 1.0
}

export function createUSDTAdapter(): USDTAdapter {
  return new USDTAdapter({
    hotWalletAddress: process.env.USDT_HOT_WALLET ?? 'mock_wallet',
    minConfirmations: parseInt(process.env.USDT_MIN_CONFIRMATIONS ?? '19'),  // ~1 min on TRON
    expiryMinutes:    30,
    acceptedNetworks: ['tron', 'ethereum', 'polygon'],
  })
}

export function createUSDCAdapter(): USDCAdapter {
  return new USDCAdapter({
    hotWalletAddress: process.env.USDC_HOT_WALLET ?? 'mock_wallet',
    minConfirmations: parseInt(process.env.USDC_MIN_CONFIRMATIONS ?? '12'),
    expiryMinutes:    30,
    acceptedNetworks: ['ethereum', 'polygon'],
  })
}
