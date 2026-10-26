"use client";

import React, { useState } from "react";
import { OrderIntent, MarketQuote } from "@/types";
import { AlertCircle, CheckCircle, ShieldAlert, ArrowRight } from "lucide-react";
import { MAX_ALLOWED_PRICE_DRIFT } from "@/lib/engine";

interface OrderReviewModalProps {
  isOpen: boolean;
  intent: OrderIntent;
  currentQuote: MarketQuote;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export const OrderReviewModal: React.FC<OrderReviewModalProps> = ({
  isOpen,
  intent,
  currentQuote,
  onConfirm,
  onCancel,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const priceDrift = Math.abs(currentQuote.markPrice - intent.expectedPrice) / intent.expectedPrice;
  const isDriftTooHigh = priceDrift > MAX_ALLOWED_PRICE_DRIFT;

  const handleConfirmClick = async () => {
    if (isDriftTooHigh) {
      setErrorMsg(`Price drifted by ${(priceDrift * 100).toFixed(2)}% since review. Please cancel and request a fresh quote.`);
      return;
    }
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      await onConfirm();
    } catch (e: any) {
      setErrorMsg(e.message || "Failed to confirm virtual trade");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl bg-drmz-navy border-2 border-drmz-purple text-white shadow-2xl p-6 overflow-hidden">
        {/* Title */}
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded text-xs font-black uppercase ${
                intent.direction === "LONG"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
              }`}
            >
              {intent.direction}
            </span>
            <h3 className="text-xl font-extrabold text-drmz-cream">Confirm Virtual Order</h3>
          </div>
          <span className="text-xs px-2 py-1 rounded bg-black/40 text-purple-300 font-mono">
            {currentQuote.symbol}
          </span>
        </div>

        {/* Warning if price drifted */}
        {isDriftTooHigh && (
          <div className="mt-4 p-3 rounded-lg bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Price Drift Protection Triggered:</span> The market moved by{" "}
              {(priceDrift * 100).toFixed(2)}% (limit 0.5%). To protect your execution, please re-review with current prices.
            </div>
          </div>
        )}

        {/* Order Details Grid */}
        <div className="mt-4 space-y-2.5 text-sm bg-black/30 p-4 rounded-xl border border-purple-900/30">
          <div className="flex justify-between items-center py-1 border-b border-white/5">
            <span className="text-purple-300">Market Benchmark:</span>
            <span className="font-bold text-white font-mono">
              ${intent.expectedPrice.toLocaleString(undefined, { minimumFractionDigits: currentQuote.priceDecimals })}
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-white/5">
            <span className="text-purple-300">Contract Quantity:</span>
            <span className="font-bold text-drmz-cream font-mono">
              {intent.size} {currentQuote.baseAsset}
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-white/5">
            <span className="text-purple-300">Total Notional Exposure:</span>
            <span className="font-bold text-white font-mono">
              ${intent.notionalExposure.toFixed(2)} USD
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-white/5">
            <span className="text-purple-300">Allocated Virtual Margin:</span>
            <span className="font-bold text-white font-mono">${intent.collateral.toFixed(2)} USD (1×)</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-white/5">
            <span className="text-purple-300">Estimated Entry Fee (0.05%):</span>
            <span className="font-bold text-amber-300 font-mono">${intent.estimatedFee.toFixed(4)} USD</span>
          </div>

          <div className="flex justify-between items-center pt-1 text-xs">
            <span className="text-purple-400">Execution Venue Mode:</span>
            <span className="font-semibold text-purple-200">
              {intent.expectedPrice === currentQuote.markPrice ? "Strike V2 CLOB" : "Sample Model"}
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="mt-3 text-xs text-rose-300 bg-rose-950/40 p-2.5 rounded-lg border border-rose-800">
            {errorMsg}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-purple-200 hover:text-white hover:bg-white/5 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmClick}
            disabled={isSubmitting || isDriftTooHigh}
            className={`px-5 py-2.5 rounded-lg text-sm font-extrabold text-white shadow-drmz transition flex items-center gap-2 ${
              intent.direction === "LONG"
                ? "bg-emerald-600 hover:bg-emerald-500"
                : "bg-rose-600 hover:bg-rose-500"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? (
              <span>Executing Virtual Fill...</span>
            ) : (
              <>
                <span>Confirm {intent.direction} Position</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
