from datetime import datetime, timedelta, timezone
from typing import Optional, Dict, Any
import jwt
import bcrypt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.config import settings
from app.database import MEMORY_DB, supabase_client

security = HTTPBearer(auto_error=False)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        pw_bytes = plain_password.encode('utf-8')[:72]
        hash_bytes = hashed_password.encode('utf-8')
        return bcrypt.checkpw(pw_bytes, hash_bytes)
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    pw_bytes = password.encode('utf-8')[:72]
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pw_bytes, salt).decode('utf-8')

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except Exception:
        return None

async def get_current_user(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> Dict[str, Any]:
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token is missing",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = credentials.credentials
    payload = decode_access_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user_id = payload.get("sub")
    
    # Check Supabase first if available
    if supabase_client:
        try:
            res = supabase_client.table("users").select("*").eq("id", user_id).execute()
            if res.data and len(res.data) > 0:
                user = res.data[0]
                user.pop("password_hash", None)
                return user
        except Exception as e:
            print(f"Supabase auth lookup error: {e}")
            
    # Check memory fallback
    if user_id in MEMORY_DB["users"]:
        user = MEMORY_DB["users"][user_id].copy()
        user.pop("password_hash", None)
        return user
        
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="User account not found",
        headers={"WWW-Authenticate": "Bearer"},
    )

async def get_optional_user(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> Optional[Dict[str, Any]]:
    if not credentials:
        return None
    try:
        return await get_current_user(credentials)
    except HTTPException:
        return None
