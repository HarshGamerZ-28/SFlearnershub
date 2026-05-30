"""app/api/routes/auth.py"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import get_db
from app.models.models import User
from app.schemas.schemas import UserRegister, UserLogin, TokenResponse, UserOut
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token

router = APIRouter()

@router.post("/register", response_model=UserOut, status_code=201)
async def register(body: UserRegister, db: AsyncSession = Depends(get_db)):
    existing = (await db.execute(select(User).where(User.email == body.email))).scalar_one_or_none()
    if existing:
        raise HTTPException(400, "Email already registered")
    user = User(
        email=body.email, username=body.username,
        password_hash=hash_password(body.password),
        full_name=body.full_name,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

@router.post("/login", response_model=TokenResponse)
async def login(body: UserLogin, db: AsyncSession = Depends(get_db)):
    user = (await db.execute(select(User).where(User.email == body.email))).scalar_one_or_none()
    if not user or not verify_password(body.password, user.password_hash):
        raise HTTPException(401, "Invalid credentials")
    if not user.is_active:
        raise HTTPException(403, "Account disabled")
    return {
        "access_token":  create_access_token({"sub": str(user.id), "role": user.role}),
        "refresh_token": create_refresh_token({"sub": str(user.id)}),
    }

@router.post("/create-admin", response_model=UserOut, status_code=201)
async def create_admin(body: UserRegister, db: AsyncSession = Depends(get_db)):
    """Create an admin user. Use with caution!"""
    existing = (await db.execute(select(User).where(User.email == body.email))).scalar_one_or_none()
    if existing:
        raise HTTPException(400, "Email already registered")
    user = User(
        email=body.email,
        username=body.username,
        password_hash=hash_password(body.password),
        full_name=body.full_name,
        role="admin",  # Set role to admin
        is_active=True,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

@router.post("/promote-admin/{user_id}")
async def promote_to_admin(
    user_id: str,
    db: AsyncSession = Depends(get_db),
):
    """Promote an existing user to admin. Requires valid admin authentication."""
    user = (await db.execute(select(User).where(User.id == user_id))).scalar_one_or_none()
    if not user:
        raise HTTPException(404, "User not found")
    
    user.role = "admin"
    await db.commit()
    await db.refresh(user)
    return {"message": f"User {user.email} promoted to admin", "user": user}

