// lib/rbac/index.ts
// Role-Based Access Control system for LE DÉSIR enterprise platform.

// ─── Role definitions ─────────────────────────────────────
export type Role =
  | 'super_admin'
  | 'admin'
  | 'moderator'
  | 'creator_manager'
  | 'marketplace_manager'
  | 'support_agent'
  | 'finance_manager'
  | 'creator'
  | 'vip_member'
  | 'member'
  | 'guest'

// ─── Permission definitions ───────────────────────────────
export type Permission =
  // User management
  | 'users.view'      | 'users.create'    | 'users.edit'      | 'users.delete'    | 'users.ban'
  // Content
  | 'content.view'    | 'content.create'  | 'content.edit'    | 'content.delete'  | 'content.publish'  | 'content.feature'
  // Marketplace
  | 'products.view'   | 'products.create' | 'products.edit'   | 'products.delete'
  | 'orders.view'     | 'orders.edit'     | 'orders.refund'
  | 'inventory.view'  | 'inventory.edit'
  | 'coupons.view'    | 'coupons.create'  | 'coupons.edit'    | 'coupons.delete'
  // Membership
  | 'membership.view' | 'membership.edit' | 'membership.grant'| 'membership.revoke'
  // Community
  | 'community.view'  | 'community.moderate' | 'community.ban'
  | 'reports.view'    | 'reports.resolve'
  // Creators
  | 'creators.view'   | 'creators.verify' | 'creators.suspend'| 'creators.payouts'
  // Finance
  | 'revenue.view'    | 'payouts.view'    | 'payouts.process' | 'refunds.process'
  // Analytics
  | 'analytics.view'  | 'analytics.export'
  // Settings
  | 'settings.view'   | 'settings.edit'
  // Roles
  | 'roles.view'      | 'roles.edit'
  // Support
  | 'tickets.view'    | 'tickets.assign'  | 'tickets.resolve'
  // Compliance
  | 'compliance.view' | 'compliance.edit' | 'dmca.manage'
  // Media
  | 'media.view'      | 'media.upload'    | 'media.delete'
  // Notifications
  | 'notifications.send'
  // AI
  | 'ai.manage'
  // Streaming
  | 'streaming.manage'
  // Referrals
  | 'referrals.view'  | 'referrals.manage'
  // Creator-specific
  | 'own_content.manage' | 'own_analytics.view' | 'own_revenue.view'
  | 'subscribers.view'   | 'creator_messages.send'
  // Member content access
  | 'content.free'    | 'content.silver'  | 'content.gold'    | 'content.vip'

// ─── Role → Permissions mapping ──────────────────────────
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: [
    // All permissions
    'users.view','users.create','users.edit','users.delete','users.ban',
    'content.view','content.create','content.edit','content.delete','content.publish','content.feature',
    'products.view','products.create','products.edit','products.delete',
    'orders.view','orders.edit','orders.refund',
    'inventory.view','inventory.edit',
    'coupons.view','coupons.create','coupons.edit','coupons.delete',
    'membership.view','membership.edit','membership.grant','membership.revoke',
    'community.view','community.moderate','community.ban',
    'reports.view','reports.resolve',
    'creators.view','creators.verify','creators.suspend','creators.payouts',
    'revenue.view','payouts.view','payouts.process','refunds.process',
    'analytics.view','analytics.export',
    'settings.view','settings.edit',
    'roles.view','roles.edit',
    'tickets.view','tickets.assign','tickets.resolve',
    'compliance.view','compliance.edit','dmca.manage',
    'media.view','media.upload','media.delete',
    'notifications.send',
    'ai.manage','streaming.manage',
    'referrals.view','referrals.manage',
    'content.free','content.silver','content.gold','content.vip',
  ],

  admin: [
    'users.view','users.edit','users.ban',
    'content.view','content.create','content.edit','content.delete','content.publish','content.feature',
    'products.view','products.create','products.edit','products.delete',
    'orders.view','orders.edit','orders.refund',
    'inventory.view','inventory.edit',
    'coupons.view','coupons.create','coupons.edit','coupons.delete',
    'membership.view','membership.edit','membership.grant','membership.revoke',
    'community.view','community.moderate','community.ban',
    'reports.view','reports.resolve',
    'creators.view','creators.verify','creators.suspend','creators.payouts',
    'revenue.view','payouts.view',
    'analytics.view','analytics.export',
    'settings.view','settings.edit',
    'roles.view',
    'tickets.view','tickets.assign','tickets.resolve',
    'compliance.view',
    'media.view','media.upload','media.delete',
    'referrals.view','referrals.manage',
    'content.free','content.silver','content.gold','content.vip',
  ],

  moderator: [
    'content.view','content.edit','content.delete','content.publish',
    'community.view','community.moderate','community.ban',
    'reports.view','reports.resolve',
    'users.view','users.ban',
    'tickets.view','tickets.resolve',
    'media.view',
    'content.free','content.silver','content.gold','content.vip',
  ],

  creator_manager: [
    'creators.view','creators.verify','creators.suspend','creators.payouts',
    'content.view','content.edit','content.publish','content.feature',
    'users.view',
    'analytics.view',
    'media.view','media.upload',
    'content.free','content.silver','content.gold','content.vip',
  ],

  marketplace_manager: [
    'products.view','products.create','products.edit','products.delete',
    'orders.view','orders.edit','orders.refund',
    'inventory.view','inventory.edit',
    'coupons.view','coupons.create','coupons.edit','coupons.delete',
    'refunds.process',
    'analytics.view',
    'media.view','media.upload',
  ],

  support_agent: [
    'tickets.view','tickets.assign','tickets.resolve',
    'users.view',
    'orders.view',
    'content.view',
    'community.view',
    'content.free','content.silver',
  ],

  finance_manager: [
    'revenue.view','payouts.view','payouts.process','refunds.process',
    'orders.view',
    'analytics.view','analytics.export',
    'referrals.view','referrals.manage',
  ],

  creator: [
    'own_content.manage',
    'own_analytics.view',
    'own_revenue.view',
    'subscribers.view',
    'creator_messages.send',
    'media.upload',
    'content.free',
  ],

  vip_member: [
    'content.free','content.silver','content.gold','content.vip',
    'community.view',
    'creator_messages.send',
  ],

  member: [
    'content.free',
    'community.view',
  ],

  guest: [],
}

