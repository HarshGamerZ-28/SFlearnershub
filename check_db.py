import asyncio
import sys
import os
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

# Add backend to path
sys.path.insert(0, os.path.join(os.getcwd(), 'backend'))
from app.models.models import Category, Post, PostCategory

DATABASE_URL = "postgresql+asyncpg://postgres:Harshsoni_28@db.ytieuntfceegfnoghpug.supabase.co:5432/postgres"

async def check_db():
    engine = create_async_engine(DATABASE_URL)
    AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with AsyncSessionLocal() as session:
        # Check a few posts for slugs and images
        result = await session.execute(select(Post).limit(10))
        posts = result.scalars().all()
        print(f"Checking {len(posts)} posts:")
        for p in posts:
            print(f"- Title: {p.title}")
            print(f"  Slug: {p.slug}")
            print(f"  Image: {p.featured_image}")
            print(f"  Status: {p.status}")
            print("-" * 20)
            
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(check_db())
