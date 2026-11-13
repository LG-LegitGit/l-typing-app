import type { Metadata } from "next";
import { hebrewKeyMap, LETTERS_TO_FINGERS } from "@/lib/data/keyboard-maps";
import { Breadcrumb, GuideJsonLd, MoreGuides, PracticeCta, guideMetadata } from "@/components/site/GuideParts";
import { GUIDES } from "@/lib/site";

const SLUG = "hebrew-keyboard-layout";
const guide = GUIDES.find((g) => g.slug === SLUG)!;
export const metadata: Metadata = guideMetadata(SLUG);

const ROWS = ["qwertyuiop", "asdfghjkl;", "zxcvbnm,."];

const FINGER_STYLE: Record<string, { label: string; cls: string }> = {
  "left-pinky": { label: "L pinky", cls: "border-rose-400/60 bg-rose-400/10" },
  "left-ring-finger": { label: "L ring", cls: "border-orange-400/60 bg-orange-400/10" },
  "left-middle-finger": { label: "L middle", cls: "border-amber-300/60 bg-amber-300/10" },
  "left-index-finger": { label: "L index", cls: "border-lime-400/60 bg-lime-400/10" },
  "right-index-finger": { label: "R index", cls: "border-emerald-400/60 bg-emerald-400/10" },
  "right-middle-finger": { label: "R middle", cls: "border-sky-400/60 bg-sky-400/10" },
  "right-ring-finger": { label: "R ring", cls: "border-indigo-400/60 bg-indigo-400/10" },
  "right-pinky": { label: "R pinky", cls: "border-fuchsia-400/60 bg-fuchsia-400/10" },
};

function fingerFor(heb: string) {
  const entry = Object.entries(LETTERS_TO_FINGERS).find(([chars]) => chars.includes(heb));
  return entry?.[1];
}

