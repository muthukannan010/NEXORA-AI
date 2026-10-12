from fastapi import APIRouter, HTTPException, Depends
from typing import Optional, Dict, Any, List
from app.auth import get_optional_user, get_current_user
from app.database import MEMORY_DB, supabase_client

router = APIRouter(prefix="/api", tags=["Scan History"])

@router.get("/history")
@router.get("/scans/history")
async def get_history(current_user: Optional[Dict[str, Any]] = Depends(get_optional_user)):
    user_id = current_user["id"] if current_user else "anonymous"

    # Fetch from Supabase if logged in
    if current_user and supabase_client:
        try:
            res = supabase_client.table("scan_history").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
            if res.data:
                return {"status": "success", "data": res.data}
        except Exception as e:
            print(f"Supabase history query error: {e}")

    # Fallback memory search
    user_scans = [s for s in MEMORY_DB["scan_history"] if s["user_id"] == user_id or user_id == "anonymous"]
    return {"status": "success", "data": user_scans}

@router.get("/history/{scan_id}")
@router.get("/scans/detail/{scan_id}")
async def get_scan_detail(scan_id: str, current_user: Optional[Dict[str, Any]] = Depends(get_optional_user)):
    # Search memory DB first
    for scan in MEMORY_DB["scan_history"]:
        if scan["id"] == scan_id or scan.get("scan_id") == scan_id:
            return {"status": "success", "data": scan}

    # Search Supabase DB
    if supabase_client:
        try:
            res = supabase_client.table("scan_history").select("*").eq("id", scan_id).execute()
            if res.data and len(res.data) > 0:
                return {"status": "success", "data": res.data[0]}
        except Exception as e:
            print(f"Supabase scan detail query error: {e}")

    raise HTTPException(status_code=404, detail="Scan record not found")

@router.delete("/history/{scan_id}")
async def delete_scan(scan_id: str, current_user: Dict[str, Any] = Depends(get_current_user)):
    MEMORY_DB["scan_history"] = [s for s in MEMORY_DB["scan_history"] if s["id"] != scan_id]
    if supabase_client:
        try:
            supabase_client.table("scan_history").delete().eq("id", scan_id).eq("user_id", current_user["id"]).execute()
        except Exception as e:
            print(f"Supabase delete scan error: {e}")

    return {"status": "success", "message": "Scan deleted successfully"}
