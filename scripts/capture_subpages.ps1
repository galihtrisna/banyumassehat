$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$outDir = "E:\kre\banyumassehat\screenshots"
$artifactDir = "C:\Users\galih\.gemini\antigravity-cli\brain\fcb1e325-dfe0-4e8e-a6a5-749c97bbd748"

Write-Host "Capturing /dashboard (overview)..."
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\dashboard_overview.png", "--window-size=1440,1600", "--hide-scrollbars", "--virtual-time-budget=4000", "http://localhost:3000/dashboard") -Wait

Write-Host "Capturing /dashboard/kunjungan..."
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\dashboard_kunjungan.png", "--window-size=1440,1500", "--hide-scrollbars", "--virtual-time-budget=4000", "http://localhost:3000/dashboard/kunjungan") -Wait

Write-Host "Capturing /dashboard/okupansi..."
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\dashboard_okupansi.png", "--window-size=1440,1500", "--hide-scrollbars", "--virtual-time-budget=4000", "http://localhost:3000/dashboard/okupansi") -Wait

Write-Host "Capturing /dashboard/dokter..."
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\dashboard_dokter.png", "--window-size=1440,1400", "--hide-scrollbars", "--virtual-time-budget=4000", "http://localhost:3000/dashboard/dokter") -Wait

Write-Host "Capturing /dashboard/logistik..."
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\dashboard_logistik.png", "--window-size=1440,1500", "--hide-scrollbars", "--virtual-time-budget=4000", "http://localhost:3000/dashboard/logistik") -Wait

Write-Host "Copying to artifact directory..."
Copy-Item "$outDir\dashboard_*.png" -Destination $artifactDir -Force
Write-Host "All dashboard sub-page screenshots captured and copied successfully!"
