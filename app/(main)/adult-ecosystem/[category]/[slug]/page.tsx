import Link from 'next/link'
import { ArrowLeft, Heart, Share2, Bookmark, Eye } from 'lucide-react'

interface Props {
  params: { category: string; slug: string }
}

export default function ContentDetailPage({ params }: Props) {
  return (
    <div className="container-wide section-padding">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
        <Link href="/adult-ecosystem" className="hover:text-foreground">Adult Ecosystem</Link>
        <span>/</span>
        <Link href={`/adult-ecosystem/${params.category}`} className="hover:text-foreground capitalize">
          {params.category.replace(/-/g, ' ')}
        </Link>
        <span>/</span>
        <span className="text-foreground capitalize">{params.slug.replace(/-/g, ' ')}</span>
      </nav>

      <div className="grid lg:grid-cols-[1fr_320px] gap-12">

        {/* Main content */}
        <div>
          {/* Video player placeholder */}
          <div className="aspect-video bg-muted rounded-sm flex items-center justify-center mb-6">
            <p className="text-muted-foreground text-sm">Video Player — Phase 2</p>
          </div>

          {/* Title + actions */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1 capitalize">
                {params.category.replace(/-/g, ' ')}
              </p>
              <h1 className="text-2xl font-serif font-light">
                Content Title — {params.slug.replace(/-/g, ' ')}
              </h1>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button aria-label="Like" className="p-2 text-muted-foreground hover:text-foreground">
                <Heart size={18} />
              </button>
              <button aria-label="Save" className="p-2 text-muted-foreground hover:text-foreground">
                <Bookmark size={18} />
              </button>
              <button aria-label="Share" className="p-2 text-muted-foreground hover:text-foreground">
                <Share2 size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
            <span className="flex items-center gap-1"><Eye size={12} /> 24,830 views</span>
            <span>42:18</span>
            <span>Added 3 days ago</span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            Content description placeholder — will be populated from database in Phase 2.
            This area contains the full description, tags, creator info and additional metadata.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {['Premium', 'HD', 'Exclusive', params.category].map((tag) => (
              <span key={tag} className="text-[10px] px-3 py-1 border border-border text-muted-foreground capitalize">
                {tag.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside>
          {/* Creator card */}
          <div className="border border-border rounded-sm p-5 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-muted" />
              <div>
                <p className="text-sm font-medium">Creator Name</p>
                <p className="text-xs text-muted-foreground">240K followers</p>
              </div>
            </div>
            <button className="w-full py-2 border border-border text-xs tracking-widest uppercase hover:border-foreground transition-colors">
              Follow
            </button>
          </div>

          {/* Related content */}
          <div>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Related</p>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-24 aspect-video bg-muted rounded-sm flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium line-clamp-2">Related content #{i + 1}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">12K views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
