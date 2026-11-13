import type { Metadata } from "next";
import { Breadcrumb, GuideJsonLd, MoreGuides, PracticeCta, guideMetadata } from "@/components/site/GuideParts";
import { GUIDES } from "@/lib/site";

const SLUG = "type-hebrew-on-windows-mac";
const guide = GUIDES.find((g) => g.slug === SLUG)!;
export const metadata: Metadata = guideMetadata(SLUG);

export default function Page() {
  return (
    <article className="prose-temple">
      <GuideJsonLd slug={SLUG} title={guide.title} description={guide.description} />
      <Breadcrumb title={guide.title} />

      <h1>How to Type Hebrew on Windows and Mac</h1>
      <p className="lead">
        Your computer already knows Hebrew. You just need to add the Hebrew keyboard once, then
        switch between English and Hebrew with a shortcut. No stickers or special hardware required.
      </p>

      <div className="callout">
        <p style={{ margin: 0 }}>
          <strong>Practicing in LamediYah?</strong> You can skip this setup. The app turns your English
          keystrokes into Hebrew on its own. Come back here when you want to type Hebrew in emails,
          documents, or Bible software.
        </p>
      </div>

      <h2>Windows 11</h2>
      <ol>
        <li>Open <strong>Settings</strong> → <strong>Time &amp; language</strong> → <strong>Language &amp; region</strong>.</li>
        <li>Next to <em>Preferred languages</em>, choose <strong>Add a language</strong>.</li>
        <li>Search for <strong>Hebrew</strong>, select it, and choose <strong>Next</strong>.</li>
        <li>
          You only need the keyboard, so you can uncheck the display-language pack. Choose{" "}
          <strong>Install</strong>.
        </li>
        <li>
          Switch between keyboards with <kbd>Windows</kbd> + <kbd>Space</kbd>. Many setups also accept{" "}
          <kbd>Alt</kbd> + <kbd>Shift</kbd>. The taskbar shows <strong>ENG</strong> or <strong>HEB</strong>.
        </li>
      </ol>
      <h3>Which Windows layout?</h3>
      <p>
        The default <strong>Hebrew</strong> keyboard puts the letters exactly where you practice them
        in LamediYah. Recent versions of Windows also offer <strong>Hebrew (Standard)</strong>, which
        keeps the same letters and adds vowel points (niqqud) through the right <kbd>Alt</kbd> key.
        To add it, open Hebrew&apos;s <strong>Language options</strong> and choose{" "}
        <strong>Add a keyboard</strong>.
      </p>

      <h2>macOS</h2>
      <ol>
        <li>Open <strong>System Settings</strong> → <strong>Keyboard</strong>.</li>
        <li>Under <em>Text Input</em>, next to <em>Input Sources</em>, choose <strong>Edit…</strong>.</li>
        <li>Choose <strong>+</strong> at the bottom left, then select <strong>Hebrew</strong> in the list.</li>
        <li>
          Pick <strong>Hebrew – PC</strong> and choose <strong>Add</strong>. It matches the standard
          Israeli layout that LamediYah teaches. Apple&apos;s plain <strong>Hebrew</strong> layout moves some
          punctuation keys.
        </li>
        <li>
          Switch with <kbd>Control</kbd> + <kbd>Space</kbd> or the <kbd>🌐 Globe</kbd> key. Turn on{" "}
          <em>Show Input menu in menu bar</em> to see which keyboard is active.
        </li>
      </ol>

      <h2>Phones and tablets</h2>
      <ul>
        <li>
          <strong>iPhone / iPad:</strong> Settings → General → Keyboard → Keyboards → Add New Keyboard → Hebrew.
          Tap the globe key to switch.
        </li>
        <li>
          <strong>Android (Gboard):</strong> Gboard settings → Languages → Add keyboard → Hebrew.
          Hold or tap the globe/space key to switch.
        </li>
      </ul>
      <p>
        Phone keyboards follow the same letter order, but touch typing is a physical-keyboard skill. If
        you study on a tablet, a Bluetooth keyboard lets you practice the real thing.
      </p>

      <h2>Typing right-to-left: what to expect</h2>
      <ul>
        <li>Most apps flip the text direction automatically when you start typing Hebrew.</li>
        <li>
          Mixing English and Hebrew on one line can make the cursor and punctuation jump around. That is
          normal bidirectional text behavior, not a mistake on your part.
        </li>
        <li>
          In Word and Google Docs, use the right-to-left paragraph button if a Hebrew paragraph lines up
          on the wrong side.
        </li>
      </ul>

      <h2>Why learn the layout instead of using an on-screen keyboard?</h2>
      <p>
        Clicking letters on a virtual keyboard works for a word or two. If you study Biblical Hebrew,
        though, you will search concordances, write vocabulary lists, and look up roots constantly.
        Knowing the layout by touch turns every one of those lookups from a hunt into a reflex.
      </p>

      <PracticeCta text="Learn the layout by touch" />
      <MoreGuides current={SLUG} />
    </article>
  );
}
