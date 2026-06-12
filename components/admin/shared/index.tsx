'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  TrendingUp, TrendingDown, Minus, Plus, Search,
  Filter, ChevronLeft, ChevronRight, MoreHorizontal,
  Eye, Edit, Trash2, CheckCircle, XCircle, Clock,
  AlertTriangle, Download, Upload, RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── StatCard ─────────────────────────────────────────────
interface StatCardProps {
  label:       string
  value:       string | number
  change?:     number   // percent change, positive = up
  period?:     string
  icon?:       React.ReactNode
  color?:      'default' | 'gold' | 'green' | 'red' | 'blue'
  className?:  string
  href?:       string
}

export function StatCard({
  label, value, change, period = 'this month',
  icon, color = 'default', className, href,
}: StatCardProps) {
  const Wrapper = href ? Link : 'div'
  const isUp   = change !== undefined && change > 0
  const isDown = change !== undefined && change < 0

  return (
    <Wrapper
      href={href as string}
      className={cn(
        'block border border-border p-5 bg-background hover:border-foreground/30 transition-colors',
        href && 'cursor-pointer',
        className,
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-[10px] tracking-widest uppercase text-muted-foreground font-medium">{label}</p>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      <p className="text-3xl font-light mb-2 tracking-tight">{value}</p>
      {change !== undefined && (
        <div className={cn(
          'flex items-center gap-1 text-xs',
          isUp   && 'text-green-500',
          isDown && 'text-red-500',
          !isUp && !isDown && 'text-muted-foreground',
        )}>
          {isUp   ? <TrendingUp  size={11} /> :
           isDown ? <TrendingDown size={11} /> :
                    <Minus size={11} />}
          {isUp ? '+' : ''}{change}% {period}
        </div>
      )}
    </Wrapper>
  )
}

// ─── AdminPageHeader ──────────────────────────────────────
interface AdminPageHeaderProps {
  title:         string
  description?:  string
  breadcrumbs?:  { label: string; href?: string }[]
  actions?:      React.ReactNode
  className?:    string
}

export function AdminPageHeader({
  title, description, breadcrumbs, actions, className,
}: AdminPageHeaderProps) {
  return (
    <div className={cn('mb-8', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-muted-foreground mb-3">
          {breadcrumbs.map((b, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="opacity-30">/</span>}
              {b.href
                ? <Link href={b.href} className="hover:text-foreground transition-colors">{b.label}</Link>
                : <span className="text-foreground">{b.label}</span>
              }
            </React.Fragment>
          ))}
        </nav>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium">{title}</h1>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
      </div>
    </div>
  )
}

// ─── AdminSearchBar ───────────────────────────────────────
interface AdminSearchBarProps {
  value:         string
  onChange:      (v: string) => void
  placeholder?:  string
  filters?:      React.ReactNode
  className?:    string
}

export function AdminSearchBar({
  value, onChange, placeholder = 'Search…', filters, className,
}: AdminSearchBarProps) {
  return (
    <div className={cn('flex items-center gap-3 mb-6', className)}>
      <div className="relative flex-1 max-w-sm">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-border bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
        />
      </div>
      {filters}
    </div>
  )
}

// ─── AdminStatusBadge ─────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  ACTIVE:      'bg-green-500/10 text-green-500 border border-green-500/20',
  PUBLISHED:   'bg-green-500/10 text-green-500 border border-green-500/20',
  DELIVERED:   'bg-green-500/10 text-green-500 border border-green-500/20',
  LIVE:        'bg-green-500/10 text-green-500 border border-green-500/20',
  RESOLVED:    'bg-green-500/10 text-green-500 border border-green-500/20',
  OPEN:        'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  SHIPPED:     'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  CONFIRMED:   'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  PENDING:     'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20',
  PROCESSING:  'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20',
  IN_PROGRESS: 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20',
  REVIEW:      'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20',
  DRAFT:       'bg-muted text-muted-foreground border border-border',
  SUSPENDED:   'bg-red-500/10 text-red-500 border border-red-500/20',
  CANCELLED:   'bg-red-500/10 text-red-400 border border-red-500/20',
  REMOVED:     'bg-red-500/10 text-red-400 border border-red-500/20',
  REFUNDED:    'bg-red-500/10 text-red-400 border border-red-500/20',
  CLOSED:      'bg-muted text-muted-foreground border border-border',
  EXPIRED:     'bg-muted text-muted-foreground border border-border',
  FREE:        'bg-muted text-muted-foreground border border-border',
  GOLD:        'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20',
  VIP:         'bg-purple-500/10 text-purple-400 border border-purple-500/20',
}

export function AdminStatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span className={cn(
      'inline-flex items-center text-[9px] px-2 py-0.5 tracking-widest uppercase font-medium',
      STATUS_STYLES[status.toUpperCase()] ?? STATUS_STYLES.DRAFT,
      className,
    )}>
      {status.toLowerCase().replace(/_/g, ' ')}
    </span>
  )
}

