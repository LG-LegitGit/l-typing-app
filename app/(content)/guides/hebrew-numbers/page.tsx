import type { Metadata } from "next";
import { Breadcrumb, GuideJsonLd, MoreGuides, PracticeCta, guideMetadata } from "@/components/site/GuideParts";
import { GUIDES } from "@/lib/site";

const SLUG = "hebrew-numbers";
const guide = GUIDES.find((g) => g.slug === SLUG)!;
export const metadata: Metadata = guideMetadata(SLUG);

// Standard letter values (the final forms ך ם ן ף ץ normally share their letter's value)
const NUMERALS: [string, string, number][] = [
  ["א", "Alef", 1], ["ב", "Bet", 2], ["ג", "Gimel", 3], ["ד", "Dalet", 4], ["ה", "He", 5],
  ["ו", "Vav", 6], ["ז", "Zayin", 7], ["ח", "Chet", 8], ["ט", "Tet", 9], ["י", "Yod", 10],
  ["כ", "Kaf", 20], ["ל", "Lamed", 30], ["מ", "Mem", 40], ["נ", "Nun", 50], ["ס", "Samekh", 60],
  ["ע", "Ayin", 70], ["פ", "Pe", 80], ["צ", "Tsadi", 90], ["ק", "Qof", 100], ["ר", "Resh", 200],
  ["ש", "Shin", 300], ["ת", "Tav", 400],
];

// Biblical (defective) spelling; with masculine nouns 3–10 take the form ending in ה
const NUMBER_WORDS: [number, string, string][] = [
  [1, "אחד", "אחת"],
  [2, "שנים", "שתים"],
  [3, "שלשה", "שלש"],
  [4, "ארבעה", "ארבע"],
  [5, "חמשה", "חמש"],
  [6, "ששה", "שש"],
  [7, "שבעה", "שבע"],
  [8, "שמנה", "שמנה"],
  [9, "תשעה", "תשע"],
  [10, "עשרה", "עשר"],
];

const TENS: [number, string][] = [
  [20, "עשרים"], [30, "שלשים"], [40, "ארבעים"], [50, "חמשים"], [60, "ששים"],
  [70, "שבעים"], [80, "שמנים"], [90, "תשעים"], [100, "מאה"], [200, "מאתים"], [1000, "אלף"],
];

