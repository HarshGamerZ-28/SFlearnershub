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
                    
                    category_links = list(set(category_links))
                    print(f"Found {len(category_links)} category links")
                    
                    all_post_urls = []
                    
                    # Fetch each category page to find posts
                    for category_url in category_links:
                        page_url = category_url
                        while page_url:
                            try:
                                print(f"Fetching category page: {page_url[:80]}")
                                async with session.get(page_url, timeout=aiohttp.ClientTimeout(total=30)) as cat_resp:
                                    if cat_resp.status == 200:
                                        cat_html = await cat_resp.text()
                                        cat_soup = BeautifulSoup(cat_html, 'html.parser')
                                        
                                        # Find articles in category
                                        articles = cat_soup.find_all('article')
                                        print(f"  Found {len(articles)} articles on this page")
                                        
                                        for article in articles:
                                            # Get the post link (first a tag with href)
                                            link = article.find('a', href=True)
                                            if link and link['href']:
                                                all_post_urls.append(link['href'])
                                                
                                        # Handle pagination
                                        next_page = cat_soup.find('a', class_='next page-numbers')
                                        if next_page and next_page.get('href'):
                                            page_url = next_page['href']
                                            print(f"    Found next page: {page_url}")
                                        else:
                                            page_url = None
                                    else:
                                        print(f"    Failed to fetch category page: {cat_resp.status}")
                                        page_url = None
                            except Exception as e:
                                print(f"  Error fetching category: {e}")
                                page_url = None
                    
                    all_post_urls = list(set(all_post_urls))
                    print(f"\nFound {len(all_post_urls)} total unique posts to fetch")
                    
                    async with AsyncSessionLocal() as db_session:
                        for post_url in all_post_urls:
                            try:
                                # ... existing post fetching logic ...
                                # (I'll replace the loop body with more robust logic)
                                
                                print(f"\nFetching post: {post_url[:80]}")
                                async with session.get(post_url, timeout=aiohttp.ClientTimeout(total=30)) as post_resp:
                                    if post_resp.status == 200:
                                        post_html = await post_resp.text()
                                        post_soup = BeautifulSoup(post_html, 'html.parser')
                                        
                                        # ... (extraction logic) ...
                                        
                                        # Extract post data
                                        title_elem = post_soup.find('h1', class_='entry-title') or post_soup.find('h1')
                                        title = title_elem.get_text(strip=True) if title_elem else "Untitled"
                                        
                                        meta_desc = post_soup.find('meta', attrs={'name': 'description'})
                                        excerpt = meta_desc['content'][:500] if meta_desc and meta_desc.get('content') else ""
                                        if not excerpt:
                                            excerpt_elem = post_soup.find('p')
                                            excerpt = excerpt_elem.get_text(strip=True)[:500] if excerpt_elem else ""
                                        
                                        slug = (post_url.strip('/').split('/')[-1] or post_url.strip('/').split('/')[-2]).strip()
                                        
                                        # Improved image extraction
                                        img_elem = post_soup.find('img', class_='attachment-post-thumbnail') or \
                                                   post_soup.find('img', class_='wp-post-image') or \
                                                   post_soup.find('img', class_='elementor-image') or \
                                                   post_soup.find('div', class_='entry-content').find('img') if post_soup.find('div', class_='entry-content') else None
                                        
                                        featured_image = ""
                                        if img_elem and img_elem.get('src'):
                                            featured_image = img_elem['src']
                                        elif img_elem and img_elem.get('data-src'):
                                            featured_image = img_elem['data-src']
                                        
                                        # Ensure URL is absolute
                                        if featured_image and not featured_image.startswith('http'):
                                            featured_image = f"https://sflearnershub.com{featured_image}"
                                        
                                        # Fallback if still empty - find ANY image in the content
                                        if not featured_image and post_soup.find('img', src=re.compile(r'wp-content/uploads')):
                                            featured_image = post_soup.find('img', src=re.compile(r'wp-content/uploads'))['src']
                                        
                                        if not featured_image:
                                            featured_image = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                                        
                                        content_elem = post_soup.find('div', class_='entry-content') or \
                                                       post_soup.find('div', class_='elementor-widget-theme-post-content')
                                        
                                        if content_elem:
                                            for junk in content_elem.find_all(['script', 'style', 'iframe']):
                                                junk.decompose()
                                            content = str(content_elem)
                                        else:
                                            content = excerpt
                                        
                                        tags = []
                                        tag_container = post_soup.find('span', class_='tags-links')
                                        if tag_container:
                                            for tag_el in tag_container.find_all('a'):
                                                tag_name = tag_el.get_text(strip=True)
                                                tag_slug = tag_el['href'].strip('/').split('/')[-1]
                                                tags.append({'name': tag_name, 'slug': tag_slug})

                                        categories = []
                                        cat_container = post_soup.find('span', class_='cat-links') or \
                                                       post_soup.find('div', class_='entry-meta') or \
                                                       post_soup.find('footer', class_='entry-footer')
                                        category_elements = []
                                        if cat_container:
                                            category_elements = cat_container.find_all('a', href=re.compile(r'/category/'))
                                        if not category_elements:
                                            category_elements = post_soup.find_all('a', href=re.compile(r'/category/blog/'))

                                        for cat_el in category_elements:
                                            cat_name = cat_el.get_text(strip=True)
                                            href = cat_el['href'].strip('/')
                                            cat_slug = href.split('/')[-1]
                                            if cat_slug != 'blog':
                                                categories.append({'name': cat_name, 'slug': cat_slug})

                                        # Special Audit: Cross-reference classification
                                        content_lower = (title + " " + excerpt + " " + content).lower()
                                        if "lwc" in content_lower or "lightning web components" in content_lower:
                                            if not any(c['slug'] == 'lightning-web-components-lwc' for c in categories):
                                                categories.append({'name': 'Lightning Web Components (LWC)', 'slug': 'lightning-web-components-lwc'})
                                        if "apex" in content_lower or "trigger" in content_lower:
                                            if not any(c['slug'] == 'salesforce-development' for c in categories):
                                                categories.append({'name': 'Salesforce Development', 'slug': 'salesforce-development'})
                                        if "admin" in content_lower or "permission" in content_lower or "profile" in content_lower:
                                            if not any(c['slug'] == 'salesforce-administration' for c in categories):
                                                categories.append({'name': 'Salesforce Administration', 'slug': 'salesforce-administration'})
                                        if "certification" in content_lower or "exam" in content_lower:
                                            if not any(c['slug'] == 'certification-preparation-materials' for c in categories):
                                                categories.append({'name': 'Certification Preparation Materials', 'slug': 'certification-preparation-materials'})
                                            
                                        # Use a separate try-except for DB operations to handle rollbacks
                                        try:
                                            existing = await db_session.execute(
                                                sa.select(Post).where(Post.slug == slug)
                                            )
                                            post_obj = existing.scalar_one_or_none()
                                            
                                            if post_obj:
                                                print(f"  Post '{slug}' exists, updating content and categories...")
                                                post_obj.title = title[:500]
                                                post_obj.content = content
                                                post_obj.excerpt = excerpt
                                                post_obj.featured_image = featured_image
                                                # Update categories...
                                            else:
                                                post_obj = Post(
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
                                                db_session.add(post_obj)
                                                await db_session.flush()

                                            # Relationships...
                                            for cat_data in categories:
                                                cat_existing = await db_session.execute(sa.select(Category).where(Category.slug == cat_data['slug']))
                                                cat_obj = cat_existing.scalar_one_or_none()
                                                if not cat_obj:
                                                    cat_obj = Category(id=uuid.uuid4(), name=cat_data['name'], slug=cat_data['slug'], color="#5b72f0")
                                                    db_session.add(cat_obj)
                                                    await db_session.flush()
                                                
                                                rel_existing = await db_session.execute(sa.select(PostCategory).where(sa.and_(PostCategory.post_id == post_obj.id, PostCategory.category_id == cat_obj.id)))
                                                if not rel_existing.scalar_one_or_none():
                                                    db_session.add(PostCategory(post_id=post_obj.id, category_id=cat_obj.id))

                                            for tag_data in tags:
                                                tag_existing = await db_session.execute(sa.select(Tag).where(Tag.slug == tag_data['slug']))
                                                tag_obj = tag_existing.scalar_one_or_none()
                                                if not tag_obj:
                                                    tag_obj = Tag(id=uuid.uuid4(), name=tag_data['name'], slug=tag_data['slug'])
                                                    db_session.add(tag_obj)
                                                    await db_session.flush()
                                                
                                                rel_existing = await db_session.execute(sa.select(PostTag).where(sa.and_(PostTag.post_id == post_obj.id, PostTag.tag_id == tag_obj.id)))
                                                if not rel_existing.scalar_one_or_none():
                                                    db_session.add(PostTag(post_id=post_obj.id, tag_id=tag_obj.id))

                                            await db_session.commit()
                                            print(f"  [OK] Saved: {title[:50]}")
                                        except Exception as db_e:
                                            await db_session.rollback()
                                            print(f"  [DB ERROR] Failed to save '{slug}': {db_e}")
                                    else:
                                        print(f"  Failed to fetch: {post_resp.status}")
                            except Exception as e:
                                print(f"  Error: {e}")
                                continue
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


