'use client'

import * as React from 'react'
import { Field } from './field'
import { ResultDonut } from './result-donut'
import { formatINR } from '@/lib/utils'

/**
 * EMI (Equated Monthly Installment) calculator.
 * EMI = P * r * (1+r)^n / ((1+r)^n - 1), r = monthly rate, n = months.
 */
export function EmiCalculator() {
  const [amount, setAmount] = React.useState(800000)
  const [rate, setRate] = React.useState(9.5)
  const [years, setYears] = React.useState(5)

  const { emi, totalInterest, totalPayment } = React.useMemo(() => {
    const n = years * 12
    const r = rate / 12 / 100
    if (r === 0) {
      const e = amount / n
      return { emi: e, totalInterest: 0, totalPayment: amount }
    }
    const pow = Math.pow(1 + r, n)
    const e = (amount * r * pow) / (pow - 1)
    const total = e * n
    return { emi: e, totalInterest: total - amount, totalPayment: total }
  }, [amount, rate, years])

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <Field
          id="emi-amount"
          label="Loan amount"
          prefix="₹"
          value={amount}
          min={50000}
          max={10000000}
          step={10000}
          onChange={setAmount}
        />
        <Field
          id="emi-rate"
          label="Interest rate (p.a.)"
          suffix="%"
          value={rate}
          min={5}
          max={24}
          step={0.1}
          onChange={setRate}
        />
        <Field
          id="emi-years"
          label="Loan tenure"
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
          <p className="text-sm opacity-80">Monthly EMI</p>
          <p className="font-serif text-3xl font-semibold">{formatINR(emi)}</p>
        </div>
        <ResultDonut principal={amount} gain={totalInterest} gainLabel="Total Interest" />
        <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
          <span className="text-muted-foreground">Total payable</span>
          <span className="font-semibold">{formatINR(totalPayment)}</span>
        </div>
      </div>
    </div>
  )
}
