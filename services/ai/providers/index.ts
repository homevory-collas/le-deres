// services/ai/providers/index.ts
// AI provider adapters: OpenAI, Anthropic Claude, Google Gemini.
// Install per provider. Connect in Phase 6.

import type { AIPersonality, ConversationMessage, AIGenerateOptions } from '../index'

// ─── AI DTOs ─────────────────────────────────────────────
export interface AIRequestDTO {
  characterId:     string
  userId:          string
  messages:        ConversationMessage[]
  personality:     AIPersonality
  userMemory?:     UserMemoryDTO
  language?:       string
  maxTokens?:      number
  temperature?:    number
  stream?:         boolean
}

export interface AIResponseDTO {
  content:         string
  characterId:     string
  model:           string
  provider:        string
  tokensUsed:      number
  finishReason:    'stop' | 'length' | 'content_filter'
  memoryUpdate?:   Partial<UserMemoryDTO>
  latencyMs:       number
}

/** Persistent user memory for AI companions */
export interface UserMemoryDTO {
  userId:          string
  characterId:     string
  // Personal details learned from conversation
  userName?:       string
  preferences:     string[]         // ['likes wine', 'hates cold', 'works in finance']
  interests:       string[]
  personalDetails: Record<string, string>  // { 'birthday': 'March 15', 'city': 'Paris' }
  // Relationship progression
  relationshipStage: 'stranger' | 'acquaintance' | 'friend' | 'close' | 'intimate'
  totalMessages:   number
  lastInteraction: Date
  // Special events
  milestones:      { event: string; date: Date }[]
  // Content preferences
  contentTopics:   string[]
  language:        string
  updatedAt:       Date
}

export interface PersonalityPresetDTO {
  id:              string
  name:            string
  basePrompt:      string           // system prompt template
  traits:          string[]
  speakingStyle:   string           // 'romantic' | 'playful' | 'intellectual' | 'mysterious'
  language:        string
  voiceId?:        string           // for TTS
  temperatureHint: number           // 0.7-0.9 typical for companions
}

// ─── OpenAI Adapter ───────────────────────────────────────
// Install: npm install openai
// Env: OPENAI_API_KEY, OPENAI_ORG_ID, OPENAI_MODEL

export class OpenAIAdapter {
  name = 'openai'
  // private client: OpenAI  // from 'openai'

  constructor(private config: { apiKey: string; orgId?: string; model: string; baseURL?: string }) {
    // TODO:
    // import OpenAI from 'openai'
    // this.client = new OpenAI({ apiKey: config.apiKey, organization: config.orgId, baseURL: config.baseURL })
    console.log('[OpenAI] Adapter initialized — model:', config.model)
  }

  async generate(dto: AIRequestDTO): Promise<AIResponseDTO> {
    // TODO:
    // const systemPrompt = this.buildSystemPrompt(dto.personality, dto.userMemory, dto.language)
    // const response = await this.client.chat.completions.create({
    //   model:       this.config.model,
    //   temperature: dto.temperature ?? 0.85,
    //   max_tokens:  dto.maxTokens  ?? 500,
    //   messages: [
    //     { role: 'system', content: systemPrompt },
    //     ...dto.messages.map(m => ({ role: m.role, content: m.content })),
    //   ],
    // })
    // return { content: response.choices[0].message.content, tokensUsed: response.usage?.total_tokens ?? 0, ... }
    throw new Error('[OpenAI] generate: not yet integrated. npm install openai')
  }

  async* generateStream(dto: AIRequestDTO): AsyncIterable<string> {
    // TODO:
    // const stream = await this.client.chat.completions.create({ ...params, stream: true })
    // for await (const chunk of stream) yield chunk.choices[0]?.delta?.content ?? ''
    throw new Error('[OpenAI] generateStream: not yet integrated.')
  }

  async moderateContent(text: string): Promise<{ safe: boolean; flags: string[] }> {
    // TODO:
    // const response = await this.client.moderations.create({ input: text })
    // const result = response.results[0]
    // return { safe: !result.flagged, flags: Object.entries(result.categories).filter(([,v])=>v).map(([k])=>k) }
    throw new Error('[OpenAI] moderateContent: not yet integrated.')
  }

  async embedText(text: string): Promise<number[]> {
    // TODO:
    // const response = await this.client.embeddings.create({ model: 'text-embedding-3-small', input: text })
    // return response.data[0].embedding
    throw new Error('[OpenAI] embedText: not yet integrated.')
  }

  private buildSystemPrompt(personality: AIPersonality, memory?: UserMemoryDTO, language?: string): string {
    return [
      `You are ${personality.name}, ${personality.description}.`,
      `Your traits: ${personality.traits.join(', ')}.`,
      memory?.userName ? `The user's name is ${memory.userName}.` : '',
      memory?.preferences?.length ? `You know they like: ${memory.preferences.join(', ')}.` : '',
      `Your relationship stage: ${memory?.relationshipStage ?? 'stranger'}.`,
      language ? `Respond in ${language}.` : '',
      'Be warm, genuine and remember details from past conversations.',
    ].filter(Boolean).join('\n')
  }

  static mockResponse(dto: AIRequestDTO): AIResponseDTO {
    const lastMsg = dto.messages[dto.messages.length - 1]?.content ?? ''
    return {
      content:      `[${dto.personality.name}] Placeholder response to: "${lastMsg.slice(0, 30)}…" — Connect OpenAI to enable real AI responses.`,
      characterId:  dto.characterId,
      model:        'gpt-4o-mock',
      provider:     'openai',
      tokensUsed:   0,
      finishReason: 'stop',
      latencyMs:    0,
    }
  }
}

