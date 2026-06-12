'use client'

import * as React from 'react'
import { Upload, Search, Grid, List, Filter, Image, FileVideo, HardDrive, Cloud, Trash2, Download, Copy, ExternalLink } from 'lucide-react'
import { AdminPageHeader, AdminCard, AdminBtn, StatCard, FormField, AdminSelect } from '@/components/admin/shared'
import { cn } from '@/lib/utils'

// ─── Placeholder media items ──────────────────────────────
const MEDIA_TYPES = {
  images:    ['jpg', 'jpeg', 'png', 'webp', 'gif'] as const,
  videos:    ['mp4', 'mov', 'webm'] as const,
  documents: ['pdf', 'zip', 'doc'] as const,
}

const PLACEHOLDER_IMAGES = Array.from({ length: 32 }, (_, i) => ({
  id: `img-${i}`, filename: `image-${i + 1}.jpg`,
  size: `${(Math.random() * 4 + 0.5).toFixed(1)} MB`,
  dimensions: ['1280×720', '1920×1080', '800×600', '3840×2160'][i % 4],
  folder: ['thumbnails', 'content', 'profiles', 'products'][i % 4],
  uploaded: `${10 - Math.floor(i / 4)} Jun 2026`,
  usedIn: Math.floor(Math.random() * 10),
}))

