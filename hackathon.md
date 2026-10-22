---
event: Strike Hackathon
start: "2026-10-21 10:00 EST"
duration: 48 hours
format: coding competition
prize_pool: "$3,000"
judges: "to be announced"
---

# Strike Hackathon

Use this file as factual context about the hackathon and Strike developer tooling. Keep event requirements separate from platform capabilities.

## Event

- Start: Wednesday, October 21, 2026 at 10:00 AM EST.
- Format: 48-hour coding competition.
- Prize pool: $3,000.
- Judges: to be announced.

## Strike platform

Strike Finance is a perpetuals exchange. Strike V2 uses a central limit order book and a dedicated execution layer. Asset custody and settlement use on-chain locker contracts; trading operations include order matching, positions, funding, and liquidations.

## Developer tooling

- **REST APIs:** public market data; account, subaccount, position, and history data; trading operations; vault data.
- **Market WebSocket:** public real-time streams for prices, funding, candles, tickers, order-book depth, and trades.
- **API Wallets:** Ed25519-signed programmatic access. Documented capabilities include account and position reads, order operations, leverage, and margin controls. API Wallets cannot deposit or withdraw funds.
- **Code examples:** Python, TypeScript, Go, and Rust.
- **Agent skills:** install Strike's API-navigation skills with `npx strike-finance-skills install`.

Use the endpoint-specific Strike docs for authentication, request formats, and mainnet/testnet URLs.

## Sources

- [Hackathon announcement](https://medium.com/@strikecardano/strike-hackathon-starts-this-wednesday-3-000-in-prizes-158a029d655e?postPublishedType=initial)
- [Strike documentation](https://docs.strikefinance.org/)
- [API getting started and authentication](https://docs.strikefinance.org/api/getting-started)
- [User REST API](https://docs.strikefinance.org/api/user/rest-api)
- [Trading API](https://docs.strikefinance.org/api/trade/trading)
- [Market WebSocket](https://docs.strikefinance.org/api/market/websocket)
- [Strike agent skills repository](https://github.com/strike-finance/strike-finance-skills)
