import Link from "next/link";
import { SITE, GUIDES } from "@/lib/site";

/** Article + breadcrumb structured data for a guide page */
export function GuideJsonLd({ slug, title, description }: { slug: string; title: string; description: string }) {
  const url = `${SITE.url}/guides/${slug}`;
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      url,
      image: `${SITE.url}${SITE.ogImage}`,
      inLanguage: "en",
      author: { "@type": "Person", name: SITE.creator.name, url: SITE.creator.url },
      publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE.url}/guides` },
        { "@type": "ListItem", position: 3, name: title, item: url },
      ],
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function Breadcrumb({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-xs font-mono uppercase tracking-[0.25em] text-white/40">
      <Link href="/guides" className="hover:text-amber-300">Guides</Link>
      <span className="mx-2">/</span>
      <span className="text-white/60">{title}</span>
    </nav>
  );
}

/** Big call-to-action back into the app */
export function PracticeCta({ text = "Practice in the app" }: { text?: string }) {
  return (
    <div className="not-prose my-12 rounded-[2rem] border border-amber-500/30 bg-gradient-to-br from-purple-900/60 to-[#140a24] p-8 text-center">
      <p className="font-frank text-2xl font-black text-white">Ready to put it under your fingers?</p>
      <p className="mt-2 text-white/60">Free, in your browser, no Hebrew keyboard setup needed.</p>
      <Link
        href="/"
        className="mt-6 inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-300 to-amber-500 text-purple-950 font-bold text-lg hover:brightness-110 transition no-underline"
      >
        {text} →
      </Link>
    </div>
  );
}

export function MoreGuides({ current }: { current: string }) {
  const others = GUIDES.filter((g) => g.slug !== current);
  return (
    <aside className="mt-16 grid sm:grid-cols-2 gap-4">
      {others.map((g) => (
        <Link
          key={g.slug}
          href={`/guides/${g.slug}`}
          className="block rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-amber-500/40 hover:bg-white/[0.06] transition"
        >
          <span className="block text-[10px] font-mono uppercase tracking-[0.3em] text-amber-500/70">Next guide</span>
          <span className="block mt-2 font-frank text-lg font-bold text-white">{g.title}</span>
          <span className="block mt-1 text-sm text-white/50">{g.description}</span>
        </Link>
      ))}
    </aside>
  );
}

export function guideMetadata(slug: string) {
  const g = GUIDES.find((x) => x.slug === slug)!;
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: {
      type: "article" as const,
      url: `${SITE.url}/guides/${slug}`,
      title: `${g.title} | ${SITE.shortName}`,
      description: g.description,
      images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
    },
  };
}
