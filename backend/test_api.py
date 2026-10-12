import sys
import io
import json
from PIL import Image
from fastapi.testclient import TestClient

from main import app

client = TestClient(app)

def test_all():
    print("=== Testing NEXORA AI Backend Endpoints ===")
    
    # 1. Health check
    res = client.get("/api/health")
    print("1. /api/health:", res.status_code, res.json())
    assert res.status_code == 200, f"Health check failed: {res.text}"
    
    # 2. Plans
    res = client.get("/api/plans")
    print("2. /api/plans:", res.status_code, len(res.json().get("data", [])))
    assert res.status_code == 200
    
    # 3. Diseases list
    res = client.get("/api/diseases")
    print("3. /api/diseases:", res.status_code, len(res.json().get("data", [])))
    assert res.status_code == 200
    
    # 4. Auth - Register
    test_user = {
        "email": f"test_user_live@nexora.health",
        "password": "Password123!",
        "full_name": "Dr. Nexora Tester"
    }
    res = client.post("/api/auth/register", json=test_user)
    print("4. /api/auth/register:", res.status_code)
    
    # If already registered or new registration:
    login_data = {
        "email": test_user["email"],
        "password": test_user["password"]
    }
    res = client.post("/api/auth/login", json=login_data)
    print("5. /api/auth/login:", res.status_code)
    assert res.status_code == 200, f"Login failed: {res.text}"
    token_info = res.json()
    token = token_info.get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    
    # 6. Profile
    res = client.get("/api/profile", headers=headers)
    print("6. /api/profile:", res.status_code, res.json().get("data", {}).get("email"))
    assert res.status_code == 200
    
    # 7. Usage
    res = client.get("/api/usage", headers=headers)
    print("7. /api/usage:", res.status_code, res.json().get("data"))
    assert res.status_code == 200
    
    # 8. Notifications
    res = client.get("/api/notifications", headers=headers)
    print("8. /api/notifications:", res.status_code)
    assert res.status_code == 200
    
    # 9. Test Image Analysis
    img = Image.new("RGB", (256, 256), color=(220, 100, 80))
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='JPEG')
    img_byte_arr.seek(0)
    
    files = {"image": ("test_skin.jpg", img_byte_arr, "image/jpeg")}
    data = {"notes": "Test skin patch scan"}
    res = client.post("/api/analyze", headers=headers, files=files, data=data)
    print("9. /api/analyze:", res.status_code, res.json().get("prediction"), res.json().get("confidence"))
    assert res.status_code == 200, f"Analyze failed: {res.text}"
    scan_id = res.json().get("scan_id")
    
    # 10. History
    res = client.get("/api/history", headers=headers)
    print("10. /api/history:", res.status_code, f"{len(res.json().get('data', []))} records")
    assert res.status_code == 200
    
    print("\nALL BACKEND TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    test_all()
