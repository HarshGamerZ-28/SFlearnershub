#!/usr/bin/env python3
"""
Script to create an admin user for SF Learners Hub.
Usage: python create_admin.py <email> <username> <password> <full_name>
"""

import asyncio
import sys
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select

# Add app to path
sys.path.insert(0, '/app' if '/app' in sys.argv[0] else 'e:\\SFlearnershub\\backend')

from app.models.models import User, Base
from app.core.config import settings
from app.core.security import hash_password


async def create_admin():
    """Create an admin user in the database"""
    
    if len(sys.argv) < 5:
        print("Usage: python create_admin.py <email> <username> <password> <full_name>")
        print("Example: python create_admin.py admin@example.com admin mypassword 'Admin User'")
        sys.exit(1)
    
    email = sys.argv[1]
    username = sys.argv[2]
    password = sys.argv[3]
    full_name = sys.argv[4]
    
    # Create async engine
    engine = create_async_engine(settings.DATABASE_URL, echo=False)
    
    try:
        # Create tables if they don't exist
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        
        # Create session
        async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
        
        async with async_session() as session:
            # Check if user already exists
            existing = (await session.execute(
                select(User).where(User.email == email)
            )).scalar_one_or_none()
            
            if existing:
                print(f"❌ Error: User with email '{email}' already exists")
                sys.exit(1)
            
            # Create admin user
            admin_user = User(
                email=email,
                username=username,
                password_hash=hash_password(password),
                full_name=full_name,
                role="admin",
                is_active=True,
            )
            
            session.add(admin_user)
            await session.commit()
            await session.refresh(admin_user)
            
            print(f"\n✅ Admin user created successfully!")
            print(f"   Email: {email}")
            print(f"   Username: {username}")
            print(f"   Full Name: {full_name}")
            print(f"   Role: admin")
            print(f"   Status: active")
            print(f"   User ID: {admin_user.id}")
            print(f"\nYou can now log in at: https://sflearnershub.com/auth/login")
    
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        sys.exit(1)
    
    finally:
        await engine.dispose()


if __name__ == "__main__":
    asyncio.run(create_admin())
