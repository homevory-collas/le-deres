'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

// ─── SimpleLineChart (pure CSS/SVG placeholder) ───────────
interface ChartDataPoint { label: string; value: number }

export function SimpleBarChart({
  data, height = 160, color = '#D4AF37', className,
}: {
  data:       ChartDataPoint[]
  height?:    number
  color?:     string
  className?: string
}) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div className={cn('flex items-end gap-1', className)} style={{ height }}>
      {data.map((d, i) => {
        const pct = (d.value / max) * 100
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 group" title={`${d.label}: ${d.value}`}>
            <div
              className="w-full transition-all rounded-sm opacity-70 group-hover:opacity-100"
              style={{ height: `${pct}%`, background: color }}
            />
            <span className="text-[8px] text-muted-foreground truncate w-full text-center">{d.label}</span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Sparkline ────────────────────────────────────────────
export function Sparkline({
  data, width = 80, height = 28, color = '#D4AF37', className,
}: {
  data:       number[]
  width?:     number
  height?:    number
  color?:     string
  className?: string
}) {
  if (data.length < 2) return null
  const max  = Math.max(...data)
  const min  = Math.min(...data)
  const span = max - min || 1
  const pts  = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / span) * (height - 4) - 2
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} className={className} aria-hidden>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.8}
      />
    </svg>
  )
}

// ─── DonutChart ───────────────────────────────────────────
export function DonutChart({
  segments, size = 80, thickness = 12, className,
}: {
  segments:   { label: string; value: number; color: string }[]
  size?:      number
  thickness?: number
  className?: string
}) {
  const total  = segments.reduce((s, seg) => s + seg.value, 0)
  const radius = (size - thickness) / 2
  const circ   = 2 * Math.PI * radius
  let   offset = 0

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <svg width={size} height={size} aria-hidden>
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {segments.map((seg, i) => {
            const dash  = (seg.value / total) * circ
            const gap   = circ - dash
            const el = (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={thickness}
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={-offset}
                strokeLinecap="round"
                opacity={0.85}
              />
            )
            offset += dash
            return el
          })}
        </g>
      </svg>
      <div className="space-y-1.5">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: seg.color }} />
            <span className="text-muted-foreground">{seg.label}</span>
            <span className="font-medium ml-auto pl-4">{Math.round((seg.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── MiniMetric ───────────────────────────────────────────
export function MiniMetric({
  label, value, change, data, className,
}: {
  label:      string
  value:      string
  change?:    number
  data?:      number[]
  className?: string
}) {
  const isUp = change !== undefined && change > 0
  return (
    <div className={cn('flex items-center justify-between py-3 border-b border-border last:border-0', className)}>
      <div>
        <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-0.5">{label}</p>
        <p className="text-lg font-light">{value}</p>
        {change !== undefined && (
          <div className={cn('flex items-center gap-1 text-[10px] mt-0.5', isUp ? 'text-green-500' : 'text-red-400')}>
            {isUp ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
            {isUp ? '+' : ''}{change}%
          </div>
        )}
      </div>
      {data && <Sparkline data={data} />}
    </div>
  )
}

// ─── ActivityFeed ─────────────────────────────────────────
interface ActivityItem {
  id:      string
  text:    string
  time:    string
  type:    'user' | 'order' | 'content' | 'system' | 'moderation'
}

const TYPE_COLORS: Record<string, string> = {
  user:       'bg-blue-500',
  order:      'bg-green-500',
  content:    'bg-yellow-500',
  system:     'bg-muted-foreground',
  moderation: 'bg-red-500',
}

export function ActivityFeed({ items, className }: { items: ActivityItem[]; className?: string }) {
  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-3">
          <span className={cn('w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0', TYPE_COLORS[item.type])} />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground leading-snug">{item.text}</p>
          </div>
          <span className="text-[10px] text-muted-foreground/50 flex-shrink-0">{item.time}</span>
        </div>
      ))}
    </div>
  )
}
