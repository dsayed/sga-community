# SGA Community App — High-Level Spec

**Date:** 2026-02-16
**Wireframe:** [Interactive prototype](https://dsayed.github.io/sga-community/wireframes/sga-community-app.html)
**Context:** This spec covers what needs to be built if SGA goes with a custom app (FlutterFlow or AI-assisted build). It's intentionally simple — the goal is a useful app, not a feature-rich platform.

---

## What We're Building

A mobile-first community app for SGA's fosters, volunteers, and adopters. Works on iOS, Android, and desktop browsers. Five main sections:

1. **Home** — what's happening now, quick links to everything
2. **Forums** — community discussion (replaces the Wix Forum being shut down)
3. **Training** — onboarding content for new fosters/volunteers with progress tracking
4. **Library** — searchable articles and resources (migrated from the existing Wix library)
5. **Directory** — find people by role and location

Plus integration with [SignUpGenius](https://www.signupgenius.com) for volunteer shift scheduling.

---

## Screens

### 1. Home

**What it does:** Personalized landing page. Shows what's new and gives quick access to everything.

**Elements:**
- Greeting with member's name
- Urgent needs banner (when there's a time-sensitive foster/volunteer request)
- Quick-action tiles: Training, Library, Forums, Directory, Volunteer Shifts
- Recent activity feed (latest forum posts)
- Upcoming events (if any)

**The "Volunteer Shifts" tile** links directly to SGA's SignUpGenius page. Not a deep integration — just a prominent, easy-to-find link. This is a big improvement over the current site where SignUpGenius links are buried in page content.

### 2. Forums

**What it does:** Community discussion. Replaces the Wix Forum.

**Elements:**
- Category tabs (e.g., Urgent Needs, Community Chat, Ask an Expert)
- Post composer at the top — "What's happening with your foster?" prompt with photo upload
- Feed of posts with author, category tag, timestamp, reactions, comment count
- Tap a post to see the full thread with comments

**Keep it simple:** Posts are text + optional photos. No rich formatting, no video uploads, no polls. Just a place to ask questions and share updates.

**Push notifications:** Members get notified when someone posts in Urgent Needs, or replies to their post.

### 3. Training

**What it does:** Structured onboarding content with progress tracking. This is NOT a course platform — it's a reading list with a completion checklist.

**Elements:**
- Progress bar showing how many modules are complete
- List of training modules (currently 5: Dog Body Language, Safe Handling, Meeting Needs, Decompression, Positive Reinforcement)
- Each module shows: title, short description, status (Not Started / In Progress / Completed)
- Tap a module to view the content
- "Mark as Complete" button at the bottom of each module

**What a module looks like inside:**
- Title and description
- Content: text with embedded images — like a blog post or a set of slides
- That's it. No quizzes, no video players, no interactive elements.

**How content gets authored:**
This is the part that could easily become scope creep. Here are three options, ordered from simplest to most work:

| Approach | How admins create content | Effort to build | Maintenance |
|---|---|---|---|
| **Link out** | Content lives in Google Docs. The app shows the module list with progress tracking, and each module opens a Google Doc or PDF. | Very low | Admin updates the Google Doc directly — no app changes needed |
| **Upload slides/images** | Admin uploads a series of images (like slides) through a simple admin page. The app shows them in order. | Low | Admin creates slides in Canva/Google Slides, exports as images, uploads |
| **Built-in editor** | Admin writes content in a simple rich text editor inside the app (like a blog post editor — bold, images, headings). | Medium | Nicest experience, but more to build and maintain |

**Recommendation:** Start with "Link out" or "Upload slides" for launch. Build the rich text editor later only if the admin team asks for it. The current approach is literally Google Forms — anything is an upgrade.

**Admin view:** A simple page showing all members and which modules they've completed. "Show me who hasn't finished training" is the key use case for staff.

### 4. Library

**What it does:** Searchable collection of articles, videos, and resources. Migrated from the current Wix library.

**Elements:**
- Search bar at the top (this is the most important element — a foster at 10pm with a barking dog needs to find "barking" resources fast)
- Category filter chips (Dog Training, Dog Health, Foster Resources, Volunteer, etc.)
- List of resources showing: type icon (article/video/link), title, short description, reading time
- Tap a resource to view it

**What a resource looks like:**
- Most library items are links to external articles or YouTube videos — the library is a curated directory, not a content host
- Some may be internal articles (text + images)
- For videos: embed YouTube or link to Vimeo. Don't host video files directly.

**How content gets authored:**
Admin adds a resource through a simple form: title, description, category, type (article/video/link), URL (if external) or content (if internal). This is straightforward database work — no fancy CMS needed.

### 5. Directory

**What it does:** Find and connect with other SGA members.

**Elements:**
- Search bar
- Role filter buttons: All, Fosters, Volunteers, Adopters, Staff
- Member cards showing: name, role badge, location, message button
- Tap a member to see their profile

**Not essential for launch.** This is a nice-to-have. The forums already let people connect. Directory can come in Phase 2.

---

## SignUpGenius Integration

SGA uses SignUpGenius for volunteer shift scheduling. The integration is simple:

- **Home screen:** A "Volunteer Shifts" tile that links to SignUpGenius
- **Optionally:** An embedded view of the SignUpGenius page within the app (WebView)
- **Optionally:** A push notification when new shifts are posted (requires admin to trigger manually — "Notify members about new shifts")

This is NOT an API integration. SignUpGenius doesn't need to talk to the app's database. It's just a well-placed link that members can actually find.

If SGA eventually wants in-app shift signups, that's a future feature, not a launch requirement.

---

## What's NOT in scope

- **Video hosting** — link to YouTube/Vimeo, don't host videos
- **Real-time chat / DMs** — forums are enough for launch. DMs can come later.
- **Calendar** — link to the existing SGA calendar (Google Calendar or similar). Don't build a calendar.
- **Blog** — the public website handles this. Don't duplicate it.
- **E-commerce / donations** — out of scope entirely
- **Quizzes / certificates** — training is a checklist, not an exam
- **Admin analytics dashboard** — Supabase dashboard shows the data. Don't build a custom one.
- **Onboarding flow** — a welcome screen with 2-3 slides explaining the app is fine. Nothing more.

---

## Technical Decisions

### Native App vs PWA

| | Native (Expo/React Native) | PWA (Next.js) |
|---|---|---|
| App store presence | Yes | No |
| Push notifications | Full support | iOS 16.4+ only |
| Install experience | Download from App Store / Google Play | "Add to Home Screen" |
| Updates | Requires app store review | Instant |
| Build complexity | Higher | Lower |

**Recommendation:** Start with a PWA if speed matters. Add native apps later if app store presence turns out to be important. A PWA can be built faster and updated without app store review.

### Data Model (simplified)

**Users:** name, email, role (foster/volunteer/adopter/staff), location, avatar, joined date

**Forum Posts:** author, category, title, body, images, created date
**Forum Comments:** post, author, body, created date

**Training Modules:** title, description, order, content (text/images or external URL)
**Training Progress:** user, module, status (not started/in progress/completed), completed date

**Library Resources:** title, description, category, type (article/video/link), URL, content (if internal), created date

**Directory:** pulls from Users table — no separate data needed

---

## Build Phases

### Phase 1 (Launch — 2-4 weeks)
- Home screen with quick links and activity feed
- Forums with categories, posting, comments, push notifications
- Library with search and category filters (migrate existing content)
- Basic training with module list and progress tracking (link out to Google Docs for content)
- Auth (login/signup, invite-only)
- SignUpGenius link on home screen

### Phase 2 (After launch — as needed)
- Directory with role filters and messaging
- In-app training content (upgrade from linking out to Google Docs)
- Push notification for new volunteer shifts
- Profile pages

### Phase 3 (If demand exists)
- Direct messaging between members
- Calendar integration
- In-app shift signups (replace SignUpGenius)
- Rich text editor for training content authoring

---

## Open Questions

1. **Who will author training content?** This determines whether we need a built-in editor or can link to Google Docs.
2. **Is the app invite-only or open registration?** The current Wix site requires login — presumably members are invited.
3. **What existing library content needs migrating?** How many articles/resources are there? Are they Wix-hosted or external links?
4. **Does SGA want push notifications?** If yes, native app or PWA with iOS 16.4+ limitation?
5. **Who will moderate the forums?** Same staff who manage the Wix site?
