// services/streaming/providers/index.ts
// Streaming provider adapters for LiveKit, Agora, and Twilio Video.

import type { CreateRoomDTO, RoomDTO, StreamTokenDTO, RoomType, ParticipantRole } from '../dto'

// ─── Base interface ────────────────────────────────────────
export interface StreamingProviderAdapter {
  name:        string
  supported:   boolean
  createRoom(dto: CreateRoomDTO): Promise<RoomDTO>
  startRoom(roomId: string): Promise<RoomDTO>
  endRoom(roomId: string): Promise<RoomDTO>
  deleteRoom(roomId: string): Promise<void>
  getRoom(roomId: string): Promise<RoomDTO | null>
  listActiveRooms(): Promise<RoomDTO[]>
  generateToken(roomId: string, userId: string, role: ParticipantRole): Promise<StreamTokenDTO>
  kickParticipant(roomId: string, userId: string): Promise<boolean>
  muteParticipant(roomId: string, userId: string): Promise<boolean>
  getRoomStats(roomId: string): Promise<{ viewers: number; duration: number }>
}

// ─── LiveKit Adapter ──────────────────────────────────────
// Install: npm install livekit-client @livekit/agents livekit-server-sdk
// Env: LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET

export class LiveKitAdapter implements StreamingProviderAdapter {
  name      = 'livekit'
  supported = false
  // private roomClient: RoomServiceClient  // from livekit-server-sdk
  // private accessToken: AccessToken       // from livekit-server-sdk

  constructor(private config: { url: string; apiKey: string; apiSecret: string }) {
    // TODO:
    // import { RoomServiceClient, AccessToken } from 'livekit-server-sdk'
    // this.roomClient = new RoomServiceClient(config.url, config.apiKey, config.apiSecret)
    console.log('[LiveKit] Adapter initialized')
  }

  async createRoom(dto: CreateRoomDTO): Promise<RoomDTO> {
    // TODO:
    // const room = await this.roomClient.createRoom({
    //   name: `ld-${Date.now()}`,
    //   metadata: JSON.stringify({ title: dto.title, type: dto.type, requiredTier: dto.requiredTier }),
    //   maxParticipants: dto.maxViewers,
    //   emptyTimeout: 300,  // auto-close after 5min empty
    // })
    throw new Error('[LiveKit] createRoom: not yet integrated. npm install livekit-server-sdk')
  }

  async generateToken(roomId: string, userId: string, role: ParticipantRole): Promise<StreamTokenDTO> {
    // TODO:
    // import { AccessToken } from 'livekit-server-sdk'
    // const at = new AccessToken(this.config.apiKey, this.config.apiSecret, { identity: userId, ttl: '2h' })
    // at.addGrant({ roomJoin: true, room: roomId, canPublish: role === 'host' || role === 'cohost', canSubscribe: true })
    // const token = at.toJwt()
    throw new Error('[LiveKit] generateToken: not yet integrated.')
  }

  async startRoom(roomId: string): Promise<RoomDTO> { throw new Error('[LiveKit] startRoom: not yet integrated.') }
  async endRoom(roomId: string): Promise<RoomDTO>   { throw new Error('[LiveKit] endRoom: not yet integrated.') }
  async deleteRoom(roomId: string): Promise<void>   { throw new Error('[LiveKit] deleteRoom: not yet integrated.') }
  async getRoom(roomId: string): Promise<null>      { return null }
  async listActiveRooms(): Promise<RoomDTO[]>       { return [] }
  async kickParticipant(): Promise<boolean>         { return false }
  async muteParticipant(): Promise<boolean>         { return false }
  async getRoomStats(): Promise<{ viewers: number; duration: number }> { return { viewers: 0, duration: 0 } }

