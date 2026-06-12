import { cn } from '@/lib/utils'

// ─── PageHero ────────────────────────────────────────────
interface PageHeroProps {
  title:       string
  subtitle?:   string
  description?: string
  className?:  string
}

export function PageHero({ title, subtitle, description, className }: PageHeroProps) {
  return (
    <section className={cn('section-padding border-b border-border', className)}>
      <div className="container-wide">
        {subtitle && (
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
            {subtitle}
          </p>
        )}
        <h1 className="text-3xl md:text-5xl font-serif font-light mb-4">{title}</h1>
        {description && (
          <p className="text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
        )}
      </div>
    </section>
  )
}

// ─── SectionHeading ──────────────────────────────────────
interface SectionHeadingProps {
  title:      string
  subtitle?:  string
  action?:    React.ReactNode
  className?: string
}

export function SectionHeading({ title, subtitle, action, className }: SectionHeadingProps) {
  return (
    <div className={cn('flex items-end justify-between mb-8', className)}>
      <div>
        {subtitle && (
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
            {subtitle}
          </p>
        )}
        <h2 className="text-2xl font-serif font-light">{title}</h2>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

// ─── ContentCard ─────────────────────────────────────────
interface ContentCardProps {
  title:       string
  thumbnail?:  string
  category?:   string
  isPremium?:  boolean
  duration?:   number
  views?:      number
  onClick?:    () => void
  className?:  string
}

export function ContentCard({
  title, thumbnail, category, isPremium, duration, views, onClick, className,
}: ContentCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group cursor-pointer rounded-sm overflow-hidden border border-border',
        'hover:border-foreground/30 transition-colors',
        className,
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-muted animate-pulse" />
        )}
        {isPremium && (
          <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 bg-background/90 text-foreground tracking-widest uppercase">
            Premium
          </span>
        )}
        {duration && (
          <span className="absolute bottom-2 right-2 text-[10px] px-1.5 py-0.5 bg-black/70 text-white">
            {Math.floor(duration / 60)}:{String(duration % 60).padStart(2, '0')}
          </span>
        )}
      </div>
      {/* Info */}
      <div className="p-3">
        {category && (
          <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">
            {category}
          </p>
        )}
        <p className="text-sm font-medium line-clamp-2">{title}</p>
        {views !== undefined && (
          <p className="text-xs text-muted-foreground mt-1">{views.toLocaleString()} views</p>
        )}
      </div>
    </div>
  )
}

// ─── ProductCard ─────────────────────────────────────────
interface ProductCardProps {
  name:         string
  price:        number
  comparePrice?: number
  image?:       string
  category?:    string
  isDiscreet?:  boolean
  className?:   string
}

export function ProductCard({
  name, price, comparePrice, image, category, isDiscreet, className,
}: ProductCardProps) {
  return (
    <div className={cn('group cursor-pointer', className)}>
      <div className="relative aspect-[3/4] bg-muted rounded-sm overflow-hidden mb-3">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-muted" />
        )}
        {isDiscreet && (
          <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 bg-background/90 tracking-widest uppercase">
            Discreet
          </span>
        )}
      </div>
      {category && (
        <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">
          {category}
        </p>
      )}
      <p className="text-sm font-medium mb-1 line-clamp-1">{name}</p>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">€{price.toFixed(2)}</span>
        {comparePrice && (
          <span className="text-xs text-muted-foreground line-through">€{comparePrice.toFixed(2)}</span>
        )}
      </div>
    </div>
  )
}

// ─── CategoryCard ─────────────────────────────────────────
interface CategoryCardProps {
  name:      string
  count?:    number
  image?:    string
  href:      string
  className?: string
}

export function CategoryCard({ name, count, image, href, className }: CategoryCardProps) {
  return (
    <a
      href={href}
      className={cn(
        'group relative block aspect-square rounded-sm overflow-hidden bg-muted',
        className,
      )}
    >
      {image && (
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <p className="text-white font-medium text-sm">{name}</p>
        {count !== undefined && (
          <p className="text-white/60 text-xs">{count} items</p>
        )}
      </div>
    </a>
  )
}

// ─── PlaceholderImage ─────────────────────────────────────
interface PlaceholderImageProps {
  width?:    number
  height?:   number
  label?:    string
  className?: string
}

export function PlaceholderImage({ width = 400, height = 300, label, className }: PlaceholderImageProps) {
  return (
    <div
      className={cn('flex items-center justify-center bg-muted text-muted-foreground text-sm', className)}
      style={{ width, height }}
    >
      {label ?? `${width} × ${height}`}
    </div>
  )
}
