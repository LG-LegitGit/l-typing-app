// components/core/WordDisplay.tsx

"use client";

import { useTypingStore } from "@/store/useTypingStore";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const WordDisplay = () => {
  const { targetText, userInput } = useTypingStore();

  return (
    <div 
      dir="rtl" 
      className="font-frank text-5xl lg:text-7xl leading-relaxed tracking-wide select-none break-words w-full max-w-4xl mx-auto p-8"
    >
      {targetText.split("").map((char, index) => {
        let state: "pending" | "correct" | "incorrect" = "pending";
        const userChar = userInput[index];

        if (userChar !== undefined) {
          state = userChar === char ? "correct" : "incorrect";
        }

        const isCurrent = index === userInput.length;

        return (
          <span
            key={index}
            className={cn(
              "relative transition-all duration-150",
              state === "pending" && "opacity-30",
              state === "correct" && "text-primary opacity-100",
              state === "incorrect" && "text-destructive opacity-100 bg-destructive/10 rounded-sm"
            )}
          >
            {char}
            {/* The Sacred Cursor */}
            {isCurrent && (
              <motion.span
                layoutId="cursor"
                className="absolute -bottom-1 left-0 right-0 h-1 bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </span>
        );
      })}
    </div>
  );
};