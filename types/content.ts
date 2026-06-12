export type ContentType = 'video' | 'image' | 'live' | 'ai_video' | 'ai_girlfriend'

export type ContentRegion =
  | 'european'
  | 'asian_jav'
  | 'asian_chinese'
  | 'asian_korean'
  | 'asian_general'
  | 'american_usa'
  | 'american_canada'
  | 'american_latin'

export type ContentStatus = 'published' | 'draft' | 'review' | 'removed'

export interface ContentCategory {
  id:          string
  slug:        string
  name:        string
  description: string
  region?:     ContentRegion
  type:        ContentType
  parentId?:   string
  children?:   ContentCategory[]
  count:       number
}

export interface ContentItem {
  id:          string
  title:       string
  slug:        string
  description: string
  thumbnail:   string
  type:        ContentType
  region?:     ContentRegion
  categoryId:  string
  creatorId?:  string
  duration?:   number
  views:       number
  likes:       number
  isPremium:   boolean
  requiredTier: string
  tags:        string[]
  status:      ContentStatus
  publishedAt: Date
  createdAt:   Date
}

export interface Creator {
  id:          string
  userId:      string
  displayName: string
  avatar:      string
  bio:         string
  region?:     ContentRegion
  followerCount: number
  contentCount:  number
  isVerified:  boolean
}
