from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from app.database import MEMORY_DB

router = APIRouter(prefix="/api/diseases", tags=["Diseases"])

@router.get("")
async def get_all_diseases():
    return {"status": "success", "data": list(MEMORY_DB["skin_diseases"].values())}

@router.get("/{disease_id}")
async def get_disease_by_id(disease_id: str):
    for key, disease in MEMORY_DB["skin_diseases"].items():
        if disease["id"] == disease_id or key == disease_id:
            return {"status": "success", "data": disease}
    raise HTTPException(status_code=404, detail="Disease entry not found")

@router.get("/name/{name}")
async def get_disease_by_name(name: str):
    name_lower = name.lower()
    for disease in MEMORY_DB["skin_diseases"].values():
        if name_lower in disease["disease_name"].lower() or name_lower in disease["scientific_name"].lower():
            return {"status": "success", "data": disease}
    raise HTTPException(status_code=404, detail="Disease entry not found for given name")
