# SF Learners Hub v2.0 — Complete Rebuild Documentation

> **WordPress → Modern Stack Migration**
> A production-ready Salesforce learning platform rebuilt with Next.js, FastAPI & PostgreSQL.
> **Zero slug changes. 100% content preserved. Full SEO continuity.**

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Request                             │
└─────────────────────────┬───────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│              Next.js 14 (App Router + ISR)                      │
│  • SSR/SSG blog pages  • SEO metadata  • Image optimization     │
│  • Tailwind CSS  • Framer Motion animations                     │
└─────────────────────────┬───────────────────────────────────────┘
                          ▼ REST API calls
┌─────────────────────────────────────────────────────────────────┐
│                  FastAPI (Python 3.12)                          │
│  • JWT auth (access + refresh tokens)                           │
│  • Blog CRUD  • Full-text search  • Admin endpoints             │
│  • File upload  • CORS middleware  • GZip compression           │
└─────────────────────────┬───────────────────────────────────────┘
                          ▼ async SQLAlchemy
┌─────────────────────────────────────────────────────────────────┐
│                     PostgreSQL 16                               │
│  • GIN full-text search indexes  • UUID primary keys            │
│  • All WP slugs preserved  • Category hierarchy                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Complete Folder Structure

```
sflearnershub/
├── backend/
│   ├── app/
│   │   ├── main.py                    # FastAPI app + middleware
│   │   ├── api/routes/
│   │   │   ├── auth.py                # JWT login/register
│   │   │   ├── blogs.py               # Blog CRUD + listing
│   │   │   ├── categories.py          # Category tree
│   │   │   ├── tags.py                # Tag listing
│   │   │   ├── search.py              # Full-text search
│   │   │   ├── admin.py               # Admin stats + management
│   │   │   └── media.py               # File upload
│   │   ├── core/
│   │   │   ├── config.py              # Pydantic settings
│   │   │   └── security.py            # JWT + bcrypt
│   │   ├── db/
│   │   │   └── database.py            # AsyncSession + engine
│   │   ├── models/
│   │   │   └── models.py              # SQLAlchemy ORM models
│   │   └── schemas/
│   │       └── schemas.py             # Pydantic request/response
│   ├── migrations/
│   │   └── 001_initial_schema.sql     # Full schema + category seeds
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout + fonts
│   │   ├── page.tsx                   # Home page
│   │   ├── blog/
│   │   │   ├── page.tsx               # Blog listing (SSR)
│   │   │   └── [slug]/page.tsx        # Blog detail (ISR + SEO)
│   │   ├── category/blog/[slug]/
│   │   │   └── page.tsx               # Category archive (WP URL preserved)
│   │   ├── search/page.tsx            # Search results
│   │   ├── admin/page.tsx             # Admin dashboard
│   │   └── auth/login/page.tsx        # JWT login
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx             # Sticky nav + dropdown + search
│   │   │   ├── Footer.tsx             # Full footer with all category links
│   │   │   ├── HeroSection.tsx        # Animated hero with stats
│   │   │   └── NewsletterBanner.tsx   # Email subscription
│   │   └── blog/
│   │       ├── BlogCard.tsx           # Card with difficulty, reading time, YT badge
│   │       ├── BlogListClient.tsx     # Filtered listing + pagination
│   │       ├── BlogDetailClient.tsx   # Full detail + TOC + share + related
│   │       ├── CategoryGrid.tsx       # Icon-based category grid
│   │       ├── FeaturedBlogs.tsx      # Featured posts section
│   │       └── CategoryPageClient.tsx # Category archive client
│   ├── lib/
│   │   └── api.ts                     # Axios API client + TypeScript types
│   ├── styles/
│   │   └── globals.css                # Design tokens + animations
│   ├── tailwind.config.js             # Full design system
│   ├── next.config.js
│   ├── package.json
│   └── .env.example
│
├── migration_scripts/
│   └── wp_to_postgres.py              # Full WordPress XML → PostgreSQL migrator
│
└── README.md
```

