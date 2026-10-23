---
version: alpha
name: DRMZ Paper Hands
description: A DRMZ-branded educational web app for learning perpetuals with Morpheus, Strike market data, simulated funds, and lesson XP.
---

# DRMZ Paper Hands — Design and Product Direction

This document needs revision by the coding agent to accurately reflect the color scheme of drms.app, with actual css values.

## Overview

Paper Hands is a proposed DRMZ learning experience: a responsive progressive web app where students learn perpetual trading concepts, practice with virtual funds, and earn XP for demonstrating understanding. Morpheus is the learning guide. Strike is the intended source of market data. DRMZ supplies the educational purpose, community, and visual identity.

The experience should feel thoughtful, welcoming, and exploratory. Pair DRMZ's navy, lavender, and gold identity with clear explanations and calm interaction. A beginner should understand the next step without already knowing exchange terminology. Use the brand line **Dream. Learn. Earn.** In this product, “earn” means learning XP unless a separately specified reward program explicitly says otherwise.

### Status and evidence

**Publication scope — documents only (2026-10-23):** The user deferred the video and requested text documents. This commit publishes the business/design/requirements brief and supporting Markdown. The guided UI, earlier technical prototype source, scripts, tests, images, and video remain local and are not included. References to implementation paths below describe prepared work and intended locations. Backlog statuses marked “Implemented” refer to that local work, not source published in this commit. A coding agent must obtain or implement the source and rerun its checks before relying on it.

This is a proposed product design, not a claim that DRMZ has already shipped this paper trading app. The previously prepared concept video uses illustrative data and interface mockups; its upload is deferred. It does not demonstrate a working Strike connection, executable simulator, or deployed PWA.

