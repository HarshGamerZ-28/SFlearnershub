import asyncio
import asyncpg

async def reset_db():
    db_url = "postgresql://postgres:Harshsoni_28@db.ytieuntfceegfnoghpug.supabase.co:5432/postgres"
    conn = await asyncpg.connect(db_url)
    try:
        print("Dropping public schema...")
        await conn.execute("DROP SCHEMA public CASCADE; CREATE SCHEMA public;")
        print("Running initial schema sql...")
        with open("backend/migrations/001_initial_schema.sql", "r", encoding="utf-8") as f:
            sql = f.read()
        await conn.execute(sql)
        print("Migration successful!")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        await conn.close()

if __name__ == "__main__":
    asyncio.run(reset_db())
