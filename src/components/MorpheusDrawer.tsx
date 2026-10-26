"use client";

import React, { useState } from "react";
import { MORPHEUS_TOPICS } from "@/lib/morpheus-topics";
import { X, BookOpen, Lightbulb, Compass, ShieldCheck } from "lucide-react";

interface MorpheusDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeStep?: number;
}

export const MorpheusDrawer: React.FC<MorpheusDrawerProps> = ({
  isOpen,
  onClose,
  activeStep,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>("perpetuals-intro");

  if (!isOpen) return null;

  const currentTopic = MORPHEUS_TOPICS.find((t) => t.id === selectedTopicId) || MORPHEUS_TOPICS[0];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md h-full bg-drmz-navy border-l border-drmz-purple/40 text-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-drmz-footer/50 bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-drmz-purple border-2 border-drmz-launcher-border flex items-center justify-center font-bold text-drmz-cream text-lg shadow-drmz">
              M
            </div>
            <div>
              <h2 className="font-extrabold text-base text-drmz-cream">Morpheus Guidance</h2>
              <p className="text-xs text-purple-300/80">Curated Educational Assistance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-purple-300 hover:text-white hover:bg-white/10 transition"
            aria-label="Close guidance panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step-specific contextual prompt */}
        {activeStep && (
          <div className="p-3 mx-4 mt-3 rounded-lg bg-drmz-purple/20 border border-drmz-purple/40 flex items-start gap-2 text-xs">
            <Lightbulb className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-drmz-cream">
                {activeStep === 1 && "Step 1 Tip: Choosing a Direction"}
                {activeStep === 2 && "Step 2 Tip: 1× Leverage Protection"}
                {activeStep === 3 && "Step 3 Tip: Checking Order Fees"}
                {activeStep === 4 && "Step 4 Tip: Observing Price Changes"}
              </span>
              <p className="text-purple-200/90 mt-0.5">
                {activeStep === 1 && "Choose LONG if you predict prices will climb, or SHORT to profit if prices drop."}
                {activeStep === 2 && "1× leverage means 100% margin backing. You take pure price exposure with no liquidation multiplier."}
                {activeStep === 3 && "Strike charges a 0.05% fee on notional value. Always review your entry and exit costs."}
                {activeStep === 4 && "Perpetual unrealized P&L is calculated continuously against the Mark Price."}
              </p>
            </div>
          </div>
        )}

        {/* Topic Selector Tabs */}
        <div className="px-4 pt-3 pb-1 flex gap-2 overflow-x-auto no-scrollbar border-b border-drmz-footer/40">
          {MORPHEUS_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition ${
                selectedTopicId === topic.id
                  ? "bg-drmz-purple text-white shadow-sm font-bold"
                  : "bg-white/5 text-purple-300 hover:bg-white/10"
              }`}
            >
              {topic.title}
            </button>
          ))}
        </div>

        {/* Active Topic Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-black/30 border border-purple-900/40 rounded-xl p-4">
            <h3 className="text-lg font-extrabold text-drmz-cream flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-drmz-purple" />
              {currentTopic.title}
            </h3>
            <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-drmz-blue">
              {currentTopic.category}
            </div>
            <p className="mt-2 text-sm font-medium text-purple-100 bg-drmz-purple/15 p-3 rounded-lg border-l-2 border-drmz-purple">
              {currentTopic.shortSummary}
            </p>
            <div className="mt-4 text-sm leading-relaxed text-purple-200/90 space-y-3">
              <p>{currentTopic.fullExplanation}</p>
            </div>
          </div>

          {/* Educational Safety Banner */}
          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Zero Capital Risk:</span> All actions in DRMZ Paper Hands are virtual. Real funds, private keys, or wallet signings are never used.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-drmz-footer/50 bg-black/40 text-center text-xs text-purple-400">
          DRMZ Web3 Education Framework • Powered by Strike V2 Market Observations
        </div>
      </div>
    </div>
  );
};
