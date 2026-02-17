# SGA Community MVP — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the SGA Community MVP — a PWA with Home, Forums, Training (step-through), Library, and Auth — using Next.js 14 + Supabase + Tailwind.

**Architecture:** Next.js App Router with two route groups: `(auth)` for login/invite pages (no nav) and `(app)` for the authenticated shell (responsive bottom tabs / sidebar). Supabase provides auth, Postgres database, and file storage. Tailwind CSS with SGA brand tokens handles styling.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Supabase (Postgres + Auth + Storage), Vercel

**Reference:**
- Design doc: `docs/plans/2026-02-16-sga-community-mvp-design.md`
- Spec: `docs/plans/2026-02-16-sga-community-app-spec.md`
- Wireframe: `wireframes/sga-community-app.html` (SGA brand colors, fonts, component patterns)

---

## Task 1: Project Scaffolding + Design Tokens

**Files:**
- Create: `app/` (Next.js project root — in a new `app/` directory within the repo)
- Create: `app/tailwind.config.ts`
- Create: `app/src/app/layout.tsx`
- Create: `app/src/app/globals.css`

**Step 1: Create Next.js project**

```bash
cd /Users/davidsayed/repos/sga
npx create-next-app@latest app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Accept defaults. This creates `app/` with Next.js 14, TypeScript, Tailwind, and the App Router.

**Step 2: Configure Tailwind with SGA design tokens**

Replace `app/tailwind.config.ts` with SGA brand tokens extracted from the wireframe (`wireframes/sga-community-app.html:9-30`):

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sga: {
          orange: "#E8772B",
          "orange-light": "#FFF3EB",
          "orange-mid": "#FDDCC6",
          blue: "#2B3990",
          "blue-light": "#EAEBF5",
          "blue-dark": "#1D2666",
          "warm-white": "#FEFCFA",
          "warm-gray": "#F7F5F2",
          text: "#2C2420",
          "text-secondary": "#7A6E65",
          border: "#EDE8E3",
          success: "#2D8B55",
          urgent: "#D44930",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        serif: ["Fraunces", "serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(44,36,32,0.06)",
        md: "0 4px 12px rgba(44,36,32,0.08)",
        lg: "0 8px 24px rgba(44,36,32,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 3: Set up global CSS with Google Fonts**

Replace `app/src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  /* SGA brand colors */
  --color-sga-orange: #E8772B;
  --color-sga-orange-light: #FFF3EB;
  --color-sga-orange-mid: #FDDCC6;
  --color-sga-blue: #2B3990;
  --color-sga-blue-light: #EAEBF5;
  --color-sga-blue-dark: #1D2666;
  --color-sga-warm-white: #FEFCFA;
  --color-sga-warm-gray: #F7F5F2;
  --color-sga-text: #2C2420;
  --color-sga-text-secondary: #7A6E65;
  --color-sga-border: #EDE8E3;
  --color-sga-success: #2D8B55;
  --color-sga-urgent: #D44930;

  /* Font families */
  --font-sans: "DM Sans", sans-serif;
  --font-serif: "Fraunces", serif;

  /* Border radii */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(44, 36, 32, 0.06);
  --shadow-md: 0 4px 12px rgba(44, 36, 32, 0.08);
  --shadow-lg: 0 8px 24px rgba(44, 36, 32, 0.12);
}

body {
  font-family: var(--font-sans);
  color: var(--color-sga-text);
  background: var(--color-sga-warm-white);
}
```

**Step 4: Update root layout with fonts**

Update `app/src/app/layout.tsx` to load DM Sans and Fraunces from Google Fonts:

```tsx
import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "SGA Community",
  description: "Saving Great Animals — Community App",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#E8772B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

**Step 5: Verify it runs**

```bash
cd /Users/davidsayed/repos/sga/app
npm run dev
```

Open http://localhost:3000 — should see default Next.js page with DM Sans font applied.

**Step 6: Commit**

```bash
git add app/
git commit -m "feat: scaffold Next.js project with SGA design tokens"
```

---

## Task 2: Supabase Setup + Database Schema

**Files:**
- Create: `app/.env.local` (not committed)
- Create: `app/supabase/migrations/001_initial_schema.sql`
- Create: `app/supabase/seed.sql`
- Create: `app/src/lib/supabase/client.ts`
- Create: `app/src/lib/supabase/server.ts`

**Step 1: Create Supabase project**

