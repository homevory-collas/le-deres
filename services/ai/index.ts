// services/ai/index.ts
// AI provider abstraction for AI Companion feature.
// Connect real providers in Phase 5.

export interface AIPersonality {
  id:          string
  name:        string
  description: string
  traits:      string[]
  language:    string
  voiceId?:    string
  avatarUrl?:  string
  category:    'girlfriend' | 'companion' | 'mentor' | 'friend'
  isPremium:   boolean
  requiredTier: string
}

export interface ConversationMessage {
  role:      'user' | 'assistant' | 'system'
  content:   string
  timestamp: Date
}

export interface AIConversation {
  id:          string
  userId:      string
  characterId: string
  messages:    ConversationMessage[]
  memory?:     Record<string, unknown>  // persistent memory layer
  createdAt:   Date
  updatedAt:   Date
}

export interface AIGenerateOptions {
  personality:    AIPersonality
  messages:       ConversationMessage[]
  userMemory?:    Record<string, unknown>
  language?:      string
  maxTokens?:     number
  temperature?:   number
}

export interface AIProvider {
  name:        string
  supported:   boolean

  generate(options: AIGenerateOptions): Promise<string>
  generateStream?(options: AIGenerateOptions): AsyncIterable<string>
  embedText?(text: string): Promise<number[]>
  moderateContent?(text: string): Promise<{ safe: boolean; reason?: string }>
}

// ─── Mock AI provider ─────────────────────────────────────
class MockAIProvider implements AIProvider {
  name      = 'mock'
  supported = false

  async generate(options: AIGenerateOptions): Promise<string> {
    const lastMsg = options.messages[options.messages.length - 1]?.content ?? ''
    return `[${options.personality.name}] This is a placeholder response to: "${lastMsg.slice(0, 50)}…" — Connect an AI provider to enable real conversations.`
  }
}

// ─── Anthropic Claude placeholder ────────────────────────
export class AnthropicProvider implements AIProvider {
  name      = 'anthropic'
  supported = false
  // TODO: npm install @anthropic-ai/sdk
  // TODO: ANTHROPIC_API_KEY in .env
  async generate(): Promise<string> { throw new Error('Anthropic: not connected') }
}

// ─── OpenAI placeholder ───────────────────────────────────
export class OpenAIProvider implements AIProvider {
  name      = 'openai'
  supported = false
  // TODO: npm install openai
  // TODO: OPENAI_API_KEY in .env
  async generate(): Promise<string> { throw new Error('OpenAI: not connected') }
}

// ─── Google Gemini placeholder ────────────────────────────
export class GeminiProvider implements AIProvider {
  name      = 'gemini'
  supported = false
  // TODO: npm install @google/generative-ai
  async generate(): Promise<string> { throw new Error('Gemini: not connected') }
}

export function createAIProvider(): AIProvider {
  switch (process.env.AI_PROVIDER) {
    case 'anthropic': return new AnthropicProvider()
    case 'openai':    return new OpenAIProvider()
    case 'gemini':    return new GeminiProvider()
    default:          return new MockAIProvider()
  }
}

export const aiService = createAIProvider()

// Placeholder AI characters
export const AI_CHARACTERS: AIPersonality[] = [
  { id:'ai-1', name:'Élise',  description:'Parisian intellectual with a romantic soul',    traits:['romantic','intellectual','witty'],       language:'fr', category:'girlfriend', isPremium:false, requiredTier:'FREE',      avatarUrl:'' },
  { id:'ai-2', name:'Mila',   description:'Monaco-born, mysterious and sophisticated',    traits:['mysterious','sensual','elegant'],         language:'en', category:'girlfriend', isPremium:true,  requiredTier:'SILVER',    avatarUrl:'' },
  { id:'ai-3', name:'Viktor', description:'Viennese gentleman with sharp wit',             traits:['sophisticated','witty','charming'],       language:'de', category:'companion',  isPremium:false, requiredTier:'FREE',      avatarUrl:'' },
  { id:'ai-4', name:'Luna',   description:'Seoul-born artist, creative and passionate',   traits:['creative','passionate','caring'],         language:'ko', category:'girlfriend', isPremium:true,  requiredTier:'GOLD',      avatarUrl:'' },
  { id:'ai-5', name:'Aria',   description:'AI-native companion, infinitely adaptable',   traits:['adaptive','playful','attentive'],         language:'en', category:'girlfriend', isPremium:true,  requiredTier:'BLACK_VIP', avatarUrl:'' },
  { id:'ai-6', name:'Kenji',  description:'Tokyo minimalist, deep and contemplative',    traits:['deep','contemplative','gentle'],          language:'ja', category:'companion',  isPremium:true,  requiredTier:'SILVER',    avatarUrl:'' },
]

// ─── Recommendation Engine ────────────────────────────────
export interface Recommendation<T = unknown> {
  item:       T
  score:      number
  reason:     string
}

export interface RecommendationService {
  contentRecommendations(userId: string, limit?: number): Promise<Recommendation[]>
  productRecommendations(userId: string, limit?: number): Promise<Recommendation[]>
  creatorRecommendations(userId: string, limit?: number): Promise<Recommendation[]>
  membershipRecommendations(userId: string): Promise<Recommendation[]>
}

class MockRecommendationService implements RecommendationService {
  async contentRecommendations(userId: string, limit = 10) {
    return Array.from({ length: limit }, (_, i) => ({
      item:   { id: `content-${i}`, title: `Recommended Content #${i + 1}` },
      score:  Math.random(),
      reason: 'Based on your viewing history',
    }))
  }
  async productRecommendations(userId: string, limit = 8) {
    return Array.from({ length: limit }, (_, i) => ({
      item:   { id: `product-${i}`, name: `Recommended Product #${i + 1}` },
      score:  Math.random(),
      reason: 'Customers like you also bought',
    }))
  }
  async creatorRecommendations(userId: string, limit = 6) {
    return Array.from({ length: limit }, (_, i) => ({
      item:   { id: `creator-${i}`, displayName: `Creator #${i + 1}` },
      score:  Math.random(),
      reason: 'Popular in your region',
    }))
  }
  async membershipRecommendations(userId: string) {
    return [{ item: { tier: 'GOLD' }, score: 0.87, reason: 'Upgrade to unlock 200+ premium videos' }]
  }
}

export const recommendationService: RecommendationService = new MockRecommendationService()
