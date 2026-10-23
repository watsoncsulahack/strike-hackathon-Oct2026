# Paper Hands — Entity Relationships

## Model and source

This is the conceptual relationship model from the existing draw.io diagram, reproduced in Markdown for reading alongside the product documentation. The editable source is [DRMZ-Agent-Relationships.drawio](docs/DRMZ-Agent-Relationships.drawio).

The five entities and five connections are preserved. The source uses crow's-foot cardinality markers but leaves its relationship names blank. The generic “relates to” labels below make the Mermaid diagram readable without inventing ownership or operational contracts.

## Diagram

```mermaid
erDiagram
    direction TB
    DRMZ ||--|{ CODING_AGENT : "relates to"
    DRMZ ||--|{ CARDANO_NODE : "relates to"
    CODING_AGENT }|--|{ STRIKE : "relates to"
    CODING_AGENT }|--|{ CARDANO_NODE : "relates to"
    CODING_AGENT }|--|{ DEFILLAMA : "relates to"
```

## Entities

| Diagram entity | Name in the source | Interpretation in this product's context |
| --- | --- | --- |
| DRMZ | DRMZ | The organization and community supplying the product purpose, educational context, and host website. |
| CODING_AGENT | Coding Agent | Development and research tooling that uses the repository and relevant data sources. |
| CARDANO_NODE | Cardano Node | Infrastructure for blockchain observations and research verification. |
| STRIKE | Strike | The intended source of public market observations for the educational trading experience. |
| DEFILLAMA | DefiLlama | An external source used for comparative protocol research and metrics. |

The coding agent is distinct from Morpheus, the learner-facing guide described in [UI.md](UI.md). The diagram does not make the coding agent an autonomous trading service.

## Relationship cardinalities

| Source connection | Cardinality shown in the source |
| --- | --- |
| DRMZ → Coding Agent | One-to-many |
| DRMZ → Cardano Node | One-to-many |
| Coding Agent ↔ Strike | Many-to-many |
| Coding Agent ↔ Cardano Node | Many-to-many |
| Coding Agent ↔ DefiLlama | Many-to-many |

The source's mandatory-one and one-to-many endpoint markers are transcribed as one and one-or-more in Mermaid. These are conceptual model markings, not verified deployment counts or requirements for multiple live providers. Specific relationship verbs and operational multiplicities remain to be confirmed before using this model to constrain implementation.

## Scope and implementation use

This diagram describes ecosystem relationships. It does not define database tables, primary keys, foreign keys, or a learner-account schema. No such attributes have been added to the source model.

A learner does not need to operate a Cardano node to use the web app. Node and DefiLlama relationships describe research context; their presence does not require those services in every practice-trade request. Strike observations and virtual execution remain separate, as described in [Product.md](Product.md), [requirements.md](requirements.md), and the [trade workflow](README.md#trade-architecture-and-workflow).

Use [docs/metrics.md](docs/metrics.md) for the existing research snapshot and its provenance. A future persistence model should explicitly address saved progress, accounts, positions, journal records, and learning awards when those implementation decisions are made; it should not be inferred from this ecosystem diagram.