function NumeralGrid() {
  return (
    <figure className="my-10">
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2" dir="rtl">
        {NUMERALS.map(([letter, name, value]) => (
          <div
            key={letter}
            className="rounded-xl border border-white/10 bg-black/30 p-3 text-center"
          >
            <span className="block font-frank text-3xl font-bold text-white">{letter}</span>
            <span className="block mt-1 font-mono text-lg text-amber-300">{value}</span>
            <span className="block text-[10px] font-mono uppercase tracking-wider text-white/40">{name}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-sm text-white/50">
        Ones, tens and hundreds: every letter of the alef-bet has a number value.
      </figcaption>
    </figure>
  );
}

export default function Page() {
  return (
    <article className="prose-temple">
      <GuideJsonLd slug={SLUG} title={guide.title} description={guide.description} />
      <Breadcrumb title={guide.title} />

      <h1>Hebrew Numbers and Numerals</h1>
      <p className="lead">
        Hebrew writes numbers two ways: with letters, the way Hebrew Bibles number chapters and
        verses, and with number words like <span className="he">שבעה</span> (seven) inside the text
        itself. Here is how to read both.
      </p>

      <h2>Every letter is also a number</h2>
      <p>
        Before Arabic digits, Hebrew used its own alphabet for numbers. The first nine letters are
        the ones, the next nine are the tens, and the last four are the hundreds:
      </p>

      <NumeralGrid />

      <p>
        The five final letters (<span className="he">ך ם ן ף ץ</span>) usually keep the same value
        as their regular forms, so <span className="he">ך</span> is 20 just like{" "}
        <span className="he">כ</span>. (Some later systems give them the values 500 to 900, but you
        won&apos;t need that to read Bible references.)
      </p>

      <h2>Building bigger numbers</h2>
      <p>
        Numbers are written from the largest value to the smallest, right to left, and the values are
        simply added together:
      </p>
      <table>
        <thead>
          <tr>
            <th>Hebrew</th>
            <th>Sum</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["יא", "10 + 1", "11"],
            ["כג", "20 + 3", "23"],
            ["מ", "40", "40"],
            ["קה", "100 + 5", "105"],
            ["קיט", "100 + 10 + 9", "119"],
            ["קעו", "100 + 70 + 6", "176"],
          ].map(([he, sum, n]) => (
            <tr key={he}>
              <td><span className="he">{he}</span></td>
              <td>{sum}</td>
              <td>{n}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="callout">
        <p style={{ margin: 0 }}>
          <strong>15 and 16 are special.</strong> Written the usual way, 15 (
          <span className="he">יה</span>) and 16 (<span className="he">יו</span>) would spell
          letters of the divine name. Instead they are written <span className="he">טו</span>{" "}
          (9 + 6) and <span className="he">טז</span> (9 + 7).
        </p>
      </div>

      <h2>Reading chapter and verse references</h2>
      <p>
        Hebrew Bibles and commentaries number chapters and verses with letters. A reference is
        book, then chapter, then verse:
      </p>
      <ul>
        <li><span className="he">תהילים כג:א</span> = Psalm 23:1, “The LORD is my shepherd”</li>
        <li><span className="he">בראשית יב:א</span> = Genesis 12:1, God&apos;s call to Abram</li>
        <li><span className="he">תהילים קיט:קה</span> = Psalm 119:105, “Thy word is a lamp unto my feet”</li>
      </ul>
      <p>
        Every verse in the LamediYah app shows its Hebrew reference in this form. Watch for one
        difference: in many psalms the Hebrew counts the title as verse 1, so the Hebrew verse number
        can be one higher than in English Bibles. “It is a good thing to give thanks unto the LORD” is
        Psalm 92:1 in English but <span className="he">תהילים צב:ב</span> in Hebrew.
      </p>

      <h3>Geresh and gershayim</h3>
      <p>
        Outside of chapter-and-verse references, a mark shows that letters are being used as a number.
        A single letter takes a <strong>geresh</strong> (<span className="he">א׳</span> = 1), and
        longer numbers take <strong>gershayim</strong> before the last letter (
        <span className="he">קכ״א</span> = 121). You&apos;ll see this on Hebrew calendar dates: the
        year 5787 is written <span className="he">תשפ״ז</span> (400 + 300 + 80 + 7, with the
        thousands left off).
      </p>

      <h2>Number words in the Bible</h2>
      <p>
        Inside the text itself, Biblical Hebrew spells numbers out as words. From three to ten there is
        a famous twist: the form ending in <span className="he">ה</span> goes with{" "}
        <em>masculine</em> nouns, and the shorter form goes with <em>feminine</em> ones, the opposite
        of what you might expect.
      </p>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>With masculine nouns</th>
            <th>With feminine nouns</th>
          </tr>
        </thead>
        <tbody>
          {NUMBER_WORDS.map(([n, masc, fem]) => (
            <tr key={n}>
              <td>{n}</td>
              <td><span className="he">{masc}</span></td>
              <td><span className="he">{fem}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        These are the Biblical spellings. Modern Hebrew often adds a <span className="he">ו</span>,
        writing <span className="he">שלושה</span> and <span className="he">שמונה</span>.
      </p>

      <h3>Tens, hundreds and a thousand</h3>
      <table>
        <tbody>
          {TENS.map(([n, word]) => (
            <tr key={n}>
              <td>{n}</td>
              <td><span className="he">{word}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Most tens are just the plural of the ones: <span className="he">שלש</span> (three) becomes{" "}
        <span className="he">שלשים</span> (thirty). Twenty is the exception, the plural of{" "}
        <span className="he">עשר</span> (ten).
      </p>

      <h3>Numbers you already know</h3>
      <ul>
        <li><span className="he">יום אחד</span> “one day” (Genesis 1:5)</li>
        <li><span className="he">ארבעים יום וארבעים לילה</span> “forty days and forty nights” (Genesis 7:4)</li>
        <li><span className="he">שבטי ישראל שנים עשר</span> “the twelve tribes of Israel” (Genesis 49:28)</li>
        <li><span className="he">עשרת הדברים</span> “the ten commandments,” literally “the ten words” (Deuteronomy 4:13)</li>
      </ul>

      <h2>Typing numbers in Hebrew</h2>
      <p>
        Digits are the easy part: on a Hebrew keyboard the number keys type the same 0 to 9 as in
        English, and they read left to right even inside a right-to-left line. To type a Hebrew
        numeral, you type its letters. For the geresh, most people use an ordinary apostrophe, which
        on the Hebrew layout sits on the <kbd>W</kbd> key, and a double quote mark for gershayim.
      </p>

      <div className="callout">
        <p style={{ margin: 0 }}>
          <strong>Practice tip:</strong> every letter you learn in the{" "}
          <a href="/guides/hebrew-keyboard-layout">Hebrew keyboard layout</a> is also a number. Once
          the alef-bet is under your fingers, reading <span className="he">כג:א</span> becomes as
          quick as reading 23:1.
        </p>
      </div>

      <PracticeCta text="Practice the alef-bet" />
      <MoreGuides current={SLUG} />
    </article>
  );
}
