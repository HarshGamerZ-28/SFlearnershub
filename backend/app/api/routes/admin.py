"""app/api/routes/admin.py — Admin-only stats + management"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import get_db
from app.models.models import Post, User, Category, Tag
from app.core.security import get_current_user_id

router = APIRouter()

async def require_admin_role(user_id: str = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    user = (await db.execute(select(User).where(User.id == user_id))).scalar_one_or_none()
    if not user or user.role != "admin":
        raise HTTPException(403, "Admin access required")
    return user

@router.get("/stats")
async def admin_stats(user = Depends(require_admin_role), db: AsyncSession = Depends(get_db)):
    total_posts      = (await db.execute(select(func.count()).where(Post.status == "published"))).scalar()
    draft_posts      = (await db.execute(select(func.count()).where(Post.status == "draft"))).scalar()
    total_categories = (await db.execute(select(func.count(Category.id)))).scalar()
    total_tags       = (await db.execute(select(func.count(Tag.id)))).scalar()
    total_views      = (await db.execute(select(func.sum(Post.view_count)))).scalar() or 0
    return {
        "published_posts": total_posts,
        "draft_posts":     draft_posts,
        "categories":      total_categories,
        "tags":            total_tags,
        "total_views":     total_views,
    }

@router.get("/posts")
async def admin_posts(
    page: int = 1, per_page: int = 20,
    user = Depends(require_admin_role), db: AsyncSession = Depends(get_db)
):
    import math
    posts = (await db.execute(
        select(Post).order_by(Post.created_at.desc()).offset((page-1)*per_page).limit(per_page)
    )).scalars().all()
    total = (await db.execute(select(func.count(Post.id)))).scalar()
    return {
        "items": [{"id": str(p.id), "title": p.title, "slug": p.slug, "status": p.status,
                   "difficulty": p.difficulty, "view_count": p.view_count,
                   "published_at": p.published_at, "has_youtube": bool(p.youtube_url)} for p in posts],
        "total": total,
        "total_pages": math.ceil(total / per_page),
    }
