$scrapedDataPath = Join-Path $PSScriptRoot "scraped_data"
$placeholderUrl = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"

$jsonFiles = Get-ChildItem -Path $scrapedDataPath -Filter "*.json"

Write-Host "Found $($jsonFiles.Count) JSON files to process..."

$replacedCount = 0

foreach ($file in $jsonFiles) {
    $content = Get-Content $file.FullName -Raw
    
    if ($content -match [regex]::Escape($placeholderUrl)) {
        $newContent = $content -replace [regex]::Escape("`"$placeholderUrl`""), "null"
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        $replacedCount++
        Write-Host "Updated: $($file.Name)"
    }
}

Write-Host "`nDone! Replaced placeholder URL in $replacedCount files."
