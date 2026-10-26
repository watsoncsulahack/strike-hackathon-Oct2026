import { MarketQuote, OrderIntent, Position, JournalRecord, VirtualAccount } from "@/types";

export const DEFAULT_FEE_RATE = 0.0005; // 0.05% Strike market taker fee
export const MAX_ALLOWED_PRICE_DRIFT = 0.005; // 0.5% max drift before re-review required
export const MAX_QUOTE_AGE_MS = 30_000; // 30 seconds max quote age
export const INITIAL_VIRTUAL_BALANCE = 1000.0; // $1,000 USD virtual funds

export function round8(num: number): number {
  return Math.round(num * 1e8) / 1e8;
}

export function validateQuoteFreshness(quote: MarketQuote): { valid: boolean; reason?: string } {
  const age = Date.now() - quote.timestamp;
  if (age > MAX_QUOTE_AGE_MS) {
    return {
      valid: false,
      reason: `Market quote is stale (${(age / 1000).toFixed(1)}s old). Fresh liquidity required.`,
    };
  }
  if (quote.markPrice <= 0 || isNaN(quote.markPrice)) {
    return { valid: false, reason: "Invalid market price detected." };
  }
  return { valid: true };
}

export function previewOrder(
  quote: MarketQuote,
  direction: "LONG" | "SHORT",
  collateralUsd: number,
  leverage: number = 1
): OrderIntent {
  const price = quote.markPrice;
  const notional = round8(collateralUsd * leverage);
  const size = round8(notional / price);
  const fee = round8(notional * DEFAULT_FEE_RATE);

  return {
    symbol: quote.symbol,
    direction,
    size,
    leverage,
    collateral: collateralUsd,
    expectedPrice: price,
    estimatedFee: fee,
    notionalExposure: notional,
    quoteTimestamp: quote.timestamp,
  };
}

export function validateOrderExecution(
  intent: OrderIntent,
  account: VirtualAccount,
  latestQuote: MarketQuote
): { allowed: boolean; reason?: string } {
  if (account.activePosition) {
    return { allowed: false, reason: "You already have an open position. Close it before opening another." };
  }

  const freshness = validateQuoteFreshness(latestQuote);
  if (!freshness.valid) {
    return { allowed: false, reason: freshness.reason };
  }

  // Check price drift between review and confirmation
  const drift = Math.abs(latestQuote.markPrice - intent.expectedPrice) / intent.expectedPrice;
  if (drift > MAX_ALLOWED_PRICE_DRIFT) {
    return {
      allowed: false,
      reason: `Market price shifted by ${(drift * 100).toFixed(2)}% (limit 0.5%). Please review new quote.`,
    };
  }

  const totalRequired = intent.collateral + intent.estimatedFee;
  if (account.balanceUsd < totalRequired) {
    return {
      allowed: false,
      reason: `Insufficient virtual funds. Need $${totalRequired.toFixed(2)}, available: $${account.balanceUsd.toFixed(2)}`,
    };
  }

  if (intent.size < latestQuote.minSize) {
    return {
      allowed: false,
      reason: `Order size ${intent.size} is below market minimum ${latestQuote.minSize} ${latestQuote.baseAsset}`,
    };
  }

  return { allowed: true };
}

export function executeVirtualOpen(
  intent: OrderIntent,
  currentPrice: number,
  account: VirtualAccount
): { updatedAccount: VirtualAccount; position: Position } {
  const actualFee = round8(intent.notionalExposure * DEFAULT_FEE_RATE);
  const remainingBalance = round8(account.balanceUsd - intent.collateral - actualFee);

  const position: Position = {
    id: "pos_" + Date.now().toString(36),
    symbol: intent.symbol,
    direction: intent.direction,
    entryPrice: currentPrice,
    currentPrice,
    size: intent.size,
    collateral: intent.collateral,
    leverage: intent.leverage,
    entryFee: actualFee,
    unrealizedPnl: 0,
    pnlPercentage: 0,
    liquidationWarning: false,
    openedAt: Date.now(),
    mode: account.mode,
  };

  return {
    updatedAccount: {
      ...account,
      balanceUsd: remainingBalance,
      activePosition: position,
      updatedAt: Date.now(),
    },
    position,
  };
}

export function calculatePositionPnl(
  pos: Position,
  currentPrice: number
): { unrealizedPnl: number; pnlPercentage: number; liquidationWarning: boolean } {
  let grossPnl = 0;
  if (pos.direction === "LONG") {
    grossPnl = (currentPrice - pos.entryPrice) * pos.size;
  } else {
    grossPnl = (pos.entryPrice - currentPrice) * pos.size;
  }

  // Educational isolated loss cap: maximum loss is capped at deposited collateral
  let cappedPnl = round8(grossPnl);
  if (cappedPnl < -pos.collateral) {
    cappedPnl = -pos.collateral;
  }

  const pnlPercentage = round8((cappedPnl / pos.collateral) * 100);
  const liquidationWarning = cappedPnl <= -pos.collateral * 0.8; // Warning at 80% loss

  return {
    unrealizedPnl: cappedPnl,
    pnlPercentage,
    liquidationWarning,
  };
}

export function executeVirtualClose(
  position: Position,
  exitPrice: number,
  account: VirtualAccount,
  reflectionNote?: string
): { updatedAccount: VirtualAccount; record: JournalRecord } {
  const { unrealizedPnl } = calculatePositionPnl(position, exitPrice);
  const exitNotional = round8(position.size * exitPrice);
  const exitFee = round8(exitNotional * DEFAULT_FEE_RATE);

  const netPnl = round8(unrealizedPnl - exitFee);
  // Returned capital to wallet: original collateral + net PnL (floored at 0)
  const capitalReturned = Math.max(0, round8(position.collateral + netPnl));
  const newBalance = round8(account.balanceUsd + capitalReturned);

  const record: JournalRecord = {
    id: "rec_" + Date.now().toString(36),
    symbol: position.symbol,
    direction: position.direction,
    entryPrice: position.entryPrice,
    exitPrice,
    size: position.size,
    collateral: position.collateral,
    leverage: position.leverage,
    entryFee: position.entryFee,
    exitFee,
    grossPnl: unrealizedPnl,
    netPnl,
    openedAt: position.openedAt,
    closedAt: Date.now(),
    mode: position.mode,
    reflection: reflectionNote,
  };

  return {
    updatedAccount: {
      ...account,
      balanceUsd: newBalance,
      activePosition: null,
      updatedAt: Date.now(),
    },
    record,
  };
}
