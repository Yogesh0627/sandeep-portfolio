import * as React from 'react'

interface PageHeaderProps {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  children?: React.ReactNode
}

/** Full-width page intro that clears the fixed navbar and sets the tone. */
export function PageHeader({ eyebrow, title, description, icon, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="container relative pb-14 pt-32 text-center md:pb-16 md:pt-36">
        {eyebrow && (
          <span className="eyebrow animate-fade-up justify-center">
            {icon}
            {eyebrow}
          </span>
        )}
        <h1
          className="mt-3 animate-fade-up font-serif text-4xl font-semibold tracking-tight md:text-5xl"
          style={{ animationDelay: '60ms' }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="mx-auto mt-4 max-w-2xl animate-fade-up text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ animationDelay: '120ms' }}
          >
            {description}
          </p>
        )}
        {children && (
          <div className="mt-7 animate-fade-up" style={{ animationDelay: '160ms' }}>
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
