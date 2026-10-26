"use client";

import React, { useState } from "react";
import { BEGINNER_LESSONS } from "@/lib/morpheus-topics";
import { Lesson, VirtualAccount } from "@/types";
import { Sparkles, CheckCircle2, XCircle, ArrowRight, BookCheck, HelpCircle } from "lucide-react";

interface LessonsViewProps {
  account: VirtualAccount;
  onAwardXp: (lessonId: string, xpAmount: number) => void;
}

export const LessonsView: React.FC<LessonsViewProps> = ({ account, onAwardXp }) => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(BEGINNER_LESSONS[0].id);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedStates, setSubmittedStates] = useState<Record<string, boolean>>({});

  const activeLesson =
    BEGINNER_LESSONS.find((l) => l.id === selectedLessonId) || BEGINNER_LESSONS[0];

  const hasCompleted = account.completedLessonIds.includes(activeLesson.id);
  const selectedOption = selectedAnswers[activeLesson.id];
  const isSubmitted = submittedStates[activeLesson.id];
  const isCorrect = selectedOption === activeLesson.correctOptionIndex;

  const handleSelectOption = (idx: number) => {
    if (hasCompleted) return;
    setSelectedAnswers((prev) => ({ ...prev, [activeLesson.id]: idx }));
    setSubmittedStates((prev) => ({ ...prev, [activeLesson.id]: false }));
  };

  const handleSubmit = () => {
    if (selectedOption === undefined) return;
    setSubmittedStates((prev) => ({ ...prev, [activeLesson.id]: true }));

    if (selectedOption === activeLesson.correctOptionIndex && !hasCompleted) {
      onAwardXp(activeLesson.id, activeLesson.xpReward);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl bg-drmz-navy border-2 border-purple-900/40 text-white p-5 sm:p-7 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-900/40 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-drmz-cream flex items-center gap-2">
            <BookCheck className="w-5 h-5 text-drmz-purple" />
            Learning Modules & XP
          </h2>
          <p className="text-xs text-purple-300/80 mt-0.5">
            Test your understanding of perpetual mechanics to earn learning progress.
          </p>
        </div>

        {/* Total Progress */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-drmz-purple/30 border border-drmz-purple/50 text-xs">
          <Sparkles className="w-4 h-4 text-drmz-cream" />
          <span className="font-bold text-drmz-cream">
            {account.completedLessonIds.length} / {BEGINNER_LESSONS.length} Completed
          </span>
        </div>
      </div>

      {/* Lesson Selector Pills */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {BEGINNER_LESSONS.map((l) => {
          const isDone = account.completedLessonIds.includes(l.id);
          const isCurrent = l.id === activeLesson.id;
          return (
            <button
              key={l.id}
              onClick={() => setSelectedLessonId(l.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                isCurrent
                  ? "bg-drmz-purple text-white shadow-md border border-drmz-cream/40"
                  : isDone
                  ? "bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/30"
                  : "bg-black/30 border border-purple-900/30 text-purple-300 hover:bg-white/5"
              }`}
            >
              <span>Lesson {l.number}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Active Lesson Card */}
      <div className="mt-4 p-5 rounded-2xl bg-black/40 border border-purple-900/40 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-drmz-blue">
            {activeLesson.concept}
          </span>
          <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-600/30">
            +{activeLesson.xpReward} XP
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-extrabold text-white">{activeLesson.title}</h3>
        <p className="text-xs text-purple-200/90 leading-relaxed bg-drmz-purple/15 p-3 rounded-xl border-l-2 border-drmz-purple">
          <strong>Objective:</strong> {activeLesson.objective}
        </p>

        {/* Question */}
        <div className="pt-2">
          <p className="text-sm font-semibold text-drmz-cream mb-3 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            {activeLesson.question}
          </p>

          <div className="space-y-2">
            {activeLesson.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let optionStyle = "bg-white/5 border-purple-900/30 text-purple-200 hover:border-purple-600";
              if (isSelected) {
                optionStyle = "bg-drmz-purple/40 border-drmz-purple text-white font-bold";
              }
              if (isSubmitted && isSelected) {
                optionStyle = isCorrect
                  ? "bg-emerald-950/60 border-emerald-500 text-emerald-200"
                  : "bg-rose-950/60 border-rose-500 text-rose-200";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasCompleted}
                  className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between ${optionStyle}`}
                >
                  <span>{option}</span>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-drmz-cream shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback / Submit */}
        {isSubmitted && (
          <div
            className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
              isCorrect
                ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-200"
                : "bg-rose-950/60 border border-rose-500/40 text-rose-200"
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold">{isCorrect ? "Correct!" : "Not quite right."}</p>
              <p className="mt-1 text-purple-100">{activeLesson.explanation}</p>
              {!isCorrect && (
                <p className="mt-2 text-amber-300 font-medium">
                  Review the explanation above and choose another answer to earn your XP.
                </p>
              )}
            </div>
          </div>
        )}

        {hasCompleted ? (
          <div className="pt-2 flex items-center gap-2 text-xs text-emerald-300 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Completed! You have earned +{activeLesson.xpReward} XP for this lesson.</span>
          </div>
        ) : (
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={selectedOption === undefined}
              className="px-5 py-2.5 rounded-xl bg-drmz-purple hover:bg-drmz-purple-hover text-white text-xs font-bold shadow-drmz transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
