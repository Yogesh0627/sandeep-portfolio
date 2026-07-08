import { Link } from 'next-view-transitions'
import { ArrowUpRight, Calendar, Clock } from 'lucide-react'
import { type PostMeta, formatDate } from '@/lib/blog'
import { Badge } from './ui/badge'

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-lg border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="flex flex-wrap items-center gap-2">
        {post.tags.slice(0, 2).map((t) => (
          <Badge key={t} className="border-accent/20 bg-accent/5 text-accent">
            {t}
          </Badge>
        ))}
      </div>

      <h3 className="mt-4 font-serif text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="size-3.5" /> {formatDate(post.date)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5" /> {post.readingTime}
        </span>
      </div>

      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
        Read article
        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}
