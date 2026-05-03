"""
app/core/config.py — Application configuration via environment variables
"""
from functools import lru_cache
from typing import List, Union, Any
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
    CORS_ORIGINS: str = "*"

    @property
    def cors_origins_list(self) -> List[str]:
        raw = self.CORS_ORIGINS.strip()
        # Handle cases where it's wrapped in brackets like ["a", "b"]
        if raw.startswith("[") and raw.endswith("]"):
            import json
            try:
                return json.loads(raw)
            except Exception:
                # If JSON fails, strip brackets and try comma split
                raw = raw[1:-1]
        
        # Split by comma and strip quotes/whitespace from each item
        origins = []
        for item in raw.split(","):
            clean_item = item.strip().strip("'").strip('"')
            if clean_item:
                origins.append(clean_item)
        return origins

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
