import { ArrowRight, MapPin, Mail, BadgeCheck, Download } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { Button } from '../ui/button'
import { profile, stats, resume } from '@/lib/data'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* backdrop */}
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 top-40 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl" />

      <div className="container relative pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm shadow-soft">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to finance leadership opportunities
          </div>

          <h1
            className="animate-fade-up font-serif text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl"
            style={{ animationDelay: '60ms' }}
          >
            {profile.name}
          </h1>
          <p
            className="mt-3 animate-fade-up text-lg font-medium text-accent md:text-xl"
            style={{ animationDelay: '120ms' }}
          >
            {profile.title}
          </p>
          <p
            className="mx-auto mt-6 max-w-2xl animate-fade-up text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ animationDelay: '180ms' }}
          >
            {profile.tagline}
          </p>

          <div
            className="mt-6 flex animate-fade-up flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
            style={{ animationDelay: '220ms' }}
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-accent" /> {profile.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="size-4 text-accent" /> 15+ years experience
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="size-4 text-accent" /> Available on request
            </span>
          </div>

          <div
            className="mt-9 flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: '260ms' }}
          >
            <Button asChild size="lg">
              <Link href="/contact">
                Get in touch <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={resume.path} download={resume.downloadName}>
                <Download className="size-4" /> Download CV
              </a>
            </Button>
          </div>
        </div>

        {/* stat band */}
        <div
          className="mx-auto mt-16 grid max-w-4xl animate-fade-up grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border shadow-soft md:grid-cols-4"
          style={{ animationDelay: '320ms' }}
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-card p-6 text-center">
              <div className="font-serif text-3xl font-semibold text-primary dark:text-accent">
                {s.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
