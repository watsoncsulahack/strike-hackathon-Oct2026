# DRMZ Paper Hands — Product

## Business Concept

DRMZ Paper Hands is a proposed educational web experience where students learn perpetual-futures trading through guided lessons, virtual trading, and explanations from Morpheus. It extends DRMZ's Web3 education and community onboarding work into practical, interactive learning.

The primary audience is students and other beginners, including people who have never placed a trade or used a crypto wallet. Educators and DRMZ community facilitators can use the experience to introduce concepts and support discussion.

DRMZ is building a learning product that combines:

- Short lessons connected to practical trading decisions.
- Market observations from Strike alongside clearly identified virtual funds and positions.
- Morpheus guidance that helps learners understand decisions and explain outcomes.
- Focused scenarios for exploring mechanisms such as leverage, funding, and liquidation.
- XP that recognizes demonstrated understanding and learning progress.

The intended home is a page within DRMZ's existing website, accessible from a laptop or phone. A progressive web app can offer optional installation while preserving access through the browser.

The hackathon provides an initial opportunity to demonstrate the concept. The product can continue developing with DRMZ beyond that event. Sponsorships, educational partnerships, and grants are possible ways to support operation and curriculum development; a business model and funding commitments have not been established.

## Mission Statement

Make perpetual-futures trading understandable through accessible, guided practice that builds financial literacy and informed judgment without requiring students to risk real funds.

## Problem Statement

Beginners encounter unfamiliar concepts such as long and short positions, margin, leverage, fees, funding, and liquidation. Definitions alone can leave them unable to explain how those mechanisms affect a position or account balance.

Trading interfaces often present many controls and statistics before a learner understands their purpose. Someone can place a simulated trade or finish with a positive balance without understanding what happened. Practicing with real funds makes those early gaps in understanding financially consequential.

DRMZ needs an experience that connects explanation, practice, and feedback within its own educational environment. The experience must feel like part of the DRMZ website and remain understandable on both desktop and mobile screens.

## Solution Statement

Build a browser-based perpetuals learning experience that introduces concepts and controls through the learner's active task. A student starts with a small guided exercise, makes a decision, observes its consequences, and explains the result. Additional tools appear as the lessons make them relevant.

Gobi's guided practice and gradual introduction of features provide an experience reference. DRMZ's own website provides the visual identity and integration context.

| Product capability | Intended learner experience |
| --- | --- |
| Guided lessons | Learn a concept, make a prediction, practice, and receive feedback in a short session. |
| Virtual trading | Open, observe, and close practice positions using fictional balances and verified Strike market observations when available. |
| Morpheus assistance | Ask questions, receive contextual explanations, and review outcomes using the simulation's actual calculations. |
| Focused scenarios | Explore a specific mechanism under controlled conditions, with invented or historical inputs clearly distinguished from current market observations. |
| Learning XP | Earn progress for completing an objective and demonstrating understanding, with supportive opportunities to retry. |
| Practice review | Connect price movement, fees, and any modeled funding to the outcome of a virtual trade. |
| Responsive access | Continue using the same product through a desktop or mobile browser, with installation optional. |

A first practice session should introduce market choice, direction, position size, review, observation, closing, and reflection in context. Later lessons can introduce more complex mechanisms and tools. Exact game rules, XP values, interface specifications, and acceptance criteria belong in their dedicated documents.

Integration into DRMZ's Next.js website on Vercel is a product constraint. The experience should reuse the website's actual styling, typography, spacing, navigation, and component conventions. Existing colors sampled from logo artwork are provisional references; they do not establish the website's CSS. Website styling must be inspected and documented before treating the visual direction as settled.

Strike supplies market observations; Paper Hands supplies the virtual account, simulated execution, learning activities, and progress. All practice balances and orders remain virtual. Morpheus explains verified outcomes and leaves meaningful practice decisions to the learner. Funding and liquidation lessons must identify which venue rules are reproduced and which behaviors are educational approximations.

The initial product does not depend on live-money trading, deposits, withdrawals, trading profits, bounty payments, or cash rewards. XP represents educational progress. Browser access across devices does not by itself imply synchronized accounts or learning history.

## Value Proposition

For students learning perpetuals, DRMZ Paper Hands connects unfamiliar concepts to observable consequences through Morpheus-guided practice, real market observations, and virtual funds inside the DRMZ learning environment.

| Audience | Value |
| --- | --- |
| Students and beginners | An approachable place to practice, ask questions, make mistakes, and explain what happened without committing real funds. |
| DRMZ | A reusable educational product that expresses its mission through an interactive experience integrated into its website. |
| Educators and community facilitators | Short, repeatable activities that make misconceptions visible and create opportunities for feedback and discussion. |
| Strike ecosystem | An educational use of its public market data that helps learners understand perpetual-market mechanics. |

The central outcome is understanding: a learner can explain their exposure, identify the costs and risks that affected a position, and justify a practice decision. Learning progress can be recognized even when a virtual trade loses money.
