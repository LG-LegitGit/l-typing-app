import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES, SITE } from "@/lib/site";
import { PracticeCta } from "@/components/site/GuideParts";

export const metadata: Metadata = {
  title: "Hebrew Typing Guides",
  description:
    "Free guides for English speakers learning to type Hebrew: the Hebrew keyboard layout, setting up Hebrew on Windows and Mac, typing Biblical Hebrew, and reading Hebrew numbers.",
  alternates: { canonical: "/guides" },
  openGraph: {
    url: `${SITE.url}/guides`,
    title: `Hebrew Typing Guides | ${SITE.shortName}`,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
};

export default function GuidesIndex() {
  return (
    <div className="prose-temple">
      <h1>Hebrew Typing Guides</h1>
      <p className="lead">
        Short, practical guides for English speakers learning to type Hebrew, especially students of
        Biblical Hebrew. Read one, then practice it in the app.
      </p>

      <div className="not-prose mt-10 grid gap-5">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="block rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 hover:border-amber-500/40 hover:bg-white/[0.06] transition"
            style={{ textDecoration: "none" }}
          >
            <span className="block font-frank text-2xl font-black text-white">{g.title}</span>
            <span className="block mt-2 text-white/60">{g.description}</span>
            <span className="block mt-4 text-sm font-semibold text-amber-300">Read guide →</span>
          </Link>
        ))}
      </div>

      <PracticeCta text="Open the typing app" />
    </div>
  );
}
