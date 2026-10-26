"use client";

import React from "react";
import { JournalRecord, VirtualAccount } from "@/types";
import { Download, RotateCcw, BookOpen, CheckCircle, TrendingUp, TrendingDown } from "lucide-react";
import { exportAccountDataJson } from "@/lib/storage";

interface JournalViewProps {
  journal: JournalRecord[];
  account: VirtualAccount;
  onResetAccount: () => void;
}

export const JournalView: React.FC<JournalViewProps> = ({
  journal,
  account,
  onResetAccount,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl bg-drmz-navy border-2 border-purple-900/40 text-white p-5 sm:p-7 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-900/40 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-drmz-cream flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-drmz-purple" />
            Trade Journal & History
          </h2>
          <p className="text-xs text-purple-300/80 mt-0.5">
            Review your past virtual trades, costs, and reflection notes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportAccountDataJson(account, journal)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 border border-purple-900/50 text-xs font-semibold text-purple-200 hover:text-white hover:bg-white/5 transition"
            title="Download JSON export of your local account and trade history"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={() => {
              if (confirm("Reset virtual account balance back to $1,000.00?")) {
                onResetAccount();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-800/40 text-xs font-semibold text-rose-300 hover:bg-rose-900/40 transition"
            title="Reset virtual account balance"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Table or Empty State */}
      {journal.length === 0 ? (
        <div className="py-12 text-center text-sm text-purple-300/60">
          <p>No practice trades recorded yet.</p>
          <p className="text-xs text-purple-400/60 mt-1">
            Complete your first guided trade to generate a journal entry and earn XP.
          </p>
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-purple-900/40 text-purple-300 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-2">Market</th>
                <th className="py-2.5 px-2">Direction</th>
                <th className="py-2.5 px-2">Entry</th>
                <th className="py-2.5 px-2">Exit</th>
                <th className="py-2.5 px-2">Size</th>
                <th className="py-2.5 px-2">Total Fees</th>
                <th className="py-2.5 px-2 text-right">Net Return</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/20 font-mono">
              {journal.map((rec) => {
                const isProfitable = rec.netPnl >= 0;
                return (
                  <tr key={rec.id} className="hover:bg-white/5 transition">
                    <td className="py-3 px-2 font-bold text-white">{rec.symbol}</td>
                    <td className="py-3 px-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-black text-[10px] ${
                          rec.direction === "LONG"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-rose-500/20 text-rose-300"
                        }`}
                      >
                        {rec.direction === "LONG" ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {rec.direction}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-purple-200">${rec.entryPrice.toFixed(4)}</td>
                    <td className="py-3 px-2 text-purple-200">${rec.exitPrice.toFixed(4)}</td>
                    <td className="py-3 px-2 text-purple-200">{rec.size}</td>
                    <td className="py-3 px-2 text-amber-300/90">
                      ${(rec.entryFee + rec.exitFee).toFixed(4)}
                    </td>
                    <td
                      className={`py-3 px-2 text-right font-black ${
                        isProfitable ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {isProfitable ? "+" : ""}
                      ${rec.netPnl.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
