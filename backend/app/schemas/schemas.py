"""app/schemas/schemas.py — Pydantic v2 request/response schemas"""
from datetime import datetime
from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr, HttpUrl, field_validator


# ─── Auth ────────────────────────────────────────────────────────────────────

class UserRegister(BaseModel):
    email: EmailStr
    username: str
    password: str
    full_name: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class UserOut(BaseModel):
    id: UUID
    email: str
    username: str
    full_name: Optional[str]
    avatar_url: Optional[str]
    role: str
    class Config:
        from_attributes = True


# ─── Category ────────────────────────────────────────────────────────────────

class CategoryOut(BaseModel):
    id: UUID
    name: str
    slug: str
    description: Optional[str]
    parent_id: Optional[UUID]
    color: str
    icon: Optional[str]
    sort_order: int
    children: Optional[List["CategoryOut"]] = []
    class Config:
        from_attributes = True

CategoryOut.model_rebuild()


# ─── Tag ─────────────────────────────────────────────────────────────────────

class TagOut(BaseModel):
    id: UUID
    name: str
    slug: str
    class Config:
        from_attributes = True


# ─── Post ────────────────────────────────────────────────────────────────────

class PostCreate(BaseModel):
    title: str
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: str
    youtube_url: Optional[str] = None
    reading_time: Optional[int] = None
    difficulty: str = "beginner"
    featured_image: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    meta_keywords: Optional[List[str]] = []
    status: str = "published"
    is_featured: bool = False
    category_slugs: List[str] = []
    tag_slugs: List[str] = []

class PostUpdate(PostCreate):
    title: Optional[str] = None
    content: Optional[str] = None

class PostSummary(BaseModel):
    id: UUID
    title: str
    slug: str
    excerpt: Optional[str]
    featured_image: Optional[str]
    reading_time: Optional[int]
    difficulty: str
    published_at: datetime
    view_count: int
    is_featured: bool
    youtube_url: Optional[str]
    categories: List[CategoryOut] = []
    tags: List[TagOut] = []
    author: Optional[UserOut]
    class Config:
        from_attributes = True

class PostDetail(PostSummary):
    content: str
    meta_title: Optional[str]
    meta_description: Optional[str]
    meta_keywords: Optional[List[str]]
    canonical_url: Optional[str]
    og_image: Optional[str]


# ─── Pagination ──────────────────────────────────────────────────────────────

class PaginatedPosts(BaseModel):
    items: List[PostSummary]
    total: int
    page: int
    per_page: int
    total_pages: int


# ─── Search ──────────────────────────────────────────────────────────────────

class SearchQuery(BaseModel):
    q: Optional[str] = None
    category: Optional[str] = None
    tag: Optional[str] = None
    difficulty: Optional[str] = None
    page: int = 1
    per_page: int = 12
