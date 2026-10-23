# Paper Hands — User Interface

## Purpose and document boundaries

This document defines the learner-facing interface: which features are presented, when they appear, what actions do, and how the experience responds. It describes intended behavior, not a claim that an application is implemented.

| Document | Responsibility |
| --- | --- |
| [Product.md](Product.md) | Business purpose, audience, mission, problem, solution, and value. |
| [UI.md](UI.md) | Feature presentation, navigation, interaction, feedback, and recovery. |
| [design.md](design.md) | Visual styling and component appearance, aligned with DRMZ's actual website. |
| [requirements.md](requirements.md) | Testable user and system requirements. |
| [ER.md](ER.md) | Conceptual relationships among the organizations, tools, and services in the existing diagram. |
| [docs/backlog.md](docs/backlog.md) | Implementation tasks, priorities, status, and acceptance evidence. |

The interface is a responsive webpage within DRMZ's Next.js/Vercel environment. Browser access is the starting point; optional PWA installation must not block practice. Gobi informs the gradual learning flow. DRMZ's website supplies the visual conventions. Logo-derived colors remain provisional until the website styling is inspected.

## Entry and navigation

A new visitor sees one invitation to start a practice exercise, a short explanation of virtual funds, access to Morpheus guidance, and the theme control. No account form, wallet connection, deposit, or compulsory product tour blocks entry.

The first task introduces the interface through use. Market statistics, a lesson catalog, journal navigation, and advanced trade controls appear when the learner has context for them. The welcome state must not expose the entire trading workspace.

After the first exercise, the product can introduce these destinations:

| Destination | Learner purpose | When it becomes relevant |
| --- | --- | --- |
| Learn | Choose a lesson and understand its objective and completion criteria. | After the initial task; later lessons can return here. |
| Practice | Apply a concept through a virtual trade or a labeled scenario. | During the first exercise, initially with restricted controls. |
| Journal | Review the decisions, execution assumptions, costs, and outcome of practice. | Once a practice action has created a record. |
| Progress | Inspect completed objectives, learning XP, and the next available lesson. | When the learner completes an objective. |

These are functional destinations, not prescribed URL paths or a requirement for a permanent sidebar. A learner should be able to identify the current task, next action, practice mode, and route back to their learning context.

## First guided exercise

The first exercise uses fixed 1× leverage. It can run with explicitly fictional inputs independently of the market feed. Learning controls must identify a controlled price change as a scenario action.

| Step | What is shown | Action and resulting behavior |
| --- | --- | --- |
| Start | Objective, virtual-only status, and an invitation from Morpheus. | Begin without registering. |
| Market | A small set of clearly labeled choices with units and data source. | Select the market; explain contract exposure versus ownership. |
| Direction | Long and short, each with a plain-language explanation. | Choose a direction before continuing. |
| Size | Virtual margin, available practice balance, fixed leverage, and input help. | Choose a valid size; explain invalid input without losing earlier choices. |
| Review | Market, direction, quantity, full exposure, margin, leverage, fee estimate, and source. | Review or go back. A preview does not open a position. |
| Open and observe | The confirmed virtual position, current price, price P&L, and costs identified separately. | Explore a scenario price change or observe verified market data, according to the selected mode. |
| Close and reflect | Closing result, both trading fees, applicable modeled funding, and a short objective check. | Close the position, inspect what happened, and correct misconceptions. |
| Complete | The demonstrated objective, XP outcome, practice record, and next lesson. | Continue or retry; repeating a completed lesson does not duplicate its award. |

Back navigation before confirmation preserves selections and never creates an order. Navigating away from an open position preserves the position and explains how to return to it. Reopening or refreshing the interface must not repeat a confirmed action.

A virtual loss can still complete the learning objective. Feedback should connect the learner's decision to the observed result.

## Practice actions and feedback

### Review, confirmation, and execution

Use explicit action labels such as “Review practice trade,” “Place practice trade,” and “Close practice position.” Show whether the action will change the virtual account.

In observed-data mode, confirmation refreshes and revalidates the necessary observations, market rules, liquidity, fees, and available funds. Apply the existing stale-data and price-drift rules in requirements.md. A price change beyond the review threshold returns the learner to an updated review. Never silently accept a materially different trade.

While an action is processing, show its state and prevent duplicate submission. On success, show the recorded position or close result. On failure, explain the reason, preserve the learner's choices and any existing position, and offer a relevant recovery action.

### Position and results

