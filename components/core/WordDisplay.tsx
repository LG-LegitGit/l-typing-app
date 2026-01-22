"use client";

import { useState } from "react";
import { useTypingStore } from "@/store/useTypingStore";
import { hebrewKeyMap } from "@/lib/data/keyboard-maps";
import { cn } from "@/lib/utils";

export const WordDisplay = () => {
  const [isWisdomOpen, setIsWisdomOpen] = useState(false);
  const {
    targetText,
    userInput,
    isFinished,
    accuracy,
    isHesitating,
    currentExercise, // ✅ FIXED: Correct store field
    reset
  } = useTypingStore();

  // 🧠 Get wisdom data from store (handles string | WisdomExercise)
  const wisdom = useTypingStore(s => s.getWisdomData());

  const getHintKey = (char: string) => {
    if (char === " ") return "Space";
    const entry = Object.entries(hebrewKeyMap).find(([_, heb]) => heb === char);
    return entry ? entry[0].toUpperCase() : null;
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center gap-8">
      
      {/* 🏺 THE MAIN ALTAR */}
      <div className="relative w-full p-12 glass rounded-[3rem] min-h-[280px] flex items-center justify-center altar-glow border border-primary/10 shadow-2xl overflow-hidden">
        
        {/* ✨ COMPLETION OVERLAY */}
        {isFinished && (
          <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-2xl rounded-[3rem] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
            <div className="text-center space-y-6">
              <h2 className={cn(
                "text-5xl font-frank font-black",
                accuracy >= 95 ? "text-primary" : "text-amber-500"
              )}>
                {accuracy >= 95 ? "הושלם • Excellence" : "שוב • Practice"}
              </h2>
              <div className="py-3 px-6 bg-white/5 rounded-2xl border border-white/10 inline-block">
                <p className="text-3xl font-frank font-black">{accuracy}% Accuracy</p>
              </div>
              <button 
                onClick={reset} 
                className="block mx-auto px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-frank font-black text-xl hover:scale-105 transition-all"
              >
                CONTINUE • המשך
              </button>
            </div>
          </div>
        )}

        {/* 📜 THE SACRED TEXT */}
        <div className="text-5xl lg:text-7xl font-frank leading-relaxed flex flex-wrap justify-end gap-x-2 lg:gap-x-4 text-right" dir="rtl">
          {targetText.split("").map((char, i) => {
            const isTyped = i < userInput.length;
            const isCurrent = i === userInput.length;
            const isError = isTyped && userInput[i] !== targetText[i];
            const hint = getHintKey(char);

            return (
              <span key={i} className="relative inline-block py-2">
                {isCurrent && isHesitating && hint && (
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-2 duration-500 z-10">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest mb-1">Type</span>
                      <kbd className="px-3 py-1 bg-primary/20 border border-primary/40 rounded-lg text-primary text-sm font-bold shadow-lg shadow-primary/20">
                        {hint}
                      </kbd>
                    </div>
                  </div>
                )}
                <span className={cn(
                  "transition-all duration-300",
                  isCurrent && "text-primary scale-110 drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.6)]",
                  isTyped && !isError && "text-white/90",
                  isError && "text-red-500 underline underline-offset-8 decoration-wavy",
                  !isTyped && !isCurrent && "text-white/10"
                )}>
                  {char === " " ? "\u00A0" : char}
                </span>
                {isCurrent && (
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)]" />
                )}
              </span>
            );
          })}
        </div>
      </div>

      {/* 🏺 THE SCROLL OF WISDOM TRIGGER */}
      {wisdom && ( // ✅ FIXED: Use wisdom from store
        <button
          onClick={() => setIsWisdomOpen(true)}
          className="group flex items-center gap-4 px-6 py-3 bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/40 rounded-full transition-all duration-500 animate-in slide-in-from-bottom-4"
        >
          <span className="text-primary text-lg group-hover:rotate-12 transition-transform">🕯</span>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 group-hover:text-primary transition-colors">
            Reveal Wisdom • גלה חכמה
          </span>
        </button>
      )}

      {/* 📜 WISDOM MODAL */}
      {isWisdomOpen && wisdom && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in">
          <div className="max-w-2xl w-full glass rounded-[3.5rem] p-10 lg:p-16 border-2 border-primary/30 shadow-[0_0_100px_rgba(var(--primary-rgb),0.2)] relative">
            <button
              onClick={() => setIsWisdomOpen(false)}
              className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
            >
              ✕
            </button>

            <div className="space-y-10 text-center">
              <div className="space-y-4">
                <h3 className="text-7xl lg:text-8xl font-frank font-black text-primary leading-none tracking-tighter">
                  {targetText}
                </h3>
                {wisdom.transliteration && (
                  <p className="text-lg font-mono uppercase tracking-[0.4em] text-white/30 italic">
                    {wisdom.transliteration}
                  </p>
                )}
              </div>

              <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              <div className="space-y-6">
                <p className="text-2xl lg:text-3xl font-frank font-bold text-white/90">
                  {wisdom.meaning}
                </p>
                {wisdom.pronunciation && (
                  <p className="text-xl font-frank text-primary/80 opacity-80">
                    {wisdom.pronunciation}
                  </p>
                )}
                {wisdom.source && (
                  <div className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono text-primary/60 uppercase tracking-widest">
                    Source: {wisdom.source}
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsWisdomOpen(false)}
                className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-frank font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
              >
                RETURN TO RITUAL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
