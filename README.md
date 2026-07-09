# Sandeep Kumar — Finance Portfolio

A professional, SEO-optimized, multi-page portfolio for **Sandeep Kumar**, an
auto & vehicle finance specialist. Built with **Next.js 14 (App Router)**,
**TypeScript**, and **Tailwind CSS**, featuring a fully-themeable design system,
finance calculators, an MDX blog, and testimonials.

---

## Table of contents

- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Pages & routes](#pages--routes)
- [Editing content](#editing-content)
- [Theming system](#theming-system)
- [Finance calculators](#finance-calculators)
- [Blog (MDX)](#blog-mdx)
- [Testimonials](#testimonials)
- [Résumé / CV download](#résumé--cv-download)
- [Contact form & email](#contact-form--email)
- [SEO](#seo)
- [Code style (Prettier)](#code-style-prettier)
- [Deployment](#deployment)
- [Known notes & follow-ups](#known-notes--follow-ups)

---

## Tech stack

| Concern          | Choice                                                   |
| ---------------- | -------------------------------------------------------- |
| Framework        | Next.js 14 (App Router, React 18, TypeScript)            |
| Styling          | Tailwind CSS 3 with CSS-variable design tokens           |
| UI components    | Hand-built shadcn-style components (`src/components/ui`) |
| Icons            | `lucide-react`                                           |
| Page transitions | `next-view-transitions` (View Transitions API)           |
| Toasts           | `sonner`                                                 |
| Blog             | `next-mdx-remote` + `gray-matter`                        |
| Class utilities  | `clsx`, `tailwind-merge`, `class-variance-authority`     |
| Formatting       | Prettier + `prettier-plugin-tailwindcss`                 |

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

---

## Scripts

| Script                 | What it does                                             |
| ---------------------- | -------------------------------------------------------- |
| `npm run dev`          | Start the dev server with hot reload                     |
| `npm run build`        | Production build (static-generates all pages + posts)    |
| `npm start`            | Serve the production build                               |
| `npm run lint`         | Run Next.js / ESLint                                     |
| `npm run format`       | Format all files with Prettier (+ sort Tailwind classes) |
| `npm run format:check` | Verify formatting without writing (use in CI)            |
| `npm run icons`        | Regenerate the favicon/PWA icon set from `favicon.svg`   |

---

## Project structure

```
sandeep-portfolio/
├─ content/
│  └─ blog/                     # MDX blog posts (frontmatter + body)
├─ public/
│  └─ Sandeep-Kumar-CV.pdf      # downloadable résumé
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx             # root layout: fonts, theme, nav, footer, JSON-LD
│  │  ├─ page.tsx               # Home
│  │  ├─ about/page.tsx
│  │  ├─ tools/page.tsx
│  │  ├─ contact/page.tsx
│  │  ├─ blog/page.tsx          # blog index
│  │  ├─ blog/[slug]/page.tsx   # blog post (MDX)
│  │  ├─ globals.css            # theme tokens + component utilities
│  │  ├─ robots.txt/route.ts    # SEO (route handlers, not file conventions*)
│  │  ├─ sitemap.xml/route.ts
│  │  └─ manifest.webmanifest/route.ts
│  ├─ components/
│  │  ├─ ui/                    # shadcn-style primitives (button, card, …)
│  │  ├─ calculators/           # finance calculator widgets
│  │  ├─ sections/              # page sections (hero, about, testimonials, …)
│  │  ├─ navbar.tsx
│  │  ├─ theme-provider.tsx     # theme state + persistence
│  │  ├─ theme-controls.tsx     # palette + dark-mode switcher
│  │  ├─ mdx-components.tsx     # themed MDX element mapping
│  │  └─ …
│  └─ lib/
│     ├─ data.ts                # ← ALL résumé/site content lives here
│     ├─ site.ts                # SEO config (domain, keywords, OG helper)
│     ├─ blog.ts                # MDX reading/parsing helpers
│     └─ utils.ts               # cn(), INR/number formatters
├─ prettier.config.mjs
├─ tailwind.config.ts
└─ next.config.mjs
```

\*The SEO routes are implemented as **route handlers** instead of Next's
`sitemap.ts`/`robots.ts`/`manifest.ts` file conventions, because the apostrophe
in this project's folder path (`referencePRD's`) breaks Next's metadata-file
loader. The route handlers produce identical output and are unaffected.

---

## Pages & routes

| Route          | Description                                                   |
| -------------- | ------------------------------------------------------------- |
| `/`            | Home — hero, expertise, testimonials, tools & blog teasers    |
| `/about`       | About — summary, expertise, experience timeline, testimonials |
| `/tools`       | Financial calculators                                         |
| `/blog`        | Blog index (cards)                                            |
| `/blog/[slug]` | Individual MDX article                                        |
| `/contact`     | Contact form                                                  |

The **navbar** and **footer** live in the root layout, so they persist across
navigations, and route changes animate via `next-view-transitions`.

---

## Editing content

**Almost everything is data-driven — you rarely touch components.**

`src/lib/data.ts` is the single source of truth for:

- `profile` — name, title, tagline, email, location, summary
- `experiences` — the career timeline
- `skills`, `stats`, `education`, `expertiseAreas`
- `testimonials` — endorsements (name, role, quote)
- `resume` — the CV download path
- `developer` — the "Developed by" footer credit

`src/lib/site.ts` holds SEO config — **update `site.url` to the real domain
before deploying.**

---

## Theming system

The design is driven entirely by **CSS custom properties** in
`src/app/globals.css`. Two independent axes:

- **Mode** — light / dark, toggled by the `.dark` class on `<html>`.
- **Palette** — `navy` (Navy & Gold), `emerald`, or `charcoal` (Electric Blue),
  set by the `data-palette` attribute on `<html>`.

That's **6 combinations**, and each defines a _full_ token set (background,
card, muted, border, primary, accent, …) so the entire surface is tinted — not
just the accent.

**Persistence & no-flash:** `theme-provider.tsx` saves the choice to
`localStorage` (`sk-mode`, `sk-palette`), and an inline script in the `<head>`
applies it before first paint so there's no flash on refresh. Users switch
themes via the palette/dark-mode controls in the navbar.

To add or retune a palette, edit the token blocks in `globals.css` — that file
documents the token contract at the top.

---

## Finance calculators

Found on `/tools` (and teased on the home page). All compute live with sliders
and Indian-Rupee formatting:

- **Loan EMI** — `src/components/calculators/emi-calculator.tsx`
- **Compound Interest** — with selectable compounding frequency
- **Simple Interest**
- **SIP** (monthly investment future value)

Each shares the `Field` (slider + input) and `ResultDonut` primitives. The donut
uses a neutral "principal" arc vs. an accent "gain" arc so the split reads
clearly in every palette.

---

## Blog (MDX)

Posts are `.mdx` files in `content/blog/`, each with frontmatter:

```mdx
---
title: 'Understanding Your Car Loan EMI'
excerpt: 'A short summary used on cards and for SEO.'
date: '2025-06-20' # ISO, drives sort order + sitemap lastmod
author: 'Sandeep Kumar'
tags: ['Auto Loans', 'EMI']
---

Your markdown / MDX content…
```

**To add a post:** drop a new `.mdx` file in `content/blog/`. It's automatically
picked up, statically generated, listed on `/blog`, teased on the home page, and
added to the sitemap — no code changes.

MDX elements are rendered through a themed component map
(`src/components/mdx-components.tsx`), so posts match the active palette and
dark mode. Reading time is computed automatically.

---

## Testimonials

Managed in `data.ts` (`testimonials`) and shown as an auto-scrolling, edge-masked
**marquee** on the home and about pages, with an aggregate 5-star rating badge.
The marquee pauses on hover/focus and degrades to a manual horizontal scroll
under `prefers-reduced-motion`. Endorsements are also emitted as `Review` +
`AggregateRating` structured data (see [SEO](#seo)).

---

## Résumé / CV download

The CV lives at `public/Sandeep-Kumar-CV.pdf` and is served at
`/Sandeep-Kumar-CV.pdf`. **Download CV** buttons appear in the hero and the
about-page header. To update it, replace that file (keep the name, or update
`resume.path` in `data.ts`).

---

## Contact form & email

> **Important:** there is currently **no server-side mail sender**. The contact
> form uses a `mailto:` link — on submit it opens the visitor's own email app
> with a pre-filled message to Sandeep, validates the fields client-side, and
> shows `sonner` toasts. Nothing is sent or stored server-side.

This needs zero backend/secrets and works on a static deploy, but it depends on
the visitor having an email client and gives no record of inquiries.

**To capture submissions**, wire one of:

- **Formspree** (recommended, simplest) — free, no API key. Create a form, point
  the contact form at its public endpoint URL.
- **Resend** — email-sending API; needs a secret API key (env var) + a small API
  route. Sending to arbitrary addresses requires domain verification.

The form logic lives in `src/components/sections/contact.tsx`.

---

## SEO

- **Metadata** — per-page `title`/`description`, keywords, `metadataBase`.
- **Canonicals** — every page sets its own canonical (no duplicate-of-home bug).
- **Open Graph / Twitter** — complete per page via the `buildOpenGraph()` helper
  in `site.ts` (restates shared fields since Next replaces, not merges, `openGraph`).
- **Structured data (JSON-LD)**:
  - `Person` (site-wide) — role, skills, education, occupations
  - `Review` + `AggregateRating` — the testimonials
  - `BlogPosting` — each article
- **`sitemap.xml`** — all pages + every blog post (dynamic)
- **`robots.txt`** and a **web manifest**

> Before deploying, set `site.url` in `src/lib/site.ts` so canonicals, OG URLs,
> and the sitemap resolve to the real domain.

**Not yet added (optional):** an Open Graph share image.

### Favicon & app icons

The brand mark (navy tile + gold "trending up" arrow) lives at
`public/favicon.svg`. Everything else is generated from it:

```bash
npm run icons
```

That produces `favicon.ico` (16/32/48), `favicon-16x16.png`,
`favicon-32x32.png`, `apple-touch-icon.png` (180), and `icon-192.png` /
`icon-512.png` for the PWA manifest. They're wired via `metadata.icons` in
`layout.tsx` and the manifest route.

**To change the logo:** edit `public/favicon.svg`, then re-run `npm run icons`.

**Palette-matched favicon:** `src/lib/favicon.ts` rebuilds the mark as an inline
SVG data URI in each palette's colours (tile = `--primary`, arrow = `--accent`)
and repoints the SVG icon link whenever the palette changes. Since the palette
is persisted in `localStorage`, it restores on reload.

The tile is dark in every palette, so it reads on both light and dark tab bars —
the icon is keyed to the **palette**, not to light/dark mode. Chromium and
Firefox honour the swap; Safari caches favicons and keeps the static
`favicon.ico`, which is a deliberate, graceful fallback (as is the no-JS case).

---

## Code style (Prettier)

Formatting is enforced by Prettier with the Tailwind plugin, configured in
`prettier.config.mjs`:

- Consistent base style (double quotes, semicolons, 2-space, 80 cols).
- **Tailwind class sorting** — utility classes are sorted into Tailwind's
  recommended order on every format, including classes inside `cn()` and `cva()`
  (`tailwindFunctions`).

```bash
npm run format        # format everything
npm run format:check  # verify (CI-friendly)
```

`.prettierignore` excludes build output, lockfiles, and static assets.

---

## Deployment

Recommended: **Vercel**.

1. Set `site.url` in `src/lib/site.ts` to your real domain.
2. Push the repo to GitHub and import it into Vercel (zero config for Next.js),
   **or** run `vercel` from the CLI.
3. Add your custom domain in the Vercel dashboard.

The app is fully static-generated (`npm run build` prerenders all routes), so it
also deploys to any static-capable host.

---

## Known notes & follow-ups

- **Contact email** is `mailto:`-based — wire Formspree/Resend to actually
  capture submissions.
- **`site.url`** is a placeholder — set the real domain before launch.
- **Optional polish:** OG share image, a real photo (currently an initials
  avatar), analytics.
- **Security audit:** two low-severity transitive advisories remain that only
  resolve by jumping to Next 16 (a breaking major); left as-is for stability.

---

Content is presented for professional representation. The calculators are for
illustration only and are not financial advice.

_Developed by [Yogesh Chauhan](https://yogeshchauhan.dev)._
