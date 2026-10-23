## Feature Backlog

Status vocabulary: **Implemented** = source and targeted checks exist; **Needs live verification** = provider code is present but actual upstream response has not been confirmed here; **Next** = not implemented; **Later** = outside the first slice. A published build and a fully verified MVP are different milestones.

Implementation statuses describe prepared local work whose source is deferred. Rows B-02 through B-11 and B-14 describe reusable work in the earlier technical reference, not a claim that all features are present in the new skeleton or published in this commit. CSS and state tests do not establish browser usability. Start the handoff with B-29 through B-32, then validate and connect the read-only provider.

| ID | Priority | Feature task for the coding agent | Status | Acceptance / dependency |
| --- | --- | --- | --- | --- |
| B-01 | P0 | Consolidate business, mission, value, themes, requirements, workflow, and backlog | Implemented | One ingestible design.md |
| B-02 | P0 | Implement dark and light semantic themes | Implemented | Toggle, URL selection, and both responsive layouts |
| B-03 | P0 | Build a read-only allowlisted Strike adapter | Needs live verification | Real success response for every documented app route |
| B-04 | P0 | Normalize market config, mark, book, and fee data | Needs live verification | Contract fixtures pass and actual payloads reconcile |
| B-05 | P0 | Reject stale or incomplete quote inputs | Implemented | Stale timestamp, invalid price, missing fee, and empty depth cases fail |
| B-06 | P0 | Implement one-position market-order paper engine | Implemented | Long/short entry, review, close, journal, and balance checks |
| B-07 | P0 | Revalidate price and funds at confirmation | Implemented | Drift >0.5% requires new review; duplicate action prevented |
| B-08 | P0 | Make sample mode explicit and separate | Implemented | No silent fallback or mixing of sample and Strike accounts |
| B-09 | P0 | Add local account persistence and JSON export | Implemented | Restore validation and clear local-storage limitations |
| B-10 | P0 | Provide eight beginner lessons and unique XP awards | Implemented | Feedback, retry, reflections, and capstone close prerequisite |
| B-11 | P0 | Add curated Morpheus topic explanations | Implemented | Guidance labeled as curated, not an AI chat integration |
| B-12 | P0 | Run browser QA on laptop and phone | Next | Open/close flow, theme toggle, dialogs, chart, lessons, export, and offline shell |
| B-13 | P0 | Run real-provider smoke tests | Next | Record time, environment, response shapes, stale/error cases, and provider status |
| B-14 | P0 | Reconcile simulator policies with educational copy | Implemented | Precision, funding, liquidation, and loss-cap limitations remain visible |
| B-15 | P1 | Replace polling with resilient public WebSocket streams | Next | Reconnect, backoff, frame splitting, sequence-aware books, and resnapshot |
| B-16 | P1 | Adopt venue-compatible decimal precision and rounding | Next | 19 significant digits and half-even rounding verified against reference values |
| B-17 | P1 | Add funding settlement with historical rate provenance | Next | Idempotent hourly events; reconnect catches up without inventing rates |
| B-18 | P1 | Implement venue-specific isolated liquidation behavior | Next | Dynamic tiers, fees, execution, and clear differences from actual venue infrastructure |
| B-19 | P1 | Add limit orders and cancellation | Next | Queue and fill assumptions explicit; no fills inferred solely from candles |
| B-20 | P1 | Add stop/target practice and gap scenarios | Next | Trigger vs execution distinguished; no guaranteed stop fill claim |
| B-21 | P1 | Connect Morpheus to an authorized AI backend | Next | Secrets server-side, grounded tools, uncertainty handling, and cost limits |
| B-22 | P1 | Review lesson accuracy and assessment quality with educators | Next | Novice pilot, misconception checks, accessibility review, and delayed recall |
| B-23 | P1 | Expose a controlled paper-only agent interface | Next | Explicit virtual-account scope, idempotency, audit trail, no live order forwarding |
| B-24 | P1 | Add data export/import and version migrations | Next | Validated import, safe schema upgrade, and no silent ledger changes |
| B-25 | P2 | Add optional identity and progress sync | Later | Guest remains usable; account merge and privacy rules defined |
| B-26 | P2 | Add reproducible scenario authoring and market replays | Later | Provenance, event-time ordering, versioned assumptions, and deterministic results |
| B-27 | P2 | Add educator cohorts and privacy-preserving learning reports | Later | Appropriate consent, aggregation, and access boundaries |
| B-28 | P2 | Validate hosting, data, AI, and curriculum funding | Later | Evidence for a sustainable education model; no trading-profit dependency |
| B-29 | P0 | Replace dashboard-first entry with contextual first-trade steps | Implemented | Skeleton model checks pass; browser usability remains B-30 |
| B-30 | P0 | Review guided UI on phone and laptop with a beginner | Next | Both themes, keyboard/touch, focus, back/resume, input errors, and next-action discoverability checked |
| B-31 | P0 | Connect verified Strike observations to the guided flow | Next | Real response evidence first; separate live/sample accounts; refresh on review; no silent fallback |
| B-32 | P0 | Add grounded feedback to the guided exercises | Next | Explain direction, price P&L, both fees, and ownership; deterministic calculations supply numeric facts |
| B-33 | P1 | Port PWA shell and deeper lessons into progressive discovery | Next | No cache presented as live data; advanced controls introduced only in relevant tasks |
| B-34 | P1 | Recut concept film using the approved guided UI | Next | Follow revised storyboard; show responsive layouts; maintain illustrative labels |
