"use client";

import { useTypingStore } from "@/store/useTypingStore";
import { Card, CardContent } from "@/components/ui/card";
import { exerciseTexts } from "@/lib/data/exercises";

export function LessonSelector() {
  const { category, setCategory, difficulty, setDifficulty } = useTypingStore();

  return (
    <Card className="bg-white/5 border-white/10 shadow-xl">
      <CardContent className="p-6 space-y-6">
        {/* 🏺 PATHWAY SELECTOR */}
        <div className="space-y-3">
          <label className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">Pathway</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value as 'letters' | 'roots' | 'verses' | 'prayers')}
            className="w-full bg-slate-900/50 border border-white/20 hover:border-white/30 rounded-xl p-3.5 text-primary font-frank text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 cursor-pointer"
          >
            <option value="letters">Letters (אותיות)</option>
            <option value="roots">Roots (שורשים)</option>
            <option value="verses">Verses (פסוקים)</option>
            <option value="prayers">Prayers (תפילות)</option>
          </select>
        </div>
        
        {/* 🎯 DIFFICULTY PILL BUTTONS */}
        <div className="space-y-3">
          <label className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">Difficulty</label>
          <div className="grid grid-cols-3 gap-2">
            {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`py-2.5 px-3 rounded-lg text-[10px] font-mono uppercase tracking-wide font-bold transition-all duration-200 hover:scale-[1.02] border border-transparent ${
                  difficulty === level 
                    ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25' 
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white hover:border-white/30'
                }`}
              >
                {level === 'beginner' ? 'מתחיל' : 
                 level === 'intermediate' ? 'בינוני' : 'מתקדם'}
              </button>
            ))}
          </div>
        </div>

        {/* 📜 CURRENT LESSON PREVIEW */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-[9px] font-mono text-white/30 tracking-wider uppercase mb-2">Current Rite</p>
          <div className="text-xs font-mono text-primary/80 leading-tight max-h-12 overflow-hidden">
            {/* Preview first lesson of current selection */}
            {exerciseTexts[category]?.[difficulty]?.[0]?.slice(0, 50)}...
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
