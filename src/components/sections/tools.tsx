'use client'

import * as React from 'react'
import { Calculator, Landmark, TrendingUp, Coins, PiggyBank } from 'lucide-react'
import { EmiCalculator } from '../calculators/emi-calculator'
import { CompoundInterest } from '../calculators/compound-interest'
import { SimpleInterest } from '../calculators/simple-interest'
import { SipCalculator } from '../calculators/sip-calculator'
import { Card, CardContent } from '../ui/card'
import { cn } from '@/lib/utils'

const TABS = [
  { id: 'emi', label: 'Loan EMI', icon: Landmark, node: <EmiCalculator /> },
  {
    id: 'compound',
    label: 'Compound Interest',
    icon: TrendingUp,
    node: <CompoundInterest />,
  },
  {
    id: 'simple',
    label: 'Simple Interest',
    icon: Coins,
    node: <SimpleInterest />,
  },
  { id: 'sip', label: 'SIP', icon: PiggyBank, node: <SipCalculator /> },
]

export function Tools({ hideHeader = false }: { hideHeader?: boolean }) {
  const [active, setActive] = React.useState(TABS[0].id)
  const current = TABS.find((t) => t.id === active)!

  return (
    <section id="tools" className="section">
      <div className="container-tight">
        {!hideHeader && (
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">
              <Calculator className="size-3.5" /> Free financial tools
            </span>
            <h2 className="heading mt-3">Plan smarter with instant calculators</h2>
            <p className="mt-4 text-muted-foreground">
              Everyday finance math — loan EMIs, interest, and investment growth — computed live.
              Built from the same discipline I bring to every deal.
            </p>
          </div>
        )}

        <Card className={cn('mx-auto overflow-hidden', !hideHeader && 'mt-12')}>
          <div className="flex flex-wrap gap-1 border-b border-border bg-muted/50 p-2">
            {TABS.map((t) => {
              const Icon = t.icon
              const isActive = active === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  aria-pressed={isActive}
                  className={`inline-flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors sm:flex-none ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'text-muted-foreground hover:bg-background hover:text-foreground'
                  }`}
                >
                  <Icon className="size-4" />
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              )
            })}
          </div>
          <CardContent className="p-6 md:p-8">{current.node}</CardContent>
        </Card>

        <p className="mx-auto mt-5 max-w-2xl text-center text-xs text-muted-foreground">
          These calculators are for illustration only and do not constitute financial advice. Actual
          figures depend on lender terms, taxes, and market conditions.
        </p>
      </div>
    </section>
  )
}
