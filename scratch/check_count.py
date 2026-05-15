import asyncio
import asyncpg

async def check():
    db_url = "postgresql://postgres:Harshsoni_28@db.ytieuntfceegfnoghpug.supabase.co:5432/postgres"
    conn = await asyncpg.connect(db_url)
    count = await conn.fetchval("SELECT COUNT(*) FROM posts")
    print(f"Total posts: {count}")
    await conn.close()

if __name__ == "__main__":
    asyncio.run(check())
