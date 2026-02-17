# Mobile Native Feel + Visual Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the SGA Community PWA feel native on mobile and refresh the visual design with warm community aesthetics using real SGA imagery.

**Architecture:** Pure frontend changes — CSS tokens, component rewrites, viewport config, and a client-side PWA install prompt. No database or API changes. All images already downloaded to `/public/images/`.

**Tech Stack:** Next.js 16, Tailwind CSS v4 (`@theme inline`), React Server Components + Client Components

---

### Task 1: Global CSS — Warm Tokens, Touch Behavior, Animations

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: Update globals.css**

Replace the entire file with updated tokens. Key changes:
- Warmer background: `--sga-warm-white: #FBF8F4`
- Warm shadows using `rgba(139, 90, 43, ...)` instead of cold gray
- Larger default radius: `--radius-md: 16px`
- Touch behavior: `-webkit-tap-highlight-color`, `overscroll-behavior`, `touch-action`
- Safe-area padding custom properties
- `@keyframes fadeIn` animation
- Smooth transitions on interactive elements

```css
@import "tailwindcss";

/* ── SGA Brand Tokens ── */
:root {
  /* Colors */
  --sga-orange: #E8772B;
  --sga-orange-light: #FFF3EB;
  --sga-orange-mid: #FDDCC6;
  --sga-blue: #2B3990;
  --sga-blue-light: #EAEBF5;
  --sga-blue-dark: #1D2666;
  --sga-warm-white: #FBF8F4;
  --sga-warm-gray: #F5F1ED;
  --sga-text: #2C2420;
  --sga-text-secondary: #7A6E65;
  --sga-border: #EDE8E3;
  --sga-success: #2D8B55;
  --sga-urgent: #D44930;

  /* Category accent colors */
  --sga-cat-urgent: #D44930;
  --sga-cat-community: #E8772B;
  --sga-cat-expert: #2B3990;
  --sga-cat-events: #2D8B55;

  /* Shadows — warm tint */
  --shadow-sm: 0 1px 3px rgba(139, 90, 43, 0.06);
  --shadow-md: 0 4px 12px rgba(139, 90, 43, 0.08);
  --shadow-lg: 0 8px 24px rgba(139, 90, 43, 0.12);

  /* Safe area */
  --safe-top: env(safe-area-inset-top, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
}

@theme inline {
  --color-sga-orange: var(--sga-orange);
  --color-sga-orange-light: var(--sga-orange-light);
  --color-sga-orange-mid: var(--sga-orange-mid);
  --color-sga-blue: var(--sga-blue);
  --color-sga-blue-light: var(--sga-blue-light);
  --color-sga-blue-dark: var(--sga-blue-dark);
  --color-sga-warm-white: var(--sga-warm-white);
  --color-sga-warm-gray: var(--sga-warm-gray);
  --color-sga-text: var(--sga-text);
  --color-sga-text-secondary: var(--sga-text-secondary);
  --color-sga-border: var(--sga-border);
  --color-sga-success: var(--sga-success);
  --color-sga-urgent: var(--sga-urgent);
  --font-sans: var(--font-dm-sans), "DM Sans", ui-sans-serif, system-ui, sans-serif;
  --font-serif: var(--font-fraunces), "Fraunces", ui-serif, Georgia, serif;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 20px;
  --radius-xl: 24px;
  --shadow-sm: var(--shadow-sm);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
}

/* ── Base Styles ── */
html {
  overscroll-behavior: none;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-sans);
  color: var(--sga-text);
  background-color: var(--sga-warm-white);
  -webkit-tap-highlight-color: transparent;
  overscroll-behavior-y: none;
}

/* ── Touch & interaction ── */
a, button, [role="button"] {
  touch-action: manipulation;
}

/* ── Animations ── */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeInUp 0.3s ease-out both;
}

/* Staggered children */
.stagger > * { animation: fadeInUp 0.3s ease-out both; }
.stagger > *:nth-child(1) { animation-delay: 0ms; }
.stagger > *:nth-child(2) { animation-delay: 50ms; }
.stagger > *:nth-child(3) { animation-delay: 100ms; }
.stagger > *:nth-child(4) { animation-delay: 150ms; }
.stagger > *:nth-child(5) { animation-delay: 200ms; }

/* ── Card base ── */
.card {
  background: white;
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s ease, transform 0.15s ease;
}

.card:active {
  transform: scale(0.98);
}
```

**Step 2: Update viewport in layout.tsx**

Change the viewport export to disable pinch-zoom:

```ts
export const viewport: Viewport = {
  themeColor: "#E8772B",
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};
```

Also add `className="min-h-dvh"` to the `<body>` tag for dynamic viewport height.

**Step 3: Verify** — Run dev server, check that background is warmer, no pinch-zoom on mobile.

