"""app/api/routes/blogs.py — Blog CRUD + listing + detail"""
import math
import re
from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, select, or_, desc
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.db.database import get_db
from app.models.models import Post, PostCategory, PostTag, Category, Tag, User
from app.schemas.schemas import PostDetail, PostSummary, PaginatedPosts, PostCreate, PostUpdate
from app.core.security import get_current_user_id

router = APIRouter()


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return text.strip("-")

def build_post_query():
    return (
        select(Post)
        .options(
            selectinload(Post.categories).selectinload(PostCategory.category),
            selectinload(Post.tags).selectinload(PostTag.tag),
            selectinload(Post.author),
        )
        .where(Post.status == "published")
    )

def serialize_post(post: Post) -> dict:
    data = {c.name: getattr(post, c.name) for c in post.__table__.columns}
    
    # Ensure defaults for required schema fields that might be Null in DB
    data["view_count"] = data.get("view_count") or 0
    data["is_featured"] = data.get("is_featured") or False
    data["difficulty"] = data.get("difficulty") or "beginner"
    data["meta_keywords"] = data.get("meta_keywords") or []
    
    return {
        **data,
        "categories": [pc.category for pc in post.categories if pc.category],
        "tags":       [pt.tag for pt in post.tags if pt.tag],
        "author":     post.author,
    }


@router.get("", response_model=PaginatedPosts)
async def list_posts(
    page:       int = Query(1, ge=1),
    per_page:   int = Query(12, ge=1, le=50),
    category:   Optional[str] = None,
    tag:        Optional[str] = None,
    difficulty: Optional[str] = None,
    featured:   Optional[bool] = None,
    db:         AsyncSession = Depends(get_db),
):
    q = build_post_query()

    if category:
        q = q.join(PostCategory).join(Category).where(Category.slug == category)
    if tag:
        q = q.join(PostTag).join(Tag).where(Tag.slug == tag)
    if difficulty:
        q = q.where(Post.difficulty == difficulty)
    if featured is not None:
        q = q.where(Post.is_featured == featured)

    total_q = select(func.count()).select_from(q.subquery())
    total   = (await db.execute(total_q)).scalar_one()

    posts_q = q.order_by(desc(Post.published_at)).offset((page-1)*per_page).limit(per_page)
    posts   = (await db.execute(posts_q)).scalars().all()

    return {
        "items":       [serialize_post(p) for p in posts],
        "total":       total,
        "page":        page,
        "per_page":    per_page,
        "total_pages": math.ceil(total / per_page),
    }


@router.get("/featured", response_model=list[PostSummary])
async def featured_posts(limit: int = 6, db: AsyncSession = Depends(get_db)):
    q = build_post_query().where(Post.is_featured == True).order_by(desc(Post.published_at)).limit(limit)
    posts = (await db.execute(q)).scalars().all()
    return [serialize_post(p) for p in posts]


@router.get("/{slug}", response_model=PostDetail)
async def get_post(slug: str, db: AsyncSession = Depends(get_db)):
    try:
        q = build_post_query().where(Post.slug == slug)
        post = (await db.execute(q)).scalar_one_or_none()
        if not post:
            raise HTTPException(404, "Post not found")
        
        # Temporarily disable view count update to debug 500 error
        # post.view_count = (post.view_count or 0) + 1
        # await db.commit()
        
        return serialize_post(post)
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        raise HTTPException(500, detail=str(e))


@router.post("", response_model=PostDetail, status_code=201)
async def create_post(
    body: PostCreate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    slug = body.slug or slugify(body.title)
    # Ensure slug uniqueness
    existing = (await db.execute(select(Post).where(Post.slug == slug))).scalar_one_or_none()
    if existing:
        slug = f"{slug}-2"

    post = Post(
        title=body.title, slug=slug, excerpt=body.excerpt,
        content=body.content, author_id=user_id,
        youtube_url=body.youtube_url,
        reading_time=body.reading_time or _calc_reading_time(body.content),
        difficulty=body.difficulty,
        featured_image=body.featured_image,
        meta_title=body.meta_title, meta_description=body.meta_description,
        meta_keywords=body.meta_keywords,
        status=body.status, is_featured=body.is_featured,
    )
    db.add(post)
    await db.flush()

    await _attach_categories(db, post.id, body.category_slugs)
    await _attach_tags(db, post.id, body.tag_slugs)
    await db.commit()
    await db.refresh(post)
    return serialize_post(post)


@router.put("/{slug}", response_model=PostDetail)
async def update_post(
    slug: str,
    body: PostUpdate,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    post = (await db.execute(select(Post).where(Post.slug == slug))).scalar_one_or_none()
    if not post:
        raise HTTPException(404, "Post not found")

    for field, value in body.model_dump(exclude_none=True, exclude={"category_slugs","tag_slugs"}).items():
        setattr(post, field, value)
    if body.reading_time is None and body.content:
        post.reading_time = _calc_reading_time(body.content)

    if body.category_slugs is not None:
        await db.execute(
            PostCategory.__table__.delete().where(PostCategory.post_id == post.id)
        )
        await _attach_categories(db, post.id, body.category_slugs)
    if body.tag_slugs is not None:
        await db.execute(
            PostTag.__table__.delete().where(PostTag.post_id == post.id)
        )
        await _attach_tags(db, post.id, body.tag_slugs)

    await db.commit()
    return serialize_post(post)


@router.delete("/{slug}", status_code=204)
async def delete_post(
    slug: str,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db),
):
    post = (await db.execute(select(Post).where(Post.slug == slug))).scalar_one_or_none()
    if not post:
        raise HTTPException(404, "Post not found")
    await db.delete(post)
    await db.commit()


# ─── Helpers ─────────────────────────────────────────────────────────────────

def _calc_reading_time(content: str) -> int:
    import math, re
    words = len(re.sub(r"<[^>]+>", "", content).split())
    return max(1, math.ceil(words / 200))

async def _attach_categories(db: AsyncSession, post_id: UUID, slugs: list[str]):
    for i, slug in enumerate(slugs):
        cat = (await db.execute(select(Category).where(Category.slug == slug))).scalar_one_or_none()
        if cat:
            db.add(PostCategory(post_id=post_id, category_id=cat.id, is_primary=(i==0)))

async def _attach_tags(db: AsyncSession, post_id: UUID, slugs: list[str]):
    for slug in slugs:
        tag = (await db.execute(select(Tag).where(Tag.slug == slug))).scalar_one_or_none()
        if tag:
            db.add(PostTag(post_id=post_id, tag_id=tag.id))
