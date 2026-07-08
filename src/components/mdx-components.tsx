import * as React from 'react'
import { Link } from 'next-view-transitions'

/**
 * Theme-aware element mapping for MDX content. Uses design tokens so blog
 * posts re-theme with the active palette and dark mode — no prose plugin.
 */
export const mdxComponents = {
  h1: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mt-10 font-serif text-3xl font-semibold tracking-tight first:mt-0" {...p} />
  ),
  h2: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-10 scroll-mt-24 font-serif text-2xl font-semibold tracking-tight" {...p} />
  ),
  h3: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 text-xl font-semibold" {...p} />
  ),
  p: (p: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-5 leading-relaxed text-muted-foreground" {...p} />
  ),
  a: ({ href = '#', ...p }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const external = /^https?:\/\//.test(href)
    if (external)
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent underline underline-offset-4"
          {...p}
        />
      )
    return (
      <Link
        href={href}
        className="font-medium text-accent underline underline-offset-4"
        {...(p as any)}
      />
    )
  },
  ul: (p: React.HTMLAttributes<HTMLUListElement>) => <ul className="mt-5 space-y-2 pl-1" {...p} />,
  ol: (p: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mt-5 list-decimal space-y-2 pl-5 text-muted-foreground" {...p} />
  ),
  li: (p: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className="relative pl-6 leading-relaxed text-muted-foreground marker:text-accent before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent/70 [ol>&]:pl-1 [ol>&]:before:hidden"
      {...p}
    />
  ),
  blockquote: (p: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-6 border-l-4 border-accent bg-muted/50 py-3 pl-5 pr-4 font-serif text-lg italic text-foreground"
      {...p}
    />
  ),
  strong: (p: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...p} />
  ),
  code: (p: React.HTMLAttributes<HTMLElement>) => (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-accent" {...p} />
  ),
  pre: (p: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mt-6 overflow-x-auto rounded-lg border border-border bg-muted/60 p-4 text-sm"
      {...p}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  table: (p: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...p} />
    </div>
  ),
  th: (p: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="border border-border bg-muted px-3 py-2 text-left font-semibold" {...p} />
  ),
  td: (p: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-border px-3 py-2 text-muted-foreground" {...p} />
  ),
}
