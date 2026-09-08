# Fix: OTP Connection Error

## ✅ Quick Fix

The backend is working! The issue is the **frontend is not running**.

### Start Both Backend & Frontend:

```cmd
cd MR
start-app.bat
```

OR manually:

**Terminal 1 - Backend:**
```cmd
cd MR\backend
node server.js
```

**Terminal 2 - Frontend:**
```cmd
cd MR\frontend
npm run dev
```

## ✅ Verified Working

Backend OTP endpoint tested successfully:
```
✅ POST http://localhost:5000/api/auth/send-otp
Response: {"message":"OTP அனுப்பப்பட்டது","mobile":"9876543210","otp":"600711"}
```

## 🔍 Access URLs

- **Frontend**: http://localhost:3000 or http://localhost:3001
- **Backend**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health-check

## ⚠️ Common Issues

### 1. "Cannot connect to server"
**Cause**: Backend not running
**Fix**: Run `node server.js` in backend folder

### 2. "CORS error"
**Cause**: Frontend running on different port
**Fix**: Already fixed - backend now accepts both port 3000 and 3001

### 3. "MongoDB connection error"
**Cause**: MongoDB not running
**Fix**: Run `net start MongoDB`

## 🧪 Test Backend Directly

```cmd
curl -X POST http://localhost:5000/api/auth/send-otp -H "Content-Type: application/json" -d "{\"mobile\":\"9876543210\",\"language\":\"ta\"}"
```

Expected response:
```json
{"message":"OTP அனுப்பப்பட்டது","mobile":"9876543210","otp":"123456"}
```
