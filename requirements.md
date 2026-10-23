### User requirements

| ID | Requirement | Acceptance criterion |
| --- | --- | --- |
| UR-01 | Enter a guest workspace without a deposit or wallet | Browser opens with virtual funds; no payment or signing flow |
| UR-02 | Use either dark or light theme | Toggle and explicit theme URL work on laptop and phone |
| UR-03 | Explore available Strike markets | Select options come from the market-config response; current source is identified |
| UR-04 | Understand exposure before entering | Review shows direction, actual quantity, full exposure, margin, leverage, fee, and source |
| UR-05 | Practice opening and closing a virtual position | Journal and wallet reconcile with deterministic fee and P&L calculations |
| UR-06 | Distinguish live observations from samples | Strike snapshots and sample scenarios are labeled and have separate virtual accounts |
| UR-07 | Get explanations at the point of need | Morpheus topics explain perpetuals, margin, leverage, funding, and risk |
| UR-08 | Complete lessons for XP | Correct objective check awards once per lesson version; reflection exercises require a submitted reflection |
| UR-09 | Review and retain practice history | Journal shows open/close results; account JSON can be exported |
| UR-10 | Use the app across screen sizes | Single-column phone layout and wider laptop workspace retain essential controls |
| UR-11 | Know where progress is stored | UI explains browser-local persistence and loss on clearing site data; no automatic cross-device-sync claim |
| UR-12 | Continue learning when feeds fail | Lesson content remains usable; dependent Strike practice orders pause; sample mode is explicit |
| UR-13 | Discover features through the active learning task | First visit exposes one main action; later tools appear when needed, without a forced account tour |
| UR-14 | Practice a first trade before learning advanced controls | First exercise uses fixed 1× and reveals direction, size, review, position, and reflection in order |
| UR-15 | Recover from a misconception with useful feedback | Incorrect ownership answer explains price exposure; retry remains available; no XP for clicking through |
| UR-16 | Resume or revisit the current guided task | Valid local state resumes; back before placement keeps selections and cannot duplicate an order |

### System requirements

| ID | Requirement | Acceptance criterion |
| --- | --- | --- |
| SR-01 | Read-only Strike connector | Backend allows only fixed GET endpoints and validated symbols; no arbitrary upstream URL or trading route |
| SR-02 | Runtime schema validation | Invalid symbols, prices, fees, books, or configuration prevent practice admission |
| SR-03 | Track source and observation times separately | Book engine `T` is checked; response time alone is not described as data freshness |
| SR-04 | Reject stale paper liquidity | Book older than 30 seconds, invalid time, or implausible clock skew blocks admission |
| SR-05 | Enforce paper execution rules | Full displayed depth, min size/notional, max size, step grid, leverage tier, and available balance checks |
| SR-06 | Use decimal arithmetic | Fixed-point decimal strings are used for account mutations; documented precision limitations are visible |
| SR-07 | Revalidate after user review | Confirmation fetches another quote; average-price drift greater than 0.5% requires another review |
| SR-08 | Make a paper action atomic in the UI | Duplicate confirmation is disabled; one completed state mutation produces one journal entry |
| SR-09 | Persist and validate local state | Versioned account restored with shape checks; storage failures reported; unsupported data does not become a valid position |
| SR-10 | Handle provider failures | Timeout and HTTP/schema failures produce explicit state; do not fabricate a successful response |
| SR-11 | Bound traffic | Poll selected market at 10 seconds while visible; candle refresh at 60 seconds; bound request duration and response size |
| SR-12 | Keep secrets out of the browser | Initial market-data integration uses no credentials; no private API token or wallet key is requested |
| SR-13 | Support PWA basics | Manifest and icons served; service worker caches the app shell, never invents or caches an API response as current |
| SR-14 | Maintain accessible interactions | Named controls, keyboard focus, modal dialogs, text status updates, reduced motion, and chart summaries |
| SR-15 | Protect the document boundary | Agent brief download is current; UI copy does not imply unimplemented funding, liquidation, or AI capabilities |
| SR-16 | Validate learning awards | Awards are idempotent by lesson/version; capstone requires a recorded close and a reflection |
| SR-17 | Separate lesson progression from trading calculations | Explicit state transitions gate actions; deterministic engine owns every balance mutation |
| SR-18 | Keep the skeleton independent of live infrastructure | Guided exercise runs with no API token or network; invented scenarios are labeled throughout |
