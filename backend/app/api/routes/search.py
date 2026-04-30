"""app/api/routes/search.py"""
import math
from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, func, or_, text, desc
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.db.database import get_db
from app.models.models import Post, PostCategory, PostTag, Category, Tag
from app.schemas.schemas import PaginatedPosts

router = APIRouter()

@router.get("", response_model=PaginatedPosts)
async def search_posts(
    q:          Optional[str] = Query(None, description="Keyword search"),
    category:   Optional[str] = None,
    tag:        Optional[str] = None,
    difficulty: Optional[str] = None,
    page:       int = Query(1, ge=1),
    per_page:   int = Query(12, ge=1, le=50),
    db:         AsyncSession = Depends(get_db),
):
    base = (
        select(Post)
        .options(
            selectinload(Post.categories).selectinload(PostCategory.category),
            selectinload(Post.tags).selectinload(PostTag.tag),
            selectinload(Post.author),
        )
        .where(Post.status == "published")
    )

    if q:
        # PostgreSQL full-text search
        fts_condition = text(
            "to_tsvector('english', posts.title || ' ' || COALESCE(posts.excerpt,'') || ' ' || posts.content) "
            "@@ plainto_tsquery('english', :q)"
        ).bindparams(q=q)
        base = base.where(fts_condition)

    if category:
        base = base.join(PostCategory).join(Category).where(Category.slug == category)
    if tag:
        base = base.join(PostTag).join(Tag).where(Tag.slug == tag)
    if difficulty:
        base = base.where(Post.difficulty == difficulty)

    count_q = select(func.count()).select_from(base.subquery())
    total   = (await db.execute(count_q)).scalar_one()

    posts = (await db.execute(
        base.order_by(desc(Post.published_at)).offset((page-1)*per_page).limit(per_page)
    )).scalars().all()

    def serialize(p):
        return {
            **{c.name: getattr(p, c.name) for c in p.__table__.columns},
            "categories": [pc.category for pc in p.categories if pc.category],
            "tags":       [pt.tag for pt in p.tags if pt.tag],
            "author":     p.author,
        }

    return {
        "items":       [serialize(p) for p in posts],
        "total":       total,
        "page":        page,
        "per_page":    per_page,
        "total_pages": math.ceil(total / per_page) if total else 1,
    }
