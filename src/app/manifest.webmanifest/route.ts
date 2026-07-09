import { site } from '@/lib/site'
import { profile } from '@/lib/data'

export const dynamic = 'force-static'

export function GET() {
  const manifest = {
    name: site.name,
    short_name: profile.name,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0B2545',
    theme_color: '#0B2545',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
  return new Response(JSON.stringify(manifest), {
    headers: { 'Content-Type': 'application/manifest+json' },
  })
}
