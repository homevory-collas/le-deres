// hooks/useAuth.ts
'use client'
import { create } from 'zustand'
import type { AuthState, User } from '@/types'

interface AuthStore extends AuthState {
  setUser:   (user: User | null) => void
  setLoading:(loading: boolean)  => void
}

export const useAuth = create<AuthStore>((set) => ({
  user:            null,
  isLoading:       true,
  isAuthenticated: false,
  setUser:    (user)    => set({ user, isAuthenticated: !!user, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
}))

// hooks/useMembership.ts
import type { MembershipTier } from '@/types'

const TIER_RANK: Record<MembershipTier, number> = {
  free:      0,
  silver:    1,
  gold:      2,
  black_vip: 3,
}

export function useMembership() {
  const user = useAuth((s) => s.user)
  const tier = (user?.membership ?? 'free') as MembershipTier

  const hasAccess = (required: MembershipTier) =>
    TIER_RANK[tier] >= TIER_RANK[required]

  return { tier, hasAccess }
}
