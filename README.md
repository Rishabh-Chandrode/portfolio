# Portfolio

Personal portfolio of Rishabh Chandrode — Next.js (App Router), TypeScript, Tailwind CSS.

All site content (profile, experience, projects, skills, education) lives in [`content/portfolio.json`](content/portfolio.json) and is editable from a built-in admin panel at `/admin` — no redeploy needed to update copy.

## Getting started

```bash
pnpm install
cp .env.example .env   # fill in the values
pnpm dev
```

Open http://localhost:3000.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `ADMIN_PASSWORD` | for `/admin` | Password for the admin panel |
| `ADMIN_SESSION_SECRET` | no | Secret for signing admin session cookies (defaults to `ADMIN_PASSWORD`) |
| `RESEND_API_KEY` | for contact form | Sends contact-form messages via [Resend](https://resend.com) |

## Admin panel

`/admin` is protected by `ADMIN_PASSWORD` (HMAC-signed, httpOnly session cookie, 7-day expiry). It edits `content/portfolio.json` through `PUT /api/admin/content`, which validates the payload, writes the file atomically, and revalidates the home page.

> **Note on hosting:** content edits write to the local filesystem. That works on a VPS / container with a persistent volume. On serverless hosts with read-only or ephemeral filesystems (e.g. Vercel), edit `content/portfolio.json` in the repo instead, or swap `src/lib/content.ts` for a hosted store (KV, S3, a database) — it's the only file that touches storage.

## Project structure

```
content/portfolio.json     # single source of truth for site content
src/lib/content.ts         # content types, validation, read/write
src/lib/auth.ts            # admin session auth
src/app/page.tsx           # public site
src/app/admin/             # admin panel (login + editor)
src/app/api/admin/         # auth + content endpoints
src/app/api/send/          # contact form (Resend)
src/components/site/       # public site sections
src/components/admin/      # admin editor UI
```
