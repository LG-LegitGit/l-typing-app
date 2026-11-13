// lib/site.ts
// Single source of truth for site-wide SEO values.

export const SITE = {
  url: "https://lamediyah.app",
  name: "LamediYah Teaches Typing",
  shortName: "LamediYah",
  title: "Learn Hebrew Touch Typing – LamediYah",
  description:
    "Free Hebrew touch typing practice for English speakers. Learn the Hebrew keyboard with letters, roots, Tanakh verses and prayers. Great for Biblical Hebrew students. No layout changes needed.",
  keywords: [
    "Hebrew typing",
    "Hebrew touch typing",
    "learn Hebrew keyboard",
    "Hebrew typing practice",
    "Biblical Hebrew typing",
    "type Hebrew on English keyboard",
    "Hebrew keyboard layout",
    "Hebrew typing tutor",
    "Hebrew roots",
    "Tanakh",
  ],
  ogImage: "/og-image.jpg",
  creator: {
    name: "LamediYah",
    url: "https://lamediyah.com",
  },
} as const;

export const GUIDES = [
  {
    slug: "hebrew-keyboard-layout",
    title: "Hebrew Keyboard Layout Guide",
    description:
      "Where every Hebrew letter lives on a standard keyboard, which finger types it, and how to memorize the layout fast.",
  },
  {
    slug: "type-hebrew-on-windows-mac",
    title: "How to Type Hebrew on Windows and Mac",
    description:
      "Add the Hebrew keyboard to Windows 11 or macOS, switch languages with a shortcut, and pick the layout that matches what you practice.",
  },
  {
    slug: "biblical-hebrew-typing",
    title: "Typing Biblical Hebrew",
    description:
      "Why touch typing helps Biblical Hebrew students, how roots and final letters work, and how to practice with real Tanakh verses.",
  },
  {
    slug: "hebrew-numbers",
    title: "Hebrew Numbers and Numerals",
    description:
      "How Hebrew letters work as numbers, how to read references like תהילים כג:א, and the Biblical number words from one to a thousand.",
  },
] as const;
