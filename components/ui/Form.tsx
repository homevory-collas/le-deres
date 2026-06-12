import * as React from 'react'
import { cn } from '@/lib/utils'

// ─── Input ────────────────────────────────────────────────
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:      string
  error?:      string
  hint?:       string
  leftIcon?:   React.ReactNode
  rightIcon?:  React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs text-muted-foreground tracking-wide">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/50',
              'focus:outline-none focus:border-foreground transition-colors',
              error ? 'border-destructive' : 'border-border',
              leftIcon  && 'pl-10',
              rightIcon && 'pr-10',
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
        {!error && hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    )
  },
)
Input.displayName = 'Input'

// ─── Textarea ─────────────────────────────────────────────
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?:  string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, rows = 4, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs text-muted-foreground tracking-wide">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={cn(
            'w-full border bg-background px-4 py-3 text-sm resize-none placeholder:text-muted-foreground/50',
            'focus:outline-none focus:border-foreground transition-colors',
            error ? 'border-destructive' : 'border-border',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
        {!error && hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

// ─── Select ───────────────────────────────────────────────
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?:   string
  error?:   string
  options:  { value: string; label: string }[]
  placeholder?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs text-muted-foreground tracking-wide">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={cn(
            'w-full border bg-background px-4 py-3 text-sm appearance-none',
            'focus:outline-none focus:border-foreground transition-colors',
            error ? 'border-destructive' : 'border-border',
            className,
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    )
  },
)
Select.displayName = 'Select'

// ─── Checkbox ─────────────────────────────────────────────
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label:       React.ReactNode
  error?:      string
  description?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, description, className, id, ...props }, ref) => {
    const inputId = id ?? Math.random().toString(36).slice(2)
    return (
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          className={cn('mt-0.5 h-4 w-4 accent-foreground cursor-pointer', className)}
          {...props}
        />
        <div>
          <label htmlFor={inputId} className="text-sm cursor-pointer leading-snug">{label}</label>
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          {error && <p className="text-xs text-destructive mt-0.5">{error}</p>}
        </div>
      </div>
    )
  },
)
Checkbox.displayName = 'Checkbox'

// ─── FormSection ──────────────────────────────────────────
export function FormSection({
  title,
  description,
  children,
  className,
}: {
  title:        string
  description?: string
  children:     React.ReactNode
  className?:   string
}) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="border-b border-border pb-3">
        <h3 className="text-xs font-medium tracking-widest uppercase">{title}</h3>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </div>
      {children}
    </div>
  )
}

export { Input, Textarea, Select, Checkbox }
