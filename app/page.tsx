import { WelcomeRitual } from "@/components/core/WelcomeRitual";
import { WordDisplay } from "@/components/core/WordDisplay";
import { VirtualKeyboard } from "@/components/core/VirtualKeyboard";
import { LessonSelector } from "@/components/core/LessonSelector";
import { LiveStats } from "@/components/core/LiveStats";
import { TypingEngine } from "@/components/core/TypingEngine";
import { SoundEngine } from "@/components/core/SoundEngine";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-950 text-white overflow-hidden flex flex-col">
      
      {/* 🧠 LOGIC ENGINES (Headless) */}
      <TypingEngine />
      <SoundEngine />
      
      {/* 🏛️ HERO HEADER: Compact Identity + Navigation */}
      <header className="relative z-10 pt-10 pb-4 text-center px-4 shrink-0 animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="inline-flex items-center justify-between gap-4 bg-white/[0.03] backdrop-blur-2xl px-6 py-3 rounded-full border border-white/10 shadow-2xl max-w-2xl mx-auto w-full md:w-auto">
          
          {/* Brand Mark */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg transform -rotate-6 transition-transform hover:rotate-0">
              <span className="text-xl font-frank font-black text-primary-foreground leading-none">ל</span>
            </div>
            <div className="text-left hidden sm:block">
              <h1 className="text-xl font-frank font-black tracking-tight leading-none bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent">
                LamediYah
              </h1>
              <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-primary/60">Teaches Typing</p>
            </div>
          </div>

          <div className="h-6 w-px bg-white/10 mx-2" />

          {/* Lesson Control */}
          <div className="flex-1 md:flex-initial">
            <LessonSelector />
          </div>
        </div>
      </header>

      {/* 🎮 THE ALTAR: Focused Word Display Area */}
      <section className="flex-1 flex flex-col items-center justify-center max-w-6xl mx-auto w-full px-6 relative">
        {/* Subtle background glow behind the text */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="w-full space-y-12 relative z-10">
          {/* Centered Stats - Acts as a bridge between Nav and Text */}
          <div className="flex justify-center animate-in fade-in zoom-in duration-700 delay-300">
            <LiveStats />
          </div>
          
          {/* The "Sacred Scroll" Area */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <WordDisplay />
          </div>
        </div>
      </section>

      {/* ⌨️ THE FOUNDATION: Keyboard at bottom */}
      <footer className="w-full h-[340px] shrink-0 bg-slate-950/50 border-t border-white/5 backdrop-blur-3xl pt-8 pb-12 z-20">
        <div className="max-w-5xl mx-auto px-6 h-full flex flex-col items-center justify-between">
          <VirtualKeyboard />
          <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 mt-8">
             English Hand <span className="mx-4 text-primary opacity-40">•</span> Hebrew Soul
          </p>
        </div>
      </footer>

      {/* ✨ WELCOME RITUAL */}
      <WelcomeRitual />
    </main>
  );
}