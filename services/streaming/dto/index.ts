// services/streaming/dto/index.ts
// Data Transfer Objects for live streaming operations.

export type RoomType        = 'public' | 'private' | 'vip' | 'creator_only'
export type RoomStatus      = 'scheduled' | 'live' | 'ended' | 'cancelled'
export type ParticipantRole = 'host' | 'cohost' | 'moderator' | 'viewer' | 'vip_viewer'
export type GiftType        = 'rose' | 'heart' | 'diamond' | 'gold_bar' | 'crown' | 'firework'

/** Input: create a new stream room */
export interface CreateRoomDTO {
  title:         string
  creatorId:     string
  type:          RoomType
  requiredTier:  string             // 'FREE' | 'SILVER' | 'GOLD' | 'BLACK_VIP'
  maxViewers?:   number
  scheduledAt?:  Date
  description?:  string
  thumbnailUrl?: string
  enableChat:    boolean
  enableGifts:   boolean
  enableTips:    boolean
  password?:     string             // for private rooms
  metadata?:     Record<string, string>
}

/** Room entity */
export interface RoomDTO {
  roomId:        string
  providerRoomId:string             // provider's internal room ID
  title:         string
  creatorId:     string
  type:          RoomType
  status:        RoomStatus
  viewerCount:   number
  peakViewers:   number
  maxViewers?:   number
  requiredTier:  string
  thumbnailUrl?: string
  scheduledAt?:  Date
  startedAt?:    Date
  endedAt?:      Date
  streamKey?:    string             // RTMP stream key (host only)
  rtmpUrl?:      string             // RTMP ingest URL (host only)
  playbackUrl?:  string             // HLS/WebRTC playback URL
  chatEnabled:   boolean
  giftsEnabled:  boolean
  tipsEnabled:   boolean
  metadata?:     Record<string, string>
}

/** Token for joining a room */
export interface StreamTokenDTO {
  token:         string
  roomId:        string
  userId:        string
  role:          ParticipantRole
  expiresAt:     Date
  permissions:   string[]           // e.g. ['publish', 'subscribe', 'chat']
  serverUrl:     string             // WebRTC / WebSocket server URL
}

/** Chat message in a stream */
export interface StreamChatMessageDTO {
  messageId:     string
  roomId:        string
  userId:        string
  username:      string
  content:       string
  type:          'text' | 'gift' | 'tip' | 'system'
  metadata?:     { giftType?: GiftType; amount?: number }
  sentAt:        Date
}

/** Virtual gift */
export interface VirtualGiftDTO {
  giftId:        string
  type:          GiftType
  senderId:      string
  senderName:    string
  receiverId:    string
  roomId:        string
  value:         number             // platform credits / EUR value
  animationUrl?: string
  message?:      string
  sentAt:        Date
}

/** Tip */
export interface StreamTipDTO {
  tipId:         string
  senderId:      string
  senderName:    string
  receiverId:    string
  roomId:        string
  amount:        number
  currency:      string
  message?:      string
  sentAt:        Date
}

/** Stream analytics */
export interface StreamAnalyticsDTO {
  roomId:        string
  totalViewers:  number
  peakViewers:   number
  totalDuration: number             // seconds
  totalGifts:    number
  totalTips:     number
  totalRevenue:  number
  chatMessages:  number
  newFollowers:  number
  avgWatchTime:  number             // seconds
}

/** Scheduled stream notification */
export interface StreamScheduleDTO {
  roomId:        string
  title:         string
  creatorId:     string
  creatorName:   string
  scheduledAt:   Date
  type:          RoomType
  requiredTier:  string
  subscribedUserIds: string[]       // users to notify
}
