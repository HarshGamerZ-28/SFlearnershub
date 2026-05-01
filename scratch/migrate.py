import asyncio
import asyncpg
import os

async def run_migration():
    db_url = "postgresql://postgres:Harshsoni_28@db.ytieuntfceegfnoghpug.supabase.co:5432/postgres"
    sql_path = "backend/migrations/001_initial_schema.sql"
    
    print(f"Connecting to database...")
    conn = await asyncpg.connect(db_url)
    try:
        print(f"Reading SQL file: {sql_path}")
        with open(sql_path, "r", encoding="utf-8") as f:
            sql = f.read()
        
        print("Executing migration...")
        await conn.execute(sql)
        print("Migration successful!")
    except Exception as e:
        print(f"Migration failed: {e}")
    finally:
        await conn.close()

if __name__ == "__main__":
    asyncio.run(run_migration())