---

## 🚀 Quick Start

### 1. Clone & Setup

```bash
git clone <your-repo>
cd sflearnershub
```

### 2. Configure Environment

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env — set SECRET_KEY and DATABASE_URL

# Frontend
cp frontend/.env.example frontend/.env.local
# Edit frontend/.env.local — set NEXT_PUBLIC_API_URL
```

### 3. Start with Docker Compose

```bash
docker-compose up --build
```

Services:
- **PostgreSQL**: `localhost:5432`
- **FastAPI API**: `http://localhost:8000` (docs at `/api/docs`)
- **Next.js**: `http://localhost:3000`

### 4. Run WordPress Migration

```bash
# Export from WordPress Admin → Tools → Export → All content
# Download the XML file, then:

pip install asyncpg httpx rich

python migration_scripts/wp_to_postgres.py \
  --xml wordpress_export.xml \
  --db-url postgresql://sfhub:sfhub_secret@localhost:5432/sflearnershub
```

Migration output:
```
✓ 842 posts migrated, 0 skipped
✓ 18 categories processed
✓ 47 tags processed
✅ Migration complete! All slugs preserved.
```

---

## 🗄️ Database Schema

| Table            | Key fields                                                               |
|------------------|--------------------------------------------------------------------------|
| `posts`          | `slug` (WP preserved), `title`, `content`, `youtube_url`★, `reading_time`★, `difficulty`★ |
| `categories`     | `slug` (WP preserved), `parent_id`, `color`★, `icon`★                   |
| `tags`           | `slug`, `wp_term_id`                                                     |
| `post_categories`| `post_id`, `category_id`, `is_primary`★                                 |
| `post_tags`      | `post_id`, `tag_id`                                                      |
| `users`          | `email`, `role` (reader/author/admin), JWT auth                          |
| `media`          | `original_url` (WP), `cdn_url`★                                         |

★ = New fields added beyond original WordPress data

---

## 🔌 API Reference

### Auth
| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| POST   | `/api/auth/register` | Create account           |
| POST   | `/api/auth/login`    | JWT login → tokens       |

### Blogs
| Method | Endpoint                    | Description                         |
|--------|-----------------------------|-------------------------------------|
| GET    | `/api/blogs`                | List with filters (category, difficulty, tag) |
| GET    | `/api/blogs/featured`       | Featured posts                      |
| GET    | `/api/blogs/{slug}`         | Single post by slug                 |
| POST   | `/api/blogs`                | Create post (auth required)         |
| PUT    | `/api/blogs/{slug}`         | Update post (auth required)         |
| DELETE | `/api/blogs/{slug}`         | Delete post (auth required)         |

### Search
| Method | Endpoint                    | Description                         |
|--------|-----------------------------|-------------------------------------|
| GET    | `/api/search?q=apex+trigger`| Full-text PostgreSQL search         |

### Categories
| Method | Endpoint                    | Description                         |
|--------|-----------------------------|-------------------------------------|
| GET    | `/api/categories`           | Full tree with children             |
| GET    | `/api/categories/{slug}`    | Single category                     |

### Admin (JWT + admin role required)
| Method | Endpoint                    | Description                         |
|--------|-----------------------------|-------------------------------------|
| GET    | `/api/admin/stats`          | Dashboard statistics                |
| GET    | `/api/admin/posts`          | All posts with status               |

---

## 🎨 Design System

| Token           | Value                          |
|-----------------|--------------------------------|
| Background      | `#080b14` (near-black)         |
| Card BG         | `rgba(17,24,39,0.7)` + blur    |
| Border          | `rgba(91,114,240,0.15)`        |
| Accent          | `#5b72f0` (brand blue)         |
| Secondary       | `#7c3aed` (violet)             |
| Highlight       | `#22d3ee` (cyan)               |
| Font - Display  | Syne (headings)                |
| Font - Body     | DM Sans                        |
| Font - Code     | JetBrains Mono                 |
| Radius          | `16px` cards, `24px` sections  |

