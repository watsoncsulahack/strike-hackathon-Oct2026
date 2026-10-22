# Strike Finance V2 — Live On-Chain & Platform Metrics

Snapshot captured on **October 22, 2026** directly from the live Strike Finance production REST endpoints.

---

## 1. Platform TVL & Multi-Chain Custody Reserves
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

## 2. User Engagement & Growth
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

## 3. Top Markets: Open Interest, Prices & Basis
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

## 4. Public Vaults & Liquidity Performance
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

## 5. Cross-Platform Copy Trading Discovery
*Source Endpoint:* `https://api.strikefinance.org/v2/copy/discover`

* Integrates and ranks high-performing traders from both **Strike** and **Hyperliquid**.
* Exposes 30-day cumulative PnL sparklines, ROI windows, maximum drawdown, and fixed-ratio capital allocation curves.
* Top indexed leads manage portfolios ranging from retail accounts to whales exceeding $200M+ account equity.

---

## 6. Alignment with DeFi Efficiency Research & Bounty Systems

Connecting these on-chain metrics to the findings of *Schwertfeger & Vogt (2026)*:

1. **Basis Divergence & Arbitrage Keepers:** Markets like ADA-USD (+0.11%) and XAG-USD (+0.08%) exhibit measurable basis premiums between the Strike CLOB mark price and index oracles. A keeper bounty network incentivizes automated searchers to post liquidity and compress these inefficiencies.
2. **SLP Vault Rebalancing Bounties:** With over $1M locked in the SLP vault, automated rebalancing and delta-hedging can be outsourced to decentralized keepers earning execution bounties upon improving portfolio Sharpe ratios.
3. **Liquidation & ADL Prevention:** Live open interest exceeding $1M across listed markets requires active keeper monitoring to liquidate or hedge under-margined accounts before the protocol's Auto-Deleveraging (ADL) mechanism is triggered.

---

## Reference Endpoints
* **Base REST API:** `https://api.strikefinance.org`
* **Market Data REST:** `https://api.strikefinance.org/price`
* **Statistics REST:** `https://api.strikefinance.org/stat`
* **WebSocket Streams:** `wss://api.strikefinance.org/ws/price` and `/ws/user-api`
