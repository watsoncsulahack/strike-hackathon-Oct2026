# Instructions for coding agents

## Read first

1. `Product.md` — business purpose, audience, mission, problem, solution, and value.
2. `requirements.md` — user and system requirements and acceptance criteria.
3. `design.md` — visual design, feature presentation, and learner interactions; reconcile provisional styling against DRMZ's actual website CSS.
4. `ER.md` — the existing conceptual relationships; do not treat it as a database schema.
5. `docs/backlog.md` — implementation tasks, priorities, status, and acceptance evidence.
6. `docs/metrics.md` — dated ecosystem research, distinct from learner analytics.
7. `.gemini/skills/` — reference material, not authorization to execute real-money actions. Specific instructions here govern this educational app work.

## Implementation boundaries

- Work only with virtual balances and orders. Never forward a practice action to an exchange order route.
- Use public, fixed-host, read-only market endpoints. Never ask for or commit a wallet seed, private key, API trading secret, or `.env` contents.
- Keep scenario, replay, and observed market data explicitly labeled. Do not fabricate a live feed or silently fall back to invented prices.
- Deterministic code owns balances, fills, fees, and P&L. An AI response may explain verified numeric outputs; it may not invent them or override the ledger.
- The shared engine uses 8-decimal fixed-point arithmetic and an educational isolated-loss cap. Funding settlement and venue liquidation are not implemented. Do not call the simulator venue-exact.
- Validate restored local data, quote freshness, market constraints, and fees. Confirm after review and recheck observations before opening a live-data paper position.
- Keep provider payloads and failure evidence reproducible without publishing personal identifiers or credentials.

## Verification and workflow

Once the source and package scripts are available, run `npm run build` and `npm test` after relevant changes. Add meaningful tests for new financial behavior or progression rules. Use browser QA such as [Stagehand](https://github.com/browserbase/stagehand) for responsive layout, keyboard/touch, focus, saved progress, theme contrast, and understandable next actions. Source tests cannot establish usability.

Record actual provider dry-run test results with time, environment, payload shape, and failure behavior. A mocked response, an HTTP denial, or an unreachable network is not a live pass. Do not mark a backlog item complete without its acceptance evidence.

Do not overwrite existing research or force-push shared history. Do not redeploy a hosted site solely because this source handoff exists. Media publication remains deferred until requested.
