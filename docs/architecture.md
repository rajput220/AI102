# AI Onboarded Architecture (v1)

## Product Scope
AI Onboarded (`aionboarded.ai`) is a content-driven publication platform with four primary streams: podcast episodes, newsletters, AI news updates, and long-form blog posts. The system includes public consumption surfaces and a secure editorial workflow.

## Core Tech Choices
- **Frontend/Web**: Next.js (App Router) + TypeScript + Tailwind CSS.
- **CMS**: **Payload CMS (self-hosted)** for content modeling, media, RBAC, and draft/publish.
- **Database**: PostgreSQL (shared by Payload and app-side indexed/search data).
- **Email subscriptions**: **Resend** (transactional + newsletter opt-in workflows).
- **Search**: Postgres full-text search (initial), optional Meilisearch/Algolia later.
- **Testing/Quality**: ESLint, Prettier, Vitest + Testing Library, Playwright (later PR).
- **Operations**: Docker Compose for local dev; GitHub Actions for CI.

## Route Map (App Router)
- `/` Home (latest from all sections + subscribe CTA)
- `/podcast` + `/podcast/[slug]`
- `/newsletter` + `/newsletter/[slug]`
- `/news` + `/news/[slug]`
- `/blog` + `/blog/[slug]`
- `/search?q=`
- `/about`, `/contact`
- `/rss.xml` (combined or blog/podcast variants)
- `/sitemap.xml`, `/robots.txt`

## Data Model (Payload Collections)
- `authors`: name, slug, bio, avatar, social links
- `tags`: name, slug, type
- `pages`: title, slug, body, seo
- `podcastEpisodes`: title, slug, summary, publishDate, audioUrl, showNotes, transcript, tags, seo, status
- `newsletterIssues`: title, slug, issueNumber, publishDate, summary, body, cta, tags, seo, status
- `newsItems`: title, slug, summary, body, sourceUrl, sourceName, publishDate, tags, seo, status
- `blogPosts`: title, slug, excerpt, body, coverImage, author, categories/tags, publishDate, seo, status
- `media`: Payload upload collection for images/audio assets
- `subscribers` (optional collection for local tracking + Resend sync metadata)

Shared fields: `slug`, `status` (`draft|published`), `publishedAt`, `seo` (meta title/description/OG image), and audit timestamps.

## Security & Compliance Baseline
- RBAC roles: `admin`, `editor` (least privilege).
- HTTP security headers via Next config/middleware.
- Input validation (Zod) on contact/subscribe/search APIs.
- Rate limiting for forms/auth endpoints.
- Sanitize rich content output and enforce CSP-safe rendering.
- Strict env handling (`.env.example`, server-only secrets, startup validation).

## SEO / Discovery
- Per-route metadata API.
- OpenGraph + Twitter card support.
- JSON-LD structured data (Article, PodcastEpisode, Organization).
- XML sitemap + robots policy.
- RSS feeds (blog and podcast at minimum).

## Deployment Plan
### Hostinger (primary)
1. Provision Hostinger Node.js Web App + managed PostgreSQL.
2. Build artifact on CI (`next build`) and deploy via Git or SSH pipeline.
3. Run Payload CMS and Next app as separate Node services (or monorepo process manager).
4. Configure environment variables in Hostinger panel.
5. Add reverse proxy routing (`/admin` to Payload, site routes to Next if split).
6. Enable TLS and domain (`aionboarded.ai`).

### Alternative: Vercel
- Deploy Next app on Vercel.
- Host Payload separately (Railway/Fly/Render) with Postgres.
- Connect via secure API URL and webhooks for revalidation.

## PR Plan
1. **PR1**: Scaffold & tooling (Next/Tailwind/TS, lint/tests, Docker Compose, env template, CI)
2. **PR2**: Payload CMS setup, collections/schema, DB integration, seed data
3. **PR3**: Public page implementation (home, blog/news/newsletter/podcast)
4. **PR4**: Admin RBAC, draft/publish workflow, media uploads/optimization
5. **PR5**: Search, RSS, SEO outputs
6. **PR6**: Security hardening + performance pass
7. **PR7**: Deployment runbooks (Hostinger + alternative)
