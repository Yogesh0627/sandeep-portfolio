import { FileText, Users, ShieldCheck, Zap } from 'lucide-react'
import { expertiseAreas } from '@/lib/data'
import { Card, CardContent } from '../ui/card'

const icons = [FileText, Users, ShieldCheck, Zap]

export function Expertise() {
  return (
    <section id="expertise" className="section bg-muted/40">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <ShieldCheck className="size-3.5" /> Expertise
          </span>
          <h2 className="heading mt-3">What I bring to the table</h2>
          <p className="mt-4 text-muted-foreground">
            Deep, hands-on capability across the full vehicle-finance lifecycle — from the first
            dealer conversation to a clean, compliant disbursal.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {expertiseAreas.map((area, i) => {
            const Icon = icons[i % icons.length]
            return (
              <Card
                key={area.title}
                className="group transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <CardContent className="p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-primary-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 font-semibold">{area.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.body}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
