"use client";

import { useTypingStore } from "@/store/useTypingStore";
import { LETTERS_TO_FINGERS, hebrewKeyMap } from "@/lib/data/keyboard-maps";
import { cn } from "@/lib/utils";
import { useEffect, useState, useMemo } from "react";

export const VirtualKeyboard = () => {
  const { targetText, userInput, lastTypedChar } = useTypingStore();
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const nextChar = targetText[userInput.length];
  
  const nextQwertyKey = useMemo(() => {
    if (!nextChar) return null;
    if (nextChar === " ") return "Space";
    const entry = Object.entries(hebrewKeyMap).find(([, heb]) => heb === nextChar);
    return entry ? entry[0].toUpperCase() : null;
  }, [nextChar]);

  useEffect(() => {
    if (lastTypedChar) {
      const qwertyKey = Object.entries(hebrewKeyMap).find(([, heb]) => heb === lastTypedChar)?.[0] || lastTypedChar;
      setActiveKey(qwertyKey?.toLowerCase());
      const timer = setTimeout(() => setActiveKey(null), 150);
      return () => clearTimeout(timer);
    }
  }, [lastTypedChar]);

  const activeFinger = useMemo(() => {
    if (!nextChar) return null;
    const entry = Object.entries(LETTERS_TO_FINGERS).find(([chars]) => 
      chars.includes(nextChar)
    );
    return entry ? entry[1] : null;
  }, [nextChar]);

  return (
    <div className="w-full h-full flex items-stretch gap-6 glass rounded-[2.5rem] altar-glow shadow-2xl overflow-hidden">
      
      {/* 🖐️ SIDE PROFILE - Compact RTL guidance */}
      <div className="w-24 lg:w-28 flex flex-col justify-center items-center gap-6 p-6 border-r border-white/10 bg-black/30 backdrop-blur-sm rounded-l-[2.5rem]">
        <div className="flex flex-col gap-4 items-center space-y-2">
          {/* Finger Indicators - R then L for Hebrew flow */}
          <FingerIndicator label="R" active={activeFinger?.startsWith('right')} />
          <FingerIndicator label="L" active={activeFinger?.startsWith('left')} />
        </div>

        {/* Next Key Preview */}
        <div className="text-center space-y-2 w-full">
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-primary/50 block">המקש הבא</span>
          <div className="flex items-center gap-2 px-2 py-2 bg-white/5 rounded-xl border border-white/10">
            <span className="text-2xl lg:text-3xl font-frank font-black text-primary drop-shadow-lg">
              {nextQwertyKey || "—"}
            </span>
            <span className="text-primary/30 font-mono text-sm">→</span>
            <span className="text-2xl lg:text-3xl font-frank font-black text-white/90">
              {nextChar || "—"}
            </span>
          </div>
          <span className="text-[9px] font-mono text-white/40">
            {activeFinger?.replace('-', ' ') || "התחלה"}
          </span>
        </div>
      </div>

      {/* ⌨️ MAIN KEYBOARD - Full width remaining space */}
      <div className="flex-1 h-full flex flex-col gap-1.5 p-4 lg:p-6 relative" dir="ltr">
        
        {/* Row 1: Numbers */}
        <div className="flex gap-0.5 pl-3 pr-2 h-12 lg:h-14">
          {['`','1','2','3','4','5','6','7','8','9','0','-','='].map(k => (
            <Key key={k} cap={k} active={activeKey === k} target={nextQwertyKey === k} size="sm" />
          ))}
          <Key cap="⌫" active={activeKey === 'backspace'} size="lg" />
        </div>

        {/* Row 2: QWERTY */}
        <div className="flex gap-0.5 pl-8 lg:pl-10 pr-2 h-14 lg:h-16">
          <Key cap="Tab" size="md" />
          {['Q','W','E','R','T','Y','U','I','O','P','[',']'].map(k => (
            <Key key={k} cap={k} active={activeKey === k.toLowerCase()} target={nextQwertyKey === k} hebrew={hebrewKeyMap[k.toLowerCase()]} />
          ))}
          <Key cap="\\" size="md" />
        </div>

        {/* Row 3: ASDF */}
        <div className="flex gap-0.5 pl-12 lg:pl-14 pr-2 h-14 lg:h-16">
          <Key cap="Caps" size="lg" />
          {['A','S','D','F','G','H','J','K','L',';',"'"].map(k => (
            <Key key={k} cap={k} active={activeKey === k.toLowerCase()} target={nextQwertyKey === k} hebrew={hebrewKeyMap[k.toLowerCase()] || (k === "'" ? "׳" : undefined)} />
          ))}
          <Key cap="Enter" active={activeKey === 'enter'} size="xlg" />
        </div>

        {/* Row 4: ZXCV */}
        <div className="flex gap-0.5 pl-18 lg:pl-20 pr-2 h-16 lg:h-18">
          <Key cap="Shift" size="xlg" />
          {['Z','X','C','V','B','N','M',',','.','/'].map(k => (
            <Key key={k} cap={k} active={activeKey === k.toLowerCase()} target={nextQwertyKey === k} hebrew={hebrewKeyMap[k.toLowerCase()]} />
          ))}
          <Key cap="Shift" size="xlg" />
        </div>

        {/* Row 5: Spacebar */}
        <div className="flex gap-0.5 pl-8 lg:pl-10 pr-3 h-16 lg:h-20">
          <Key cap="Ctrl" size="md" />
          <Key cap="Alt" size="md" />
          <Key cap="Space" active={activeKey === ' '} target={nextQwertyKey === 'Space'} className="flex-1 h-full rounded-xl min-h-[4rem]" />
          <Key cap="Alt" size="md" />
          <Key cap="Ctrl" size="md" />
        </div>
      </div>
    </div>
  );
};

