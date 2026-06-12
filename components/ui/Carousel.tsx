'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CarouselProps {
  children:    React.ReactNode[]
  autoPlay?:   boolean
  interval?:   number
  showDots?:   boolean
  showArrows?: boolean
  className?:  string
  itemsPerView?: number
}

export function Carousel({
  children,
  autoPlay = false,
  interval = 4000,
  showDots = true,
  showArrows = true,
  className,
  itemsPerView = 1,
}: CarouselProps) {
  const [current, setCurrent] = React.useState(0)
  const total = children.length
  const trackRef = React.useRef<HTMLDivElement>(null)

  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)

  React.useEffect(() => {
    if (!autoPlay) return
    const id = setInterval(next, interval)
    return () => clearInterval(id)
  }, [autoPlay, interval, total])

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        ref={trackRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * (100 / itemsPerView)}%)` }}
      >
        {children.map((child, i) => (
          <div
            key={i}
            className="flex-shrink-0"
            style={{ width: `${100 / itemsPerView}%` }}
          >
            {child}
          </div>
        ))}
      </div>

      {showArrows && total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-background/80 border border-border hover:bg-background transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-background/80 border border-border hover:bg-background transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

      {showDots && total > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                'h-1 transition-all',
                i === current ? 'w-6 bg-foreground' : 'w-1.5 bg-muted-foreground/40',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── HeroCarousel — full bleed banner slider ──────────────
interface HeroSlide {
  title:       string
  subtitle?:   string
  cta?:        { label: string; href: string }
  image?:      string
  badge?:      string
}

export function HeroCarousel({ slides, className }: { slides: HeroSlide[]; className?: string }) {
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [slides.length])

  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      {slides.map((slide, i) => (
        <div
          key={i}
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0',
          )}
        >
          {/* BG placeholder — replace with real image in Phase 3 */}
          <div className="absolute inset-0 bg-muted" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="relative z-10 h-full flex items-center px-12 py-16">
            <div className="max-w-xl">
              {slide.badge && (
                <span className="text-[10px] tracking-widest uppercase text-muted-foreground border border-border px-3 py-1 inline-block mb-4">
                  {slide.badge}
                </span>
              )}
              {slide.subtitle && (
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">{slide.subtitle}</p>
              )}
              <h2 className="text-4xl md:text-5xl font-serif font-light leading-tight mb-4">{slide.title}</h2>
              {slide.cta && (
                <a
                  href={slide.cta.href}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-foreground text-background text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
                >
                  {slide.cta.label}
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Slide counter */}
      <div className="absolute bottom-6 right-8 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn('h-0.5 transition-all', i === current ? 'w-8 bg-foreground' : 'w-3 bg-muted-foreground/30')}
          />
        ))}
      </div>
    </div>
  )
}
