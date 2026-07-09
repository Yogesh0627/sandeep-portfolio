/**
 * Rasterizes public/favicon.svg into the PNG/ICO icon set.
 *
 * Run with:  npm run icons
 *
 * We keep icons in /public (rather than Next's app/icon.* file convention)
 * because the apostrophe in this project's folder path breaks Next's
 * metadata-image loader. They're wired up explicitly via `metadata.icons`
 * in src/app/layout.tsx and the web manifest route.
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const PUBLIC_DIR = path.join(process.cwd(), 'public')
const SOURCE = path.join(PUBLIC_DIR, 'favicon.svg')

/** PNGs to emit: [filename, size] */
const PNGS = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['apple-touch-icon.png', 180], // iOS home screen
  ['icon-192.png', 192], // PWA manifest
  ['icon-512.png', 512], // PWA manifest / splash
]

/** Sizes packed into favicon.ico for legacy browsers. */
const ICO_SIZES = [16, 32, 48]

async function render(svg, size) {
  return sharp(svg, { density: 512 }).resize(size, size, { fit: 'contain' }).png().toBuffer()
}

async function main() {
  const svg = await readFile(SOURCE)

  for (const [name, size] of PNGS) {
    const buf = await render(svg, size)
    await writeFile(path.join(PUBLIC_DIR, name), buf)
    console.log(`✓ ${name} (${size}×${size})`)
  }

  const icoBuffers = await Promise.all(ICO_SIZES.map((s) => render(svg, s)))
  const ico = await pngToIco(icoBuffers)
  await writeFile(path.join(PUBLIC_DIR, 'favicon.ico'), ico)
  console.log(`✓ favicon.ico (${ICO_SIZES.join(', ')})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
