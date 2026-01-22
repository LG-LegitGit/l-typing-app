// components/core/LiveStats.tsx
"use client";

import { useTypingStore } from "@/store/useTypingStore";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function LiveStats() {
  const wpm = useTypingStore((s) => s.wpm);
  const accuracy = useTypingStore((s) => s.accuracy);
  const errors = useTypingStore((s) => s.errors);
  
  // Calculate progress based on userInput vs targetText
  const userInput = useTypingStore((s) => s.userInput);
  const targetText = useTypingStore((s) => s.targetText);
  const progress = targetText.length > 0 ? (userInput.length / targetText.length) * 100 : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      <StatCard label="WPM" value={wpm} highlight={wpm > 40} />
      <StatCard label="Accuracy" value={`${accuracy}%`} warning={accuracy < 90} />
      <StatCard label="Errors" value={errors} critical={errors > 5} />
      
      <div className="flex flex-col justify-center p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-primary/10 space-y-3">
        <div className="flex justify-between text-[10px] font-mono tracking-[0.2em] text-primary/50">
          <span>PROGRESS</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-1.5 bg-primary/10" />
      </div>
    </div>
  );
}

function StatCard({ label, value, highlight, warning, critical }: any) {
  return (
    <div className={cn(
      "p-4 bg-white/5 backdrop-blur-md rounded-2xl border transition-all duration-500",
      highlight ? "border-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]" : "border-white/10",
      critical && "border-destructive/50"
    )}>
      <div className={cn(
        "text-3xl font-black font-frank",
        critical ? "text-destructive" : warning ? "text-orange-400" : "text-primary"
      )}>
        {value}
      </div>
      <div className="text-[10px] font-mono tracking-widest text-white/30 uppercase">{label}</div>
    </div>
  );
}