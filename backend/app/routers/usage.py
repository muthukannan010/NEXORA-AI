from fastapi import APIRouter, Depends
from typing import Optional, Dict, Any
from app.auth import get_optional_user
from app.database import MEMORY_DB

router = APIRouter(prefix="/api/usage", tags=["Usage"])

@router.get("")
async def get_usage(current_user: Optional[Dict[str, Any]] = Depends(get_optional_user)):
    user_id = current_user["id"] if current_user else "anonymous"
    usage_data = MEMORY_DB["scan_usage"].get(user_id, {"used": 0, "limit": 5})
    
    return {
        "status": "success",
        "scans_used": usage_data.get("used", 0),
        "scans_limit": usage_data.get("limit", 5),
        "remaining": max(0, usage_data.get("limit", 5) - usage_data.get("used", 0))
    }
