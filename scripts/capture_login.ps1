$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$outDir = "E:\kre\banyumassehat\screenshots"
$artifactDir = "C:\Users\galih\.gemini\antigravity-cli\brain\fcb1e325-dfe0-4e8e-a6a5-749c97bbd748"

Write-Host "Capturing login desktop..."
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\login_desktop.png", "--window-size=1440,1100", "--hide-scrollbars", "--virtual-time-budget=3000", "http://localhost:3000/login") -Wait

Write-Host "Capturing login mobile..."
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\login_mobile.png", "--window-size=412,1300", "--hide-scrollbars", "--force-device-scale-factor=1", "--virtual-time-budget=3000", "http://localhost:3000/login") -Wait

Write-Host "Capturing stok darah updated..."
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\darah_desktop.png", "--window-size=1440,2400", "--hide-scrollbars", "--virtual-time-budget=3000", "http://localhost:3000/stok-darah") -Wait
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\darah_mobile.png", "--window-size=412,3200", "--hide-scrollbars", "--force-device-scale-factor=1", "--virtual-time-budget=3000", "http://localhost:3000/stok-darah") -Wait

Write-Host "Copying to artifact directory..."
Copy-Item "$outDir\login_*.png" -Destination $artifactDir -Force
Copy-Item "$outDir\darah_*.png" -Destination $artifactDir -Force
Write-Host "Screenshots captured and copied successfully!"
