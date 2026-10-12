from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.auth import get_current_user
from app.database import MEMORY_DB

router = APIRouter(prefix="/api/plans", tags=["Plans & Subscriptions"])

class SubscribeRequest(BaseModel):
    plan_id: str

@router.get("")
async def get_plans():
    return {
        "status": "success",
        "data": MEMORY_DB["plans"]
    }

@router.post("/subscribe")
async def subscribe_plan(req: SubscribeRequest, current_user: Dict[str, Any] = Depends(get_current_user)):
    user_id = current_user["id"]
    target_plan = next((p for p in MEMORY_DB["plans"] if p["id"] == req.plan_id), None)
    
    if not target_plan:
        raise HTTPException(status_code=404, detail="Selected plan does not exist")
        
    MEMORY_DB["subscriptions"][user_id] = {
        "plan_id": target_plan["id"],
        "plan_name": target_plan["name"],
        "status": "active"
    }
    
    MEMORY_DB["scan_usage"][user_id] = {
        "used": 0,
        "limit": target_plan["monthly_scan_limit"]
    }

    return {
        "status": "success",
        "message": f"Successfully subscribed to {target_plan['name']}",
        "plan": target_plan
    }
