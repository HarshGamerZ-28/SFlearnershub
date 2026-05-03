"""app/db/database.py"""
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from app.core.config import settings
import sqlalchemy

# Create engine with different options for SQLite vs other DBs
db_url = settings.DATABASE_URL
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql+asyncpg://", 1)
elif db_url.startswith("postgresql://"):
    db_url = db_url.replace("postgresql://", "postgresql+asyncpg://", 1)

if db_url.startswith("sqlite") or "aiosqlite" in db_url:
    engine = create_async_engine(
        db_url,
        echo=settings.DEBUG,
        future=True,
    )
else:
    engine_kwargs = {}
    # If using Supabase Connection Pooler (port 6543), prepared statements MUST be disabled
    if ":6543" in db_url or "pooler.supabase" in db_url:
        engine_kwargs["connect_args"] = {
            "server_settings": {"statement_timeout": "60000"},
            "statement_cache_size": 0,
        }

    engine = create_async_engine(
        db_url,
        echo=settings.DEBUG,
        pool_size=10,
        max_overflow=20,
        pool_pre_ping=True,
        **engine_kwargs
    )

AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

class Base(DeclarativeBase):
    pass

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
