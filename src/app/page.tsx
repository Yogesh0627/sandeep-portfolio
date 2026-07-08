import { Link } from 'next-view-transitions'
import { ArrowRight, Calculator } from 'lucide-react'
import { Hero } from '@/components/sections/hero'
import { Expertise } from '@/components/sections/expertise'
import { Testimonials } from '@/components/sections/testimonials'
import { CtaBand } from '@/components/sections/cta-band'
import { PostCard } from '@/components/post-card'
import { getAllPosts } from '@/lib/blog'

export default function Home() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <>
      <Hero />
      <Expertise />
      <Testimonials />

      {/* Tools teaser */}
      <CtaBand
        title="Free financial calculators"
        description="Estimate your loan EMI, compound and simple interest, and SIP growth — instantly, with live results."
        primary={{ href: '/tools', label: 'Open calculators' }}
        secondary={{ href: '/about', label: 'About Sandeep' }}
      />

      {/* Blog teaser */}
      {posts.length > 0 && (
        <section className="section bg-muted/40">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="eyebrow">
                  <Calculator className="size-3.5" /> Insights
                </span>
                <h2 className="heading mt-3">From the blog</h2>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  Practical, no-jargon guidance on auto finance, EV loans, and getting approved.
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:opacity-80"
              >
                View all articles <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
