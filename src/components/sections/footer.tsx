import { Mail, MapPin, TrendingUp, Github, Linkedin, Globe } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { profile, developer } from '@/lib/data'
import { BackToTop } from '../back-to-top'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/tools', label: 'Calculators' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  const year = 2025 // build-time constant; update as needed
  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
                <span className="font-serif text-sm">{initials}</span>
              </span>
              <span className="font-semibold">{profile.name}</span>
              <TrendingUp className="size-4 text-accent" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {profile.title} with 15+ years across India&rsquo;s leading banks and dealerships —
              helping people and businesses finance their journey.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <Mail className="size-4" /> {profile.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="size-4" /> {profile.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {profile.name}. All rights reserved.
          </p>

          {/* Developer credit */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>
              Developed by{' '}
              <a
                href={developer.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground transition-colors hover:text-accent"
              >
                {developer.name}
              </a>
            </span>
            <span className="h-3 w-px bg-border" />
            <span className="flex items-center gap-2.5">
              <a
                href={developer.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${developer.name} website`}
                className="transition-colors hover:text-accent"
              >
                <Globe className="size-4" />
              </a>
              <a
                href={developer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${developer.name} on LinkedIn`}
                className="transition-colors hover:text-accent"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href={developer.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${developer.name} on GitHub`}
                className="transition-colors hover:text-accent"
              >
                <Github className="size-4" />
              </a>
            </span>
          </div>

          <BackToTop />
        </div>
      </div>
    </footer>
  )
}