// ─── Anthropic Claude Adapter ─────────────────────────────
// Install: npm install @anthropic-ai/sdk
// Env: ANTHROPIC_API_KEY, ANTHROPIC_MODEL

export class AnthropicAdapter {
  name = 'anthropic'

  constructor(private config: { apiKey: string; model: string }) {
    // TODO:
    // import Anthropic from '@anthropic-ai/sdk'
    // this.client = new Anthropic({ apiKey: config.apiKey })
    console.log('[Anthropic] Adapter initialized — model:', config.model)
  }

  async generate(dto: AIRequestDTO): Promise<AIResponseDTO> {
    // TODO:
    // const systemPrompt = this.buildSystemPrompt(dto.personality, dto.userMemory, dto.language)
    // const response = await this.client.messages.create({
    //   model:      this.config.model,  // 'claude-sonnet-4-5' or 'claude-opus-4-6'
    //   max_tokens: dto.maxTokens ?? 500,
    //   system:     systemPrompt,
    //   messages:   dto.messages.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content })),
    // })
    // const content = response.content[0].type === 'text' ? response.content[0].text : ''
    // return { content, tokensUsed: response.usage.input_tokens + response.usage.output_tokens, ... }
    throw new Error('[Anthropic] generate: not yet integrated. npm install @anthropic-ai/sdk')
  }

  async* generateStream(dto: AIRequestDTO): AsyncIterable<string> {
    // TODO:
    // const stream = await this.client.messages.stream({ ...params })
    // for await (const event of stream) if (event.type === 'content_block_delta') yield event.delta.text
    throw new Error('[Anthropic] generateStream: not yet integrated.')
  }

  private buildSystemPrompt(personality: AIPersonality, memory?: UserMemoryDTO, language?: string): string {
    return [
      `You are ${personality.name}. ${personality.description}`,
      `Personality traits: ${personality.traits.join(', ')}.`,
      memory?.userName ? `User's name: ${memory.userName}.` : '',
      `Relationship: ${memory?.relationshipStage ?? 'new connection'}.`,
      language && language !== 'en' ? `Please respond in ${language}.` : '',
    ].filter(Boolean).join(' ')
  }
}

// ─── Google Gemini Adapter ────────────────────────────────
// Install: npm install @google/generative-ai
// Env: GOOGLE_AI_API_KEY, GEMINI_MODEL

export class GeminiAdapter {
  name = 'gemini'

  constructor(private config: { apiKey: string; model: string }) {
    // TODO:
    // import { GoogleGenerativeAI } from '@google/generative-ai'
    // this.client = new GoogleGenerativeAI(config.apiKey)
    // this.model = this.client.getGenerativeModel({ model: config.model })
    console.log('[Gemini] Adapter initialized — model:', config.model)
  }

  async generate(dto: AIRequestDTO): Promise<AIResponseDTO> {
    // TODO:
    // const chat = this.model.startChat({ history: dto.messages.slice(0,-1).map(m => ({ role: m.role === 'assistant' ? 'model' : m.role, parts: [{ text: m.content }] })) })
    // const lastMsg = dto.messages[dto.messages.length - 1].content
    // const result = await chat.sendMessage(lastMsg)
    // const response = await result.response
    // return { content: response.text(), ... }
    throw new Error('[Gemini] generate: not yet integrated. npm install @google/generative-ai')
  }
}

// ─── User Memory Service ──────────────────────────────────
export class UserMemoryService {
  async load(userId: string, characterId: string): Promise<UserMemoryDTO | null> {
    // TODO: load from database
    // const record = await db.aiConversation.findFirst({ where: { userId, characterId } })
    // return record?.memory as UserMemoryDTO ?? null
    return null
  }

  async save(memory: UserMemoryDTO): Promise<void> {
    // TODO: upsert to database
    // await db.aiConversation.upsert({ where: { userId_characterId: ... }, update: { memory }, create: { ... } })
  }

  async extractMemoryUpdate(
    response: string,
    existing: UserMemoryDTO | null,
  ): Promise<Partial<UserMemoryDTO>> {
    // TODO: use a lightweight LLM call to extract facts from the conversation
    // e.g. "User mentioned they live in Paris" → { personalDetails: { city: 'Paris' } }
    return {}
  }
}

export const userMemoryService = new UserMemoryService()

// ─── Factory ──────────────────────────────────────────────
export function createAIAdapter(): OpenAIAdapter | AnthropicAdapter | GeminiAdapter {
  switch (process.env.AI_PROVIDER) {
    case 'openai':    return new OpenAIAdapter({
      apiKey: process.env.OPENAI_API_KEY ?? '',
      orgId:  process.env.OPENAI_ORG_ID,
      model:  process.env.OPENAI_MODEL ?? 'gpt-4o',
    })
    case 'anthropic': return new AnthropicAdapter({
      apiKey: process.env.ANTHROPIC_API_KEY ?? '',
      model:  process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-6',
    })
    case 'gemini': return new GeminiAdapter({
      apiKey: process.env.GOOGLE_AI_API_KEY ?? '',
      model:  process.env.GEMINI_MODEL ?? 'gemini-1.5-pro',
    })
    default: return new OpenAIAdapter({ apiKey: 'mock', model: 'mock' })
  }
}