**Step 4: Commit** — `git commit -m "feat: warm CSS tokens, touch behavior, and viewport lock"`

---

### Task 2: Login Page — Real Logo + Photo Background

**Files:**
- Modify: `src/app/(auth)/login/page.tsx`
- Modify: `src/app/(auth)/layout.tsx`

**Step 1: Update auth layout** to add the hero-dog background image:

```tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex items-center justify-center p-4 relative">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-dog.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/90" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
```

**Step 2: Update login page** — replace the paw emoji with the real SGA logo image:

Replace the logo section (lines 38-48) with:
```tsx
<div className="flex flex-col items-center mb-8">
  <img
    src="/images/sga-logo.png"
    alt="Saving Great Animals"
    className="h-20 w-auto mb-3"
  />
  <p className="text-sga-text-secondary mt-1">Sign in to the community</p>
</div>
```

Also wrap the form in a frosted card:
```tsx
<div className="w-full max-w-sm bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
```

**Step 3: Verify** — Check login page has dog photo background and real logo.

**Step 4: Commit** — `git commit -m "feat: login page with SGA logo and photo background"`

---

### Task 3: Sidebar + Top Bar — Real SGA Logo

**Files:**
- Modify: `src/components/layout/sidebar.tsx`
- Modify: `src/components/layout/top-bar.tsx`
- Modify: `src/components/layout/tab-bar.tsx`

**Step 1: Update sidebar logo section** (lines 33-42):

Replace the emoji icon with the real SGA dog face. Use `<img>` cropped to just the dog face portion of the logo:
```tsx
<div className="flex items-center gap-2.5 px-4 pb-5 border-b border-sga-border mb-3">
  <img src="/images/sga-logo.png" alt="SGA" className="h-9 w-auto shrink-0" />
</div>
```

**Step 2: Update top-bar** — same logo treatment:
```tsx
<div className="flex items-center gap-2">
  <img src="/images/sga-logo.png" alt="SGA" className="h-7 w-auto" />
</div>
```

**Step 3: Update tab-bar** — add safe-area bottom padding:
```tsx
<nav className="flex items-center justify-around py-2 bg-sga-warm-white border-t border-sga-border md:hidden"
  style={{ paddingBottom: "calc(0.5rem + var(--safe-bottom))" }}>
```

**Step 4: Verify** — Real SGA logo in sidebar and top bar.

**Step 5: Commit** — `git commit -m "feat: real SGA logo in sidebar and top bar"`

---

### Task 4: Home Hero — Full-Bleed Photo

**Files:**
- Modify: `src/components/home/hero.tsx`

**Step 1: Rewrite hero** with photo background:

```tsx
interface HeroProps {
  userName: string;
  newPostCount: number;
  eventCount?: number;
}

export function Hero({ userName, newPostCount, eventCount = 0 }: HeroProps) {
  const parts: string[] = [];
  if (newPostCount > 0) {
    parts.push(`${newPostCount} new post${newPostCount === 1 ? "" : "s"}`);
  }
  if (eventCount > 0) {
    parts.push(`${eventCount} upcoming event${eventCount === 1 ? "" : "s"}`);
  }
  const subtitle = parts.length > 0 ? parts.join(" \u00B7 ") : "Welcome back!";

  return (
    <div className="relative h-[220px] md:h-[240px] overflow-hidden">
      <img
        src="/images/hero-dog.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="relative h-full p-5 flex flex-col justify-end">
        <h1 className="font-serif text-[24px] font-semibold text-white mb-0.5 drop-shadow-sm">
          Hey {userName} 👋
        </h1>
        <p className="text-[14px] text-white/80">{subtitle}</p>
      </div>
    </div>
  );
}
```

**Step 2: Verify** — Home hero shows sleeping puppy with gradient overlay and greeting.

**Step 3: Commit** — `git commit -m "feat: photo-based home hero with SGA dog imagery"`

---

### Task 5: Quick Actions — Warm Cards with Gradients

**Files:**
- Modify: `src/components/home/quick-actions.tsx`

**Step 1: Rewrite quick-actions** with warm gradient backgrounds per action:

Each action card gets a subtle background gradient. Keep the structure but replace plain emoji with styled containers:

```tsx
const actions: QuickAction[] = [
  { icon: "🎓", label: "Training", href: "/training", gradient: "from-amber-50 to-orange-50" },
  { icon: "📚", label: "Library", href: "/library", gradient: "from-blue-50 to-indigo-50" },
  { icon: "💬", label: "Forums", href: "/forums", badge: forumBadgeCount, gradient: "from-orange-50 to-red-50" },
];
```

3-column grid. Card class: `"card bg-gradient-to-br ${action.gradient} p-4 text-center cursor-pointer"`

