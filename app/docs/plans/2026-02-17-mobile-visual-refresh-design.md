# SGA Community — Mobile Native Feel + Visual Refresh

## Date: 2026-02-17

## Goals

1. Make the PWA feel like a native app on mobile (no pinch-zoom, proper touch behavior, install prompt)
2. Visual refresh with warm community aesthetic using real SGA imagery
3. Replace emoji placeholders with the actual SGA logo and dog photos

## Part 1: Mobile Native Feel

### Viewport & Touch
- Add `maximumScale: 1`, `userScalable: false` to viewport export in `layout.tsx`
- CSS: `touch-action: manipulation` on interactive elements, `-webkit-tap-highlight-color: transparent` globally
- `overscroll-behavior: none` on html/body to prevent rubber-banding
- Safe-area padding via `env(safe-area-inset-*)` for notched phones (bottom tab bar, top bar)

### PWA Install Prompt
- Detect `beforeinstallprompt` event (Chrome/Android) and standalone display mode
- Show a dismissible banner: "Install SGA Community for a better experience" with an Install button
- For iOS Safari: detect and show "Tap Share → Add to Home Screen" instructions
- Store dismissal in localStorage so it only shows once

## Part 2: Visual Refresh — "Warm & Community"

### Design Principles
- Dogs are the heroes, not UI chrome
- Real SGA photography everywhere (from savinggreatanimals.org)
- Warm shadows (`rgba(139, 90, 43, 0.08)`) instead of cold gray
- Warmer background: `#FBF8F4`
- Larger border-radius on cards: 16px
- Subtle entrance animations

### Assets Downloaded (from savinggreatanimals.org)
- `/public/images/sga-logo.png` — Official SGA logo with dog face
- `/public/images/hero-dog.jpg` — Sleeping puppy under blanket (home hero)
- `/public/images/foster-dogs.jpg` — Dog face on pillow (training)
- `/public/images/available-dogs.jpg` — Playful dog rolling in grass (forums)
- `/public/images/volunteer.jpg` — Two dogs playing on beach (volunteer/events)
- `/public/images/adoption.jpg` — Dog on beach with "ADOPTED" in sand (library/success)

### Login Page
- Add the real SGA logo image instead of paw emoji
- Add a background with a subtle dog photo (hero-dog.jpg, low opacity)
- Warmer card treatment

### Sidebar & Top Bar
- Replace SVG/emoji icon with the actual SGA dog face from the logo
- Sidebar gets a subtle warm background tint

### Home Screen
- **Hero**: Full-bleed `hero-dog.jpg` with dark gradient overlay, greeting text on top. Taller (220px → mobile, 240px desktop). The sleeping dog photo evokes home and comfort.
- **Quick Actions**: Cards get subtle warm gradients, slightly larger, with gentle shadows. Replace emoji with small styled icons.
- **Activity Feed**: Post cards become more visual (see Forum Post Cards below)

### Forum Post Cards
- Larger cards with more padding (p-4 instead of p-3.5)
- When a post has images: image becomes card hero (full-width, rounded top, 200px height, object-cover)
- Left accent stripe in category color when no image
- Category colors: urgent-needs=#D44930, community-chat=#E8772B, ask-expert=#2B3990, events=#2D8B55
- Warmer shadows, 16px border-radius
- Heart/comment icons with more visual presence

### Training Module Cards
- Replace emoji thumbnails with warm gradient backgrounds featuring module-specific imagery
- Use SGA photos as card backgrounds: `foster-dogs.jpg` for body language, `volunteer.jpg` for handling, `hero-dog.jpg` for shutdown, etc.
- Semi-transparent overlay with module title
- Progress indicator as a small ring or bar at the bottom of the card

### Library Page
- Category section headers with warm accent color bars
- Resource cards get colored left border by type: orange=video, blue=article, gray=link
- Slightly larger text, more breathing room

### Global CSS Changes
- Warmer background: `--sga-warm-white: #FBF8F4`
- Warm shadows: `--shadow-sm: 0 1px 3px rgba(139, 90, 43, 0.06)`
- Card radius: `--radius-md: 16px`
- Add `@keyframes fadeIn` for subtle entrance animation
- Smooth transitions on interactive elements

### Empty States
- Replace "No posts yet" text with friendly illustration/photo + encouraging message
- Use `available-dogs.jpg` for forums empty state
- Use `adoption.jpg` for library empty state
