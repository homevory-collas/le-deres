import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 tracking-widest uppercase text-xs select-none',
  {
    variants: {
      variant: {
        primary:   'bg-foreground text-background hover:opacity-90',
        secondary: 'bg-muted text-foreground hover:bg-muted/70',
        outline:   'border border-border hover:border-foreground text-foreground bg-transparent',
        ghost:     'hover:bg-muted text-muted-foreground hover:text-foreground',
        gold:      'bg-[var(--brand-gold)] text-[#080808] hover:opacity-90 font-semibold',
        danger:    'bg-destructive text-destructive-foreground hover:opacity-90',
        link:      'underline-offset-4 hover:underline text-foreground p-0 h-auto tracking-normal normal-case text-sm',
      },
      size: {
        xs:   'h-7  px-3   text-[10px]',
        sm:   'h-8  px-4',
        md:   'h-10 px-6',
        lg:   'h-12 px-8',
        xl:   'h-14 px-10 text-sm',
        icon: 'h-9  w-9   p-0',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  leftIcon?:  React.ReactNode
  rightIcon?: React.ReactNode
  asChild?:   boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 size={14} className="animate-spin" /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  ),
)
Button.displayName = 'Button'

export { Button, buttonVariants }
