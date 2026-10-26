import { Lesson, MorpheusTopic } from "@/types";

export const MORPHEUS_TOPICS: MorpheusTopic[] = [
  {
    id: "perpetuals-intro",
    title: "What is a Perpetual Contract?",
    category: "perpetuals",
    shortSummary: "A futures contract with no expiry date that tracks the spot index price.",
    fullExplanation:
      "Unlike traditional futures contracts which expire monthly or quarterly, perpetual futures (perps) never expire. You can hold your position open as long as you maintain sufficient margin. A continuous funding rate mechanism keeps the perpetual's price tightly aligned with the underlying spot market index.",
  },
  {
    id: "long-vs-short",
    title: "Long vs. Short Positions",
    category: "perpetuals",
    shortSummary: "Go Long if you believe price will rise; go Short if you believe price will fall.",
    fullExplanation:
      "When you open a LONG position, you profit when the market price rises above your entry price, and lose when it falls. When you open a SHORT position, you profit when the price drops below your entry price, allowing traders to hedge portfolios or profit during bear markets without owning the underlying asset.",
  },
  {
    id: "margin-and-leverage",
    title: "Understanding Margin & 1× Leverage",
    category: "margin",
    shortSummary: "Margin is the collateral you post. 1× leverage means 100% backing with zero multiplier risk.",
    fullExplanation:
      "In DRMZ Paper Hands, beginner exercises fix leverage at 1×. This means if you allocate $100 of virtual collateral, your position exposure is exactly $100. There is no multiplier amplifying your losses, eliminating liquidation risk under normal conditions and allowing beginners to focus on pure price exposure and trading fees.",
  },
  {
    id: "fees-and-slippage",
    title: "Trading Fees & Entry Costs",
    category: "risk",
    shortSummary: "Strike charges a 0.05% taker fee on both order entry and exit.",
    fullExplanation:
      "Every trade incurs an execution fee proportional to the total notional size of the order. At 0.05% (5 basis points), entering a $100 position costs $0.05. When you close the trade, an exit fee is also deducted. Understanding this ensures you never wonder why a trade that broke even on price has a slight net loss.",
  },
  {
    id: "mark-vs-index",
    title: "Mark Price vs. Index Price",
    category: "funding",
    shortSummary: "Index price is the aggregated spot oracle; Mark price is the Strike engine reference.",
    fullExplanation:
      "To prevent unfair liquidations during temporary market manipulation on the order book, Strike computes an oracle-derived Index Price and a smoothed Mark Price. Unrealized P&L and margin health are calculated against the Mark Price.",
  },
  {
    id: "loss-cap",
    title: "Educational Loss Cap",
    category: "risk",
    shortSummary: "In Paper Hands, your maximum loss is strictly capped at your allocated collateral.",
    fullExplanation:
      "In real centralized derivatives exchanges, adverse market moves can theoretically result in auto-deleveraging or socialized losses. In DRMZ Paper Hands, your practice account is protected by an educational isolated loss cap: you can never lose more than the collateral you pledged, guaranteeing your virtual balance cannot go negative.",
  },
];

export const BEGINNER_LESSONS: Lesson[] = [
  {
    id: "lesson-1",
    number: 1,
    title: "Direction: Long vs. Short",
    concept: "Market Direction",
    objective: "Understand how Long and Short contracts behave when market prices change.",
    xpReward: 25,
    question: "If you believe the price of ADA will decline from $0.22 to $0.18, which order direction should you choose?",
    options: [
      "Open a LONG position",
      "Open a SHORT position",
      "Perpetuals cannot profit from price declines",
      "Deposit more collateral without trading",
    ],
    correctOptionIndex: 1,
    explanation:
      "Correct! A SHORT position gains value when the asset's price decreases below your entry price. This enables downside hedging and directional trading.",
  },
  {
    id: "lesson-2",
    number: 2,
    title: "Position Exposure & Collateral",
    concept: "Notional Exposure",
    objective: "Differentiate between virtual collateral deposited and total notional exposure.",
    xpReward: 25,
    question: "At 1× leverage, if you allocate $150 of virtual collateral into a Bitcoin perpetual, what is your total position exposure?",
    options: [
      "$150 (Exact 1:1 exposure)",
      "$1,500 (10× magnified exposure)",
      "$0 (Virtual trades have no exposure)",
      "$300 (2× doubled exposure)",
    ],
    correctOptionIndex: 0,
    explanation:
      "Correct! At 1× leverage, your total notional exposure exactly equals your collateral ($150). You participate 1:1 in price movements with zero leverage multiplication.",
  },
  {
    id: "lesson-3",
    number: 3,
    title: "Execution Fees & Net P&L",
    concept: "Trading Costs",
    objective: "Account for entry and exit fees when calculating real net trading returns.",
    xpReward: 30,
    question: "You enter a $100 position and close it at the exact same price. Why is your net balance slightly lower?",
    options: [
      "The exchange experienced a slippage bug",
      "Taker fees were paid on both entry and exit",
      "The blockchain burned your virtual collateral",
      "Your position was liquidated by the node",
    ],
    correctOptionIndex: 1,
    explanation:
      "Correct! Strike V2 applies a 0.05% taker fee upon entry and exit. Even if gross price change is zero, trading costs must be factored into net P&L.",
  },
  {
    id: "lesson-4",
    number: 4,
    title: "Trade Reflection & Capstone",
    concept: "Disciplined Reflection",
    objective: "Complete your first practice trade, close it, and submit a brief reflection note.",
    xpReward: 50,
    question: "What is the primary benefit of paper trading before committing real capital?",
    options: [
      "To guarantee 100% win rate in real markets",
      "To test concepts, observe fee impacts, and make mistakes with zero financial risk",
      "To mine real Cardano cryptocurrency",
      "To bypass exchange KYC requirements",
    ],
    correctOptionIndex: 1,
    explanation:
      "Correct! Paper trading builds intuition for market volatility, fee deductions, and trade management without risking real funds.",
  },
];
