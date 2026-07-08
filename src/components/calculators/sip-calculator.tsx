'use client'

import * as React from 'react'
import { Field } from './field'
import { ResultDonut } from './result-donut'
import { formatINR } from '@/lib/utils'

/**
 * SIP future value (annuity-due, contributions at start of month):
 * FV = P · [ ((1+i)^n − 1) / i ] · (1+i), i = monthly rate, n = months.
 */
export function SipCalculator() {
  const [monthly, setMonthly] = React.useState(10000)
  const [rate, setRate] = React.useState(12)
  const [years, setYears] = React.useState(10)

  const { invested, value, returns } = React.useMemo(() => {
    const n = years * 12
    const i = rate / 100 / 12
    const inv = monthly * n
    const fv = i === 0 ? inv : monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i)
    return { invested: inv, value: fv, returns: fv - inv }
  }, [monthly, rate, years])

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <Field
          id="sip-monthly"
          label="Monthly investment"
          prefix="₹"
          value={monthly}
          min={500}
          max={200000}
          step={500}
          onChange={setMonthly}
        />
        <Field
          id="sip-rate"
          label="Expected return (p.a.)"
          suffix="%"
          value={rate}
          min={1}
          max={25}
          step={0.5}
          onChange={setRate}
        />
        <Field
          id="sip-years"
          label="Investment period"
          suffix="yr"
          value={years}
          min={1}
          max={40}
          step={1}
          onChange={setYears}
        />
      </div>

      <div className="space-y-5 rounded-lg border border-border bg-muted/30 p-5">
        <div className="rounded-lg bg-primary p-5 text-primary-foreground">
          <p className="text-sm opacity-80">Projected value</p>
          <p className="font-serif text-3xl font-semibold">{formatINR(value)}</p>
        </div>
        <ResultDonut principal={invested} gain={returns} gainLabel="Est. Returns" />
      </div>
    </div>
  )
}
