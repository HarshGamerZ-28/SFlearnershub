"""
Web scraper to fetch blog content from sflearnershub.com and populate the database
"""
import asyncio
import aiohttp
from bs4 import BeautifulSoup
from datetime import datetime as dt
import uuid
import sqlalchemy as sa
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
import sys
import os
import re

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from app.models.models import Base, User, Category, Tag, Post, PostCategory, PostTag

# Database connection
DATABASE_URL = "postgresql+asyncpg://postgres:Harshsoni_28@db.ytieuntfceegfnoghpug.supabase.co:5432/postgres"

async def scrape_blogs():
    """Scrape blogs from sflearnershub.com"""
    engine = create_async_engine(DATABASE_URL, echo=False)
    
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    # Create default user and get admin user ID
    async with AsyncSessionLocal() as session:
        existing_user = await session.execute(
            sa.select(User).where(User.email == "admin@sflearnershub.com")
        )
        admin_user = existing_user.scalar_one_or_none()
        
        if not admin_user:
            admin_user = User(
                id=uuid.uuid4(),
                email="admin@sflearnershub.com",
                username="admin",
                password_hash="placeholder",
                full_name="SF Learners Hub",
                role="admin",
                is_active=True
            )
            session.add(admin_user)
            await session.commit()
            print(f"Created admin user: {admin_user.id}")
        else:
            print(f"Admin user already exists: {admin_user.id}")
    
    # Scrape from the website
    print("Starting to scrape sflearnershub.com...")
    
    try:
        async with aiohttp.ClientSession() as session:
            # Fetch main page to get category links
            print("Fetching home page...")
            async with session.get("https://sflearnershub.com/", timeout=aiohttp.ClientTimeout(total=30)) as resp:
                if resp.status == 200:
                    html = await resp.text()
                    soup = BeautifulSoup(html, 'html.parser')
                    
                    # Find category links
                    category_links = []
                    for link in soup.find_all('a', href=True):
                        href = link['href']
                        if '/category/blog/' in href:
                            category_links.append(href)
                    
                    category_links = list(set(category_links))[:5]  # Limit to 5 categories
                    print(f"Found {len(category_links)} category links")
                    
                    all_post_urls = []
                    
                    # Fetch each category page to find posts
                    for category_url in category_links:
                        try:
                            print(f"Fetching category: {category_url[:80]}")
                            async with session.get(category_url, timeout=aiohttp.ClientTimeout(total=30)) as cat_resp:
                                if cat_resp.status == 200:
                                    cat_html = await cat_resp.text()
                                    cat_soup = BeautifulSoup(cat_html, 'html.parser')
                                    
                                    # Find articles in category
                                    articles = cat_soup.find_all('article')
                                    print(f"  Found {len(articles)} articles in category")
                                    
                                    for article in articles:
                                        # Get the post link (first a tag with href)
                                        link = article.find('a', href=True)
                                        if link and link['href']:
                                            all_post_urls.append(link['href'])
                        except Exception as e:
                            print(f"  Error fetching category: {e}")
                    
                    all_post_urls = list(set(all_post_urls))[:15]  # Limit to 15 posts
                    print(f"\nFound {len(all_post_urls)} total posts to fetch")
                    
                    async with AsyncSessionLocal() as db_session:
                        for post_url in all_post_urls:
                            try:
                                print(f"\nFetching post: {post_url[:80]}")
                                async with session.get(post_url, timeout=aiohttp.ClientTimeout(total=30)) as post_resp:
                                    if post_resp.status == 200:
                                        post_html = await post_resp.text()
                                        post_soup = BeautifulSoup(post_html, 'html.parser')
                                        
                                        # Extract post data
                                        title_elem = post_soup.find('h1', class_='entry-title') or post_soup.find('h1')
                                        title = title_elem.get_text(strip=True) if title_elem else "Untitled"
                                        
                                        # Get excerpt from meta description
                                        meta_desc = post_soup.find('meta', attrs={'name': 'description'})
                                        excerpt = meta_desc['content'][:500] if meta_desc and meta_desc.get('content') else ""
                                        
                                        if not excerpt:
                                            excerpt_elem = post_soup.find('p')
                                            excerpt = excerpt_elem.get_text(strip=True)[:500] if excerpt_elem else ""
                                        
                                        # Get slug from URL
                                        slug = post_url.strip('/').split('/')[-1] or post_url.strip('/').split('/')[-2]
                                        
                                        # Get featured image
                                        img_elem = post_soup.find('img', class_='attachment-post-thumbnail') or post_soup.find('img', class_='wp-post-image')
                                        featured_image = img_elem['src'] if img_elem and img_elem.get('src') else ""
                                        
                                        # Get full content
                                        content_elem = post_soup.find('div', class_='entry-content')
                                        content = content_elem.get_text(strip=True)[:2000] if content_elem else excerpt
                                        
                                        # Check if post already exists
                                        existing = await db_session.execute(
                                            sa.select(Post).where(Post.slug == slug)
                                        )
                                        if existing.scalar_one_or_none():
                                            print(f"  Post '{slug}' already exists, skipping...")
                                            continue
                                        
                                        # Create post
                                        post = Post(
                                            id=uuid.uuid4(),
                                            title=title[:500],
                                            slug=slug[:500],
                                            excerpt=excerpt,
                                            content=content,
                                            author_id=admin_user.id,
                                            featured_image=featured_image,
                                            difficulty="beginner",
                                            status="published",
                                            is_featured=False,
                                            view_count=0,
                                            meta_keywords=[],
                                            published_at=dt.utcnow(),
                                        )
                                        db_session.add(post)
                                        await db_session.flush()
                                        print(f"  [OK] Created: {title[:50]}")
                                    else:
                                        print(f"  Failed to fetch: {post_resp.status}")
                            except Exception as e:
                                print(f"  Error: {e}")
                                continue
                        
                        await db_session.commit()
                        print("\n[SUCCESS] Committed all posts to database")
                else:
                    print(f"Failed to fetch home page: {resp.status}")
    
    except Exception as e:
        print(f"Error during scraping: {e}")
        import traceback
        traceback.print_exc()
    
    finally:
        await engine.dispose()
        print("Scraping complete!")

if __name__ == "__main__":
    asyncio.run(scrape_blogs())


