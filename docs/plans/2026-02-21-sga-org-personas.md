# SGA — Organizational Personas & Development Approach

**Date:** 2026-02-21
**Companion to:** [Design & Accessibility Assessment](2026-02-17-sga-website-design-assessment.md)

---

## Overview

This document defines two sets of personas for the SGA website redesign:

1. **Stakeholder personas** — the people who build, manage, and make decisions about the site
2. **User personas** — the people who visit the site

Together, these shape both *what's possible* (stakeholder constraints) and *what matters* (user needs).

---

## Stakeholder Personas

The critical fact about SGA's digital capacity: **no one owns the website full-time.** Every stakeholder has the site as a secondary or tertiary concern. Any solution must be low-maintenance, self-service for content, resilient to neglect, and visually opinionated by default.

### David — Technical Advisor

- **Role:** Volunteer technical advisor for SGA's digital presence. Currently helping evaluate options and prototype concepts
- **Technical level:** High — understands architecture, web technologies, can configure systems, can vibe-code prototypes. Not a designer
- **Availability:** Advisory capacity only, not ongoing
- **Key strength:** Can evaluate technical trade-offs, prototype ideas, bridge the gap between what the team wants and what's feasible
- **Key constraint:** Does not want to be — and should not be — the person maintaining the site going forward. His involvement is temporary advisory, not operational
- **Decision authority:** Recommends technical direction. Does not own execution or maintenance

### Jacintha Sayed — Director

- **Role:** SGA Director. Personally handles adoptions, animal information, general inquiries, and dog surrender — she is the front line for the organization's most important interactions. Described as a "tireless advocate" for animals in need, including special-needs dogs that have been traumatized
- **Technical level:** Non-technical. Zero patience for things that don't work
- **Availability:** Extremely limited — she is doing the core operational work of the rescue (adoptions, surrenders, inquiries) in addition to directing the organization. Paid staff, but wears many hats
- **Key strength:** Strong instinct for what SGA needs to communicate. Knows the community (volunteers, fosters, adopters) deeply. Firm opinions grounded in years of real experience running the rescue
- **Key constraint:** No time for technical troubleshooting. If it breaks or is confusing, it's dead to her. Needs things to just work. Every minute spent on website problems is a minute not spent on dogs
- **Decision authority:** Content direction, organizational priorities, final approval on what the site says and does

### Lily Piecora — Community Engagement Manager

- **Role:** SGA's Community Engagement Manager. Handles volunteer inquiries, community engagement, and is the primary point of contact for people wanting to get involved. Also the person who most frequently interacts with the website day-to-day
- **Technical level:** Non-technical, but has a design background — understands visual quality
- **Availability:** Part-time across multiple responsibilities. The website is one of many things on her plate, not her primary job
- **Key strength:** Design eye — can tell when something looks wrong or off-brand. Deeply connected to the volunteer and community side of SGA. Currently the closest thing to a "website owner" in practice
- **Key constraint:** Fighting the current tools. Her design instincts exceed what the current WordPress setup lets her do easily. Website maintenance competes with her actual community engagement work
- **Decision authority:** Visual design, day-to-day content updates, volunteer-facing communications

### SGA Leadership — Governance & Operations

Board members and organizational leaders who wear multiple hats — governance responsibilities alongside hands-on operational roles. Known members include Perrin Kaplan (President, media/promotional), Adrienne Genise (Development Manager, donations/sponsorship), and Rachel Miller (Accounting Manager). SGA is highly dependent on volunteers across the organization, many of whom are not listed on the website.

- **Role:** Organizational oversight, strategic direction, plus operational work in their respective areas (fundraising, media, finance)
- **Technical level:** Non-technical
- **Availability:** Periodic for governance (board meetings, reviews), variable for their operational hats
- **Key strength:** Big-picture vision for what SGA should be. Enthusiasm for ideas. Hands-on in their domains
- **Key constraint:** Ideas often outpace what's realistic given the team's capacity. Not involved in website execution
- **Decision authority:** Budget approval, strategic direction, organizational priorities

### Alice Wonder Marketing — Current Web Vendor

- **Role:** One-person, part-time web maintenance operation with a technical person overseas
- **Technical level:** Technical, but bandwidth-constrained
- **Availability:** Limited — part-time, external
- **Key strength:** Knows the current WordPress setup. Handles things the team can't (DNS, email config, domain renewals)
- **Key constraint:** Even simple infrastructure tasks (MX records, domain renewal) require going through this vendor, creating a bottleneck
- **Decision authority:** None — executes on requests

---

## User Personas

### Design Principles Derived from User Research

