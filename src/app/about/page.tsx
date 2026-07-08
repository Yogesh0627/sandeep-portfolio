import type { Metadata } from 'next'
import { Sparkles, Download } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { About } from '@/components/sections/about'
import { Expertise } from '@/components/sections/expertise'
import { Experience } from '@/components/sections/experience'
import { Testimonials } from '@/components/sections/testimonials'
import { CtaBand } from '@/components/sections/cta-band'
import { Button } from '@/components/ui/button'
import { profile, resume } from '@/lib/data'
import { buildOpenGraph } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description: profile.summary,
  alternates: { canonical: '/about' },
  openGraph: buildOpenGraph({
    type: 'profile',
    url: '/about',
    title: `About | ${profile.name}`,
    description: profile.summary,
  }),
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        icon={<Sparkles className="size-3.5" />}
        title="15+ years in vehicle finance"
        description={profile.tagline}
      >
        <Button asChild size="lg">
          <a href={resume.path} download={resume.downloadName}>
            <Download className="size-4" /> Download CV
          </a>
        </Button>
      </PageHeader>
      <About hideHeader />
      <Expertise />
      <Experience />
      <Testimonials />
      <CtaBand
        title="Let's build something together"
        description="Open to finance leadership roles, dealer partnerships, and advisory conversations."
        primary={{ href: '/contact', label: 'Get in touch' }}
        secondary={{ href: '/tools', label: 'Try the calculators' }}
      />
    </>
  )
}
