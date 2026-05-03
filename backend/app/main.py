"""
SF Learners Hub — FastAPI Backend
Production-ready API with JWT auth, blog CRUD, search, admin
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware

from app.core.config import settings
from app.db.database import engine, Base
from app.api.routes import auth, blogs, categories, tags, admin, search, media

# ─── Lifespan ────────────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create tables (use Alembic in production)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Shutdown
    await engine.dispose()

# ─── App ─────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="SF Learners Hub API",
    description="Production API for SF Learners Hub — Salesforce learning platform",
    version="2.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    lifespan=lifespan,
)

# ─── Middleware ───────────────────────────────────────────────────────────────

app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routers ─────────────────────────────────────────────────────────────────

app.include_router(auth.router,       prefix="/api/auth",       tags=["Auth"])
app.include_router(blogs.router,      prefix="/api/blogs",      tags=["Blogs"])
app.include_router(categories.router, prefix="/api/categories", tags=["Categories"])
app.include_router(tags.router,       prefix="/api/tags",       tags=["Tags"])
app.include_router(search.router,     prefix="/api/search",     tags=["Search"])
app.include_router(admin.router,      prefix="/api/admin",      tags=["Admin"])
app.include_router(media.router,      prefix="/api/media",      tags=["Media"])

@app.get("/api/health")
async def health():
    return {"status": "ok", "version": "2.0.0"}