// ─── DataTable ────────────────────────────────────────────
export interface TableColumn<T = Record<string, unknown>> {
  key:        string
  label:      string
  render?:    (row: T) => React.ReactNode
  width?:     string
  sortable?:  boolean
  className?: string
}

interface DataTableProps<T = Record<string, unknown>> {
  columns:       TableColumn<T>[]
  data:          T[]
  keyField?:     string
  onEdit?:       (row: T) => void
  onDelete?:     (row: T) => void
  onView?:       (row: T) => void
  actions?:      (row: T) => React.ReactNode
  emptyMessage?: string
  isLoading?:    boolean
  className?:    string
}

export function DataTable<T extends Record<string, unknown>>({
  columns, data, keyField = 'id', onEdit, onDelete, onView,
  actions, emptyMessage = 'No data found.', isLoading, className,
}: DataTableProps<T>) {
  const showActions = onEdit || onDelete || onView || actions

  return (
    <div className={cn('border border-border overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={col.width ? { width: col.width } : {}}
                  className={cn(
                    'text-left px-4 py-3 text-[9px] tracking-widest uppercase text-muted-foreground font-medium whitespace-nowrap',
                    col.className,
                  )}
                >
                  {col.label}
                </th>
              ))}
              {showActions && (
                <th className="px-4 py-3 text-right text-[9px] tracking-widest uppercase text-muted-foreground font-medium">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-border/50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      <div className="h-4 bg-muted animate-pulse rounded-sm" />
                    </td>
                  ))}
                  {showActions && <td className="px-4 py-3"><div className="h-4 w-16 bg-muted animate-pulse rounded-sm ml-auto" /></td>}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (showActions ? 1 : 0)} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={String(row[keyField] ?? i)}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className={cn('px-4 py-3 text-xs text-muted-foreground', col.className)}>
                      {col.render ? col.render(row) : String(row[col.key] ?? '—')}
                    </td>
                  ))}
                  {showActions && (
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {actions ? actions(row) : (
                          <>
                            {onView && (
                              <button onClick={() => onView(row)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors" title="View">
                                <Eye size={13} />
                              </button>
                            )}
                            {onEdit && (
                              <button onClick={() => onEdit(row)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors" title="Edit">
                                <Edit size={13} />
                              </button>
                            )}
                            {onDelete && (
                              <button onClick={() => onDelete(row)} className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors" title="Delete">
                                <Trash2 size={13} />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Pagination ───────────────────────────────────────────
interface PaginationProps {
  page:      number
  total:     number
  perPage:   number
  onChange:  (page: number) => void
  className?: string
}

export function Pagination({ page, total, perPage, onChange, className }: PaginationProps) {
  const pages    = Math.ceil(total / perPage)
  const from     = (page - 1) * perPage + 1
  const to       = Math.min(page * perPage, total)

  if (pages <= 1) return null

  return (
    <div className={cn('flex items-center justify-between px-4 py-3 border-t border-border', className)}>
      <p className="text-xs text-muted-foreground">
        Showing {from}–{to} of {total}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={14} />
        </button>
        {Array.from({ length: Math.min(pages, 7) }, (_, i) => {
          const p = i + 1
          return (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={cn(
                'w-7 h-7 text-xs transition-colors',
                p === page
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground border border-transparent hover:border-border',
              )}
            >
              {p}
            </button>
          )
        })}
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === pages}
          className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}

// ─── AdminCard ─────────────────────────────────────────────
export function AdminCard({
  title, actions, children, className, padding = true,
}: {
  title?:     string
  actions?:   React.ReactNode
  children:   React.ReactNode
  className?: string
  padding?:   boolean
}) {
  return (
    <div className={cn('border border-border bg-background', className)}>
      {title && (
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
          <p className="text-xs font-medium tracking-widest uppercase">{title}</p>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={padding ? 'p-5' : ''}>{children}</div>
    </div>
  )
}

// ─── FilterBar ─────────────────────────────────────────────
interface FilterOption { label: string; value: string }
interface FilterBarProps {
  filters:  { key: string; label: string; options: FilterOption[] }[]
  values:   Record<string, string>
  onChange: (key: string, value: string) => void
  className?: string
}

export function FilterBar({ filters, values, onChange, className }: FilterBarProps) {
  return (
    <div className={cn('flex items-center gap-3 flex-wrap', className)}>
      <Filter size={13} className="text-muted-foreground" />
      {filters.map((f) => (
        <select
          key={f.key}
          value={values[f.key] ?? ''}
          onChange={(e) => onChange(f.key, e.target.value)}
          className="border border-border bg-background px-3 py-1.5 text-xs focus:outline-none focus:border-foreground transition-colors"
        >
          <option value="">{f.label}</option>
          {f.options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ))}
    </div>
  )
}

// ─── InlineForm ─────────────────────────────────────────────
export function FormField({
  label, children, required, hint, error, className,
}: {
  label:      string
  children:   React.ReactNode
  required?:  boolean
  hint?:      string
  error?:     string
  className?: string
}) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="block text-xs text-muted-foreground tracking-wide">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
      {!error && hint && <p className="text-xs text-muted-foreground/60">{hint}</p>}
    </div>
  )
}

export function AdminInput({
  className, ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full border border-border bg-background px-3 py-2.5 text-sm',
        'focus:outline-none focus:border-foreground transition-colors',
        'placeholder:text-muted-foreground/40',
        className,
      )}
      {...props}
    />
  )
}

export function AdminTextarea({
  className, ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'w-full border border-border bg-background px-3 py-2.5 text-sm resize-none',
        'focus:outline-none focus:border-foreground transition-colors',
        'placeholder:text-muted-foreground/40',
        className,
      )}
      {...props}
    />
  )
}

export function AdminSelect({
  options, placeholder, className, ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  options:     { value: string; label: string }[]
  placeholder?: string
}) {
  return (
    <select
      className={cn(
        'w-full border border-border bg-background px-3 py-2.5 text-sm appearance-none',
        'focus:outline-none focus:border-foreground transition-colors',
        className,
      )}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

// ─── QuickActionBtn ───────────────────────────────────────
export function AdminBtn({
  variant = 'primary', size = 'md', className, children, ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:  'primary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?:     'sm' | 'md' | 'lg'
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 font-medium tracking-widest uppercase transition-colors disabled:opacity-40',
        variant === 'primary' && 'bg-foreground text-background hover:opacity-90',
        variant === 'outline' && 'border border-border hover:border-foreground text-foreground',
        variant === 'ghost'   && 'text-muted-foreground hover:text-foreground',
        variant === 'danger'  && 'bg-red-600 text-white hover:bg-red-700',
        variant === 'success' && 'bg-green-600 text-white hover:bg-green-700',
        size === 'sm' && 'text-[9px] px-3 py-1.5',
        size === 'md' && 'text-[10px] px-4 py-2',
        size === 'lg' && 'text-xs px-6 py-3',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
