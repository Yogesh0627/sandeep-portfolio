'use client'

import { ArrowUp } from 'lucide-react'

/**
 * Scrolls to the top without mutating the URL (a plain href="#" would append
 * a stray hash like "/about#"). Respects reduced-motion via CSS scroll config.
 */
export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-accent"
    >
      Back to top <ArrowUp className="size-3.5" />
    </button>
  )
}
