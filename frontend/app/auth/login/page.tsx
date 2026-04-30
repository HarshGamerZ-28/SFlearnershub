"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Zap, AlertCircle, Loader2 } from "lucide-react";
import { authApi } from "@/lib/api";

export default function LoginPage() {
  const router  = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await authApi.login(email, password);
      localStorage.setItem("sf_access_token",  res.data.access_token);
      localStorage.setItem("sf_refresh_token", res.data.refresh_token);
      router.push("/admin");
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Invalid email or password");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 grid-bg">
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-brand-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 mb-4 shadow-glow-brand">
            <Zap size={26} className="text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to the admin portal</p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-8 animated-border">
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm mb-5">
              <AlertCircle size={15} className="shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                required autoComplete="email"
                className="w-full px-4 py-3 bg-dark-700/80 border border-[rgba(91,114,240,0.2)] rounded-xl text-sm text-white placeholder:text-slate-600 outline-none focus:border-[rgba(91,114,240,0.5)] focus:shadow-[0_0_0_3px_rgba(91,114,240,0.1)] transition-all"
                placeholder="admin@sflearnershub.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-400">Password</label>
                <button type="button" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  required autoComplete="current-password"
                  className="w-full px-4 py-3 pr-10 bg-dark-700/80 border border-[rgba(91,114,240,0.2)] rounded-xl text-sm text-white placeholder:text-slate-600 outline-none focus:border-[rgba(91,114,240,0.5)] focus:shadow-[0_0_0_3px_rgba(91,114,240,0.1)] transition-all"
                  placeholder="••••••••••"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full btn-glow flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white mt-2 disabled:opacity-60"
            >
              {loading ? <><Loader2 size={15} className="animate-spin" /> Signing in…</> : "Sign In →"}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-[rgba(91,114,240,0.1)] text-center">
            <p className="text-xs text-slate-600">
              Auth via{" "}
              <code className="text-brand-500 font-mono">POST /api/auth/login</code>
              {" → "}JWT access + refresh tokens
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          <Link href="/" className="text-slate-500 hover:text-slate-300 transition-colors">← Back to SF Learners Hub</Link>
        </p>
      </div>
    </div>
  );
}
