import os
import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Form
from typing import Optional, Dict, Any
from app.auth import get_optional_user, get_current_user
from app.ai_model import classifier
from app.database import MEMORY_DB, supabase_client
from app.config import settings

router = APIRouter(prefix="/api", tags=["Analysis"])

@router.post("/analyze")
@router.post("/scans/analyze")
async def analyze_skin_image(
    image: UploadFile = File(...),
    notes: Optional[str] = Form(None),
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_user)
):
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be a valid image (JPEG, PNG, WEBP).")

    contents = await image.read()
    if len(contents) > 15 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Image size exceeds maximum limit of 15MB.")

    # Save uploaded image locally
    filename = f"scan_{uuid.uuid4().hex[:10]}_{image.filename}"
    filepath = os.path.join(settings.UPLOAD_DIR, filename)
    with open(filepath, "wb") as f:
        f.write(contents)

    image_url = f"/uploads/{filename}"

    # Run PyTorch / AI feature classifier
    analysis = classifier.analyze_image_bytes(contents)

    disease_key = analysis["disease_key"]
    disease_details = MEMORY_DB["skin_diseases"].get(disease_key, MEMORY_DB["skin_diseases"]["healthy"])

    scan_id = str(uuid.uuid4())
    user_id = current_user["id"] if current_user else "anonymous"

    scan_record = {
        "id": scan_id,
        "scan_id": scan_id,
        "user_id": user_id,
        "image_url": image_url,
        "image_path": filepath,
        "prediction": analysis["prediction"],
        "predicted_condition": analysis["prediction"],
        "confidence": analysis["confidence"],
        "severity": analysis["severity"],
        "notes": notes or "",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "disease_details": disease_details,
        "metrics": analysis["metrics"]
    }

    # Store in memory DB
    MEMORY_DB["scan_history"].insert(0, scan_record)

    # Store in Supabase DB if user is logged in
    if current_user and supabase_client:
        try:
            supabase_client.table("scan_history").insert({
                "id": scan_id,
                "user_id": user_id,
                "image_url": image_url,
                "image_path": filepath,
                "predicted_condition": analysis["prediction"],
                "confidence": analysis["confidence"],
                "severity": analysis["severity"],
                "notes": notes or "",
                "prediction_data": analysis
            }).execute()
        except Exception as e:
            print(f"Supabase scan insert error: {e}")

    # Track scan usage count
    if user_id != "anonymous":
        usage = MEMORY_DB["scan_usage"].get(user_id, {"used": 0, "limit": 20})
        usage["used"] += 1
        MEMORY_DB["scan_usage"][user_id] = usage

    return {
        "status": "success",
        "scan_id": scan_id,
        "prediction": analysis["prediction"],
        "confidence": analysis["confidence"],
        "severity": analysis["severity"],
        "image_url": image_url,
        "disease_details": disease_details,
        "metrics": analysis["metrics"],
        "created_at": scan_record["created_at"]
    }