Go to https://supabase.com/dashboard and create a new project called "sga-community". Copy the project URL and anon key.

Create `app/.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Step 2: Install Supabase dependencies**

```bash
cd /Users/davidsayed/repos/sga/app
npm install @supabase/supabase-js @supabase/ssr
```

**Step 3: Create Supabase clients**

Create `app/src/lib/supabase/client.ts` — browser client:

```ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

Create `app/src/lib/supabase/server.ts` — server client:

```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
      },
    }
  );
}
```

**Step 4: Create database migration**

Create `app/supabase/migrations/001_initial_schema.sql` with the full schema from the design doc (profiles, forum_categories, forum_posts, forum_comments, forum_reactions, training_modules, training_steps, training_progress, library_resources, plus the full-text search index).

Run this migration in the Supabase SQL editor or via the Supabase CLI.

**Step 5: Create seed data**

Create `app/supabase/seed.sql` with sample data:
- 4 forum categories: Urgent Needs, Community Chat, Ask an Expert, Events
- 5 training modules matching the wireframe (Dog Body Language, Safe Handling, Meeting Needs, Decompression, Positive Reinforcement)
- 2-3 steps per training module
- 5-6 library resources matching the wireframe (Understanding Dog Body Language, Crate Training 101, Leash Reactivity, Separation Anxiety, When to Call the Vet)
- Sample forum posts matching the wireframe (Doug's Place coverage, Rosie's first walk, resource guarding question)

Run seed data in Supabase SQL editor.

**Step 6: Create TypeScript types**

Create `app/src/lib/types.ts` with TypeScript types matching the database schema:

```ts
export type UserRole = "foster" | "volunteer" | "adopter" | "staff" | "admin";

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  location: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface ForumCategory {
  id: number;
  name: string;
  slug: string;
  sort_order: number;
}

export interface ForumPost {
  id: string;
  author_id: string;
  category_id: number;
  title: string | null;
  body: string;
  images: string[];
  created_at: string;
  // Joined fields
  author?: Profile;
  category?: ForumCategory;
  comment_count?: number;
  reaction_count?: number;
}

export interface ForumComment {
  id: string;
  post_id: string;
  author_id: string;
  body: string;
  created_at: string;
  author?: Profile;
}

export interface TrainingModule {
  id: number;
  title: string;
  description: string | null;
  sort_order: number;
  published: boolean;
}

export interface TrainingStep {
  id: number;
  module_id: number;
  step_number: number;
  title: string;
  body: string;
  image_url: string | null;
}

export type TrainingStatus = "not_started" | "in_progress" | "completed";

export interface TrainingProgress {
  user_id: string;
  module_id: number;
  status: TrainingStatus;
  current_step: number;
  completed_at: string | null;
}

export type ResourceType = "article" | "video" | "link";

export interface LibraryResource {
  id: string;
  title: string;
  description: string | null;
  category: string;
  type: ResourceType;
  url: string | null;
  content: string | null;
  created_at: string;
}
```

**Step 7: Commit**

```bash
git add app/src/lib/ app/supabase/
git commit -m "feat: add Supabase clients, database schema, seed data, and types"
```

---

## Task 3: Auth (Login + Middleware)

**Files:**
- Create: `app/src/middleware.ts`
- Create: `app/src/app/(auth)/login/page.tsx`
- Create: `app/src/app/(auth)/layout.tsx`

**Step 1: Create auth middleware**

Create `app/src/middleware.ts` that refreshes the Supabase session on every request and redirects unauthenticated users to `/login`:

```ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/invite")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
```

**Step 2: Create auth layout (no nav bar)**

Create `app/src/app/(auth)/layout.tsx`:

```tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sga-warm-white flex items-center justify-center p-4">
      {children}
    </div>
  );
}
```

**Step 3: Create login page**

Create `app/src/app/(auth)/login/page.tsx` with SGA branding — logo, email/password form, Supabase `signInWithPassword`:

```tsx
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-sga-blue rounded-xl flex items-center justify-center text-3xl mx-auto mb-4">
          🐾
        </div>
        <h1 className="font-serif text-2xl font-bold text-sga-blue-dark">
          Saving <span className="text-sga-orange">Great</span> Animals
        </h1>
        <p className="text-sga-text-secondary text-sm mt-1">Sign in to the community</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">{error}</div>
        )}
        <div>
          <label className="block text-sm font-medium text-sga-text mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-sga-border rounded-md bg-white text-sga-text"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-sga-text mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-sga-border rounded-md bg-white text-sga-text"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-sga-orange text-white font-semibold rounded-md hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
```

