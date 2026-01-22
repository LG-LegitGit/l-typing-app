import { create } from 'zustand';
import { hebrewKeyMap } from '@/lib/data/keyboard-maps';
import { calculateAccuracy, calculateWPM } from '@/lib/utils/stats';
import { exerciseTexts } from '@/lib/data/exercises';

// 🧠 Backward compatible - works with your CURRENT string[] data
type Exercise = string; // Current data structure
type WisdomExercise = {
    pronunciation: any; text: string; meaning?: string; source?: string; transliteration?: string 
};

interface TypingState {
  targetText: string;
  currentExercise: Exercise | WisdomExercise; // Stores full object when available
  userInput: string;
  startTime: number | null;
  endTime: number | null;
  totalKeystrokes: number;
  errors: number;
  isFinished: boolean;
  wpm: number;
  accuracy: number;
  lastTypedChar: string | null;
  lastStrokeCorrect: boolean | null;
  category: 'letters' | 'roots' | 'verses' | 'prayers';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isHesitating: boolean;

  // Actions
  processKey: (key: string) => void;
  setTarget: (exercise: Exercise | WisdomExercise, category?: TypingState['category'], difficulty?: TypingState['difficulty']) => void;
  reset: () => void;
  nextLesson: () => void;
  setCategory: (category: TypingState['category']) => void;
  setDifficulty: (difficulty: TypingState['difficulty']) => void;
  setHesitating: (val: boolean) => void;
  getWisdomData: () => WisdomExercise | null;
}

export const useTypingStore = create<TypingState>((set, get) => ({
  targetText: "",
  currentExercise: "",
  userInput: "",
  startTime: null,
  endTime: null,
  totalKeystrokes: 0,
  errors: 0,
  isFinished: false,
  wpm: 0,
  accuracy: 100,
  lastTypedChar: null,
  lastStrokeCorrect: null,
  category: 'letters',
  difficulty: 'beginner',
  isHesitating: false,

  setHesitating: (val) => set({ isHesitating: val }),

  /** 🏺 MAGIC: Handles BOTH string AND WisdomExercise */
  setTarget: (exercise: Exercise | WisdomExercise, category = get().category, difficulty = get().difficulty) => {
    // Extract text for typing (works for both string and object)
    const text = typeof exercise === 'string' ? exercise : exercise.text;
    
    set({ 
      currentExercise: exercise,
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
      lastStrokeCorrect: null,
      category,
      difficulty,
      isHesitating: false
    });
  },

  /** 📜 Extract wisdom data (null for letters) */
  getWisdomData: () => {
    const exercise = get().currentExercise;
    return typeof exercise === 'object' && 'meaning' in exercise ? exercise as WisdomExercise : null;
  },

  processKey: (key) => {
    const state = get();
    if (state.isFinished || !state.targetText) return;

    if (state.isHesitating) set({ isHesitating: false });

    if (key === "Backspace") {
      set({ 
        userInput: state.userInput.slice(0, -1),
        lastTypedChar: null,
        lastStrokeCorrect: null
      });
      return;
    }

    const mappedChar = key === " " ? " " : hebrewKeyMap[key.toLowerCase()];
    if (!mappedChar || key.length > 1) return;

    const now = Date.now();
    const newStartTime = state.startTime === null ? now : state.startTime;
    const currentIndex = state.userInput.length;
    const expectedChar = state.targetText[currentIndex];

    const isCorrect = (mappedChar === expectedChar) || 
                     (mappedChar === "'" && expectedChar === "׳") ||
                     (mappedChar === "׳" && expectedChar === "'");

    const nextInput = state.userInput + mappedChar;
    const finished = nextInput.length === state.targetText.length;
    
    const newTotalKeystrokes = state.totalKeystrokes + 1;
    const newErrors = isCorrect ? state.errors : state.errors + 1;
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
      lastTypedChar: mappedChar,
      lastStrokeCorrect: isCorrect
    });
  },

  reset: () => {
    const { currentExercise, category, difficulty } = get();
    get().setTarget(currentExercise, category, difficulty);
  },

  /** 🎯 Works with your CURRENT string[] data */
  nextLesson: () => {
    const { category, difficulty } = get();
    const lessons = exerciseTexts[category]?.[difficulty] || exerciseTexts.letters.beginner;
    const randomLesson = lessons[Math.floor(Math.random() * lessons.length)]!;
    get().setTarget(randomLesson, category, difficulty);
  },

  setCategory: (category) => {
    const lessons = exerciseTexts[category]?.[get().difficulty] || exerciseTexts.letters.beginner;
    get().setTarget(lessons[0], category, get().difficulty);
  },

  setDifficulty: (difficulty) => {
    const lessons = exerciseTexts[get().category]?.[difficulty] || exerciseTexts.letters.beginner;
    get().setTarget(lessons[0], get().category, difficulty);
  },
}));
