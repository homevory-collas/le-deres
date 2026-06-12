'use client'

import * as React from 'react'
import {
  Save, Eye, Trash2, Upload, X, Plus, Tag,
  Globe, Lock, Star, Clock, CheckCircle,
} from 'lucide-react'
import {
  AdminPageHeader, AdminCard, AdminBtn, FormField,
  AdminInput, AdminTextarea, AdminSelect, AdminStatusBadge,
} from '@/components/admin/shared'
import { cn } from '@/lib/utils'

// ─── Content type definitions ─────────────────────────────
export const CONTENT_CATEGORIES = [
  { value: 'european',     label: 'European Collection' },
  { value: 'asian-jav',   label: 'Asian — JAV' },
  { value: 'asian-cn',    label: 'Asian — Chinese' },
  { value: 'asian-kr',    label: 'Asian — Korean' },
  { value: 'asian',       label: 'Asian — General' },
  { value: 'american-us', label: 'American — USA' },
  { value: 'american-ca', label: 'American — Canada' },
  { value: 'american-la', label: 'American — Latin America' },
  { value: 'ai-girlfriend',label: 'AI Girlfriend' },
  { value: 'ai-video',    label: 'AI Video' },
  { value: 'trending',    label: 'Trending Videos' },
  { value: 'new-releases',label: 'New Releases' },
  { value: 'influencer',  label: 'Influencer Collections' },
  { value: 'live-shows',  label: 'Live Shows' },
]

export const CONTENT_TYPES = [
  { value: 'video',        label: 'Video' },
  { value: 'image',        label: 'Image Gallery' },
  { value: 'live',         label: 'Live Show' },
  { value: 'ai_video',     label: 'AI Video' },
  { value: 'ai_girlfriend',label: 'AI Girlfriend' },
]

export const MEMBERSHIP_TIERS = [
  { value: 'FREE',      label: 'Free' },
  { value: 'SILVER',    label: 'Silver' },
  { value: 'GOLD',      label: 'Gold' },
  { value: 'BLACK_VIP', label: 'Black VIP' },
]

// ─── ContentEditor component ──────────────────────────────
interface ContentEditorProps {
  mode:     'create' | 'edit'
  initial?: Record<string, unknown>
}

