"""
app/core/config.py — Application configuration via environment variables
"""
from functools import lru_cache
from typing import List, Union, Any
from pydantic_settings import BaseSettings
from pydantic import field_validator


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

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Any) -> Any:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",") if i.strip()]
        return v

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
