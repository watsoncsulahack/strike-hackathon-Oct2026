# Agent handoff

Prepared 2026-10-23. The goal is to give a bring-your-own coding agent enough product, visual, and technical context to continue DRMZ Paper Hands without reconstructing the conversation.

## Publication scope

Only Markdown documents are published now. UI source, scripts, tests, images, and video were explicitly deferred. Implementation paths below identify the prepared local package and are not available in this commit. Obtain or implement those components before running application checks. Keep media publication deferred until requested.

## Prompt to give your coding agent

> Read AGENTS.md and ingest design.md as the canonical brief. Obtain or implement the deferred skeleton-ui/ source, then build the educational Paper Hands experience, keeping the gradual first-trade flow and both DRMZ themes. Preserve the existing hackathon metrics and skills. After source is available, first review the UI on phone and laptop and report usability findings. Then verify the public Strike API contract in reference-prototype/src/worker-server.js using actual responses. Connect verified data to the guided flow with deterministic paper execution and explainable feedback. Keep fictional scenarios separate, preserve one-time learning XP, and introduce advanced tools only when their lesson needs them. Update acceptance evidence and the backlog after checks pass. Do not place real orders or request trading secrets. Treat the deferred video as an earlier concept and use the revised storyboard for a future edit.

## What the user wants

The learner should not have to understand an exchange dashboard before starting. There is no separate compulsory onboarding form. The first task itself teaches the interface, terms, and sequence. The beginner sees the next useful action and receives an explanation at the moment it matters.

The initial educational objective is distinguishing perpetual price exposure from owning an asset. A successful first session includes making a direction/size decision, reviewing, observing a price change, closing, and correcting misconceptions. A losing virtual trade can complete the learning objective.

## Prepared local technical map — source publication pending

| Component | Location | Responsibility |
| --- | --- | --- |
| Guided state model | `skeleton-ui/model.js` | Ordered steps, permitted transitions, sample quotes, reflection and XP gates |
| Guided presentation | `skeleton-ui/main.js`, `index.html`, `styles.css` | Contextual content, controls, local resume, responsive styles |
| Theme builder | `scripts/build-theme.mjs` | Generate both CSS themes from canonical color tokens |
| Paper engine | `reference-prototype/src/engine.js` | Fixed-point math, depth estimates, constraints, balance mutations, close and awards |
| Market adapter | `reference-prototype/src/worker-server.js` | Fixed-host public GET routes, aggregation, failure handling |
| Reference assembler | `reference-prototype/scripts/assemble.mjs` | Portable Worker artifact and reference PWA shell |
| Local development server | `scripts/serve.mjs` | Serve guided files by default; opt-in reference Worker mode |
| Progression checks | `tests/onboarding.test.mjs` | Direction/size gates, entry/close order, outcomes, restore and idempotent XP |
| Existing technical checks | `reference-prototype/tests/` | Math, constraints, mocked API and Worker artifacts |

## Integration sequence

1. Obtain or implement source, scripts, tests, and required assets; then complete B-30: beginner, phone/laptop, both themes, keyboard/touch, zoom, errors, back/resume. Record observations instead of assuming the design is intuitive.
2. Complete B-13: reach the actual public provider; verify symbols, book timestamp, fees, market constraints, funding units, failure semantics, and polling limits. Keep a dated redacted response fixture. If blocked, record the block.
3. Complete B-31: add an explicit observed-data practice mode. Scope accounts by source, revalidate on confirmation, handle stale/unavailable inputs, and never substitute fictional data under a live label.
4. Complete B-32: explain the actual calculated result, including both fees, direction, and what was not modeled. Only then consider an AI-backed Morpheus tool layer.
5. Complete B-33 and B-34: progressively introduce the next lessons, port the PWA shell, and recut the video from approved UI.

## Honest limits

The skeleton makes no API calls and is not yet an installable PWA. The reference has a PWA shell, but browser/offline QA and real-provider validation are pending. Curated guidance is not an AI service. No sync, hosted learner database, funding settlement, venue liquidation, scholarships, or bounty payments are implemented. The historical SPO/trading-profit concept is background, not a prerequisite or financial promise of this learning MVP.

The deferred video and theme comparison are concept media and are not included in this commit. They are not proof that the UI was browser-tested or that a live integration succeeds. Historical local automated checks ran without contacting Strike; their source is deferred.