// Enhanced Key with sizing system
const Key = ({ cap, active, target, hebrew, className = "", size = "md" }: any) => {
  const sizeStyles = {
    sm: "min-w-[2.25rem] max-w-[2.5rem]",
    md: "min-w-[2.75rem] max-w-[3rem]", 
    lg: "min-w-[3.25rem] w-16",
    xlg: "min-w-[4rem] w-20 lg:w-24"
  };

  return (
    <div 
      className={cn(
        `h-full ${sizeStyles[size as keyof typeof sizeStyles]} flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-200 select-none backdrop-blur-sm font-frank`,
        "bg-black/40 border-white/5 text-white/40 hover:border-white/20 hover:bg-white/10",
        target && "!border-primary/70 !bg-primary/15 !text-primary shadow-[0_0_20px_rgba(var(--primary),0.4)] animate-pulse !scale-[1.03] z-20",
        active && "!animate-key-glow !bg-gradient-to-br !from-primary !to-accent !text-primary-foreground !border-primary !shadow-2xl !shadow-primary/50 !scale-[1.02] z-30",
        className
      )}
    >
      <span className="text-[9px] lg:text-[10px] font-mono opacity-50 uppercase leading-tight">{cap === 'Space' ? '' : cap}</span>
      {hebrew && (
        <span className="text-lg lg:text-xl font-black leading-none -mt-0.5">{hebrew}</span>
      )}
    </div>
  );
};

const FingerIndicator = ({ label, active }: { label: string; active?: boolean }) => (
  <div className={cn(
    "w-8 h-8 lg:w-7 lg:h-7 rounded-2xl flex items-center justify-center border-4 transition-all duration-500 font-mono font-bold text-sm shadow-lg",
    active 
      ? "border-primary bg-gradient-to-br from-primary/30 to-accent/20 text-primary shadow-[0_0_25px_rgba(var(--primary),0.6)] animate-pulse" 
      : "border-white/10 bg-white/5 text-white/20 hover:border-white/20"
  )}>
    {label}
  </div>
);
