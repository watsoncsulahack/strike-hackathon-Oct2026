---
version: alpha
name: DRMZ Paper Hands
description: Website-derived DRMZ visual system and component guidance for an integrated educational trading page.
---

# DRMZ Paper Hands — Design

## Overview

Paper Hands should look like another page of DRMZ's website: bold purple headings, cream and navy surfaces, full-width color sections, large readable copy, rounded photographs, and a circular Morpheus launcher. Reuse the host site's visual language and assets within its Next.js/Vercel environment.

This revision uses the owner-provided `index.html`, `3e30e7e231be9211.css`, and `3cd83cfe34ca397f.css`, reviewed on 2026-10-25. The HTML connects the first stylesheet to the page's Tailwind utilities and bespoke DRMZ classes; the second stylesheet supplies Swiper. Values below come from those declarations and the classes actually present in the saved HTML. They replace the earlier logo-sampled navy/lavender/gold proposal.

**Evidence boundaries:** a class appearing in a compiled bundle does not establish that the page uses it. The HTML shows a closed Morpheus launcher, but no open chat panel, form inputs, trading charts, order ticket, or theme switch. Those additions are explicitly described as adaptations below. The supplied HTML references images, JavaScript, and a Google-hosted Lobster font whose files were not supplied. Their appearance, loading, and interactive behavior have not been browser-verified.

Token names such as `colors.primary` are this document's semantic aliases for the website's literal colors; they are not claims about the site's generic CSS variable `--primary`. Normative tokens preserve source values. Supporting evidence and asset references are recorded in [docs/ASSETS.md](docs/ASSETS.md). Business purpose remains in [Product.md](Product.md); acceptance criteria and delivery status remain in [requirements.md](requirements.md) and [docs/backlog.md](docs/backlog.md).

## Colors

The principal website palette is **purple, cream, navy, and Cardano blue**.

| Role | Source value | Observed selector or context |
| --- | --- | --- |
| Primary purple | `#753CC2` | `.purple`, `.purple_bg`; hero copy, primary CTA, delegation section |
| Light cream | `#EFF0D8` | `.light`, `.light_bg`; hero surface and light CTA |
| Dark navy | `#111D35` | `.dark`, `.dark_bg`; informational section, dark CTA, dark text on light CTA |
| Cardano blue | `#4E84F1` | `.cardano_blue`, `.cardano_blue_bg`; resources heading and resource-name hover |
| Purple hover | `#6735A8` | `.purple_bg_hover:hover` |
| Cream hover | `#F3F5CD` | `.light_bg_hover:hover` |
| Dark hover | `#000000` | `.dark_bg_hover:hover` |
| White and black | `#FFFFFF`, `#000000` | White copy on dark/purple sections; black copy on the white resources section |
| Footer navy | `#0D1934` | Footer `bg-[#0d1934]`; preserve its distinction from `.dark_bg` |
| Footer heading | `#A78BFA` | `text-purple-400` |
| Footer link base | `rgb(216 180 254 / 0.6)` | `text-purple-300/60` |
| Footer link hover | `#D8B4FE` | `hover:text-purple-300` |
| Footer divider | `rgb(88 28 135 / 0.2)` | `border-purple-900/20` |
| Morpheus launcher border | `#6D28D9` | `border-purple-700` |

The body declares a top-to-bottom gradient from `rgb(10, 10, 26)` (`#0A0A1A`) to black. Its HTML also carries `bg-[#0a0a0f]`, but that background-color utility does not remove the gradient background image. Match the cascade rather than selecting one declaration in isolation.

The page alternates light, white, dark, gradient-backed, and purple sections. It does **not** establish two complete app-wide themes. For Paper Hands' light and dark modes, assemble variants from the observed surfaces and validate their component states. Do not revive the old lavender/gold scheme or invent new brand shades.

The HTML uses a `black_bg` class with no declaration in the supplied stylesheets; do not assign it an invented color. Its visible surface needs cascade/runtime verification.

The bundle also contains generic `:root` / `.dark` HSL variables and stock chart colors. No `dark` theme class is applied to the saved HTML. Those library defaults are not evidence of DRMZ's active brand palette. The Swiper default `#007AFF` is likewise not the brand's primary color.

```yaml
colors:
  primary: "#753CC2"
  secondary: "#EFF0D8"
  tertiary: "#4E84F1"
  neutral: "#111D35"
  primary-hover: "#6735A8"
  secondary-hover: "#F3F5CD"
  neutral-hover: "#000000"
  on-primary: "#FFFFFF"
  on-secondary: "#111D35"
  on-dark: "#FFFFFF"
  surface-light: "#EFF0D8"
  surface-dark: "#111D35"
  surface-white: "#FFFFFF"
  on-white: "#000000"
  body-underlay: "#0A0A0F"
  body-gradient-start: "#0A0A1A"
  body-gradient-end: "#000000"
  footer-surface: "#0D1934"
  footer-heading: "#A78BFA"
  footer-link: "rgb(216 180 254 / 0.6)"
  footer-link-hover: "#D8B4FE"
  footer-divider: "rgb(88 28 135 / 0.2)"
  launcher-border: "#6D28D9"
  transparent: "transparent"
```

