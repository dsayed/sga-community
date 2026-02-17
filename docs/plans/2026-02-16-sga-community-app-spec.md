# SGA Community App — High-Level Spec

**Date:** 2026-02-16
**Wireframe:** [Interactive prototype](https://dsayed.github.io/sga-community/wireframes/sga-community-app.html) (click through all 5 screens — Home, Forums, Training, Library, Directory — on both mobile and desktop)
**Context:** This is an MVP spec for a custom-built SGA community app, intended to replace the current Wix community site.

---

## Approach: MVP

We're taking a minimum viable product approach. The goal is to launch something useful quickly, then improve based on what members actually need — not to build a feature-rich platform up front.

**What MVP means here:**
- Launch with the core features that solve the biggest problems (forums, library search, training progress)
- Use the simplest implementation that works (link to Google Docs for training content, link to SignUpGenius for scheduling)
- Add polish and features after launch based on real feedback
- Avoid building things "just in case" — if nobody asks for it, don't build it

---

## FlutterFlow vs AI-Assisted Build (Vibe Coding)

Before getting into what we're building, the first decision is *how* to build it. Both approaches produce a custom, branded app. The difference is in how the building happens.

### FlutterFlow

A visual drag-and-drop tool. You build screens by placing components (buttons, lists, text fields) and connecting them to a database. Similar to building a website in Squarespace, but for mobile apps.

| | |
|---|---|
| **Monthly cost** | ~$80/mo (FlutterFlow $70 + app store fees) |
| **Backend** | Firebase (Google's database service) |
| **Who can build it** | Someone comfortable with visual tools and logical thinking. Doesn't need to write code, but needs to understand how data connects to screens. |
| **Build time** | 6–10 weeks |
| **What you get** | Native iOS + Android apps compiled from Flutter/Dart code |
| **Search** | Limited — Firebase doesn't have great full-text search. May need a third-party service. |
| **Maintenance** | Same person (or someone similar) needs to make changes in FlutterFlow |
| **Lock-in** | Medium — code can be exported, but the exported Flutter code needs cleanup to run independently |
| **Best for** | Someone who thinks visually and prefers clicking over typing |

### AI-Assisted Build (Vibe Coding)

You describe what you want in plain English to an AI coding assistant (like Claude). It writes the code. You review it, run it, and deploy it.

| | |
|---|---|
| **Monthly cost** | ~$35–60/mo (Supabase + hosting + app store fees) |
| **Backend** | Supabase (open-source, Postgres database) |
| **Who can build it** | Someone comfortable with technology — can follow instructions, run commands in a terminal, review output. Doesn't need to be a software engineer, but needs more technical comfort than FlutterFlow. |
| **Build time** | 2–4 weeks |
| **What you get** | Standard React/JavaScript app — works on iOS, Android, and web from one codebase |
| **Search** | Strong — Postgres has built-in full-text search |
| **Maintenance** | Anyone with AI tools can modify the code by describing what they want changed |
| **Lock-in** | None — standard code, runs anywhere, any developer can maintain it |
| **Best for** | Someone comfortable at a computer who wants maximum control and lowest cost |

### Which to choose?

| Question | If yes → |
|---|---|
| Does the builder prefer visual/drag-and-drop tools? | FlutterFlow |
| Is search quality important? (finding resources in the library) | Vibe coding (Postgres search) |
| Does SGA want to minimize ongoing costs? | Vibe coding ($35–60 vs $80/mo) |
| Does SGA want zero vendor lock-in? | Vibe coding (standard code, no platform dependency) |
| Is the builder uncomfortable with terminals/command lines? | FlutterFlow |
| Does SGA want the fastest possible launch? | Vibe coding (2–4 weeks vs 6–10) |

Either approach works. The wireframes and spec below apply to both — the screens and features are the same regardless of how they're built.

---

## What We're Building

A mobile-first community app for SGA's fosters, volunteers, and adopters. Works on iOS, Android, and desktop browsers. Five main sections accessible from a bottom tab bar (mobile) or sidebar (desktop):

1. **Home** — what's happening now, quick links to everything
2. **Forums** — community discussion (replaces the Wix Forum being shut down)
3. **Training** — onboarding content with progress tracking
4. **Library** — searchable articles and resources
5. **Directory** — find people by role and location (Phase 2)

Plus integration with [SignUpGenius](https://www.signupgenius.com) for volunteer shift scheduling.

---

## Screens

Each screen references the [interactive wireframe prototype](https://dsayed.github.io/sga-community/wireframes/sga-community-app.html). Click the screen name at the top of the prototype to navigate between them.

### 1. Home
**[View wireframe →](https://dsayed.github.io/sga-community/wireframes/sga-community-app.html)** (Home tab)

**What it does:** Personalized landing page. Shows what's new and gives quick access to everything.

**Elements:**
- Greeting with member's name
- Urgent needs banner (when there's a time-sensitive foster/volunteer request)
- Quick-action tiles: Training, Library, Forums, Directory, Volunteer Shifts
- Recent activity feed (latest forum posts)

**The "Volunteer Shifts" tile** links directly to SGA's SignUpGenius page. Not a deep integration — just a prominent, easy-to-find link. Currently SignUpGenius links are buried in page content on the Wix site.

**Wireframe notes:** The prototype shows the mobile view with a bottom tab bar (5 tabs) and the desktop view with a sidebar. Both are the same app, responsive to screen size.

---

### 2. Forums
**[View wireframe →](https://dsayed.github.io/sga-community/wireframes/sga-community-app.html)** (Forums tab)

**What it does:** Community discussion. Replaces the Wix Forum (being discontinued March 2026).

**Elements:**
- Category tabs (e.g., Urgent Needs, Community Chat, Ask an Expert, Events)
- Post composer at the top — "What's happening with your foster?" prompt with photo upload
- Feed of posts with author, category tag, timestamp, reactions, comment count
- Tap a post to see the full thread with comments

**Keep it simple:** Posts are text + optional photos. No rich formatting, no video uploads, no polls.

**Push notifications:** Members get notified when someone posts in Urgent Needs, or replies to their post.

**Wireframe notes:** The prototype shows category tabs with post counts (e.g., "Needs (54)") and a low-friction posting prompt at the top designed to encourage member participation.

---

### 3. Training
**[View wireframe →](https://dsayed.github.io/sga-community/wireframes/sga-community-app.html)** (Training tab)

**What it does:** Structured onboarding content with progress tracking. This is NOT a course platform — it's a reading list with a completion checklist.

**Elements:**
- Progress bar showing how many modules are complete (e.g., "2 of 5 modules completed")
- List of training modules (currently 5: Dog Body Language, Safe Handling, Meeting Needs, Decompression, Positive Reinforcement)
- Each module shows: title, short description, status (Not Started / In Progress / Completed)
- Tap a module to view the content
- "Mark as Complete" button at the bottom of each module

**What a module looks like inside:**
- Title and description
- Content: text with embedded images — like a blog post or a set of slides
- No quizzes, no video players, no interactive elements

**How content gets authored (MVP):**

For launch, training content lives outside the app. The app provides the structure and progress tracking.

| Approach | How admins create content | Effort to build |
|---|---|---|
| **Link out (recommended for MVP)** | Content lives in Google Docs or PDFs. App shows the module list with progress tracking; tapping a module opens the doc. | Very low |
| **Upload slides/images** | Admin uploads a series of images (from Canva/Google Slides). App shows them in order. | Low |
| **Built-in editor (Phase 3)** | Admin writes in a rich text editor inside the app. | Medium — only build this if admins ask for it |

**Admin view:** A simple page showing all members and which modules they've completed. "Show me who hasn't finished training" is the key use case.

**Wireframe notes:** The prototype shows the polished end-state with in-app content. For MVP, the module cards look the same but tapping one opens a Google Doc or PDF instead of in-app content.

---

### 4. Library
**[View wireframe →](https://dsayed.github.io/sga-community/wireframes/sga-community-app.html)** (Library tab)

**What it does:** Searchable collection of articles, videos, and resources. Migrated from the current Wix library (which is well-organized and worth preserving).

**Elements:**
- Search bar at the top — this is the most important element
- Category filter chips (Dog Training, Dog Health, Foster Resources, Volunteer, etc.)
- List of resources showing: type icon (article/video/link), title, short description
- Tap a resource to view it

**What a resource looks like:**
- Most library items are links to external articles or YouTube videos — the library is a curated directory, not a content host
- Some may be internal articles (text + images)
- For videos: embed YouTube or link to Vimeo. Don't host video files.

**How content gets authored:**
Admin adds a resource through a simple form: title, description, category, type (article/video/link), URL or content. Straightforward — no fancy CMS needed.

**Wireframe notes:** The prototype shows the search bar prominently at the top, with category filters as horizontal scrollable chips. Resources are cards showing type (Video/Article), estimated time, and a short description.

---

### 5. Directory (Phase 2)
**[View wireframe →](https://dsayed.github.io/sga-community/wireframes/sga-community-app.html)** (Directory tab)

**What it does:** Find and connect with other SGA members.

**Elements:**
- Search bar
- Role filter buttons: All, Fosters, Volunteers, Adopters, Staff
- Member cards showing: name, role badge, location, message button

**Not in the MVP.** Forums let people connect for now. Directory comes in Phase 2.

**Wireframe notes:** The prototype shows the full directory with role filters and location. The mobile view shows a clean card list; desktop shows the same in a wider layout.

---

## SignUpGenius Integration

SGA uses [SignUpGenius](https://www.signupgenius.com) for volunteer shift scheduling (e.g., Doug's Place volunteering).

**MVP:** A "Volunteer Shifts" tile on the home screen that opens SignUpGenius in the browser. That's it.

**Later (if needed):**
- Embedded view of SignUpGenius within the app
- Push notification when new shifts are posted

This is NOT an API integration. It's a well-placed link.

---

## What's NOT in Scope

- **Video hosting** — link to YouTube/Vimeo, don't host videos
- **Real-time chat / DMs** — forums are enough for launch
- **Calendar** — link to the existing SGA calendar. Don't build a calendar.
- **Blog** — the public website handles this
- **E-commerce / donations** — out of scope
- **Quizzes / certificates** — training is a checklist, not an exam
- **Custom admin dashboard** — Supabase/Firebase dashboards show the data
- **Course authoring tool** — link to Google Docs for MVP
- **In-app shift scheduling** — link to SignUpGenius for MVP

---

## Technical Decisions

### Native App vs PWA

| | Native (Expo/React Native) | PWA (Next.js) |
|---|---|---|
| App store presence | Yes | No |
| Push notifications | Full support | iOS 16.4+ only |
| Install experience | Download from store | "Add to Home Screen" |
| Updates | Requires app store review | Instant |
| Build complexity | Higher | Lower |

**Recommendation:** Start with a PWA if speed matters most. It's faster to build and update. Add native apps later if app store presence turns out to be important.

### Data Model (simplified)

**Users:** name, email, role (foster/volunteer/adopter/staff), location, avatar, joined date

**Forum Posts:** author, category, title, body, images, created date
**Forum Comments:** post, author, body, created date

**Training Modules:** title, description, order, content URL (Google Doc/PDF link)
**Training Progress:** user, module, status (not started/in progress/completed), completed date

**Library Resources:** title, description, category, type (article/video/link), URL, created date

**Directory:** uses the Users table — no separate data needed

---

## Build Phases

### Phase 1 — MVP (2–4 weeks for vibe coding, 6–10 weeks for FlutterFlow)
- Auth (invite-only login)
- Home screen with quick links, activity feed, and SignUpGenius link
- Forums with categories, posting, comments, push notifications
- Library with search and category filters (migrate existing content from Wix)
- Training with module list, progress tracking, link-out to Google Docs for content
- Bottom tab navigation (mobile) / sidebar (desktop)

### Phase 2 — After Launch (as needed)
- Directory with role filters
- In-app training content (upgrade from Google Docs links)
- Profile pages
- Push notifications for new volunteer shifts

### Phase 3 — If Demand Exists
- Direct messaging between members
- Calendar integration
- In-app shift signups (replace SignUpGenius link)
- Rich text editor for training content authoring

---

## Open Questions for SGA

1. **Who will author training content?** If existing staff can use Google Docs, we can link out for MVP. If they want to write directly in the app, that's Phase 3.
2. **Is the app invite-only?** The current Wix site requires login — presumably members are invited by staff.
3. **How much library content needs migrating?** How many articles/resources are on the current site? Are they links to external content or hosted on Wix?
4. **Does SGA want app store presence?** If yes, we build native (adds cost and time). If not, a PWA is faster and cheaper.
5. **Who will moderate the forums?** Same people who manage the current Wix site?
6. **FlutterFlow or vibe coding?** Depends on who's building it — see comparison above.
