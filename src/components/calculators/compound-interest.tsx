'use client'

import * as React from 'react'
import { Field } from './field'
import { ResultDonut } from './result-donut'
import { formatINR } from '@/lib/utils'
import { Label } from '../ui/label'

const FREQS = [
  { label: 'Yearly', value: 1 },
  { label: 'Half-yearly', value: 2 },
  { label: 'Quarterly', value: 4 },
  { label: 'Monthly', value: 12 },
]

/** Compound interest: A = P(1 + r/n)^(n·t). */
export function CompoundInterest() {
  const [principal, setPrincipal] = React.useState(100000)
  const [rate, setRate] = React.useState(8)
  const [years, setYears] = React.useState(10)
  const [freq, setFreq] = React.useState(4)

  const { amount, interest } = React.useMemo(() => {
    const a = principal * Math.pow(1 + rate / 100 / freq, freq * years)
    return { amount: a, interest: a - principal }
  }, [principal, rate, years, freq])

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <Field
          id="ci-principal"
          label="Principal amount"
          prefix="₹"
          value={principal}
          min={1000}
          max={10000000}
          step={1000}
          onChange={setPrincipal}
        />
        <Field
          id="ci-rate"
          label="Interest rate (p.a.)"
          suffix="%"
          value={rate}
          min={1}
          max={20}
          step={0.1}
          onChange={setRate}
        />
        <Field
          id="ci-years"
          label="Time period"
          suffix="yr"
          value={years}
          min={1}
          max={30}
          step={1}
          onChange={setYears}
        />
        <div className="space-y-2.5">
          <Label>Compounding frequency</Label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {FREQS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFreq(f.value)}
                className={`rounded-md border px-2 py-2 text-xs font-medium transition-colors ${
                  freq === f.value
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border text-muted-foreground hover:bg-muted'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5 rounded-lg border border-border bg-muted/30 p-5">
        <div className="rounded-lg bg-primary p-5 text-primary-foreground">
          <p className="text-sm opacity-80">Maturity value</p>
          <p className="font-serif text-3xl font-semibold">{formatINR(amount)}</p>
        </div>
        <ResultDonut principal={principal} gain={interest} gainLabel="Total Interest" />
      </div>
    </div>
  )
}
