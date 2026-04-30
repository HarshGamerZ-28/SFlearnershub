"""app/api/routes/categories.py"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import get_db
from app.models.models import Category
from app.schemas.schemas import CategoryOut

router = APIRouter()

@router.get("", response_model=list[CategoryOut])
async def list_categories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Category)
        .where(Category.parent_id == None)
        .options(selectinload(Category.children))
        .order_by(Category.sort_order)
    )
    return result.scalars().all()

@router.get("/{slug}", response_model=CategoryOut)
async def get_category(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Category).where(Category.slug == slug).options(selectinload(Category.children))
    )
    cat = result.scalar_one_or_none()
    if not cat:
        raise HTTPException(404, "Category not found")
    return cat
