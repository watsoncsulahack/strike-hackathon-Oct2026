# Strike Finance V2 — Live On-Chain & Platform Metrics

Comprehensive metrics snapshot captured on **October 22, 2026** directly cross-verified across three independent sources:
1. **Cardano Mainnet RPC Node** (Demeter.run Blockfrost dedicated gateway)
2. **DeFiLlama Public API & On-Chain Indexer** (`api.llama.fi`, using [strike-finance/DefiLlama-Adapters](https://github.com/strike-finance/DefiLlama-Adapters/blob/main/projects/strike-finance/index.js))
3. **Strike Finance Production REST API** (`api.strikefinance.org`)

---

## 1. Platform TVL & Multi-Chain Custody Reserves (Strike API)
*Source Endpoint:* `https://api.strikefinance.org/stat/v1/dashboard/treasury`

Strike V2 uses on-chain locker contracts deployed across Cardano and external networks. Inbound deposits of volatile collateral are automatically converted to stable backing via native DEX aggregators to maintain 1:1 USD reserves.

* **Total Value Locked (TVL):** **$1,862,599.74 USD**
* **Collateral Breakdown:**

| Asset / Locker | Value (USD) | Share (%) | Description |
| :--- | :--- | :--- | :--- |
| **USDM** | $769,215.83 | 41.30% | Cardano native fiat-backed stablecoin |
| **USDCx** | $478,453.03 | 25.69% | Cardano bridged USDC standard |
| **sUSDrf** | $270,755.15 | 14.54% | Staked / yield-bearing USD reserve fund |
| **USDC (Ethereum)** | $228,799.60 | 12.28% | Ethereum on-chain locker collateral |
| **ADA** | $69,298.76 | 3.72% | Cardano native asset locker |
| **Sundae USDCx/USDM LP** | $36,961.78 | 1.98% | SundaeSwap liquidity pool tokens |
| **iUSD** | $4,065.39 | 0.22% | Indigo synthetic USD |
| **USDC (Solana)** | $3,193.52 | 0.17% | Solana on-chain locker collateral |
| **aEthUSDC** | $1,856.67 | 0.10% | Aave Ethereum deposited collateral |

---

## 2. Comparative Analysis: Strike Native API vs. DeFiLlama
*DeFiLlama Page:* [defillama.com/protocol/strike-finance-perpetuals](https://defillama.com/protocol/strike-finance-perpetuals)  
*DeFiLlama API Endpoint:* `https://api.llama.fi/protocol/strike-finance-perpetuals`

Comparing Strike's direct API against third-party aggregators reveals crucial differences in TVL accounting and asset classification methodologies.

### Side-by-Side Comparison

| Metric / Dimension | Strike Native API | DeFiLlama API | Discrepancy | Accounting Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Base Protocol TVL** | **$1,862,599.74** | **$2,280,426.96** | **+$417,827.22 (+22.4%)** | DeFiLlama includes uncirculated native STRIKE in locker |
| **TVL incl. Staking** | *Separated* | **$2,645,564.23** | **+$782,964.49 (+42.0%)** | DeFiLlama adds Cardano staking pool ($365k) |
| **Ethereum Locker** | $228,799.60 | $228,774.44 | **-$25.16 (-0.01%)** | Near-exact 99.99% parity (minor oracle snapshot timing) |
| **Cardano Locker** | $1,628,749.95 | $2,051,652.53 | **+$422,902.58 (+26.0%)** | STRIKE governance tokens & ancillary ecosystem UTXOs |
| **Cardano Staking** | *Not in Exchange TVL* | $365,137.26 | **+$365,137.26** | 715,952.60 STRIKE tokens locked in staking contract |
| **Solana & Other Chains** | $5,050.19 | *$0 (Untracked)* | **-$5,050.19** | DeFiLlama adapter only scans Cardano & Ethereum |

### Root Causes of the Discrepancies

1. **Native Platform Token Filtering (STRIKE):**
   * **DeFiLlama's Adapter (`sumTokens.js`):** Scans all UTXOs at the Cardano contract address indiscriminately, counting **865,530.28 STRIKE tokens** valued at **~$441,420 USD** (priced at ~$0.5100/STRIKE).
   * **Strike Native API:** Intentionally **excludes** its own native platform/governance token from treasury TVL. Strike counts only real external collateral deposited by users to back perpetual positions (USDM, USDCx, sUSDrf, ADA), avoiding recursive valuation inflation.

2. **Primary Stablecoin Parity:**
   When examining actual dollar-pegged collateral backing, both platforms exhibit remarkable consistency:
   * **USDM:** Strike API reports `$769,215.83` vs. DeFiLlama reports `777,837.85 USDM` (~$777.8k).
   * **USDCx:** Strike API reports `$478,453.03` vs. DeFiLlama reports `478,569.69 USDCx` (~$478.5k).
   * **sUSDrf:** Strike API reports `$270,755.15` vs. DeFiLlama reports `269,232.21 sUSDrf` (~$269.2k).

3. **Multi-Chain Coverage:**
   * Strike's native API actively accounts for newer cross-chain locker integrations, including the **Solana locker** (`$3,193.52`) and **Aave Ethereum** (`$1,856.67`).
   * DeFiLlama's open-source adapter has not yet implemented the Solana locker address into its registry.

4. **Cardano Staking Isolation:**
   * DeFiLlama tracks a distinct `Cardano-staking` TVL component consisting of **715,952.60 STRIKE tokens** ($365,137.26 USD).
   * Strike's exchange API maintains separation between pure staking liquidity and trading locker margin reserves.

---

## 3. Direct Cardano Mainnet Node Verification (Demeter RPC)
*Node Gateway:* `https://cardano-mainnet.blockfrost-m1.demeter.run`  
*Contract Reference:* [DefiLlama-Adapters / strike-finance / index.js](https://github.com/strike-finance/DefiLlama-Adapters/blob/main/projects/strike-finance/index.js)

By querying the Cardano Mainnet directly via our authenticated Demeter Blockfrost node, we verify the raw UTXOs and tokens stored in Strike's smart contract addresses:

### Verified Smart Contract Addresses on Cardano Mainnet

| Contract Name | On-Chain Address / Policy ID | Verified Role | Live On-Chain Assets Found |
| :--- | :--- | :--- | :--- |
| **`strikeStaking`** | `addr1z9yh4zcqs4gh78ysvh8nqp40fsnxg49nn3h6x25az9k8tms6409492020k6xml8uvwn34wrexagjh5fsk5xk96jyxk2qf3a7kj` | Community Staking Pool | **715,952.597361 STRIKE** + **31,583.67 ADA** |
| **`strikePerpsScriptV2`**| `addr1z9nsxjyw7xgfw5jtfxcw7fxucte0277ununa4evyxcw3evg6409492020k6xml8uvwn34wrexagjh5fsk5xk96jyxk2q4366ry` | Strike V2 Execution Locker | **`PROTOCOL_POOL_NFT`** + **436.46 ADA** |
| **`strikeSnekPerpsScript`**| `addr1zy48lqwffvzkahcyrhj8982p3f7c002g098ly4zxzxefnlg6409492020k6xml8uvwn34wrexagjh5fsk5xk96jyxk2qst04fy` | SNEK Perpetuals Locker | **`PROTOCOL_POOL_NFT`** + **17,294,764 SNEK** |
| **`strikeBatching`** | `addr1q9mqsgrgdaq9aahjfcrc6f45sgmcut4gu3c774kqzawkjkhujht5h40l2yrm8e7r2vwr2g3tv64pzjgnxwsztwg0yu5s00jz00` | Transaction Batcher | 10,053 txs processed, 7.03M ADA lifetime flow |
| **`strikePerpsScriptV1`**| `addr1wy2gch9ua0700a3dg423wxcwx4p886m4ny5u3aqs66sluqcly9uud` | Legacy V1 Pool | 7,655 txs processed, 3.3B ADA lifetime volume |
| **`strikeTokenAddress`**| `f13ac4d66b3ee19a6aa0f2a22298737bd907cc95121662fc971b5275535452494b45` | Native STRIKE Asset ID | Max Supply: **25,000,000 STRIKE** (6 decimals) |

### Three-Way Triangulation Result

```text
======================================================================
CROSS-VERIFICATION & PARITY REPORT
======================================================================
Metric                         | Cardano Node     | DeFiLlama        | Parity Delta  
----------------------------------------------------------------------------------
Staked STRIKE Tokens           | 715,952.597361   | 715,952.597360   | 0.00000000%
Staked ADA Balance             | 31,583.67 ADA    | Not tracked      | N/A
V2 Protocol Pool NFT           | Present (Active) | Indexed          | Match
----------------------------------------------------------------------------------
Exchange Collateral TVL:
  Strike Native Treasury API:  $1,860,295.23 (User Collateral Only)
  DeFiLlama Protocol Index:    $2,299,437.95 (Difference: +$439,142.72 due to STRIKE tokens)
======================================================================
```

> **Automated Script:** You can re-run this exact three-way reconciliation anytime locally:
> ```bash
> python3 scripts/verify_onchain_metrics.py
> ```

---

## 4. Strike Finance AI Agent Skills Integration
*Reference Repository:* [github.com/strike-finance/strike-finance-skills](https://github.com/strike-finance/strike-finance-skills/)

The workspace is equipped with **13 official Strike Finance AI Agent Skills** installed locally in `.gemini/skills/` via `npx strike-finance-skills install --agents gemini`:

| Installed Skill | Description & Automated Use Case |
| :--- | :--- |
| **`strike-account`** | Read balances, portfolio equity, sub-accounts, server time, fee tiers, and market configs. |
| **`strike-auth`** | Ed25519 request signing (`METHOD:PATH:TIMESTAMP:NONCE:BODY_HASH`), API wallet key generation, and builder connect. |
| **`strike-calculations`** | Deterministic formulas matching backend execution: liquidation price, margin tiers, PnL, funding payments, and fee tiers. |
| **`strike-deposit`** | Multi-chain deposit pipeline (quotes, transaction building, user signing, confirmations). |
| **`strike-withdraw`** | Withdrawal quote estimation, validator co-signatures, margin limit checks, and queue positions. |
| **`strike-trading`** | Limit, market, trigger (stop-loss/take-profit) orders, batch placement, and atomic replace. |
| **`strike-market-data`** | Public REST market data: depth snapshots, trades, open interest, funding rates, tickers, and klines. |
| **`strike-orderbook`** | L2 order book snapshots, top-20 WebSocket diffs, and L3 market-by-order book feeds. |
| **`strike-trades`** | Real-time and historical trade streams. |
| **`strike-price-feeds`** | Public WebSocket feeds for live prices, mark prices, and candle updates. |
| **`strike-userstream`** | Authenticated WebSocket (`session.logon`) streaming fills, order updates, account margin changes, and position triggers. |
| **`strike-history`** | Order, fill, funding, and transaction audit logs. |
| **`strike-klines`** | Candlestick time-series analytics. |

---

## 5. User Engagement & Growth
*Source Endpoint:* `https://api.strikefinance.org/stat/v1/dashboard/users`

* **Tracked Platform History:** 218 days
* **Daily Active Users (DAU):** 230 – 300 active traders/day
* **New Traders Onboarded:** 25 – 40 new users/day

### Recent 5-Day Trend
| Date (UTC) | Daily Active Users (DAU) | New Users |
| :--- | :--- | :--- |
| **2026-10-18** | 263 | 28 |
| **2026-10-19** | 276 | 34 |
| **2026-10-20** | 276 | 27 |
| **2026-10-21** *(Hackathon Launch)* | 301 | 39 |
| **2026-10-22** | 229 | 9 (in progress) |

---

## 6. Top Markets: Open Interest, Prices & Basis
*Source Endpoints:* `https://api.strikefinance.org/price/v2/openInterest` & `/v2/premiumIndex`

Comparing **Mark Price** (Strike Node execution price) against **Index Price** (underlying oracle benchmark) highlights real-time basis discrepancies available for arbitrage or keeper spread compression.

| Symbol | Mark Price | Index Price | Basis (%) | Funding Rate (8h) | Notional Open Interest (USD) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ADA-USD** | $0.2185 | $0.2182 | +0.1145% | 0.0000% | **$419,485.29** |
| **NIGHT-USD** | $0.0399 | $0.0398 | +0.1233% | 0.0000% | **$143,986.14** |
| **WTI-USD** | $99.2723 | $99.2655 | +0.0068% | 0.0000% | **$108,338.79** |
| **BTC-USD** | $82,413.00 | $82,449.24 | -0.0439% | 0.0000% | **$105,239.75** |
| **ETH-USD** | $2,430.58 | $2,430.99 | -0.0165% | 0.0000% | **$55,811.09** |
| **XAU-USD** (Gold) | $4,094.60 | $4,091.98 | +0.0641% | 0.0000% | **$54,888.14** |
| **HYPE-USD** | $78.6530 | $78.6645 | -0.0146% | 0.0000% | **$46,407.64** |
| **ZEC-USD** | $1,267.59 | $1,267.82 | -0.0180% | 0.0000% | **$40,907.64** |
| **XRP-USD** | $1.3406 | $1.3408 | -0.0174% | 0.0000% | **$29,839.34** |
| **SOL-USD** | $104.48 | $104.51 | -0.0372% | 0.0000% | **$22,931.37** |
| **SP500-USD** | $7,689.60 | $7,691.38 | -0.0232% | 0.0000% | **$15,702.16** |
| **XAG-USD** (Silver) | $56.1730 | $56.1270 | +0.0819% | 0.0000% | **$14,248.95** |

> **Key Observation:** **ADA-USD** dominates platform open interest at ~$419.5k, followed by **NIGHT-USD** ($144.0k) and **WTI-USD** oil perps ($108.3k).

---

## 7. Public Vaults & Liquidity Performance
*Source Endpoint:* `https://api.strikefinance.org/v2/vaults`

Public vaults allow users to allocate capital to automated market-making and programmatic strategies.

### Strike Liquidity Provider (SLP) — Official Protocol Vault
* **Vault ID:** `3fd3ab0b-318b-4f99-9ad6-66e9e917bea8`
* **Status:** Verified Active Protocol Vault
* **Total Equity (TVL):** **$1,029,890.92 USD** (898,998 shares @ $1.1456 / share)
* **Unique Depositors:** 243
* **Annualized APR:** **19.64%**
* **Sharpe Ratio:** **1.5993**
* **All-Time Realized PnL:** **+$88,100.80 USD**
* **Cumulative Flow:** $3,550,595 deposits / $2,608,806 withdrawals

### Featured Algorithmic & User Vaults
* **Glacier Arc Digital** (`2e782d92-86f0-48f2-9171-eb0c4633656e`):
  * Institutional market making 24/7 across listed pairs.
  * Equity: **$42,992.05 USD** | Depositors: 24 | Total deposits: $304,758
* **Strike V.I.S.I.O.N. Strategy** (`207ec034-1692-4864-a19b-b0fb9ce2e7ac`):
  * Systematic quantitative signal execution with stop-loss controls.
  * Equity: **$11,160.03 USD** | APR: **70.03%** | Depositors: 4
* **MARKET WIZARDS** (`536b4d72-687d-5e8e-a3be-cef0757c795f`):
  * Systematic positional trading across equities, commodities, crypto.
  * Equity: **$1,897.40 USD** | Depositors: 5

---

## 8. Cross-Platform Copy Trading Discovery
*Source Endpoint:* `https://api.strikefinance.org/v2/copy/discover`

* Integrates and ranks high-performing traders from both **Strike** and **Hyperliquid**.
* Exposes 30-day cumulative PnL sparklines, ROI windows, maximum drawdown, and fixed-ratio capital allocation curves.
* Top indexed leads manage portfolios ranging from retail accounts to whales exceeding $200M+ account equity.

---

## 9. Alignment with DeFi Efficiency Research & Bounty Systems

Connecting these on-chain metrics to the findings of *Schwertfeger & Vogt (2026)*:

1. **Oracle & Index Provenance Matters:** The 22.4% TVL gap between DeFiLlama and Strike's native API proves why decentralized keepers and arbitrage bots must prioritize primary on-chain source endpoints (`api.strikefinance.org`) over secondary aggregators. External aggregators can include uncirculated native tokens or miss multi-chain satellite lockers.
2. **Basis Divergence & Arbitrage Keepers:** Markets like ADA-USD (+0.11%) and XAG-USD (+0.08%) exhibit measurable basis premiums between the Strike CLOB mark price and index oracles. A keeper bounty network incentivizes automated searchers to post liquidity and compress these inefficiencies.
3. **SLP Vault Rebalancing Bounties:** With over $1M locked in the SLP vault, automated rebalancing and delta-hedging can be outsourced to decentralized keepers earning execution bounties upon improving portfolio Sharpe ratios.
4. **Liquidation & ADL Prevention:** Live open interest exceeding $1M across listed markets requires active keeper monitoring to liquidate or hedge under-margined accounts before the protocol's Auto-Deleveraging (ADL) mechanism is triggered.

---

## Reference Endpoints & Tooling
* **Cardano Mainnet Node RPC:** `https://cardano-mainnet.blockfrost-m1.demeter.run`
* **Cardano Preprod Node RPC:** `https://cardano-preprod.blockfrost-m1.demeter.run`
* **Strike Base REST API:** `https://api.strikefinance.org`
* **Strike Market Data REST:** `https://api.strikefinance.org/price`
* **Strike Statistics REST:** `https://api.strikefinance.org/stat`
* **DeFiLlama API:** `https://api.llama.fi/protocol/strike-finance-perpetuals`
* **Strike Agent Skills:** Local install at `.gemini/skills/` (CLI: `npx strike-finance-skills install`)
