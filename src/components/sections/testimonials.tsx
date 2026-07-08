import { Star, Quote, MessageSquareQuote } from 'lucide-react'
import { testimonials, type Testimonial } from '@/lib/data'

/**
 * Auto-scrolling, edge-masked testimonial marquee. Pure CSS animation
 * (pauses on hover/focus); degrades to a manual horizontal scroll when the
 * viewer prefers reduced motion. Content is duplicated once so the -50%
 * translate loops seamlessly.
 */
export function Testimonials() {
  return (
    <section className="section overflow-hidden bg-muted/40">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <MessageSquareQuote className="size-3.5" /> Testimonials
          </span>
          <h2 className="heading mt-3">Trusted by dealers, lenders & peers</h2>
          <p className="mt-4 text-muted-foreground">
            A reputation built one honest deal at a time — here&rsquo;s what the people who&rsquo;ve
            worked with Sandeep have to say.
          </p>

          {/* Aggregate rating badge */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-soft">
            <span className="flex gap-0.5 text-accent" aria-label="Rated 5 out of 5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" aria-hidden />
              ))}
            </span>
            <span className="text-sm font-semibold text-foreground">5.0</span>
            <span className="h-4 w-px bg-border" />
            <span className="text-sm text-muted-foreground">
              {testimonials.length} verified endorsements
            </span>
          </div>
        </div>

        {/* Single row, aligned within the page container */}
        <div className="marquee-mask group relative mt-12 flex w-full overflow-hidden">
          <MarqueeRow items={testimonials} animation="animate-marquee" />
        </div>
      </div>
    </section>
  )
}

function MarqueeRow({ items, animation }: { items: Testimonial[]; animation: string }) {
  return (
    <div
      className={`marquee-track flex w-max ${animation} focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]`}
    >
      {/* two identical groups, each carrying its own trailing gap (pr-6)
          so the -50% translate tiles seamlessly */}
      <div className="flex shrink-0 gap-6 pr-6">
        {items.map((t) => (
          <Card key={t.name} t={t} />
        ))}
      </div>
      <div className="flex shrink-0 gap-6 pr-6" aria-hidden>
        {items.map((t) => (
          <Card key={`dup-${t.name}`} t={t} />
        ))}
      </div>
    </div>
  )
}

function Card({ t, ...rest }: { t: Testimonial } & React.HTMLAttributes<HTMLElement>) {
  const initials = t.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)

  return (
    <figure
      className="flex w-[300px] shrink-0 flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-soft sm:w-[360px]"
      {...rest}
    >
      <div>
        <Quote className="size-7 text-accent/30" aria-hidden />
        <div className="mt-3 flex gap-0.5 text-accent" aria-label="5 out of 5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-4 fill-current" aria-hidden />
          ))}
        </div>
        <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
      </div>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary font-serif text-sm font-semibold text-primary-foreground">
          {initials}
        </span>
        <span>
          <span className="block text-sm font-semibold text-foreground">{t.name}</span>
          <span className="block text-xs text-muted-foreground">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}
