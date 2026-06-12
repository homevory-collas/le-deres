export type UserRole = 'guest' | 'member' | 'vip' | 'creator' | 'admin'

export type MembershipTier = 'free' | 'silver' | 'gold' | 'black_vip'

export interface User {
  id:         string
  email:      string
  username:   string
  displayName: string
  avatar?:    string
  role:       UserRole
  membership: MembershipTier
  createdAt:  Date
  updatedAt:  Date
}

export interface UserProfile {
  userId:     string
  bio?:       string
  location?:  string
  website?:   string
  social: {
    telegram?:  string
    instagram?: string
    twitter?:   string
  }
}

export interface Address {
  id:          string
  userId:      string
  label:       string
  fullName:    string
  line1:       string
  line2?:      string
  city:        string
  state:       string
  postalCode:  string
  country:     string
  isDefault:   boolean
}

export interface AuthState {
  user:        User | null
  isLoading:   boolean
  isAuthenticated: boolean
}
