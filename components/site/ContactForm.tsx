"use client";

import { useState } from "react";

/**
 * ✉️ Web3Forms contact form.
 * Set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in Vercel (Project → Settings → Environment Variables).
 * The Web3Forms access key is designed to be public; it only allows sending to your inbox.
 * Spam protection: honeypot field ("botcheck") that Web3Forms checks server-side.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return; // bot filled the hidden field
    data.append("access_key", ACCESS_KEY ?? "");
    data.append("subject", `LamediYah app: ${data.get("topic") || "Message"}`);
    data.append("from_name", "lamediyah.app");

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (!ACCESS_KEY) {
    return (
      <p className="text-white/60">
        The contact form is being set up. In the meantime, reach out through{" "}
        <a href="https://lamediyah.com" className="text-amber-300 underline">lamediyah.com</a>.
      </p>
    );
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6 text-center">
        <p className="font-frank text-2xl font-black text-white">תודה · Thank you!</p>
        <p className="mt-2 text-white/70">Your message was sent. I read every one.</p>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/60";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block mb-1.5 text-sm text-white/60">Name (optional)</span>
          <input name="name" className={field} autoComplete="name" />
        </label>
        <label className="block">
          <span className="block mb-1.5 text-sm text-white/60">Email</span>
          <input name="email" type="email" required className={field} autoComplete="email" />
        </label>
      </div>

      <label className="block">
        <span className="block mb-1.5 text-sm text-white/60">Topic</span>
        <select name="topic" className={field} defaultValue="Feedback">
          <option className="bg-[#140a24]">Feedback</option>
          <option className="bg-[#140a24]">Suggest a verse or prayer</option>
          <option className="bg-[#140a24]">Report a problem</option>
          <option className="bg-[#140a24]">Other</option>
        </select>
      </label>

      <label className="block">
        <span className="block mb-1.5 text-sm text-white/60">Message</span>
        <textarea name="message" required rows={5} className={field} />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-300 to-amber-500 text-purple-950 font-bold hover:brightness-110 transition disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p className="text-rose-300 text-sm">Something went wrong. Please try again in a moment.</p>
      )}
    </form>
  );
}
