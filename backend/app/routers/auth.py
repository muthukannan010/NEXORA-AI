import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any
from app.auth import get_password_hash, verify_password, create_access_token, get_current_user
from app.database import MEMORY_DB, supabase_client

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

class RegisterRequest(BaseModel):
    email: str
    password: str
    username: Optional[str] = None
    first_name: Optional[str] = ""
    last_name: Optional[str] = ""
    full_name: Optional[str] = ""

class LoginRequest(BaseModel):
    email: Optional[str] = None
    username: Optional[str] = None
    password: str

@router.post("/register")
async def register(req: RegisterRequest):
    email_clean = req.email.strip().lower()
    username_clean = (req.username or email_clean.split("@")[0]).strip().lower()

    if not email_clean or not req.password:
        raise HTTPException(status_code=400, detail="Email and password are required")

    if len(req.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters long")

    # Check existing in memory
    for u in MEMORY_DB["users"].values():
        if u["email"].lower() == email_clean:
            raise HTTPException(status_code=400, detail="An account with this email already exists")
        if u["username"].lower() == username_clean:
            raise HTTPException(status_code=400, detail="Username is already taken")

    # Check Supabase if available
    if supabase_client:
        try:
            res = supabase_client.table("users").select("id").or_(f"email.eq.{email_clean},username.eq.{username_clean}").execute()
            if res.data and len(res.data) > 0:
                raise HTTPException(status_code=400, detail="User with this email or username already exists")
        except Exception as e:
            print(f"Supabase check user error: {e}")

    user_id = str(uuid.uuid4())
    pw_hash = get_password_hash(req.password)
    full_name = req.full_name or f"{req.first_name} {req.last_name}".strip() or username_clean

    user_obj = {
        "id": user_id,
        "username": username_clean,
        "email": email_clean,
        "password_hash": pw_hash,
        "first_name": req.first_name or "",
        "last_name": req.last_name or "",
        "full_name": full_name,
        "profile_image": f"https://api.dicebear.com/7.x/avataaars/svg?seed={username_clean}",
        "is_active": True,
        "created_at": datetime.now(timezone.utc).isoformat()
    }

    # Save memory
    MEMORY_DB["users"][user_id] = user_obj
    MEMORY_DB["profiles"][user_id] = {
        "id": str(uuid.uuid4()),
        "user_id": user_id,
        "preferred_language": "en",
        "bio": "NEXORA AI Member",
        "created_at": datetime.now(timezone.utc).isoformat()
    }

    # Save Supabase
    if supabase_client:
        try:
            supabase_client.table("users").insert(user_obj).execute()
        except Exception as e:
            print(f"Supabase insert user error: {e}")

    token = create_access_token({"sub": user_id, "email": email_clean, "username": username_clean})

    user_data = user_obj.copy()
    user_data.pop("password_hash", None)

    return {
        "status": "success",
        "message": "Account created successfully",
        "access_token": token,
        "token_type": "bearer",
        "user": user_data
    }

@router.post("/login")
async def login(req: LoginRequest):
    login_id = (req.email or req.username or "").strip().lower()
    if not login_id:
        raise HTTPException(status_code=400, detail="Email or username is required")

    target_user = None
    # Check memory DB
    for u in MEMORY_DB["users"].values():
        if u["email"].lower() == login_id or u["username"].lower() == login_id:
            target_user = u
            break

    # Check Supabase
    if not target_user and supabase_client:
        try:
            res = supabase_client.table("users").select("*").or_(f"email.eq.{login_id},username.eq.{login_id}").execute()
            if res.data and len(res.data) > 0:
                target_user = res.data[0]
        except Exception as e:
            print(f"Supabase login search error: {e}")

    if not target_user or not verify_password(req.password, target_user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email/username or password")

    token = create_access_token({"sub": target_user["id"], "email": target_user["email"], "username": target_user["username"]})

    user_data = target_user.copy()
    user_data.pop("password_hash", None)

    return {
        "status": "success",
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer",
        "user": user_data
    }

@router.get("/me")
async def get_me(current_user: Dict[str, Any] = Depends(get_current_user)):
    return {
        "status": "success",
        "user": current_user
    }

@router.post("/logout")
async def logout():
    return {"status": "success", "message": "Logged out successfully"}
