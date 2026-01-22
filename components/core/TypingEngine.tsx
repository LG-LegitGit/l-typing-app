"use client";

import { useEffect, useCallback } from "react";
import { useTypingStore } from "@/store/useTypingStore";

export const TypingEngine = () => {
  const { processKey, isFinished, reset, setTarget } = useTypingStore();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // 1. Accessibility & Input safety
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) return;

      // 2. UX Shortcuts
      if (e.key === "Escape") {
        e.preventDefault();
        reset(); // Clear current progress
        return;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        // Logic to trigger a new random lesson could go here
        return;
      }

      // 3. Prevent scroll/browser behavior for typing keys
      if ([" ", "Backspace", "Enter"].includes(e.key)) {
        e.preventDefault();
      }

      // 4. Ignore Command/System keys
      if (e.metaKey || e.ctrlKey || e.altKey || isFinished) return;

      // 5. Hand off to the Store
      processKey(e.key);
    },
    [processKey, isFinished, reset]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return null;
};