SGA's existing community — many of whom are older — values **simplicity and predictability**. They don't like "things that appear and disappear" (carousels, auto-closing dropdowns, modals, hover-reveal content, animations that shift layout). At the same time, SGA wants to attract younger volunteers, donors, and adopters.

These goals are not in conflict. Modern web design has moved toward big typography, generous whitespace, obvious affordances, and strong photography — which feels contemporary to younger users while being predictable and clear for older ones. The dated web (2010–2018) was the era of complexity. Current best practice favors clarity.

**All personas need excellent mobile support.** Seattle has very high smartphone adoption across all age groups, and people interact with SGA on their phones at adoption events, while fostering, and browsing from the couch.

### 1. The Adopter — "I want to find my dog"

- **Who:** Broadest demographic. Young couples, families, retirees, single professionals. Seattle skews educated, progressive, and dog-obsessed
- **Behavior:** Goes straight to Available Dogs. Browses photos. Clicks on individual dogs. Comes back repeatedly over days or weeks. Often on their phone
- **Needs:** Big dog photos, easy filtering, clear next step ("How do I apply?"), fast load on mobile
- **Frustration point:** If they can't find Available Dogs immediately, or if the dog listings are slow or hard to browse on a phone, they leave
- **Priority:** Highest-traffic persona by far. The Available Dogs page is a destination

### 2. The Foster — "I want to help but I have questions"

- **Who:** Often experienced dog people. Skews older (retirees, empty nesters with space and time). Some younger people too
- **Behavior:** Reads carefully. Wants to understand the commitment — how long, what's expected, what support they get. May visit multiple times before applying
- **Needs:** Clear, reassuring information. Honest about the work involved. Easy path to the application. Resources for current fosters
- **Frustration point:** If the information feels vague or the process unclear, they don't apply. These people are doing the math on "can I really do this?"

### 3. The Casual Donor — "Take my $25"

- **Who:** Sees an SGA post on social media or hears about an event. Feels moved. Wants to give money right now, on their phone
- **Behavior:** Impulse-driven. Arrives from Instagram or Facebook, not from Google. Needs a donate button within 5 seconds or the moment passes
- **Needs:** Prominent, always-visible donate button. Trust signals (the 8,500+ stat, partner logos). Frictionless payment
- **Frustration point:** If they have to hunt for how to donate, they won't

### 4. The Volunteer — "I want to get involved"

- **Who:** This is where younger demographic growth lives. College students, young professionals looking for community, people new to Seattle wanting to meet dog people
- **Behavior:** Looking for a sense of what volunteering actually looks like before committing
- **Needs:** Clear picture of volunteer activities (events, transport runs, admin help). Low-commitment entry points. Social proof that it's a welcoming community
- **Frustration point:** If "Get Involved" feels like a wall of text or a formal application, younger people bounce. They want to see real people doing real things

### 5. The Surrenderer — "I need to give up my dog"

- **Who:** Someone in a difficult, often emotional situation. Moving, health crisis, behavioral issues they can't handle
- **Behavior:** Likely searching Google for "surrender dog Seattle." Arrives stressed and possibly ashamed
- **Needs:** Compassionate, non-judgmental tone. Clear process. Immediate sense that this organization will take care of their dog
- **Frustration point:** If the page feels bureaucratic or hard to find, they may go to a shelter instead — a worse outcome for the dog

### 6. The Returning Community Member — "Where's that form?"

- **Who:** Current fosters, active volunteers. Already part of SGA
- **Behavior:** Comes to the site for specific resources — foster handbook, event calendar, application forms, training info
- **Needs:** Quick access to practical tools. This role is eventually served by the community app, but until then the website handles it
- **Frustration point:** Having to dig through the full site to find something they access regularly

---

## The Seattle Factor

- **Very high smartphone adoption** across all ages — mobile-first isn't just for younger users here
- **Dog culture is intense** — people will spend time browsing dogs. The Available Dogs page is a destination, not a chore
- **Tech-literate city** — "not comfortable with technology" users here are still more capable than the national average. Their dislike of dynamic UI is a preference for predictability, not inability
- **Competitive rescue landscape** — Seattle has multiple rescues (PAWS, Motley Zoo, Old Dog Haven, etc.). A modern, trustworthy-looking site is a differentiator

---

## Implications for the Redesign

