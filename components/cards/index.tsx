import * as React from 'react'
import Link from 'next/link'
import { Heart, Bookmark, Play, Eye, Users, CheckCircle, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui'
import { formatNumber, formatPrice } from '@/lib/utils'

// ─── PlaceholderImg ───────────────────────────────────────
function PlaceholderImg({ className, label }: { className?: string; label?: string }) {
  return (
    <div className={cn('bg-muted flex items-center justify-center', className)}>
      {label && <span className="text-[10px] text-muted-foreground">{label}</span>}
    </div>
  )
}

// ─── CONTENT CARD ─────────────────────────────────────────
export interface ContentCardProps {
  id:           string
  title:        string
  slug:         string
  category:     string
  categorySlug: string
  thumbnail?:   string
  duration?:    number
  views?:       number
  likes?:       number
  isPremium:    boolean
  requiredTier?: string
  isNew?:       boolean
  tags?:        string[]
  creator?:     string
  variant?:     'default' | 'horizontal' | 'compact'
  className?:   string
}

export function ContentCard({
  id, title, slug, category, categorySlug, thumbnail,
  duration, views, likes, isPremium, isNew, creator,
  variant = 'default', className,
}: ContentCardProps) {
  const href = `/adult-ecosystem/${categorySlug}/${slug}`

  if (variant === 'horizontal') {
    return (
      <Link href={href} className={cn('group flex gap-4 hover:bg-muted/30 p-2 -mx-2 transition-colors rounded-sm', className)}>
        <div className="relative w-32 aspect-video flex-shrink-0 bg-muted overflow-hidden">
          {thumbnail
            ? <img src={thumbnail} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            : <PlaceholderImg className="w-full h-full" />
          }
          {duration && (
            <span className="absolute bottom-1 right-1 text-[9px] px-1 bg-black/80 text-white">
              {Math.floor(duration / 60)}:{String(duration % 60).padStart(2, '0')}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground mb-1">{category}</p>
          <p className="text-sm font-medium line-clamp-2">{title}</p>
          {views !== undefined && (
            <p className="text-xs text-muted-foreground mt-1">{formatNumber(views)} views</p>
          )}
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={href} className={cn('group block', className)}>
        <div className="relative aspect-video bg-muted overflow-hidden mb-2">
          {thumbnail
            ? <img src={thumbnail} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            : <PlaceholderImg className="w-full h-full" />
          }
          {isPremium && <Badge variant="gold" className="absolute top-1.5 right-1.5">VIP</Badge>}
        </div>
        <p className="text-xs line-clamp-1 font-medium">{title}</p>
      </Link>
    )
  }

  return (
    <Link href={href} className={cn('group block border border-border hover:border-foreground/30 transition-all', className)}>
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        {thumbnail
          ? <img src={thumbnail} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          : <PlaceholderImg className="w-full h-full" />
        }
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 border border-white/60 rounded-full flex items-center justify-center">
            <Play size={16} className="text-white ml-0.5" />
          </div>
        </div>
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {isPremium && <Badge variant="gold">Premium</Badge>}
          {isNew && <Badge variant="green">New</Badge>}
        </div>
        {duration && (
          <span className="absolute bottom-2 right-2 text-[10px] px-1.5 py-0.5 bg-black/75 text-white">
            {Math.floor(duration / 60)}:{String(duration % 60).padStart(2, '0')}
          </span>
        )}
      </div>
      {/* Info */}
      <div className="p-3">
        <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">{category}</p>
        <p className="text-sm font-medium line-clamp-2 leading-snug mb-2">{title}</p>
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><Eye size={10} /> {formatNumber(views ?? 0)}</span>
          {creator && <span className="truncate max-w-[80px]">{creator}</span>}
        </div>
      </div>
    </Link>
  )
}

// ─── PRODUCT CARD ─────────────────────────────────────────
export interface ProductCardProps {
  id:           string
  name:         string
  slug:         string
  category:     string
  categorySlug: string
  price:        number
  comparePrice?: number
  image?:       string
  images?:      string[]
  brand?:       string
  isNew?:       boolean
  isSale?:      boolean
  isDiscreet?:  boolean
  rating?:      number
  reviewCount?: number
  variant?:     'default' | 'horizontal' | 'minimal'
  className?:   string
}

export function ProductCard({
  id, name, slug, category, categorySlug,
  price, comparePrice, image, brand,
  isNew, isSale, isDiscreet, rating, reviewCount,
  variant = 'default', className,
}: ProductCardProps) {
  const href = `/marketplace/${categorySlug}/${slug}`
  const discount = comparePrice ? Math.round((1 - price / comparePrice) * 100) : 0

  if (variant === 'horizontal') {
    return (
      <Link href={href} className={cn('group flex gap-4', className)}>
        <div className="w-20 aspect-square bg-muted flex-shrink-0 overflow-hidden">
          {image
            ? <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            : <PlaceholderImg className="w-full h-full" />
          }
        </div>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-0.5">{brand ?? category}</p>
          <p className="text-sm font-medium line-clamp-2">{name}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium">{formatPrice(price)}</span>
            {comparePrice && <span className="text-xs text-muted-foreground line-through">{formatPrice(comparePrice)}</span>}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className={cn('group cursor-pointer', className)}>
      <Link href={href}>
        {/* Image */}
        <div className="relative aspect-[3/4] bg-muted overflow-hidden mb-3">
          {image
            ? <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            : <PlaceholderImg className="w-full h-full" />
          }
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew  && <Badge variant="green">New</Badge>}
            {isSale && discount > 0 && <Badge variant="rose">-{discount}%</Badge>}
            {isDiscreet && <Badge variant="muted">Discreet</Badge>}
          </div>
          {/* Quick add */}
          <button
            onClick={(e) => { e.preventDefault(); /* TODO: add to cart */ }}
            className="absolute bottom-0 left-0 right-0 py-3 bg-foreground text-background text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
          >
            <ShoppingBag size={12} /> Add to Cart
          </button>
          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); /* TODO: wishlist */ }}
            className="absolute top-2 right-2 w-7 h-7 bg-background/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Add to wishlist"
          >
            <Heart size={13} />
          </button>
        </div>
        {/* Info */}
        {brand && <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-0.5">{brand}</p>}
        <p className="text-sm font-medium line-clamp-1 mb-1">{name}</p>
        {rating !== undefined && (
          <div className="flex items-center gap-1 mb-1">
            {'★★★★★'.split('').map((s, i) => (
              <span key={i} className={cn('text-xs', i < Math.floor(rating) ? 'text-[var(--brand-gold)]' : 'text-muted-foreground/30')}>{s}</span>
            ))}
            {reviewCount && <span className="text-[10px] text-muted-foreground">({reviewCount})</span>}
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{formatPrice(price)}</span>
          {comparePrice && <span className="text-xs text-muted-foreground line-through">{formatPrice(comparePrice)}</span>}
        </div>
      </Link>
    </div>
  )
}

// ─── CREATOR CARD ─────────────────────────────────────────
export interface CreatorCardProps {
  id:           string
  slug:         string
  displayName:  string
  avatar?:      string
  bio?:         string
  region?:      string
  followerCount: number
  contentCount: number
  isVerified:   boolean
  isLive?:      boolean
  className?:   string
}

export function CreatorCard({
  id, slug, displayName, avatar, bio,
  region, followerCount, contentCount, isVerified, isLive, className,
}: CreatorCardProps) {
  return (
    <Link href={`/adult-ecosystem/creators/${slug}`} className={cn('group block border border-border hover:border-foreground/40 transition-colors p-5', className)}>
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-14 h-14 rounded-full bg-muted overflow-hidden">
            {avatar
              ? <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
              : <PlaceholderImg className="w-full h-full rounded-full" />
            }
          </div>
          {isLive && (
            <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
          )}
        </div>
        {/* Name */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <p className="font-medium text-sm truncate">{displayName}</p>
            {isVerified && <CheckCircle size={13} className="text-[var(--brand-gold)] flex-shrink-0" />}
          </div>
          {region && <p className="text-[10px] tracking-widest uppercase text-muted-foreground">{region}</p>}
          {isLive && <Badge variant="green" className="mt-1">Live Now</Badge>}
        </div>
      </div>
      {bio && <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{bio}</p>}
      <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
        <span className="flex items-center gap-1"><Users size={11} /> {formatNumber(followerCount)}</span>
        <span>{formatNumber(contentCount)} videos</span>
      </div>
    </Link>
  )
}

// ─── MEMBERSHIP CARD ──────────────────────────────────────
export interface MembershipCardProps {
  tier:         string
  price:        number
  period?:      string
  features:     string[]
  isPopular?:   boolean
  isCurrent?:   boolean
  isDisabled?:  boolean
  ctaLabel:     string
  onSelect?:    () => void
  color?:       'default' | 'gold' | 'black'
  className?:   string
}

export function MembershipCard({
  tier, price, period = 'month', features,
  isPopular, isCurrent, isDisabled, ctaLabel, onSelect, color = 'default', className,
}: MembershipCardProps) {
  return (
    <div
      className={cn(
        'relative border rounded-sm p-6 flex flex-col',
        isPopular ? 'border-foreground' : 'border-border',
        isCurrent && 'ring-2 ring-[var(--brand-gold)]',
        className,
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-foreground text-background text-[10px] px-4 py-1 tracking-widest uppercase">
            Most Popular
          </span>
        </div>
      )}
      {isCurrent && (
        <div className="absolute -top-3 right-4">
          <span className="bg-[var(--brand-gold)] text-[#080808] text-[10px] px-3 py-1 tracking-widest uppercase">
            Current
          </span>
        </div>
      )}

      <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-3">{tier}</p>
      <div className="mb-1">
        <span className="text-4xl font-serif font-light">
          {price === 0 ? '€0' : `€${price.toFixed(2)}`}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-6">/{period}</p>

      <ul className="flex-1 space-y-3 mb-8">
        {features.map((f) => (
          <li key={f} className="text-xs text-muted-foreground flex items-start gap-2.5">
            <span className="text-foreground mt-0.5 flex-shrink-0">✓</span>
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        disabled={isDisabled || isCurrent}
        className={cn(
          'w-full py-3 text-xs tracking-widest uppercase transition-all disabled:opacity-40 disabled:cursor-default',
          isPopular
            ? 'bg-foreground text-background hover:opacity-90'
            : 'border border-border hover:border-foreground',
        )}
      >
        {isCurrent ? 'Current Plan' : ctaLabel}
      </button>
    </div>
  )
}

// ─── VIP CARD ─────────────────────────────────────────────
export interface VipCardProps {
  level:      number
  name:       string
  price:      number
  color:      string
  benefits:   string[]
  badge:      string
  className?: string
}

export function VipCard({ level, name, price, color, benefits, badge, className }: VipCardProps) {
  return (
    <div className={cn('relative border border-border p-5 overflow-hidden group hover:border-foreground/40 transition-colors', className)}>
      {/* Level background number */}
      <span className="absolute -right-2 -top-2 text-8xl font-serif font-bold text-muted/10 select-none leading-none">
        {level}
      </span>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">{badge}</span>
          <div>
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground">VIP {level}</p>
            <p className="font-serif font-light text-base">{name}</p>
          </div>
        </div>
        <p className="text-2xl font-serif font-light mb-1">€{price}<span className="text-xs text-muted-foreground font-sans ml-1">/mo</span></p>
        <ul className="mt-4 space-y-1.5">
          {benefits.map((b) => (
            <li key={b} className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-muted-foreground flex-shrink-0" />{b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─── CATEGORY CARD ────────────────────────────────────────
export function CategoryCard({
  name, count, image, href, description, className,
}: {
  name:         string
  count?:       number
  image?:       string
  href:         string
  description?: string
  className?:   string
}) {
  return (
    <Link href={href} className={cn('group relative block overflow-hidden border border-border hover:border-foreground/40 transition-colors', className)}>
      <div className="aspect-[4/3] bg-muted overflow-hidden">
        {image
          ? <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          : <PlaceholderImg className="w-full h-full" />
        }
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white font-medium text-sm mb-0.5">{name}</p>
        {count !== undefined && <p className="text-white/50 text-xs">{formatNumber(count)} items</p>}
      </div>
    </Link>
  )
}
