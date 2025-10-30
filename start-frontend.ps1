# Start Frontend Server
Write-Host "Starting Wilopo Cargo Frontend..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

Set-Location client
npm run dev
