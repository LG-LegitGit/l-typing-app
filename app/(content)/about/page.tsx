import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { ContactForm } from "@/components/site/ContactForm";
import { PracticeCta } from "@/components/site/GuideParts";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why LamediYah Teaches Typing exists: a free Hebrew touch typing app made by the artist LamediYah for English speakers and Biblical Hebrew students.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: `${SITE.url}/about`,
    title: `About | ${SITE.shortName}`,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
};

// ✍️ DRAFT COPY — edit freely; written in LamediYah's first-person voice.
export default function AboutPage() {
  return (
    <div className="prose-temple">
      <h1>About LamediYah Teaches Typing</h1>
      <p className="lead">
        A free Hebrew touch typing app for English speakers, especially anyone studying Biblical
        Hebrew.
      </p>

      <h2>Why I built it</h2>
      <p>
        I&apos;m <a href={SITE.creator.url} target="_blank" rel="noopener">LamediYah</a>, an artist working in
        Hebrew calligraphy, music and poetry. I wanted to learn to type Hebrew, and to practice the
        roots and Biblical Hebrew I was studying while I did it.
      </p>
      <p>
        I remembered <em>Mavis Beacon Teaches Typing</em>, the classic program that taught so many
        people to type English without looking, and wanted something like it for Hebrew. So I built
        one for myself, and the name is a small tribute: <strong>LamediYah Teaches Typing</strong>.
      </p>
      <p>
        Along the way it became clear that other learners could use it too: seminary and university
        students in Biblical Hebrew courses, people returning to the language, and anyone who wants
        the letters to live in their hands, not just on the page.
      </p>

      <h2>What makes it different</h2>
      <ul>
        <li><strong>No setup.</strong> Type on your normal English keyboard; the app shows Hebrew.</li>
        <li><strong>Real texts.</strong> Lessons move from letters to three-letter roots to Tanakh verses and prayers.</li>
        <li><strong>Hand guidance.</strong> An on-screen keyboard shows the next key and which hand to use.</li>
        <li><strong>Free and private.</strong> No account, no ads. Your practice stays in your browser.</li>
      </ul>
      <p>
        New to the keyboard? Start with the{" "}
        <Link href="/guides/hebrew-keyboard-layout">Hebrew keyboard layout guide</Link> or read{" "}
        <Link href="/guides/biblical-hebrew-typing">why typing helps Biblical Hebrew students</Link>.
      </p>

      <h2>What&apos;s next</h2>
      <ul>
        <li>Niqqud (vowel point) lessons</li>
        <li>More verses, prayers and roots</li>
        <li>Opening the source code so others can contribute</li>
      </ul>

      <h2 id="contact">Get in touch</h2>
      <p>
        Found a bug, want a verse added, or using LamediYah with a class? I&apos;d love to hear from you.
      </p>
      <div className="mt-6">
        <ContactForm />
      </div>

      <PracticeCta text="Start typing" />
    </div>
  );
}
