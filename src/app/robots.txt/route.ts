import { site } from '@/lib/site'

// Plain route handler (avoids Next's metadata-file loader, which breaks on
// paths containing an apostrophe — as in this project's folder name).
export const dynamic = 'force-static'

export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