  static mockToken(roomId: string, userId: string, role: ParticipantRole): StreamTokenDTO {
    return {
      token:       `livekit_mock_token_${userId}_${roomId}`,
      roomId, userId, role,
      expiresAt:   new Date(Date.now() + 7200000),
      permissions: role === 'host' ? ['publish', 'subscribe', 'chat', 'moderate'] : ['subscribe', 'chat'],
      serverUrl:   process.env.LIVEKIT_URL ?? 'wss://mock.livekit.cloud',
    }
  }
}

// ─── Agora Adapter ────────────────────────────────────────
// Install: npm install agora-access-token agora-rtc-engine
// Env: AGORA_APP_ID, AGORA_APP_CERTIFICATE

export class AgoraAdapter implements StreamingProviderAdapter {
  name      = 'agora'
  supported = false

  constructor(private config: { appId: string; appCertificate: string; region: string }) {
    // TODO: Agora uses token-based auth, no server-side room management
    console.log('[Agora] Adapter initialized')
  }

  async generateToken(roomId: string, userId: string, role: ParticipantRole): Promise<StreamTokenDTO> {
    // TODO:
    // import { RtcTokenBuilder, RtcRole } from 'agora-access-token'
    // const agoraRole = role === 'host' ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER
    // const expireTime = Math.floor(Date.now() / 1000) + 7200
    // const channelName = roomId
    // const uid = parseInt(userId.replace(/\D/g, '').slice(0, 9))
    // const token = RtcTokenBuilder.buildTokenWithUid(this.config.appId, this.config.appCertificate, channelName, uid, agoraRole, expireTime)
    throw new Error('[Agora] generateToken: not yet integrated. npm install agora-access-token')
  }

  async createRoom(dto: CreateRoomDTO): Promise<RoomDTO> {
    // Agora doesn't have server-side rooms — channels are created client-side on join
    // Store room metadata in our own database
    throw new Error('[Agora] createRoom: Agora uses client-side channels. Store in DB.')
  }

  async startRoom(roomId: string): Promise<RoomDTO> { throw new Error('[Agora] not integrated') }
  async endRoom(roomId: string): Promise<RoomDTO>   { throw new Error('[Agora] not integrated') }
  async deleteRoom(): Promise<void>                 { }
  async getRoom(): Promise<null>                    { return null }
  async listActiveRooms(): Promise<RoomDTO[]>       { return [] }
  async kickParticipant(): Promise<boolean>         { return false }
  async muteParticipant(): Promise<boolean>         { return false }
  async getRoomStats(): Promise<{ viewers: number; duration: number }> { return { viewers: 0, duration: 0 } }
}

// ─── Twilio Video Adapter ─────────────────────────────────
// Install: npm install twilio
// Env: TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET

export class TwilioVideoAdapter implements StreamingProviderAdapter {
  name      = 'twilio-video'
  supported = false

  constructor(private config: { accountSid: string; apiKey: string; apiSecret: string }) {
    // TODO:
    // import twilio from 'twilio'
    // this.client = twilio(config.accountSid, config.apiSecret, { accountSid: config.accountSid })
    console.log('[Twilio Video] Adapter initialized')
  }

  async createRoom(dto: CreateRoomDTO): Promise<RoomDTO> {
    // TODO:
    // const room = await this.client.video.v1.rooms.create({
    //   uniqueName: `ld-${Date.now()}`,
    //   type: dto.maxViewers && dto.maxViewers > 50 ? 'group-small' : 'group',
    //   maxParticipants: dto.maxViewers ?? 200,
    //   recordParticipantsOnConnect: false,
    //   statusCallback: `${process.env.NEXT_PUBLIC_APP_URL}/api/streaming/webhook`,
    // })
    throw new Error('[Twilio] createRoom: not yet integrated. npm install twilio')
  }

