// lib/data/exerciseMetadata.ts
// Sacred Wisdom Database - Contextual meaning for LamediYah exercises

export interface ExerciseWisdom {
  /** English translation of the Hebrew phrase */
  translation: string;
  /** Spiritual/cultural significance and source */
  wisdom: string;
  /** Optional: Hebrew source reference */
  source?: string;
  /** Optional: Audio pronunciation file */
  audio?: string;
}

export const exerciseMetadata: Record<string, ExerciseWisdom> = {
  // 🕎 PSALMS
  'יהוה רעי לא אחסר.': {
    translation: "The Lord is my shepherd; I shall not want.",
    wisdom: "Psalm 23:1 — Declaration of absolute trust in divine provision.",
    source: "תהילים כג:א"
  },

  // 📜 THE SHEMA
  'שמע ישראל יהוה אלהינו יהוה אחד.': {
    translation: "Hear, O Israel: The Lord our God, the Lord is one.",
    wisdom: "Deuteronomy 6:4 — Central declaration of Jewish faith, recited twice daily.",
    source: "דברים ו:ד"
  },

  // 🌌 GENESIS
  'בראשית ברא אלהים': {
    translation: "In the beginning God created...",
    wisdom: "Genesis 1:1 — Foundation of existence, first words of Torah.",
    source: "בראשית א:א"
  },

  // 🕍 BRACHOT (Blessings)
  'ברוך אתה יהוה אלהינו מלך העולם.': {
    translation: "Blessed are You, Lord our God, King of the universe.",
    wisdom: "Traditional opening of all Jewish blessings — acknowledges divine sovereignty.",
    source: "ברכות תמידיות"
  },

  // 🙏 MODEH ANI
  'מודה אני לפניך מלך חי וקיים.': {
    translation: "I thank You, living and eternal King...",
    wisdom: "Morning prayer of gratitude — first words spoken upon waking.",
    source: "תפילת מודה אני"
  },

  // 🌅 CREATION
  'יהי אור ויהי אור.': {
    translation: "Let there be light, and there was light.",
    wisdom: "Genesis 1:3 — God's first creative command, separating light from darkness.",
    source: "בראשית א:ג"
  },

  // 🛡️ PROTECTION
  'אור זרע לצדיק.': {
    translation: "Light sown for the righteous.",
    wisdom: "Psalm 97:11 — Divine light as reward for the just.",
    source: "תהילים צז:יא"
  },

  // 🎵 PRAISE
  'טוב להודות ליהוה.': {
    translation: "It is good to give thanks to the Lord.",
    wisdom: "Psalm 92:2 — Gratitude as foundation of worship.",
    source: "תהילים צב:ב"
  }
} as const;

// 🧠 Type-safe lookup helper
export const getExerciseWisdom = (exercise: string): ExerciseWisdom | undefined => {
  return exerciseMetadata[exercise as keyof typeof exerciseMetadata];
};

// 📊 Metadata stats (for debugging/development)
export const wisdomCount = Object.keys(exerciseMetadata).length;
export const wisdomKeys = Object.keys(exerciseMetadata) as (keyof typeof exerciseMetadata)[];
