export interface PhoneticExample {
  letter: string;
  withDagesh?: string;
  without?: string;
  description?: string;
}

export interface HebrewPhoneticRule {
  topic: string;
  rule: string;
  examples: PhoneticExample[];
}

export const hebrewPhonetics: HebrewPhoneticRule[] = [
  {
    topic: "Dagesh (דָּגֵשׁ)",
    rule: "A dot (dagesh) inside certain letters hardens their pronunciation. Without it, the letter may become softer or even fricative.",
    examples: [
      { letter: "ב", withDagesh: "b", without: "v", description: "בּ = 'b', ב = 'v'" },
      { letter: "כ", withDagesh: "k", without: "kh", description: "כּ = 'k', כ = 'kh'" },
      { letter: "פ", withDagesh: "p", without: "f", description: "פּ = 'p', פ = 'f'" },
    ],
  },
  {
    topic: "Shin & Sin",
    rule: "The letter שׁ can be pronounced as 'sh' or 's', depending on where the dot is placed.",
    examples: [
      { letter: "ש", withDagesh: "sh", without: "s", description: "שׁ = 'sh', שׂ = 's'" },
    ],
  },
  {
    topic: "Silent Letters",
    rule: "Some letters are historically consonants but are often silent in modern Hebrew.",
    examples: [
      { letter: "א", withDagesh: "ʔ", without: "silent", description: "Alef — usually silent or glottal stop" },
      { letter: "ע", withDagesh: "ʕ", without: "silent", description: "Ayin — silent or voiced pharyngeal" },
    ],
  },
  {
    topic: "Guttural Letters",
    rule: "Certain letters are pronounced from the throat and may affect vowels around them.",
    examples: [
      { letter: "ח", withDagesh: "kh", description: "Chet — pronounced like 'ch' in 'Bach'" },
      { letter: "ע", withDagesh: "ʕ", description: "Ayin — voiced pharyngeal or silent" },
      { letter: "ה", withDagesh: "h", description: "Hey — soft 'h' sound" },
    ],
  },
  {
    topic: "Final Forms",
    rule: "Five Hebrew letters have a special form when they appear at the end of a word.",
    examples: [
      { letter: "כ", withDagesh: "כ", without: "ך", description: "Final Kaf: ך" },
      { letter: "מ", withDagesh: "מ", without: "ם", description: "Final Mem: ם" },
      { letter: "נ", withDagesh: "נ", without: "ן", description: "Final Nun: ן" },
      { letter: "פ", withDagesh: "פ", without: "ף", description: "Final Pe: ף" },
      { letter: "צ", withDagesh: "צ", without: "ץ", description: "Final Tsadi: ץ" },
    ],
  },
];
