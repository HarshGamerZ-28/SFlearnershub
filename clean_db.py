import asyncio
import sys
import os
import re
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

# Add backend to path
sys.path.insert(0, os.path.join(os.getcwd(), 'backend'))
from app.models.models import Post

DATABASE_URL = "postgresql+asyncpg://postgres:Harshsoni_28@db.ytieuntfceegfnoghpug.supabase.co:5432/postgres"

def slugify(text):
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return text.strip("-")

async def clean_db():
    engine = create_async_engine(DATABASE_URL)
    AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(Post))
        posts = result.scalars().all()
        print(f"Cleaning {len(posts)} posts...")
        
        for p in posts:
            new_title = p.title.strip()
            new_slug = slugify(new_title)
            
            # If it's a master guide, keep the prefix
            if p.slug.startswith('master-guide-'):
                guide_slug = p.slug.replace('master-guide-', '').strip()
                new_slug = f"master-guide-{slugify(guide_slug)}"

            if p.title != new_title or p.slug != new_slug:
                print(f"Updating: '{p.slug}' -> '{new_slug}'")
                p.title = new_title
                p.slug = new_slug
        
        await session.commit()
        print("Done cleaning database.")
            
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(clean_db())
