"use client";

import React, { useState } from "react";
import { Position, MarketQuote } from "@/types";
import { TrendingUp, TrendingDown, AlertTriangle, ShieldCheck, CheckCircle2 } from "lucide-react";
import { calculatePositionPnl, DEFAULT_FEE_RATE, round8 } from "@/lib/engine";

interface PositionCardProps {
  position: Position;
  currentQuote: MarketQuote;
  onClosePosition: (reflectionNote?: string) => Promise<void>;
}

export const PositionCard: React.FC<PositionCardProps> = ({
  position,
  currentQuote,
  onClosePosition,
}) => {
  const [reflection, setReflection] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [showReflectionInput, setShowReflectionInput] = useState(false);

  const { unrealizedPnl, pnlPercentage, liquidationWarning } = calculatePositionPnl(
    position,
    currentQuote.markPrice
  );

  const estExitFee = round8(position.size * currentQuote.markPrice * DEFAULT_FEE_RATE);
  const estNetPnl = round8(unrealizedPnl - estExitFee);
  const isProfit = estNetPnl >= 0;

  const handleClose = async () => {
    setIsClosing(true);
    try {
      await onClosePosition(reflection.trim() || undefined);
    } finally {
      setIsClosing(false);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-drmz-navy border-2 border-drmz-purple/60 text-white p-5 sm:p-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-900/40 pb-4">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-xl flex items-center justify-center ${
              position.direction === "LONG"
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-rose-500/20 text-rose-300"
            }`}
          >
            {position.direction === "LONG" ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-drmz-cream">{position.symbol}</span>
              <span
                className={`text-xs font-black px-2 py-0.5 rounded ${
                  position.direction === "LONG"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-rose-500/20 text-rose-300"
                }`}
              >
                {position.direction} 1×
              </span>
            </div>
            <p className="text-xs text-purple-300/80">Active Virtual Position</p>
          </div>
        </div>

        {/* Live PnL Pill */}
        <div className="text-right">
          <div
            className={`text-xl sm:text-2xl font-black font-mono flex items-center gap-1 justify-end ${
              isProfit ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {isProfit ? "+" : ""}
            ${estNetPnl.toFixed(2)}
            <span className="text-sm font-semibold">({pnlPercentage.toFixed(2)}%)</span>
          </div>
          <span className="text-[11px] text-purple-300/80">Net Est. P&L (incl. fees)</span>
        </div>
      </div>

      {/* Liquidation Warning */}
      {liquidationWarning && (
        <div className="mt-3 p-3 rounded-lg bg-amber-950/60 border border-amber-500/50 text-amber-200 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Margin Warning: Position drawdown exceeds 80%. Under real cross-margin, this position would risk liquidation.</span>
        </div>
      )}

      {/* Position Metrics Grid */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-black/30 p-3.5 rounded-xl border border-purple-900/30">
        <div>
          <span className="text-purple-300">Entry Benchmark:</span>
          <p className="text-sm font-bold text-white font-mono mt-0.5">
            ${position.entryPrice.toLocaleString(undefined, { minimumFractionDigits: currentQuote.priceDecimals })}
          </p>
        </div>
        <div>
          <span className="text-purple-300">Current Mark Price:</span>
          <p className="text-sm font-bold text-drmz-cream font-mono mt-0.5">
            ${currentQuote.markPrice.toLocaleString(undefined, { minimumFractionDigits: currentQuote.priceDecimals })}
          </p>
        </div>
        <div>
          <span className="text-purple-300">Contract Quantity:</span>
          <p className="text-sm font-bold text-white font-mono mt-0.5">
            {position.size} {currentQuote.baseAsset}
          </p>
        </div>
        <div>
          <span className="text-purple-300">Virtual Collateral:</span>
          <p className="text-sm font-bold text-white font-mono mt-0.5">
            ${position.collateral.toFixed(2)} USD
          </p>
        </div>
      </div>

      {/* Educational Loss Cap Reminder */}
      <div className="mt-3 flex items-center gap-2 text-[11px] text-purple-300/80">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Educational Isolated Loss Cap: You can never lose more than your allocated ${position.collateral.toFixed(2)} collateral.</span>
      </div>

      {/* Close Flow / Reflection */}
      <div className="mt-5 border-t border-purple-900/40 pt-4 flex flex-col gap-3">
        {!showReflectionInput ? (
          <button
            onClick={() => setShowReflectionInput(true)}
            className="w-full py-3 rounded-xl bg-drmz-purple hover:bg-drmz-purple-hover text-white font-bold text-sm shadow-drmz transition flex items-center justify-center gap-2"
          >
            <span>Close Position & Reflect</span>
          </button>
        ) : (
          <div className="space-y-3 bg-black/20 p-4 rounded-xl border border-drmz-purple/30">
            <label className="block text-xs font-semibold text-drmz-cream">
              Learner Reflection Note (Optional for Journal):
            </label>
            <input
              type="text"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="e.g. Learned how fees impact net PnL, exited with small profit"
              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-900/50 text-white text-xs focus:outline-none focus:border-drmz-purple placeholder:text-purple-400/50"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowReflectionInput(false)}
                className="px-3 py-1.5 text-xs text-purple-300 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={handleClose}
                disabled={isClosing}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition disabled:opacity-50"
              >
                {isClosing ? "Closing Position..." : "Confirm & Settle Virtual Trade"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