## Typography

The default stack is the supplied Tailwind preflight's **system sans-serif** stack: `ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji`. There is no evidence of Inter, Public Sans, Nimbus Sans, or a custom numeric font being used as the website's body face.

Use **800** for the large section headings, **400** for ordinary copy and the observed action links, **600** for the slogan and footer heading, and **700** for selected inline emphasis. The site is typographically bold; do not replace its large headings with the previous restrained dashboard hierarchy.

| Website role | Base size / line height | Responsive change |
| --- | --- | --- |
| Main section heading | `2.25rem / 2.5rem`, weight 800 | `3rem / 1` from 640px where `sm:text-5xl` is present |
| Smaller heading | `1.875rem / 2.25rem`, weight 800 | Keep the source element's responsive classes |
| Ordinary section copy | `1.125rem / 1.75rem`, weight 400 | `1.25rem / 1.75rem` from 640px where `sm:text-xl` is present |
| Resource title | `1.5rem / 2rem`, weight 800 | `1.875rem / 2.25rem` from 640px |
| Action link | `1.125rem / 1.75rem`, weight 400 | Padding and containment provide emphasis |
| Footer body | `0.875rem / 1.25rem`, weight 400 | The descriptive footer paragraph overrides line-height with `leading-relaxed: 1.625` |

The closing quotation uses `.lobster { font-family: Lobster, sans-serif; font-weight: 400; font-style: normal; }`. The HTML requests `https://fonts.googleapis.com/css2?family=Lobster&display=swap`. Keep this as an occasional quotation treatment, not the main UI font. Its font binary and successful loading remain unverified.

Retain rem-based dimensions. Pixel equivalents assume the usual 16px browser root; no custom root font-size is declared. The body inherits preflight's 1.5 line-height.

```yaml
typography:
  headline:
    fontFamily: "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
    fontSize: 2.25rem
    fontWeight: 800
    lineHeight: 2.5rem
  headline-sm-up:
    fontFamily: "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
    fontSize: 3rem
    fontWeight: 800
    lineHeight: 1
  headline-small:
    fontFamily: "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
    fontSize: 1.875rem
    fontWeight: 800
    lineHeight: 2.25rem
  resource-title:
    fontFamily: "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
    fontSize: 1.5rem
    fontWeight: 800
    lineHeight: 2rem
  body-base:
    fontFamily: "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.75rem
  body-sm-up:
    fontFamily: "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.75rem
  action:
    fontFamily: "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.75rem
  footer-heading:
    fontFamily: "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
    fontSize: 1rem
    fontWeight: 600
    lineHeight: 1.5
  caption:
    fontFamily: "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.25rem
  footer-description:
    fontFamily: "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.625
  quote:
    fontFamily: "Lobster, sans-serif"
    fontSize: 1.875rem
    fontWeight: 400
    lineHeight: 2.25rem
  quote-sm-up:
    fontFamily: "Lobster, sans-serif"
    fontSize: 3rem
    fontWeight: 400
    lineHeight: 1
```

## Layout

The website uses broad color sections with centered inner content, not a permanently dense trading dashboard. Its hero fills at least the viewport height, centers its content, and uses a `max-w-xl: 36rem` content block. Hero padding is `1rem` horizontally and `2.5rem` vertically. Most subsequent sections use `py-16 px-6`: 4rem vertical padding and 1.5rem horizontal padding.

| Source layout | Observed geometry |
| --- | --- |
| `.grid-rod` | `1fr auto`, 20px gap; HTML caps the content at 1000px |
| `.grid-rod-2` | `auto 1fr`, 20px gap; same 1000px content cap |
| `.resources-grid` | One column, max-width 600px, row gap 33px |
| `.x-grid` | Five auto-sized columns, max-width 1000px, row gap 33px |
| `.delegate-grid` | Two equal columns, max-width 1200px |
| `.slider-container-2` | Width 100%, centered, max-width 500px |
| Footer inner wrapper | Max-width 80rem, horizontal padding 1.5rem, vertical padding 3rem |
| Footer grid | One column; 12 columns from 768px, with 8/2/2 column spans |

At **max-width 700px**, the two `grid-rod` variants become one column; the member grid becomes four columns with 23px row gaps; the delegation grid becomes one column with 33px gaps; slider/media widths are capped at 330px.

