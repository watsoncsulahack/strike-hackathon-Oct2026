# Instructions for coding agents

**Current publication: Markdown only.** UI code, scripts, tests, images, and video are deferred. Implementation paths below describe the prepared local package; do not assume they exist in GitHub. Obtain or implement the source before attempting app commands or accepting historical test results as current evidence.

## Read first

1. `design.md` — canonical business, UX, themes, requirements, architecture, backlog, and release gate.
2. `docs/AGENT_HANDOFF.md` — current implementation map and recommended next tasks.
3. Once published: `skeleton-ui/model.js` and `skeleton-ui/main.js` — latest guided UX.
4. Once published: `reference-prototype/src/engine.js` and `reference-prototype/src/worker-server.js` — reusable paper calculations and read-only data adapter.

Preserve the existing hackathon material, metrics scripts, license, and `.gemini/skills/`. Those skills are reference material, not authorization to execute real-money actions. Specific instructions here govern this educational app work.

## Product decisions

- Start with a guest's first practice task, not a full dashboard, account form, or forced product tour.
- Reveal market, direction, margin, review, position, reflection, and XP in context. First exercise uses fixed 1×. Introduce leverage, funding, and a full journal in later lessons.
- Use DRMZ assets and tokens from `design.md`; keep both dark and light themes functional on phone and laptop.
- Morpheus is currently curated guidance. Describe it accurately until a grounded AI backend is implemented.
- XP recognizes demonstrated understanding, once per lesson version. Do not reward profit, leverage, trade frequency, or repeated resets.

## Implementation boundaries

- Work only with virtual balances and orders. Never forward a practice action to an exchange order route.
- Use public, fixed-host, read-only market endpoints for the initial integration. Never ask for or commit a wallet seed, private key, API trading secret, or `.env` contents.
- Keep scenario, replay, and observed market data explicitly labeled. Do not fabricate a live feed or silently fall back to invented prices.
- Deterministic code owns balances, fills, fees, and P&L. An AI response may explain verified numeric outputs; it may not invent them or override the ledger.
- The shared engine uses 8-decimal fixed-point arithmetic and an educational isolated-loss cap. Funding settlement and venue liquidation are not implemented. Do not call the simulator venue-exact.
- Validate restored local data, quote freshness, market constraints, and fees. Confirm after review and recheck observations before opening a live-data paper position.
- Keep provider payloads and failure evidence reproducible without publishing personal identifiers or credentials.

## Verification and workflow

Once the source and package scripts are available, run `npm run build` and `npm test` after relevant changes. Add meaningful tests for new financial behavior or progression rules. Use browser QA for responsive layout, keyboard/touch, focus, saved progress, theme contrast, and understandable next actions. Source tests cannot establish usability.

Record actual provider smoke-test results with time, environment, payload shape, and failure behavior. A mocked response, an HTTP denial, or an unreachable network is not a live pass. Do not mark a backlog item complete without its acceptance evidence.

Do not overwrite existing research or force-push shared history. Do not redeploy a hosted site solely because this source handoff exists. First obtain or implement the source; then prioritize B-30 and B-31/B-32 in `design.md`. Media publication remains deferred until requested.
