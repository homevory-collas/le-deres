'use client'

import * as React from 'react'
import { X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── MODAL ────────────────────────────────────────────────
interface ModalProps {
  open:       boolean
  onClose:    () => void
  title?:     string
  children:   React.ReactNode
  size?:      'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

const MODAL_SIZES = {
  sm:   'max-w-sm',
  md:   'max-w-md',
  lg:   'max-w-lg',
  xl:   'max-w-2xl',
  full: 'max-w-5xl',
}

export function Modal({ open, onClose, title, children, size = 'md', className }: ModalProps) {
  React.useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else      document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      {/* Panel */}
      <div
        className={cn(
          'relative z-10 w-full bg-background border border-border shadow-2xl animate-fade-in',
          MODAL_SIZES[size],
          className,
        )}
        role="dialog"
        aria-modal
        aria-label={title}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-sm font-medium tracking-widest uppercase">{title}</h2>
            <button onClick={onClose} aria-label="Close" className="text-muted-foreground hover:text-foreground transition-colors">
              <X size={18} />
            </button>
          </div>
        )}
        {!title && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

// ─── DRAWER ───────────────────────────────────────────────
interface DrawerProps {
  open:       boolean
  onClose:    () => void
  title?:     string
  side?:      'left' | 'right'
  children:   React.ReactNode
  width?:     string
}

export function Drawer({ open, onClose, title, side = 'right', children, width = 'w-80' }: DrawerProps) {
  React.useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else      document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div className={cn('fixed inset-0 z-50', !open && 'pointer-events-none')}>
      {/* Backdrop */}
      <div
        className={cn('absolute inset-0 bg-black/50 transition-opacity duration-300', open ? 'opacity-100' : 'opacity-0')}
        onClick={onClose}
        aria-hidden
      />
      {/* Panel */}
      <div
        className={cn(
          'absolute top-0 bottom-0 bg-background border-border shadow-2xl transition-transform duration-300 flex flex-col',
          width,
          side === 'right' ? 'right-0 border-l' : 'left-0 border-r',
          open
            ? 'translate-x-0'
            : side === 'right' ? 'translate-x-full' : '-translate-x-full',
        )}
        role="dialog"
        aria-modal
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4 flex-shrink-0">
          {title && <h2 className="text-xs font-medium tracking-widest uppercase">{title}</h2>}
          <button onClick={onClose} aria-label="Close drawer" className="ml-auto text-muted-foreground hover:text-foreground">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  )
}

// ─── DROPDOWN ─────────────────────────────────────────────
interface DropdownItem {
  label:    string
  onClick?: () => void
  href?:    string
  icon?:    React.ReactNode
  divider?: boolean
  danger?:  boolean
}

interface DropdownProps {
  trigger:    React.ReactNode
  items:      DropdownItem[]
  align?:     'left' | 'right'
  className?: string
}

export function Dropdown({ trigger, items, align = 'right', className }: DropdownProps) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className={cn('relative inline-block', className)} ref={ref}>
      <div onClick={() => setOpen((o) => !o)} className="cursor-pointer">{trigger}</div>
      {open && (
        <div
          className={cn(
            'absolute z-50 top-full mt-1 min-w-[160px] bg-background border border-border shadow-lg animate-fade-in py-1',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          {items.map((item, i) =>
            item.divider ? (
              <div key={i} className="border-t border-border my-1" />
            ) : (
              <button
                key={i}
                onClick={() => { item.onClick?.(); setOpen(false) }}
                className={cn(
                  'flex w-full items-center gap-2.5 px-4 py-2.5 text-xs text-left hover:bg-muted transition-colors',
                  item.danger ? 'text-destructive' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  )
}

// ─── TABS ─────────────────────────────────────────────────
interface Tab { id: string; label: string; count?: number }

interface TabsProps {
  tabs:       Tab[]
  active:     string
  onChange:   (id: string) => void
  variant?:   'underline' | 'pill' | 'border'
  className?: string
}

export function Tabs({ tabs, active, onChange, variant = 'underline', className }: TabsProps) {
  if (variant === 'pill') {
    return (
      <div className={cn('flex gap-2 flex-wrap', className)}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'px-4 py-2 text-xs tracking-widest uppercase transition-colors',
              active === tab.id
                ? 'bg-foreground text-background'
                : 'border border-border text-muted-foreground hover:border-foreground',
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-1.5 opacity-60">{tab.count}</span>
            )}
          </button>
        ))}
      </div>
    )
  }

  if (variant === 'border') {
    return (
      <div className={cn('grid border border-border', className)} style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'py-3 text-xs tracking-widest uppercase border-r border-border last:border-r-0 transition-colors',
              active === tab.id
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:bg-muted',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    )
  }

  // underline (default)
  return (
    <div className={cn('flex border-b border-border', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'pb-3 px-4 text-xs tracking-widest uppercase border-b-2 transition-colors -mb-px',
            active === tab.id
              ? 'border-foreground text-foreground'
              : 'border-transparent text-muted-foreground hover:text-foreground',
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-1.5 opacity-60">{tab.count}</span>
          )}
        </button>
      ))}
    </div>
  )
}

// ─── ACCORDION ────────────────────────────────────────────
interface AccordionItem { id: string; question: string; answer: string }

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = React.useState<string | null>(null)
  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item) => (
        <div key={item.id} className="border border-border">
          <button
            onClick={() => setOpen(open === item.id ? null : item.id)}
            className="flex w-full items-center justify-between px-5 py-4 text-sm font-medium text-left hover:bg-muted/50 transition-colors"
          >
            {item.question}
            <ChevronDown
              size={16}
              className={cn('flex-shrink-0 transition-transform text-muted-foreground ml-4', open === item.id && 'rotate-180')}
            />
          </button>
          {open === item.id && (
            <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── BADGE ────────────────────────────────────────────────
type BadgeVariant = 'default' | 'gold' | 'rose' | 'green' | 'muted' | 'outline'

export function Badge({ children, variant = 'default', className }: {
  children:   React.ReactNode
  variant?:   BadgeVariant
  className?: string
}) {
  const variants: Record<BadgeVariant, string> = {
    default: 'bg-foreground text-background',
    gold:    'bg-[var(--brand-gold)] text-[#080808]',
    rose:    'bg-[var(--brand-rose)] text-white',
    green:   'bg-green-500/20 text-green-500 border border-green-500/30',
    muted:   'bg-muted text-muted-foreground',
    outline: 'border border-border text-muted-foreground',
  }
  return (
    <span className={cn('inline-flex items-center text-[10px] px-2 py-0.5 tracking-widest uppercase font-medium', variants[variant], className)}>
      {children}
    </span>
  )
}

// ─── SKELETON ─────────────────────────────────────────────
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('bg-muted animate-pulse rounded-sm', className)} />
}

// ─── DIVIDER ──────────────────────────────────────────────
export function Divider({ label, className }: { label?: string; className?: string }) {
  if (!label) return <div className={cn('border-t border-border', className)} />
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="flex-1 border-t border-border" />
      <span className="text-[10px] tracking-widest uppercase text-muted-foreground">{label}</span>
      <div className="flex-1 border-t border-border" />
    </div>
  )
}

// ─── TOAST (minimal) ──────────────────────────────────────
export function Toast({ message, type = 'default', onClose }: {
  message:  string
  type?:    'default' | 'success' | 'error'
  onClose:  () => void
}) {
  const colors = {
    default: 'bg-foreground text-background',
    success: 'bg-green-600 text-white',
    error:   'bg-destructive text-white',
  }
  return (
    <div className={cn('fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 shadow-lg animate-fade-in text-sm', colors[type])}>
      {message}
      <button onClick={onClose} className="opacity-70 hover:opacity-100"><X size={14} /></button>
    </div>
  )
}
