"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * 📱 Shown to phone/tablet visitors without a physical keyboard.
 * Touch typing needs real keys, so instead of a bounce we offer:
 * copy the link for later + read the guides now.
 */
export function MobileNotice() {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem("mobile_notice_dismissed")) return;
    } catch {}
    const touchOnly =
      window.matchMedia("(pointer: coarse)").matches &&
      !window.matchMedia("(any-pointer: fine)").matches;
    if (!touchOnly) return;
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem("mobile_notice_dismissed", "1");
    } catch {}
    setShow(false);
  };

  const copyLink = async () => {
    const url = "https://lamediyah.app";
    try {
      if (navigator.share) {
        await navigator.share({ title: "LamediYah – Learn Hebrew Touch Typing", url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {}
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-4 bg-purple-950/90 backdrop-blur-xl">
      <div className="w-full max-w-md rounded-[2rem] border border-amber-500/30 bg-[#140a24] p-7 text-center shadow-2xl space-y-5">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center -rotate-6">
          <span className="text-3xl font-black text-purple-950 font-frank">ל</span>
        </div>
        <h2 className="text-2xl font-frank font-black text-white">Best on a computer</h2>
        <p className="text-white/70 leading-relaxed">
          Touch typing is learned on a physical keyboard. Save this link and open it on your laptop or
          desktop, or connect a Bluetooth keyboard.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={copyLink}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-300 to-amber-500 text-purple-950 font-bold"
          >
            {copied ? "Link copied ✓" : "Save / share the link"}
          </button>
          <Link
            href="/guides"
            className="w-full py-3.5 rounded-2xl border border-white/15 text-white/90 font-semibold"
          >
            Read the Hebrew typing guides
          </Link>
          <button onClick={dismiss} className="text-sm text-white/40 hover:text-white/70 py-1">
            I have a keyboard, continue
          </button>
        </div>
      </div>
    </div>
  );
}
