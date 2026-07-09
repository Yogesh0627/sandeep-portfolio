import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { ViewTransitions } from 'next-view-transitions'
import './globals.css'
import { ThemeProvider, themeInitScript } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/sections/footer'
import { Toaster } from '@/components/toaster'
import { site } from '@/lib/site'
import { profile, experiences, skills, education, testimonials } from '@/lib/data'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${profile.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: profile.name }],
  creator: profile.name,
  // Home canonical only; child pages set their own (avoids every page
  // inheriting "/" and looking like a duplicate of the homepage).
  alternates: { canonical: '/' },
  manifest: '/manifest.webmanifest',
  // Icons live in /public and are wired explicitly (Next's app/icon.* file
  // convention can't be used here — see scripts/generate-icons.mjs).
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: ['/favicon.ico'],
  },
  // Note: openGraph/twitter title & description are intentionally omitted here
  // so Next auto-derives them from each page's own title/description.
  openGraph: {
    type: 'profile',
    locale: site.locale,
    url: site.url,
    siteName: profile.name,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  category: 'finance',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1220' },
  ],
}

// Structured data: helps search engines understand who Sandeep is.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  description: profile.summary,
  email: `mailto:${profile.email}`,
  url: site.url,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Delhi NCR',
    addressCountry: 'IN',
  },
  knowsLanguage: profile.languages,
  knowsAbout: skills,
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: education.degree,
  },
  worksFor: {
    '@type': 'Organization',
    name: experiences[0].company,
  },
  hasOccupation: experiences.map((e) => ({
    '@type': 'Occupation',
    name: e.role,
    occupationLocation: { '@type': 'City', name: e.location },
  })),
  // Testimonials as structured data (Review + aggregate) so search engines
  // can associate the endorsements with Sandeep.
  review: testimonials.map((t) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: t.name },
    reviewBody: t.quote,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
    },
  })),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: testimonials.length,
    bestRating: '5',
    worstRating: '1',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
        <head>
          <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
        </head>
        <body className="min-h-screen antialiased">
          <ThemeProvider>
            <Navbar />
            <main className="min-h-[70vh]">{children}</main>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
