import type { Metadata } from 'next'
import { Mail } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Contact } from '@/components/sections/contact'
import { buildOpenGraph } from '@/lib/site'

const description =
  'Get in touch with Sandeep Kumar — finance leadership roles, dealer partnerships, or a quick question. Send a message via the contact form.'

export const metadata: Metadata = {
  title: 'Contact',
  description,
  alternates: { canonical: '/contact' },
  openGraph: buildOpenGraph({ url: '/contact', title: 'Contact', description }),
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        icon={<Mail className="size-3.5" />}
        title="Let's connect"
        description="Have an opportunity, a partnership, or a question? I'd love to hear from you."
      />
      <Contact />
    </>
  )
}
