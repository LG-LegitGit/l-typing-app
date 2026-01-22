"use client";

import { useEffect, useRef } from "react";
import { useTypingStore } from "@/store/useTypingStore";

export const TypingEngine = () => {
  const { processKey, isFinished, setHesitating } = useTypingStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. If user presses a key, they aren't hesitating anymore
      if (timerRef.current) clearTimeout(timerRef.current);
      setHesitating(false);

      // 2. Process the key through our mapping (A -> ש)
      // Only process if it's a single character or Backspace
      if (e.key.length === 1 || e.key === "Backspace") {
        processKey(e.key);
      }

      // 3. Start the "Teacher's Watch"
      // If they haven't finished, start a 3-second timer
      if (!isFinished) {
        timerRef.current = setTimeout(() => {
          setHesitating(true);
        }, 3000); // 3 seconds of silence triggers the "Ghost Hint"
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [processKey, isFinished, setHesitating]);

  return null; // Headless component - just logic
};