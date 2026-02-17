# SGA Community Platform Evaluation

**Date:** 2026-02-16
**Context:** Saving Great Animals (SGA) is a dog rescue non-profit evaluating options to replace their Wix-powered community site with something mobile-first, branded, and purpose-built.

**Interactive wireframe:** [View the prototype](https://dsayed.github.io/sga-community/wireframes/sga-community-app.html) — shows what a replacement app could look like across 5 screens (Home, Forums, Training, Library, Directory) on both mobile and desktop.

---

## Update: We Built It (Feb 17, 2026)

We decided to quickly test the AI-assisted build approach (Option E below) to see how far we could get. The answer: all the way to a deployed app in about a day.

**What happened:** David spent roughly 6 hours over two sessions with Claude Code (Anthropic's AI coding tool). The first session (~4 hrs) built the entire MVP — login, forums with categories and photo upload, 5-module training program with step-through content, a searchable resource library with 21 articles/videos, and admin tools for content authoring. The second session (~2 hrs) set up Supabase, seeded real content, deployed to Vercel, and did a visual refresh with real SGA photography and branding.

**The result:** https://sgacommunity.vercel.app — a working PWA with SGA's logo, real dog photos, warm community aesthetic, and all the core features from the spec. It works on phones, tablets, and desktops. It's not in the app stores (it's a PWA, not a native app), but it can be installed to a phone's home screen and feels app-like.

**Actual tech stack:** Next.js 16 (not Expo as originally suggested below), Supabase, Tailwind CSS, deployed on Vercel. We went with a PWA instead of native apps because it's faster to build, instant to update, and works on every platform without app store review.

**Actual cost:** ~$25/mo (Supabase free tier + Vercel free tier). Could go to $50/mo if usage grows past free tiers.

**What this means for the evaluation below:** The comparative analysis is still accurate and useful context for why we chose this approach. The main thing that changed is the build timeline — "2-4 weeks" turned out to be closer to 1 day with current AI tools. The rest of the trade-offs (maintenance burden, need for a technical person, vendor lock-in comparisons) all still apply.

---

## The Bottom Line

SGA's community site was built on Wix and has solid bones — a well-organized resource library, training content, and a clear structure. But the platform has limitations that make it hard for the site to reach its potential. The mobile experience isn't app-like, content is spread across external tools (Google Forms, SignUpGenius), and **Wix is shutting down its Forum feature on March 1, 2026** — meaning SGA needs to find a replacement for community discussion regardless.

Note: Wix disabled forum posting in October 2025, which explains why the forums appear inactive. The site's navigation includes a "Groups" link, which may have been added automatically by Wix as part of the forum deprecation.

We looked at five approaches for what comes next:

| Approach | Monthly Cost | The Good | The Catch |
|---|---|---|---|
| **Wix Branded App** | ~$130–360 | Already on Wix, least effort | Mirrors existing site, Wix owns everything, forums gone |
| **Mighty Networks** | $49–430 | Ready-made community platform | Generic feel, branded app requires custom (expensive) tier |
| **Disciple** | $729+ | Branded app, no developer needed | Very expensive for a non-profit |
| **FlutterFlow** | ~$80 | Custom app, visual drag-and-drop builder | Someone comfortable with tech needs to build it (a few hrs/month to maintain) |
| **AI-Assisted Build** | ~$35–60 | Cheapest, most customizable, no vendor lock-in | Someone comfortable with tech needs to build it (a few hrs/month to maintain) |
| **Hire a Developer** | $15K–50K up front | Professional result, someone accountable | The cost |

Each is explained in detail below, along with considerations for [security](#security), [training content & video hosting](#training-content--video-hosting), and [costs that apply regardless of approach](#costs-that-apply-to-any-custom-build).

---

## Current State

SGA currently runs a **Wix-powered private community website** for volunteers, fosters, and adopters. It requires login and serves as both an information resource and a social space.

**Urgent: Wix Forum is being discontinued.** As of April 2025, Wix Forum was removed from the App Market. Posting was disabled October 2025. All forum data will be deleted March 1, 2026. Wix is pushing users to migrate to "Wix Groups," which are more like Facebook-style social feeds — not structured forums.

### Current features:
- **Training courses** — structured learning for fosters/volunteers (currently links to Google Forms)
- **Resource library** — articles, videos, documents (well-organized, worth preserving)
- **Forums** — peer discussion (Wix is discontinuing this feature March 2026)
- **Blog** — from the public website
- **Calendar** — from the public website
- **Member directory** — profiles of people associated with SGA

### Pain points:
- **Low engagement** — people don't come back or participate
- **Poor mobile experience** — clunky on phones, and people need it on the go (at events, fostering, etc.)
- **Content discoverability** — training, articles, and videos could be easier to find and navigate
- The site feels "very website-like" rather than app-like

### Site review (Feb 2026 — full walkthrough of logged-in experience)

**What's working:**
- The **Library is well-organized** — Dog Training broken into 12 specific subcategories (Barking, Crate Training, Fear and Anxiety, Separation Anxiety, etc.), plus Dog Health, Foster & Volunteer Resources, and Other Resources. This structure is valuable and should be preserved in any migration.
- The **home page "Events, Connections, & Resources" section** has the right idea — icon tiles for Training, Library, Blog, Forums, Calendar, Directory with short descriptions. Closest thing to app-like navigation on the site.

**Opportunities for improvement:**

1. **Forums.** Wix disabled forum posting in October 2025 and is deleting the Forum feature March 1, 2026, which explains why the forums appear inactive. Wix's recommended replacement is "Groups" (a Facebook-style feed). Any new platform would need its own discussion/community feature.

2. **Training.** Currently links out to Google Forms for course access. Hosting training content directly in the platform (with video, text, and progress tracking) would be a better experience.

3. **Mobile experience.** The site is responsive but not mobile-first — no bottom tab bar or app-like navigation. Members using phones at events or while fostering would benefit from a more app-like experience.

4. **Directory.** Currently a grid of avatars with Follow/Following counts. Adding roles (foster, volunteer, adopter), location, and filtering would make it more useful for connecting people.

5. **External tools.** Some functionality lives outside the site — training via Google Forms, volunteer signups via SignUpGenius, behavioral support via another form. Bringing more of this into one place would reduce friction for members.

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

- Custom vision + no developer = expensive platform (Disciple at $729+/mo, or Mighty Pro at custom enterprise pricing)
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

| Plan | Monthly | Annual (per month) | Branded App? |
|------|---------|-------------------|-------------|
| Community | — | $49/mo | No |
| Courses | $129/mo | $109/mo | No |
| Business | $229/mo | $189/mo | No |
| Growth | $430/mo | $360/mo | No |
| Mighty Pro | Custom pricing | Custom pricing | Yes |

All plans except Mighty Pro put members inside the generic Mighty Networks app. Only Mighty Pro includes a branded app in the app stores — pricing is not published and requires a sales conversation.

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
- **Branded app requires Mighty Pro** — custom enterprise pricing (not published), without it members open the generic Mighty Networks app
- **Group chats can't add members after creation** — bad for rotating volunteers

**Examples to try:**
- [Mighty Networks app](https://apps.apple.com/us/app/mighty-networks/id1081683081) — browse free communities to see what members experience

**Verdict:** The $49–189/mo plans are the fastest path to "something real" but members open a generic Mighty Networks app, not an SGA-branded one. Vendor lock-in is high — no data export.

---

### Option C: White-Label Community App (Disciple)

**What:** Fully branded native app (SGA's name in the app store) with community, content, courses, and events. Disciple handles all the tech.

**Pricing:**

| Plan | Monthly (annual billing) | Members |
|------|-------------------------|---------|
| Grow | $729/mo | Up to 500 |
| Pro | $1,167/mo | Up to 5,000 |
| Enterprise | Custom | Custom |

Courses feature is an add-on at $108/mo extra. Additional members and storage also cost extra.

**Strengths:**
- Fully branded — own app icon, SGA's name in the app store
- White-labeled — no "Powered by Disciple" visible to members
- Custom layout and branding
- Non-technical admin management
- Push notifications
- No developer needed

**Weaknesses:**
- **Very expensive** — $729/mo minimum ($8,748/year) for up to 500 members
- Key features (courses, analytics) cost extra on top of base price
- Fewer integrations than competitors
- Less mature feature set than Mighty Networks

**Verdict:** Closest to what SGA envisions out of the box, but the price is likely out of reach for a non-profit at $729+/mo.

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

**Who needs to build it:** Not a software engineer — more like someone who's good with spreadsheets and comfortable learning new tools. FlutterFlow is visual (drag-and-drop), but you do need to understand how data is organized and how screens connect. Available 10–20 hrs/week during the build, then a few hours/month for updates.

**If hiring a freelancer:** ~$3,000–8,000 for initial build + ~$500/year for ongoing maintenance.

**Verdict:** Gives SGA the custom app they want, but trades "no developer needed" for "need a developer sometimes." Only viable if a committed technical volunteer or small freelance budget exists.

---

### Option E: AI-Assisted Build ("Vibe Coding")

**What:** Build a fully custom app by describing features conversationally to an AI coding assistant. The AI writes the code; a technical person reviews and deploys it. Uses standard web/mobile frameworks and an open-source backend.

**A note on bias:** This evaluation was written with the help of Claude, an AI tool made by Anthropic. Claude is also the tool recommended for the "vibe coding" approach. We want to be transparent about that. The honest case for this approach is: it produces the most customizable result at the lowest ongoing cost, with the strongest search and zero vendor lock-in. The honest case against it is: it requires the most technical skill, carries the highest maintenance risk, and AI-generated code can have bugs and security issues that a non-technical person can't catch. It is not the right choice if SGA doesn't have a technical person willing to own it.

**Tech stack (what we actually used):**

| Layer | Tool | Why |
|---|---|---|
| Framework | Next.js 16 (PWA) | Server rendering, instant deploys, works on all platforms |
| Backend | Supabase | Open-source, built-in admin dashboard |
| Auth | Supabase Auth | Email/password, invite-only |
| Database | Supabase (Postgres) | Real full-text search |
| Storage | Supabase Storage | Forum photos, training images |
| Hosting | Vercel | Zero-config, free tier covers SGA's scale |

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

**Build timeline:** Originally estimated 2–4 weeks. Actual build took ~6 hours over two sessions with Claude Code.

**Strengths:**
- **Cheapest ongoing cost** — no platform subscriptions, code belongs to SGA
- **Total control** — every screen, every interaction, exactly as SGA envisions
- **Real search** — Postgres full-text search actually works; solves the discoverability problem
- **No platform lock-in** — standard React/JavaScript code, any developer can maintain it
- **Supabase dashboard** — gives admins a spreadsheet-like interface to manage content and users
- **Future-proof maintenance** — as AI tools improve, anyone can say "fix X" and get help

**Weaknesses:**
- **Needs someone comfortable with technology** — not necessarily a software engineer, but someone who can describe what they want clearly, review the AI's output, and run basic commands to deploy. Think "confident with computers" rather than "writes code for a living."
- **If that person steps away, the app stops getting updated** — same risk as FlutterFlow
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
| **Monthly cost** | ~$130–360 | $49–430 | $729+ | ~$80 | ~$35–60 |
| **Up-front build cost** | $0 | $0 | $0 | $0–8K (if freelancer) | $0–8K (if freelancer) |
| **Build time** | Days | Days | Days | 6–10 weeks | ~1 day (actual) |
| **Custom feel** | Low (mirrors Wix site) | Low | High | High | Highest |
| **Branded iOS + Android app** | Yes | No (unless $33K/yr) | Yes | Yes | PWA (installable, not in app stores) |
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

## What We Chose

We went with **Option E: AI-Assisted Build**. David built the full MVP in ~6 hours using Claude Code, and deployed it to https://sgacommunity.vercel.app.

**Why this option won:** SGA has a technical volunteer (David), which made the cheapest and most customizable option viable. The build was fast enough that it was easier to just try it than to keep evaluating platforms.

**Ongoing commitment:** A few hours per month for maintenance, content updates, and improvements. Any future changes can be made the same way — describe what you want to an AI tool, review the output, deploy.

**What would change this:** If David is no longer available and SGA can't find another technical volunteer, the fallback would be Mighty Networks ($49–99/mo) as a low-maintenance alternative. The forum content could be exported from Supabase (standard Postgres) and the library content is portable.

### Original recommendation (for reference)

The original analysis below still holds for organizations making this decision. The key variable is whether you have someone comfortable with technology:
- **Technical person available** → AI-assisted build (cheapest, most custom, fastest with current AI tools)
- **Budget but no technical person** → Disciple ($729+/mo) or hire a developer ($15K–50K)
- **Neither** → Mighty Networks ($49–99/mo) as a pragmatic starting point

---

## Key Sources

- [Wix App Builder](https://www.wix.com/app-builder) — Wix's branded mobile app product
- [Wix Branded App Pricing](https://support.wix.com/en/article/branded-app-by-wix-purchasing-a-branded-app-plan) — purchasing details
- [Wix Branded App Limitations](https://natively.dev/wix-for-mobile-apps) — independent review of what Wix apps can't do
- [Wix Forum Deprecation](https://support.wix.com/en/article/wix-forum-move-your-forum-to-wix-groups) — Forum shutdown timeline and migration to Groups
- [Mighty Networks](https://www.mightynetworks.com/) — community platform
- [Mighty Pro](https://www.mightynetworks.com/pro) — branded app tier (custom pricing)
- [Disciple](https://www.disciple.community/) — white-label community app builder
- [FlutterFlow](https://www.flutterflow.io/) — no-code app builder
- [FlutterFlow Showcase](https://www.flutterflow.io/showcase) — real apps built with FlutterFlow
- [Supabase](https://supabase.com/) — open-source backend platform
- [Bunny CDN](https://bunny.net/) — affordable video hosting (~$1/mo)
- [Wix Branded App Pricing](https://www.davydovconsulting.com/post/wix-branded-app-pricing-everything-you-need-to-know) — cost breakdown
