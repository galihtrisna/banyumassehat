$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$outDir = "E:\kre\banyumassehat\screenshots"
$artifactDir = "C:\Users\galih\.gemini\antigravity-cli\brain\fcb1e325-dfe0-4e8e-a6a5-749c97bbd748"

Write-Host "Capturing dashboard desktop..."
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\dashboard_desktop.png", "--window-size=1440,3800", "--hide-scrollbars", "--virtual-time-budget=5000", "http://localhost:3000/dashboard") -Wait

Write-Host "Capturing dashboard mobile..."
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\dashboard_mobile.png", "--window-size=412,5800", "--hide-scrollbars", "--force-device-scale-factor=1", "--virtual-time-budget=5000", "http://localhost:3000/dashboard") -Wait

Write-Host "Copying to artifact directory..."
Copy-Item "$outDir\dashboard_*.png" -Destination $artifactDir -Force
Write-Host "Dashboard screenshots captured and copied successfully!"
