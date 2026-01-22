"use client";

import { useEffect, useCallback } from "react";
import { useTypingStore } from "@/store/useTypingStore";
import { exerciseTexts } from "@/lib/data/exercises";
// Core Components
import { TypingEngine } from "@/components/core/TypingEngine";
import { WordDisplay } from "@/components/core/WordDisplay";
import { VirtualKeyboard } from "@/components/core/VirtualKeyboard";
import { StatsBar } from "@/components/core/StatsBar";
import { LessonSelector } from "@/components/core/LessonSelector"; // Using this one
import { LiveStats } from "@/components/core/LiveStats"; // Adding side-analytics

export default function Home() {
  const { targetText, setTarget, isFinished, reset } = useTypingStore();

  // Initial Target Setup
  useEffect(() => {
    if (!targetText) {
      setTarget(exerciseTexts.letters.beginner[0]);
    }
  }, [targetText, setTarget]);

  return (
    <main className="h-screen w-full bg-[#020617] text-slate-50 flex flex-col overflow-hidden font-sans">
      <TypingEngine /> {/* Headless - must be rendered to listen for keys */}

      {/* 🏺 TOP BAR: Brand & Animated Stats */}
      <header className="h-16 shrink-0 border-b border-white/5 bg-white/5 backdrop-blur-md flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-frank font-black text-lg">ל</div>
          <h1 className="text-lg font-frank font-black tracking-tighter"> LamediYah.App לְמַדְיָה</h1>
        </div>
        
        {/* Your Framer Motion StatsBar */}
        <div className="flex-1 max-w-sm mx-8">
          <StatsBar />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest opacity-50 uppercase tracking-[0.3em]">Touch Typing App Active</span>
        </div>
      </header>

      {/* 📱 CENTRAL OPERATING AREA */}
      <div className="flex-1 flex overflow-hidden p-6 gap-6">
        
        {/* 📜 THE ALTAR: Word Display Area */}
        <section className="flex-[3] relative bg-white/[0.02] border border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center p-12 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.07)_0%,transparent_70%)] pointer-events-none" />
          
          <WordDisplay />

          {/* Completion Overlay */}
          {isFinished && (
            <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-700">
              <h2 className="text-5xl font-frank font-black mb-8 text-primary">הושלם • Complete</h2>
              <button 
                className="px-12 py-4 bg-primary text-primary-foreground rounded-full font-frank text-xl hover:scale-105 transition-transform"
                onClick={reset}
              >
                Reset Ritual
              </button>
            </div>
          )}
        </section>

        {/* ⚙️ COMMAND TOWER: Lesson Selection & Live Progress */}
        <aside className="flex-1 max-w-sm flex flex-col gap-4 overflow-hidden">
          
          {/* Your LessonSelector Component */}
          <LessonSelector />

          {/* Your LiveStats Component (Progress + Stat Cards) */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
             <LiveStats />
             
             {/* Simple Helper Card */}
             <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                <p className="text-[11px] font-mono text-primary/60 italic leading-relaxed text-center">
                  "Speed is a byproduct of accuracy. Let the rhythm guide your hands."
                </p>
             </div>
          </div>
          
        </aside>
      </div>

<footer className="h-[300px] shrink-0 bg-slate-950/50 border-t border-white/10 backdrop-blur-3xl overflow-hidden">
  <div className="max-w-[1400px] mx-auto h-full flex items-center justify-center p-4 lg:p-6">
    <VirtualKeyboard />
  </div>
</footer>


    </main>
  );
}