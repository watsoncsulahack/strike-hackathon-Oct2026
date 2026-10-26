export type TradeDirection = "LONG" | "SHORT";

export type DataMode = "LIVE_STRIKE" | "SAMPLE_SCENARIO";

export interface MarketQuote {
  symbol: string;
  name: string;
  baseAsset: string;
  markPrice: number;
  indexPrice: number;
  fundingRate: number;
  bestBid: number;
  bestAsk: number;
  timestamp: number;
  isStale: boolean;
  minSize: number;
  priceDecimals: number;
  source: DataMode;
}

export interface OrderIntent {
  symbol: string;
  direction: TradeDirection;
  size: number;
  leverage: number; // Defaults to 1 for first guided lesson
  collateral: number;
  expectedPrice: number;
  estimatedFee: number;
  notionalExposure: number;
  quoteTimestamp: number;
}

export interface Position {
  id: string;
  symbol: string;
  direction: TradeDirection;
  entryPrice: number;
  currentPrice: number;
  size: number;
  collateral: number;
  leverage: number;
  entryFee: number;
  unrealizedPnl: number;
  pnlPercentage: number;
  liquidationWarning: boolean;
  openedAt: number;
  mode: DataMode;
}

export interface JournalRecord {
  id: string;
  symbol: string;
  direction: TradeDirection;
  entryPrice: number;
  exitPrice: number;
  size: number;
  collateral: number;
  leverage: number;
  entryFee: number;
  exitFee: number;
  grossPnl: number;
  netPnl: number;
  openedAt: number;
  closedAt: number;
  mode: DataMode;
  reflection?: string;
}

export interface VirtualAccount {
  balanceUsd: number;
  initialBalanceUsd: number;
  activePosition: Position | null;
  xp: number;
  completedLessonIds: string[];
  mode: DataMode;
  updatedAt: number;
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  concept: string;
  objective: string;
  xpReward: number;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface MorpheusTopic {
  id: string;
  title: string;
  category: "perpetuals" | "margin" | "leverage" | "funding" | "risk";
  shortSummary: string;
  fullExplanation: string;
}