**Step 2: Verify** — Quick actions have warm gradient tints.

**Step 3: Commit** — `git commit -m "feat: warm gradient quick action cards"`

---

### Task 6: Forum Post Cards — Photo-Forward + Category Accents

**Files:**
- Modify: `src/components/forums/post-card.tsx`

**Step 1: Rewrite post-card** with these changes:
- Larger padding (p-4), 16px border-radius via `card` class
- When `post.images?.length > 0`: show first image as full-width card hero (200px, object-cover, rounded-t-2xl)
- When no images: left accent stripe using category color
- Category color mapping: `urgent-needs → var(--sga-urgent)`, `community-chat → var(--sga-orange)`, `ask-expert → var(--sga-blue)`, `events → var(--sga-success)`
- More visual heart/comment with counts

**Step 2: Verify** — Forum cards have category-colored left borders and larger layout.

**Step 3: Commit** — `git commit -m "feat: photo-forward forum post cards with category accents"`

---

### Task 7: Training Module Cards — Photo Backgrounds

**Files:**
- Modify: `src/components/training/module-card.tsx`

**Step 1: Rewrite module-card** with photo backgrounds:

Map each module to an SGA photo:
```ts
const MODULE_IMAGES: Record<string, string> = {
  "reading": "/images/foster-dogs.jpg",
  "handling": "/images/volunteer.jpg",
  "shutdown": "/images/hero-dog.jpg",
  "daily": "/images/available-dogs.jpg",
  "meet": "/images/adoption.jpg",
};
```

Each card becomes a photo card with dark gradient overlay and white text for the title. Progress badge overlaid.

Card height: `h-36`. Photo fills the card. Semi-transparent overlay. Module title and progress at the bottom.

**Step 2: Verify** — Training cards show real dog photos with module titles overlaid.

**Step 3: Commit** — `git commit -m "feat: photo-background training module cards"`

---

### Task 8: Library Page — Colored Borders + Warmer Treatment

**Files:**
- Modify: `src/components/library/resource-card.tsx`
- Modify: `src/app/(app)/library/page.tsx`

**Step 1: Update resource-card** — add colored left border by type:
- Article: left border `border-l-4 border-l-sga-blue`
- Video: left border `border-l-4 border-l-sga-orange`
- Link: left border `border-l-4 border-l-sga-border`
- Use `card` base class for consistent styling
- Slightly larger text and padding

**Step 2: Update library page** — category headers with accent color bar and more breathing room.

**Step 3: Verify** — Library cards have colored left borders, category headers feel warmer.

**Step 4: Commit** — `git commit -m "feat: library cards with type-colored borders"`

---

### Task 9: Empty States — Dog Photos + Friendly Copy

**Files:**
- Modify: `src/app/(app)/forums/page.tsx`
- Modify: `src/app/(app)/page.tsx`

**Step 1: Update forums empty state** (line 57-60 in forums/page.tsx):

Replace plain text with a photo + message:
```tsx
<div className="flex flex-col items-center py-12 px-4 animate-fade-in">
  <img src="/images/available-dogs.jpg" alt="" className="w-48 h-32 object-cover rounded-2xl mb-4 opacity-80" />
  <p className="text-sm font-medium text-sga-text mb-1">No posts yet</p>
  <p className="text-xs text-sga-text-secondary">Be the first to share what's happening with your foster!</p>
</div>
```

**Step 2: Update home page empty state** similarly with a dog photo.

**Step 3: Verify** — Empty states show dog photos.

**Step 4: Commit** — `git commit -m "feat: friendly empty states with dog photos"`

---

### Task 10: PWA Install Prompt

**Files:**
- Create: `src/components/pwa-install-prompt.tsx`
- Modify: `src/app/(app)/layout.tsx`

**Step 1: Create install prompt component** — client component that:
- Listens for `beforeinstallprompt` event (Android/Chrome)
- Detects iOS Safari via user agent + `!navigator.standalone`
- Shows a dismissible banner at the bottom of the screen
- Stores dismissal in `localStorage` with key `sga-install-dismissed`
- Auto-hides if already running as standalone PWA

**Step 2: Add to app layout** — render `<PwaInstallPrompt />` inside the `(app)` layout.

**Step 3: Verify** — Banner appears on first visit in mobile browser, dismisses and stays dismissed.

**Step 4: Commit** — `git commit -m "feat: PWA install prompt for mobile browsers"`

---

### Task 11: Final Polish + Deploy

**Step 1:** Run `npm run build` to verify no TypeScript or build errors.

**Step 2:** Run `npx vercel --prod` to deploy to production.

**Step 3:** Test on mobile device — verify no pinch-zoom, warm visuals, install prompt works.

**Step 4:** Final commit and push if any adjustments needed.
