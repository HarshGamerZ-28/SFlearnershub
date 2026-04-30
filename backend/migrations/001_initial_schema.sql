-- ============================================================
-- SF Learners Hub - Production Database Schema
-- Migration: 001_initial_schema.sql
-- Preserves all WordPress slugs and SEO structure
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For full-text search

-- ─────────────────────────────────────────────────────────────
-- USERS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE users (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email       VARCHAR(255) UNIQUE NOT NULL,
    username    VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name   VARCHAR(255),
    avatar_url  TEXT,
    role        VARCHAR(20) NOT NULL DEFAULT 'reader' CHECK (role IN ('reader', 'author', 'admin')),
    is_active   BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- CATEGORIES  (preserves full WP category hierarchy + slugs)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE categories (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        VARCHAR(255) NOT NULL,
    slug        VARCHAR(255) UNIQUE NOT NULL,   -- preserved from WP
    description TEXT,
    parent_id   UUID REFERENCES categories(id) ON DELETE SET NULL,
    wp_term_id  INTEGER,                         -- original WP term_id for migration traceability
    color       VARCHAR(7) DEFAULT '#7C3AED',    -- brand accent per category
    icon        VARCHAR(50),                     -- lucide icon name
    sort_order  INTEGER DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent ON categories(parent_id);

-- ─────────────────────────────────────────────────────────────
-- TAGS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE tags (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        VARCHAR(100) NOT NULL,
    slug        VARCHAR(100) UNIQUE NOT NULL,
    wp_term_id  INTEGER,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tags_slug ON tags(slug);

-- ─────────────────────────────────────────────────────────────
-- POSTS / BLOGS  (core migrated + new content)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE posts (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Core content
    title           VARCHAR(500) NOT NULL,
    slug            VARCHAR(500) UNIQUE NOT NULL,   -- PRESERVED from WP — never overwrite
    excerpt         TEXT,
    content         TEXT NOT NULL,                  -- full HTML body from WP

    -- Author
    author_id       UUID REFERENCES users(id) ON DELETE SET NULL,

    -- New enhanced fields
    youtube_url     TEXT,
    reading_time    INTEGER,                        -- minutes (auto-calculated or manual)
    difficulty      VARCHAR(20) DEFAULT 'beginner'
                    CHECK (difficulty IN ('beginner','intermediate','advanced')),
    featured_image  TEXT,                           -- URL (WP media URL preserved)
    thumbnail_url   TEXT,                           -- optimised thumbnail

    -- SEO (preserved from WP)
    meta_title      VARCHAR(255),
    meta_description VARCHAR(500),
    meta_keywords   TEXT[],
    canonical_url   TEXT,
    og_image        TEXT,

    -- Status & visibility
    status          VARCHAR(20) DEFAULT 'published'
                    CHECK (status IN ('draft','published','archived')),
    is_featured     BOOLEAN DEFAULT FALSE,
    view_count      INTEGER DEFAULT 0,

    -- Migration traceability
    wp_post_id      INTEGER,                        -- original WP post ID
    wp_guid         TEXT,                           -- WP GUID for dedup
    migrated_at     TIMESTAMPTZ,

    -- Timestamps
    published_at    TIMESTAMPTZ DEFAULT NOW(),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_posts_slug         ON posts(slug);
CREATE INDEX idx_posts_status       ON posts(status);
CREATE INDEX idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX idx_posts_author       ON posts(author_id);
CREATE INDEX idx_posts_difficulty   ON posts(difficulty);
CREATE INDEX idx_posts_featured     ON posts(is_featured) WHERE is_featured = TRUE;

-- Full-text search index (title + excerpt + content)
CREATE INDEX idx_posts_fts ON posts
    USING GIN(to_tsvector('english', title || ' ' || COALESCE(excerpt,'') || ' ' || content));

-- ─────────────────────────────────────────────────────────────
-- POST ↔ CATEGORY  (many-to-many)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE post_categories (
    post_id     UUID REFERENCES posts(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    is_primary  BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (post_id, category_id)
);

CREATE INDEX idx_post_categories_cat ON post_categories(category_id);

-- ─────────────────────────────────────────────────────────────
-- POST ↔ TAG  (many-to-many)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE post_tags (
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    tag_id  UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX idx_post_tags_tag ON post_tags(tag_id);

-- ─────────────────────────────────────────────────────────────
-- MEDIA  (migrated WP attachments)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE media (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename    VARCHAR(500) NOT NULL,
    original_url TEXT NOT NULL,                 -- WP original URL
    cdn_url     TEXT,                           -- future CDN path
    mime_type   VARCHAR(100),
    file_size   INTEGER,
    width       INTEGER,
    height      INTEGER,
    alt_text    TEXT,
    wp_media_id INTEGER,
    uploaded_by UUID REFERENCES users(id),
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- NEWSLETTER SUBSCRIBERS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE subscribers (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email       VARCHAR(255) UNIQUE NOT NULL,
    is_active   BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- REFRESH TOKENS  (JWT rotation)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE refresh_tokens (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
    token_hash  VARCHAR(255) UNIQUE NOT NULL,
    expires_at  TIMESTAMPTZ NOT NULL,
    revoked     BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);

-- ─────────────────────────────────────────────────────────────
-- AUTO-UPDATE updated_at trigger
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────────────────────────
-- SEED: Full category hierarchy  (mirrors live WP structure)
-- ─────────────────────────────────────────────────────────────
INSERT INTO categories (name, slug, description, color, icon, sort_order) VALUES
('Blog',                   'blog',                    'All blog posts',                                       '#7C3AED', 'BookOpen',      0),
('Salesforce Announcements','salesforce-announcements','Latest Salesforce news and announcements',            '#2563EB', 'Megaphone',     1),
('Salesforce Platform',    'salesforce-platform',     'Core Salesforce platform topics',                     '#059669', 'Layers',        2),
('Salesforce Products Overview','salesforce-products-overview','Overview of Salesforce cloud products',      '#D97706', 'Package',       3),
('Salesforce Study Resources','salesforce-study-resources','Learning and certification resources',            '#DC2626', 'GraduationCap', 4);

-- Sub-categories – Salesforce Announcements
WITH parent AS (SELECT id FROM categories WHERE slug='salesforce-announcements')
INSERT INTO categories (name, slug, description, parent_id, color, icon, sort_order)
SELECT name, slug, description, parent.id, color, icon, sort_order FROM parent,
(VALUES
    ('Salesforce Career Paths',    'salesforce-career-paths',    'Career guidance for Salesforce professionals', '#2563EB', 'TrendingUp',   0),
    ('Salesforce Events',          'salesforce-events',          'Dreamforce and other key events',             '#2563EB', 'Calendar',     1),
    ('Salesforce Tools & Tips',    'salesforce-tools-tips',      'Productivity tools and best practices',       '#2563EB', 'Wrench',       2),
    ('Salesforce Release Notes',   'salesforce-release-notes',   'Every release breakdown',                     '#2563EB', 'FileText',     3)
) AS t(name, slug, description, color, icon, sort_order);

-- Sub-categories – Salesforce Platform
WITH parent AS (SELECT id FROM categories WHERE slug='salesforce-platform')
INSERT INTO categories (name, slug, description, parent_id, color, icon, sort_order)
SELECT name, slug, description, parent.id, color, icon, sort_order FROM parent,
(VALUES
    ('Salesforce Administration',       'salesforce-administration',    'Admin tasks and configuration',           '#059669', 'Settings',       0),
    ('Salesforce Development',          'salesforce-development',       'Apex, SOQL, triggers and more',          '#059669', 'Code2',          1),
    ('Lightning Web Components (LWC)',  'lightning-web-components-lwc','Building modern LWC components',          '#059669', 'Zap',            2),
    ('Salesforce Deployment & DevOps',  'salesforce-deployment-devops','CI/CD, sandboxes, change sets',           '#059669', 'GitBranch',      3),
    ('Salesforce Integration',          'salesforce-integration',      'REST, SOAP, MuleSoft, platform events',   '#059669', 'Link2',          4)
) AS t(name, slug, description, color, icon, sort_order);

-- Sub-categories – Salesforce Products
WITH parent AS (SELECT id FROM categories WHERE slug='salesforce-products-overview')
INSERT INTO categories (name, slug, description, parent_id, color, icon, sort_order)
SELECT name, slug, description, parent.id, color, icon, sort_order FROM parent,
(VALUES
    ('Sales Cloud',           'sales-cloud',           'CRM and sales pipeline features',        '#D97706', 'BarChart2',   0),
    ('Service Cloud',         'service-cloud',         'Customer service platform',              '#D97706', 'Headphones',  1),
    ('Salesforce Omnistudio', 'salesforce-omnistudio', 'OmniStudio development',                 '#D97706', 'Layers',      2),
    ('Salesforce CPQ',        'salesforce-cpq',        'Configure Price Quote',                  '#D97706', 'DollarSign',  3),
    ('Marketing Cloud',       'marketing-cloud',       'Email and journey builder',              '#D97706', 'Mail',        4)
) AS t(name, slug, description, color, icon, sort_order);

-- Sub-categories – Study Resources
WITH parent AS (SELECT id FROM categories WHERE slug='salesforce-study-resources')
INSERT INTO categories (name, slug, description, parent_id, color, icon, sort_order)
SELECT name, slug, description, parent.id, color, icon, sort_order FROM parent,
(VALUES
    ('Certification Preparation Materials', 'certification-preparation-materials', 'Exam prep guides',              '#DC2626', 'Award',        0),
    ('Interview Questions & Answers',       'interview-questions-answers',         'Top interview Q&A',             '#DC2626', 'MessageSquare',1),
    ('Mock Tests / Quizzes',                'mock-tests-quizzes',                  'Practice exams',                '#DC2626', 'ClipboardCheck',2),
    ('Real-World Projects',                 'real-world-projects',                 'Hands-on project walkthroughs', '#DC2626', 'Briefcase',    3),
    ('Practice Questions',                  'practice-questions',                  'Topic-wise practice sets',      '#DC2626', 'HelpCircle',   4)
) AS t(name, slug, description, color, icon, sort_order);
