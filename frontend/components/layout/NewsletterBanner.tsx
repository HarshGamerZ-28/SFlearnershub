"use client";
import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function NewsletterBanner() {
  const [email, setEmail]     = useState("");
  const [done, setDone]       = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // POST /api/subscribers
    await new Promise(r => setTimeout(r, 800));
    setDone(true);
    setLoading(false);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900/60 via-dark-700/80 to-violet-900/40 border border-[rgba(91,114,240,0.2)] p-10 sm:p-14 text-center">
        {/* BG effects */}
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="absolute -top-12 left-1/4 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-12 right-1/4 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-600/15 border border-brand-500/25 text-brand-400 text-sm mb-5">
            <Mail size={14} /> Stay updated
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Never miss a Salesforce insight
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
            Get the latest tutorials, release notes, and exam tips delivered straight to your inbox.
          </p>

          {done ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
              <CheckCircle size={18} /> You're subscribed!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                required placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-dark-800/80 border border-[rgba(91,114,240,0.25)] rounded-xl text-sm text-white placeholder:text-slate-600 outline-none focus:border-[rgba(91,114,240,0.5)] transition-all"
              />
              <button type="submit" disabled={loading}
                className="btn-glow flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60 whitespace-nowrap">
                {loading ? "Subscribing…" : <><Mail size={14} /> Subscribe <ArrowRight size={14} /></>}
              </button>
            </form>
          )}
          <p className="text-xs text-slate-600 mt-4">No spam, unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
