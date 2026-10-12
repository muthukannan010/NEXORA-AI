import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.config import settings
from app.routers import auth, analyze, history, disease, profile, usage, plans, notifications

app = FastAPI(
    title=settings.APP_NAME,
    description="NEXORA AI — AI Skin Health Analyzer Backend API",
    version="2.4.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure upload directory exists and mount static files
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Include Routers
app.include_router(auth.router)
app.include_router(analyze.router)
app.include_router(history.router)
app.include_router(disease.router)
app.include_router(profile.router)
app.include_router(usage.router)
app.include_router(plans.router)
app.include_router(notifications.router)

@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "app": settings.APP_NAME,
        "version": "2.4.0",
        "message": "NEXORA AI Backend API is fully operational"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
