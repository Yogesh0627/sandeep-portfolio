import type { Metadata } from 'next'
import { Calculator } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Tools } from '@/components/sections/tools'
import { buildOpenGraph } from '@/lib/site'

const description =
  'Free, instant financial calculators — car loan EMI, compound interest, simple interest, and SIP — with live results and Indian Rupee formatting.'

export const metadata: Metadata = {
  title: 'Financial Calculators',
  description,
  alternates: { canonical: '/tools' },
  keywords: [
    'EMI calculator',
    'car loan EMI calculator',
    'compound interest calculator',
    'simple interest calculator',
    'SIP calculator',
    'India finance calculator',
  ],
  openGraph: buildOpenGraph({
    url: '/tools',
    title: 'Financial Calculators',
    description,
  }),
}

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free financial tools"
        icon={<Calculator className="size-3.5" />}
        title="Financial calculators"
        description="Everyday finance math — loan EMIs, interest, and investment growth — computed live. Built from the same discipline I bring to every deal."
      />
      <Tools hideHeader />
      {/* <p className="container-tight -mt-10 pb-20 text-center text-xs text-muted-foreground">
        These calculators are for illustration only and do not constitute
        financial advice. Actual figures depend on lender terms, taxes, and
        market conditions.
      </p> */}
    </>
  )
}
