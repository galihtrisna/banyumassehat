$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$outDir = "E:\kre\banyumassehat\screenshots"

$pages = @(
    @{ name = "beranda"; url = "http://localhost:3000/"; d_h = 2400; m_h = 3200 },
    @{ name = "kamar"; url = "http://localhost:3000/kamar"; d_h = 2200; m_h = 3400 },
    @{ name = "dokter"; url = "http://localhost:3000/jadwal-dokter"; d_h = 2000; m_h = 3200 },
    @{ name = "obat"; url = "http://localhost:3000/info-obat"; d_h = 1800; m_h = 2400 },
    @{ name = "darah"; url = "http://localhost:3000/stok-darah"; d_h = 2200; m_h = 3200 },
    @{ name = "faskes"; url = "http://localhost:3000/direktori-faskes"; d_h = 2400; m_h = 3400 }
)

foreach ($p in $pages) {
    $dOut = "$outDir\$($p.name)_desktop.png"
    $mOut = "$outDir\$($p.name)_mobile.png"
    
    Write-Host "Capturing Desktop for $($p.name)..."
    Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$dOut", "--window-size=1440,$($p.d_h)", "--hide-scrollbars", "--virtual-time-budget=3000", $p.url) -Wait
    
    Write-Host "Capturing Mobile for $($p.name)..."
    Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--screenshot=$mOut", "--window-size=412,$($p.m_h)", "--hide-scrollbars", "--force-device-scale-factor=1", "--virtual-time-budget=3000", $p.url) -Wait
}

Write-Host "Copying screenshots to artifact directory..."
Copy-Item "$outDir\*.png" -Destination "C:\Users\galih\.gemini\antigravity-cli\brain\fcb1e325-dfe0-4e8e-a6a5-749c97bbd748\" -Force

Write-Host "All screenshots captured successfully!"
Get-ChildItem $outDir