| Constraint | Source | Impact |
|---|---|---|
| No full-time website owner | All stakeholders | Solution must be low-maintenance and self-service for content |
| David is advisory only | David | Can't depend on ongoing technical support from him |
| Lily fights the current tools | Lily | The CMS/editing experience matters as much as the public-facing design |
| Jacintha has no time | Jacintha | Changes need sign-off but the process can't drag on with endless rounds |
| Older users want predictability | User research | No carousels, modals, auto-hiding elements, or layout-shifting animations |
| Younger users expect visual quality | Growth goal | Strong typography, photography, and whitespace — not gimmicks |
| Mobile is primary | All user personas | Design mobile-first, not "desktop that also works on mobile" |
| Available Dogs is the #1 page | The Adopter | This page deserves disproportionate design attention |
| Donate must be frictionless | The Casual Donor | Persistent, prominent, zero-hunting required |

---

## Development Approach

### Two Phases, Two Workflows

The website redesign has two distinct phases with different operators and different needs:

**Phase 1 — Setup & Iteration (David as PM/DevOps)**

David is moving fast: standing up infrastructure, evaluating themes, configuring the environment, iterating on design direction. This phase needs automation, repeatability, and version control. Git is the source of truth for everything David touches.

**Phase 2 — Steady State (Lily & Jacintha as content editors)**

The scaffolding is built. Lily edits pages, updates photos, manages events. Jacintha reviews and approves. They work in WordPress's admin interface and never see Git, Composer, or Azure. The DevOps layer is invisible to them — it just means the site reliably runs and can be reproduced if something breaks. Occasional infrastructure changes (plugin upgrades, theme updates) come through Git but are infrequent.

### Technical Stack

| Layer | Tool | Why |
|---|---|---|
| WordPress project structure | [Bedrock](https://roots.io/bedrock/) (Roots) | Treats WordPress as a proper application. Composer-managed dependencies, environment-based config, Git-friendly |
| Dependency management | Composer | WordPress core, themes, and plugins as versioned dependencies — like `package.json` for WordPress |
| Environment config | `.env` files | Local DB creds vs Azure DB creds. No hardcoded secrets in the repo |
| Local development | Docker Compose | One `docker compose up` to spin up WordPress + MySQL matching the Azure environment. Version-controlled in the repo |
| Hosting | Azure App Service + Azure Database for MySQL | David already has Azure access. Free/cheap tiers available. More reliable and modern than the current GoDaddy shared hosting |
| Deployment | GitHub Actions | `git push` to main → deploys to Azure staging. Automated, repeatable, auditable |
| Infrastructure as code | Azure Bicep | App Service + MySQL defined in code. Reproducible, version-controlled |
| Baseline content | WP-CLI scripts + WP XML export | Scripts in the repo to bootstrap a fresh environment: activate theme, install plugins, import baseline content |

### What lives in Git (David's domain)

- WordPress core version, theme, and plugin versions (via `composer.json`)
- Environment configuration templates (`.env.example`)
- Docker Compose setup for local development
- GitHub Actions deployment pipeline
- Azure infrastructure definitions (Bicep)
- WP-CLI setup scripts (activate theme, configure options, import baseline content)
- Baseline content export (WP XML) for bootstrapping new environments

### What lives in the database (Lily & Jacintha's domain)

- Page and post content
- Menus and navigation
- Theme Customizer settings
- Media library (images, documents)
- Plugin settings configured via wp-admin
- Event listings (The Events Calendar)

This split is intentional. Git controls the infrastructure and reproducibility. The database is where non-technical editors work. Neither side interferes with the other.

### Theme Decision

**Target theme:** [Veterna FSE (Gutenverse)](https://themeforest.net/item/veterna-pet-rescue-animal-welfare-fse-wordpress-theme/57221668) — a Full Site Editing theme built on the Gutenverse plugin (~$69). Chosen over the Elementor template kit of the same name because FSE is WordPress-native, has no page builder dependency, and aligns with the low-maintenance requirement.

**Bootstrap approach:** Start with a free FSE theme (Twenty Twenty-Five or similar) + the Gutenverse plugin to validate the entire infrastructure pipeline. Veterna drops in later as a theme folder swap. This lets us build and test without buying anything, and familiarizes us with Gutenverse's block system before the paid theme arrives.

### Repository Structure (Planned)

Separate repo: `sga-wordpress` (not inside the existing `sga` repo — different runtime, different deployment target, different dependency management).

```
sga-wordpress/
├── composer.json          # WordPress + plugins + theme as dependencies
├── .env.example           # Environment config template
├── docker-compose.yml     # Local dev environment
├── config/
│   └── application.php    # wp-config equivalent, reads from .env
├── web/
│   └── app/themes/        # Theme (version controlled)
├── scripts/
│   └── setup.sh           # WP-CLI: configure fresh install
├── content/
│   └── baseline.xml       # WP XML export for bootstrapping
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions → Azure
└── infrastructure/
    └── main.bicep         # Azure App Service + MySQL
```
