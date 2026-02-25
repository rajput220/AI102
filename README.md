# AI Onboarded (aionboarded.ai)

Production-grade web platform for AI podcast episodes, newsletters, curated news, and long-form blog content.

## PR Workflow
This repository is being delivered through planned PR increments:
1. PR1: Scaffold + tooling ✅
2. PR2: Payload CMS + schema + seed
3. PR3: Public content pages
4. PR4: Admin roles + draft/publish + media
5. PR5: Search + RSS + SEO
6. PR6: Security hardening + performance
7. PR7: Deployment runbooks

## Tech Stack
- Next.js App Router + TypeScript + Tailwind CSS
- PostgreSQL
- Payload CMS (PR2)
- Resend (PR4+)

## Local Development
1. Copy environment template:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start app and supporting services:
   ```bash
   docker compose up --build
   ```
4. Open `http://localhost:3000`.

## Scripts
- `npm run dev` - start Next.js dev server
- `npm run lint` - run ESLint
- `npm run test` - run Vitest test suite
- `npm run build` - production build

## Architecture
See `docs/architecture.md` for route map, data model, security controls, and deployment plan.