const PLACEHOLDER_VIDEOS = Array.from({ length: 20 }, (_, i) => ({
  id: `vid-${i}`, filename: `video-${i + 1}.mp4`,
  size: `${(Math.random() * 800 + 50).toFixed(0)} MB`,
  duration: `${Math.floor(Math.random() * 60 + 5)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
  resolution: ['720p', '1080p', '4K'][i % 3],
  folder: ['content', 'previews', 'ai-videos'][i % 3],
  uploaded: `${10 - Math.floor(i / 3)} Jun 2026`,
}))

// ─── Media Grid ───────────────────────────────────────────
function MediaGrid({ items, type }: { items: typeof PLACEHOLDER_IMAGES; type: 'image' | 'video' }) {
  const [selected, setSelected] = React.useState<string[]>([])

  function toggle(id: string) {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
      {items.map(item => (
        <div
          key={item.id}
          onClick={() => toggle(item.id)}
          className={cn(
            'group relative cursor-pointer border transition-all',
            selected.includes(item.id)
              ? 'border-foreground ring-1 ring-foreground'
              : 'border-border hover:border-foreground/40',
          )}
        >
          {/* Thumbnail */}
          <div className="aspect-square bg-muted flex items-center justify-center">
            {type === 'image'
              ? <Image size={20} className="text-muted-foreground/40" />
              : <FileVideo size={20} className="text-muted-foreground/40" />
            }
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
            <button className="w-6 h-6 bg-background/90 flex items-center justify-center text-foreground hover:bg-background" title="Copy URL">
              <Copy size={10} />
            </button>
            <button className="w-6 h-6 bg-background/90 flex items-center justify-center text-foreground hover:bg-background" title="Download">
              <Download size={10} />
            </button>
            <button className="w-6 h-6 bg-red-500/90 flex items-center justify-center text-white hover:bg-red-500" title="Delete">
              <Trash2 size={10} />
            </button>
          </div>

          {/* Selected check */}
          {selected.includes(item.id) && (
            <div className="absolute top-1 left-1 w-4 h-4 bg-foreground rounded-full flex items-center justify-center">
              <span className="text-background text-[8px]">✓</span>
            </div>
          )}

          {/* Filename */}
          <p className="text-[8px] text-muted-foreground truncate px-1 py-1">{item.filename}</p>
        </div>
      ))}
    </div>
  )
}

// ─── Media Library main page ──────────────────────────────
export function AdminMediaPage() {
  const [view, setView] = React.useState<'images' | 'videos' | 'documents'>('images')
  const [layout, setLayout] = React.useState<'grid' | 'list'>('grid')
  const [search, setSearch] = React.useState('')

  const totalSize = '284 GB'

  return (
    <div>
      <AdminPageHeader
        title="Media Library"
        description="Manage all platform media assets"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Media' }]}
        actions={
          <div className="flex gap-2">
            <AdminBtn variant="outline" size="sm">
              <Cloud size={12} /> Storage Settings
            </AdminBtn>
            <AdminBtn variant="primary" size="sm">
              <Upload size={12} /> Upload Files
            </AdminBtn>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <StatCard label="Images"    value={`${PLACEHOLDER_IMAGES.length}`}  change={12} href="/admin/media/images" />
        <StatCard label="Videos"    value={`${PLACEHOLDER_VIDEOS.length}`}  change={8}  href="/admin/media/videos" />
        <StatCard label="Documents" value="124"                              change={4}  href="/admin/media/documents" />
        <StatCard label="Storage Used" value={totalSize}                    change={15} />
      </div>

      {/* Storage providers */}
      <AdminCard title="Storage Providers" className="mb-5">
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: 'Local (Dev)',     status: 'ACTIVE',  icon: HardDrive, used: '12 GB',  limit: '50 GB' },
            { name: 'Cloudflare R2',   status: 'PENDING', icon: Cloud,     used: '—',      limit: '—' },
            { name: 'AWS S3',          status: 'PENDING', icon: Cloud,     used: '—',      limit: '—' },
          ].map(({ name, status, icon: Icon, used, limit }) => (
            <div key={name} className="border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={16} className="text-muted-foreground" />
                <p className="text-sm font-medium">{name}</p>
                <span className={cn(
                  'ml-auto text-[8px] px-1.5 py-0.5 border tracking-widest uppercase',
                  status === 'ACTIVE' ? 'text-green-500 border-green-500/20 bg-green-500/10' : 'text-muted-foreground border-border',
                )}>
                  {status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{used} / {limit}</p>
            </div>
          ))}
        </div>
      </AdminCard>

      {/* Media browser */}
      <AdminCard padding={false}>
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 p-4 border-b border-border">
          <div className="flex gap-1">
            {(['images', 'videos', 'documents'] as const).map(t => (
              <button
                key={t}
                onClick={() => setView(t)}
                className={cn(
                  'px-3 py-1.5 text-xs tracking-widest uppercase border transition-colors capitalize',
                  view === t ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground',
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search files…"
                className="border border-border bg-background pl-7 pr-3 py-1.5 text-xs w-40 focus:outline-none focus:border-foreground"
              />
            </div>
            <select className="border border-border bg-background px-2 py-1.5 text-xs focus:outline-none">
              <option>All Folders</option>
              <option>thumbnails</option>
              <option>content</option>
              <option>profiles</option>
              <option>products</option>
            </select>
            <button
              onClick={() => setLayout(l => l === 'grid' ? 'list' : 'grid')}
              className="p-1.5 text-muted-foreground hover:text-foreground border border-border"
            >
              {layout === 'grid' ? <List size={14} /> : <Grid size={14} />}
            </button>
          </div>
        </div>

        {/* Upload drop zone */}
        <div className="border-b border-border border-dashed m-4 p-6 text-center hover:bg-muted/20 transition-colors cursor-pointer">
          <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Drop files here or <span className="text-foreground underline">browse</span></p>
          <p className="text-[10px] text-muted-foreground/50 mt-1">Max 500MB per file · Images, videos, documents</p>
        </div>

        {/* Media grid */}
        <div className="p-4">
          {view === 'images' && <MediaGrid items={PLACEHOLDER_IMAGES} type="image" />}
          {view === 'videos' && <MediaGrid items={PLACEHOLDER_VIDEOS.map(v => ({ ...v, dimensions: v.resolution, usedIn: 0 })) as any} type="video" />}
          {view === 'documents' && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No documents uploaded yet.
            </div>
          )}
        </div>
      </AdminCard>
    </div>
  )
}
