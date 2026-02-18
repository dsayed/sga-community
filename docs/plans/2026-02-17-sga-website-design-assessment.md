# SGA Public Website — Design & Accessibility Assessment

**Date:** 2026-02-17
**Site reviewed:** https://savinggreatanimals.org
**Platform:** WordPress (maintained by Alice Wonder Marketing, Inc)

---

## Executive Summary

The SGA public website is functional and well-organized — visitors can find information about adoption, fostering, volunteering, and donating. People like it because it's straightforward. But the visual design dates to ~2015, the site has meaningful accessibility gaps, and the mobile experience doesn't match how people actually use it (often on phones at adoption events, while fostering, etc.).

The good news: the content and information architecture are solid. The problems are purely presentational and can be addressed without rethinking what pages exist or how they're organized.

---

## Design Assessment

### What Makes the Site Feel Dated

1. **Generic WordPress template from ~2015** — the layout, typography, card style, and color usage are all theme defaults
2. **Great photography, poor presentation** — SGA has beautiful real dog photos, but they're displayed as small thumbnails with dense text. The dogs should be the visual star
3. **Too much text, not enough visual hierarchy** — every card has a full paragraph. On first visit, the eye doesn't know where to go
4. **Color palette is correct but flat** — SGA blue (#2B3990) and orange (#E8772B) are strong brand colors but used without depth (no gradients, shadows, or layering)
5. **No emotional moment** — the best nonprofit sites create an immediate emotional connection. The current hero is passive — "The Right Dog For The Right Home" over a sleeping dog. Compare Best Friends' "We're closer than ever to no-kill" — it demands your attention
6. **The "8,500+ dogs homed since 2007" stat** is buried in the About page body text — that's SGA's most powerful credibility signal and should be the very first thing visitors see

### What's Working

- **Information architecture is solid** — the nav covers all the right topics (Adopt, Foster, Volunteer, Donate, Events, Resources, Surrender)
- **Content is comprehensive** — every section has real, useful information
- **Photography is authentic** — real SGA dogs and team members, not stock photos
- **RescueGroups integration** on the Available Dogs page shows live adoptable animals (37 currently)
- **Partner logos section** shows real corporate sponsors (MudBay, Bissell, Chewy, etc.) — builds credibility

---

## Specific Design Recommendations

### 1. Hero Section — Make an Emotional First Impression

**Current:** Slider with a single photo and small text.

**Recommended:** Full-viewport hero with a single striking image (dog looking at camera, or a happy adoption moment), a large emotional headline featuring the "8,500+" stat, and two clear CTAs. No slider — [sliders reduce conversions](https://www.nngroup.com/articles/auto-forwarding/) and most users never see past slide 1.

### 2. Simplify the Navigation

**Current:** 9 top-level items, some with 3 levels of dropdowns.

**Recommended:** Reduce to 5 primary items:

| Current (9 items) | Proposed (5 items) |
|---|---|
| Home | *(implicit — logo click)* |
| About + Contact + Vision | **About** |
| Available Dogs + Adoption App + Fees + FAQ | **Adopt** |
| Foster + 7 sub-pages | **Foster** |
| Get Involved + Volunteer + Surrender | **Get Involved** |
| Events + Resources + Training | **Resources** |
| SGA Merch | Move to footer or secondary nav |

Plus a prominent **Donate** button (orange, always visible).

### 3. Replace the 6-Card Grid with Focused Action Tiles

**Current:** Six identical cards in two rows, each with a photo, ALL-CAPS title, dense paragraph, and "READ MORE."

**Recommended:** Three large, visually distinct action tiles for primary user intents, each with a strong image background and minimal text:
- **Adopt** — "37 dogs waiting" with a link to Available Dogs
- **Foster** — "Urgently needed" with a link to the foster page
- **Volunteer** — "Make a difference" with a link to get involved

Secondary actions (Surrender, Application forms, Donation details) move to contextual links within main pages.

### 4. Typography & Spacing

| Property | Current | Recommended |
|---|---|---|
| Base font size | 14px | 16–18px |
| Line height | ~1.4 | 1.6–1.75 |
| Section spacing | ~30–40px | 80–120px |
| Max content width | Nearly edge-to-edge | ~1200px centered |
| Body font | Generic theme font | DM Sans (matches the community app) |
| Heading font | Generic theme font | Fraunces (matches the community app) |

Using the same fonts as the community app creates visual continuity between the public site and the member platform.

### 5. Color System — Add Depth

Keep the brand colors, add warmth:
- **Background:** Warm off-white (#FBF8F4) instead of pure white
- **Hero:** Subtle gradient overlay for text contrast
- **Cards:** Soft shadows instead of flat borders
- **Primary CTA:** Orange (#E8772B) — warm and urgent, perfect for "Adopt" and "Donate"
- **Body text:** Warm gray (#4B5563) instead of pure black

### 6. Available Dogs Page

This is the highest-traffic page. The current RescueGroups embed is functional but basic.

**Recommended improvements** (dependent on RescueGroups API capabilities):
- Larger photo cards with name, age, breed, and a 1-line personality tag
- Filter bar — size, age, good with kids/cats/dogs
- "Featured Dog" spotlight at the top

### 7. Mobile-Specific Design

- Sticky bottom CTA bar — "Adopt" and "Donate" always one tap away
- Larger touch targets in hamburger menu (48px+ height per item)
- Swipeable carousel for action tiles instead of stacking everything vertically
- Lazy-load images

---

## Mobile-Friendliness Findings

### What's Working

The site *is* responsive. It has a hamburger menu, the viewport is set correctly, and content stacks on small screens.

### Issues

| Issue | Impact |
|---|---|
| **Everything stacks vertically with no hierarchy** | The 6 content cards become a very long single-column scroll. "Available Dogs" (the #1 reason people visit) gets equal weight to "Surrender" |
| **Hero text barely readable** | White text on a photo with no backdrop — depends on the image behind it |
| **No sticky header or persistent navigation** | Once you scroll past the nav, it's gone. No bottom tab bar, no floating action button. You have to scroll all the way back up |
| **Images not optimized for mobile** | Same large desktop images served to phone users — wastes bandwidth on cellular |
| **TTFB of 1,167ms** | Time-to-first-byte is over a second. Mobile users on spotty connections will feel this significantly |
| **Partner logos don't scale** | Different sizes, no clean grid at any breakpoint |
| **Touch targets too small** | Nav items in the hamburger menu, social icons, and footer links are hard to tap accurately |

---

## Accessibility Findings

### What's Working

- Skip-to-content link is present
- HTML language attribute (`lang="en-US"`) is set correctly
- Heading hierarchy is reasonable (H2 > H3 on homepage)
- All 115 links have accessible text (no empty links)
- Viewport meta tag is correctly configured
- Form inputs have labels

### Critical Issues

| Issue | Detail | Impact |
|---|---|---|
| **11 of 12 images have empty alt text** | Dog photos, hero image, partner logos — all have `alt=""`, making them invisible to screen readers | For a dog rescue, the images *are* the content. A blind user gets none of it |
| **No `<main>` landmark on homepage** | Screen readers can't jump to the main content area on the most-visited page | Inner pages (About, etc.) do have `<main>` — just the homepage is missing it |
| **42 touch targets under 44x44px** | Social icons, nav links, footer links are all too small for reliable finger tapping | Fails WCAG 2.5.8. Affects older users and anyone with motor impairments |
| **Base font size is 14px** | Below the recommended 16px minimum for body text | Hard to read on mobile, especially for older volunteers and adopters |

### Moderate Issues

| Issue | Detail |
|---|---|
| **Hero text contrast** | White text over a photo with no semi-transparent overlay. Readability depends on which part of the image is behind the text |
| **Bark Buddies popup** | Fires on every page visit. Focus isn't trapped for keyboard users. No obvious keyboard-accessible close. Modal popups are a known accessibility hazard |
| **7 `<header>` elements** | Multiple banner landmarks confuse screen reader navigation. Should be exactly 1 |
| **Copyright says 2019** | Minor, but signals the site isn't actively maintained |
| **Social links say "Twitter"** | Should be updated to "X" (or removed — the account may be inactive) |

---

## Quick Wins (Within Existing WordPress)

These don't require a rebuild — just WordPress theme/plugin changes:

| Fix | Effort | Impact |
|---|---|---|
| Add descriptive `alt` text to all 11 images | 30 min | High — accessibility |
| Increase base font to 16px | 5 min (CSS) | High — readability |
| Limit Bark Buddies popup to once per session | 10 min (plugin settings) | High — user experience |
| Add semi-transparent overlay behind hero text | 15 min (CSS) | Medium — contrast/readability |
| Update copyright to 2026 | 2 min | Low — credibility |
| Update "Twitter" to "X" in social links | 5 min | Low — currentness |
| Add `<main>` landmark to homepage template | 10 min (theme edit) | Medium — accessibility |
| Increase social icon touch target sizes | 15 min (CSS) | Medium — mobile usability |

**Total: ~90 minutes of work** for meaningful improvements to accessibility and user experience.

---

## Paths Forward

### Path A: WordPress Refresh with FSE Theme

Update the existing WordPress site with the quick wins above and a modern Full Site Editing (FSE) theme. FSE is the direction WordPress is heading — block-based themes are the most future-proof choice and don't require third-party page builder plugins (Elementor, WPBakery, etc.) that add maintenance overhead and potential compatibility issues.

**FSE theme options for animal rescue:**

| Theme | Platform | Key Features | Price |
|---|---|---|---|
| **[Veterna](https://themeforest.net/item/veterna-pet-rescue-animal-welfare-fse-wordpress-theme/57221668)** | ThemeForest | Block-based FSE, optimized for pet welfare/rescue orgs. Most aligned with WordPress's direction | ~$69 |
| **[Adoptix](https://gutenix.com/products/adoptix/)** ([live demo](https://gutenix.com/demo/gutenberg/adoptix/)) | Gutenix | Gutenberg-native, specialized pet directory and online adoption management | ~$49 |

*Other themes exist (Litl' Pal, Pet Rescue, Zupet, FourPaws) but use Elementor, WPBakery, or Brizy page builders, adding a plugin dependency. FSE-native themes are the better long-term choice.*

**Pros:**
- Least disruption — keeps the existing CMS, content, and hosting
- Alice Wonder Marketing (current developer) can likely implement it
- SGA staff keep the same admin workflow they're used to
- Purpose-built themes include pet-specific features (adoption listings, donation integration, event calendars)
- FSE themes don't require third-party page builder plugins

**Cons:**
- Still limited by WordPress theme constraints
- RescueGroups integration stays as-is (basic embed) unless the theme offers its own pet directory
- Won't achieve the same level of visual uniqueness as a custom build
- Theme switching can be disruptive — content may need reformatting

**Effort:** A few days of work for the web developer
**Cost:** Theme license ($49–69) + developer time

### Path B: Custom Prototype

Build a static Next.js site showing what a redesigned SGA homepage and key pages could look like — using the actual SGA photography, brand colors (blue + orange), and the DM Sans + Fraunces font pairing from the community app. Deploy to Vercel for easy sharing.

This is a tangible thing SGA's board can look at and react to, not just a document of suggestions. Similar to how the community app prototype was built in ~6 hours.

**Pros:**
- Shows, don't tell — a visual prototype is worth 1000 words of design recommendations
- Can incorporate all the design recommendations above with no theme constraints
- Creates visual continuity with the community app
- If SGA likes the direction, the prototype can evolve into the production site
- Same tech stack as the community app (shared knowledge, lower maintenance burden)

**Cons:**
- Requires someone technical to maintain long-term (same trade-off as the community app)
- Would need to integrate RescueGroups API for the Available Dogs page
- Migration from WordPress means moving content

**Effort:** A few hours for a homepage prototype; 1-2 weeks for a full site
**Cost:** Vercel free tier + domain

### Path C: Share This Assessment

Hand this document to SGA and Alice Wonder Marketing as a set of recommendations. They can implement the quick wins immediately and use the design recommendations to guide a future refresh on their own timeline.

**Pros:** Zero commitment, immediately actionable quick wins
**Cons:** Less likely to result in a significant visual transformation

---

## Recommendation

Start with the **quick wins** regardless of which path you choose — 90 minutes of work for real accessibility and usability improvements that help SGA's members today.

Then, if SGA wants to see what "modern and engaging" could actually look like, **Path B** (a custom prototype) is the fastest way to make it tangible. It worked for the community app — build something real, react to it, iterate.
