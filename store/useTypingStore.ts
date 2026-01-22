import { create } from 'zustand';
import { hebrewKeyMap, HEBREW_LETTERS } from '@/lib/data/keyboard-maps';
import { calculateAccuracy, calculateWPM } from '@/lib/utils/stats';
import { exerciseTexts } from '@/lib/data/exercises';

interface TypingState {
  // Core typing state
  targetText: string;
  userInput: string;
  startTime: number | null;
  endTime: number | null;
  totalKeystrokes: number;
  errors: number;
  isFinished: boolean;
  wpm: number;
  accuracy: number;
  lastTypedChar: string | null;

  // Sacred Syllabus
  category: 'letters' | 'roots' | 'verses' | 'prayers';
  difficulty: 'beginner' | 'intermediate' | 'advanced';

  // NEW: Wrong Layout Detection
  isWrongLayout: boolean;

  // Actions
  processKey: (key: string) => void;
  setTarget: (text: string, category?: TypingState['category'], difficulty?: TypingState['difficulty']) => void;
  reset: () => void;
  resetProgress: () => void;
  nextLesson: () => void;
  setCategory: (category: TypingState['category']) => void;
  setDifficulty: (difficulty: TypingState['difficulty']) => void;
  setWrongLayout: (val: boolean) => void;
}

export const useTypingStore = create<TypingState>((set, get) => ({
  // Core state
  targetText: "",
  userInput: "",
  startTime: null,
  endTime: null,
  totalKeystrokes: 0,
  errors: 0,
  isFinished: false,
  wpm: 0,
  accuracy: 100,
  lastTypedChar: null,

  // Sacred Syllabus
  category: 'letters',
  difficulty: 'beginner',

  // NEW: Wrong Layout Detection
  isWrongLayout: false,

  setWrongLayout: (val: boolean) => set({ isWrongLayout: val }),

  setTarget: (text: string, category = get().category, difficulty = get().difficulty) => 
    set({ 
      targetText: text,
      userInput: "",
      startTime: null,
      endTime: null,
      totalKeystrokes: 0,
      errors: 0,
      isFinished: false,
      wpm: 0,
      accuracy: 100,
      lastTypedChar: null,
      category,
      difficulty,
      isWrongLayout: false
    }),

  resetProgress: () => set({ 
    userInput: "",
    startTime: null,
    errors: 0,
    isWrongLayout: false
  }),

  processKey: (key: string) => {
    const state = get();
    const { targetText, userInput, isFinished, startTime, totalKeystrokes, errors } = state;
    
    if (isFinished || !targetText) return;

    // 1. Handle Backspace
    if (key === "Backspace") {
      set({ 
        userInput: userInput.slice(0, -1),
        lastTypedChar: null,
        isWrongLayout: false
      });
      return;
    }

    // 2. Hebrew Key Mapping + Wrong Layout Detection
    const mappedChar = key === " " 
      ? " " 
      : (hebrewKeyMap[key.toLowerCase()] || (HEBREW_LETTERS.includes(key) ? key : null));
    
    // NEW: Detect wrong layout (QWERTY instead of Hebrew)
    const isDirectHebrewInput = HEBREW_LETTERS.includes(key) && !hebrewKeyMap[key.toLowerCase()];
    const isWrongLayoutInput = mappedChar === null && key.length === 1 && /[a-zA-Z]/.test(key);    
    if (isWrongLayoutInput) {
      set({ isWrongLayout: true });
      return; // Block input, show warning
    }

    if (!mappedChar || (key.length > 1 && key !== " ")) return;

    // Reset wrong layout on correct input
    if (state.isWrongLayout) set({ isWrongLayout: false });

    // 3. Rest of logic unchanged...
    const now = Date.now();
    const newStartTime = startTime === null ? now : startTime;
    const currentIndex = userInput.length;
    const expectedChar = targetText[currentIndex];
    const isCorrect = (mappedChar === expectedChar) || 
                     (mappedChar === "'" && expectedChar === "׳") ||
                     (mappedChar === "׳" && expectedChar === "'");

    const nextInput = userInput + mappedChar;
    const finished = nextInput.length === targetText.length;
    
    const newTotalKeystrokes = totalKeystrokes + 1;
    const newErrors = isCorrect ? errors : errors + 1;
    const currentWpm = calculateWPM(nextInput, newStartTime, finished ? now : null);
    const currentAcc = calculateAccuracy(newTotalKeystrokes, newErrors);

    set({
      userInput: nextInput,
      wpm: currentWpm,
      accuracy: currentAcc,
      startTime: newStartTime,
      endTime: finished ? now : null,
      isFinished: finished,
      totalKeystrokes: newTotalKeystrokes,
      errors: newErrors,
      lastTypedChar: mappedChar
    });
  },

  // ... rest of methods unchanged
  reset: () => {
    const { targetText, category, difficulty } = get();
    set({ 
      userInput: "",
      startTime: null,
      endTime: null,
      totalKeystrokes: 0,
      errors: 0,
      isFinished: false,
      wpm: 0,
      accuracy: 100,
      lastTypedChar: null,
      isWrongLayout: false
    });
  },

  nextLesson: () => {
    const { category, difficulty } = get();
    const lessons = exerciseTexts[category]?.[difficulty] || exerciseTexts.letters.beginner;
    const randomLesson = lessons[Math.floor(Math.random() * lessons.length)];
    get().setTarget(randomLesson, category, difficulty);
  },

  setCategory: (category) => {
    set({ category });
    const lessons = exerciseTexts[category]?.[get().difficulty] || exerciseTexts.letters.beginner;
    get().setTarget(lessons[0], category, get().difficulty);
  },

  setDifficulty: (difficulty) => {
    set({ difficulty });
    const lessons = exerciseTexts[get().category]?.[difficulty] || exerciseTexts.letters.beginner;
    get().setTarget(lessons[0], get().category, difficulty);
  },
}));