**Step 4: Verify login flow**

Create a test user in Supabase dashboard (Authentication > Users > Add user). Run `npm run dev`, visit http://localhost:3000 — should redirect to `/login`. Sign in with test user — should redirect to home.

**Step 5: Commit**

```bash
git add app/src/middleware.ts app/src/app/\(auth\)/
git commit -m "feat: add auth with login page and session middleware"
```

---

## Task 4: App Shell (Responsive Layout with Tabs + Sidebar)

**Files:**
- Create: `app/src/app/(app)/layout.tsx`
- Create: `app/src/components/layout/tab-bar.tsx`
- Create: `app/src/components/layout/sidebar.tsx`
- Create: `app/src/components/layout/top-bar.tsx`

This is the core navigation structure. Reference the wireframe: mobile has a top bar + bottom tab bar (`wireframes/sga-community-app.html:182-284`), desktop has a left sidebar (`wireframes/sga-community-app.html:800-878`).

**Step 1: Create TopBar component**

Create `app/src/components/layout/top-bar.tsx` — the mobile header with SGA logo, search icon, and notification bell (wireframe lines 182-239):

```tsx
import Link from "next/link";

export function TopBar() {
  return (
    <header className="flex items-center justify-between px-5 py-3 bg-sga-warm-white border-b border-sga-border md:hidden">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-sga-blue rounded-lg flex items-center justify-center text-lg">
          🐾
        </div>
        <span className="font-serif text-[15px] font-bold text-sga-blue-dark">
          Saving <span className="text-sga-orange">Great</span> Animals
        </span>
      </Link>
      <div className="flex gap-3.5">
        <button className="w-[34px] h-[34px] rounded-full bg-sga-warm-gray flex items-center justify-center text-[15px]">
          🔍
        </button>
        <button className="w-[34px] h-[34px] rounded-full bg-sga-warm-gray flex items-center justify-center text-[15px] relative">
          🔔
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-sga-urgent rounded-full border-2 border-sga-warm-white" />
        </button>
      </div>
    </header>
  );
}
```

**Step 2: Create TabBar component**

