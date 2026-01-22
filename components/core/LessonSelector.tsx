"use client";

import { useTypingStore } from "@/store/useTypingStore";
import { cn } from "@/lib/utils";

const blurActiveElement = () => {
  if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
};

export function LessonSelector() {
  const { category, setCategory, difficulty, setDifficulty } = useTypingStore();

  const categoryTooltips = {
    letters: "Master Alphabet • Focus on Home Row keys (A, S, D, F...)",
    roots: "Sacred Roots • Learn core Hebrew grammar (3-letter roots)",
    verses: "Sacred Torah • Type full verses from the Tanakh",
    prayers: "Liturgy • Connect with traditional blessings"
  };

  const difficultyTooltips = {
    beginner: "Home Row Only\n(ש ד ג כ ע י ה ל)\nShort exercises.",
    intermediate: "Full Keyboard\n(Upper & Lower Rows)\nModerate length.",
    advanced: "Complete Fluency\n(Includes Final Letters)\nFull endurance."
  };

  return (
    // 🛡️ isolation-isolate prevents the "bleed" by creating a local zenith
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 py-1 isolation-isolate">
      
      {/* 🏺 PATHWAY */}
      <div className="flex items-center gap-3 group relative">
        <label className="text-[9px] font-mono tracking-[0.2em] text-white/20 uppercase hidden lg:block">Pathway</label>
        
        <div className="relative flex items-center">
          <select 
            value={category}
            onChange={(e) => { setCategory(e.target.value as any); blurActiveElement(); }}
            className="bg-transparent text-primary font-frank text-sm lg:text-base outline-none cursor-pointer hover:text-white transition-colors appearance-none pr-6 relative z-10"
          >
            <option className="bg-slate-950" value="letters">Letters (אותיות)</option>
            <option className="bg-slate-950" value="roots">Roots (שורשים)</option>
            <option className="bg-slate-950" value="verses">Verses (פסוקים)</option>
            <option className="bg-slate-950" value="prayers">Prayers (תפילות)</option>
          </select>

          {/* 💡 THE ZENITH TOOLTIP (Upward from settings) */}
<div className="absolute bottom-full right-0 mb-3 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-[9999] pointer-events-none min-w-[260px]">
  <div className="text-[10px] text-primary font-mono uppercase tracking-[0.2em] mb-1.5 font-bold">Pathway Wisdom</div>
  <p className="text-xs text-white/90 font-frank leading-relaxed">
    {categoryTooltips[category as keyof typeof categoryTooltips]}
  </p>
  {/* Pointer Arrow - Points DOWN to settings */}
  <div className="absolute -bottom-1 left-4 w-2 h-2 bg-slate-900 border-r border-b border-primary/20 rotate-45" />
</div>

        </div>
      </div>

      <div className="hidden md:block h-4 w-px bg-white/10" />

      {/* 🎯 DIFFICULTY */}
      <div className="flex items-center gap-2">
        {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
          <div key={level} className="group relative">
            <button
              onClick={() => { setDifficulty(level); blurActiveElement(); }}
              className={cn(
                "px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-tighter transition-all duration-300 border font-bold relative z-10",
                difficulty === level 
                  ? "bg-primary/10 border-primary/40 text-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]" 
                  : "border-transparent text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              {level === 'beginner' ? 'מתחיל' : level === 'intermediate' ? 'בינוני' : 'מתקדם'}
            </button>
            
            {/* 💡 THE ZENITH TOOLTIP (Upward) */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible -translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-[9999] pointer-events-none text-center w-[180px]">
              <div className="text-[10px] text-primary font-mono uppercase tracking-[0.2em] mb-1.5 font-bold">Difficulty</div>
              <p className="text-xs text-white/90 font-frank leading-tight whitespace-pre-line">
                {difficultyTooltips[level]}
              </p>
              {/* Small Pointer Arrow */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-white/10 rotate-45" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}