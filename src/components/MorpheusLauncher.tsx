"use client";

import React from "react";
import { MessageSquareText } from "lucide-react";

interface MorpheusLauncherProps {
  onClick: () => void;
}

export const MorpheusLauncher: React.FC<MorpheusLauncherProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-drmz-purple border-2 border-drmz-launcher-border flex flex-col items-center justify-center text-white shadow-drmz hover:scale-105 active:scale-95 transition-all duration-150 group"
      aria-label="Open Morpheus Guidance"
      title="Ask Morpheus"
    >
      <div className="text-xl sm:text-2xl font-black text-drmz-cream group-hover:scale-110 transition-transform">
        M
      </div>
      <span className="text-[10px] font-bold text-drmz-cream tracking-tight hidden sm:block uppercase">
        Morpheus
      </span>
    </button>
  );
};
