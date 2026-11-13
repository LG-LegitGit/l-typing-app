"use client";

import { useEffect, useState } from "react";
import { useTypingStore } from "@/store/useTypingStore";
import { calculateWPM, calculateAccuracy } from "@/lib/utils/stats";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export const StatsBar = () => {
  // Use selectors to prevent the whole component from re-rendering on every key
  const userInput = useTypingStore((s) => s.userInput);
  const startTime = useTypingStore((s) => s.startTime);
  const endTime = useTypingStore((s) => s.endTime);
  const totalKeystrokes = useTypingStore((s) => s.totalKeystrokes);
  const errors = useTypingStore((s) => s.errors);

  const [liveWPM, setLiveWPM] = useState(0);

  useEffect(() => {
    if (!startTime || endTime) return;

    const interval = setInterval(() => {
      setLiveWPM(calculateWPM(userInput, startTime, endTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [userInput, startTime, endTime]);

  const displayWPM = !startTime ? 0 : endTime ? calculateWPM(userInput, startTime, endTime) : liveWPM;
  const accuracy = calculateAccuracy(totalKeystrokes, errors);

  return (
    <div
      className={cn(
        "flex justify-center items-center space-x-12 py-6 transition-all duration-1000",
        startTime ? "opacity-100 translate-y-0" : "opacity-30 translate-y-2"
      )}
    >
      <StatItem label="WPM" value={displayWPM} />
      
      <div className="h-6 w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      
      <StatItem label="Accuracy" value={accuracy} suffix="%" />
    </div>
  );
};

const StatItem = ({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) => (
  <div className="flex flex-col items-center min-w-[80px]">
    <span className="text-[9px] text-muted-foreground uppercase tracking-[0.3em] mb-1 font-mono">
      {label}
    </span>
    <div className="text-3xl font-frank font-black tabular-nums flex items-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.2 }}
          className="text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.3)]"
        >
          {value}
        </motion.span>
      </AnimatePresence>
      <span className="text-sm ml-1 opacity-40 font-frank font-normal">{suffix}</span>
    </div>
  </div>
);