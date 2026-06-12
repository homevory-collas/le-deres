'use client'

import * as React from 'react'
import { Shield, Edit, Plus, Check, X } from 'lucide-react'
import { ROLE_META, ROLE_PERMISSIONS, type Role, type Permission } from '@/lib/rbac'
import { AdminPageHeader, AdminCard, AdminBtn, DataTable, AdminStatusBadge } from '@/components/admin/shared'
import { cn } from '@/lib/utils'

// Permission groups for display
const PERMISSION_GROUPS: { label: string; permissions: Permission[] }[] = [
  { label: 'Users',       permissions: ['users.view','users.create','users.edit','users.delete','users.ban'] },
  { label: 'Content',     permissions: ['content.view','content.create','content.edit','content.delete','content.publish','content.feature'] },
  { label: 'Marketplace', permissions: ['products.view','products.create','products.edit','products.delete','orders.view','orders.edit','orders.refund','inventory.view','inventory.edit'] },
  { label: 'Membership',  permissions: ['membership.view','membership.edit','membership.grant','membership.revoke'] },
  { label: 'Community',   permissions: ['community.view','community.moderate','community.ban','reports.view','reports.resolve'] },
  { label: 'Creators',    permissions: ['creators.view','creators.verify','creators.suspend','creators.payouts'] },
  { label: 'Finance',     permissions: ['revenue.view','payouts.view','payouts.process','refunds.process'] },
  { label: 'Analytics',   permissions: ['analytics.view','analytics.export'] },
  { label: 'Settings',    permissions: ['settings.view','settings.edit','roles.view','roles.edit'] },
  { label: 'Support',     permissions: ['tickets.view','tickets.assign','tickets.resolve'] },
  { label: 'Compliance',  permissions: ['compliance.view','compliance.edit','dmca.manage'] },
  { label: 'Media',       permissions: ['media.view','media.upload','media.delete'] },
  { label: 'AI & Stream', permissions: ['ai.manage','streaming.manage'] },
]

const ADMIN_ROLES = Object.entries(ROLE_META).filter(([, m]) => m.isAdmin) as [Role, typeof ROLE_META[Role]][]
const USER_ROLES  = Object.entries(ROLE_META).filter(([, m]) => !m.isAdmin) as [Role, typeof ROLE_META[Role]][]

export default function AdminRolesPage() {
  const [selectedRole, setSelectedRole] = React.useState<Role>('admin')
  const rolePerms = ROLE_PERMISSIONS[selectedRole] ?? []

  return (
    <div>
      <AdminPageHeader
        title="Roles & Permissions"
        description="Configure platform roles and their access levels"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Roles' }]}
        actions={<AdminBtn variant="primary" size="sm"><Plus size={12} /> Create Role</AdminBtn>}
      />

      <div className="grid lg:grid-cols-[260px_1fr] gap-5">
        {/* Role list */}
        <div className="space-y-4">
          <AdminCard title="Admin Roles">
            <div className="space-y-1">
              {ADMIN_ROLES.map(([roleKey, meta]) => (
                <button
                  key={roleKey}
                  onClick={() => setSelectedRole(roleKey)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left transition-colors',
                    selectedRole === roleKey ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                  )}
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: meta.color }} />
                  <div className="min-w-0">
                    <p className="font-medium text-xs leading-tight">{meta.label}</p>
                    <p className={cn('text-[9px] truncate', selectedRole === roleKey ? 'text-background/60' : 'text-muted-foreground/60')}>
                      {ROLE_PERMISSIONS[roleKey].length} permissions
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </AdminCard>
          <AdminCard title="Member Roles">
            <div className="space-y-1">
              {USER_ROLES.map(([roleKey, meta]) => (
                <button
                  key={roleKey}
                  onClick={() => setSelectedRole(roleKey)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left transition-colors',
                    selectedRole === roleKey ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                  )}
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: meta.color }} />
                  <div className="min-w-0">
                    <p className="font-medium text-xs leading-tight">{meta.label}</p>
                    <p className={cn('text-[9px] truncate', selectedRole === roleKey ? 'text-background/60' : 'text-muted-foreground/60')}>
                      {ROLE_PERMISSIONS[roleKey].length} permissions
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </AdminCard>
        </div>

        {/* Permission matrix */}
        <div>
          {/* Role header */}
          <AdminCard className="mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ background: ROLE_META[selectedRole]?.color + '20', border: `1px solid ${ROLE_META[selectedRole]?.color}40` }}>
                <Shield size={18} style={{ color: ROLE_META[selectedRole]?.color }} />
              </div>
              <div className="flex-1">
                <p className="font-medium">{ROLE_META[selectedRole]?.label}</p>
                <p className="text-xs text-muted-foreground">{ROLE_META[selectedRole]?.description}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-light">{rolePerms.length}</p>
                <p className="text-[9px] tracking-widest uppercase text-muted-foreground">permissions</p>
              </div>
              <AdminBtn variant="outline" size="sm"><Edit size={11} /> Edit Role</AdminBtn>
            </div>
          </AdminCard>

          {/* Permission groups */}
          <div className="space-y-3">
            {PERMISSION_GROUPS.map(group => {
              const granted = group.permissions.filter(p => rolePerms.includes(p))
              const total   = group.permissions.length
              const allGranted = granted.length === total
              const noneGranted = granted.length === 0

              return (
                <AdminCard key={group.label} padding={false}>
                  <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                    <div className="flex items-center gap-3">
                      <p className="text-xs font-medium tracking-widest uppercase">{group.label}</p>
                      <span className={cn(
                        'text-[9px] px-2 py-0.5 border',
                        allGranted  ? 'text-green-500 border-green-500/20 bg-green-500/10' :
                        noneGranted ? 'text-muted-foreground border-border' :
                                      'text-yellow-500 border-yellow-500/20 bg-yellow-500/10',
                      )}>
                        {granted.length}/{total}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
                    {group.permissions.map(perm => {
                      const isGranted = rolePerms.includes(perm)
                      return (
                        <div
                          key={perm}
                          className={cn(
                            'flex items-center gap-2 px-4 py-2.5 border-b border-r border-border/40 last:border-r-0',
                            isGranted ? 'opacity-100' : 'opacity-40',
                          )}
                        >
                          <span className={cn('w-4 h-4 flex-shrink-0 flex items-center justify-center', isGranted ? 'text-green-500' : 'text-muted-foreground')}>
                            {isGranted ? <Check size={11} /> : <X size={11} />}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground">{perm}</span>
                        </div>
                      )
                    })}
                  </div>
                </AdminCard>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
