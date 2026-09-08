@echo off
set "ROOT=%~dp0"
echo ========================================
echo Starting Maruthuvan Application
echo ========================================
echo.

echo [1/2] Starting Backend Server (Port 5000)...
start "Maruthuvan Backend" /D "%ROOT%backend" cmd /k npm start
timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend (Port 3000)...
start "Maruthuvan Frontend" /D "%ROOT%frontend" cmd /k npm run dev

echo.
echo ========================================
echo ✅ Application Started!
echo ========================================
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause >nul
