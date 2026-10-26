"use client";

import React from "react";
import { VirtualAccount, DataMode } from "@/types";
import { Sparkles, Sun, Moon, RefreshCw, Download, HelpCircle } from "lucide-react";
import { exportAccountDataJson } from "@/lib/storage";

interface HeaderProps {
  account: VirtualAccount;
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onToggleMode: (mode: DataMode) => void;
  onOpenMorpheus: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  account,
  theme,
  onToggleTheme,
  onToggleMode,
  onOpenMorpheus,
}) => {
  return (
    <header className="w-full border-b border-drmz-footer/40 bg-drmz-navy text-white px-4 py-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-drmz-purple flex items-center justify-center font-extrabold text-white text-lg shadow-drmz">
            D
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">DRMZ</span>
              <span className="text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded bg-drmz-purple text-drmz-cream">
                Paper Hands
              </span>
            </div>
            <p className="text-xs text-purple-300/70 hidden sm:block">
              Perpetuals Education & Virtual Trading
            </p>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Virtual Balance */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 border border-purple-900/30">
            <span className="text-purple-300 font-medium">Virtual Wallet:</span>
            <span className="font-bold text-drmz-cream font-mono">
              ${account.balanceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          {/* XP Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-drmz-purple/30 border border-drmz-purple/40 text-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-drmz-cream" />
            <span className="font-bold text-drmz-cream font-mono">{account.xp} XP</span>
          </div>

          {/* Mode Selector */}
          <button
            onClick={() => onToggleMode(account.mode === "LIVE_STRIKE" ? "SAMPLE_SCENARIO" : "LIVE_STRIKE")}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition ${
              account.mode === "LIVE_STRIKE"
                ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50"
                : "bg-amber-950/60 border-amber-500/40 text-amber-300 hover:bg-amber-900/50"
            }`}
            title="Click to switch between live Strike feed and sample scenario mode"
          >
            <span className={`w-2 h-2 rounded-full ${account.mode === "LIVE_STRIKE" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
            <span>{account.mode === "LIVE_STRIKE" ? "Live Strike Data" : "Sample Scenario"}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-lg bg-black/30 border border-purple-900/30 text-purple-200 hover:text-white transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-purple-300" />}
          </button>

          {/* Help Button */}
          <button
            onClick={onOpenMorpheus}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-drmz-purple hover:bg-drmz-purple-hover text-white text-xs font-bold transition shadow-sm"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask Morpheus</span>
          </button>
        </div>
      </div>
    </header>
  );
};
