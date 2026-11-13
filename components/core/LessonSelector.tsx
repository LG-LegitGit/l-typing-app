"use client";

import { useTypingStore } from "@/store/useTypingStore";
import { cn } from "@/lib/utils";

// Define the IDs as constants to keep Typescript happy
type CategoryId = 'letters' | 'roots' | 'verses' | 'prayers';
type DifficultyId = 'beginner' | 'intermediate' | 'advanced';

export function LessonSelector() {
  const { category, setCategory, difficulty, setDifficulty } = useTypingStore();

  const categories: { id: CategoryId; heb: string; en: string; hint: string }[] = [
    { id: 'letters', heb: "אותיות", en: "Letters", hint: "Master the Home Row (A,S,D,F...)" },
    { id: 'roots', heb: "שורשים", en: "Roots", hint: "The 3-letter DNA of the language" },
    { id: 'verses', heb: "פסוקים", en: "Verses", hint: "Sacred wisdom from the Tanakh" },
    { id: 'prayers', heb: "תפילות", en: "Prayers", hint: "Blessings & Liturgy" },
  ];

  const difficulties: { id: DifficultyId; heb: string; en: string; keys: string }[] = [
    { id: 'beginner', heb: "מתחיל", en: "Beginner", keys: "שדגכעיחל" },
    { id: 'intermediate', heb: "בינוני", en: "Intermediate", keys: "Full Alphabet" },
    { id: 'advanced', heb: "מתקדם", en: "Advanced", keys: "Final Letters" },
  ];

  // 🧘 Logic Handlers (Now correctly used in the JSX below)
  const handleCategoryChange = (id: CategoryId) => {
    setCategory(id);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleDifficultyClick = (id: DifficultyId) => {
    setDifficulty(id);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 🏺 THE PATHWAY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)} // 👈 Updated to use handler
            className={cn(
              "relative flex flex-col p-5 rounded-[2rem] transition-all duration-500 text-right group overflow-hidden",
              category === cat.id 
                ? "bg-primary/10 border-2 border-primary/40 shadow-[0_0_40px_rgba(var(--primary-rgb),0.15)]" 
                : "bg-white/[0.03] border-2 border-transparent hover:bg-white/[0.06] hover:border-white/10"
            )}
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 group-hover:text-primary/80 transition-colors mb-4 block text-left">
              {cat.en}
            </span>

            <span className={cn(
              "text-3xl font-frank font-black transition-transform duration-500 group-hover:scale-110",
              category === cat.id ? "text-primary" : "text-white/80"
            )}>
              {cat.heb}
            </span>

            <p className={cn(
              "text-[11px] font-frank text-white/50 mt-4 leading-relaxed transition-opacity duration-500 text-left",
              category === cat.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}>
              {cat.hint}
            </p>

            <span className="absolute -bottom-4 -left-2 text-7xl font-frank font-black text-white/[0.02] pointer-events-none group-hover:text-primary/[0.05] transition-colors">
              {cat.heb[0]}
            </span>
          </button>
        ))}
      </div>

      {/* 🎯 THE DIFFICULTY SELECTOR */}
      <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-2 flex flex-wrap md:flex-nowrap gap-2">
        {difficulties.map((diff) => (
          <button
            key={diff.id}
            onClick={() => handleDifficultyClick(diff.id)} // 👈 Updated to use handler
            className={cn(
              "flex-1 flex items-center justify-between px-6 py-4 rounded-[1.8rem] transition-all duration-500 group relative",
              difficulty === diff.id 
                ? "bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 shadow-lg" 
                : "hover:bg-white/5 border border-transparent"
            )}
          >
            <div className="text-left">
              <span className={cn(
                "block text-[10px] font-mono uppercase tracking-widest",
                difficulty === diff.id ? "text-primary" : "text-white/30"
              )}>
                {diff.en}
              </span>
              <span className="block text-sm font-frank font-bold text-white/90">
                {diff.heb}
              </span>
            </div>
            


            {difficulty === diff.id && (
              <div className="absolute inset-0 border-2 border-primary/20 rounded-[1.8rem] animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}