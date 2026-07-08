import type { Metadata } from 'next'
import { Newspaper } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { PostCard } from '@/components/post-card'
import { getAllPosts } from '@/lib/blog'
import { buildOpenGraph } from '@/lib/site'

const description =
  'Practical insights on auto finance, EV loans, EMIs, and getting your loan approved — written by finance specialist Sandeep Kumar.'

export const metadata: Metadata = {
  title: 'Blog',
  description,
  alternates: { canonical: '/blog' },
  openGraph: buildOpenGraph({
    url: '/blog',
    title: 'The Finance Blog',
    description,
  }),
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        icon={<Newspaper className="size-3.5" />}
        title="The Finance Blog"
        description="Clear, practical guidance on vehicle finance, EV loans, and credit — drawn from 15+ years in the field."
      />

      <section className="section">
        <div className="container">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground">No articles yet — check back soon.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