Create `app/src/components/layout/tab-bar.tsx` — bottom navigation for mobile (wireframe lines 241-284):

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", icon: "🏠", label: "Home" },
  { href: "/forums", icon: "💬", label: "Forums" },
  { href: "/training", icon: "🎓", label: "Training" },
  { href: "/library", icon: "📚", label: "Library" },
  { href: "#", icon: "👥", label: "People", disabled: true },
];

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-around py-2 pb-7 bg-sga-warm-white border-t border-sga-border md:hidden">
      {tabs.map((tab) => {
        const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.label}
            href={tab.disabled ? "#" : tab.href}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg ${
              tab.disabled ? "opacity-30 pointer-events-none" : ""
            }`}
          >
            <span className={`text-xl leading-none ${isActive ? "opacity-100" : "opacity-40"}`}>
              {tab.icon}
            </span>
            <span
              className={`text-[10px] font-medium ${
                isActive
                  ? "text-sga-orange font-semibold opacity-100"
                  : "text-sga-text-secondary opacity-60"
              }`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
```

**Step 3: Create Sidebar component**

Create `app/src/components/layout/sidebar.tsx` — desktop left nav (wireframe lines 800-878):

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: "🏠", label: "Home" },
  { href: "/forums", icon: "💬", label: "Forums", badge: 3 },
  { href: "/training", icon: "🎓", label: "Training" },
  { href: "/library", icon: "📚", label: "Library" },
  { href: "#", icon: "👥", label: "Directory", disabled: true },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-[220px] flex-col bg-sga-warm-white border-r border-sga-border py-5 shrink-0">
      <div className="flex items-center gap-2.5 px-4 pb-5 border-b border-sga-border mb-3">
        <div className="w-9 h-9 bg-sga-blue rounded-[10px] flex items-center justify-center text-xl">
          🐾
        </div>
        <div className="font-serif text-sm font-bold text-sga-blue-dark leading-tight">
          Saving<br /><span className="text-sga-orange">Great</span> Animals
        </div>
      </div>

      <nav className="flex-1">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.disabled ? "#" : item.href}
              className={`flex items-center gap-2.5 px-4 py-2.5 text-sm w-full transition-colors ${
                item.disabled
                  ? "opacity-30 pointer-events-none"
                  : isActive
                  ? "bg-sga-orange-light text-sga-orange font-semibold border-r-[3px] border-sga-orange"
                  : "text-sga-text-secondary hover:bg-sga-warm-gray"
              }`}
            >
              <span className="text-lg w-6 text-center">{item.icon}</span>
              {item.label}
              {item.badge && (
                <span className="ml-auto bg-sga-urgent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-lg">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
```

**Step 4: Create app layout**

Create `app/src/app/(app)/layout.tsx` that combines TopBar, Sidebar, TabBar, and the main content area:

```tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TopBar } from "@/components/layout/top-bar";
import { TabBar } from "@/components/layout/tab-bar";
import { Sidebar } from "@/components/layout/sidebar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto">{children}</main>
        <TabBar />
      </div>
    </div>
  );
}
```

**Step 5: Create placeholder home page**

Create `app/src/app/(app)/page.tsx`:

```tsx
export default function HomePage() {
  return (
    <div className="p-4">
      <h1 className="font-serif text-xl font-bold text-sga-blue-dark">Home</h1>
      <p className="text-sga-text-secondary text-sm mt-1">App shell is working.</p>
    </div>
  );
}
```

**Step 6: Verify responsive layout**

Run `npm run dev`. On mobile viewport: see top bar + content + bottom tabs. On desktop viewport: see sidebar + content. Both should display SGA branding with correct fonts and colors.

**Step 7: Commit**

```bash
git add app/src/
git commit -m "feat: add responsive app shell with tabs and sidebar navigation"
```

---

## Task 5: Home Screen

**Files:**
- Create: `app/src/app/(app)/page.tsx` (replace placeholder)
- Create: `app/src/components/home/urgent-banner.tsx`
- Create: `app/src/components/home/hero.tsx`
- Create: `app/src/components/home/quick-actions.tsx`
- Create: `app/src/components/forums/post-card.tsx` (reused on home + forums)

Build the home screen matching the wireframe (`wireframes/sga-community-app.html:1075-1142`):
1. Urgent needs banner (red gradient, pulse dot)
2. Hero section (blue gradient, greeting with user's name)
3. Quick-action tiles (4-column grid: Training, Library, Forums, Directory)
4. Recent Activity feed (latest forum posts)

**Step 1: Create UrgentBanner component**

Matches wireframe lines 296-317. Red gradient, pulse animation, text.

**Step 2: Create Hero component**

Matches wireframe lines 319-346. Blue gradient background, personalized greeting ("Hey David"), subtitle with post/event counts.

**Step 3: Create QuickActions component**

Matches wireframe lines 348-386. 4-column grid of white cards with icon, label, and optional badge. Links to /training, /library, /forums, and SignUpGenius (external link for "Shifts").

Note: The wireframe shows 4 tiles (Training, Library, Forums, Directory). Per the spec, replace Directory with "Volunteer Shifts" linking to SignUpGenius. Directory is Phase 2.

**Step 4: Create PostCard component**

Matches wireframe lines 408-484. This component is reused on both Home and Forums pages. Shows: avatar (initials + role color), name, role badge, timestamp, category tag, title, preview text, reaction/comment/view counts.

**Step 5: Build the Home page**

Wire everything together in `app/src/app/(app)/page.tsx`. Fetch the current user's profile and recent forum posts from Supabase (server component).

**Step 6: Verify**

Run dev server, confirm home screen matches wireframe layout — urgent banner at top, blue hero with greeting, 4 quick-action tiles overlapping the hero, activity feed below.

**Step 7: Commit**

```bash
git add app/src/
git commit -m "feat: add home screen with urgent banner, hero, quick actions, and activity feed"
```

---

## Task 6: Forums — Feed Page

**Files:**
- Create: `app/src/app/(app)/forums/page.tsx`
- Create: `app/src/components/forums/category-tabs.tsx`
- Create: `app/src/components/forums/post-composer-prompt.tsx`

Build the forum feed matching the wireframe (`wireframes/sga-community-app.html:1145-1209`):
1. Category tabs (horizontal scroll: All, Needs, Chat, Events, Ask Expert)
2. New post prompt ("What's happening with your foster?" with photo/video icons)
3. Post feed (reuses PostCard from Task 5)

**Step 1: Create CategoryTabs component**

Matches wireframe lines 660-686. Horizontal scrollable tabs with active state (orange bg). Tabs link to `?category=slug` query param for filtering.

**Step 2: Create PostComposerPrompt component**

Matches wireframe lines 688-720. Dashed border card with paw avatar, prompt text, and camera/video icons. Clicking opens the full post composer (Task 7).

**Step 3: Build the Forums page**

Server component that:
- Reads `?category=` query param to filter posts
- Fetches forum posts from Supabase with author profile joined
- Fetches category list with post counts
- Renders CategoryTabs, PostComposerPrompt, and PostCard list

**Step 4: Verify**

Forums tab should show category tabs, composer prompt, and posts. Clicking a category tab should filter the feed.

**Step 5: Commit**

```bash
git add app/src/
git commit -m "feat: add forums feed with category tabs and post list"
```

---

## Task 7: Forums — Post Composer + Image Upload

**Files:**
- Create: `app/src/components/forums/post-composer.tsx`
- Create: `app/src/app/api/forums/posts/route.ts`
- Create: `app/src/app/api/upload/route.ts`

**Step 1: Create post composer component**

A modal or expandable form triggered by clicking the PostComposerPrompt. Contains:
- Category selector (dropdown or pills)
- Optional title field
- Body textarea
- Image upload button (max 3 images, compressed client-side before upload)
- Submit button

**Step 2: Create image upload API route**

`POST /api/upload` — receives a file, uploads to Supabase Storage bucket "forum-images", returns the public URL.

Create a "forum-images" storage bucket in Supabase dashboard (public, 5MB max).

**Step 3: Create post creation API route**

`POST /api/forums/posts` — receives title, body, category_id, images[], creates a forum_post row. Returns the created post.

**Step 4: Wire composer to API**

On submit: upload images first, then create post with image URLs. On success, refresh the feed (use `router.refresh()`).

**Step 5: Verify**

Create a new post with a photo. Confirm it appears in the forum feed with the correct category tag and image.

**Step 6: Commit**

```bash
git add app/src/
git commit -m "feat: add forum post composer with image upload"
```

---

## Task 8: Forums — Post Detail + Comments

**Files:**
- Create: `app/src/app/(app)/forums/[postId]/page.tsx`
- Create: `app/src/components/forums/comment-thread.tsx`
- Create: `app/src/components/forums/comment-form.tsx`
- Create: `app/src/app/api/forums/comments/route.ts`

**Step 1: Create post detail page**

`/forums/[postId]` — server component that fetches the full post with author, images, and all comments. Shows the full post body (not truncated), displayed images, and the comment thread below.

**Step 2: Create CommentThread component**

List of comments with avatar, name, role badge, timestamp, and body. Similar styling to PostCard but simpler.

**Step 3: Create CommentForm component**

Simple text input + submit button at the bottom of the thread. Posts to `/api/forums/comments`.

**Step 4: Create comments API route**

`POST /api/forums/comments` — receives post_id, body. Creates a forum_comment row.

**Step 5: Add reactions**

Add a heart reaction toggle to PostCard. `POST /api/forums/reactions` — toggles a forum_reactions row. Display the count on PostCard.

**Step 6: Verify**

Navigate from forum feed to post detail. See full post with comments. Add a comment — it appears in the thread. Toggle a heart reaction.

**Step 7: Commit**

```bash
git add app/src/
git commit -m "feat: add post detail page with comments and reactions"
```

---

## Task 9: Library — Search + Browse

**Files:**
- Create: `app/src/app/(app)/library/page.tsx`
- Create: `app/src/components/library/search-bar.tsx`
- Create: `app/src/components/library/category-chips.tsx`
- Create: `app/src/components/library/resource-card.tsx`

Build the library matching the wireframe (`wireframes/sga-community-app.html:1287-1348`):
1. Search bar (prominent at top)
2. Category filter chips (horizontal scroll)
3. Resource cards grouped by category

**Step 1: Create SearchBar component**

Matches wireframe lines 567-590. Full-width input with search icon. Uses a query param `?q=` for server-side search.

**Step 2: Create CategoryChips component**

Matches wireframe lines 592-616. Horizontal scrollable pills. Active chip is blue bg. Uses `?category=` query param.

**Step 3: Create ResourceCard component**

Matches wireframe lines 618-657. Shows: type icon (video=orange, article=blue), type label + duration, title, description. Clicking opens the external URL (for links/videos) or shows internal content.

**Step 4: Build Library page**

Server component that:
- Reads `?q=` and `?category=` query params
- If `q` is provided, uses Postgres full-text search: `to_tsvector('english', title || ' ' || description) @@ plainto_tsquery('english', q)`
- If `category` is provided, filters by category
- Groups results by category (when no search query)
- Renders SearchBar, CategoryChips, and ResourceCard list

**Step 5: Verify**

Library page shows search bar, category chips, and resources. Typing in search filters results. Clicking a category chip filters by category. Clicking a resource card opens its URL.

**Step 6: Commit**

```bash
git add app/src/
git commit -m "feat: add library with full-text search and category filters"
```

---

## Task 10: Training — Module List + Progress

**Files:**
- Create: `app/src/app/(app)/training/page.tsx`
- Create: `app/src/components/training/progress-bar.tsx`
- Create: `app/src/components/training/module-card.tsx`

Build the training list matching the wireframe (`wireframes/sga-community-app.html:1212-1284`):
1. Progress summary card ("2 of 5 modules completed" with progress bar)
2. Module cards with status badges

**Step 1: Create ProgressBar component**

Matches wireframe lines 486-516. Shows: heading, gradient progress bar (orange to gold), text summary.

**Step 2: Create ModuleCard component**

Matches wireframe lines 518-565. Shows: thumbnail (emoji on colored bg), title (numbered), description, status badge (Completed=green, In Progress=orange, Not Started=gray). Clicking navigates to `/training/[moduleId]/1` (first step).

**Step 3: Build Training page**

Server component that:
- Fetches all published training modules ordered by sort_order
- Fetches the current user's training_progress for each module
- Calculates completion count for progress bar
- Renders ProgressBar and ModuleCard list

**Step 4: Verify**

Training page shows progress bar and module list. Modules show correct status based on seed data. Clicking a module navigates to the step view.

**Step 5: Commit**

```bash
git add app/src/
git commit -m "feat: add training module list with progress tracking"
```

---

## Task 11: Training — Step-Through Viewer

**Files:**
- Create: `app/src/app/(app)/training/[moduleId]/[step]/page.tsx`
- Create: `app/src/components/training/step-viewer.tsx`
- Create: `app/src/app/api/training/progress/route.ts`

This is the step-through experience described in the spec (lines 140-151):
```
Module: "Dog Body Language"
  Step 1: "Reading Tail Position" — text + image
  Step 2: "Ear Signals" — text + image
  ...
  Mark Complete
