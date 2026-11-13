import type { Metadata } from "next";
import { Breadcrumb, GuideJsonLd, MoreGuides, PracticeCta, guideMetadata } from "@/components/site/GuideParts";
import { GUIDES } from "@/lib/site";

const SLUG = "biblical-hebrew-typing";
const guide = GUIDES.find((g) => g.slug === SLUG)!;
export const metadata: Metadata = guideMetadata(SLUG);

const ROOTS: [string, string, string][] = [
  ["ברא", "create", "בָּרָא — he created (Genesis 1:1)"],
  ["קדש", "holy, set apart", "קָדוֹשׁ, קְדֻשָּׁה, מִקְדָּשׁ"],
  ["אהב", "love", "אַהֲבָה, וְאָהַבְתָּ"],
  ["שמע", "hear, listen", "שְׁמַע יִשְׂרָאֵל"],
  ["דבר", "speak, word", "דָּבָר, דִּבֵּר, מִדְבָּר"],
  ["שלם", "whole, peace", "שָׁלוֹם, שָׁלֵם"],
];

export default function Page() {
  return (
    <article className="prose-temple">
      <GuideJsonLd slug={SLUG} title={guide.title} description={guide.description} />
      <Breadcrumb title={guide.title} />

      <h1>Typing Biblical Hebrew</h1>
      <p className="lead">
        Most Biblical Hebrew students learn to read the letters but never learn to type them. That
        makes every search, flashcard and vocabulary list slower than it needs to be. Here is why typing
        helps, and how to practice with the language of the Tanakh itself.
      </p>

      <h2>Why typing helps you read</h2>
      <ul>
        <li>
          <strong>Active recall.</strong> To type a letter you must produce it, not just recognize it.
          That strengthens memory far more than reading alone.
        </li>
        <li>
          <strong>Look-alike letters separate.</strong> <span className="he">ב / כ</span>,{" "}
          <span className="he">ד / ר</span> and <span className="he">ה / ח / ת</span> sit on different keys,
          so your hands learn to tell them apart.
        </li>
        <li>
          <strong>Roots become patterns.</strong> Typing the same three consonants again and again inside
          different words trains you to spot the root at a glance.
        </li>
        <li>
          <strong>Study tools open up.</strong> Concordances, lexicons and Bible software all let you
          search in Hebrew, once you can type it.
        </li>
      </ul>

      <h2>Consonants first, like the scroll</h2>
      <p>
        Hebrew is written with 22 consonants. The vowel points (niqqud) were added centuries later to
        preserve pronunciation, and Torah scrolls are still written without them. LamediYah&apos;s lessons
        start the same way, with the consonantal text, so you build letter fluency before adding
        vowels.
      </p>
      <p>
        Five letters take a different shape at the end of a word: <span className="he">ך ם ן ף ץ</span>.
        You will meet them constantly in Biblical text, from <span className="he">שמים</span> (heavens) to{" "}
        <span className="he">ארץ</span> (earth), so the advanced lessons drill them on purpose.
      </p>

      <h2>The three-letter root system</h2>
      <p>
        Most Hebrew words grow from a root of three consonants. Learn the root and you can guess the
        meaning of dozens of words built on it. A few roots you will type in the Roots lessons:
      </p>
      <table>
        <thead>
          <tr>
            <th>Root</th>
            <th>Core idea</th>
            <th>Words you&apos;ll see</th>
          </tr>
        </thead>
        <tbody>
          {ROOTS.map(([root, idea, words]) => (
            <tr key={root}>
              <td><span className="he">{root}</span></td>
              <td>{idea}</td>
              <td><span className="he" style={{ fontSize: "1.05em" }}>{words}</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Practice with real verses</h2>
      <p>
        Once the letters feel natural, typing whole verses is the best practice there is. You are
        reading, spelling and memorizing at the same time. The Verses and Prayers lessons include
        passages such as:
      </p>
      <ul>
        <li><span className="he">בראשית ברא אלהים</span> — &ldquo;In the beginning God created…&rdquo; (Genesis 1:1)</li>
        <li><span className="he">שמע ישראל יהוה אלהינו יהוה אחד</span> — the Shema (Deuteronomy 6:4)</li>
        <li><span className="he">יהוה רעי לא אחסר</span> — &ldquo;The LORD is my shepherd; I shall not want&rdquo; (Psalm 23:1)</li>
      </ul>
      <p>
        Many exercises show their English translation and source as you type, so each practice
        session is also a little Bible study.
      </p>

      <h2>A weekly routine for students</h2>
      <ol>
        <li><strong>5 minutes</strong> of Letters to warm up your hands.</li>
        <li><strong>5 minutes</strong> of Roots, using the roots from this week&apos;s vocabulary.</li>
        <li><strong>5 minutes</strong> of Verses. Type your reading passage before you translate it.</li>
      </ol>
      <p>
        Fifteen minutes a day is enough. Accuracy matters more than speed; aim for 95% before you move
        up a level.
      </p>

      <div className="callout">
        <p style={{ margin: 0 }}>
          <strong>Coming soon: niqqud lessons.</strong> Vowel-point typing is on the LamediYah
          roadmap. Have a verse or prayer you would like to see added?{" "}
          <a href="/about#contact">Send a suggestion</a>.
        </p>
      </div>

      <PracticeCta text="Type your first verse" />
      <MoreGuides current={SLUG} />
    </article>
  );
}
