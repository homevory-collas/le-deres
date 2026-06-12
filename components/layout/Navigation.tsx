'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { MAIN_NAV, type NavItem } from '@/constants/navigation'
import { cn } from '@/lib/utils'

export function Navigation() {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-1">
        {MAIN_NAV.map((item) => (
          <NavItemComponent key={item.href} item={item} />
        ))}
      </ul>
    </nav>
  )
}

function NavItemComponent({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }

  if (!item.children) {
    return (
      <li>
        <Link
          href={item.href}
          className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5"
        >
          {item.label}
        </Link>
      </li>
    )
  }

  return (
    <li
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          'flex items-center gap-1 text-xs tracking-widest uppercase transition-colors px-2 py-1.5',
          open ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
        )}
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown
          size={12}
          className={cn('transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 min-w-[200px] bg-background border border-border rounded-md shadow-lg py-1 animate-fade-in">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </li>
  )
}
