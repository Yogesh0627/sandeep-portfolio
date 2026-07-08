import { Briefcase, MapPin } from 'lucide-react'
import { experiences } from '@/lib/data'

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <Briefcase className="size-3.5" /> Career journey
          </span>
          <h2 className="heading mt-3">15+ years across banks & dealerships</h2>
          <p className="mt-4 text-muted-foreground">
            A track record spanning India&rsquo;s leading auto lenders and OEM franchises — now at
            the forefront of EV finance.
          </p>
        </div>

        <ol className="relative mt-14 border-l border-border pl-8 md:pl-10">
          {experiences.map((exp, i) => (
            <li key={`${exp.company}-${i}`} className="relative pb-10 last:pb-0">
              {/* node */}
              <span
                className={`absolute -left-[41px] top-1 grid h-6 w-6 place-items-center rounded-full border-2 md:-left-[49px] ${
                  exp.current ? 'border-accent bg-accent' : 'border-border bg-background'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    exp.current ? 'bg-accent-foreground' : 'bg-muted-foreground'
                  }`}
                />
              </span>

              <div className="rounded-lg border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-glow md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    <p className="font-medium text-accent">{exp.company}</p>
                    {exp.note && <p className="text-sm text-muted-foreground">{exp.note}</p>}
                  </div>
                  <div className="text-right text-sm">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        exp.current ? 'bg-accent/15 text-accent' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {exp.start} — {exp.end}
                    </span>
                    <p className="mt-1.5 inline-flex items-center gap-1 text-muted-foreground">
                      <MapPin className="size-3.5" /> {exp.location}
                    </p>
                  </div>
                </div>

                <ul className="mt-4 grid gap-2">
                  {exp.points.map((p, j) => (
                    <li
                      key={j}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
