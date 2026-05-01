import asyncio
import asyncpg
import uuid

async def seed_blogs():
    db_url = "postgresql://postgres:Harshsoni_28@db.ytieuntfceegfnoghpug.supabase.co:5432/postgres"
    conn = await asyncpg.connect(db_url)
    try:
        print("Fetching categories...")
        categories = await conn.fetch("SELECT id, slug FROM categories WHERE parent_id IS NOT NULL LIMIT 5")
        if not categories:
            print("No subcategories found. Exiting.")
            return

        print("Creating dummy tags...")
        tag_id1 = str(uuid.uuid4())
        tag_id2 = str(uuid.uuid4())
        await conn.execute("""
            INSERT INTO tags (id, name, slug) VALUES 
            ($1, 'Salesforce Basics', 'salesforce-basics'),
            ($2, 'Advanced Apex', 'advanced-apex')
            ON CONFLICT (slug) DO NOTHING;
        """, tag_id1, tag_id2)

        # Get tag ids if they already existed
        tag1 = await conn.fetchval("SELECT id FROM tags WHERE slug = 'salesforce-basics'")
        tag2 = await conn.fetchval("SELECT id FROM tags WHERE slug = 'advanced-apex'")

        print("Creating dummy user (author)...")
        user_id = str(uuid.uuid4())
        await conn.execute("""
            INSERT INTO users (id, email, username, password_hash, full_name, role) VALUES 
            ($1, 'author@example.com', 'author_one', 'hash123', 'John Doe', 'author')
            ON CONFLICT (email) DO NOTHING;
        """, user_id)
        author_id = await conn.fetchval("SELECT id FROM users WHERE email = 'author@example.com'")

        print("Creating dummy posts...")
        posts = [
            {
                "id": str(uuid.uuid4()),
                "title": "Getting Started with Salesforce Admin",
                "slug": "getting-started-salesforce-admin",
                "excerpt": "A comprehensive guide to becoming a Salesforce Administrator.",
                "content": "<h2>Introduction</h2><p>Salesforce Admin is a great career path...</p>",
                "difficulty": "beginner",
                "reading_time": 5,
                "status": "published",
                "is_featured": True,
                "cat_id": categories[0]['id'],
                "tag_id": tag1
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Mastering Apex Triggers",
                "slug": "mastering-apex-triggers",
                "excerpt": "Learn how to write efficient and bulkified Apex triggers.",
                "content": "<h2>Deep Dive into Apex</h2><p>Triggers should always be bulkified...</p>",
                "difficulty": "advanced",
                "reading_time": 10,
                "status": "published",
                "is_featured": False,
                "cat_id": categories[1]['id'],
                "tag_id": tag2
            }
        ]

        for p in posts:
            await conn.execute("""
                INSERT INTO posts (id, title, slug, excerpt, content, author_id, difficulty, reading_time, status, is_featured)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                ON CONFLICT (slug) DO NOTHING;
            """, p['id'], p['title'], p['slug'], p['excerpt'], p['content'], author_id, p['difficulty'], p['reading_time'], p['status'], p['is_featured'])

            post_id = await conn.fetchval("SELECT id FROM posts WHERE slug = $1", p['slug'])
            if post_id:
                # Link category
                await conn.execute("""
                    INSERT INTO post_categories (post_id, category_id, is_primary)
                    VALUES ($1, $2, TRUE)
                    ON CONFLICT DO NOTHING;
                """, post_id, p['cat_id'])
                # Link tag
                await conn.execute("""
                    INSERT INTO post_tags (post_id, tag_id)
                    VALUES ($1, $2)
                    ON CONFLICT DO NOTHING;
                """, post_id, p['tag_id'])

        print("Seed data inserted successfully!")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        await conn.close()

if __name__ == "__main__":
    asyncio.run(seed_blogs())
