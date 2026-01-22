"use client";

import { useState, useEffect, useCallback } from "react";
import { useTypingStore } from "@/store/useTypingStore";
import { exerciseTexts } from "@/lib/data/exercises";
import { cn } from "@/lib/utils";

export const WelcomeRitual = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const { setTarget } = useTypingStore();

  const startRitual = useCallback(() => {
    localStorage.setItem("temple_onboarded", "true");
    setIsOpen(false);
    setTarget(exerciseTexts.letters.beginner[0], 'letters', 'beginner');
  }, [setTarget]);

  useEffect(() => {
    const hasVisited = localStorage.getItem("temple_onboarded");
    if (!hasVisited) setIsOpen(true);

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") startRitual();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [startRitual]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-950/98 backdrop-blur-3xl transition-all duration-700 animate-in fade-in">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.15)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-2xl w-full glass rounded-[3.5rem] p-8 lg:p-14 border-4 border-primary/20 text-center shadow-[0_0_120px_rgba(var(--primary-rgb),0.2)] relative overflow-hidden">
        
        {/* STEP INDICATOR */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2">
          {[1,2,3].map(s => (
            <div 
              key={s}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-500",
                step >= s ? "bg-primary scale-125 shadow-primary/50" : "bg-white/20"
              )}
            />
          ))}
        </div>

        {/* --- STEP 1: IDENTITY --- */}
        {step === 1 && (
          <div className="space-y-10 relative z-10 animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-2xl mb-8 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
              <span className="text-5xl font-frank font-black text-primary-foreground leading-none">ל</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-frank font-black text-white tracking-tighter uppercase leading-none">
                Welcome
              </h1>
              <p className="text-4xl lg:text-5xl font-frank font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                ברוך הבא
              </p>
            </div>
            <p className="text-xl lg:text-2xl font-frank font-bold text-white/70 leading-relaxed max-w-md mx-auto">
              Built for English speakers learning Hebrew through muscle memory.
            </p>
            <button 
              onClick={() => setStep(2)}
              className="group w-full py-8 lg:py-10 bg-gradient-to-r from-white via-gray-50 to-white text-black rounded-[2.5rem] font-frank font-black text-2xl lg:text-3xl shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">HOW IT WORKS</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        )}

        {/* --- STEP 2: THE MAGIC MAPPING --- */}
        {step === 2 && (
          <div className="space-y-10 relative z-10 animate-in slide-in-from-right-16 duration-700">
            <button 
              onClick={() => setStep(1)} 
              className="absolute left-6 top-6 -translate-y-1/2 text-white/40 hover:text-white transition-colors text-sm"
            >
              ← Back
            </button>
            
            <h2 className="text-4xl lg:text-5xl font-frank font-black text-white leading-tight">
              Your Keyboard → Hebrew
            </h2>
            
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 lg:p-12 space-y-8 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-center gap-12 lg:gap-16">
                <div className="flex flex-col items-center gap-3 group cursor-default">
                  <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-3xl border-3 border-white/30 flex items-center justify-center font-mono text-4xl lg:text-5xl bg-white/10 shadow-2xl backdrop-blur-sm group-hover:scale-110 transition-all duration-300">
                    A
                  </div>
                  <p className="text-sm lg:text-base font-bold text-white/90 tracking-wide uppercase">Your Keys</p>
                </div>
                
                <div className="flex flex-col items-center gap-4 animate-pulse">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="text-3xl lg:text-4xl font-bold text-primary">→</span>
                  </div>
                  <p className="text-xs lg:text-sm font-mono uppercase tracking-wider text-primary/70">LamediYah</p>
                </div>
                
                <div className="flex flex-col items-center gap-3 group cursor-default">
                  <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-3xl border-3 border-primary/60 flex items-center justify-center font-frank font-black text-5xl lg:text-6xl bg-gradient-to-br from-primary/15 to-accent/15 shadow-2xl shadow-primary/40 backdrop-blur-sm group-hover:scale-110 transition-all duration-300">
                    ש
                  </div>
                  <p className="text-sm lg:text-base font-bold text-primary/90 tracking-wide uppercase">Hebrew</p>
                </div>
              </div>
              
              <div className="text-center space-y-3">
                <p className="text-lg lg:text-xl font-frank font-bold text-white/90 max-w-md mx-auto leading-relaxed">
                  <span className="text-primary">No layout changes needed.</span> Type normally on your English keyboard.
                </p>
                <p className="text-base lg:text-lg text-white/70 font-medium max-w-sm mx-auto">
                  LamediYah transforms your keystrokes into sacred Hebrew letters.
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <button 
                onClick={() => setStep(1)} 
                className="flex-1 py-4 border border-white/20 rounded-xl text-white/50 hover:text-white hover:border-white/40 transition-all font-mono uppercase tracking-wide text-sm"
              >
                Back
              </button>
              <button 
                onClick={() => setStep(3)}
                className="flex-[2] py-6 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-[2rem] font-frank font-black text-xl lg:text-2xl shadow-xl hover:shadow-primary/40 hover:scale-[1.02] transition-all"
              >
                PRINCIPLES → היסודות
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 3: CORE PRINCIPLES --- */}
        {step === 3 && (
          <div className="space-y-12 relative z-10 animate-in slide-in-from-right-16 duration-700">
            <div className="flex items-start gap-4">
              <button 
                onClick={() => setStep(2)} 
                className="absolute left-6 top-6 -translate-y-1/2 text-white/40 hover:text-white transition-colors text-sm font-mono uppercase tracking-wide -rotate-3"
              >
                ← Back
              </button>
              <h2 className="text-4xl lg:text-5xl font-frank font-black text-white leading-tight mx-auto">
                Your Ritual
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 shadow-xl hover:shadow-primary/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-xl font-bold text-primary-foreground">👁</span>
                  </div>
                  <span className="text-primary font-mono text-[11px] uppercase tracking-[0.4em] font-bold">Eyes</span>
                </div>
                <h3 className="text-2xl font-frank font-black text-white mb-4 leading-tight">Follow the Glow</h3>
                <p className="text-lg text-white/80 leading-relaxed">The glowing Hebrew letter shows you exactly where to type next. Eyes lead, fingers follow.</p>
              </div>
              
              <div className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 shadow-xl hover:shadow-primary/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-xl font-bold text-primary-foreground">✋</span>
                  </div>
                  <span className="text-primary font-mono text-[11px] uppercase tracking-[0.4em] font-bold">Hands</span>
                </div>
                <h3 className="text-2xl font-frank font-black text-white mb-4 leading-tight">Home Row Forever</h3>
                <p className="text-lg text-white/80 leading-relaxed">Rest fingers on ASDF. Never look down. Muscle memory unlocks fluency.</p>
              </div>
            </div>

            <button 
              onClick={startRitual}
              className="group w-full h-24 lg:h-28 bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground rounded-[2.5rem] font-frank font-black text-3xl lg:text-4xl shadow-[0_30px_80px_rgba(var(--primary-rgb),0.4)] hover:shadow-[0_40px_100px_rgba(var(--primary-rgb),0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 overflow-hidden border-2 border-primary/20"
            >
              <span className="relative z-10 flex items-center justify-center h-full gap-4 backdrop-blur-sm">
                ENTER TEMPLE שדגכעיהל
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[2.5rem]" />
            </button>

            <div className="text-center">
              <button 
                onClick={() => setStep(2)} 
                className="text-white/40 hover:text-white transition-colors text-sm font-mono uppercase tracking-wide"
              >
                ← Previous Step
              </button>
            </div>
          </div>
        )}

        {/* 🏺 PROGRESS FOOTER */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] flex items-center gap-2">
          Step {step} of 3 • Skip: <span className="text-primary/60 font-bold">Escape</span>
        </div>
      </div>
    </div>
  );
};
