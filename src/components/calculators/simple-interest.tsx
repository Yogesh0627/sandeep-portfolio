'use client'

import * as React from 'react'
import { Field } from './field'
import { ResultDonut } from './result-donut'
import { formatINR } from '@/lib/utils'

/** Simple interest: SI = P·R·T / 100. */
export function SimpleInterest() {
  const [principal, setPrincipal] = React.useState(100000)
  const [rate, setRate] = React.useState(7)
  const [years, setYears] = React.useState(5)

  const { interest, total } = React.useMemo(() => {
    const si = (principal * rate * years) / 100
    return { interest: si, total: principal + si }
  }, [principal, rate, years])

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <Field
          id="si-principal"
          label="Principal amount"
          prefix="₹"
          value={principal}
          min={1000}
          max={10000000}
          step={1000}
          onChange={setPrincipal}
        />
        <Field
          id="si-rate"
          label="Interest rate (p.a.)"
          suffix="%"
          value={rate}
          min={1}
          max={20}
          step={0.1}
          onChange={setRate}
        />
        <Field
          id="si-years"
          label="Time period"
          suffix="yr"
          value={years}
          min={1}
          max={30}
          step={1}
          onChange={setYears}
        />
      </div>

      <div className="space-y-5 rounded-lg border border-border bg-muted/30 p-5">
        <div className="rounded-lg bg-primary p-5 text-primary-foreground">
          <p className="text-sm opacity-80">Total amount</p>
          <p className="font-serif text-3xl font-semibold">{formatINR(total)}</p>
        </div>
        <ResultDonut principal={principal} gain={interest} gainLabel="Total Interest" />
      </div>
    </div>
  )
}
