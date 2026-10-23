# Paper Hands

A proposed DRMZ educational web app where beginners learn perpetuals through virtual trading, contextual Morpheus guidance, and XP for demonstrated understanding. The target is a responsive progressive web app for laptop and phone, with a guided first task that introduces tools gradually.

## Trade Architecture and Workflow

The user interface gathers the student's decision. The read-only adapter fetches provider data. The deterministic paper engine calculates and validates virtual execution. The local account ledger records the result. Morpheus explains the mechanism; it does not replace the calculation engine. The following diagram is the intended live-observation workflow, not the skeleton's network behavior. In `skeleton-ui/`, an explicitly fictional scenario supplies the quote locally; the rest of the first-trade loop uses the shared deterministic engine.

```mermaid
flowchart TD
    A[Student chooses a practice trade] --> B[Browser requests a quote]
    B --> C[Read-only API adapter]
    C --> D[Strike public APIs]
    D --> E[Normalize mark, book, rules, and fee]
    E --> F{Valid and fresh inputs?}
    F -->|No| G[Pause trading and explain the issue]
    F -->|Yes| H[Paper engine previews size and fill]
    H --> I{Liquidity, rules, and funds sufficient?}
    I -->|No| G
    I -->|Yes| J[Student reviews and confirms]
    J --> K[Refresh quote and validate again]
    K --> L{Material price change?}
    L -->|Yes| H
    L -->|No| M[Record virtual position and entry fee]
    M --> N[Observe mark price and margin warning]
    N --> O[Student requests close]
    O --> P[Fresh book and fee validation]
    P --> Q{Exit liquidity available?}
    Q -->|No| G
    Q -->|Yes| R[Settle virtual result and journal]
    R --> S[Student reflects with Morpheus guidance]
    S --> T[Complete lesson objective and award XP once]
```

The initial engine is browser-local, with no server-side user account or funds custody. An agent can read this brief and call public data routes, but automated paper order APIs, account sync, and autonomous trading agents are separate future capabilities. Installation of a skill file alone does not create them.

See [LICENSE](LICENSE) for terms.
