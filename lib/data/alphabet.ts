export interface HebrewLetter {
  letter: string;
  name: string;
  phonetic: string;
  description: string;
  finalForm?: string;
}

export const hebrewAlphabet: HebrewLetter[] = [
  { letter: "א", name: "Alef", phonetic: "ʔ", description: "Glottal stop; often silent" },
  { letter: "ב", name: "Bet", phonetic: "b/v", description: "'b' as in 'boy' (with dagesh), 'v' as in 'vet' (without dagesh)" },
  { letter: "ג", name: "Gimel", phonetic: "g", description: "'g' as in 'go'" },
  { letter: "ד", name: "Dalet", phonetic: "d", description: "'d' as in 'door'" },
  { letter: "ה", name: "Hey", phonetic: "h", description: "'h' as in 'hat'" },
  { letter: "ו", name: "Vav", phonetic: "v/w", description: "'v' as in 'vet' or vowel marker (like 'oo' or 'o')" },
  { letter: "ז", name: "Zayin", phonetic: "z", description: "'z' as in 'zebra'" },
  { letter: "ח", name: "Chet", phonetic: "χ", description: "A guttural 'ch' as in 'Bach' or Scottish 'loch'" },
  { letter: "ט", name: "Tet", phonetic: "t", description: "Emphatic 't', similar to 't' in 'top'" },
  { letter: "י", name: "Yod", phonetic: "y/i", description: "'y' as in 'yes', or vowel marker like 'ee'" },
  { letter: "כ", name: "Kaf", phonetic: "k/χ", description: "'k' as in 'kite' (with dagesh), or guttural 'ch' (without)", finalForm: "ך" },
  { letter: "ל", name: "Lamed", phonetic: "l", description: "'l' as in 'lamp'" },
  { letter: "מ", name: "Mem", phonetic: "m", description: "'m' as in 'mother'", finalForm: "ם" },
  { letter: "נ", name: "Nun", phonetic: "n", description: "'n' as in 'nice'", finalForm: "ן" },
  { letter: "ס", name: "Samekh", phonetic: "s", description: "'s' as in 'sun'" },
  { letter: "ע", name: "Ayin", phonetic: "ʕ", description: "Voiced pharyngeal; often silent in modern Hebrew" },
  { letter: "פ", name: "Pe", phonetic: "p/f", description: "'p' as in 'pen' (with dagesh), 'f' as in 'fun' (without)", finalForm: "ף" },
  { letter: "צ", name: "Tsadi", phonetic: "ts", description: "'ts' as in 'cats'", finalForm: "ץ" },
  { letter: "ק", name: "Qof", phonetic: "k", description: "Hard 'k' sound; deeper in throat" },
  { letter: "ר", name: "Resh", phonetic: "ʁ/r", description: "'r' as in French/German, uvular or trilled" },
  { letter: "ש", name: "Shin", phonetic: "ʃ/s", description: "'sh' as in 'shoe' (dot right), or 's' (dot left)" },
  { letter: "ת", name: "Tav", phonetic: "t", description: "'t' as in 'top'" }
];
