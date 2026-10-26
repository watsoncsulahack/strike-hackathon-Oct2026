"use client";

import React, { useState, useEffect, useCallback } from "react";
import { VirtualAccount, JournalRecord, MarketQuote, DataMode, OrderIntent } from "@/types";
import {
  loadAccountFromStorage,
  saveAccountToStorage,
  loadJournalFromStorage,
  saveJournalToStorage,
  getInitialAccount,
} from "@/lib/storage";
import {
  fetchLiveStrikeQuote,
  SAMPLE_MARKETS,
} from "@/lib/strike-adapter";
import {
  validateOrderExecution,
  executeVirtualOpen,
  executeVirtualClose,
  calculatePositionPnl,
} from "@/lib/engine";
import { Header } from "@/components/Header";
import { GuidedTrader } from "@/components/GuidedTrader";
import { LessonsView } from "@/components/LessonsView";
import { JournalView } from "@/components/JournalView";
import { MorpheusLauncher } from "@/components/MorpheusLauncher";
import { MorpheusDrawer } from "@/components/MorpheusDrawer";
import {
  Compass,
  BookOpen,
  History,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";

const AVAILABLE_MARKETS = ["ADA-USD", "BTC-USD", "ETH-USD"];

export default function Home() {
  const [account, setAccount] = useState<VirtualAccount>(getInitialAccount());
  const [journal, setJournal] = useState<JournalRecord[]>([]);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeTab, setActiveTab] = useState<"trade" | "lessons" | "journal">("trade");
  const [selectedMarket, setSelectedMarket] = useState<string>("ADA-USD");
  const [quote, setQuote] = useState<MarketQuote>(SAMPLE_MARKETS["ADA-USD"]);
  const [quoteNotice, setQuoteNotice] = useState<string | null>(null);
  const [isMorpheusOpen, setIsMorpheusOpen] = useState(false);
  const [morpheusStep, setMorpheusStep] = useState<number | undefined>(undefined);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const savedAcc = loadAccountFromStorage();
    const savedJnl = loadJournalFromStorage();
    setAccount(savedAcc);
    setJournal(savedJnl);
    setIsInitialized(true);
  }, []);

  // Save account whenever it updates (after initial load)
  useEffect(() => {
    if (isInitialized) {
      saveAccountToStorage(account);
    }
  }, [account, isInitialized]);

  // Save journal whenever it updates (after initial load)
  useEffect(() => {
    if (isInitialized) {
      saveJournalToStorage(journal);
    }
  }, [journal, isInitialized]);

  // Fetch or update market quote
  const updateQuote = useCallback(async (symbol: string, mode: DataMode) => {
    if (mode === "SAMPLE_SCENARIO") {
      const base = SAMPLE_MARKETS[symbol] || SAMPLE_MARKETS["ADA-USD"];
      const jitter = (Math.random() - 0.5) * 0.001 * base.markPrice;
      const newPrice = Math.round((base.markPrice + jitter) * 10000) / 10000;
      setQuote({
        ...base,
        markPrice: newPrice,
        bestBid: newPrice * 0.9998,
        bestAsk: newPrice * 1.0002,
        timestamp: Date.now(),
        source: "SAMPLE_SCENARIO",
      });
      setQuoteNotice("Simulated market scenario mode (deterministic price feed).");
      return;
    }

    // Live mode
    const { quote: freshQuote, error } = await fetchLiveStrikeQuote(symbol);
    setQuote(freshQuote);
    if (error) {
      setQuoteNotice(`API Notice: ${error}`);
    } else {
      setQuoteNotice(null);
    }
  }, []);

  // Poll quote on interval (every 10s)
  useEffect(() => {
    updateQuote(selectedMarket, account.mode);
    const interval = setInterval(() => {
      updateQuote(selectedMarket, account.mode);
    }, 10000);
    return () => clearInterval(interval);
  }, [selectedMarket, account.mode, updateQuote]);

  // Update active position PnL when quote changes
  useEffect(() => {
    if (!account.activePosition) return;
    if (account.activePosition.symbol !== quote.symbol) return;

    const { unrealizedPnl, pnlPercentage, liquidationWarning } = calculatePositionPnl(
      account.activePosition,
      quote.markPrice
    );

    setAccount((prev) => {
      if (!prev.activePosition) return prev;
      return {
        ...prev,
        activePosition: {
          ...prev.activePosition,
          currentPrice: quote.markPrice,
          unrealizedPnl,
          pnlPercentage,
          liquidationWarning,
        },
      };
    });
  }, [quote.markPrice, quote.symbol]);

  // Handlers
  const handleToggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  const handleToggleMode = (mode: DataMode) => {
    setAccount((prev) => ({ ...prev, mode }));
    updateQuote(selectedMarket, mode);
  };

  const handleSelectMarket = (symbol: string) => {
    setSelectedMarket(symbol);
    updateQuote(symbol, account.mode);
  };

  const handleRefreshQuote = async () => {
    await updateQuote(selectedMarket, account.mode);
  };

  const handleExecuteTrade = async (intent: OrderIntent) => {
    const validation = validateOrderExecution(intent, account, quote);
    if (!validation.allowed) {
      alert(`Order rejected: ${validation.reason}`);
      return;
    }

    const { updatedAccount } = executeVirtualOpen(intent, quote.markPrice, account);
    setAccount(updatedAccount);
  };

  const handleClosePosition = async (reflectionNote?: string) => {
    if (!account.activePosition) return;
    const { updatedAccount, record } = executeVirtualClose(
      account.activePosition,
      quote.markPrice,
      account,
      reflectionNote
    );
    setAccount(updatedAccount);
    setJournal((prev) => [record, ...prev]);
  };

  const handleAwardXp = (lessonId: string, xpAmount: number) => {
    setAccount((prev) => {
      if (prev.completedLessonIds.includes(lessonId)) return prev;
      return {
        ...prev,
        xp: prev.xp + xpAmount,
        completedLessonIds: [...prev.completedLessonIds, lessonId],
      };
    });
  };

  const handleResetAccount = () => {
    const reset = getInitialAccount(account.mode);
    setAccount(reset);
    setJournal([]);
    saveAccountToStorage(reset);
    saveJournalToStorage([]);
  };

  const handleOpenMorpheusForStep = (step: number) => {
    setMorpheusStep(step);
    setIsMorpheusOpen(true);
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === "light" ? "bg-slate-100 text-slate-900" : "text-white"}`}>
      {/* Top Header */}
      <Header
        account={account}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onToggleMode={handleToggleMode}
        onOpenMorpheus={() => {
          setMorpheusStep(undefined);
          setIsMorpheusOpen(true);
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 sm:px-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-drmz-purple/20 border border-drmz-purple/40 text-purple-200 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-drmz-cream" />
            <span>100% Risk-Free Virtual Perpetuals Environment</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-drmz-cream leading-tight">
            Learn Perpetuals Safely with <span className="text-drmz-purple">DRMZ Paper Hands</span>
          </h1>

          <p className="text-sm sm:text-base text-purple-200/80 leading-relaxed">
            Practice opening and closing leveraged positions using real-time Cardano market data from
            Strike Finance. Master liquidation thresholds, taker fees, and position management without
            risking a single Ada.
          </p>

          {quoteNotice && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs text-left">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{quoteNotice}</span>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-xl bg-drmz-navy border border-purple-900/50 shadow-lg">
            <button
              onClick={() => setActiveTab("trade")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
                activeTab === "trade"
                  ? "bg-drmz-purple text-drmz-cream shadow-md"
                  : "text-purple-300/70 hover:text-white"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Guided Practice</span>
            </button>

            <button
              onClick={() => setActiveTab("lessons")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
                activeTab === "lessons"
                  ? "bg-drmz-purple text-drmz-cream shadow-md"
                  : "text-purple-300/70 hover:text-white"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Lessons & XP ({account.completedLessonIds.length}/4)</span>
            </button>

            <button
              onClick={() => setActiveTab("journal")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
                activeTab === "journal"
                  ? "bg-drmz-purple text-drmz-cream shadow-md"
                  : "text-purple-300/70 hover:text-white"
              }`}
            >
              <History className="w-4 h-4" />
              <span>Journal ({journal.length})</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="pt-2">
          {activeTab === "trade" && (
            <GuidedTrader
              quote={quote}
              account={account}
              availableMarkets={AVAILABLE_MARKETS}
              onSelectMarket={handleSelectMarket}
              onRefreshQuote={handleRefreshQuote}
              onExecuteTrade={handleExecuteTrade}
              onClosePosition={handleClosePosition}
              onOpenMorpheusForStep={handleOpenMorpheusForStep}
            />
          )}

          {activeTab === "lessons" && (
            <LessonsView account={account} onAwardXp={handleAwardXp} />
          )}

          {activeTab === "journal" && (
            <JournalView
              journal={journal}
              account={account}
              onResetAccount={handleResetAccount}
            />
          )}
        </div>
      </main>

      {/* Floating Morpheus Launcher */}
      <MorpheusLauncher
        onClick={() => {
          setMorpheusStep(undefined);
          setIsMorpheusOpen(true);
        }}
      />

      {/* Morpheus Guidance Drawer */}
      <MorpheusDrawer
        isOpen={isMorpheusOpen}
        onClose={() => setIsMorpheusOpen(false)}
        activeStep={morpheusStep}
      />

      {/* Footer */}
      <footer className="w-full mt-16 border-t border-purple-900/30 bg-drmz-footer py-8 px-4 sm:px-6 text-xs text-purple-300/60">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-extrabold text-white text-sm">DRMZ Paper Hands</span>
            <p className="mt-1">
              Educational Perpetual Futures Sandbox • Powered by Cardano & Strike Finance Public APIs
            </p>
          </div>

          <div className="flex items-center gap-4 text-purple-300/80">
            <a
              href="https://strikefinance.org"
              target="_blank"
              rel="noreferrer"
              className="hover:text-drmz-cream transition flex items-center gap-1"
            >
              Strike Finance <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/watsoncsulahack/strike-hackathon-Oct2026"
              target="_blank"
              rel="noreferrer"
              className="hover:text-drmz-cream transition flex items-center gap-1"
            >
              GitHub Hackathon Repo <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-4 pt-4 border-t border-purple-900/20 text-center sm:text-left text-[11px] text-purple-400/50">
          Disclaimer: This application is strictly an educational tool with simulated funds. It does not execute live
          transactions or hold private keys. All quotes are read-only public market indices.
        </div>
      </footer>
    </div>
  );
}
