$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$outDir = "E:\kre\banyumassehat\screenshots"
$artifactDir = "C:\Users\galih\.gemini\antigravity-cli\brain\fcb1e325-dfe0-4e8e-a6a5-749c97bbd748"

Write-Host "Capturing dashboard desktop (sidebar layout)..."
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\dashboard_desktop.png", "--window-size=1440,3600", "--hide-scrollbars", "--virtual-time-budget=5000", "http://localhost:3000/dashboard") -Wait

Write-Host "Capturing dashboard mobile..."
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\dashboard_mobile.png", "--window-size=412,5600", "--hide-scrollbars", "--force-device-scale-factor=1", "--virtual-time-budget=5000", "http://localhost:3000/dashboard") -Wait

Write-Host "Capturing login desktop (without navbar)..."
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\login_desktop.png", "--window-size=1440,1100", "--hide-scrollbars", "--virtual-time-budget=4000", "http://localhost:3000/login") -Wait

Write-Host "Capturing login mobile..."
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\login_mobile.png", "--window-size=412,1200", "--hide-scrollbars", "--force-device-scale-factor=1", "--virtual-time-budget=4000", "http://localhost:3000/login") -Wait

Write-Host "Capturing beranda desktop (public navbar without Masuk Petugas)..."
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\beranda_desktop.png", "--window-size=1440,1400", "--hide-scrollbars", "--virtual-time-budget=4000", "http://localhost:3000/") -Wait

Write-Host "Copying to artifact directory..."
Copy-Item "$outDir\dashboard_*.png" -Destination $artifactDir -Force
Copy-Item "$outDir\login_*.png" -Destination $artifactDir -Force
Copy-Item "$outDir\beranda_*.png" -Destination $artifactDir -Force
Write-Host "All screenshots captured and copied successfully!"
