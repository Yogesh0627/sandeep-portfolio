import { GraduationCap, Languages, Sparkles } from 'lucide-react'
import { profile, education, skills } from '@/lib/data'
import { Badge } from '../ui/badge'

export function About({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section id="about" className="section">
      <div className="container grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          {!hideHeader && (
            <>
              <span className="eyebrow">
                <Sparkles className="size-3.5" /> About
              </span>
              <h2 className="heading mt-3">
                A finance professional who builds trust, portfolios, and networks.
              </h2>
            </>
          )}
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {skills.map((s) => (
              <Badge key={s} className="border-accent/20 bg-accent/5 text-foreground/80">
                {s}
              </Badge>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-accent/10 text-accent">
                <GraduationCap className="size-5" />
              </span>
              <h3 className="font-semibold">Education</h3>
            </div>
            <p className="mt-3 font-medium">{education.degree}</p>
            <p className="text-sm text-muted-foreground">{education.period}</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-accent/10 text-accent">
                <Languages className="size-5" />
              </span>
              <h3 className="font-semibold">Languages</h3>
            </div>
            <div className="mt-3 flex gap-2">
              {profile.languages.map((l) => (
                <Badge key={l}>{l}</Badge>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-accent/20 bg-gradient-to-br from-accent/10 to-transparent p-5">
            <p className="font-serif text-lg font-medium leading-snug">
              &ldquo;Quality sourcing with minimal deviations — every deal, every time.&rdquo;
            </p>
            <p className="mt-2 text-sm text-muted-foreground">— Operating principle</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
