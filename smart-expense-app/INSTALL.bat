@echo off
echo ========================================
echo Smart Expense App - Quick Installation
echo ========================================
echo.

echo [1/2] Installing Backend Dependencies...
cd backend
py -m pip install -r requirements.txt
if errorlevel 1 (
    echo Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..
echo Backend dependencies installed successfully!
echo.

echo [2/2] Installing Frontend Dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..
echo Frontend dependencies installed successfully!
echo.

echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo To start the application:
echo 1. Open a terminal and run: cd backend ^&^& py app.py
echo 2. Open another terminal and run: cd frontend ^&^& npm run dev
echo 3. Visit http://localhost:3000 in your browser
echo.
pause