The utility breakpoints coexist with that bespoke media query: **sm = min-width 640px**, **md = min-width 768px**, **lg = min-width 1024px**. Do not rewrite the whole site around a single invented breakpoint. At 640–700px, both matching source media rules can apply.

The spacing rhythm combines Tailwind rem steps with bespoke 20px, 23px, and 33px gaps. It is not a strict 8px grid. Photo offsets such as `.ministry-img { top: -69px; }` belong to that specific composition; they are not global spacing tokens.

For Paper Hands, use the same typography, gutters, widths, and surface language around a focused active task. Introduce controls as the lesson needs them; a full dashboard is a later destination. This interaction composition is a product adaptation, not an extracted homepage screen. Preserve decisions and progress when the layout changes, and keep Morpheus guidance from covering the current input or confirmation.

Integrate through the host's existing layout and asset paths. Scope feature-specific styles to the page or components; do not inject the captured global reset or alter the host's `:root`, body, or generic `.dark` class. The source uses `.dark` for both library variables and a bespoke navy text color, so a global theme class requires particular care.

```yaml
spacing:
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  xxl: 3rem
  hero-vertical: 2.5rem
  section: 4rem
  resources-bottom-sm-up: 8rem
  control-y: 0.75rem
  hero-gutter: 1rem
  page-gutter: 1.5rem
  media-gap: 20px
  member-row-mobile: 23px
  grid-row: 33px
  hero-content: 36rem
  content: 1000px
  resources-content: 600px
  delegation-content: 1200px
  footer-content: 80rem
  slider-content: 500px
  slider-content-mobile: 330px
  launcher-inset: 1.5rem
```

## Elevation & Depth

The observed CTAs and Morpheus launcher use `shadow-lg`:

`0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`.

Section headings use `drop-shadow-md`:

`drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))`.

Preserve the distinction between a box shadow around a button and a filter shadow on text. Depth also comes from full-width changes in surface color, white avatar outlines, and a subtle footer divider. The capture provides no evidence for the prior proposal's lavender glows, raised navy dashboard layers, or heavy dialog shadows.

The launcher is fixed 1.5rem from the bottom and right, at z-index 50, and scales to 1.05 on hover. Its generic `transition` is 150ms with `cubic-bezier(.4, 0, .2, 1)`. Footer link color transitions are 200ms. Member portraits transition over 300ms with ease-in-out and scale to 1.1 on hover. These are distinct source treatments.

Reduced-motion handling, keyboard focus, and disabled/loading/error feedback remain required by requirements.md. Their full appearance is not demonstrated by the homepage capture. Validate those extensions; do not describe them as extracted site states.

## Shapes

Use the actual source's radius hierarchy:

| Shape | Source |
| --- | --- |
| 0.25rem | `.rounded` utility, present in the bundle; not established as a principal homepage component |
| 0.5rem | `--radius` and `.rounded-lg`; CTA corners and footer imagery |
| 0.75rem | `.rounded-xl`; pool screenshot |
| 20px | `.rod-borders`; large photographs and editorial images |
| Circular | `.pfp-image { border-radius: 50%; }` and `.rounded-full` launcher |

Member portraits have a 3px white border. The launcher has a 2px `#6D28D9` border. Preserve logo aspect ratios and native artwork. Keep the 20px editorial-photo treatment separate from the 8px action treatment.

```yaml
rounded:
  none: 0px
  control: 0.5rem
  image: 0.75rem
  portrait: 20px
  full: 9999px
```

## Components

### Observed website components

- **Primary action:** `.purple_bg .purple_bg_hover`, white inherited text, 1.125rem type, 0.75rem vertical / 1.5rem horizontal padding, 0.5rem corners, and the large box shadow. Hover changes purple to `#6735A8`.
- **Dark action:** same dimensions and white text on `#111D35`; hover becomes black.
- **Light action:** cream background, navy text, same dimensions; hover becomes `#F3F5CD`.
- **Section heading and copy:** large weight-800 headings and generous 1.125rem copy, with the observed sm size increases. Purple on cream, white on dark, and Cardano blue headings on white are established pairings.
- **Resource list:** one-column text entries on white. Hover changes the large resource title to `#4E84F1`; do not turn each item into an invented elevated card.
- **Member portrait:** circular, 4rem square below 640px and 6rem square at sm and above, white border, name below, 1.1 hover scale.
- **Morpheus launcher:** an 80px-equivalent circle (`w-20 h-20 = 5rem`) containing `morpheus-avatar.jpg`, cover-fitted and clipped. Preserve its fixed placement, border, and hover behavior. The open panel is not included in the snapshot.
- **Footer:** `#0D1934` surface, translucent purple divider, purple heading and link treatments, responsive 8/2/2 composition, logo, and banner. Essential trading information must not inherit the footer's low-opacity decorative copy treatment.
- **Community carousel:** the supplied Swiper stylesheet provides slide mechanics and stock effects. The HTML supplies `.swiper`, `.swiper-wrapper`, `.swiper-slide`, and image paths. JavaScript timing, gestures, active states, and autoplay behavior have not been inspected.

