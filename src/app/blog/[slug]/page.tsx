import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Link } from 'next-view-transitions'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { mdxComponents } from '@/components/mdx-components'
import { Badge } from '@/components/ui/badge'
import { CtaBand } from '@/components/sections/cta-band'
import { getPostBySlug, getPostSlugs, getAllPosts, formatDate } from '@/lib/blog'
import { site, buildOpenGraph } from '@/lib/site'

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  try {
    const { meta } = getPostBySlug(params.slug)
    return {
      title: meta.title,
      description: meta.excerpt,
      authors: [{ name: meta.author }],
      alternates: { canonical: `/blog/${meta.slug}` },
      openGraph: buildOpenGraph({
        type: 'article',
        title: meta.title,
        description: meta.excerpt,
        publishedTime: meta.date,
        authors: [meta.author],
        tags: meta.tags,
        url: `${site.url}/blog/${meta.slug}`,
      }),
    }
  } catch {
    return {}
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  if (!getPostSlugs().includes(params.slug)) notFound()

  const { meta, content } = getPostBySlug(params.slug)
  const related = getAllPosts()
    .filter((p) => p.slug !== meta.slug)
    .slice(0, 2)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.excerpt,
    datePublished: meta.date,
    author: { '@type': 'Person', name: meta.author },
    keywords: meta.tags.join(', '),
    url: `${site.url}/blog/${meta.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="relative">
        {/* header */}
        <div className="border-b border-border">
          <div className="container-tight pb-10 pt-32 md:pt-36">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft className="size-4" /> Back to blog
            </Link>

            <div className="mt-6 flex flex-wrap gap-2">
              {meta.tags.map((t) => (
                <Badge key={t} className="border-accent/20 bg-accent/5 text-accent">
                  {t}
                </Badge>
              ))}
            </div>

            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              {meta.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <User className="size-4 text-accent" /> {meta.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4 text-accent" /> {formatDate(meta.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4 text-accent" /> {meta.readingTime}
              </span>
            </div>
          </div>
        </div>

        {/* body */}
        <div className="container-tight max-w-3xl py-14">
          <div className="text-[1.05rem]">
            <MDXRemote source={content} components={mdxComponents} />
          </div>
        </div>
      </article>

      {/* related */}
      {related.length > 0 && (
        <section className="section border-t border-border bg-muted/40">
          <div className="container-tight">
            <h2 className="heading text-2xl">Keep reading</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-lg border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
                >
                  <p className="text-xs text-muted-foreground">
                    {formatDate(post.date)} · {post.readingTime}
                  </p>
                  <h3 className="mt-2 font-serif text-lg font-semibold transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Have a finance question?"
        description="Whether it's a loan offer to review or a career conversation, I'm happy to help."
        primary={{ href: '/contact', label: 'Get in touch' }}
        secondary={{ href: '/tools', label: 'Use the calculators' }}
      />
    </>
  )
}
