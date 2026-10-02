from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
import random
import time

app = FastAPI(title="NEXORA AI - Backend API")

# Configure CORS so the frontend can communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development. In production, change to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "NEXORA AI Backend is running"}

@app.post("/api/analyze")
async def analyze_image(image: UploadFile = File(...)):
    # Validate the uploaded file type
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image.")
    
    # In a real scenario, you would pass the image bytes to an ML model here.
    # For now, we simulate AI processing delay and return mock data.
    content = await image.read()
    
    # Simulate processing time
    time.sleep(2)
    
    # Mock AI model response
    conditions = [
        {"prediction": "Acne", "severity": "Moderate"},
        {"prediction": "Melanoma (Warning)", "severity": "High"},
        {"prediction": "Eczema", "severity": "Mild"},
        {"prediction": "Healthy Skin", "severity": "None"},
        {"prediction": "Psoriasis", "severity": "Moderate"}
    ]
    
    result = random.choice(conditions)
    
    return {
        "scan_id": str(uuid.uuid4()),
        "prediction": result["prediction"],
        "confidence": round(random.uniform(75.0, 99.9), 2),
        "severity": result["severity"]
    }

# --- Mock Endpoints to satisfy api.js ---

@app.get("/api/profile")
async def get_profile():
    return {"name": "Test User", "email": "test@example.com"}

@app.get("/api/history")
async def get_history():
    return []

@app.get("/api/history/{scan_id}")
async def get_scan_detail(scan_id: str):
    return {"scan_id": scan_id, "prediction": "Eczema", "severity": "Mild"}

@app.get("/api/usage")
async def get_usage():
    return {"scans_used": 5, "scans_limit": 20}

@app.get("/api/plans")
async def get_plans():
    return [
        {"id": "basic", "name": "Basic Plan", "price": 0},
        {"id": "pro", "name": "Pro Plan", "price": 10}
    ]

@app.get("/api/notifications")
async def get_notifications():
    return []
