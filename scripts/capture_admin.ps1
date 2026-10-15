$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$outDir = "E:\kre\banyumassehat\screenshots"
$artifactDir = "C:\Users\galih\.gemini\antigravity-cli\brain\fcb1e325-dfe0-4e8e-a6a5-749c97bbd748"

Write-Host "Capturing /admin (overview)..."
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\admin_overview.png", "--window-size=1440,1600", "--hide-scrollbars", "--virtual-time-budget=4000", "http://localhost:3000/admin") -Wait

Write-Host "Capturing /admin/tarik-data..."
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\admin_tarik_data.png", "--window-size=1440,1500", "--hide-scrollbars", "--virtual-time-budget=4000", "http://localhost:3000/admin/tarik-data") -Wait

Write-Host "Capturing /admin/kualitas-data..."
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\admin_kualitas_data.png", "--window-size=1440,1600", "--hide-scrollbars", "--virtual-time-budget=4000", "http://localhost:3000/admin/kualitas-data") -Wait

Write-Host "Capturing /admin/sumber-data..."
Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$outDir\admin_sumber_data.png", "--window-size=1440,1500", "--hide-scrollbars", "--virtual-time-budget=4000", "http://localhost:3000/admin/sumber-data") -Wait

Write-Host "Copying to artifact directory..."
Copy-Item "$outDir\admin_*.png" -Destination $artifactDir -Force
Write-Host "Admin screenshots captured successfully!"
