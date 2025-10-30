# Wilopo Cargo - Quick Setup Script for Windows
# This script automates the setup process

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Wilopo Cargo - Quick Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Setup Backend
Write-Host ""
Write-Host "Setting up Backend..." -ForegroundColor Yellow
Set-Location server

# Install dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
npm install

# Create .env if not exists
if (-not (Test-Path .env)) {
    Write-Host "Creating .env file..." -ForegroundColor Cyan
    Copy-Item .env.example .env
    Write-Host "✓ Created .env file. Please update DATABASE_URL and JWT_SECRET" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To generate a secure JWT_SECRET, run:" -ForegroundColor Yellow
    Write-Host "  node -e `"console.log(require('crypto').randomBytes(32).toString('hex'))`"" -ForegroundColor White
    Write-Host ""
    
    $continue = Read-Host "Press Enter when you've updated the .env file"
}

# Check if DATABASE_URL is set
$envContent = Get-Content .env -Raw
if ($envContent -match 'DATABASE_URL="postgresql://user:password@localhost:5432/wilopo_db"') {
    Write-Host ""
    Write-Host "⚠️  WARNING: Please update DATABASE_URL in .env file with your actual database credentials" -ForegroundColor Yellow
    Write-Host ""
    $dbContinue = Read-Host "Press Enter to continue (or Ctrl+C to exit and update .env)"
}

# Run Prisma migrations
Write-Host ""
Write-Host "Running database migrations..." -ForegroundColor Cyan
npx prisma migrate dev --name init

Write-Host "Generating Prisma Client..." -ForegroundColor Cyan
npx prisma generate

# Seed database
Write-Host "Seeding database with demo data..." -ForegroundColor Cyan
node prisma/seed.js

Write-Host "✓ Backend setup complete!" -ForegroundColor Green

# Setup Frontend
Write-Host ""
Write-Host "Setting up Frontend..." -ForegroundColor Yellow
Set-Location ../client

Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
npm install

# Create .env if not exists
if (-not (Test-Path .env)) {
    Write-Host "Creating .env file..." -ForegroundColor Cyan
    Copy-Item .env.example .env
    Write-Host "✓ Created .env file" -ForegroundColor Green
}

Write-Host "✓ Frontend setup complete!" -ForegroundColor Green

# Final instructions
Set-Location ..
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete! 🎉" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Start Backend (in one terminal):" -ForegroundColor White
Write-Host "   cd server" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Start Frontend (in another terminal):" -ForegroundColor White
Write-Host "   cd client" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Open browser to: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "Demo Login Credentials:" -ForegroundColor Yellow
Write-Host "   Email: demo@wilopocargo.com" -ForegroundColor Gray
Write-Host "   Password: password123" -ForegroundColor Gray
Write-Host ""
Write-Host "For more information, see SETUP_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
