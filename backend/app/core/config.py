"""
app/core/config.py — Application configuration via environment variables
"""
from functools import lru_cache
from typing import List, Union, Any
from pydantic import field_validator
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
    DATABASE_URL: str = ""

    @field_validator("DATABASE_URL", mode="before")
    @classmethod
    def validate_database_url(cls, v: str) -> str:
        """Validate DATABASE_URL is set and not empty"""
        if not v or not v.strip():
            raise ValueError(
                "DATABASE_URL environment variable is not set. "
                "Please set it to a valid PostgreSQL connection string. "
                "Example: postgresql+asyncpg://user:password@host:5432/dbname"
            )
        return v

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
