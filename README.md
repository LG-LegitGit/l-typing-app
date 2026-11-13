# 🏛️ LamediYah Teaches Typing (ל)

<div align="center">
  <img src="./public/assets/Screenshot.png" width="900" alt="LamediYah Teaches Typing: Hebrew lesson with on-screen Hebrew keyboard" />

  **Learn Hebrew touch typing on the keyboard you already have.**
  <br>
  English Hand · Hebrew Soul

  **[lamediyah.app](https://lamediyah.app)** · [Guides](https://lamediyah.app/guides) · [About](https://lamediyah.app/about)
</div>

---

## What it is

LamediYah is a free, open-source Hebrew touch typing trainer for English speakers, especially students of **Biblical Hebrew**. You practice on the standard Israeli Hebrew layout, with an on-screen keyboard that shows both the English key and the Hebrew letter, so you don't need stickers or a special keyboard.

Instead of random drills, you type real Hebrew: letters, three-letter **roots**, **Tanakh verses** and **prayers**, with the meaning of each one shown as you practice.

## Features

- **Four categories:** Letters · Roots (שורשים) · Verses (פסוקים) · Prayers (תפילות)
- **Three levels:** Beginner (home row ש ד ג כ ע י ח ל) · Intermediate (full alphabet) · Advanced (final letters ך ם ן ף ץ)
- **Dual key hints:** each letter shows its English key, so you can type with no layout stickers
- **Virtual keyboard:** highlights the next key as you type
- **Live stats:** words per minute and accuracy as you type
- **Step-by-step progress:** score 95% or better to move on to the next exercise, otherwise practice it again
- **Wisdom reveal:** every exercise shows its translation and meaning, with a **Deeper Meaning** view
- **Sound feedback:** subtle audio cues (Web Audio API)
- **Distraction-free:** one screen, no scrolling, the interface fades while you type
- **Guides:** [Hebrew keyboard layout](https://lamediyah.app/guides/hebrew-keyboard-layout), [typing Hebrew on Windows and Mac](https://lamediyah.app/guides/type-hebrew-on-windows-mac), [typing Biblical Hebrew](https://lamediyah.app/guides/biblical-hebrew-typing)

> **Note:** LamediYah needs a physical keyboard. On phones and tablets it shows a notice with a link to open it on a computer.

## Quick start

Requirements: **Node.js 20+** and **pnpm**.

```bash
git clone https://github.com/LG-LegitGit/l-typing-app.git
cd l-typing-app
pnpm install
pnpm dev          # http://localhost:3000
```

Other scripts:

```bash
pnpm build        # production build
pnpm start        # serve the production build
pnpm lint         # ESLint
pnpm check:wisdom # every exercise has a translation (Node 22.6+)
```

### Environment variables (optional)

Copy `.env.example` to `.env.local`. Everything works without it, except the contact form on `/about`.

| Variable | Used for |
|---|---|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Contact form via [Web3Forms](https://web3forms.com). Without it, the form shows a "being set up" message. |

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui (Radix) |
| State | Zustand |
| Animation | Framer Motion |
| Audio | Web Audio API |
| Fonts | Frank Ruhl Libre (Hebrew), Geist |
| Hosting | Vercel |

## Project structure

```
app/
├── page.tsx               # the typing app (single screen)
├── layout.tsx             # site metadata, Open Graph, JSON-LD
├── (content)/             # about + guides pages, shared layout
├── robots.ts, sitemap.ts, manifest.ts
components/
├── core/                  # TypingEngine, WordDisplay, VirtualKeyboard,
│                          # LessonSelector, LiveStats, SoundEngine, WelcomeRitual
├── site/                  # ContactForm, GuideParts, MobileNotice
└── ui/                    # shadcn/ui primitives
lib/
├── data/                  # exercises, alphabet, keyboard maps, phonetics, wisdom
└── site.ts                # site-wide SEO values (URL, title, guides list)
store/useTypingStore.ts    # Zustand store: lesson, progress, stats
```

**Adding practice content:** exercises live in `lib/data/exercises.ts` (organized by category and level). Every exercise needs a matching entry in `lib/data/wisdom.ts`, keyed by its exact text; run `pnpm check:wisdom` to confirm none are missing (Node 22.6+).

## Roadmap

- [ ] Niqqud (vowel points) lessons
- [ ] Custom lesson creator
- [ ] Progress export (JSON/CSV)
- [ ] PWA offline mode
- [ ] macOS/iOS viewport fixes

## Contributing

Contributions are welcome: bug fixes, new exercises, corrections to Hebrew text or translations, and accessibility improvements.

1. Fork the repo and create a branch: `git checkout -b feat/your-change`
2. `pnpm install` and `pnpm dev`
3. Make your change. Before opening a PR, run `pnpm build`, `pnpm lint` and `pnpm check:wisdom`.
4. Use clear commit messages (for example `feat: add niqqud lesson 1` or `fix: correct home row hint`)
5. Open a pull request against `main`. For UI changes, include a screenshot.

Found a mistake in a verse, root or translation? Open an issue with the reference (for example, Genesis 1:1) and the correction.

## License

The code is released under the [MIT License](./LICENSE) © 2026 LamediYah.

**Trademark:** the name "LamediYah", the ל (lamed) logo and related branding are not covered by the MIT License. You're welcome to fork and build on the code, but please give your version its own name and logo, and don't present it as the official LamediYah app.

Biblical and liturgical Hebrew texts used in the exercises are in the public domain.

---

<div align="center">
  <img src="./public/assets/lamed.png" width="120" alt="LamediYah lamed logo" />
  <br><br>
  <sub>English Hand · Hebrew Soul · <a href="https://lamediyah.com">lamediyah.com</a></sub>
</div>
