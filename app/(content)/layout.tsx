import Link from "next/link";
import "./content.css";
import { SITE } from "@/lib/site";

// 📜 Shared shell for guides & about. Scrollable reading pages, same temple palette.
export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d0618] text-white font-sans">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08)_0%,transparent_60%)]" />

      <header className="relative z-10 border-b border-white/10 bg-purple-950/40 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="w-10 h-10 bg-gradient-to-br from-amber-300 to-amber-600 rounded-xl flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-transform">
              <span className="text-xl font-black text-purple-950 font-frank leading-none">ל</span>
            </span>
            <span className="leading-none">
              <span className="block font-frank font-black uppercase tracking-tight text-amber-200">LamediYah</span>
              <span className="block text-[9px] font-mono uppercase tracking-[0.3em] text-amber-500/70 mt-1">Teaches Typing</span>
            </span>
          </Link>

          <nav aria-label="Site" className="flex items-center gap-5 text-sm">
            <Link href="/guides" className="hidden sm:inline text-white/60 hover:text-white transition-colors">Guides</Link>
            <Link href="/about" className="hidden sm:inline text-white/60 hover:text-white transition-colors">About</Link>
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 text-purple-950 font-bold hover:brightness-110 transition"
            >
              Start typing →
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-5 py-12 sm:py-16">{children}</main>

      <footer className="relative z-10 border-t border-white/10 mt-10">
        <div className="max-w-5xl mx-auto px-5 py-8 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-white/40">
          <div className="flex gap-5">
            <Link href="/" className="hover:text-white">Typing app</Link>
            <Link href="/guides" className="hover:text-white">Guides</Link>
            <Link href="/about" className="hover:text-white">About</Link>
          </div>
          <p>
            Crafted by{" "}
            <a href={SITE.creator.url} target="_blank" rel="noopener" className="text-amber-400/80 hover:text-amber-300">
              LamediYah
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