function KeyboardDiagram() {
  return (
    <figure className="my-10 overflow-x-auto">
      <div className="min-w-[620px] space-y-2 rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
        {ROWS.map((row, i) => (
          <div key={row} className="flex gap-2" style={{ paddingLeft: `${i * 22}px` }}>
            {row.split("").map((k) => {
              const heb = hebrewKeyMap[k];
              const finger = fingerFor(heb);
              const style = finger ? FINGER_STYLE[finger] : undefined;
              const home = i === 1 && "asdfjkl;".includes(k);
              return (
                <div
                  key={k}
                  className={`relative w-[54px] h-[58px] rounded-xl border ${style?.cls ?? "border-white/15"} flex flex-col items-center justify-center`}
                >
                  <span className="absolute top-1 left-2 text-[10px] font-mono uppercase text-white/50">{k}</span>
                  <span className="font-frank text-2xl font-bold text-white mt-2">{heb}</span>
                  {home && <span className="absolute bottom-1 w-3 h-0.5 rounded bg-white/50" />}
                </div>
              );
            })}
          </div>
        ))}
        <div className="flex justify-center pt-1">
          <div className="w-[300px] h-10 rounded-xl border border-white/15 flex items-center justify-center text-xs font-mono uppercase text-white/50">
            Space · thumbs
          </div>
        </div>
      </div>
      <figcaption className="mt-4 flex flex-wrap gap-2 text-xs">
        {Object.values(FINGER_STYLE).map((f) => (
          <span key={f.label} className={`px-2.5 py-1 rounded-lg border ${f.cls} text-white/80`}>
            {f.label}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

export default function Page() {
  return (
    <article className="prose-temple">
      <GuideJsonLd slug={SLUG} title={guide.title} description={guide.description} />
      <Breadcrumb title={guide.title} />

      <h1>Hebrew Keyboard Layout Guide</h1>
      <p className="lead">
        The standard Israeli Hebrew keyboard puts all 22 letters, plus the five final forms, on the
        same keys you already use for English. Here is where every letter lives and which finger
        types it.
      </p>

      <KeyboardDiagram />

      <p>
        Each key shows the English letter in the corner and the Hebrew letter it types in the middle.
        Colors show which finger is responsible. The small bars mark the home-row keys where your
        fingers rest: <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> <kbd>F</kbd> for the left hand and{" "}
        <kbd>J</kbd> <kbd>K</kbd> <kbd>L</kbd> <kbd>;</kbd> for the right.
      </p>

      <h2>The home row: your base camp</h2>
      <p>
        Touch typing starts from the middle row. In Hebrew, resting your fingers on the home row
        puts these letters under them:
      </p>
      <table>
        <thead>
          <tr>
            <th>English key</th>
            {"asdfghjkl;".split("").map((k) => (
              <th key={k} className="text-center">{k.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hebrew letter</td>
            {"asdfghjkl;".split("").map((k) => (
              <td key={k} className="text-center">
                <span className="he">{hebrewKeyMap[k]}</span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <p>
        That gives you <span className="he">ש ד ג כ</span> on the left hand,{" "}
        <span className="he">ח ל ך ף</span> on the right, and <span className="he">ע</span> and{" "}
        <span className="he">י</span> one stretch inward for each index finger. Common Biblical words like{" "}
        <span className="he">שלג</span> (snow), <span className="he">דבש</span> (honey) and{" "}
        <span className="he">חלב</span> (milk) need little more than this row.
      </p>

      <h2>The five final letters</h2>
      <p>
        Five Hebrew letters change shape at the end of a word. On the keyboard they are separate keys,
        so you have to learn both forms:
      </p>
      <table>
        <thead>
          <tr>
            <th>Letter</th>
            <th>Regular key</th>
            <th>Final form</th>
            <th>Final key</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Kaf", "כ", "f", "ך", "l"],
            ["Mem", "מ", "n", "ם", "o"],
            ["Nun", "נ", "b", "ן", "i"],
            ["Pe", "פ", "p", "ף", ";"],
            ["Tsadi", "צ", "m", "ץ", "."],
          ].map(([name, reg, rk, fin, fk]) => (
            <tr key={name}>
              <td>{name}</td>
              <td><span className="he">{reg}</span> <kbd>{rk.toUpperCase()}</kbd></td>
              <td><span className="he">{fin}</span></td>
              <td><kbd>{fk.toUpperCase()}</kbd></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Look-alike letters land on different keys</h2>
      <p>
        One quiet benefit of typing: letters that look alike on the page are far apart on the
        keyboard, so your fingers learn to tell them apart even when your eyes hesitate.
      </p>
      <ul>
        <li><span className="he">ב</span> (<kbd>C</kbd>) and <span className="he">כ</span> (<kbd>F</kbd>)</li>
        <li><span className="he">ד</span> (<kbd>S</kbd>) and <span className="he">ר</span> (<kbd>R</kbd>)</li>
        <li><span className="he">ה</span> (<kbd>V</kbd>), <span className="he">ח</span> (<kbd>J</kbd>) and <span className="he">ת</span> (<kbd>,</kbd>)</li>
        <li><span className="he">ו</span> (<kbd>U</kbd>), <span className="he">ז</span> (<kbd>Z</kbd>) and <span className="he">ן</span> (<kbd>I</kbd>)</li>
        <li><span className="he">ס</span> (<kbd>X</kbd>) and <span className="he">ם</span> (<kbd>O</kbd>)</li>
      </ul>

      <h2>A simple order for learning</h2>
      <ol>
        <li><strong>Home row first.</strong> Type <span className="he">שדגכ עיחל</span> until you stop looking down.</li>
        <li><strong>Top row next.</strong> <span className="he">ק ר א ט ו ן ם פ</span> — many very common letters live here.</li>
        <li><strong>Bottom row.</strong> <span className="he">ז ס ב ה נ מ צ ת ץ</span>.</li>
        <li><strong>Real words, then real verses.</strong> Words and verses train the letter combinations you will actually read.</li>
      </ol>
      <p>
        That is exactly the path the LamediYah lessons follow: Letters, then Roots, then Verses and
        Prayers, each at beginner, intermediate and advanced levels.
      </p>

      <div className="callout">
        <p style={{ margin: 0 }}>
          <strong>You don&apos;t need to change your computer&apos;s keyboard to practice.</strong>{" "}
          LamediYah turns your normal English keystrokes into Hebrew letters on screen. When you are
          ready to type Hebrew everywhere, see{" "}
          <a href="/guides/type-hebrew-on-windows-mac">how to add Hebrew to Windows or Mac</a>; the
          layout is the same one you practiced.
        </p>
      </div>

      <PracticeCta text="Practice the home row" />
      <MoreGuides current={SLUG} />
    </article>
  );
}
