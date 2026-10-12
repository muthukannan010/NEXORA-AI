import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "NEXORA AI - Skin Health Analyzer"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "nexora-super-secret-jwt-key-2026-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # Supabase / DB config
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")

    # Storage config
    UPLOAD_DIR: str = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "uploads")

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()

os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
