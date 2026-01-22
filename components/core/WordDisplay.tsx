"use client";

import { useTypingStore } from "@/store/useTypingStore";
import { cn } from "@/lib/utils";

export const WordDisplay = () => {
  const { targetText, userInput, isWrongLayout } = useTypingStore();

  return (
    <div className="relative w-full max-w-4xl mx-auto p-12 glass rounded-[3rem] min-h-[240px] flex items-center justify-center altar-glow border border-primary/10 shadow-2xl">
      
      {/* ⚠️ SACRED LAYOUT WARNING - Bilingual + Actionable */}
      {isWrongLayout && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-destructive/95 backdrop-blur-2xl rounded-[3rem] border-4 border-destructive/50 animate-in fade-in zoom-in duration-500 shadow-2xl shadow-destructive/25">
          <div className="text-center space-y-6 px-8 max-w-md">
            <div className="w-20 h-20 rounded-2xl bg-destructive/20 border-4 border-destructive/30 flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <span className="text-destructive text-3xl font-frank font-black">⌨️</span>
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-frank font-black mb-2 bg-gradient-to-r from-destructive to-destructive/80 bg-clip-text text-transparent tracking-tight">
                מקלדת שגויה
              </h2>
              <p className="text-lg font-medium text-destructive-foreground/90 opacity-95">
                Wrong Keyboard Layout
              </p>
            </div>
            <div className="space-y-3 text-destructive-foreground/80">
              <p className="text-sm font-mono leading-relaxed">
                Press <kbd className="px-2 py-1 mx-1 bg-white/10 rounded font-mono text-xs border border-white/20 shadow-md">A</kbd> for <span className="font-frank text-lg">ש</span>
              </p>
              <div className="flex flex-wrap gap-3 justify-center pt-4">
                <kbd className="px-4 py-2 bg-white/10 rounded-lg text-xs font-mono border border-white/20 shadow-lg hover:bg-white/20 transition-all">Alt + Shift</kbd>
                <kbd className="px-4 py-2 bg-white/10 rounded-lg text-xs font-mono border border-white/20 shadow-lg hover:bg-white/20 transition-all">⌘ + Space</kbd>
              </div>
            </div>
            <button 
              onClick={() => useTypingStore.getState().setWrongLayout(false)}
              className="px-8 py-3 bg-destructive text-destructive-foreground rounded-2xl font-frank font-bold text-sm shadow-xl hover:shadow-destructive/30 hover:scale-105 transition-all duration-200"
            >
              הבנתי • Got It
            </button>
          </div>
        </div>
      )}

      {/* 📜 SACRED HEBREW TEXT - RTL Perfection */}
      <div 
        className="text-5xl lg:text-7xl font-frank leading-[0.9] tracking-[-0.05em] flex flex-wrap justify-end gap-x-2 lg:gap-x-4 text-right max-w-full overflow-hidden" 
        dir="rtl"
      >
        {targetText.split("").map((char, i) => {
          const isTyped = i < userInput.length;
          const isCurrent = i === userInput.length;
          const isError = isTyped && userInput[i] !== targetText[i];

          return (
            <span
              key={i}
              className={cn(
                "transition-all duration-200 relative inline-block px-1 py-2",
                // Current character - Sacred focus
                isCurrent && "text-primary !scale-110 drop-shadow-[0_0_15px_rgba(var(--primary),0.6)]",
                // Correctly typed
                isTyped && !isError && "text-white/85 scale-[1.02]",
                // Error state
                isError && "!text-destructive underline decoration-wavy decoration-destructive/50 scale-[1.05] animate-pulse",
                // Untyped
                !isTyped && !isCurrent && "text-white/15",
                // Smooth hover
                "hover:scale-105 hover:text-primary/80"
              )}
              style={{ lineHeight: 1 }}
            >
              {char === " " ? (
                <span className="w-8 lg:w-12 h-12 lg:h-16 inline-block bg-white/5 rounded opacity-50" />
              ) : (
                char
              )}
              
              {/* ✨ Current char cursor glow */}
              {isCurrent && (
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-primary/80 to-primary rounded-full shadow-[0_0_12px_rgba(var(--primary),1)] animate-bounce-slow" />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};