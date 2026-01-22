"use client";

import { useTypingStore } from "@/store/useTypingStore";
import { LETTERS_TO_FINGERS, LETTER_TO_KEYCAP } from "@/lib/data/keyboard-maps";
import { cn } from "@/lib/utils";

export const VirtualKeyboard = () => {
  const { targetText, userInput } = useTypingStore();
  
  // Get the next character the user needs to type
  const nextChar = targetText[userInput.length];

  // Find which finger is responsible for this character
  const getActiveFinger = () => {
    if (!nextChar) return null;
    const entry = Object.entries(LETTERS_TO_FINGERS).find(([chars]) => 
      chars.includes(nextChar)
    );
    return entry ? entry[1] : null;
  };

  const activeFinger = getActiveFinger();

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 p-8 bg-card/30 rounded-[2rem] border border-primary/10 backdrop-blur-md">
      {/* ✋ Hand Reference Guide */}
      <div className="flex justify-between items-center mb-8 px-4">
        <div className="flex gap-4">
          <FingerIndicator label="L" active={activeFinger?.startsWith('left')} />
          <FingerIndicator label="R" active={activeFinger?.startsWith('right')} />
        </div>
        <div className="text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-1">
            Active Finger
          </span>
          <span className="text-xl font-frank text-primary font-bold capitalize">
            {activeFinger?.replace(/-/g, ' ') || "Ready"}
          </span>
        </div>
      </div>

      {/* 🎹 Simplified Keyboard Visualization */}
      <div className="grid grid-cols-10 gap-2 opacity-80">
        {/* We map a subset of your keyIds here or render the specific next key */}
        {Object.entries(LETTER_TO_KEYCAP).map(([char, id]) => {
          const isNext = char === nextChar;
          return (
            <div
              key={id}
              className={cn(
                "h-12 flex items-center justify-center rounded-lg border text-lg font-frank transition-all duration-300",
                isNext 
                  ? "bg-primary text-primary-foreground border-primary scale-110 shadow-lg" 
                  : "bg-background/50 border-primary/5 text-muted-foreground"
              )}
            >
              {char === ' ' ? '⎵' : char}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FingerIndicator = ({ label, active }: { label: string; active?: boolean }) => (
  <div className={cn(
    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500",
    active ? "border-primary bg-primary/10 text-primary animate-pulse" : "border-muted/20 text-muted/20"
  )}>
    {label}
  </div>
);