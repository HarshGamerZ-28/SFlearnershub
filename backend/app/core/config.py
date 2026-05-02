"""
app/core/config.py — Application configuration via environment variables
"""
from functools import lru_cache
from typing import List
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # App
    APP_NAME: str = "SF Learners Hub"
    DEBUG: bool = False
    SECRET_KEY: str = "change-me-in-production-use-256bit-random"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:Harshsoni_28@db.ytieuntfceegfnoghpug.supabase.co:5432/postgres"

    # CORS
    CORS_ORIGINS: List[str] = ["*"]

    # Media
    UPLOAD_DIR: str = "uploads"
    MAX_UPLOAD_SIZE_MB: int = 10

    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
