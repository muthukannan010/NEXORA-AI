from fastapi import APIRouter, Depends
from typing import Optional, Dict, Any
from app.auth import get_optional_user

router = APIRouter(prefix="/api/notifications", tags=["Notifications"])

@router.get("")
async def get_notifications(current_user: Optional[Dict[str, Any]] = Depends(get_optional_user)):
    # Standard notifications list
    return {
        "status": "success",
        "data": [
            {
                "id": "1",
                "title": "Welcome to NEXORA AI",
                "message": "Upload your first skin scan to get comprehensive AI diagnostics.",
                "type": "info",
                "created_at": "2026-10-07T12:00:00Z"
            }
        ]
    }
