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

  // Actions
  processKey: (key: string) => void;
  setTarget: (text: string, category?: TypingState['category'], difficulty?: TypingState['difficulty']) => void;
  reset: () => void;
  nextLesson: () => void;
  setCategory: (category: TypingState['category']) => void;
  setDifficulty: (difficulty: TypingState['difficulty']) => void;
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

  // Sacred Syllabus - Default to home row
  category: 'letters',
  difficulty: 'beginner',

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
      difficulty
    }),

  processKey: (key: string) => {
    const state = get();
    const { targetText, userInput, isFinished, startTime, totalKeystrokes, errors } = state;
    
    // Prevent interaction if done or no text
    if (isFinished || !targetText) return;

    // 1. Handle Backspace
    if (key === "Backspace") {
      set({ 
        userInput: userInput.slice(0, -1),
        lastTypedChar: null 
      });
      return;
    }

    // 2. Hebrew Key Mapping
    const mappedChar = key === " " 
      ? " " 
      : (hebrewKeyMap[key.toLowerCase()] || (HEBREW_LETTERS.includes(key) ? key : null));
    
    // Ignore non-Hebrew keys
    if (!mappedChar || (key.length > 1 && key !== " ")) return;

    // 3. Start timing on first meaningful key
    const now = Date.now();
    const newStartTime = startTime === null ? now : startTime;

    // 4. Hebrew character comparison (with normalization)
    const currentIndex = userInput.length;
    const expectedChar = targetText[currentIndex];
    const isCorrect = (mappedChar === expectedChar) || 
                     (mappedChar === "'" && expectedChar === "׳") ||
                     (mappedChar === "׳" && expectedChar === "'");

    const nextInput = userInput + mappedChar;
    const finished = nextInput.length === targetText.length;
    
    // 5. Update stats
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
      lastTypedChar: mappedChar // VirtualKeyboard glow effect
    });
  },

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
      lastTypedChar: null
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
    // Auto-select first lesson of new category
    const lessons = exerciseTexts[category]?.[get().difficulty] || exerciseTexts.letters.beginner;
    get().setTarget(lessons[0], category, get().difficulty);
  },

  setDifficulty: (difficulty) => {
    set({ difficulty });
    // Auto-select first lesson of new difficulty
    const lessons = exerciseTexts[get().category]?.[difficulty] || exerciseTexts.letters.beginner;
    get().setTarget(lessons[0], get().category, difficulty);
  },
}));
