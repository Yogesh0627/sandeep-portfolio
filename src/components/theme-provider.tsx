'use client'

import * as React from 'react'
import { applyFavicon } from '@/lib/favicon'

type Mode = 'light' | 'dark'
export type Palette = 'navy' | 'emerald' | 'charcoal'

interface ThemeState {
  mode: Mode
  palette: Palette
  toggleMode: () => void
  setPalette: (p: Palette) => void
}

const ThemeContext = React.createContext<ThemeState | null>(null)

const MODE_KEY = 'sk-mode'
const PALETTE_KEY = 'sk-palette'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<Mode>('light')
  const [palette, setPaletteState] = React.useState<Palette>('navy')

  // Hydrate from localStorage (the inline script has already set the DOM).
  React.useEffect(() => {
    const savedMode = localStorage.getItem(MODE_KEY) as Mode | null
    const savedPalette = localStorage.getItem(PALETTE_KEY) as Palette | null
    if (savedMode) setMode(savedMode)
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setMode('dark')
    if (savedPalette) setPaletteState(savedPalette)
  }, [])

  // Persist + apply on CHANGE only. We skip the first run so the default
  // state (light/navy) never overwrites the saved value or fights the inline
  // init script — that race caused a theme flash on refresh.
  const modeReady = React.useRef(false)
  React.useEffect(() => {
    if (!modeReady.current) {
      modeReady.current = true
      return
    }
    const root = document.documentElement
    root.classList.toggle('dark', mode === 'dark')
    root.style.colorScheme = mode
    localStorage.setItem(MODE_KEY, mode)
  }, [mode])

  const paletteReady = React.useRef(false)
  React.useEffect(() => {
    if (!paletteReady.current) {
      paletteReady.current = true
      // Restored palette from localStorage differs from the default? The
      // hydrate effect will bump `palette` and re-run this. If it matches the
      // default (navy), the static /favicon.svg is already correct.
      return
    }
    document.documentElement.setAttribute('data-palette', palette)
    localStorage.setItem(PALETTE_KEY, palette)
    applyFavicon(palette)
  }, [palette])

  const value = React.useMemo<ThemeState>(
    () => ({
      mode,
      palette,
      toggleMode: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
      setPalette: setPaletteState,
    }),
    [mode, palette]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

/**
 * Inline script (runs before paint) to apply saved theme and avoid FOUC.
 * Injected via <head> in the root layout.
 */
export const themeInitScript = `(function(){try{
  var m=localStorage.getItem('${MODE_KEY}');
  var p=localStorage.getItem('${PALETTE_KEY}')||'navy';
  if(!m){m=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}
  var r=document.documentElement;
  if(m==='dark')r.classList.add('dark');
  r.style.colorScheme=m;
  r.setAttribute('data-palette',p);
}catch(e){}})();`