```

**Step 1: Create step-through page**

`/training/[moduleId]/[step]` — server component that:
- Fetches the training module
- Fetches all steps for this module
- Fetches the specific step by step_number
- Fetches user's progress for this module
- Renders StepViewer

**Step 2: Create StepViewer component**

A clean card layout showing:
- Module title + step progress ("Step 2 of 4")
- Step title (heading)
- Step body (plain text, whitespace preserved)
- Optional image (if step has image_url)
- Navigation: Back button (if not first step) + Next button (if not last step)
- On last step: "Mark as Complete" button instead of Next

Navigation uses client-side routing: Back goes to `/training/[moduleId]/[step-1]`, Next goes to `/training/[moduleId]/[step+1]`.

**Step 3: Create progress API route**

`POST /api/training/progress` — receives module_id, action ("update_step" or "complete").
- "update_step": upserts training_progress with current_step and status "in_progress"
- "complete": upserts training_progress with status "completed" and completed_at timestamp

**Step 4: Wire navigation to progress tracking**

When user navigates to a step, update their current_step via the API. When they click "Mark as Complete", call the complete action and redirect to `/training`.

**Step 5: Verify**

Navigate from module list into a module. Step through pages with Next/Back. See step content (title, text, image). Mark complete — redirects back to training list with updated status.

**Step 6: Commit**

```bash
git add app/src/
git commit -m "feat: add training step-through viewer with progress tracking"
```

---

## Task 12: Admin — Training Content Authoring

**Files:**
- Create: `app/src/app/(app)/admin/training/page.tsx`
- Create: `app/src/components/admin/module-editor.tsx`
- Create: `app/src/components/admin/step-editor.tsx`
- Create: `app/src/app/api/admin/training/route.ts`
- Create: `app/src/app/api/admin/training/steps/route.ts`

Per the spec (lines 155-163): An admin page with a simple form to create/edit modules and add steps.

**Step 1: Add admin route protection**

In the admin layout or page, check that the user's profile has role "staff" or "admin". If not, redirect to home.

**Step 2: Create module list + editor**

Admin training page shows:
- List of all modules (published and unpublished)
- "Add Module" button
- Click a module to edit its title, description, sort order, published status

**Step 3: Create step editor**

When editing a module, show its steps in order:
- Each step shows: step number, title, preview of body, image thumbnail
- "Add Step" button at the bottom
- Click a step to edit: title (text input), body (textarea), image (file upload to Supabase Storage "training-images" bucket)
- Drag/reorder steps (or simple up/down buttons for MVP)

**Step 4: Create admin API routes**

- `POST/PUT/DELETE /api/admin/training` — CRUD for training_modules
- `POST/PUT/DELETE /api/admin/training/steps` — CRUD for training_steps
- All routes verify user has staff/admin role

Create a "training-images" storage bucket in Supabase (public, 5MB max).

**Step 5: Verify**

As a staff user, navigate to /admin/training. Create a new module, add 3 steps with text and an image. Publish it. Verify it appears in the member-facing training list.

**Step 6: Commit**

```bash
git add app/src/
git commit -m "feat: add admin training content authoring"
```

---

## Task 13: Admin — Member Progress View

**Files:**
- Create: `app/src/app/(app)/admin/members/page.tsx`
- Create: `app/src/components/admin/member-progress-table.tsx`

Per the spec (line 165): "Show me who hasn't finished training" is the key use case.

**Step 1: Build member progress page**

Server component that:
- Fetches all profiles
- Fetches all training_progress records
- Joins them to show: member name, role, and completion status for each module
- Highlights members who haven't completed all modules

**Step 2: Add filtering**

Simple filter: "Show all" / "Incomplete training only". Default to showing incomplete first.

**Step 3: Verify**

As a staff user, navigate to /admin/members. See a table of members with their training completion status. Filter to see only incomplete.

**Step 4: Commit**

```bash
git add app/src/
git commit -m "feat: add admin member training progress view"
```

---

## Task 14: PWA Configuration

**Files:**
- Create: `app/public/manifest.json`
- Create: `app/public/icons/` (app icons in multiple sizes)
- Modify: `app/src/app/layout.tsx` (add manifest link)

**Step 1: Create PWA manifest**

Create `app/public/manifest.json`:

```json
{
  "name": "SGA Community",
  "short_name": "SGA",
  "description": "Saving Great Animals — Community App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FEFCFA",
  "theme_color": "#E8772B",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

**Step 2: Generate app icons**

Create simple SGA icons (paw emoji on blue background) in 192x192 and 512x512. Use a canvas script or online tool.

**Step 3: Link manifest in layout**

Add to `app/src/app/layout.tsx` metadata:

```tsx
export const metadata: Metadata = {
  title: "SGA Community",
  description: "Saving Great Animals — Community App",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SGA Community",
  },
};
```

**Step 4: Verify**

Open the app in Chrome. Check DevTools > Application > Manifest — should show SGA info. "Install" prompt should be available. On mobile, "Add to Home Screen" should work.

**Step 5: Commit**

```bash
git add app/public/ app/src/app/layout.tsx
git commit -m "feat: add PWA manifest and app icons"
```

---

## Execution Order Summary

| Task | Feature | Depends On |
|---|---|---|
| 1 | Project scaffolding + design tokens | — |
| 2 | Supabase setup + schema | Task 1 |
| 3 | Auth (login + middleware) | Task 2 |
| 4 | App shell (tabs + sidebar) | Task 3 |
| 5 | Home screen | Task 4 |
| 6 | Forums — feed | Task 4, PostCard from 5 |
| 7 | Forums — composer + upload | Task 6 |
| 8 | Forums — detail + comments | Task 6 |
| 9 | Library — search + browse | Task 4 |
| 10 | Training — module list | Task 4 |
| 11 | Training — step viewer | Task 10 |
| 12 | Admin — training authoring | Task 11 |
| 13 | Admin — member progress | Task 10 |
| 14 | PWA configuration | Task 1 |

**Parallelizable:** Tasks 6-8 (Forums), 9 (Library), and 10-11 (Training) can be built in parallel after Task 5, since they only share the PostCard component and the app shell.
