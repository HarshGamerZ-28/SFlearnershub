
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from app.core.security import hash_password

db_url = 'postgresql+asyncpg://postgres.ytieuntfceegfnoghpug:Harshsoni_28@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres'

async def main():
    engine = create_async_engine(db_url, connect_args={'statement_cache_size': 0})
    Session = sessionmaker(engine, class_=AsyncSession)
    async with Session() as session:
        pwd = hash_password('Harshsoni_28')
        await session.execute(text('UPDATE users SET password_hash=:p, role=:r WHERE email=:e'), {'p': pwd, 'r': 'admin', 'e': 'admin@sflearnershub.com'})
        await session.commit()
        print('Password updated!')

asyncio.run(main())

