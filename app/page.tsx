"use client";
import { useEffect } from "react";
import { WelcomeRitual } from "@/components/core/WelcomeRitual";
import { WordDisplay } from "@/components/core/WordDisplay";
import { VirtualKeyboard } from "@/components/core/VirtualKeyboard";
import { LessonSelector } from "@/components/core/LessonSelector";
import { LiveStats } from "@/components/core/LiveStats";
import { TypingEngine } from "@/components/core/TypingEngine";
import { SoundEngine } from "@/components/core/SoundEngine";
import { useTypingStore } from "@/store/useTypingStore";
import { cn } from "@/lib/utils";

export default function Home() {
  const { isTyping, category, difficulty } = useTypingStore();  
  
  // 🧘‍♂️ FOCUS LIBERATOR - Forces WordDisplay focus after settings
  useEffect(() => {
    if (isTyping && document.activeElement instanceof HTMLElement) {
      // Blur any buttons/settings, focus goes to document body → TypingEngine
      document.activeElement.blur();
      
      // Small delay ensures TypingEngine captures next keystroke
      requestAnimationFrame(() => {
        document.body.focus();
      });
    }
  }, [isTyping]);

  useEffect(() => {
  const handleSpaceScroll = (e: KeyboardEvent) => {
    // If the user is typing and hits space, stop the browser from scrolling
    if (e.code === "Space" && isTyping) {
      // Only prevent default if we aren't currently inside a text input
      if (!(document.activeElement instanceof HTMLInputElement)) {
        e.preventDefault();
      }
    }
  };

  window.addEventListener("keydown", handleSpaceScroll);
  return () => window.removeEventListener("keydown", handleSpaceScroll);
}, [isTyping]);

  return (
    <main className="min-h-screen bg-zinc-800 text-white overflow-hidden flex flex-col relative font-frank selection:bg-primary/30">
      
      {/* 🌌 SACRED GLOW */}
      <div className={cn(
        "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05)_0%,transparent_70%)] pointer-events-none z-0 transition-all duration-1000",
        isTyping ? "opacity-100 scale-102" : "opacity-30 scale-100"
      )} />
      
      <TypingEngine />
      <SoundEngine />
      
      {/* 🏛️ HEADER - Fades to backdrop */}
      <header className={cn(
        "relative z-30 pt-12 pb-4 text-center px-4 shrink-0 transition-all duration-800 ease-out",
        isTyping ? "opacity-10 blur-sm -translate-y-8 scale-95" : "opacity-100 blur-none translate-y-0 scale-100"
      )}>
        <div className="inline-flex items-center justify-center gap-4 bg-white/[0.04] backdrop-blur-3xl px-8 py-4 rounded-[3rem] border border-white/10 shadow-2xl">
          <span className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-xl transform -rotate-6">
            <span className="text-2xl font-black text-primary-foreground leading-none">ל</span>
          </span>
          <div className="text-left">
            <h1 className="text-xl font-black tracking-tight uppercase bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent leading-none">
              LamediYah
            </h1>
            <p className="text-[8px] font-mono uppercase tracking-[0.3em] text-primary/70">Teaches Typing</p>
          </div>
        </div>
      </header>

      {/* 🎯 LESSON SELECTOR - CSS GRID COLLAPSE PERFECTION */}
      <section className={cn(
        "px-4 relative z-20 max-w-6xl mx-auto w-full transition-all duration-1000 ease-in-out overflow-hidden",
        isTyping 
          ? "grid-rows-[0fr] opacity-0 -translate-y-4 pointer-events-none max-h-0 py-0" 
          : "grid-rows-[1fr] opacity-100 translate-y-0 py-6 max-h-[600px]"
      )}>
        <div className="overflow-hidden grid">
          <LessonSelector />
        </div>
      </section>

      {/* ⚡ SACRED ALTAR - PERFECT CENTER */}
      <section className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full px-6 relative z-20 transition-all duration-1000 ease-out">
        
        {/* 🧘 ZEN BREADCRUMB */}
        <div className={cn(
          "mb-8 transition-all duration-1000 ease-out font-mono text-[11px] uppercase tracking-[0.4em] text-primary/70 flex items-center gap-3",
          isTyping ? "opacity-100 scale-105" : "opacity-0 scale-95 -translate-y-2"
        )}>
          <span className="font-bold">{category}</span>
          <span className="w-px h-px rounded-full bg-primary/40" />
          <span>{difficulty}</span>
        </div>

        <div className="w-full flex-1 flex flex-col items-center justify-center space-y-12 relative z-10">
          {/* LiveStats - Enhanced when typing */}
          <div className={cn(
            "transition-all duration-1000 ease-out",
            isTyping ? "opacity-100 scale-110 -translate-y-3 shadow-2xl" : "opacity-50 scale-100 shadow-lg"
          )}>
            <LiveStats />
          </div>
          
          <div 
            id="typing-altar"
            tabIndex={-1} // Makes it focusable via script but not tab
            className="outline-none"
          >
          {/* Holy WordDisplay - Center stage */}
          <div className="flex-1 flex items-center justify-center w-full min-h-[240px] transition-all duration-1000">
            <WordDisplay />
          </div>
          </div>

          {/* Spacebar Hint */}
          <div className={cn(
            "text-center transition-all duration-800 ease-out font-mono text-[10px] uppercase tracking-[0.4em] text-white/20",
            isTyping ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"
          )}>
            Press <span className="text-primary font-bold px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 mx-1 backdrop-blur-sm">Space</span> to restart
          </div>
        </div>
      </section>

      {/* ⌨️ GOLDEN COCKPIT FOUNDATION */}
      <footer className={cn(
        "w-full shrink-0 bg-gradient-to-t from-purple-950 via-[#0a0514] to-purple-950/60 border-t-2 border-amber-500/40 backdrop-blur-3xl py-6 z-50 relative transition-all duration-1000",
        isTyping ? "opacity-100" : "opacity-90"
      )}>
        <div className="max-w-[1400px] mx-auto px-8 flex items-end justify-between gap-4">
          
          {/* 🕯️ LEFT WING: Sacred Philosophy */}
          <div className="hidden lg:flex flex-col items-start gap-2 pb-6 min-w-[200px]">
            <p className="text-[9px] font-mono uppercase tracking-[0.4em] bg-gradient-to-r from-amber-400 via-white to-amber-400 bg-clip-text text-transparent font-bold">
              English Hand
            </p>
            <div className="h-px w-full bg-gradient-to-r from-amber-500/40 to-transparent" />
            <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/30">
              Hebrew Soul
            </p>
          </div>

          {/* ⌨️ CENTER: The Keyboard */}
          <div className="flex-1 flex justify-center transform scale-90 lg:scale-95 origin-bottom">
            <VirtualKeyboard />
          </div>

          {/* ✨ RIGHT WING: Artist Signature */}
          <div className="hidden lg:flex pb-4 min-w-[200px] justify-end">
            <a 
              href="https://lamediyah.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all duration-500"
            >
              <div className="text-right">
                <span className="block text-[8px] font-mono uppercase tracking-[0.3em] text-amber-500/50">
                  Crafted by
                </span>
                <span className="block text-[14px] font-frank font-black tracking-tight bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
                  LamediYah
                </span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg border border-amber-400/30">
                <span className="text-[14px] font-bold text-purple-950 group-hover:rotate-45 transition-transform duration-500">↗</span>
              </div>
            </a>
          </div>

        </div>
      </footer>

      <WelcomeRitual />
    </main>
  );
}
