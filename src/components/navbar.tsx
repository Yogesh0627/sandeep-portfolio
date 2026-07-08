'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { Link } from 'next-view-transitions'
import { Menu, X, TrendingUp } from 'lucide-react'
import { Button } from './ui/button'
import { ThemeControls } from './theme-controls'
import { profile } from '@/lib/data'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/tools', label: 'Calculators' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change.
  React.useEffect(() => setOpen(false), [pathname])

  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-lg'
          : 'border-b border-transparent'
      )}
    >
      <nav className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <span className="font-serif text-sm">{initials}</span>
          </span>
          <span className="hidden sm:flex sm:items-center sm:gap-2">
            {profile.name}
            <TrendingUp className="hidden size-4 text-accent md:inline" />
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive(l.href)
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {l.label}
              {isActive(l.href) && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent" />
              )}
            </Link>
          ))}
          <div className="mx-2 h-6 w-px bg-border" />
          <ThemeControls />
          <Button asChild size="sm" className="ml-1">
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeControls />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="animate-fade-in border-t border-border bg-background/95 backdrop-blur md:hidden">
          <div className="container flex flex-col py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'rounded-md px-3 py-3 text-sm font-medium',
                  isActive(l.href)
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
