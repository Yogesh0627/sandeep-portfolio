'use client'

import * as React from 'react'
import { Moon, Sun, Palette as PaletteIcon, Check } from 'lucide-react'
import { useTheme, type Palette } from './theme-provider'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

const PALETTES: { id: Palette; label: string; swatch: string }[] = [
  {
    id: 'navy',
    label: 'Navy & Gold',
    swatch: 'linear-gradient(135deg, #0a2540 50%, #c9a24b 50%)',
  },
  {
    id: 'emerald',
    label: 'Emerald',
    swatch: 'linear-gradient(135deg, #0b3b2c 50%, #24a877 50%)',
  },
  {
    id: 'charcoal',
    label: 'Electric Blue',
    swatch: 'linear-gradient(135deg, #1a2233 50%, #2563eb 50%)',
  },
]

export function ThemeControls() {
  const { mode, palette, toggleMode, setPalette } = useTheme()
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div className="flex items-center gap-1">
      <div className="relative" ref={ref}>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Change color palette"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <PaletteIcon />
        </Button>
        {open && (
          <div className="absolute right-0 top-12 z-50 w-48 animate-fade-up rounded-lg border border-border bg-card p-1.5 shadow-glow">
            <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Accent palette
            </p>
            {PALETTES.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setPalette(p.id)
                  setOpen(false)
                }}
                className={cn(
                  'flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted',
                  palette === p.id && 'bg-muted'
                )}
              >
                <span
                  className="h-4 w-4 rounded-full ring-1 ring-border"
                  style={{ backgroundImage: p.swatch }}
                />
                <span className="flex-1 text-left">{p.label}</span>
                {palette === p.id && <Check className="size-4 text-accent" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <Button variant="ghost" size="icon" aria-label="Toggle dark mode" onClick={toggleMode}>
        {mode === 'dark' ? <Sun /> : <Moon />}
      </Button>
    </div>
  )
}