export function ContentEditor({ mode, initial = {} }: ContentEditorProps) {
  const [form, setForm] = React.useState({
    title:         (initial.title as string)        ?? '',
    slug:          (initial.slug as string)         ?? '',
    description:   (initial.description as string)  ?? '',
    category:      (initial.category as string)     ?? '',
    type:          (initial.type as string)         ?? 'video',
    requiredTier:  (initial.requiredTier as string) ?? 'FREE',
    status:        (initial.status as string)       ?? 'DRAFT',
    isFeatured:    (initial.isFeatured as boolean)  ?? false,
    duration:      (initial.duration as string)     ?? '',
    tags:          (initial.tags as string[])       ?? [],
    tagInput:      '',
  })

  function setField<K extends keyof typeof form>(k: K, v: typeof form[K]) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  function addTag() {
    const t = form.tagInput.trim().toLowerCase()
    if (t && !form.tags.includes(t)) {
      setField('tags', [...form.tags, t])
      setField('tagInput', '')
    }
  }

  function removeTag(t: string) {
    setField('tags', form.tags.filter((x) => x !== t))
  }

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  return (
    <div>
      <AdminPageHeader
        title={mode === 'create' ? 'Add New Content' : 'Edit Content'}
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          { label: 'Content', href: '/admin/content' },
          { label: mode === 'create' ? 'New' : 'Edit' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <AdminBtn variant="outline" size="sm"><Eye size={12} /> Preview</AdminBtn>
            <AdminBtn variant="outline" size="sm" onClick={() => setField('status', 'DRAFT')}>
              <Clock size={12} /> Save Draft
            </AdminBtn>
            <AdminBtn variant="primary" size="sm" onClick={() => setField('status', 'PUBLISHED')}>
              <CheckCircle size={12} /> Publish
            </AdminBtn>
          </div>
        }
      />

      <div className="grid lg:grid-cols-[1fr_280px] gap-5">
        {/* Main column */}
        <div className="space-y-5">
          {/* Basic info */}
          <AdminCard title="Content Details">
            <div className="space-y-4">
              <FormField label="Title" required>
                <AdminInput
                  value={form.title}
                  onChange={(e) => {
                    setField('title', e.target.value)
                    if (mode === 'create') setField('slug', autoSlug(e.target.value))
                  }}
                  placeholder="Enter content title…"
                />
              </FormField>
              <FormField label="Slug" hint="Auto-generated from title. Must be unique.">
                <AdminInput
                  value={form.slug}
                  onChange={(e) => setField('slug', e.target.value)}
                  placeholder="content-slug"
                />
              </FormField>
              <FormField label="Description">
                <AdminTextarea
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                  rows={4}
                  placeholder="Content description…"
                />
              </FormField>
            </div>
          </AdminCard>

          {/* Media upload */}
          <AdminCard title="Media">
            <div className="grid grid-cols-2 gap-4">
              {/* Thumbnail */}
              <div className="border border-dashed border-border hover:border-foreground/40 transition-colors p-6 text-center cursor-pointer">
                <Upload size={20} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Thumbnail</p>
                <p className="text-[10px] text-muted-foreground/50">1280×720 recommended</p>
              </div>
              {/* Content file */}
              <div className="border border-dashed border-border hover:border-foreground/40 transition-colors p-6 text-center cursor-pointer">
                <Upload size={20} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Content File</p>
                <p className="text-[10px] text-muted-foreground/50">MP4, MOV, ZIP supported</p>
              </div>
            </div>
            <FormField label="Duration (seconds)" className="mt-4">
              <AdminInput
                type="number"
                value={form.duration}
                onChange={(e) => setField('duration', e.target.value)}
                placeholder="e.g. 1800 (= 30 min)"
              />
            </FormField>
          </AdminCard>

          {/* Tags */}
          <AdminCard title="Tags">
            <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
              {form.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 text-[10px] px-2 py-1 border border-border">
                  <Tag size={9} />{tag}
                  <button onClick={() => removeTag(tag)} className="text-muted-foreground hover:text-red-400 ml-1">
                    <X size={9} />
                  </button>
                </span>
              ))}
              {form.tags.length === 0 && <p className="text-xs text-muted-foreground/50">No tags yet</p>}
            </div>
            <div className="flex gap-2">
              <AdminInput
                value={form.tagInput}
                onChange={(e) => setField('tagInput', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Type tag and press Enter…"
                className="flex-1"
              />
              <AdminBtn variant="outline" size="sm" onClick={addTag}>
                <Plus size={12} /> Add
              </AdminBtn>
            </div>
          </AdminCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Status */}
          <AdminCard title="Publish">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Status</span>
                <AdminStatusBadge status={form.status} />
              </div>
              <FormField label="Change Status">
                <AdminSelect
                  value={form.status}
                  onChange={(e) => setField('status', e.target.value)}
                  options={[
                    { value: 'DRAFT',     label: 'Draft' },
                    { value: 'REVIEW',    label: 'In Review' },
                    { value: 'PUBLISHED', label: 'Published' },
                    { value: 'REMOVED',   label: 'Removed' },
                  ]}
                />
              </FormField>
              <label className="flex items-center gap-2 cursor-pointer py-1">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setField('isFeatured', e.target.checked)}
                  className="accent-foreground"
                />
                <span className="text-xs flex items-center gap-1.5">
                  <Star size={11} className="text-yellow-500" /> Mark as Featured
                </span>
              </label>
              <AdminBtn variant="primary" size="md" className="w-full">
                <Save size={12} /> {mode === 'create' ? 'Create Content' : 'Save Changes'}
              </AdminBtn>
              {mode === 'edit' && (
                <AdminBtn variant="danger" size="md" className="w-full">
                  <Trash2 size={12} /> Delete Content
                </AdminBtn>
              )}
            </div>
          </AdminCard>

          {/* Category */}
          <AdminCard title="Classification">
            <div className="space-y-3">
              <FormField label="Category" required>
                <AdminSelect
                  value={form.category}
                  onChange={(e) => setField('category', e.target.value)}
                  options={CONTENT_CATEGORIES}
                  placeholder="Select category…"
                />
              </FormField>
              <FormField label="Content Type">
                <AdminSelect
                  value={form.type}
                  onChange={(e) => setField('type', e.target.value)}
                  options={CONTENT_TYPES}
                />
              </FormField>
              <FormField label="Required Membership">
                <AdminSelect
                  value={form.requiredTier}
                  onChange={(e) => setField('requiredTier', e.target.value)}
                  options={MEMBERSHIP_TIERS}
                />
              </FormField>
            </div>
          </AdminCard>

          {/* Access */}
          <AdminCard title="Access Control">
            <div className="space-y-2">
              {[
                { icon: Globe, label: 'Public (Free)', value: 'FREE' },
                { icon: Lock, label: 'Silver+',        value: 'SILVER' },
                { icon: Star, label: 'Gold+',          value: 'GOLD' },
                { icon: Star, label: 'Black VIP',      value: 'BLACK_VIP' },
              ].map(({ icon: Icon, label, value }) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer py-1">
                  <input
                    type="radio"
                    name="tier"
                    value={value}
                    checked={form.requiredTier === value}
                    onChange={() => setField('requiredTier', value)}
                    className="accent-foreground"
                  />
                  <Icon size={11} className="text-muted-foreground" />
                  <span className="text-xs">{label}</span>
                </label>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  )
}
