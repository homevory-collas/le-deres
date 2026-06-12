// ─── Admin page factory ───────────────────────────────────
// Each admin page follows the same table pattern.
// Replace with real data fetching in Phase 3.

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui'
import { Plus } from 'lucide-react'

// ─── Shared admin table ───────────────────────────────────
function AdminTable({
  title,
  columns,
  rows,
  createHref,
}: {
  title:      string
  columns:    string[]
  rows:       string[][]
  createHref?: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium">{title}</h1>
        {createHref && (
          <Button variant="primary" size="sm" leftIcon={<Plus size={13} />}>
            <Link href={createHref}>Add New</Link>
          </Button>
        )}
      </div>
      {/* Search + filter bar */}
      <div className="flex gap-3 mb-6">
        <input
          type="search"
          placeholder="Search…"
          className="border border-border bg-background px-4 py-2 text-sm flex-1 max-w-xs focus:outline-none focus:border-foreground"
        />
        <select className="border border-border bg-background px-3 py-2 text-xs">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
      <div className="border border-border rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {columns.map((col) => (
                <th key={col} className="text-left px-4 py-3 text-[10px] tracking-widest uppercase text-muted-foreground font-medium">
                  {col}
                </th>
              ))}
              <th className="px-4 py-3 text-[10px] tracking-widest uppercase text-muted-foreground font-medium text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-xs text-muted-foreground">{cell}</td>
                ))}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground px-2 py-1 border border-border hover:border-foreground transition-colors">
                      Edit
                    </button>
                    <button className="text-[10px] tracking-widest uppercase text-destructive/70 hover:text-destructive px-2 py-1 border border-destructive/20 hover:border-destructive transition-colors">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="border-t border-border px-4 py-3 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Showing 1–{rows.length} of {rows.length * 10}</p>
          <div className="flex gap-2">
            {[1, 2, 3, '...', 10].map((p, i) => (
              <button
                key={i}
                className={`w-7 h-7 text-xs border transition-colors ${p === 1 ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { AdminTable }
