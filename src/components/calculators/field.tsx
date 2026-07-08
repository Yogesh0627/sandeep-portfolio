'use client'

import { Slider } from '../ui/slider'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface FieldProps {
  id: string
  label: string
  value: number
  min: number
  max: number
  step?: number
  suffix?: string
  prefix?: string
  onChange: (v: number) => void
}

/** Labeled numeric input paired with a synced accent slider. */
export function Field({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  prefix,
  onChange,
}: FieldProps) {
  const clamp = (v: number) => Math.min(max, Math.max(min, v))
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        <div className="flex items-center rounded-md border border-input bg-background px-2 focus-within:ring-2 focus-within:ring-ring">
          {prefix && <span className="text-sm text-muted-foreground">{prefix}</span>}
          <Input
            id={id}
            type="number"
            value={Number.isNaN(value) ? '' : value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(clamp(Number(e.target.value)))}
            className="h-8 w-24 border-0 bg-transparent px-1 text-right shadow-none focus-visible:ring-0"
          />
          {suffix && <span className="pr-1 text-sm text-muted-foreground">{suffix}</span>}
        </div>
      </div>
      <Slider
        id={`${id}-slider`}
        aria-label={label}
        value={value || min}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      />
    </div>
  )
}
