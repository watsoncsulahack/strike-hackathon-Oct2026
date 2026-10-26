"use client";

import React, { useState } from "react";
import { MarketQuote, VirtualAccount, OrderIntent } from "@/types";
import { previewOrder } from "@/lib/engine";
import { TrendingUp, TrendingDown, Check, ArrowRight, Sparkles, RefreshCw, AlertCircle } from "lucide-react";
import { OrderReviewModal } from "./OrderReviewModal";
import { PositionCard } from "./PositionCard";

interface GuidedTraderProps {
  quote: MarketQuote;
  account: VirtualAccount;
  availableMarkets: string[];
  onSelectMarket: (symbol: string) => void;
  onRefreshQuote: () => Promise<void>;
  onExecuteTrade: (intent: OrderIntent) => Promise<void>;
  onClosePosition: (reflectionNote?: string) => Promise<void>;
  onOpenMorpheusForStep: (step: number) => void;
}

export const GuidedTrader: React.FC<GuidedTraderProps> = ({
  quote,
  account,
  availableMarkets,
  onSelectMarket,
  onRefreshQuote,
  onExecuteTrade,
  onClosePosition,
  onOpenMorpheusForStep,
}) => {
  const [selectedDirection, setSelectedDirection] = useState<"LONG" | "SHORT">("LONG");
  const [collateralAmount, setCollateralAmount] = useState<number>(100);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const activePosition = account.activePosition;

  const currentIntent = previewOrder(quote, selectedDirection, collateralAmount, 1);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefreshQuote();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleOpenReview = () => {
    setIsReviewOpen(true);
  };

  const handleConfirmOrder = async () => {
    await onExecuteTrade(currentIntent);
    setIsReviewOpen(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* If there is an active position, prominently display the Position Monitor */}
      {activePosition ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              Live Practice Position
            </h2>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-purple-900/40 text-purple-200 text-xs hover:text-white transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>Refresh Price</span>
            </button>
          </div>
          <PositionCard
            position={activePosition}
            currentQuote={quote}
            onClosePosition={onClosePosition}
          />
        </div>
      ) : (
        /* Guided First-Trade Builder */
        <div className="rounded-2xl bg-drmz-navy border-2 border-drmz-purple/40 text-white p-5 sm:p-8 shadow-2xl">
          {/* Header */}
          <div className="border-b border-purple-900/40 pb-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs uppercase tracking-widest font-extrabold text-drmz-cream px-2 py-0.5 rounded bg-drmz-purple/40">
                  Interactive Practice Workspace
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Guided Practice Trade
                </h1>
              </div>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 border border-purple-900/40 text-purple-200 text-xs hover:text-white transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>Refresh Feed</span>
              </button>
            </div>
            <p className="text-sm text-purple-200/80 mt-2">
              Learn perpetuals step-by-step: pick a market, choose your direction, test sizing with 1× leverage, and observe real price exposure without financial risk.
            </p>
          </div>

          <div className="mt-6 space-y-6">
            {/* Step 1: Market Selection & Observed Quote */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-drmz-cream flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-drmz-purple text-white flex items-center justify-center text-xs">
                    1
                  </span>
                  Select Market
                </label>
                <span className="text-xs text-purple-300/80">
                  {quote.source === "LIVE_STRIKE" ? "Verified Strike V2 Feed" : "Educational Sample Mode"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {availableMarkets.map((sym) => (
                  <button
                    key={sym}
                    onClick={() => onSelectMarket(sym)}
                    className={`py-2.5 px-3 rounded-xl border text-sm font-bold transition flex flex-col items-center justify-center ${
                      quote.symbol === sym
                        ? "bg-drmz-purple text-white border-drmz-cream/50 shadow-md"
                        : "bg-black/30 border-purple-900/40 text-purple-200 hover:bg-white/5"
                    }`}
                  >
                    <span>{sym}</span>
                  </button>
                ))}
              </div>

              {/* Observed Benchmark Price Card */}
              <div className="mt-3 p-3.5 rounded-xl bg-black/40 border border-purple-900/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-purple-300">Observed Mark Benchmark:</span>
                  <p className="text-xl font-black font-mono text-drmz-cream">
                    ${quote.markPrice.toLocaleString(undefined, { minimumFractionDigits: quote.priceDecimals })}
                  </p>
                </div>
                <div className="text-right text-xs text-purple-300/80">
                  <div>Oracle Index: ${quote.indexPrice.toLocaleString(undefined, { minimumFractionDigits: quote.priceDecimals })}</div>
                  <div>8h Funding: {(quote.fundingRate * 100).toFixed(4)}%</div>
                </div>
              </div>
            </div>

            {/* Step 2: Choose Direction (Long vs Short) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-drmz-cream flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-drmz-purple text-white flex items-center justify-center text-xs">
                    2
                  </span>
                  Choose Direction
                </label>
                <button
                  onClick={() => onOpenMorpheusForStep(1)}
                  className="text-xs text-purple-300 hover:text-white underline"
                >
                  Need help choosing?
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Long Button */}
                <button
                  type="button"
                  onClick={() => setSelectedDirection("LONG")}
                  className={`p-4 rounded-xl border-2 text-left transition flex flex-col justify-between ${
                    selectedDirection === "LONG"
                      ? "bg-emerald-950/60 border-emerald-500 text-white shadow-md"
                      : "bg-black/30 border-purple-900/40 text-purple-300 hover:border-purple-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-extrabold flex items-center gap-1.5 text-emerald-300">
                      <TrendingUp className="w-5 h-5" />
                      LONG (Buy)
                    </span>
                    {selectedDirection === "LONG" && (
                      <Check className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-xs text-purple-200/80 mt-2">
                    Profit when market benchmark rises above entry.
                  </p>
                </button>

                {/* Short Button */}
                <button
                  type="button"
                  onClick={() => setSelectedDirection("SHORT")}
                  className={`p-4 rounded-xl border-2 text-left transition flex flex-col justify-between ${
                    selectedDirection === "SHORT"
                      ? "bg-rose-950/60 border-rose-500 text-white shadow-md"
                      : "bg-black/30 border-purple-900/40 text-purple-300 hover:border-purple-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-extrabold flex items-center gap-1.5 text-rose-300">
                      <TrendingDown className="w-5 h-5" />
                      SHORT (Sell)
                    </span>
                    {selectedDirection === "SHORT" && (
                      <Check className="w-4 h-4 text-rose-400" />
                    )}
                  </div>
                  <p className="text-xs text-purple-200/80 mt-2">
                    Profit when market benchmark declines below entry.
                  </p>
                </button>
              </div>
            </div>

            {/* Step 3: Position Sizing (Fixed 1x Leverage) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-drmz-cream flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-drmz-purple text-white flex items-center justify-center text-xs">
                    3
                  </span>
                  Allocate Virtual Collateral (1× Leverage)
                </label>
                <button
                  onClick={() => onOpenMorpheusForStep(2)}
                  className="text-xs text-purple-300 hover:text-white underline"
                >
                  Why 1× leverage?
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-2">
                {[50, 100, 250, 500].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setCollateralAmount(amt)}
                    className={`py-2 rounded-lg text-xs font-bold transition ${
                      collateralAmount === amt
                        ? "bg-drmz-purple text-white border border-drmz-cream/50 shadow-sm"
                        : "bg-black/30 border border-purple-900/40 text-purple-200 hover:bg-white/5"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 bg-black/40 p-3 rounded-xl border border-purple-900/30">
                <span className="text-xs text-purple-300 font-medium">Custom Amount ($):</span>
                <input
                  type="number"
                  min="10"
                  max={account.balanceUsd}
                  value={collateralAmount}
                  onChange={(e) => setCollateralAmount(Math.max(10, parseFloat(e.target.value) || 10))}
                  className="w-full bg-transparent font-mono font-bold text-white text-base focus:outline-none"
                />
              </div>
            </div>

            {/* Live Calculation Preview Card */}
            <div className="p-4 rounded-xl bg-purple-950/30 border border-drmz-purple/40 text-xs space-y-1.5">
              <div className="flex justify-between items-center text-purple-200 font-medium">
                <span>Calculated Contract Units:</span>
                <span className="font-bold text-white font-mono">
                  {currentIntent.size} {quote.baseAsset}
                </span>
              </div>
              <div className="flex justify-between items-center text-purple-200 font-medium">
                <span>Total Notional Exposure:</span>
                <span className="font-bold text-white font-mono">
                  ${currentIntent.notionalExposure.toFixed(2)} USD
                </span>
              </div>
              <div className="flex justify-between items-center text-purple-200 font-medium">
                <span>Estimated Entry Fee (0.05%):</span>
                <span className="font-bold text-amber-300 font-mono">
                  ${currentIntent.estimatedFee.toFixed(4)} USD
                </span>
              </div>
            </div>

            {/* Step 4: Review and Execute CTA */}
            <div>
              <button
                type="button"
                onClick={handleOpenReview}
                disabled={collateralAmount > account.balanceUsd}
                className="w-full py-3.5 rounded-xl bg-drmz-purple hover:bg-drmz-purple-hover text-white font-extrabold text-base shadow-drmz transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Review Practice Order</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              {collateralAmount > account.balanceUsd && (
                <p className="text-center text-xs text-rose-400 mt-2">
                  Amount exceeds virtual balance (${account.balanceUsd.toFixed(2)})
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      <OrderReviewModal
        isOpen={isReviewOpen}
        intent={currentIntent}
        currentQuote={quote}
        onConfirm={handleConfirmOrder}
        onCancel={() => setIsReviewOpen(false)}
      />
    </div>
  );
};
