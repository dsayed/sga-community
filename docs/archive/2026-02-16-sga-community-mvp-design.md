# SGA Community MVP — Technical Design

**Date:** 2026-02-16
**Spec:** [MVP App Spec](2026-02-16-sga-community-app-spec.md)
**Wireframe:** [Interactive prototype](https://dsayed.github.io/sga-community/wireframes/sga-community-app.html)

---

## Approach

**AI-assisted build (vibe coding)** using a PWA stack. Fastest to build, cheapest to run, best search quality, instant deployments, and zero vendor lock-in.

If app store presence is needed later, the same codebase can be wrapped with Capacitor for native iOS/Android apps.

---

## Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | Server components, API routes, SSR |
| Language | TypeScript | Type safety, better AI-assisted development |
| Styling | Tailwind CSS | Utility-first, matches wireframe design system |
| Database | Supabase (Postgres) | Auth + DB + storage + realtime + full-text search |
| Auth | Supabase Auth | Email/password, invite-only |
| File Storage | Supabase Storage | Training images, forum photos |
| Hosting | Vercel | Zero-config Next.js hosting |
| Push Notifications | Web Push API | Urgent Needs posts, replies |

**Monthly cost:** ~$35–60 (Supabase free→$25, Vercel free tier, domain ~$12/yr)

---

## Project Structure

```
sga-community/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Login, invite acceptance
│   │   │   ├── login/page.tsx
│   │   │   └── invite/[token]/page.tsx
│   │   ├── (app)/              # Authenticated app shell
│   │   │   ├── layout.tsx      # Tab bar (mobile) + sidebar (desktop)
│   │   │   ├── page.tsx        # Home screen
│   │   │   ├── forums/
│   │   │   │   ├── page.tsx    # Forum feed
│   │   │   │   └── [postId]/page.tsx
│   │   │   ├── training/
│   │   │   │   ├── page.tsx    # Module list + progress
│   │   │   │   └── [moduleId]/
│   │   │   │       └── [step]/page.tsx
│   │   │   ├── library/
│   │   │   │   └── page.tsx    # Search + browse
│   │   │   └── admin/
│   │   │       ├── training/page.tsx
│   │   │       └── members/page.tsx
│   │   └── api/
│   ├── components/
│   │   ├── ui/                 # Buttons, cards, inputs
│   │   ├── layout/             # TabBar, Sidebar, AppShell
│   │   ├── forums/             # PostCard, CommentThread, PostComposer
│   │   ├── training/           # ModuleCard, StepViewer, ProgressBar
│   │   └── library/            # ResourceCard, SearchBar, CategoryChips
│   ├── lib/
│   │   ├── supabase/           # Client, server, middleware
│   │   ├── types.ts
│   │   └── utils.ts
│   └── hooks/
├── supabase/
│   ├── migrations/             # SQL migration files
│   └── seed.sql                # Sample data
├── public/
│   ├── manifest.json           # PWA manifest
│   └── icons/
├── tailwind.config.ts          # SGA brand tokens
└── .env.local                  # Supabase keys (not committed)
```

---

## Database Schema

```sql
-- Profiles (extends Supabase auth.users)
create table profiles (
  id uuid primary key references auth.users(id),
  full_name text not null,
  role text not null check (role in ('foster','volunteer','adopter','staff','admin')),
  location text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Forum Categories
create table forum_categories (
  id serial primary key,
  name text not null,
  slug text unique not null,
  sort_order int default 0
);

-- Forum Posts
create table forum_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references profiles(id) not null,
  category_id int references forum_categories(id) not null,
  title text,
  body text not null,
  images text[],
  created_at timestamptz default now()
);

-- Forum Comments
create table forum_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references forum_posts(id) on delete cascade not null,
  author_id uuid references profiles(id) not null,
  body text not null,
  created_at timestamptz default now()
);

-- Forum Reactions
create table forum_reactions (
  post_id uuid references forum_posts(id) on delete cascade,
  user_id uuid references profiles(id),
  emoji text not null default '❤️',
  primary key (post_id, user_id)
);

-- Training Modules
create table training_modules (
  id serial primary key,
  title text not null,
  description text,
  sort_order int default 0,
  published boolean default false
);

-- Training Steps
create table training_steps (
  id serial primary key,
  module_id int references training_modules(id) on delete cascade not null,
  step_number int not null,
  title text not null,
  body text not null,
  image_url text,
  unique(module_id, step_number)
);

-- Training Progress
create table training_progress (
  user_id uuid references profiles(id),
  module_id int references training_modules(id),
  status text not null default 'not_started'
    check (status in ('not_started','in_progress','completed')),
  current_step int default 1,
  completed_at timestamptz,
  primary key (user_id, module_id)
);

-- Library Resources
create table library_resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null,
  type text not null check (type in ('article','video','link')),
  url text,
  content text,
  created_at timestamptz default now()
);

-- Full-text search for Library
create index library_search_idx on library_resources
  using gin(to_tsvector('english', title || ' ' || coalesce(description, '')));
```

---

## Auth

- **Invite-only:** Admin creates users via admin page or Supabase dashboard
- **Login:** Email + password
- **Sessions:** Supabase JWT, verified in Next.js middleware
- **Roles:** `profiles.role` — admin pages require `staff` or `admin`

---

## Key Screens (Phase 1)

### Home
- Greeting with member name
- Urgent needs banner (latest post from "Urgent Needs" category)
- Quick-action tiles: Training, Library, Forums, Volunteer Shifts
- Recent forum activity feed
- "Volunteer Shifts" tile opens SignUpGenius in browser

### Forums
- Category tabs (Urgent Needs, Community Chat, Ask an Expert, Events)
- Post composer with photo upload (max 3 images)
- Post feed with reactions and comment counts
- Post detail page with comment thread
- Push notifications for Urgent Needs posts and replies

### Training
- Module list with progress bar ("2 of 5 completed")
- Step-through viewer: title + body text + optional image + Next/Back
- "Mark as Complete" at the end of each module
- Admin: author modules with step-by-step form (title, text, image per step)
- Admin: view all members' training completion status

### Library
- Search bar (Postgres full-text search)
- Category filter chips
- Resource cards (type icon, title, description, estimated time)
- Resources link externally (articles, YouTube) or show internal content

---

## Navigation

- **Mobile (< 768px):** Bottom tab bar with 5 tabs (Home, Forums, Training, Library, Directory grayed out)
- **Desktop (>= 768px):** Left sidebar with same sections
- Directory tab is visible but disabled with "Coming Soon" label

---

## Design Tokens

From the wireframe:

```
Colors:
  --sga-orange: #E8772B
  --sga-orange-light: #FFF3EB
  --sga-blue: #2B3990
  --sga-blue-light: #EAEBF5
  --sga-blue-dark: #1D2666
  --sga-warm-white: #FEFCFA
  --sga-warm-gray: #F7F5F2
  --sga-text: #2C2420
  --sga-text-secondary: #7A6E65

Fonts:
  Headings: Fraunces (serif), 600-700 weight
  Body: DM Sans (sans-serif), 400-500 weight

Radii: 8px (sm), 12px (md), 16px (lg), 20px (xl)
```

---

## PWA

- `manifest.json` with SGA name, theme color (#E8772B), app icons
- Service worker via next-pwa (Workbox) for offline app shell
- "Add to Home Screen" prompt after first login

---

## Not in Scope (per spec)

- Directory (Phase 2)
- Direct messaging / real-time chat
- Calendar integration
- Video hosting (link to YouTube/Vimeo)
- Rich text editor
- In-app shift scheduling (link to SignUpGenius)
- Quizzes / certificates
- E-commerce / donations
