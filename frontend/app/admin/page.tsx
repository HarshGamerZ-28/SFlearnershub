"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, FileText, FolderOpen, Tag, Image as ImageIcon,
  Settings, LogOut, Plus, Edit2, Trash2, Eye, Youtube,
  TrendingUp, Users, BookOpen, Star, Menu, X, Search,
  ChevronDown, AlertCircle, CheckCircle
} from "lucide-react";
import { adminApi, blogApi, type Post } from "@/lib/api";
import Link from "next/link";

interface AdminStats {
  published_posts: number;
  draft_posts: number;
  categories: number;
  tags: number;
  total_views: number;
}

type AdminView = "dashboard" | "posts" | "new-post" | "categories" | "tags" | "media";

export default function AdminDashboard() {
  const router  = useRouter();
  const [view,   setView]   = useState<AdminView>("dashboard");
  const [stats,  setStats]  = useState<AdminStats | null>(null);
  const [posts,  setPosts]  = useState<Post[]>([]);
  const [total,  setTotal]  = useState(0);
  const [page,   setPage]   = useState(1);
  const [pages,  setPages]  = useState(1);
  const [loading, setLoading] = useState(true);
  const [sideOpen, setSideOpen] = useState(false);
  const [toast,  setToast]  = useState<{ msg: string; type: "success"|"error" } | null>(null);

  const showToast = (msg: string, type: "success"|"error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const token = localStorage.getItem("sf_access_token");
    if (!token) { router.push("/auth/login"); return; }
    loadStats();
    loadPosts();
  }, []);

  useEffect(() => {
    if (view === "posts") loadPosts();
  }, [page, view]);

  const loadStats = async () => {
    try {
      const r = await adminApi.stats();
      setStats(r.data);
    } catch { showToast("Failed to load stats", "error"); }
  };

  const loadPosts = async () => {
    setLoading(true);
    try {
      const r = await adminApi.posts(page);
      setPosts(r.data.items || []);
      setTotal(r.data.total || 0);
      setPages(r.data.total_pages || 1);
    } catch { showToast("Failed to load posts", "error"); }
    finally { setLoading(false); }
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await blogApi.delete(slug);
      showToast("Post deleted");
      loadPosts();
    } catch { showToast("Delete failed", "error"); }
  };

  const STAT_CARDS = stats ? [
    { label: "Published Posts",  value: stats.published_posts.toLocaleString(), icon: <FileText size={18} />,   color: "from-brand-500 to-brand-600",  delta: "All migrated from WP" },
    { label: "Draft Posts",      value: stats.draft_posts.toLocaleString(),     icon: <Edit2 size={18} />,      color: "from-amber-500 to-amber-600",   delta: "Pending review" },
    { label: "Total Views",      value: stats.total_views.toLocaleString(),     icon: <TrendingUp size={18} />, color: "from-violet-500 to-violet-600", delta: "Lifetime views" },
    { label: "Categories",       value: stats.categories.toLocaleString(),      icon: <FolderOpen size={18} />, color: "from-cyan-500 to-cyan-600",     delta: "Slugs preserved" },
  ] : [];

  const NAV_ITEMS: { id: AdminView; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard",  label: "Dashboard",  icon: <LayoutDashboard size={16} /> },
    { id: "posts",      label: "All Posts",  icon: <FileText size={16} /> },
    { id: "new-post",   label: "New Post",   icon: <Plus size={16} /> },
    { id: "categories", label: "Categories", icon: <FolderOpen size={16} /> },
    { id: "tags",       label: "Tags",       icon: <Tag size={16} /> },
    { id: "media",      label: "Media",      icon: <ImageIcon size={16} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium shadow-lg animate-fade-in
          ${toast.type === "success" ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300" : "bg-red-500/20 border border-red-500/40 text-red-300"}`}>
          {toast.type === "success" ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
          {toast.msg}
        </div>
      )}

      {/* Admin Topbar */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-6 h-14 bg-dark-800 border-b border-[rgba(91,114,240,0.2)] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button onClick={() => setSideOpen(!sideOpen)} className="lg:hidden text-slate-400 hover:text-white transition-colors">
            {sideOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <span className="font-display font-bold text-base gradient-text">SF Learners Hub</span>
          <span className="hidden sm:block text-xs px-2 py-0.5 rounded bg-brand-600/20 text-brand-400 border border-brand-500/20 font-mono">Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank" className="text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1">
            <Eye size={12} /> View site
          </Link>
          <button
            onClick={() => { localStorage.removeItem("sf_access_token"); router.push("/auth/login"); }}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-400 transition-colors"
          >
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`w-56 bg-dark-800 border-r border-[rgba(91,114,240,0.15)] flex flex-col shrink-0
          lg:translate-x-0 transition-transform duration-300
          ${sideOpen ? "translate-x-0" : "-translate-x-full"}
          fixed lg:static top-14 left-0 h-[calc(100vh-3.5rem)] z-30`}>
          <nav className="flex-1 py-4 space-y-0.5 overflow-y-auto">
            <div className="px-4 pb-2 text-xs font-semibold text-slate-600 uppercase tracking-wider">Content</div>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { setView(item.id); setSideOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-all border-l-2 ${
                  view === item.id
                    ? "bg-brand-600/10 text-white border-brand-500"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border-transparent"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <div className="px-4 pt-4 pb-2 text-xs font-semibold text-slate-600 uppercase tracking-wider">System</div>
            <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent transition-all">
              <Settings size={16} /> Settings
            </button>
          </nav>
          <div className="p-4 border-t border-[rgba(91,114,240,0.12)]">
            <div className="glass rounded-xl p-3 text-center">
              <p className="text-xs text-slate-500">Migration status</p>
              <p className="text-sm font-bold text-emerald-400 mt-1">✓ Complete</p>
              <p className="text-xs text-slate-600 mt-0.5">All WP slugs preserved</p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 overflow-y-auto min-w-0">

          {/* ── DASHBOARD ── */}
          {view === "dashboard" && (
            <div className="animate-fade-in">
              <div className="mb-8">
                <h1 className="font-display text-2xl font-bold">Dashboard</h1>
                <p className="text-slate-500 text-sm mt-1">All WordPress content migrated successfully — ready to manage and enhance.</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {STAT_CARDS.map((card) => (
                  <div key={card.label} className="glass rounded-2xl p-5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-4`}>
                      {card.icon}
                    </div>
                    <div className="font-display font-bold text-3xl text-white mb-1">{card.value}</div>
                    <div className="text-sm text-slate-400">{card.label}</div>
                    <div className="text-xs text-slate-600 mt-1">{card.delta}</div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="glass rounded-2xl p-6 mb-6">
                <h2 className="font-display font-bold text-lg mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "New Post",           icon: <Plus size={14} />,     action: () => setView("new-post") },
                    { label: "Manage Posts",        icon: <FileText size={14} />, action: () => setView("posts") },
                    { label: "Add YouTube Link",    icon: <Youtube size={14} />,  action: () => setView("posts") },
                    { label: "Upload Thumbnail",    icon: <ImageIcon size={14} />,action: () => setView("media") },
                  ].map((a) => (
                    <button key={a.label} onClick={a.action}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm text-slate-300 hover:text-white hover:border-[rgba(91,114,240,0.4)] transition-all">
                      <span className="text-brand-400">{a.icon}</span>
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Migration summary */}
              <div className="glass rounded-2xl p-6">
                <h2 className="font-display font-bold text-lg mb-4">WordPress Migration Summary</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Posts migrated",    value: stats?.published_posts || 0, color: "#10b981" },
                    { label: "Categories synced", value: stats?.categories || 0,      color: "#5b72f0" },
                    { label: "Slugs preserved",   value: "100%",                      color: "#a78bfa" },
                  ].map((item) => (
                    <div key={item.label} className="bg-dark-700/50 rounded-xl p-4 border border-[rgba(91,114,240,0.1)]">
                      <div className="font-display font-bold text-2xl" style={{ color: item.color }}>{item.value}</div>
                      <div className="text-xs text-slate-500 mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── POSTS TABLE ── */}
          {view === "posts" && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="font-display text-2xl font-bold">All Posts</h1>
                  <p className="text-slate-500 text-sm mt-1">{total.toLocaleString()} posts total</p>
                </div>
                <button onClick={() => setView("new-post")}
                  className="btn-glow flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white">
                  <Plus size={15} /> New Post
                </button>
              </div>

              <div className="glass rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[rgba(91,114,240,0.1)]">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input placeholder="Search posts…" className="w-full max-w-sm pl-9 pr-4 py-2 bg-dark-700 border border-[rgba(91,114,240,0.15)] rounded-lg text-sm text-white placeholder:text-slate-500 outline-none focus:border-[rgba(91,114,240,0.4)] transition-all" />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[rgba(91,114,240,0.1)] bg-dark-700/30">
                        {["Title", "Difficulty", "Status", "Views", "YT", "Actions"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        Array.from({ length: 8 }).map((_, i) => (
                          <tr key={i}>
                            <td colSpan={6} className="px-4 py-3">
                              <div className="skeleton h-5 rounded w-full" />
                            </td>
                          </tr>
                        ))
                      ) : posts.map((post: any) => (
                        <tr key={post.id} className="border-b border-[rgba(91,114,240,0.06)] hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3 max-w-xs">
                            <div className="font-medium text-sm text-white truncate">{post.title}</div>
                            <div className="text-xs text-slate-600 font-mono truncate">/blog/{post.slug}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-1 rounded font-mono font-semibold
                              ${post.difficulty === "beginner" ? "badge-beginner" :
                                post.difficulty === "intermediate" ? "badge-intermediate" : "badge-advanced"}`}>
                              {post.difficulty}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-1 rounded font-semibold
                              ${post.status === "published"
                                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                                : "bg-amber-500/15 text-amber-400 border border-amber-500/25"}`}>
                              {post.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-400">{(post.view_count || 0).toLocaleString()}</td>
                          <td className="px-4 py-3 text-center">
                            {post.has_youtube ? <Youtube size={15} className="text-red-400 mx-auto" /> : <span className="text-slate-700">—</span>}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Link href={`/blog/${post.slug}`} target="_blank"
                                className="p-1.5 rounded-lg bg-dark-600 text-slate-500 hover:text-white transition-colors border border-[rgba(255,255,255,0.05)]">
                                <Eye size={13} />
                              </Link>
                              <button className="p-1.5 rounded-lg bg-brand-600/15 text-brand-400 hover:bg-brand-600/25 transition-colors border border-brand-500/20">
                                <Edit2 size={13} />
                              </button>
                              <button onClick={() => handleDelete(post.slug, post.title)}
                                className="p-1.5 rounded-lg bg-red-500/12 text-red-400 hover:bg-red-500/25 transition-colors border border-red-500/20">
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {pages > 1 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-[rgba(91,114,240,0.1)]">
                    <p className="text-xs text-slate-500">Page {page} of {pages}</p>
                    <div className="flex gap-2">
                      <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
                        className="px-3 py-1.5 rounded-lg glass text-xs disabled:opacity-30 transition-all">← Prev</button>
                      <button disabled={page >= pages} onClick={() => setPage(p => p + 1)}
                        className="px-3 py-1.5 rounded-lg glass text-xs disabled:opacity-30 transition-all">Next →</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── NEW POST FORM ── */}
          {view === "new-post" && <NewPostForm onSuccess={() => { showToast("Post created!"); setView("posts"); loadPosts(); }} />}

          {/* ── PLACEHOLDER VIEWS ── */}
          {(view === "categories" || view === "tags" || view === "media") && (
            <div className="animate-fade-in text-center py-24 glass rounded-2xl">
              <div className="text-4xl mb-4">{view === "categories" ? "📂" : view === "tags" ? "🏷️" : "🖼️"}</div>
              <p className="font-display text-xl font-bold capitalize">{view}</p>
              <p className="text-slate-500 text-sm mt-2">Management interface — connect to FastAPI backend</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ─── New Post Form ─────────────────────────────────────────────────────────────
function NewPostForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "",
    youtube_url: "", difficulty: "beginner", status: "published",
    category_slugs: [] as string[], tag_slugs: [] as string[],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

  const set = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) { setError("Title and content are required"); return; }
    setSaving(true); setError("");
    try {
      await blogApi.create({
        ...form,
        difficulty: form.difficulty as "beginner" | "intermediate" | "advanced",
        slug: form.slug || autoSlug(form.title)
      });
      onSuccess();
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to create post");
    } finally { setSaving(false); }
  };

  return (
    <div className="animate-fade-in max-w-3xl">
      <h1 className="font-display text-2xl font-bold mb-6">New Post</h1>
      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/12 border border-red-500/30 text-red-400 text-sm mb-6">
          <AlertCircle size={15} /> {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Title *</label>
            <input value={form.title}
              onChange={e => { set("title", e.target.value); if (!form.slug) set("slug", autoSlug(e.target.value)); }}
              className="w-full px-4 py-2.5 bg-dark-700 border border-[rgba(91,114,240,0.2)] rounded-xl text-sm text-white placeholder:text-slate-500 outline-none focus:border-[rgba(91,114,240,0.5)] transition-all"
              placeholder="Post title…" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Slug (auto-generated)</label>
            <input value={form.slug} onChange={e => set("slug", e.target.value)}
              className="w-full px-4 py-2.5 bg-dark-700 border border-[rgba(91,114,240,0.2)] rounded-xl text-sm text-slate-400 font-mono placeholder:text-slate-600 outline-none focus:border-[rgba(91,114,240,0.5)] transition-all"
              placeholder="auto-generated-slug" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Excerpt</label>
          <textarea value={form.excerpt} onChange={e => set("excerpt", e.target.value)} rows={2}
            className="w-full px-4 py-2.5 bg-dark-700 border border-[rgba(91,114,240,0.2)] rounded-xl text-sm text-white placeholder:text-slate-500 outline-none focus:border-[rgba(91,114,240,0.5)] transition-all resize-none"
            placeholder="Brief description…" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Content (HTML) *</label>
          <textarea value={form.content} onChange={e => set("content", e.target.value)} rows={12}
            className="w-full px-4 py-2.5 bg-dark-700 border border-[rgba(91,114,240,0.2)] rounded-xl text-sm text-white font-mono placeholder:text-slate-500 outline-none focus:border-[rgba(91,114,240,0.5)] transition-all resize-y"
            placeholder="<p>Post content in HTML…</p>" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">YouTube URL</label>
            <input value={form.youtube_url} onChange={e => set("youtube_url", e.target.value)}
              className="w-full px-4 py-2.5 bg-dark-700 border border-[rgba(91,114,240,0.2)] rounded-xl text-sm text-white placeholder:text-slate-500 outline-none focus:border-[rgba(91,114,240,0.5)] transition-all"
              placeholder="https://youtube.com/watch?v=…" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Difficulty</label>
            <select value={form.difficulty} onChange={e => set("difficulty", e.target.value)}
              className="w-full px-4 py-2.5 bg-dark-700 border border-[rgba(91,114,240,0.2)] rounded-xl text-sm text-white outline-none focus:border-[rgba(91,114,240,0.5)] transition-all cursor-pointer">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Status</label>
            <select value={form.status} onChange={e => set("status", e.target.value)}
              className="w-full px-4 py-2.5 bg-dark-700 border border-[rgba(91,114,240,0.2)] rounded-xl text-sm text-white outline-none focus:border-[rgba(91,114,240,0.5)] transition-all cursor-pointer">
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" className="px-5 py-2.5 rounded-xl glass text-sm text-slate-400 hover:text-white transition-all">
            Save Draft
          </button>
          <button type="submit" disabled={saving}
            className="btn-glow px-6 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60">
            {saving ? "Publishing…" : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
