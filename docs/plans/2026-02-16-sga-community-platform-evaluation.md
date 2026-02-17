# SGA Community Platform Evaluation

**Date:** 2026-02-16
**Context:** Saving Great Animals (SGA) is a dog rescue non-profit evaluating options to replace their Wix-powered community site with something mobile-first, branded, and purpose-built.

**Interactive wireframe:** [View the prototype](https://dsayed.github.io/sga-community/wireframes/sga-community-app.html) — shows what a replacement app could look like across 5 screens (Home, Forums, Training, Library, Directory) on both mobile and desktop.

---

## The Bottom Line

We evaluated off-the-shelf community platforms (Mighty Networks, Disciple, Circle, Skool) and custom build approaches (FlutterFlow, AI-assisted coding, professional development). **None of the off-the-shelf platforms work for SGA.** Here's why:

- **Mighty Networks** ($99/mo) — members open a generic "Mighty Networks" app, not an SGA app. Getting SGA's own branded app costs $33,000/year. The platform is feed-based with weak search, which doesn't solve SGA's content discoverability problem.
- **Disciple** ($300–600/mo) — actually delivers a branded app, but 3–6x over budget.
- **Circle, Skool, others** — same fundamental problem: generic platform feel, no branded app at reasonable cost, content buried in feeds.

**SGA needs a custom-built app.** Three paths can get there — each with real trade-offs. See the [Recommendation](#recommendation) section below.

---

## Current State

SGA currently runs a **Wix-powered private community website** for volunteers, fosters, and adopters. It requires login and serves as both an information resource and a social space.

### Current features:
- **Training courses** — structured learning for fosters/volunteers
- **Resource library** — articles, videos, documents
- **Forums** — peer discussion and community interaction
- **Blog** — from the public website
- **Calendar** — from the public website
- **Member directory** — profiles of people associated with SGA

### Pain points:
- **Low engagement** — people don't come back or participate
- **Poor mobile experience** — clunky on phones, and people need it on the go (at events, fostering, etc.)
- **Content is hard to find** — training, articles, videos are buried and hard to navigate
- The site feels "very website-like" rather than app-like

### Site review (Feb 2026 — full walkthrough of logged-in experience)

**What's working:**
- The **Library is well-organized** — Dog Training broken into 12 specific subcategories (Barking, Crate Training, Fear and Anxiety, Separation Anxiety, etc.), plus Dog Health, Foster & Volunteer Resources, and Other Resources. This structure is valuable and should be preserved in any migration.
- The **home page "Events, Connections, & Resources" section** has the right idea — icon tiles for Training, Library, Blog, Forums, Calendar, Directory with short descriptions. Closest thing to app-like navigation on the site.

**What's broken:**

1. **Forums are dead.** Most recent post is from Sep 2025 (5+ months stale). Of 5 forum categories, "Ask an Expert" has 0 posts. "Community Conversation" has 7. Almost every post is from staff, not community members. Posts get 0 reactions, 0 comments, 9–42 views. This is a broadcast channel, not a community.

2. **Training links out to Google Forms.** The "Access Foster Training Basics" button opens a Google Form, not a course. Training content isn't in the platform. The training section describes 5 modules (dog body language, safe handling, meeting needs, decompression, positive reinforcement) but the actual content lives externally.

3. **Mobile experience is a shrunken website.** On phone viewport: nav bar is cramped, page is an endless scroll, forum cards are tiny, resource tiles are easy to miss. No bottom tab bar, no app-like navigation. It's a responsive website, not a mobile experience.

4. **Directory is bare-bones.** Grid of avatars with Follow/Following counts. No roles (foster, volunteer, adopter), no filters, no bios. Can't tell who does what.

5. **Content is fragmented across external tools.** Training → Google Forms. Volunteer signups → SignUpGenius. Behavioral support → another Google Form. Doug's Place volunteering → SignUpGenius. The site links you *out* rather than keeping you *in*.

6. **Low blog output.** Only 3 blog posts visible.

7. **Wix chat bubble** is the only real-time interaction, but it's a generic Wix feature not tied to community context.

**What any replacement must address:**

| Current problem | Replacement requirement |
|---|---|
| Forums are dead | Push notifications, easy mobile posting, visible activity |
| Training links to Google Forms | Host training content natively — videos, text, progress tracking |
| Mobile is a shrunken website | Mobile-first design — bottom tabs, thumb-friendly, app-like |
| Directory is useless | Roles, filters, bios — "show me all fosters in Bellevue" |
| Content fragmented externally | Bring signups, support requests, training inside the app |
| Library structure is good | Preserve category structure — strongest asset to migrate |
| Staff-only posts | Lower barrier for members — prompts, photo sharing, quick updates |

---

## Requirements & Constraints

| Requirement | Detail |
|---|---|
| **Community size** | 100–500 active members |
| **Budget** | $20–100/mo (flexible if justified) |
| **Admins** | Non-technical, time-poor staff |
| **Users** | Some can barely do email — simplicity is critical |
| **Mobile** | Strong desire for a mobile app experience |
| **All-in-one** | Everything must be in one place — no hybrid multi-tool approaches |
| **Branding** | SGA wants something that feels custom, not generic |
| **Discoverability** | Training, library, forums, directory need to be front-and-center, not buried in menus |
| **Advisor role** | David is advising SGA, not building/maintaining long-term |

### Core value of the community
The platform exists so that **vetted SGA people can help each other and find answers** — whether those answers come from peers (forums) or curated content (library/training).

---

## The Trade-off Triangle

```
          Custom Vision
              /\
             /  \
            /    \
           /      \
          /________\
    Low Budget    No Developer
```

**SGA can realistically have two of these three, not all three.**

- Custom vision + no developer = expensive white-label platform
- Custom vision + low budget = needs a committed volunteer developer
- No developer + low budget = off-the-shelf platform with its generic look

---

## Options Evaluated

### Option A: Off-the-Shelf Community Platform (Mighty Networks)

**What:** Purpose-built community platform with native mobile apps, forums, courses, resource library, member directory, and events.

**Pricing (verified Feb 2026):**

| Plan | Monthly (annual) | Branded App? |
|------|-----------------|-------------|
| Community | $41/mo | No |
| Courses | $99/mo | No |
| Business | $179/mo | No |
| Growth | $425/mo | No |
| Mighty Pro | $33,000/year (~$2,750/mo) | Yes |

Branded app in app stores requires Mighty Pro tier at $33K/year — enterprise pricing, not viable for SGA. All other plans put members inside the generic Mighty Networks app.

**Vendor lock-in risk:** Mighty Networks has restructured and increased pricing multiple times. A non-profit committing recurring revenue to a platform with no data portability and no ability to export community content is exposed to future price increases with no leverage.

**Strengths:**
- Everything in one place — forums, courses, library, directory, events, calendar
- Native mobile app included (iOS + Android)
- Non-technical admins can manage everything
- Onboarding flows, engagement automation, badges, leaderboards
- Can be live in weeks, not months
- 84% member-generated content rate across the platform
- AI-suggested discussion prompts to keep community active

**Weaknesses:**
- **Feed-based, not threaded** — valuable answers scroll away, weak knowledge-base behavior
- **Limited customization** — all Mighty Networks communities look similar, fixed layout
- **Weak search** — directly conflicts with "content is hard to find" pain point
- **Basic course features** — no quizzes, completion certificates, or surveys
- **Doesn't feel like a custom app** — features are "Spaces" in a generic feed structure, not purpose-built sections
- **Branded app (own icon in app store) costs significantly more** — the $99/mo plan puts members inside the Mighty Networks app
- **Group chats can't add members after creation** — annoying for rotating volunteer base
- **Navigation issues** — many sections open as popups rather than full pages

**Examples to try:**
- [LO Sister](https://apps.apple.com/us/app/lo-sister-by-sadie-rob-huff/id1519069830) — branded Mighty Pro app for a faith community
- [Tony Robbins Arena](https://apps.apple.com/us/app/tony-robbins-arena/id1639175511) — 30K+ member community
- [Mighty Networks app](https://apps.apple.com/us/app/mighty-networks/id1081683081) — browse free communities to see the non-branded experience

**Verdict:** Branded app is out of reach at $33K/year. Without it, members open the generic Mighty Networks app — which is just a nicer version of the Wix community SGA already has. The $99–179/mo plans are the fastest path to "something real" but don't match SGA's vision of a custom-feeling branded app with features front-and-center. Significant vendor lock-in risk at any tier.

---

### Option B: White-Label Community App (Disciple)

**What:** Fully branded native app (SGA's name in the app store) with community, content, courses, and events. Disciple handles all the tech.

**Pricing:** Starting ~$300+/mo. Adding a mobile app pushes to ~$458/mo. Scaling to 1,000 members adds ~$108/mo.

**Strengths:**
- Fully branded — own app icon, SGA's name in the app store
- White-labeled — no "Powered by Disciple" visible to members
- Custom layout and branding
- Non-technical admin management
- Push notifications
- No developer needed

**Weaknesses:**
- **3–6x over budget** at $300–600/mo
- Fewer integrations than competitors
- Less mature feature set than Mighty Networks
- Scaling costs add up with member growth

**Examples to try:**
- [The Collective by Disciple](https://apps.apple.com/us/app/the-collective-by-disciple/id1501311891) — Disciple's own showcase
- Browse [disciple.community](https://www.disciple.community/) for more examples

**Verdict:** Closest to what SGA envisions out of the box, but the price is a dealbreaker at current budget. Could work if SGA secures a grant or dedicated donor sponsorship (~$3,600–6,000/year).

---

### Option C: No-Code App Builder (FlutterFlow + Firebase)

**What:** Build a custom native app using FlutterFlow's visual drag-and-drop builder, with Firebase as the backend database and auth system. Publishes real native apps to iOS and Android app stores.

**Pricing:** ~$80/mo (FlutterFlow $70/mo + Apple Developer $99/yr + Google Play $25 one-time).

**Build timeline:** 6–10 weeks with a dedicated builder.

**Strengths:**
- **Custom UI** — SGA gets exactly the app they're envisioning
- Dedicated screens for Training, Library, Forums, Directory, Calendar
- Real native apps in the app store under SGA's name
- Within budget
- AI features in FlutterFlow can generate initial layouts from prompts

**Weaknesses:**
- **Requires a technical builder** — not something a non-technical admin can do
- **Backend expertise needed** — Firebase data modeling, auth configuration, push notifications
- **Ongoing maintenance required** — bug fixes, iOS/Android updates 2–4x/year, new features
- **If the builder leaves, the app slowly breaks** — updates stop, store compliance lapses
- **Firebase search is limited** — may need additional service (Algolia) for good content search
- **Firebase costs scale with usage** — charged per read/write operation
- **FlutterFlow has scaling limits** — performance issues reported on larger/complex apps
- **Content management is a database interface** — not as friendly as Mighty's admin panel
- **Export is one-way** — if you leave FlutterFlow, the exported Flutter code needs refactoring

**Who needs to build it:**
- Someone comfortable with visual tools and logical thinking
- Willing to learn Firebase/database concepts
- Available 10–20 hrs/week during the build
- Available for ongoing maintenance

**If hiring a freelancer:** ~$3,000–8,000 for initial build + ongoing maintenance budget (~$500/year for tweaks).

**Examples to try:**
- [SuperQueer](https://www.flutterflow.io/showcase) — LGBTQ+ community app (440+ partners, 72% engagement)
- [Squadd](https://www.flutterflow.io/showcase) — social community + events app
- Browse [FlutterFlow Showcase](https://www.flutterflow.io/showcase) for more

**Verdict:** Gives SGA the custom app they want at a price they can afford, but trades "no developer needed" for "need a developer sometimes." Only viable if a committed technical volunteer or small freelance budget exists.

---

### Option D: Vibe Coding with AI (Claude + Expo/Next.js + Supabase)

**What:** Build a fully custom app by describing features conversationally to an AI coding assistant (Claude). Uses standard web/mobile frameworks and an open-source backend.

**Recommended tech stack:**

| Layer | Tool | Why |
|---|---|---|
| Framework | Expo (React Native) or Next.js (PWA) | Cross-platform from one codebase |
| Backend | Supabase | Open-source, simpler than Firebase, built-in admin dashboard |
| Auth | Supabase Auth | Email/password, magic links |
| Database | Supabase (Postgres) | Real database with real full-text search |
| Storage | Supabase Storage | Videos, documents, images |
| Hosting | Vercel (web) or app stores (native) | Free tier covers SGA's scale |

**Pricing:** ~$0–20/mo (Supabase free tier + Vercel free tier + existing Claude subscription). Add $99/yr for Apple Developer if going native.

**Build timeline:** 2–4 weeks with a dedicated builder working with Claude.

**Strengths:**
- **Cheapest option** — no platform subscriptions, code is yours
- **Fastest initial build** — describing features is faster than clicking through FlutterFlow menus
- **Total control** — every screen, every interaction, exactly as SGA envisions
- **Real search** — Postgres full-text search actually works; solves the discoverability problem properly
- **No platform lock-in** — standard React/JavaScript code, maintainable by any developer
- **Supabase dashboard** — gives non-technical admins a spreadsheet-like interface to manage content and users
- **PWA option eliminates app store complexity** — no Apple review process, instant updates, installable on phones
- **Future-proof maintenance story** — as AI tools improve, anyone can paste the codebase into Claude and say "fix X"
- **No vendor dependency** — if Supabase or Vercel change pricing, the code runs anywhere

**Weaknesses:**
- **Same maintenance problem as FlutterFlow, arguably worse** — if the builder disappears, SGA has code nobody understands
- **You (David) become the developer** — at least initially, this is your project to own
- **AI-generated code can accumulate technical debt** — a year of patches may make future changes harder
- **Custom code means custom bugs** — no pre-tested components handling edge cases
- **Testing is manual** — no built-in QA like platform solutions provide
- **PWA trade-off** — if going PWA instead of native, push notifications only work on iOS 16.4+ and there's no app store presence

**Native app vs PWA decision:**

| | Native (Expo) | PWA (Next.js) |
|---|---|---|
| App store presence | Yes | No |
| Push notifications | Full support | iOS 16.4+ only |
| Install experience | Download from store | "Add to Home Screen" |
| Updates | App store review process | Instant |
| Deployment complexity | Higher | Much lower |
| Cost | +$99/yr Apple | $0 |

**Build phase comparison with FlutterFlow:**

| Phase | FlutterFlow | Vibe Coding |
|---|---|---|
| Home screen + navigation | 2–3 days | 1–2 hours |
| User auth + profiles | 3–5 days | 2–4 hours |
| Forums (posts, comments, threads) | 1–2 weeks | 1–2 days |
| Resource library (searchable) | 1 week | 1 day |
| Training courses | 1–2 weeks | 1–2 days |
| Member directory | 3–5 days | Half a day |
| Calendar/events | 3–5 days | Half a day |
| Polish, testing, deploy | 1–2 weeks | 1–2 weeks |
| **Total** | **6–10 weeks** | **2–4 weeks** |

**Verdict:** Produces the best app for the least money in the least time — but only if a technical person (likely David) is willing to build it and at least loosely maintain it. The most ambitious option with the highest ceiling and the most personal commitment required.

---

## Options Not Pursued

### Discord/Slack + separate CMS
Rejected because users can barely do email — multiple tools is not workable. Everything must be in one place.

### Custom-coded app (traditional development)
Rejected because no dedicated developer exists and budget doesn't support hiring one ($50K+ for a professional build).

### Circle (community platform)
Similar to Mighty Networks. Slightly cheaper tiers but stricter storage/moderator limits. No branded app at reasonable price point. Same fundamental limitations as Mighty — feed-based, generic structure.

### Skool (community + courses)
Primarily education/creator-focused. Web-only at the time of evaluation. Limited feature set for SGA's needs.

---

## Summary Comparison

| | Mighty Networks | Disciple | FlutterFlow | Vibe Coding |
|---|---|---|---|---|
| **Monthly cost** | $99–425 (no branded app) or $2,750 (branded) | $300–600 | ~$80 | ~$0–20 |
| **Build time** | Days (setup) | Days (setup) | 6–10 weeks | 2–4 weeks |
| **Custom feel** | Low | High | High | Highest |
| **Features front-and-center** | No (feed-based) | Yes | Yes | Yes |
| **Mobile app** | Generic Mighty app (branded = $33K/yr) | Yes (branded) | Yes (branded) | Yes (branded or PWA) |
| **Admin-friendly** | Very | Very | Moderate | Moderate (Supabase dashboard) |
| **Developer needed** | No | No | Yes (build + maintain) | Yes (build + maintain) |
| **Search quality** | Weak | Unknown | Limited (Firebase) | Strong (Postgres) |
| **Vendor lock-in** | High (no data export, price increases) | High | Medium (FlutterFlow) | None |
| **Risk if builder leaves** | N/A | N/A | App slowly breaks | App slowly breaks |
| **Within SGA budget** | Courses plan only ($99) | No | Yes | Yes |

---

## Recommendation

Off-the-shelf platforms don't meet SGA's needs. **SGA needs a custom-built app.** There are three ways to get there:

### Path 1: AI-Assisted Build ("Vibe Coding")
A technical volunteer describes what they want to an AI tool (like Claude) and it writes the code. Think of it as having a free junior developer who works instantly but needs supervision.

| | |
|---|---|
| **Cost** | ~$0–20/mo ongoing |
| **Build time** | 2–4 weeks |
| **Who builds it** | A technical volunteer working with AI |
| **Ongoing effort** | A few hours/month for updates and fixes |
| **What you get** | Fully custom app, SGA-branded, real search, no vendor lock-in |
| **The catch** | Someone technical has to be willing to own it. If that person disappears, the app stops getting updated. |

### Path 2: No-Code Builder (FlutterFlow)
A visual drag-and-drop tool for building real apps. Like building a website in Squarespace, but for mobile apps.

| | |
|---|---|
| **Cost** | ~$80/mo ongoing |
| **Build time** | 6–10 weeks |
| **Who builds it** | A semi-technical volunteer or freelancer ($3K–8K) |
| **Ongoing effort** | A few hours/month for updates and fixes |
| **What you get** | Custom native app in the app store under SGA's name |
| **The catch** | Same dependency on a builder. FlutterFlow itself is a platform — if they raise prices or shut down, you have to migrate. |

### Path 3: Hire a Developer
Pay a professional to build and maintain the app.

| | |
|---|---|
| **Cost** | $15K–50K to build + $3K–10K/year to maintain |
| **Build time** | 2–4 months |
| **Who builds it** | A freelancer or small agency |
| **Ongoing effort** | Paid maintenance contract |
| **What you get** | Professional-grade app, someone accountable |
| **The catch** | The cost. This is the right answer if budget allows, but it's likely out of reach without a grant or major donor. |

### What All Three Paths Require

No matter which path SGA chooses, a custom app means:

1. **Someone has to build it.** There is no way around this. The question is whether that person is a volunteer, a freelancer, or a paid developer.
2. **Someone has to maintain it.** Apps need updates — iOS changes, bugs surface, members request features. Plan for a few hours per month minimum.
3. **Content migration is real work.** The library articles, training modules, and member accounts from the Wix site need to be moved over. Budget 1–2 weeks for this regardless of approach.
4. **Start small.** Launch with Home + Forums + Library. Add Training and Directory in a second phase. Don't try to build everything at once.

### Our Suggestion

**Path 1 (AI-assisted build) if SGA has access to a technical volunteer.** It's the cheapest, fastest, produces the best result, and the code belongs to SGA with zero vendor lock-in. The wireframe prototype linked at the top of this document was built this way in a single session.

**Path 3 (hire a developer) if SGA can fund it.** Worth exploring grants — many exist for non-profit technology. This removes the volunteer dependency problem.

**Path 2 (FlutterFlow) as a middle ground** if the volunteer is semi-technical but not a coder.

---

## Key Sources

- [Mighty Networks](https://www.mightynetworks.com/) — community platform
- [Mighty Pro](https://www.mightynetworks.com/pro) — branded app tier
- [Disciple](https://www.disciple.community/) — white-label community app builder
- [FlutterFlow](https://www.flutterflow.io/) — no-code app builder
- [FlutterFlow Showcase](https://www.flutterflow.io/showcase) — real apps built with FlutterFlow
- [Supabase](https://supabase.com/) — open-source backend platform
- [FlutterFlow Expert Interview](https://www.lowcode.agency/blog/what-you-can-and-cant-do-with-flutterflow) — honest capabilities assessment
- [Mighty Networks vs Circle (2026)](https://www.learningrevolution.net/mighty-networks-vs-circle/) — platform comparison
- [Mighty Networks Review (2026)](https://whop.com/blog/mighty-networks/) — independent review
- [Mighty Networks Review - LinoDash](https://linodash.com/mighty-networks-review/) — 1-year user review
