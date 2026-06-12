// services/streaming/index.ts
// Live streaming provider abstraction.
// Connect real providers (LiveKit, Agora, Twilio) in Phase 5.

export type RoomType  = 'public' | 'private' | 'vip' | 'creator'
export type RoomStatus= 'scheduled' | 'live' | 'ended' | 'cancelled'
export type GiftType  = 'rose' | 'heart' | 'diamond' | 'gold' | 'crown'

export interface StreamRoom {
  id:           string
  title:        string
  creatorId:    string
  type:         RoomType
  status:       RoomStatus
  viewerCount:  number
  maxViewers?:  number
  requiredTier: string
  thumbnailUrl?: string
  scheduledAt?: Date
  startedAt?:   Date
  endedAt?:     Date
  streamKey?:   string    // server-side only
  rtmpUrl?:     string    // server-side only
}

export interface StreamToken {
  token:       string
  roomId:      string
  userId:      string
  expiresAt:   Date
  permissions: ('view' | 'chat' | 'tip' | 'stream')[]
}

export interface VirtualGift {
  type:       GiftType
  senderId:   string
  receiverId: string
  roomId:     string
  value:      number       // credits
  message?:   string
  sentAt:     Date
}

export interface StreamingProvider {
  name:        string
  supported:   boolean

  createRoom(config: Partial<StreamRoom>): Promise<StreamRoom>
  startRoom(roomId: string): Promise<StreamRoom>
  endRoom(roomId: string): Promise<StreamRoom>
  getRoom(roomId: string): Promise<StreamRoom | null>
  listRooms(type?: RoomType): Promise<StreamRoom[]>
  joinToken(roomId: string, userId: string): Promise<StreamToken>
  kickViewer(roomId: string, userId: string): Promise<boolean>
}

// ─── Mock provider ────────────────────────────────────────
class MockStreamingProvider implements StreamingProvider {
  name      = 'mock'
  supported = false

  async createRoom(config: Partial<StreamRoom>): Promise<StreamRoom> {
    return {
      id:          `room-${Date.now()}`,
      title:       config.title ?? 'New Stream',
      creatorId:   config.creatorId ?? 'unknown',
      type:        config.type ?? 'public',
      status:      'scheduled',
      viewerCount: 0,
      requiredTier:'FREE',
    }
  }
  async startRoom(roomId: string): Promise<StreamRoom>   { return this.createRoom({ id: roomId }) }
  async endRoom(roomId: string):   Promise<StreamRoom>   { return this.createRoom({ id: roomId }) }
  async getRoom():                 Promise<null>         { return null }
  async listRooms():               Promise<StreamRoom[]> { return PLACEHOLDER_ROOMS }
  async joinToken(roomId: string, userId: string): Promise<StreamToken> {
    return { token: `mock_token_${userId}_${roomId}`, roomId, userId, expiresAt: new Date(Date.now() + 3600000), permissions: ['view', 'chat'] }
  }
  async kickViewer(): Promise<boolean> { return false }
}

// ─── LiveKit placeholder ──────────────────────────────────
export class LiveKitProvider extends MockStreamingProvider {
  name = 'livekit'
  // TODO: npm install livekit-client livekit-server-sdk
  // TODO: LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET in .env
}

// ─── Agora placeholder ────────────────────────────────────
export class AgoraProvider extends MockStreamingProvider {
  name = 'agora'
  // TODO: npm install agora-rtc-sdk-ng
  // TODO: AGORA_APP_ID, AGORA_APP_CERTIFICATE in .env
}

// ─── Twilio Video placeholder ─────────────────────────────
export class TwilioVideoProvider extends MockStreamingProvider {
  name = 'twilio-video'
  // TODO: npm install twilio
  // TODO: TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET in .env
}

export function createStreamingProvider(): StreamingProvider {
  switch (process.env.STREAMING_PROVIDER) {
    case 'livekit': return new LiveKitProvider()
    case 'agora':   return new AgoraProvider()
    case 'twilio':  return new TwilioVideoProvider()
    default:        return new MockStreamingProvider()
  }
}

export const streamingService = createStreamingProvider()

// Placeholder rooms data
export const PLACEHOLDER_ROOMS: StreamRoom[] = [
  { id:'r1', title:'Élise — Late Night Show 🌙', creatorId:'creator-1', type:'public', status:'live',      viewerCount:2841, requiredTier:'FREE' },
  { id:'r2', title:'Mila Gold Exclusive ✨',     creatorId:'creator-3', type:'vip',    status:'live',      viewerCount:482,  requiredTier:'GOLD' },
  { id:'r3', title:'Viktor VIP Session 👑',      creatorId:'creator-2', type:'private',status:'live',      viewerCount:124,  requiredTier:'BLACK_VIP' },
  { id:'r4', title:'Luna Weekend Special',       creatorId:'creator-4', type:'public', status:'scheduled', viewerCount:0,    requiredTier:'FREE', scheduledAt:new Date('2026-06-14T20:00:00') },
  { id:'r5', title:'Silver Members Only',        creatorId:'creator-5', type:'vip',    status:'scheduled', viewerCount:0,    requiredTier:'SILVER' },
]
