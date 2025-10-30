@echo off
:: Wilopo Cargo - Quick Setup Script for Windows
:: This script automates the setup process

echo ========================================
echo   Wilopo Cargo - Quick Setup
echo ========================================
echo.

:: Check Node.js
echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js found
echo.

:: Setup Backend
echo Setting up Backend...
cd server

echo Installing backend dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install backend dependencies
    cd ..
    pause
    exit /b 1
)

:: Create .env if not exists
if not exist .env (
    echo Creating .env file...
    copy .env.example .env >nul
    echo [OK] Created .env file
    echo.
    echo [IMPORTANT] Please update the following in server\.env:
    echo   1. DATABASE_URL with your PostgreSQL connection string
    echo   2. JWT_SECRET with a secure random key
    echo.
    echo To generate a secure JWT_SECRET, run:
    echo   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    echo.
    pause
)

:: Run Prisma migrations
echo.
echo Running database migrations...
call npx prisma migrate dev --name init
if errorlevel 1 (
    echo [ERROR] Database migration failed. Check your DATABASE_URL in .env
    cd ..
    pause
    exit /b 1
)

echo Generating Prisma Client...
call npx prisma generate

:: Seed database
echo Seeding database with demo data...
call node prisma/seed.js
if errorlevel 1 (
    echo [WARNING] Failed to seed database
)

echo [OK] Backend setup complete!

:: Setup Frontend
echo.
echo Setting up Frontend...
cd ..\client

echo Installing frontend dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install frontend dependencies
    cd ..
    pause
    exit /b 1
)

:: Create .env if not exists
if not exist .env (
    echo Creating .env file...
    copy .env.example .env >nul
    echo [OK] Created .env file
)

echo [OK] Frontend setup complete!

:: Final instructions
cd ..
echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo To start the application:
echo.
echo 1. Start Backend (in one terminal):
echo    cd server
echo    npm run dev
echo.
echo 2. Start Frontend (in another terminal):
echo    cd client
echo    npm run dev
echo.
echo 3. Open browser to: http://localhost:5173
echo.
echo Demo Login Credentials:
echo    Email: demo@wilopocargo.com
echo    Password: password123
echo.
echo For more information, see SETUP_GUIDE.md
echo.
pause
