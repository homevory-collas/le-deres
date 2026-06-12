'use client'

import * as React from 'react'
import { type Role, type Permission, hasPermission, hasAnyPermission, ROLE_META } from './index'
import { Shield, Lock } from 'lucide-react'

// ─── useRole hook ─────────────────────────────────────────
export function useRole(): { role: Role; can: (p: Permission) => boolean; canAny: (ps: Permission[]) => boolean } {
  // TODO: replace with real session from auth provider
  const role: Role = 'admin'  // placeholder
  return {
    role,
    can:    (p)  => hasPermission(role, p),
    canAny: (ps) => hasAnyPermission(role, ps),
  }
}

// ─── PermissionGate — renders children only if permitted ──
export function PermissionGate({
  permission, children, fallback,
}: {
  permission: Permission
  children:   React.ReactNode
  fallback?:  React.ReactNode
}) {
  const { can } = useRole()
  if (!can(permission)) return fallback ? <>{fallback}</> : null
  return <>{children}</>
}

// ─── RoleGate — renders only for specific roles ───────────
export function RoleGate({
  roles, children, fallback,
}: {
  roles:     Role[]
  children:  React.ReactNode
  fallback?: React.ReactNode
}) {
  const { role } = useRole()
  if (!roles.includes(role)) return fallback ? <>{fallback}</> : null
  return <>{children}</>
}

// ─── AccessDenied component ───────────────────────────────
export function AccessDenied({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 border border-border rounded-sm flex items-center justify-center mb-4">
        <Lock size={24} className="text-muted-foreground" />
      </div>
      <h2 className="text-lg font-medium mb-2">Access Denied</h2>
      <p className="text-sm text-muted-foreground max-w-sm">
        {message ?? 'You do not have permission to access this area. Contact your administrator.'}
      </p>
    </div>
  )
}