  async generateToken(roomId: string, userId: string, role: ParticipantRole): Promise<StreamTokenDTO> {
    // TODO:
    // import { AccessToken, VideoGrant } from 'twilio/lib/jwt/AccessToken'
    // const token = new AccessToken(this.config.accountSid, this.config.apiKey, this.config.apiSecret)
    // token.identity = userId
    // const videoGrant = new VideoGrant({ room: roomId })
    // token.addGrant(videoGrant)
    // return { token: token.toJwt(), ... }
    throw new Error('[Twilio] generateToken: not yet integrated.')
  }

  async startRoom(roomId: string): Promise<RoomDTO>  { throw new Error('[Twilio] not integrated') }
  async endRoom(roomId: string): Promise<RoomDTO>    { throw new Error('[Twilio] not integrated') }
  async deleteRoom(): Promise<void>                  { }
  async getRoom(): Promise<null>                     { return null }
  async listActiveRooms(): Promise<RoomDTO[]>        { return [] }
  async kickParticipant(): Promise<boolean>          { return false }
  async muteParticipant(): Promise<boolean>          { return false }
  async getRoomStats(): Promise<{ viewers: number; duration: number }> { return { viewers: 0, duration: 0 } }
}

// ─── Mock Adapter (development) ───────────────────────────
export class MockStreamingAdapter implements StreamingProviderAdapter {
  name      = 'mock'
  supported = false

  async createRoom(dto: CreateRoomDTO): Promise<RoomDTO> {
    return {
      roomId:         `room-${Date.now()}`,
      providerRoomId: `mock-${Date.now()}`,
      title:          dto.title,
      creatorId:      dto.creatorId,
      type:           dto.type,
      status:         dto.scheduledAt ? 'scheduled' : 'live',
      viewerCount:    0,
      peakViewers:    0,
      maxViewers:     dto.maxViewers,
      requiredTier:   dto.requiredTier,
      scheduledAt:    dto.scheduledAt,
      chatEnabled:    dto.enableChat,
      giftsEnabled:   dto.enableGifts,
      tipsEnabled:    dto.enableTips,
    }
  }
  async startRoom(roomId: string): Promise<RoomDTO>  { return this.createRoom({ title:'',creatorId:'',type:'public',requiredTier:'FREE',enableChat:true,enableGifts:false,enableTips:false }) }
  async endRoom(roomId: string): Promise<RoomDTO>    { return this.startRoom(roomId) }
  async deleteRoom(): Promise<void>                  {}
  async getRoom(): Promise<null>                     { return null }
  async listActiveRooms(): Promise<RoomDTO[]>        { return [] }
  async generateToken(roomId: string, userId: string, role: ParticipantRole): Promise<StreamTokenDTO> {
    return LiveKitAdapter.mockToken(roomId, userId, role)
  }
  async kickParticipant(): Promise<boolean>          { return true }
  async muteParticipant(): Promise<boolean>          { return true }
  async getRoomStats(): Promise<{ viewers: number; duration: number }> { return { viewers: Math.floor(Math.random()*1000), duration: 3600 } }
}

// ─── Factory ──────────────────────────────────────────────
export function createStreamingAdapter(): StreamingProviderAdapter {
  switch (process.env.STREAMING_PROVIDER) {
    case 'livekit': return new LiveKitAdapter({
      url:        process.env.LIVEKIT_URL        ?? '',
      apiKey:     process.env.LIVEKIT_API_KEY    ?? '',
      apiSecret:  process.env.LIVEKIT_API_SECRET ?? '',
    })
    case 'agora': return new AgoraAdapter({
      appId:          process.env.AGORA_APP_ID          ?? '',
      appCertificate: process.env.AGORA_APP_CERTIFICATE ?? '',
      region:         process.env.AGORA_REGION          ?? 'us',
    })
    case 'twilio': return new TwilioVideoAdapter({
      accountSid: process.env.TWILIO_ACCOUNT_SID ?? '',
      apiKey:     process.env.TWILIO_API_KEY     ?? '',
      apiSecret:  process.env.TWILIO_API_SECRET  ?? '',
    })
    default: return new MockStreamingAdapter()
  }
}
