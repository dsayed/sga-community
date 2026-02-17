# SGA Community — Architecture

**Live:** https://sgacommunity.vercel.app
**Repo:** `app/` directory contains the Next.js project

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, React Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@theme inline` for design tokens) |
| Database | Supabase (Postgres) |
| Auth | Supabase Auth (email/password, invite-only) |
| Storage | Supabase Storage (forum-images, training-images buckets) |
| Hosting | Vercel |
| Fonts | DM Sans (body), Fraunces (headings) |

**Monthly cost:** ~$35 (Supabase free tier + Vercel free tier)

## Project Structure

```
app/src/
  app/
    (auth)/              # Login page (no nav shell)
    (app)/               # Authenticated app shell
      page.tsx           # Home
      forums/            # Forum feed + post detail
      training/          # Module list + step-through viewer
      library/           # Search + browse resources
      admin/             # Training authoring + member progress
    api/                 # API routes (forums, training, upload)
    layout.tsx           # Root layout (fonts, viewport, PWA manifest)
    globals.css          # Design tokens + base styles
  components/
    layout/              # TopBar, TabBar (mobile), Sidebar (desktop)
    home/                # Hero, QuickActions, UrgentBanner
    forums/              # PostCard, PostComposer, CommentThread, etc.
    training/            # ModuleCard, StepViewer, ProgressBar
    library/             # ResourceCard, SearchBar, CategoryChips
    admin/               # ModuleEditor, StepEditor
  lib/
    supabase/            # Browser + server Supabase clients
    types.ts             # TypeScript types matching DB schema
  middleware.ts          # Auth session refresh + redirect
```

## Database Tables

- **profiles** — extends Supabase auth.users (name, role, location)
- **forum_categories** — Urgent Needs, Community Chat, Ask an Expert, Events
- **forum_posts** — text + optional images, belongs to category + author
- **forum_comments** — threaded under posts
- **forum_reactions** — heart reactions on posts
- **training_modules** — ordered list of training modules
- **training_steps** — step-through content (title, body, optional image)
- **training_progress** — per-user completion tracking
- **library_resources** — articles, videos, external links with full-text search

## Key Patterns

**Auth:** Middleware refreshes Supabase session on every request. Unauthenticated users redirect to `/login`. Admin pages check `profiles.role` for staff/admin.

**PostgREST joins:** When joining profiles through foreign keys, use explicit FK hints to avoid ambiguous relationship errors:
```ts
.select("*, author:profiles!forum_posts_author_id_fkey(*)")
```

**Navigation:** Mobile uses bottom TabBar + TopBar. Desktop (md+) uses left Sidebar. Controlled via Tailwind `md:hidden` / `hidden md:flex`.

**Design tokens:** Defined in `globals.css` using CSS custom properties + `@theme inline` for Tailwind integration. Key colors: `--sga-orange` (#E8772B), `--sga-blue` (#2B3990), `--sga-warm-white` (#FBF8F4).

## Images

Real SGA photography in `public/images/`:
- `sga-logo.png` — official logo
- `hero-dog.jpg` — home hero background
- `foster-dogs.jpg`, `available-dogs.jpg`, `volunteer.jpg`, `adoption.jpg` — used in training cards, empty states

## What's Not Built Yet

- **Directory** — member lookup by role/location (Phase 2)
- **Push notifications** — requires service worker setup
- **Direct messaging** — forums serve this purpose for now
