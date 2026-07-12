import type { Metadata } from 'next'
import { profile } from './data'

/**
 * Global site config for SEO. Update `url` to your real domain before
 * deploying so canonical links, sitemap, and Open Graph resolve correctly.
 */
export const site = {
  url: 'https://sandeepkumar.example.com',
  name: `${profile.name} — ${profile.title}`,
  shortName: profile.name,
  description:
    'Sandeep Kumar is an auto & vehicle finance specialist with 15+ years across leading banks (Axis, ICICI, Kotak) and dealerships (Maruti Suzuki, Hyundai). Loan origination, dealer channel management, credit & risk, and EV finance — plus free financial calculators.',
  keywords: [
    'Sandeep Kumar',
    'auto finance',
    'vehicle finance',
    'loan origination',
    'car loan specialist',
    'dealer channel management',
    'EV finance',
    'relationship manager',
    'finance manager',
    'Delhi NCR finance professional',
    'EMI calculator',
    'credit and risk',
  ],
  locale: 'en_IN',
} as const

/**
 * Build a COMPLETE openGraph object for a page. Next.js replaces (does not
 * deep-merge) a child segment's openGraph over the parent's, so every page
 * must restate the shared fields (siteName/locale/type) alongside its own.
 */
export function buildOpenGraph(
  overrides: NonNullable<Metadata['openGraph']>
): Metadata['openGraph'] {
  return {
    type: 'website',
    locale: site.locale,
    siteName: site.shortName,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 582,
        alt: `${profile.name} — ${profile.title}`,
      },
    ],
    ...overrides,
  }
}
