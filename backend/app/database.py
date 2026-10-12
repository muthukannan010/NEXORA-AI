import os
import uuid
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
from app.config import settings

# In-memory storage for standalone fallback mode
MEMORY_DB = {
    "users": {},
    "profiles": {},
    "skin_diseases": {
        "acne": {
            "id": "10000000-0000-0000-0000-000000000001",
            "disease_name": "Acne Vulgaris",
            "scientific_name": "Acne vulgaris",
            "category": "Inflammatory Skin Disease",
            "description": "Acne is a skin condition that occurs when your hair follicles become plugged with oil and dead skin cells.",
            "severity": "Mild",
            "symptoms": ["Blackheads and whiteheads", "Pimples", "Painful nodules under skin"],
            "possible_causes": ["Excess oil production", "Clogged hair follicles", "Bacteria"],
            "risk_factors": ["Hormonal changes", "Certain medications", "Stress"],
            "supportive_care": ["Wash gently twice daily", "Avoid picking lesions", "Use non-comedogenic skincare"],
            "medical_information": "Topical retinoids and benzoyl peroxide are standard treatments for acne vulgaris.",
            "prevention": ["Cleanse gently after sweating", "Keep hands off face"],
            "foods_to_consider": ["Zinc-rich foods", "Omega-3 fatty acids", "Green tea"],
            "foods_to_limit": ["High glycemic index foods", "Skim milk"],
            "when_to_see_doctor": "Consult a dermatologist if acne persists or causes emotional distress.",
            "emergency_warning_signs": ["Rapidly spreading redness and swelling", "High fever"]
        },
        "eczema": {
            "id": "10000000-0000-0000-0000-000000000002",
            "disease_name": "Eczema (Atopic Dermatitis)",
            "scientific_name": "Atopic dermatitis",
            "category": "Allergic / Inflammatory",
            "description": "Eczema is a condition that causes dry, itchy and inflamed skin.",
            "severity": "Moderate",
            "symptoms": ["Dry, cracked skin", "Severe itchiness", "Red to dark brown patches"],
            "possible_causes": ["Skin barrier dysfunction", "Immune dysregulation", "Environmental triggers"],
            "risk_factors": ["Family history of allergies/asthma", "Cold environments"],
            "supportive_care": ["Moisturize twice daily", "Take short warm showers", "Use fragrance-free cleansers"],
            "medical_information": "Topical corticosteroids and moisturizers form the backbone of eczema management.",
            "prevention": ["Avoid known allergens", "Keep humidity comfortable"],
            "foods_to_consider": ["Anti-inflammatory foods", "Probiotic foods"],
            "foods_to_limit": ["Processed foods", "Known food allergens"],
            "when_to_see_doctor": "See a doctor if eczema disrupts sleep or shows signs of infection.",
            "emergency_warning_signs": ["Widespread fluid blisters", "High fever with sudden redness"]
        },
        "melanoma": {
            "id": "10000000-0000-0000-0000-000000000003",
            "disease_name": "Melanoma",
            "scientific_name": "Malignant melanoma",
            "category": "Neoplastic / Skin Cancer",
            "description": "Melanoma is the most serious type of skin cancer. Early detection is critical.",
            "severity": "High",
            "symptoms": ["Asymmetrical mole shape", "Irregular borders", "Varied colors", "Diameter > 6mm", "Evolving lesion"],
            "possible_causes": ["UV radiation exposure damaging skin cell DNA"],
            "risk_factors": ["Fair skin", "History of blistering sunburns", "Many moles", "Family history"],
            "supportive_care": ["Immediate evaluation by a certified dermatologist"],
            "medical_information": "Surgical biopsy and wide local excision are standard primary treatments.",
            "prevention": ["Apply SPF 30+ daily", "Avoid peak sun hours", "Never use tanning beds"],
            "foods_to_consider": ["Antioxidant-rich foods", "Vitamin D rich foods"],
            "foods_to_limit": ["Ultra-processed foods", "Alcohol"],
            "when_to_see_doctor": "Consult a doctor immediately if you notice ABCDE mole changes.",
            "emergency_warning_signs": ["Rapidly growing bleeding lesion", "Swollen lymph nodes near mole"]
        },
        "psoriasis": {
            "id": "10000000-0000-0000-0000-000000000004",
            "disease_name": "Psoriasis",
            "scientific_name": "Psoriasis vulgaris",
            "category": "Autoimmune / Chronic Inflammatory",
            "description": "Psoriasis causes itchy, scaly patches, most commonly on knees, elbows, trunk and scalp.",
            "severity": "Moderate",
            "symptoms": ["Red patches covered with silvery scales", "Dry cracked skin", "Itching or burning"],
            "possible_causes": ["Autoimmune overproduction of skin cells"],
            "risk_factors": ["Family history", "Stress", "Smoking", "Alcohol"],
            "supportive_care": ["Apply heavy moisturizing ointments", "Controlled brief sun exposure"],
            "medical_information": "Topical steroids, vitamin D analogues, and biologics are effective options.",
            "prevention": ["Manage stress", "Avoid skin injuries"],
            "foods_to_consider": ["Omega-3 rich fish", "Turmeric and green vegetables"],
            "foods_to_limit": ["Red meat and alcohol"],
            "when_to_see_doctor": "Consult a doctor if psoriasis causes severe discomfort or joint pain.",
            "emergency_warning_signs": ["Widespread pustules with high fever", "Full body redness with chills"]
        },
        "healthy": {
            "id": "10000000-0000-0000-0000-000000000005",
            "disease_name": "Healthy Skin",
            "scientific_name": "Cutis sana",
            "category": "Normal Condition",
            "description": "The skin appears healthy with no visible signs of clinical skin disease or infection.",
            "severity": "None",
            "symptoms": ["Even skin texture and tone", "No active rashes or abnormal lesions"],
            "possible_causes": ["Normal physiological skin barrier function"],
            "risk_factors": ["None"],
            "supportive_care": ["Maintain balanced daily skincare routine with cleanser and SPF 30+"],
            "medical_information": "Healthy skin maintains barrier integrity and immune protection.",
            "prevention": ["Daily SPF application", "Gentle cleansing"],
            "foods_to_consider": ["Hydrating foods", "Fresh fruits and healthy fats"],
            "foods_to_limit": ["Excessive alcohol", "High sugar diet"],
            "when_to_see_doctor": "Perform regular monthly self-exams and routine annual skin checks.",
            "emergency_warning_signs": ["Any newly appearing or changing spot should be evaluated"]
        }
    },
    "scan_history": [],
    "plans": [
        {
            "id": "basic",
            "name": "Free Plan",
            "description": "Basic skin analysis with monthly limits",
            "price": 0,
            "currency": "USD",
            "monthly_scan_limit": 5,
            "features": ["5 Scans per month", "Standard AI Analysis", "Basic History"]
        },
        {
            "id": "pro",
            "name": "Pro Plan",
            "description": "Unlimited scan health analyzer for individuals",
            "price": 19.99,
            "currency": "USD",
            "monthly_scan_limit": 50,
            "features": ["50 Scans per month", "Advanced AI Analysis", "Full Medical Info", "Export Detailed Report"]
        }
    ],
    "subscriptions": {},
    "scan_usage": {},
    "notifications": []
}

# Supabase Client Initialization (if URL & Key are available)
supabase_client = None
if settings.SUPABASE_URL and settings.SUPABASE_KEY:
    try:
        from supabase import create_client
        supabase_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        print("[NEXORA AI] Supabase client initialized successfully.")
    except Exception as e:
        print(f"[NEXORA AI] Supabase client initialization warning: {e}. Falling back to in-memory store.")
else:
    print("[NEXORA AI] Supabase credentials not found in env. Running in standalone local database mode.")

def get_db():
    """Return database interface"""
    return MEMORY_DB
