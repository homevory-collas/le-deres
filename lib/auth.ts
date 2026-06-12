/**
 * AUTH PLACEHOLDER
 * Replace with NextAuth.js / Clerk / custom JWT in Phase 2
 */
import type { User } from '@/types'

export async function getSession(): Promise<User | null> {
  // TODO: implement real session lookup
  return null
}

export async function requireAuth(): Promise<User> {
  const user = await getSession()
  if (!user) throw new Error('Unauthorized')
  return user
}

export async function requireMembership(tier: string): Promise<User> {
  const user = await requireAuth()
  // TODO: check membership tier
  return user
}

export async function signIn(email: string, password: string) {
  // TODO: implement sign in
  throw new Error('Auth not implemented')
}

export async function signOut() {
  // TODO: implement sign out
}

export async function signUp(data: {
  email: string
  password: string
  username: string
}) {
  // TODO: implement sign up
  throw new Error('Auth not implemented')
}
