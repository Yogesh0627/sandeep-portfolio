import type { Palette } from '@/components/theme-provider'

/**
 * Palette-matched favicon.
 *
 * The mark is a dark tile + accent "trending up" arrow — the same motif as the
 * navbar logo. Because the tile is dark in every palette, it reads correctly on
 * both light and dark browser tab bars, so we key the icon to the PALETTE only,
 * not to light/dark mode.
 *
 * The static /public icons (favicon.ico, PNGs) stay navy: they're the canonical
 * brand mark and the no-JS / Safari fallback.
 *
 * Colours mirror each palette's `--primary` (tile) and `--accent` (arrow).
 */
const FAVICON_COLORS: Record<Palette, { bg: string; mark: string }> = {
  navy: { bg: '#0B2545', mark: '#E3B54B' },
  emerald: { bg: '#0E442E', mark: '#2EC68F' },
  charcoal: { bg: '#141F39', mark: '#4595F7' },
}

export function faviconSvg(palette: Palette): string {
  const { bg, mark } = FAVICON_COLORS[palette]
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${bg}"/><g transform="translate(8 8) scale(2)" fill="none" stroke="${mark}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/></g></svg>`
}

export function faviconDataUri(palette: Palette): string {
  return `data:image/svg+xml,${encodeURIComponent(faviconSvg(palette))}`
}

/**
 * Repoints the existing SVG icon link at a palette-matched data URI.
 *
 * We mutate the link Next already rendered rather than appending a new one, so
 * there's never a duplicate/ambiguous icon. Chromium and Firefox honour this;
 * Safari caches favicons aggressively and will keep the static .ico — which is
 * an acceptable, graceful fallback.
 */
export function applyFavicon(palette: Palette): void {
  if (typeof document === 'undefined') return
  const link = document.querySelector<HTMLLinkElement>('link[rel="icon"][type="image/svg+xml"]')
  if (link) link.href = faviconDataUri(palette)
}
