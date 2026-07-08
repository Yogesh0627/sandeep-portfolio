'use client'

import { formatINR } from '@/lib/utils'

interface ResultDonutProps {
  principal: number
  gain: number // interest or returns
  gainLabel: string // "Total Interest" | "Est. Returns"
}

/** Principal vs gain donut with a legend — pure SVG, theme-aware. */
export function ResultDonut({ principal, gain, gainLabel }: ResultDonutProps) {
  const total = principal + gain
  const gainPct = total > 0 ? (gain / total) * 100 : 0
  const r = 60
  const c = 2 * Math.PI * r
  const gainDash = (gainPct / 100) * c

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-7">
      <div className="relative shrink-0">
        <svg width="150" height="150" viewBox="0 0 150 150" className="-rotate-90">
          <circle
            cx="75"
            cy="75"
            r={r}
            fill="none"
            stroke="hsl(var(--muted-foreground) / 0.55)"
            strokeWidth="18"
          />
          <circle
            cx="75"
            cy="75"
            r={r}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="18"
            strokeDasharray={`${gainDash} ${c - gainDash}`}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-muted-foreground">Total</span>
          <span className="font-serif text-lg font-semibold">{formatINR(total)}</span>
        </div>
      </div>

      <div className="w-full space-y-3">
        <LegendRow
          color="hsl(var(--muted-foreground) / 0.55)"
          label="Principal"
          value={principal}
        />
        <LegendRow color="hsl(var(--accent))" label={gainLabel} value={gain} />
      </div>
    </div>
  )
}

function LegendRow({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border bg-muted/40 px-3 py-2">
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="h-3 w-3 rounded-full" style={{ background: color }} />
        {label}
      </span>
      <span className="font-semibold">{formatINR(value)}</span>
    </div>
  )
}