The HTML's logo points to `images/drmz-logo-snake-trans2.png`, with `/images/drmz-logo-snake-final.gif` as a data attribute. An editorial image references `images/morpheus.jpg`; the floating launcher references `morpheus-avatar.jpg`. These are different source assets. Do not infer identity from alt text alone: some saved alt labels are inconsistent with their filenames. Actual asset files are needed to verify appearance.

### Paper Hands component adaptations

Keep these inside the same design document, using the observed visual primitives:

- **Guided lesson:** one objective, a short explanation, and one primary next action. Reveal market, direction, size at fixed 1×, review, observation, closing, reflection, and completion in context. Guidance expands when needed.
- **Practice review and result:** keep exposure, margin, units, fees, source, and calculated outcome readable. Review does not create a position. Confirmation and recovery follow requirements.md. Use explicit practice labels and text states; no new profit/loss palette is established by this capture.
- **Morpheus guidance:** position explanations beside the active task on wide screens and in an expandable panel on small screens. Label curated versus AI-backed functionality accurately. The panel's exact visual treatment still needs an open-state reference.
- **Progress and XP:** explain the objective completed and distinguish learning XP from money. Use the website's purple/cream visual language. Exact XP rules belong to the product's learning specification and implementation backlog.
- **Inputs, selection, and errors:** the compiled CSS contains generic library utilities, but the saved page contains no form example. Reuse the host component implementation when available, then document the verified focus, validation, selection, and disabled states. Do not present invented input or modal styling as extracted evidence.

```yaml
components:
  page:
    backgroundColor: "{colors.body-underlay}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-base}"
  hero:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.primary}"
    padding: "2.5rem 1rem"
  section-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    padding: "4rem 1.5rem"
  section-purple:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    padding: "4rem 1.5rem"
  section-white:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.on-white}"
    padding: "4rem 1.5rem"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-dark:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-dark}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.5rem"
  button-dark-hover:
    backgroundColor: "{colors.neutral-hover}"
  button-light:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1.5rem"
  button-light-hover:
    backgroundColor: "{colors.secondary-hover}"
  editorial-image:
    rounded: "{rounded.portrait}"
  member-avatar:
    rounded: "{rounded.full}"
    width: 4rem
    height: 4rem
  member-avatar-sm-up:
    width: 6rem
    height: 6rem
  morpheus-launcher:
    rounded: "{rounded.full}"
    width: 5rem
    height: 5rem
  footer:
    backgroundColor: "{colors.footer-surface}"
    padding: "3rem 1.5rem"
  footer-description:
    textColor: "{colors.footer-link}"
    typography: "{typography.footer-description}"
  footer-heading:
    textColor: "{colors.footer-heading}"
    typography: "{typography.footer-heading}"
  footer-link:
    textColor: "{colors.footer-link}"
  footer-link-hover:
    textColor: "{colors.footer-link-hover}"
```

The page component's backgroundColor is an underlay; retain the body gradient described in Colors when reproducing that surface. Shadows, borders, placement, and responsive overrides are specified in the prose rather than invented top-level YAML groups.

## Do's and Don'ts

- Do use the website-derived purple, cream, navy, and blue values and their documented hover variants.
- Do preserve actual selectors, inheritance, asset identity, breakpoint overlap, and the distinction between source evidence and product adaptations.
- Do keep large bold headings, readable section copy, generous gutters, and the observed radius hierarchy.
- Do introduce the learning interface gradually inside DRMZ's existing page structure.
- Do verify desktop and phone rendering, font loading, the open Morpheus panel, keyboard focus, and reduced-motion behavior before claiming a pixel-matched implementation.
- Do check accessibility on the rendered combinations. Blue on white is appropriate for the observed large headings; it must not automatically become small body text. Low-opacity footer copy is not a template for essential trading labels.
- Do use the host's existing components and scoped feature styles to preserve the rest of the website.
- Don't use the earlier logo-sampled `#0E1A34`, `#B9AFD6`, and `#FCEBA9` as this website's normative UI palette.
- Don't turn stock Swiper blue, generic library HSL tokens, unused utilities, or missing class definitions into verified brand rules.
- Don't invent a desktop sidebar, navigation bar, input system, open chat panel, or complete light/dark theme and call it extracted from the homepage.
- Don't copy page-specific photo offsets into every component or force the mixed spacing system into a new uniform grid.
- Don't substitute Gobi artwork, an unverified mascot, or a recolored logo for the actual DRMZ assets.
- Don't place business statements, financial formulas, API contracts, backlog status, or historical implementation claims inside this visual specification.
