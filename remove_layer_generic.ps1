# סקריפט PowerShell כללי למחיקת שכבה עם מזהה 12345679 מקובץ JSON
# שימוש: .\remove_layer_generic.ps1

# בקשת נתיב הקובץ מהמשתמש
$FilePath = Read-Host "הכנס נתיב קובץ JSON"

# ניקוי מירכאות בתחילת ובסוף הנתיב אם קיימות
$FilePath = $FilePath.Trim("`"'")

# בדיקה שהקובץ קיים
if (-not (Test-Path $FilePath)) {
    Write-Host "הקובץ לא קיים: $FilePath" -ForegroundColor Red
    exit 1
}

# קריאת הקובץ JSON
$jsonContent = Get-Content $FilePath -Raw
$jsonObj = $jsonContent | ConvertFrom-Json

# בדיקה אם יש שכבות
if (-not $jsonObj.layers) {
    Write-Host "אין שכבות בקובץ" -ForegroundColor Yellow
    exit 0
}

# מציאת ומחיקת השכבה עם מזהה 12345679
$originalCount = $jsonObj.layers.Count
$jsonObj.layers = $jsonObj.layers | Where-Object { $_.ind -ne 12345679 }
$newCount = $jsonObj.layers.Count

if ($originalCount -eq $newCount) {
    Write-Host "לא נמצאה שכבה עם מזהה 12345679" -ForegroundColor Yellow
} else {
    # המרה חזרה ל-JSON
    $newJsonContent = $jsonObj | ConvertTo-Json -Depth 100 -Compress
    
    # שמירת הקובץ המעודכן
    $newJsonContent | Set-Content $FilePath -Encoding UTF8 -NoNewline
    
    Write-Host "השכבה עם מזהה 12345679 נמחקה בהצלחה מ-$FilePath" -ForegroundColor Green
    Write-Host "מספר שכבות לפני: $originalCount, אחרי: $newCount" -ForegroundColor Cyan
}