| Source | What is established | What remains a proposal |
| --- | --- | --- |
| [drmz.app](https://www.drmz.app/) | DRMZ's education and onboarding mission, MorpheusAI, and the brand line | This paper trading curriculum and app |
| [DRMZ logo artwork](https://github.com/rodg-drmz/web3ie-media-assets/blob/main/Web3%20In%20Education%20Courses/AI%20Demystified%20Course/DRMZNEW24.png) | Opaque logo pixels include navy #0E1A34, lavender #B9AFD6, and gold #FCEBA9 | Semantic UI roles and supporting colors |
| [DRMZ Cardano artwork](https://github.com/rodg-drmz/web3ie-media-assets/blob/main/Web3%20In%20Education%20Courses/AI%20Demystified%20Course/DRMZ%20-14.png) | A published Cardano graphic in dark blue #1A2239 | Its placement in this app |
| [Google Labs DESIGN.md specification](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md) | Document structure, YAML token groups, and token references | This document's product decisions |
| [Strike integration resources](https://github.com/strike-finance/strike-finance-skills) | Reference material for market data and trading calculations | Integration, availability checks, and simulator fidelity |

Reviewed 2026-10-23. Website text and public creator assets were available; direct site image downloads and the live stylesheet were not. Therefore this is an asset-grounded DRMZ adaptation, not an exact extraction of drmz.app's CSS or typography. The three logo colors are sampled; other tokens and font choices are proposed product extensions. Reconcile against the live stylesheet when accessible.

**Latest product decision — progressive discovery:** The dashboard-first prototype exposes too much before a beginner knows what to do. The default entry experience must introduce one concept and one meaningful action at a time, inside the task itself. The inspiration is the user's description of Gobi's gradual introduction of features; this is a design principle, not a claim of feature parity or a reproduction of its interface. Avoid a separate account-creation flow or a lengthy product tour. Let the learner start practicing immediately.

The first exercise is: meet Morpheus, choose a market, choose long or short, choose a small virtual margin at fixed 1× leverage, review, open, explore a price change, close, explain the result, and receive learning XP. Reveal tools when they become useful. Introduce leverage, funding, order types, the lesson library, and the full practice workspace in subsequent lessons. A complete dashboard is a later destination, not the opening screen.

| Moment | Introduce now | Introduce later |
| --- | --- | --- |
| First visit | One invitation to try; Morpheus; virtual-only status; theme toggle | Balance dashboard, chart tools, lesson catalog, journal |
| Choose market | Two simple illustrative choices in the skeleton; verified market list in the live-data experience | Depth panels and multiple market statistics |
| Choose direction | Long and short explained in context | Strategy presets and multi-leg trades |
| Choose size | Virtual margin and available balance; fixed 1× for the first exercise | Leverage slider, margin tiers, liquidation lesson |
| Review | Direction, actual quantity, exposure, margin, illustrative or verified fees, and source | Advanced order controls |
| Open position | Price movement, labeled price P&L, and close action | Funding settlement and risk scenarios |
| Close and reflect | Fees, wallet result, misconception feedback, and objective check | Full journal browsing and export |
| Complete | XP once, practice record, next learning objective | Optional identity and sync |

**UX acceptance:** A first-time learner can identify the next action without a trading glossary or educator intervention. No account, wallet connection, or deposit blocks the exercise. Each step explains the term it introduces. Back navigation before confirmation preserves choices without placing a trade. The user reviews before any virtual position opens. Journal and advanced controls do not compete with the first task. Evaluate this in a novice usability session; model tests alone cannot prove discoverability.

Offer local persistence with a clear explanation of what is stored. Guest progress remains on the current device; clearing site data can remove it. Continuity across devices requires an explicitly designed sync mechanism and must not be implied automatically.

| Lesson | Demonstrated outcome | Proposed completion XP |
| --- | --- | ---: |
| What am I trading? | Distinguish contract exposure from asset ownership | 50 |
| Long or short? | Explain how direction affects price profit and loss | 50 |
| My money versus my position | Distinguish margin, leverage, and position size | 50 |
| Why did my position close? | Explain maintenance requirements and liquidation | 50 |
| Where did the money go? | Separate price changes, fees, and funding | 50 |
| How do I enter and exit? | Choose an order type and describe its limitations | 50 |
| Make a practice plan | Set a size, loss budget, and exit condition | 50 |
| Complete the trading loop | Place, monitor, close, and explain a virtual position | 100 |

XP values are provisional. Award once for completing the stated objective for a lesson version; allow supportive retries. Reading a page alone is insufficient evidence of understanding. A virtual loss can accompany an excellent explanation and still earn full lesson XP. Do not reward larger bets, more trades, or repeated resets.

### Product boundaries

All practice orders and balances are virtual. Live data is observational; simulation is a separate product function. Public market data access does not create virtual balances or provide simulated fills automatically. Morpheus may explain and prepare a virtual action, with the student making the meaningful practice decision. Learning does not require authorizing a real-money trade.

The first release excludes deposits, withdrawals, automatic live trading, copy trading, scholarship administration, and bounty payments. Real-money activity would require a separately designed product flow and user authorization. A profitable simulation does not establish a viable live trading strategy.

## Colors

Provide two equal product themes: **Dark** for a navy workspace and **Light** for a pale lavender workspace. Dark remains the default promotional-video theme. Both themes preserve the same DRMZ artwork, gold learning actions, layout, content, and functionality. **DRMZ Navy** is the page background; **DRMZ Lavender** identifies navigation and instructional emphasis; **DRMZ Gold** identifies the main learning action and XP milestones. Reserve green and rose for labeled result or validation states. Do not use direction, profit, or loss colors as decorative confetti.

The logo colors below are sampled from published artwork. Surface layers, muted text, focus, and semantic states are proposed extensions chosen for readable interfaces. Tokens are normative for this proposed product. Do not replace them with approximate violet, beige, or electric cyan.

```yaml
colors:
  primary: "#B9AFD6"
  on-primary: "#0E1A34"
  secondary: "#FCEBA9"
  tertiary: "#9688BC"
  neutral: "#0E1A34"
  background: "#0E1A34"
  surface: "#1A2239"
  surface-raised: "#222D47"
  surface-selected: "#35304E"
  on-surface: "#F8F7FC"
  on-surface-muted: "#B8BFD0"
  on-accent: "#0E1A34"
  outline: "#5C6C8A"
  outline-subtle: "#34415D"
  focus: "#FCEBA9"
  success: "#9BD8BF"
  success-surface: "#213C36"
  error: "#F3A5B7"
  error-surface: "#482A3A"
  warning: "#FCEBA9"
  chart-reference: "#B8BFD0"
  light-primary: "#625080"
  light-on-primary: "#FFFFFF"
  light-secondary: "#FCEBA9"
  light-tertiary: "#9688BC"
  light-neutral: "#F7F5FA"
  light-background: "#F7F5FA"
  light-surface: "#FFFFFF"
  light-surface-raised: "#EEE9F5"
  light-surface-selected: "#E5DDEF"
  light-on-surface: "#0E1A34"
  light-on-surface-muted: "#555F73"
  light-on-accent: "#0E1A34"
  light-outline: "#7D7891"
  light-outline-subtle: "#D3CBDD"
  light-focus: "#625080"
  light-success: "#23684D"
  light-success-surface: "#E3F2E9"
  light-error: "#9F3653"
  light-error-surface: "#FBE9EE"
  light-warning: "#765814"
  light-chart-reference: "#666176"
```

Unprefixed color names form the dark theme; `light-` names override the corresponding semantic roles in the light theme. The light primary is an accessible darker lavender for text and controls; it does not recolor the logo. Bind both themes to the same CSS variable names under `data-theme="dark"` and `data-theme="light"`. Respect an explicit theme URL or stored preference, retain a visible toggle, and expose both themes at every breakpoint. Never use dark-theme text directly on light-theme surfaces.

Apply on-surface or on-surface-muted to their theme’s surfaces. Use on-accent for text on gold fills, and on-primary for text on a filled primary background. Gold text belongs on dark backgrounds. Use outline for actionable input boundaries; outline-subtle may separate noninteractive containers. Profit and loss must also have signs, words, or icons so that color is never the only signal. Show focus with a visible ring plus spacing from the component edge.

## Typography

Use a system sans-serif stack for the proposed PWA. This avoids a required font download and supports a lightweight first visit. The website's exact font family was not verified. Use a system monospace stack for compact market data where it improves alignment; use tabular figures for prices, balances, and XP.

Write short, plain-language headings and explain a new term where it first appears. Avoid all-caps paragraphs. Keep instructional body text at least 16px and essential annotations at least 12px; do not hide important simulation status in tiny footnotes. Promotional video typography may scale these roles to the output resolution while retaining the same hierarchy. The current concept renderer uses its installed Nimbus Sans and DejaVu Sans Mono as local fallbacks; this does not establish drmz.app's font family.

```yaml
typography:
  display:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.15
  headline-md:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.25
  headline-sm:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.02em
  caption:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  data:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: '"tnum" 1'
```

## Layout

Build one responsive PWA, not separate desktop and mobile products. The same lesson objective, practice status, and controls remain available in both layouts. Website access is the default; optional installation must not block learning.

Use a fluid grid with a maximum content width of 1440px. The guided entry uses a focused lesson card and a secondary Morpheus panel; no persistent dashboard sidebar is needed. Below 768px, stack the active task and guidance in a single column with 16px outer padding. Between 768px and 1023px, allow two columns where readable. At 1024px and above, retain the focused task and optional guide. Persistent navigation belongs to the later practice workspace, introduced after the first exercise. Breakpoints are proposed layout decisions, not extracted website values.

Morpheus becomes an expandable panel or sheet on small screens. It must not obscure the active lesson, keyboard, or trade confirmation. Preserve touch targets of at least 44px, browser zoom, safe-area padding, and visible focus order. Lessons and controls should reflow at 320 CSS pixels; charts may use a contained pan region with a textual alternative.

```yaml
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 64px
  page-mobile: 16px
  page-desktop: 32px
  gutter: 24px
  content-max: 1440px
  touch-min: 44px
```

### Market information and simulator states

Use labels for **Live**, **Delayed**, **Replay**, **Illustrative**, and **Offline**. Display the data source, observation timestamp, units, and relevant funding interval. Only label data live when freshness is actually monitored. When data becomes stale, pause dependent simulation actions or explicitly switch to a labeled replay; do not silently invent current prices.

Offline access may cache lesson text and saved local progress. A PWA label does not imply offline market feeds, automatic installation support on every browser, or cross-device synchronization. Specify those behaviors separately during implementation.

## Elevation & Depth

Use tonal separation: background, surface, then surface-raised. Prefer a quiet border to a large shadow. Sheets and dialogs may use a restrained shadow equivalent to 0 12px 40px rgba(0,0,0,0.28). A dialog backdrop should dim the workspace while leaving its context recognizable.

In video, keep the stage dark navy and use a small lavender glow behind devices at most. Avoid the cream promotional background from the prior draft. Distinguish laptop and phone hardware from the application with muted outlines and neutral metal, without changing the UI palette.

Use 180–240ms transitions for panels and feedback. Respect reduced-motion preferences. XP animation should be brief and optional; no flashing, forced streak anxiety, or celebratory effects tied to risky trades. The concept video may use gentle device movement and fades, with enough dwell time to read a headline.

## Shapes

Use rounded rectangles for cards, fields, and lesson panels. Use pills for compact state labels, not long paragraphs. Use circles for identity marks and small progress indicators. A consistent radius hierarchy should soften dense financial information without turning every element into a toy.

```yaml
rounded:
  sm: 8px
  md: 12px
  lg: 20px
  xl: 28px
  full: 9999px
```

### Brand assets and iconography

Use DRMZ's published logo and preserve its aspect ratio and colors. Keep clear space of at least one-quarter of the mark's height. Use the extracted circular snake-and-Cardano emblem as a brand mark only; it is not a verified portrait of Morpheus. The actual Morpheus avatar must be sourced and checked before being presented as his likeness. Keep asset provenance with the project.

Use the published Cardano graphic only for Cardano-related identity. Its dark blue may disappear on navy; place it on a contrasting lavender tile while leaving the graphic's pixels unchanged. Keep functional icons from one consistent line-icon family. Provide text labels for navigation and unfamiliar financial controls. Gobi is a flow reference, not an asset library or DRMZ mascot source.

## Components

**Navigation:** Use Learn, Practice, Journal, and Progress as clear destinations. Show Practice mode and virtual balance consistently. On phone, choose a compact navigation arrangement with labels and avoid hiding the lesson exit.

**Buttons and inputs:** Gold identifies the single main learning or practice action. Lavender supports secondary actions and selection. Dark text belongs on filled accent buttons. Inputs have persistent labels, helper text, units, error messages, and visible focus. Explain leverage as position size relative to supporting margin rather than an unexplained multiplier.

**Lesson card:** Include a plain-language objective, approximate duration, completion criteria, and XP. Use an explanation, prediction, action, and reflection sequence. Distinguish completed, available, and locked states with text as well as styling.

**Morpheus panel:** Identify it as an AI learning guide. Keep the student's question visible, use concise explanations, and offer optional hints. Retrieve facts and deterministic calculations from documented sources or simulator state; do not invent prices, balances, fills, or outcomes. Describe uncertainty when a venue-specific rule is unavailable. The student should be able to inspect the explanation and continue independently.

**Practice ticket:** Show market, direction, full exposure, margin, leverage, margin mode, estimated costs, and a labeled liquidation estimate when the model supports it. Review precedes a virtual action. Use “Place practice trade” rather than an ambiguous real-trade command. Confirm the resulting simulated position and allow the learner to inspect its record.

**Chart:** Show mark, index, and last price as distinct concepts when available. Label overlays, units, and replay timestamps. Do not infer missing order-book history from candle closes. Provide a readable numeric summary and distinguish simulated fills from observed prices.

**XP and feedback:** Use gold for a learning milestone and lavender for a progress track. Explain what objective was demonstrated. XP has no cash value and is not a token, yield, or scholarship award. A learner may retry after a misconception without losing access to basic instruction.

**Accessibility:** Target WCAG 2.2 AA. Normal text needs at least 4.5:1 contrast; large text and meaningful interface graphics need at least 3:1 where applicable. Provide keyboard operation, accessible names, visible focus, text alternatives for charts, and captions or an equivalent text narrative for promotional media. Validate rendered components, not colors in isolation alone.

```yaml
components:
  app-shell:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    padding: "{spacing.page-mobile}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  button-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-accent}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
    height: "{spacing.touch-min}"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "{colors.surface-selected}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    height: "{spacing.touch-min}"
  input:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
    height: "{spacing.touch-min}"
  chip-practice:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm}"
  morpheus-panel:
    backgroundColor: "{colors.surface-selected}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  feedback-success:
    backgroundColor: "{colors.success-surface}"
    textColor: "{colors.success}"
    rounded: "{rounded.md}"
  feedback-error:
    backgroundColor: "{colors.error-surface}"
    textColor: "{colors.error}"
    rounded: "{rounded.md}"
  xp-award:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.lg}"
  chart:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-muted}"
    rounded: "{rounded.lg}"
  app-shell-light:
    backgroundColor: "{colors.light-background}"
    textColor: "{colors.light-on-surface}"
    typography: "{typography.body-md}"
  button-primary-light:
    backgroundColor: "{colors.light-secondary}"
    textColor: "{colors.light-on-accent}"
    rounded: "{rounded.md}"
    height: "{spacing.touch-min}"
  video-stage:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
    typography: "{typography.display}"
```

## Do's and Don'ts

- Do use the sampled DRMZ navy, lavender, and gold consistently in the app and video.
- Do preserve the published logo and distinguish verified artwork from proposed product styling.
- Do show a browser-based learning experience on laptop and phone.
- Do explain what a student is practicing before asking for an action.
- Do award lesson XP for demonstrated understanding, including thoughtful analysis of a loss.
- Do identify live, delayed, replayed, illustrative, and offline data states accurately.
- Do preserve access to the core learning flow without deposits or mandatory wallet connection.
- Do validate financial formulas against Strike's current documented mechanics before describing simulation as venue-accurate.
- Do keep the video renderer aligned with this file's YAML tokens; changing the palette should update both outputs.
- Don't use Gobi screenshots or characters as the identity of a DRMZ product.
- Don't imply that simulated results establish live profitability or that XP is money.
- Don't advertise cross-device progress sync, offline live data, or a working API integration until implemented and verified.
- Don't imply that a concept URL, mockup, or browser frame is a deployed app.
- Don't recolor the Cardano graphic to fix contrast; give it a contrasting container.
- Don't make trading volume, extreme leverage, or fictional profit the objective of the learning game.
