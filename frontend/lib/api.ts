// lib/api.ts — Typed API client for SF Learners Hub
import axios from "axios";
import { USE_MOCK_DATA } from "./config";
import { mockPosts, mockCategories, mockAuthor } from "./mockData";

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
  list: async (params?: {
    page?: number; per_page?: number; category?: string;
    tag?: string; difficulty?: string; featured?: boolean;
  }) => {
    if (USE_MOCK_DATA) {
      let items = [...mockPosts];
      if (params?.featured !== undefined) {
        items = items.filter((p) => p.is_featured === params.featured);
      }
      if (params?.category) {
        items = items.filter((p) => p.categories.some((c) => c.slug === params.category));
      }
      if (params?.tag) {
        items = items.filter((p) => p.tags.some((t) => t.slug === params.tag));
      }
      if (params?.difficulty) {
        items = items.filter((p) => p.difficulty === params.difficulty);
      }
      const page = params?.page || 1;
      const perPage = params?.per_page || 12;
      const total = items.length;
      const totalPages = Math.ceil(total / perPage);
      const sliced = items.slice((page - 1) * perPage, page * perPage);
      return {
        data: {
          items: sliced,
          total,
          page,
          per_page: perPage,
          total_pages: totalPages,
        },
      };
    }
    return api.get<PaginatedPosts>("/api/blogs", { params });
  },

  featured: async (limit = 6) => {
    if (USE_MOCK_DATA) {
      return { data: mockPosts.filter((p) => p.is_featured).slice(0, limit) };
    }
    return api.get<Post[]>(`/api/blogs/featured?limit=${limit}`);
  },

  bySlug: async (slug: string) => {
    if (USE_MOCK_DATA) {
      const post = mockPosts.find((p) => p.slug === slug);
      if (!post) throw new Error("Post not found");
      return { data: post };
    }
    return api.get<Post>(`/api/blogs/${slug}`);
  },

  create: async (data: Partial<Post>) => {
    if (USE_MOCK_DATA) {
      const newPost: Post = {
        id: `post-${Date.now()}`,
        title: data.title || "Untitled",
        slug: data.slug || "untitled",
        excerpt: data.excerpt,
        content: data.content || "",
        difficulty: data.difficulty || "beginner",
        reading_time: data.reading_time || 5,
        view_count: 0,
        is_featured: !!data.is_featured,
        published_at: new Date().toISOString(),
        categories: data.categories || [],
        tags: data.tags || [],
        author: mockAuthor,
        featured_image: data.featured_image,
        youtube_url: data.youtube_url,
      };
      mockPosts.unshift(newPost);
      return { data: newPost };
    }
    return api.post<Post>("/api/blogs", data);
  },

  update: async (slug: string, data: Partial<Post>) => {
    if (USE_MOCK_DATA) {
      const idx = mockPosts.findIndex((p) => p.slug === slug);
      if (idx === -1) throw new Error("Post not found");
      mockPosts[idx] = { ...mockPosts[idx], ...data };
      return { data: mockPosts[idx] };
    }
    return api.put<Post>(`/api/blogs/${slug}`, data);
  },

  delete: async (slug: string) => {
    if (USE_MOCK_DATA) {
      const idx = mockPosts.findIndex((p) => p.slug === slug);
      if (idx !== -1) mockPosts.splice(idx, 1);
      return { data: { success: true } };
    }
    return api.delete(`/api/blogs/${slug}`);
  },
};

// ─── Category APIs ────────────────────────────────────────────────────────────

export const categoryApi = {
  list: async () => {
    if (USE_MOCK_DATA) {
      return { data: mockCategories };
    }
    return api.get<Category[]>("/api/categories");
  },
  bySlug: async (slug: string) => {
    if (USE_MOCK_DATA) {
      const cat = mockCategories.find((c) => c.slug === slug);
      if (!cat) throw new Error("Category not found");
      return { data: cat };
    }
    return api.get<Category>(`/api/categories/${slug}`);
  },
};

// ─── Search API ───────────────────────────────────────────────────────────────

export const searchApi = {
  search: async (params: {
    q?: string; category?: string; tag?: string;
    difficulty?: string; page?: number; per_page?: number;
  }) => {
    if (USE_MOCK_DATA) {
      let items = [...mockPosts];
      if (params.q) {
        const query = params.q.toLowerCase();
        items = items.filter(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            (p.excerpt && p.excerpt.toLowerCase().includes(query)) ||
            (p.content && p.content.toLowerCase().includes(query))
        );
      }
      if (params.category) {
        items = items.filter((p) => p.categories.some((c) => c.slug === params.category));
      }
      if (params.tag) {
        items = items.filter((p) => p.tags.some((t) => t.slug === params.tag));
      }
      if (params.difficulty) {
        items = items.filter((p) => p.difficulty === params.difficulty);
      }
      const page = params.page || 1;
      const perPage = params.per_page || 12;
      const total = items.length;
      const totalPages = Math.ceil(total / perPage);
      const sliced = items.slice((page - 1) * perPage, page * perPage);
      return {
        data: {
          items: sliced,
          total,
          page,
          per_page: perPage,
          total_pages: totalPages,
        },
      };
    }
    return api.get<PaginatedPosts>("/api/search", { params });
  },
};

// ─── Auth APIs ────────────────────────────────────────────────────────────────

export const authApi = {
  login: async (email: string, password: string) => {
    if (USE_MOCK_DATA) {
      return { data: { token: "mock-jwt-token", user: mockAuthor } };
    }
    return api.post("/api/auth/login", { email, password });
  },
  register: async (data: { email: string; username: string; password: string; full_name?: string }) => {
    if (USE_MOCK_DATA) {
      return { data: { token: "mock-jwt-token", user: { ...mockAuthor, username: data.username, full_name: data.full_name } } };
    }
    return api.post("/api/auth/register", data);
  },
};

// ─── Admin APIs ───────────────────────────────────────────────────────────────

export const adminApi = {
  stats: async () => {
    if (USE_MOCK_DATA) {
      return {
        data: {
          total_posts: mockPosts.length,
          total_categories: mockCategories.length,
          total_views: mockPosts.reduce((acc, p) => acc + p.view_count, 0),
        },
      };
    }
    return api.get("/api/admin/stats");
  },
  posts: async (page = 1) => {
    if (USE_MOCK_DATA) {
      const perPage = 10;
      const total = mockPosts.length;
      const sliced = mockPosts.slice((page - 1) * perPage, page * perPage);
      return {
        data: {
          items: sliced,
          total,
          page,
          per_page: perPage,
          total_pages: Math.ceil(total / perPage),
        },
      };
    }
    return api.get(`/api/admin/posts?page=${page}`);
  },
};

