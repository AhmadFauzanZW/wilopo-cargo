# Start Backend Server
Write-Host "Starting Wilopo Cargo Backend Server..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

Set-Location server
npm run dev
