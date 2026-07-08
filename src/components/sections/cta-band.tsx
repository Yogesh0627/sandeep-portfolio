import { Link } from 'next-view-transitions'
import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'

interface CtaBandProps {
  title: string
  description: string
  primary: { href: string; label: string }
  secondary?: { href: string; label: string }
}

export function CtaBand({ title, description, primary, secondary }: CtaBandProps) {
  return (
    <section className="section">
      <div className="container-tight">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-primary px-6 py-12 text-center text-primary-foreground md:px-12 md:py-16">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-20" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">{description}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent">
                <Link href={primary.href}>
                  {primary.label} <ArrowRight className="size-4" />
                </Link>
              </Button>
              {secondary && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link href={secondary.href}>{secondary.label}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
