// lib/api.ts — Typed API client for SF Learners Hub
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sflearnershub.onrender.com";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Attach JWT from localStorage
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("sf_access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon?: string;
  parent_id?: string;
  children?: Category[];
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Author {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featured_image?: string;
  thumbnail_url?: string;
  reading_time?: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  youtube_url?: string;
  published_at: string;
  view_count: number;
  is_featured: boolean;
  meta_title?: string;
  meta_description?: string;
  categories: Category[];
  tags: Tag[];
  author?: Author;
}

export interface PaginatedPosts {
  items: Post[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// ─── Blog APIs ───────────────────────────────────────────────────────────────

export const blogApi = {
  list: (params?: {
    page?: number; per_page?: number; category?: string;
    tag?: string; difficulty?: string; featured?: boolean;
  }) => api.get<PaginatedPosts>("/api/blogs", { params }),

  featured: (limit = 6) => api.get<Post[]>(`/api/blogs/featured?limit=${limit}`),

  bySlug: (slug: string) => api.get<Post>(`/api/blogs/${slug}`),

  create: (data: Partial<Post>) => api.post<Post>("/api/blogs", data),

  update: (slug: string, data: Partial<Post>) => api.put<Post>(`/api/blogs/${slug}`, data),

  delete: (slug: string) => api.delete(`/api/blogs/${slug}`),
};

// ─── Category APIs ────────────────────────────────────────────────────────────

export const categoryApi = {
  list: () => api.get<Category[]>("/api/categories"),
  bySlug: (slug: string) => api.get<Category>(`/api/categories/${slug}`),
};

// ─── Search API ───────────────────────────────────────────────────────────────

export const searchApi = {
  search: (params: {
    q?: string; category?: string; tag?: string;
    difficulty?: string; page?: number; per_page?: number;
  }) => api.get<PaginatedPosts>("/api/search", { params }),
};

// ─── Auth APIs ────────────────────────────────────────────────────────────────

export const authApi = {
  login: (email: string, password: string) =>
    api.post("/api/auth/login", { email, password }),
  register: (data: { email: string; username: string; password: string; full_name?: string }) =>
    api.post("/api/auth/register", data),
};

// ─── Admin APIs ───────────────────────────────────────────────────────────────

export const adminApi = {
  stats:  () => api.get("/api/admin/stats"),
  posts:  (page = 1) => api.get(`/api/admin/posts?page=${page}`),
};
