import { cn } from '@/lib/utils'

interface LogoProps {
  size?:      'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ size = 'md', className }: LogoProps) {
  const sizes = {
    sm: 'text-base tracking-[0.3em]',
    md: 'text-lg tracking-[0.4em]',
    lg: 'text-2xl tracking-[0.5em]',
  }

  return (
    <span
      className={cn(
        'font-serif font-semibold uppercase select-none',
        // ── Replace with brand-gold color in Phase 2 ──
        'text-foreground',
        sizes[size],
        className,
      )}
    >
      LE <em className="not-italic opacity-70">DÉSIR</em>
    </span>
  )
}