### Animations
- `animate-fade-up` — entries from below
- `animate-fade-in` — opacity fade
- `animate-glow-pulse` — pulsing border glow
- `animate-float` — floating hero elements
- `animate-shimmer` — skeleton loading

---

## 🔒 SEO Preservation Strategy

| URL Pattern                    | Status     |
|--------------------------------|------------|
| `/blog/{original-wp-slug}`     | ✅ Preserved |
| `/category/blog/{cat-slug}`    | ✅ Preserved |
| Meta title, description        | ✅ Migrated  |
| Canonical URLs                 | ✅ Set       |
| OG image, OG type:article      | ✅ Set       |
| `publishedTime` meta           | ✅ From WP   |
| ISR revalidation               | ✅ 5 minutes |

---

## 🧩 New Features Added (vs WordPress)

| Feature              | Implementation                                 |
|----------------------|------------------------------------------------|
| ⏱ Reading time       | Auto-calculated at 200 WPM during migration    |
| 🎯 Difficulty levels  | Heuristic + manual override in admin           |
| 🏷️ Tags system        | Migrated from WP tags + new tag management     |
| ▶️ YouTube embed      | `youtube_url` field + iframe embed             |
| 🔍 Full-text search   | PostgreSQL GIN + `plainto_tsquery`             |
| 📊 View counter       | Incremented on each `/api/blogs/{slug}` GET    |
| 📖 Table of Contents  | Auto-built from H2/H3 headings in post         |
| 🔗 Social sharing     | Twitter, LinkedIn, copy link                   |
| 📬 Newsletter         | Subscriber capture with `/api/subscribers`     |
| 🛡️ JWT Auth           | Access + refresh token rotation                |
| 🖼️ Media upload        | Multi-type image upload via admin              |
| 🔔 Reading progress   | Scroll-based progress bar on blog detail       |

---

## 📦 Production Deployment Roadmap

This application is decoupled and optimally deployed using **Supabase** for the database, **Render** for the Python backend, and **Vercel** for the Next.js frontend.

### 1. Database (Supabase PostgreSQL)
Your database is hosted on Supabase.
**Connection String**:
```env
DATABASE_URL=postgresql://postgres:Harshsoni_28@db.ytieuntfceegfnoghpug.supabase.co:5432/postgres
```

### 2. Backend (Render)
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository and select the `backend` directory as the Root Directory.
3. Set the Environment to **Python**.
4. Configure the build and start commands:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add the following **Environment Variables** in the Render dashboard:
   - `DATABASE_URL`: `postgresql://postgres:Harshsoni_28@db.ytieuntfceegfnoghpug.supabase.co:5432/postgres`
   - `SECRET_KEY`: `<your_secure_random_string>`
   - `CORS_ORIGINS`: `https://your-vercel-frontend-domain.vercel.app` *(update this after Vercel deployment)*
6. Click **Deploy**. Render will build and provide a live API URL (e.g., `https://sflearnershub-api.onrender.com`).

### 3. Frontend (Vercel)
1. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
2. Import your GitHub repository.
3. **Important**: Under "Root Directory", click Edit and select the `frontend` folder.
4. The framework preset will automatically detect **Next.js**.
5. Add the following **Environment Variable**:
   - `NEXT_PUBLIC_API_URL`: `<YOUR_RENDER_BACKEND_URL>` *(e.g., `https://sflearnershub-api.onrender.com`)*
6. Click **Deploy**. Vercel will build and host your Next.js application globally.

### Final Verification
Once Vercel deploys, copy your new Vercel domain (e.g., `https://sflearnershub.vercel.app`) and update the `CORS_ORIGINS` environment variable in your Render backend settings so the frontend is authorized to make API calls!