// ─── Permission check utilities ───────────────────────────
export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some(p => hasPermission(role, p))
}

export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every(p => hasPermission(role, p))
}

// ─── Admin route access map ────────────────────────────────
export const ADMIN_ROUTE_ACCESS: Record<string, Permission[]> = {
  '/admin':                      ['analytics.view'],
  '/admin/users':                ['users.view'],
  '/admin/membership':           ['membership.view'],
  '/admin/content':              ['content.view'],
  '/admin/marketplace':          ['products.view'],
  '/admin/marketplace/orders':   ['orders.view'],
  '/admin/marketplace/refunds':  ['orders.refund'],
  '/admin/marketplace/inventory':['inventory.view'],
  '/admin/community':            ['community.view'],
  '/admin/moderation':           ['community.moderate'],
  '/admin/creators':             ['creators.view'],
  '/admin/analytics':            ['analytics.view'],
  '/admin/referrals':            ['referrals.view'],
  '/admin/support':              ['tickets.view'],
  '/admin/media':                ['media.view'],
  '/admin/roles':                ['roles.view'],
  '/admin/permissions':          ['roles.view'],
  '/admin/settings':             ['settings.view'],
  '/admin/compliance':           ['compliance.view'],
  '/admin/finance':              ['revenue.view'],
  '/admin/ai':                   ['ai.manage'],
  '/admin/vip':                  ['membership.edit'],
}

export function canAccessAdminRoute(role: Role, path: string): boolean {
  const required = ADMIN_ROUTE_ACCESS[path]
  if (!required) return hasPermission(role, 'analytics.view')
  return hasAnyPermission(role, required)
}

// ─── Role metadata ────────────────────────────────────────
export const ROLE_META: Record<Role, { label: string; description: string; color: string; isAdmin: boolean }> = {
  super_admin:        { label: 'Super Admin',         description: 'Full platform access',                   color: '#EF4444', isAdmin: true  },
  admin:              { label: 'Admin',               description: 'Full admin access except role management',color: '#F59E0B', isAdmin: true  },
  moderator:          { label: 'Moderator',           description: 'Content and community moderation',       color: '#8B5CF6', isAdmin: true  },
  creator_manager:    { label: 'Creator Manager',     description: 'Manage creators and their content',      color: '#06B6D4', isAdmin: true  },
  marketplace_manager:{ label: 'Marketplace Manager', description: 'Manage products, orders and inventory',  color: '#10B981', isAdmin: true  },
  support_agent:      { label: 'Support Agent',       description: 'Handle customer support tickets',        color: '#3B82F6', isAdmin: true  },
  finance_manager:    { label: 'Finance Manager',     description: 'Revenue, payouts and financial reports', color: '#D4AF37', isAdmin: true  },
  creator:            { label: 'Creator',             description: 'Content creator with own dashboard',     color: '#EC4899', isAdmin: false },
  vip_member:         { label: 'VIP Member',          description: 'Premium VIP membership access',          color: '#D4AF37', isAdmin: false },
  member:             { label: 'Member',              description: 'Standard platform member',               color: '#6B7280', isAdmin: false },
  guest:              { label: 'Guest',               description: 'Unauthenticated visitor',                color: '#374151', isAdmin: false },
}
