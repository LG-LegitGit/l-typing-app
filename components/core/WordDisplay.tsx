"use client";

import { useState } from "react";
import { useTypingStore } from "@/store/useTypingStore";
import { hebrewKeyMap } from "@/lib/data/keyboard-maps";
import { ExerciseWisdom, exerciseMetadata } from "@/lib/data/wisdom"; 
import { cn } from "@/lib/utils";

export const WordDisplay = () => {
  const [isWisdomOpen, setIsWisdomOpen] = useState(false);
  const {
    targetText,
    userInput,
    isFinished,
    currentExercise,
    reset,
    nextLesson,
    isHesitating,
    accuracy
  } = useTypingStore();

  // 🧠 SAFE METADATA LOOKUP
  // We use currentExercise as a key to pull translation/wisdom
  const wisdom: ExerciseWisdom | undefined = currentExercise 
    ? exerciseMetadata[currentExercise as keyof typeof exerciseMetadata]
    : undefined;
  // 🔑 HEBREW KEY HINT MAPPER
  const getHintKey = (char: string) => {
    if (char === " " || !char) return "Space";
    const entry = Object.entries(hebrewKeyMap).find(([_, heb]) => heb === char);
    return entry ? entry[0].toUpperCase() : null;
  };

  const currentChar = targetText[userInput.length];
  const hintKey = getHintKey(currentChar);

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center gap-8">
      
      {/* 🕊️ SACRED CONTEXT - Always Visible Wisdom */}
      {wisdom && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-1000 text-center space-y-2 max-w-2xl mx-auto backdrop-blur-sm bg-black/20 rounded-2xl p-6 border border-amber-500/10 shadow-xl shadow-amber-500/10">
          <h3 className="text-xl lg:text-2xl font-frank italic text-amber-200/90 leading-relaxed drop-shadow-sm">
            "{wisdom.translation}"
          </h3>
          <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-amber-400/70 font-semibold">
            {wisdom.wisdom}
          </p>
        </div>
      )}

      {/* 🏺 THE SACRED ALTAR */}
      <div className="relative w-full p-12 lg:p-20 bg-white/[0.02] backdrop-blur-3xl rounded-[4rem] border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center min-h-[320px]">
        
        {/* 🕯️ GUIDING LIGHT - Fixed Position Hint */}
        {!isFinished && currentChar && isHesitating && hintKey && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/50 backdrop-blur-xl p-4 rounded-2xl border border-amber-500/30 shadow-2xl shadow-amber-500/20 animate-in zoom-in-95 duration-500 hover:shadow-amber-500/40 transition-all">
            <div className="flex flex-col items-center px-4 py-2 border-r border-white/10 min-w-[60px]">
              <span className="text-[9px] font-mono uppercase text-amber-400/70 mb-1 tracking-wider">Key</span>
              <kbd className="px-3 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-400 text-sm font-bold font-mono shadow-md">
                {hintKey}
              </kbd>
            </div>
            <div className="flex flex-col items-center px-4 py-2">
              <span className="text-[9px] font-mono uppercase text-white/40 mb-1 tracking-wider">Press</span>
              <span className="text-3xl lg:text-4xl font-frank font-black text-white drop-shadow-2xl animate-pulse">
                {currentChar}
              </span>
            </div>
          </div>
        )}

        {/* 📜 SACRED TEXT FLOW */}
        {/* Letters are grouped per word (each word keeps its trailing space) so
            lines only wrap between words, never in the middle of one. */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-6 text-center dir-rtl max-w-4xl" dir="rtl">
          {(targetText.match(/[^ ]+ *| +/g) ?? []).map((word, wordIndex, words) => {
            const start = words.slice(0, wordIndex).join("").length;
            return (
              <span key={wordIndex} className="flex flex-nowrap gap-x-4">
                {word.split("").map((char, offset) => {
                  const index = start + offset;
                  let state = "neutral";
                  if (index < userInput.length) {
                    state = userInput[index] === char ? "correct" : "incorrect";
                  } else if (index === userInput.length) {
                    state = "active";
                  }

                  return (
                    <span
                      key={index}
                      className={cn(
                        "text-4xl lg:text-6xl font-frank font-semibold transition-all duration-300 relative inline-block py-1 px-2",
                        state === "neutral" && "text-white/10",
                        state === "correct" && "text-amber-400/90 drop-shadow-[0_0_20px_rgba(251,191,36,0.5)] scale-105",
                        state === "incorrect" && "text-red-400 animate-shake scale-105 underline decoration-red-400/50 underline-offset-4",
                        state === "active" && "text-white scale-[1.15] drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]"
                      )}
                    >
                      {char === " " ? "\u00A0" : char}
                      {state === "active" && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-amber-500 to-transparent rounded-full animate-pulse shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
                      )}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </div>

        {/* ✨ COMPLETION CELEBRATION */}
        {isFinished && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/95 to-amber-500/5 backdrop-blur-xl flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in duration-1000 rounded-[4rem] border-4 border-amber-500/20">
            <div className="animate-[spin_3s_linear_infinite] mb-6 text-7xl drop-shadow-2xl">✨</div>
            <h2 className={cn(
              "text-3xl lg:text-4xl font-frank font-black tracking-widest uppercase mb-4",
              accuracy >= 95 ? "text-amber-400 bg-gradient-to-r from-amber-400 via-white to-amber-500 bg-clip-text text-transparent drop-shadow-lg" : "text-red-400"
            )}>
              {accuracy >= 95 ? "הושלם • Excellence" : "שוב • Practice"}
            </h2>
            <div className="py-4 px-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 mb-8 text-center">
              <p className="text-2xl lg:text-3xl font-frank font-bold text-white drop-shadow-md">
                {accuracy.toFixed(0)}% Accuracy
              </p>
            </div>
            {/* 95%+ moves on to the next exercise; below that, practice this one again */}
            <button
              onClick={accuracy >= 95 ? nextLesson : reset}
              className="px-12 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-purple-950 font-frank font-black text-xl rounded-3xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-amber-500/40 border-2 border-amber-500/50 hover:shadow-amber-500/60"
            >
              {accuracy >= 95 ? "CONTINUE • המשך" : "TRY AGAIN • שוב"}
            </button>
          </div>
        )}
      </div>

      {/* 🕯️ DEEPER WISDOM (Optional Modal Toggle) */}
      {wisdom && (
        <button
          onClick={() => setIsWisdomOpen(true)}
          className="group flex items-center gap-3 px-8 py-3 bg-white/[0.03] hover:bg-amber-500/10 border border-white/5 hover:border-amber-500/30 rounded-full transition-all duration-700 backdrop-blur-sm shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="text-amber-400 text-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">🕯</span>
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] font-semibold text-white/50 group-hover:text-amber-300">
            Deeper Meaning
          </span>
        </button>
      )}

      {/* 📜 FULL WISDOM MODAL */}
      {isWisdomOpen && wisdom && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-8 bg-[#0a0514]/95 backdrop-blur-2xl animate-in fade-in zoom-in duration-500">
          <div className="max-w-3xl w-full bg-white/[0.05] backdrop-blur-3xl rounded-[4rem] p-12 lg:p-16 border-4 border-amber-500/20 shadow-[0_0_120px_rgba(251,191,36,0.2)] relative overflow-hidden">
            <button
              onClick={() => setIsWisdomOpen(false)}
              className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-3xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white/60 hover:text-white transition-all shadow-lg hover:scale-110"
            >
              ✕
            </button>

            <div className="text-center space-y-12">
              <div className="space-y-6">
                <h3 className="text-5xl lg:text-7xl font-frank font-black bg-gradient-to-r from-amber-400 via-white to-amber-600 bg-clip-text text-transparent drop-shadow-2xl">
                  {typeof currentExercise === 'string' ? currentExercise : wisdom?.translation}
                </h3>
                <p className="text-2xl lg:text-3xl font-light italic text-white/90 leading-relaxed max-w-2xl mx-auto">
                  "{wisdom.translation}"
                </p>
              </div>

              <div className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-amber-500/50 to-transparent my-8" />

              <div className="space-y-4">
                <p className="text-xl lg:text-2xl font-frank font-semibold text-amber-100 leading-relaxed">
                  {wisdom.wisdom}
                </p>
              </div>

              <button
                onClick={() => setIsWisdomOpen(false)}
                className="w-full py-6 lg:py-8 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-purple-950 font-frank font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-amber-500/40 border-2 border-amber-500/50 hover:shadow-amber-500/60"
              >
                RETURN TO RITUAL • חזור לתפילה
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};