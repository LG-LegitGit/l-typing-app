"use client";

import { useTypingStore } from "@/store/useTypingStore";
import { exerciseTexts } from "@/lib/data/exercises";
import { cn } from "@/lib/utils";

export function LessonSelector() {
  const { category, setCategory, difficulty, setDifficulty } = useTypingStore();

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 py-1">
      {/* 🏺 PATHWAY (Category) */}
      <div className="flex items-center gap-3">
        <label className="text-[9px] font-mono tracking-[0.2em] text-white/20 uppercase hidden lg:block">Pathway</label>
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value as any)}
          className="bg-transparent text-primary font-frank text-sm lg:text-base outline-none cursor-pointer hover:text-white transition-colors appearance-none"
        >
          <option className="bg-slate-950" value="letters">Letters (אותיות)</option>
          <option className="bg-slate-950" value="roots">Roots (שורשים)</option>
          <option className="bg-slate-950" value="verses">Verses (פסוקים)</option>
          <option className="bg-slate-950" value="prayers">Prayers (תפילות)</option>
        </select>
      </div>

      <div className="hidden md:block h-4 w-px bg-white/10" />

      {/* 🎯 DIFFICULTY */}
      <div className="flex items-center gap-2">
        {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={cn(
              "px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-tighter transition-all duration-300 border",
              difficulty === level 
                ? "bg-primary/10 border-primary/40 text-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]" 
                : "border-transparent text-white/30 hover:text-white"
            )}
          >
            {level === 'beginner' ? 'מתחיל' : 
             level === 'intermediate' ? 'בינוני' : 'מתקדם'}
          </button>
        ))}
      </div>
    </div>
  );
}