Distinguish current mark price, entry price, estimated closing price, unrealized price P&L, and settled wallet result. Explain which fees have already been charged and which are estimates. Display funding or liquidation calculations only when the corresponding model exists, with its assumptions visible.

Closing requires the inputs needed by the simulation. If fresh exit liquidity is unavailable, leave the position open and explain why settlement could not proceed.

The result view should answer: What did I choose? What changed? What costs affected the outcome? What did the practice contract represent? Morpheus may explain these facts; deterministic calculations supply the numbers.

### Data modes and service states

| State | What the learner sees | Available behavior |
| --- | --- | --- |
| Current observed data | Provider, observation time, relevant units, and freshness status. | Dependent practice actions can proceed after validation. |
| Loading | A visible request state and preserved selections. | Wait or retry; no order is implied. |
| Stale, unavailable, or invalid data | The affected input and an understandable reason. | Pause dependent actions; retain the position and learning progress. |
| Illustrative scenario | A persistent fictional-input label and any controlled price actions. | Practice with the scenario's separate virtual account. |
| Historical replay, when implemented | Recorded source, market period, and simulation time. | Advance according to the replay rules; do not describe it as live. |
| Offline | Connection state and the availability of cached content. | Use available lessons or an explicitly supported scenario; observed-data execution remains paused. |

A source change is explicit. It never relabels fictional data as current market observations. Separate accounts retain each mode's positions and history when switching; switching is not an instruction to close, reset, or duplicate a position.

## Morpheus, lessons, and XP

Morpheus offers contextual explanations and optional hints alongside the active task. On a phone, guidance can expand into a panel or sheet that preserves the current decision and returns focus correctly when dismissed. On a larger screen, it can sit beside the task without competing with the primary action.

Curated guidance must be labeled accurately. Conversational AI is a future capability until connected and verified. An AI response must use verified simulation results and state uncertainty about missing information. The learner makes the practice decision.

Each lesson exposes an objective and completion criteria. The interface supports explanation, prediction, action, reflection, and useful feedback. It distinguishes available, completed, and later content through text as well as styling.

Completion feedback explains why XP was earned. XP recognizes understanding rather than fictional profit, leverage, trade frequency, or resets. A misconception leads to an explanation and another attempt. Exact curriculum, scenario rules, and XP amounts can be specified separately without changing this interface contract.

## Journal, saved progress, and device behavior

The journal presents practice actions in order, including source or mode, quantities, costs, and calculated outcomes. Export explains what is included and uses the account's recorded values. Validating imports and migrations is a separate backlog capability.

Guest progress is stored in the current browser when storage is available. Explain that clearing site data can remove it and that another device does not automatically share it. If storage is unavailable or a saved record cannot be restored, explain the situation and offer a clear recovery choice; do not silently erase progress.

Phone and desktop layouts retain the same decisions and essential information. Use labeled controls, keyboard access, visible focus, accessible status messages, readable chart summaries, zoom support, and touch interaction. Switching layout or theme must not reset the task. Appearance and exact layout tokens belong in design.md and must follow the host website.

## Traceability to requirements and backlog

| Interface feature | Requirement references | Backlog references |
| --- | --- | --- |
| Guided guest entry and task progression | UR-01, UR-13–UR-16; SR-17, SR-18 | B-29, B-30 |
| Trade review, confirmation, and feedback | UR-03–UR-05; SR-02–SR-08 | B-03–B-07, B-31 |
| Position observation and closing result | UR-04, UR-05; SR-05, SR-06 | B-06, B-14, B-17, B-18 |
| Explicit modes and provider failure recovery | UR-06, UR-12; SR-01, SR-03, SR-04, SR-10, SR-11 | B-08, B-13, B-31 |
| Lessons, reflection, and learning XP | UR-08, UR-15; SR-16, SR-17 | B-10, B-22, B-32, B-33 |
| Contextual Morpheus guidance | UR-07; SR-15 | B-11, B-21, B-32 |
| Journal and browser-local progress | UR-09, UR-11, UR-16; SR-09 | B-09, B-24 |
| Responsive and accessible interactions | UR-02, UR-10; SR-14 | B-02, B-12, B-30 |
| Optional installation and offline shell | UR-12; SR-13 | B-33 |
| Later order controls and deeper practice | UR-04, UR-07; SR-05 | B-19, B-20, B-33 |

Backlog status is implementation evidence, not a substitute for this behavior description. Existing “Implemented” entries referring to earlier local work must be rechecked against the source actually available to the coding agent. Review the first-trade flow with a beginner on phone and laptop, including keyboard/touch, errors, back navigation, resume, and both themes, before describing it as validated.
