'use client'
import * as React from 'react'
import { ROLE_PERMISSIONS, ROLE_META, type Role } from '@/lib/rbac'
import { AdminPageHeader, AdminCard } from '@/components/admin/shared'
import { cn } from '@/lib/utils'

const ALL_ROLES = Object.keys(ROLE_META) as Role[]
const ALL_PERMS = Array.from(new Set(Object.values(ROLE_PERMISSIONS).flat())).sort()

export default function AdminPermissionsPage() {
  const [search, setSearch] = React.useState('')
  const filtered = search ? ALL_PERMS.filter(p => p.includes(search)) : ALL_PERMS

  return (
    <div>
      <AdminPageHeader
        title="Permission Matrix"
        description="Full audit view of all roles and their permissions"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Roles', href: '/admin/roles' }, { label: 'Permissions' }]}
      />
      <AdminCard className="mb-4">
        <input
          type="search" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Filter permissions…"
          className="w-full max-w-sm border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:border-foreground"
        />
      </AdminCard>
      <AdminCard padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 text-[9px] tracking-widest uppercase text-muted-foreground sticky left-0 bg-muted/30 min-w-[200px]">Permission</th>
                {ALL_ROLES.map(role => (
                  <th key={role} className="px-3 py-3 text-center min-w-[90px]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ background: ROLE_META[role].color }} />
                      <span className="text-[8px] tracking-widest uppercase leading-tight whitespace-nowrap text-muted-foreground">{ROLE_META[role].label.replace(' ', '\n')}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((perm, i) => (
                <tr key={perm} className={cn('border-b border-border/30', i % 2 === 0 ? '' : 'bg-muted/10')}>
                  <td className="px-4 py-2 sticky left-0 bg-background">
                    <code className="text-[10px] text-muted-foreground">{perm}</code>
                  </td>
                  {ALL_ROLES.map(role => {
                    const has = ROLE_PERMISSIONS[role]?.includes(perm as any)
                    return (
                      <td key={role} className="px-3 py-2 text-center">
                        {has
                          ? <span className="text-green-500 text-base">✓</span>
                          : <span className="text-muted-foreground/20 text-base">·</span>
                        }
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  )
}
