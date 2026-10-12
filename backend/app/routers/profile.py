from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.auth import get_current_user
from app.database import MEMORY_DB, supabase_client

router = APIRouter(prefix="/api/profile", tags=["User Profile"])

class ProfileUpdateRequest(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    full_name: Optional[str] = None
    phone: Optional[str] = None
    bio: Optional[str] = None
    preferred_language: Optional[str] = None

@router.get("")
async def get_profile(current_user: Dict[str, Any] = Depends(get_current_user)):
    user_id = current_user["id"]
    prof = MEMORY_DB["profiles"].get(user_id, {
        "bio": "NEXORA AI Skin Health Member",
        "preferred_language": "en"
    })
    
    return {
        "status": "success",
        "user": current_user,
        "profile": prof
    }

@router.put("")
@router.post("/update")
async def update_profile(req: ProfileUpdateRequest, current_user: Dict[str, Any] = Depends(get_current_user)):
    user_id = current_user["id"]
    
    # Update user memory
    if user_id in MEMORY_DB["users"]:
        if req.first_name is not None: MEMORY_DB["users"][user_id]["first_name"] = req.first_name
        if req.last_name is not None: MEMORY_DB["users"][user_id]["last_name"] = req.last_name
        if req.full_name is not None: MEMORY_DB["users"][user_id]["full_name"] = req.full_name

    # Update profile memory
    prof = MEMORY_DB["profiles"].get(user_id, {})
    if req.phone is not None: prof["phone"] = req.phone
    if req.bio is not None: prof["bio"] = req.bio
    if req.preferred_language is not None: prof["preferred_language"] = req.preferred_language
    MEMORY_DB["profiles"][user_id] = prof

    # Update Supabase if connected
    if supabase_client:
        try:
            supabase_client.table("users").update({
                "first_name": req.first_name,
                "last_name": req.last_name,
                "full_name": req.full_name
            }).eq("id", user_id).execute()
        except Exception as e:
            print(f"Supabase user update error: {e}")

    return {
        "status": "success",
        "message": "Profile updated successfully",
        "user": MEMORY_DB["users"].get(user_id, current_user),
        "profile": prof
    }
