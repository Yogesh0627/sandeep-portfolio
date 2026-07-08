import { site } from '@/lib/site'
import { getAllPosts } from '@/lib/blog'

// Plain route handler (avoids Next's metadata-file loader, which breaks on the
// apostrophe in this project's folder path). Lists every indexable route.
export const dynamic = 'force-static'

type Entry = {
  path: string
  lastmod: string
  changefreq: string
  priority: string
}

export function GET() {
  const staticPages: Entry[] = [
    {
      path: '/',
      lastmod: '2025-07-08',
      changefreq: 'monthly',
      priority: '1.0',
    },
    {
      path: '/about',
      lastmod: '2025-07-08',
      changefreq: 'monthly',
      priority: '0.9',
    },
    {
      path: '/tools',
      lastmod: '2025-07-08',
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      path: '/blog',
      lastmod: '2025-07-08',
      changefreq: 'weekly',
      priority: '0.8',
    },
    {
      path: '/contact',
      lastmod: '2025-07-08',
      changefreq: 'yearly',
      priority: '0.5',
    },
  ]

  const postPages: Entry[] = getAllPosts().map((post) => ({
    path: `/blog/${post.slug}`,
    lastmod: post.date,
    changefreq: 'monthly',
    priority: '0.7',
  }))

  const entries = [...staticPages, ...postPages]
    .map(
      (e) => `  <url>
    <loc>${site.url}${e.path === '/' ? '' : e.path}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
    )
    .join('\n')

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
