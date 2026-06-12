export type PostType = 'text' | 'image' | 'video' | 'story' | 'event'

export interface CommunityPost {
  id:          string
  authorId:    string
  content:     string
  type:        PostType
  media?:      string[]
  groupId?:    string
  likes:       number
  comments:    number
  shares:      number
  isPrivate:   boolean
  createdAt:   Date
}

export interface CommunityGroup {
  id:          string
  name:        string
  slug:        string
  description: string
  cover?:      string
  memberCount: number
  isPrivate:   boolean
  createdAt:   Date
}

export interface CommunityEvent {
  id:          string
  title:       string
  description: string
  cover?:      string
  startDate:   Date
  endDate:     Date
  location?:   string
  isOnline:    boolean
  attendeeCount: number
  createdAt:   Date
}

export interface Message {
  id:         string
  senderId:   string
  receiverId: string
  content:    string
  isRead:     boolean
  createdAt:  Date
}

export interface Comment {
  id:        string
  postId:    string
  authorId:  string
  content:   string
  likes:     number
  createdAt: Date
}
