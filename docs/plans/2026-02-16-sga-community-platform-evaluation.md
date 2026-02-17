# SGA Community Platform Evaluation

**Date:** 2026-02-16
**Context:** Saving Great Animals (SGA) is a dog rescue non-profit evaluating options to replace their Wix-powered community site with something mobile-first, branded, and purpose-built.

**Interactive wireframe:** [View the prototype](https://dsayed.github.io/sga-community/wireframes/sga-community-app.html) — shows what a replacement app could look like across 5 screens (Home, Forums, Training, Library, Directory) on both mobile and desktop.

---

## The Bottom Line

**SGA's Wix Forums are being shut down on March 1, 2026.** Wix has deprecated its Forum app entirely — after that date, all forum data will be deleted. SGA has to act regardless of which direction it chooses.

We evaluated five approaches. Here's the short version:

| Approach | Monthly Cost | Branded App? | Needs a Developer? |
|---|---|---|---|
| **Wix Branded App** | ~$130–360 total (app + site plan) | Yes (iOS + Android) | No |
| **Mighty Networks** | $99–425 (branded = $33K/yr) | Only at $33K/yr | No |
| **Disciple** | $300–600 | Yes | No |
| **FlutterFlow** | ~$80 | Yes | Yes |
| **AI-Assisted Build** | ~$30–60 | Yes | Yes |
| **Hire a Developer** | $15K–50K up front + $3K–10K/yr | Yes | They are the developer |

Each is explained in detail below, along with considerations for [security](#security), [training content & video hosting](#training-content--video-hosting), and [costs that apply regardless of approach](#costs-that-apply-to-any-custom-build).

---

## Current State

SGA currently runs a **Wix-powered private community website** for volunteers, fosters, and adopters. It requires login and serves as both an information resource and a social space.

**Urgent: Wix Forum is being discontinued.** As of April 2025, Wix Forum was removed from the App Market. Posting was disabled October 2025. All forum data will be deleted March 1, 2026. Wix is pushing users to migrate to "Wix Groups," which are more like Facebook-style social feeds — not structured forums.

### Current features:
- **Training courses** — structured learning for fosters/volunteers (currently links to Google Forms)
- **Resource library** — articles, videos, documents (well-organized, worth preserving)
- **Forums** — peer discussion (dead — being deleted by Wix)
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

1. **Forums are dead** (and being deleted). Most recent post was Sep 2025. Almost every post is from staff, not community members. Posts get 0 reactions, 0 comments. This is a broadcast channel, not a community.

2. **Training links out to Google Forms.** The "Access Foster Training Basics" button opens a Google Form, not a course. Training content isn't in the platform.

3. **Mobile experience is a shrunken website.** No bottom tab bar, no app-like navigation. It's a responsive website, not a mobile experience.

4. **Directory is bare-bones.** Grid of avatars with Follow/Following counts. No roles (foster, volunteer, adopter), no filters, no bios. Can't tell who does what.

5. **Content is fragmented across external tools.** Training → Google Forms. Volunteer signups → SignUpGenius. Behavioral support → another Google Form. Doug's Place volunteering → SignUpGenius. The site links you *out* rather than keeping you *in*.

---

## Requirements & Constraints

| Requirement | Detail |
|---|---|
| **Community size** | 100–500 active members |
| **Budget** | TBD — see pricing for each option below |
| **Admins** | Non-technical, time-poor staff (mostly volunteers) |
| **Users** | Widely varying comfort levels with technology — simplicity is critical |
| **Mobile** | Must work as a real app on both iOS and Android |
| **All-in-one** | Everything must be in one place — no hybrid multi-tool approaches |
| **Branding** | SGA wants something that feels custom, not generic |
| **Discoverability** | Training, library, forums, directory need to be front-and-center, not buried in menus |
| **Advisor role** | David is advising SGA, not building/maintaining long-term |

### Core value of the community
The platform exists so that **vetted SGA people can help each other and find answers** — whether those answers come from peers (forums) or curated content (library/training).

### Other considerations
- **Shift scheduling.** SGA currently uses [SignUpGenius](https://www.signupgenius.com) for volunteer shift scheduling. The current Wix site already links out to SignUpGenius for things like Doug's Place volunteering. Any replacement should at minimum integrate SignUpGenius links prominently (not buried in external links like today). Ideally, shift signups would eventually happen inside the app itself, but linking to SignUpGenius is a fine starting point.
- **Member directory.** The directory serves a specific purpose for SGA: connecting fosters with nearby volunteers, finding people by role, and enabling direct messaging. "Show me fosters near me in Bellevue" is a real use case when someone needs emergency help with an animal. It's not essential for launch, but it's valuable.

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

- Custom vision + no developer = expensive platform (Disciple at $300+/mo, or Mighty Pro at $33K/yr)
- Custom vision + low budget = needs a committed volunteer developer
- No developer + low budget = off-the-shelf platform (Wix Branded App or Mighty Networks) with limitations

---

## Options Evaluated

### Option A: Wix Branded App

**What:** [Wix App Builder](https://www.wix.com/app-builder) turns your existing Wix site into a native iOS and Android app under SGA's name in the app stores. Since SGA is already on Wix, this is the path of least resistance. An AI chatbot helps generate the app layout from a description of your goals.

**Pricing:**

| Item | Cost |
|---|---|
| Branded App plan | $99–200/mo |
| Wix website plan (required, separate) | $17–159/mo |
| Apple Developer Program | $99/yr |
| Google Play Developer | $25 one-time |
| **Total** | **~$130–360/mo** depending on plans |

**Strengths:**
- **Least disruption** — SGA is already on Wix, so existing content, members, and admin workflows carry over
- **Branded native app** in both app stores under SGA's name
- **No developer needed** — Wix handles everything
- Syncs automatically between website and app
- Push notifications (basic — no scheduling)
- AI-powered app creation since 2024

**Weaknesses:**
- **Wix just killed Forums** — the core community feature SGA needs is being deprecated (deleted March 1, 2026). Wix Groups is the replacement but it's more like Facebook feeds than structured discussions
- **The app mirrors the website** — if content is buried on the site, it'll be buried in the app. This doesn't solve the discoverability problem
- **No code ownership** — Wix owns everything. Cancel your subscription and the app is removed from stores within 2–3 days
- **No offline mode** — internet required at all times, no local caching
- **No deep linking** — can't link directly to a specific resource or forum post within the app
- **Limited customization** — rigid templates, minimal design control. Still feels like a Wix site in app form
- **Expensive for what it is** — $130–360/mo for a wrapper around the existing site

**Verdict:** Quickest, lowest-effort option. But SGA would be paying significantly more for a platform that just removed a core feature (Forums), while getting limited customization and zero code ownership. Worth a look only if Wix Groups turns out to be an acceptable forum replacement and if the existing site structure is good enough when wrapped in an app.

---

### Option B: Off-the-Shelf Community Platform (Mighty Networks)

**What:** Purpose-built community platform with native mobile apps, forums, courses, resource library, member directory, and events.

**Pricing (verified Feb 2026):**

| Plan | Monthly (annual) | Branded App? |
|------|-----------------|-------------|
| Community | $41/mo | No |
| Courses | $99/mo | No |
| Business | $179/mo | No |
| Growth | $425/mo | No |
| Mighty Pro | $33,000/year (~$2,750/mo) | Yes |

Branded app in app stores requires Mighty Pro tier at $33K/year — enterprise pricing. All other plans put members inside the generic Mighty Networks app.

**Vendor lock-in risk:** Mighty Networks has restructured and increased pricing multiple times. No data portability, no way to export community content.

**Strengths:**
- Everything in one place — forums, courses, library, directory, events, calendar
- Native mobile app included (iOS + Android)
- Non-technical admins can manage everything
- Can be live in days, not months

**Weaknesses:**
- **Feed-based, not threaded** — valuable answers scroll away, weak knowledge-base behavior
- **Limited customization** — all Mighty Networks communities look similar
- **Weak search** — directly conflicts with SGA's discoverability problem
- **Doesn't feel like a custom app** — features are "Spaces" in a generic feed
- **Branded app costs $33K/year** — without it, members open the generic Mighty Networks app
- **Group chats can't add members after creation** — bad for rotating volunteers

**Examples to try:**
- [Mighty Networks app](https://apps.apple.com/us/app/mighty-networks/id1081683081) — browse free communities to see what members experience

**Verdict:** The $99–179/mo plans are the fastest path to "something real" but members open a generic Mighty Networks app, not an SGA app. The platform doesn't solve the discoverability problem. Significant vendor lock-in.

---

### Option C: White-Label Community App (Disciple)

**What:** Fully branded native app (SGA's name in the app store) with community, content, courses, and events. Disciple handles all the tech.

**Pricing:** Starting ~$300+/mo. Adding a mobile app pushes to ~$458/mo.

**Strengths:**
- Fully branded — own app icon, SGA's name in the app store
- White-labeled — no "Powered by Disciple" visible to members
- Custom layout and branding
- Non-technical admin management
- Push notifications
- No developer needed

**Weaknesses:**
- **Expensive** at $300–600/mo ($3,600–7,200/year)
- Fewer integrations than competitors
- Less mature feature set than Mighty Networks

**Verdict:** Closest to what SGA envisions out of the box, but the price is significant. Could work if SGA secures a grant or dedicated donor sponsorship.

---

### Option D: No-Code App Builder (FlutterFlow + Firebase)

**What:** Build a custom native app using FlutterFlow's visual drag-and-drop builder, with Firebase as the backend. Publishes real native apps to iOS and Android app stores.

**Pricing:** ~$80/mo (FlutterFlow $70/mo + Apple Developer $99/yr + Google Play $25 one-time).

**Build timeline:** 6–10 weeks with a dedicated builder.

**Strengths:**
- **Custom UI** — SGA gets exactly the app they're envisioning
- Dedicated screens for Training, Library, Forums, Directory, Calendar
- Real native apps in the app store under SGA's name (iOS + Android)
- AI features in FlutterFlow can generate initial layouts from prompts

**Weaknesses:**
- **Requires a technical builder** — not something a non-technical admin can do
- **Backend expertise needed** — Firebase data modeling, auth, push notifications
- **Ongoing maintenance required** — bug fixes, iOS/Android updates 2–4x/year
- **If the builder leaves, the app slowly breaks** — updates stop, store compliance lapses
- **Firebase search is limited** — may need additional service (Algolia) for content search
- **FlutterFlow itself is a platform** — if they raise prices or shut down, you have to migrate
- **Content management is a database interface** — not as friendly as a purpose-built admin panel

**Who needs to build it:** Someone comfortable with visual tools and logical thinking, willing to learn Firebase/database concepts, available 10–20 hrs/week during the build and a few hours/month ongoing.

**If hiring a freelancer:** ~$3,000–8,000 for initial build + ~$500/year for ongoing maintenance.

**Verdict:** Gives SGA the custom app they want, but trades "no developer needed" for "need a developer sometimes." Only viable if a committed technical volunteer or small freelance budget exists.

---

### Option E: AI-Assisted Build ("Vibe Coding")

**What:** Build a fully custom app by describing features conversationally to an AI coding assistant. The AI writes the code; a technical person reviews and deploys it. Uses standard web/mobile frameworks and an open-source backend.

**A note on bias:** This evaluation was written with the help of Claude, an AI tool made by Anthropic. Claude is also the tool recommended for the "vibe coding" approach. We want to be transparent about that. The honest case for this approach is: it produces the most customizable result at the lowest ongoing cost, with the strongest search and zero vendor lock-in. The honest case against it is: it requires the most technical skill, carries the highest maintenance risk, and AI-generated code can have bugs and security issues that a non-technical person can't catch. It is not the right choice if SGA doesn't have a technical person willing to own it.

**Recommended tech stack:**

| Layer | Tool | Why |
|---|---|---|
| Framework | Expo (React Native) | One codebase → iOS + Android + Web |
| Backend | Supabase | Open-source, built-in admin dashboard |
| Auth | Supabase Auth | Email/password, magic links |
| Database | Supabase (Postgres) | Real full-text search |
| Storage | Supabase Storage | Videos, documents, images |
| Hosting | Vercel (web) or app stores (native) | Free tier covers SGA's scale |

**Pricing (realistic):**

| Item | Cost |
|---|---|
| Supabase (Pro plan for production) | $25/mo |
| Vercel hosting | $0–20/mo |
| Apple Developer Program | $99/yr (~$8/mo) |
| Google Play Developer | $25 one-time |
| Domain name | ~$12/yr (~$1/mo) |
| Video hosting (Bunny CDN) | ~$1–5/mo |
| Claude subscription (for building) | $20/mo (existing) |
| **Total ongoing** | **~$35–60/mo** |

**Build timeline:** 2–4 weeks with a dedicated builder working with AI.

**Strengths:**
- **Cheapest ongoing cost** — no platform subscriptions, code belongs to SGA
- **Total control** — every screen, every interaction, exactly as SGA envisions
- **Real search** — Postgres full-text search actually works; solves the discoverability problem
- **No platform lock-in** — standard React/JavaScript code, any developer can maintain it
- **Supabase dashboard** — gives admins a spreadsheet-like interface to manage content and users
- **Future-proof maintenance** — as AI tools improve, anyone can say "fix X" and get help

**Weaknesses:**
- **Requires a technical person** — someone has to build it and review the AI's output
- **If the builder disappears, the app stops getting updated** — same risk as FlutterFlow
- **AI-generated code can have bugs and security issues** — needs human review
- **Custom code means custom bugs** — no pre-tested components handling edge cases
- **Testing is manual** — no built-in QA like platform solutions provide

**Verdict:** Produces the most custom result for the least ongoing money — but only if a technical person is willing to build it and loosely maintain it. Highest ceiling, most personal commitment.

---

## Options Not Pursued

- **Discord/Slack + separate CMS** — Multiple tools is not workable for this audience. Everything must be in one place.
- **Circle** — Similar to Mighty Networks. No branded app at reasonable cost. Same feed-based limitations.
- **Skool** — Education/creator-focused. Web-only. Limited feature set for SGA's needs.

---

## Training Content & Video Hosting

A core problem with the current site is that training links out to Google Forms. Any replacement needs to host training content natively — videos, articles, and progress tracking inside the app.

**For video hosting**, the options are inexpensive:
- **Bunny CDN** (~$1/mo) — pay-as-you-go, extremely cheap for SGA's scale. Host training videos directly.
- **Vimeo** ($9/mo) — more polished player, privacy controls, easy embedding.
- **YouTube (unlisted videos)** — free, but less professional and less control over the experience.
- **Supabase Storage** — included in the backend if using vibe coding approach. Works for smaller video libraries.

**For course structure**, the app would need:
- Modules with video + text content
- Progress tracking (which modules has this member completed?)
- Completion status visible to admins
- Ability for admins to add/edit courses without a developer

This replaces the Google Forms approach entirely. Whether using FlutterFlow or vibe coding, course functionality is built into the app. For Mighty Networks or Disciple, courses are a built-in feature. For Wix Branded App, Wix has some course/membership features but they're limited.

---

## Security

Any app handling member data needs basic security practices:

**For off-the-shelf platforms (Wix, Mighty Networks, Disciple):** Security is handled by the platform. This is a genuine advantage — they have dedicated security teams, handle compliance, and manage data encryption. SGA doesn't have to think about it.

**For custom builds (FlutterFlow or vibe coding):**
- **Authentication** — Supabase Auth and Firebase Auth both provide industry-standard login security (encrypted passwords, session management, rate limiting). This is not DIY — it's handled by the backend service.
- **Data access** — Row-level security policies in Supabase (or Firestore rules in Firebase) control who can see what. Members can only see their own private data; public content is readable by all authenticated users. This needs to be set up correctly.
- **HTTPS** — All data in transit is encrypted by default with Vercel, Supabase, and Firebase.
- **The real risk** — a custom app is only as secure as the person who builds it. AI-generated code can introduce vulnerabilities (SQL injection, exposed API keys, misconfigured permissions) that a non-technical person wouldn't catch. If going the custom route, a security review by someone experienced is worth the investment before launch.
- **Ongoing** — dependencies need updating, security patches need applying. This is part of the maintenance burden.

**Bottom line:** Off-the-shelf platforms win on security with zero effort. Custom builds can be equally secure but require someone who knows what they're doing to set it up right.

---

## Costs That Apply to Any Custom Build

Regardless of whether SGA chooses FlutterFlow or vibe coding, these costs exist:

| Item | Cost | Notes |
|---|---|---|
| Apple Developer Program | $99/year | Required to publish in the iOS App Store |
| Google Play Developer | $25 one-time | Required to publish in the Google Play Store |
| Domain name | ~$12/year | e.g., community.savinggreatanimals.org |
| Video hosting | $1–9/month | Bunny CDN or Vimeo for training videos |
| Backend hosting | $0–25/month | Supabase or Firebase — free tier may suffice initially |
| Web hosting | $0–20/month | Vercel or similar — free tier likely sufficient |

**Minimum realistic ongoing cost for a custom app: ~$30–60/month.**

This does not include the cost of the person building and maintaining it (volunteer time or freelancer fees).

---

## Summary Comparison

| | Wix Branded App | Mighty Networks | Disciple | FlutterFlow | AI-Assisted Build |
|---|---|---|---|---|---|
| **Monthly cost** | ~$130–360 | $99–425 | $300–600 | ~$80 | ~$35–60 |
| **Up-front build cost** | $0 | $0 | $0 | $0–8K (if freelancer) | $0–8K (if freelancer) |
| **Build time** | Days | Days | Days | 6–10 weeks | 2–4 weeks |
| **Custom feel** | Low (mirrors Wix site) | Low | High | High | Highest |
| **Branded iOS + Android app** | Yes | No (unless $33K/yr) | Yes | Yes | Yes |
| **Features front-and-center** | No (mirrors website) | No (feed-based) | Yes | Yes | Yes |
| **Admin-friendly** | Very | Very | Very | Moderate | Moderate |
| **Developer needed** | No | No | No | Yes | Yes |
| **Search quality** | Same as Wix | Weak | Unknown | Limited | Strong (Postgres) |
| **Forums** | Wix killed them (Groups only) | Built-in | Built-in | Custom-built | Custom-built |
| **Code ownership** | No (removed in 2-3 days if you cancel) | No | No | Partial (export possible) | Yes (fully yours) |
| **Vendor lock-in** | High (Wix) | High | High | Medium | None |
| **Security** | Handled by Wix | Handled by platform | Handled by platform | Needs setup | Needs setup |
| **Risk if builder leaves** | N/A | N/A | N/A | App slowly breaks | App slowly breaks |

---

## Recommendation

There is no perfect option. Each involves a trade-off. Here's how to think about it:

### If SGA wants the least disruption:
**Wix Branded App (~$130–360/mo total).** SGA is already on Wix. This gets a branded app in the stores with minimal effort. But Wix just killed Forums (the replacement is Groups, which is more like Facebook), there's no code ownership (cancel and the app disappears in days), and the app mostly mirrors the current site — which is the site SGA already finds inadequate. Worth a quick look, but be clear-eyed about what it is: more money for the same experience in app form.

### If SGA wants a polished community platform without a developer:
**Disciple ($300–600/mo)** delivers a fully branded, purpose-built community app. It's the most expensive option but removes all technical complexity. Worth it if SGA can fund it through a grant or donor.

**Mighty Networks ($99–179/mo)** is cheaper but members open a generic app, not an SGA-branded one. The platform's weak search and feed-based design don't solve SGA's core problems.

### If SGA has access to a technical volunteer:
**AI-assisted build (~$35–60/mo)** or **FlutterFlow (~$80/mo)** both produce a custom, branded app. The AI-assisted approach is cheaper and faster but requires more technical skill. FlutterFlow is more visual and approachable but costs more and has its own platform lock-in.

Either way, someone technical needs to build it (2–10 weeks depending on approach) and commit to a few hours per month of ongoing maintenance. If that person disappears, the app eventually breaks.

### If SGA can secure a grant or significant funding:
**Hire a developer ($15K–50K up front).** This is the most sustainable long-term answer. A professional builds it, a maintenance contract keeps it running, and SGA isn't dependent on a volunteer. Non-profit technology grants exist specifically for this.

### What we'd suggest exploring first:

1. **Check what Wix Branded App actually looks like** with SGA's existing content. It's the least work, though at $130–360/mo it's not the cheapest, and the Forum deprecation is a problem.
2. **If not good enough**, the decision comes down to: does SGA have a technical person willing to volunteer, or does SGA have money?
   - Technical person → AI-assisted build or FlutterFlow
   - Money → Disciple or hire a developer
   - Neither → Mighty Networks at $99/mo as a stopgap while SGA figures out the longer-term answer

---

## Key Sources

- [Wix App Builder](https://www.wix.com/app-builder) — Wix's branded mobile app product
- [Wix Branded App Pricing](https://support.wix.com/en/article/branded-app-by-wix-purchasing-a-branded-app-plan) — purchasing details
- [Wix Branded App Limitations](https://natively.dev/wix-for-mobile-apps) — independent review of what Wix apps can't do
- [Wix Forum Deprecation](https://support.wix.com/en/article/wix-forum-move-your-forum-to-wix-groups) — Forum shutdown timeline and migration to Groups
- [Mighty Networks](https://www.mightynetworks.com/) — community platform
- [Mighty Pro](https://www.mightynetworks.com/pro) — branded app tier ($33K/yr)
- [Disciple](https://www.disciple.community/) — white-label community app builder
- [FlutterFlow](https://www.flutterflow.io/) — no-code app builder
- [FlutterFlow Showcase](https://www.flutterflow.io/showcase) — real apps built with FlutterFlow
- [Supabase](https://supabase.com/) — open-source backend platform
- [Bunny CDN](https://bunny.net/) — affordable video hosting (~$1/mo)
- [Wix Branded App Pricing](https://www.davydovconsulting.com/post/wix-branded-app-pricing-everything-you-need-to-know) — cost breakdown
